# -*- coding: utf-8 -*-

# Django Atajos:
from django.shortcuts import render
from django.http import HttpResponse

# Librerias de Django
from django.views.generic.base import View
from django.core.files.storage import default_storage

# Otras librerias
import xlwt
import datetime

# Librerias de Propias

# Formularios
from .forms import EmpleadoFilterForm
from .forms import OrganizacionesFilterForm
from .forms import EmpresasFilterForm
from .forms import PerfilPuestoDocumentoForm
from .forms import NuevoDocumentoPersonalForm
from .forms import NuevoDocumentoCapacitacionForm
from .forms import GradoAcademicoFilterForm
from .forms import ExpedientesFilterForm
from .forms import DocPersonalFilterForm
from .forms import DocCapacitacionFilterForm
from .forms import GradoAcademicoFilterForm

# Serializer crear organigrama
from serializers import VIEW_ORGANIGRAMA_ORG_SERIALIZADO
from serializers import VIEW_ORGANIGRAMA_EMP_SERIALIZADO

# Modelos
from ebs.models import VIEW_ORGANIGRAMA
from ebs.models import VIEW_EMPLEADOS_FULL


# -------------- EMPLEADOS -------------- #

class EmpleadoLista(View):

    def __init__(self):
        self.template_name = 'empleado_lista.html'

    def get(self, request):

        formulario = EmpleadoFilterForm(use_required_attribute=False)

        contexto = {
            'form': formulario
        }

        return render(request, self.template_name, contexto)

    def post(self, request):
        response = HttpResponse(content_type='application/ms-excel')
        response['Content-Disposition'] = 'attachment; filename="compras.xls"'

        wb = xlwt.Workbook(encoding='utf-8')
        ws = wb.add_sheet('Empleados')

        row_num = 0

        font_style = xlwt.XFStyle()
        font_style.font.bold = True

        columns = [
            'Número', 'Tipo', 'Fecha contratación', 'Primer nombre', 'Segundo nombre',
            'Apellido paterno', 'Apellido materno', 'Título', 'Género', 'CURP', 'RFC',
            'IMSS', 'IFE', 'Fecha de nacimiento', 'Ciudad de nacimiento',
            'Estado de nacimiento', 'País de nacimiento', 'Estado civil',
            'Correo electrónico', 'TipoN', 'Fecha inicio asignación',
            'Organización', 'Trabajo', 'Grado', 'Ubicación', 'Puesto', 'Jefe directo',
            'Nómina', 'Estado asig', 'Base salario', 'Información estatutaria',
            'Nómina JDE', 'Compañia JDE', 'Proyecto cod. JDE', 'Proyecto JDE',
            'Fase cod. JDE', 'Fase JDE', 'Puesto IMSS', 'Banco', 'Método pago',
            'Tipo', 'Prioridad', 'Importe saldo', 'Porcentaje', 'Detalle adicional',
            'Sucursal', 'Cuenta', 'Clabe',
        ]

        for col_num in range(len(columns)):
            ws.col(col_num).width = int(4000)
            ws.write(row_num, col_num, columns[col_num], font_style)

        date_format = xlwt.XFStyle()
        date_format.num_format_str = 'dd/mm/yyyy'

        argumentos = {}
        campos_formulario = []
        for campos in EmpleadoFilterForm():
            campos_formulario.append(campos.name)

        for datosPost in request.POST:
            if datosPost in campos_formulario:
                if request.POST[datosPost] != '':
                    if datosPost == 'pers_primer_nombre':
                        argumentos['pers_primer_nombre__icontains'] = request.POST[datosPost]

                    if datosPost == 'pers_segundo_nombre':
                        argumentos['pers_segundo_nombre__icontains'] = request.POST[datosPost]

                    if datosPost == 'pers_apellido_paterno':
                        argumentos['pers_apellido_paterno__icontains'] = request.POST[datosPost]

                    if datosPost == 'pers_apellido_materno':
                        argumentos['pers_apellido_materno__icontains'] = request.POST[datosPost]

                    if datosPost == 'pers_genero_clave':
                        argumentos['pers_genero_clave__exact'] = request.POST[datosPost]

                    if datosPost == 'pers_empleado_numero':
                        argumentos['pers_empleado_numero__exact'] = request.POST[datosPost]

                    if datosPost == 'pers_tipo_codigo':
                        argumentos['pers_tipo_codigo__exact'] = request.POST[datosPost]

                    if datosPost == 'asig_puesto_clave':
                        argumentos['asig_puesto_clave__icontains'] = request.POST[datosPost]

                    if datosPost == 'asig_organizacion_clave':
                        argumentos['asig_organizacion_clave__exact'] = request.POST[datosPost]

                    if datosPost == 'fecha_contratacion':
                        valores = request.POST.get('fecha_contratacion').split(" al ")
                        argumentos['pers_fecha_contratacion__gte'] = valores[0]
                        argumentos['pers_fecha_contratacion__lte'] = valores[1]

                    if datosPost == 'grup_compania_jde':
                        argumentos['grup_compania_jde__contains'] = request.POST[datosPost]

                    if datosPost == 'grup_fase_jde':
                        argumentos['grup_fase_jde__exact'] = request.POST[datosPost]

                    if datosPost == 'grup_nomina_jde':
                        argumentos['grup_nomina_jde__exact'] = request.POST[datosPost]

        rows = VIEW_EMPLEADOS_FULL.objects.using('ebs_d').filter(**argumentos).values_list(
            'pers_empleado_numero', 'pers_tipo_desc', 'pers_fecha_contratacion', 'pers_primer_nombre',
            'pers_segundo_nombre', 'pers_apellido_paterno', 'pers_apellido_materno', 'pers_titulo',
            'pers_genero_desc', 'pers_curp', 'pers_rfc', 'pers_numero_imss', 'pers_ife', 'pers_fecha_nacimiento',
            'pers_ciudad_nacimiento', 'pers_estado_nacimiento', 'pers_pais_nacimiento_clave', 'pers_estado_civil_desc',
            'pers_email', 'asig_tipo_empleado', 'asig_fecha_inicio', 'asig_organizacion_desc', 'asig_trabajo_desc',
            'asig_grado_desc', 'asig_ubicacion_desc', 'asig_puesto_desc', 'asig_jefe_directo_desc', 'asig_nomina_desc',
            'asig_estado_desc', 'asig_salario_base_desc', 'informacion_estatutaria_desc', 'grup_nomina_jde',
            'grup_compania_jde', 'grup_proyecto_code_jde', 'grup_proyecto_jde', 'grup_fase_code_jde', 'grup_fase_jde',
            'grup_puesto_jde', 'metodo_banco', 'metodo_nombre', 'metodo_tipo', 'metodo_prioridad',
            'metodo_importe_saldo', 'metodo_porcentaje', 'metodo_pago', 'metodo_sucursal', 'metodo_cuenta',
            'metodo_clabe')

        for row in rows:
            row_num += 1
            for col_num in range(len(row)):
                if isinstance(row[col_num], datetime.date):
                    ws.write(row_num, col_num, row[col_num], date_format)
                else:
                    if (col_num == 2) or (col_num == 13):
                        fecha = datetime.datetime.strptime(row[col_num], '%Y-%m-%d %H:%M:%S').date()
                        ws.write(row_num, col_num, fecha, date_format)
                    else:
                        ws.write(row_num, col_num, row[col_num])

        wb.save(response)
        return response

# -------------- DASHBOARD -------------- #


class EmpleadoDashboard(View):

    def __init__(self):
        self.template_name = 'empleado_dashboard.html'

    def get(self, request):

        form = OrganizacionesFilterForm()

        contexto = {
            'form': form,
        }
        return render(request, self.template_name, contexto)


# -------------- ORGANIGRAMA EBS  -------------- #


class EmpleadoOrganigrama(View):

    def __init__(self):
        self.template_name = 'empleado_organigrama.html'

    def get(self, request):

        form_organizaciones = OrganizacionesFilterForm()
        form_empresas = EmpresasFilterForm()

        contexto = {
            'form': form_organizaciones,
            'form2': form_empresas,
        }
        return render(request, self.template_name, contexto)


class EmpleadoOrganigramaOrgAPI(View):

    def get(self, request, pk):

        daddies = VIEW_ORGANIGRAMA.objects.using(
            'ebs_p').filter(asig_organizacion_clave=pk)

        serializador = VIEW_ORGANIGRAMA_ORG_SERIALIZADO()
        lista_json = serializador.get_Json(daddies)

        return HttpResponse(
            lista_json,
            content_type="application/json"
        )


class EmpleadoOrganigramaEmpAPI(View):

    def get(self, request, pk):

        daddies = VIEW_ORGANIGRAMA.objects.using(
            'ebs_p').filter(grup_compania_jde=pk)

        serializador = VIEW_ORGANIGRAMA_EMP_SERIALIZADO()
        lista_json = serializador.get_Json(daddies)

        return HttpResponse(
            lista_json,
            content_type="application/json"
        )


# --------------  EXPEDIENTES EMPLEADOS -------------- #


class EmpleadoExpedientes(View):

    def __init__(self):
        self.template_name = 'empleado_expedientes_general.html'

    def get(self, request):

        form = ExpedientesFilterForm()

        contexto = {
            'form': form,
        }

        return render(request, self.template_name, contexto)


class EmpleadoExpedientesSolicitud(View):

    def __init__(self):
        self.template_name = 'empleado_expedientes_solicitudes.html'

    def get(self, request):

        contexto = {
        }

        return render(request, self.template_name, contexto)


class EmpleadoExpedientesGrado(View):

    def __init__(self):
        self.template_name = 'empleado_expedientes_grado.html'

    def get(self, request):

        form = GradoAcademicoFilterForm()

        contexto = {
            'form': form,
        }

        return render(request, self.template_name, contexto)


class EmpleadoExpedientesDocPersonal(View):

    def __init__(self):
        self.template_name = 'empleado_expedientes_docpersonal.html'

    def get(self, request):

        form = DocPersonalFilterForm()

        contexto = {
            'form': form,
        }

        return render(request, self.template_name, contexto)


class EmpleadoExpedientesDocCapacitacion(View):

    def __init__(self):
        self.template_name = 'empleado_expedientes_doccapacitacion.html'

    def get(self, request):

        form = DocCapacitacionFilterForm()

        contexto = {
            'form': form,
        }

        return render(request, self.template_name, contexto)

# class EmpleadoExpedientes(View):

#     def __init__(self):
#         self.template_name = 'empleado_expedientes.html'

#     def get(self, request):

#         form = ExpedientesFilterForm()
#         form_per = DocPersonalFilterForm()
#         form_cap = DocCapacitacionFilterForm()
#         form_grado = GradoAcademicoFilterForm()

#         contexto = {
#             'form': form,
#             'form_per': form_per,
#             'form_cap': form_cap,
#             'form_grado': form_grado,
#         }

#         return render(request, self.template_name, contexto)


class EmpleadoExpediente(View):

    def __init__(self):
        self.template_name = 'empleado_expediente.html'

    def get(self, request, _numero_empleado):
        try:

            form_per = NuevoDocumentoPersonalForm()
            form_cap = NuevoDocumentoCapacitacionForm()
            empleado = VIEW_EMPLEADOS_FULL.objects.using(
                "ebs_p").filter(pers_empleado_numero=_numero_empleado)

            ruta = self.comprobar_Direccion(empleado)

            contexto = {
                'empleado': empleado,
                'ruta': ruta,
                'form': form_per,
                'form2': form_cap
            }

            return render(request, self.template_name, contexto)

        except Exception as e:
            print e
            template_error = 'error_conexion.html'
            return render(request, template_error, {})

    def comprobar_Direccion(self, _empleado):
        ruta = ''
        url = ''

        for dato in _empleado:
            url = 'capitalhumano/images/' + dato.nombre_foto

        if default_storage.exists(url):
            ruta = '/media/' + url
        else:
            ruta = '/static/theme/img/avatar-150.png'

        return ruta


# -------------- PERFILES DE PUESTOS DOCUMENTO  -------------- #


class PerfilPuesto(View):

    def get(self, request):

        return render(request, 'perfilpuesto/perfil_lista.html')


class PerfilPuestoNuevo(View):

    def __init__(self):

        self.template_name = 'perfilpuesto/perfil_nuevo.html'

    def get(self, request):

        formulario = PerfilPuestoDocumentoForm()

        contexto = {
            'form': formulario
        }

        return render(request, self.template_name, contexto)


class PerfilPuestoNuevo2(View):

    def get(self, request):

        return render(request, 'perfilpuesto/perfil_nuevo2.html')


class PerfilPuestoConfiguraciones(View):

    def get(self, request):

        return render(request, 'perfilpuesto/perfil_configuracion.html')


class PerfilPuestoCompetencias(View):

    def get(self, request):

        return render(request, 'perfilpuesto/perfil_competencias.html')


class PerfilPuestoCargos(View):

    def get(self, request):

        return render(request, 'perfilpuesto/perfil_puestoscargo.html')


class PerfilOrganigrama(View):

    def get(self, request):

        return render(request, 'perfilpuesto/perfil_organigrama.html')


class PerfilOrganigrama2(View):

    def get(self, request):

        return render(request, 'empleado_perfil_organigrama.html')
