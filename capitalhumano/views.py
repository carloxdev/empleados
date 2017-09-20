# -*- coding: utf-8 -*-

# Django Atajos:
from django.shortcuts import render
from django.http import HttpResponse

# Librerias de Django
from django.views.generic.base import View
from django.core.files.storage import default_storage
from django.utils.decorators import method_decorator

# Otras librerias
import xlwt
import datetime

# Librerias de Propias
from home.decorators import group_required

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
from .forms import PerfilAgregarPuestoCargoForm
from .forms import PerfilPuestoListaForm
from .forms import PerfilAgregarCompetenciaForm
from .forms import SolicitudesFilterForm
from .forms import SolicitudesEditarForm


# Serializer crear organigrama
from serializers import VIEW_ORGANIGRAMA_ORG_SERIALIZADO
from serializers import VIEW_ORGANIGRAMA_EMP_SERIALIZADO

# Modelos
from ebs.models import VIEW_ORGANIGRAMA
from ebs.models import VIEW_EMPLEADOS_FULL


# -------------- EMPLEADOS -------------- #

@method_decorator(group_required('CH_CONS_DATOS_PERSONAL'), name='dispatch')
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
                        argumentos['pers_primer_nombre__icontains'] = request.POST[
                            datosPost]

                    if datosPost == 'pers_segundo_nombre':
                        argumentos['pers_segundo_nombre__icontains'] = request.POST[
                            datosPost]

                    if datosPost == 'pers_apellido_paterno':
                        argumentos['pers_apellido_paterno__icontains'] = request.POST[
                            datosPost]

                    if datosPost == 'pers_apellido_materno':
                        argumentos['pers_apellido_materno__icontains'] = request.POST[
                            datosPost]

                    if datosPost == 'pers_genero_clave':
                        argumentos['pers_genero_clave__exact'] = request.POST[
                            datosPost]

                    if datosPost == 'pers_empleado_numero':
                        argumentos['pers_empleado_numero__exact'] = request.POST[
                            datosPost]

                    if datosPost == 'pers_tipo_codigo':
                        argumentos['pers_tipo_codigo__exact'] = request.POST[
                            datosPost]

                    if datosPost == 'asig_puesto_clave':
                        argumentos['asig_puesto_clave__icontains'] = request.POST[
                            datosPost]

                    if datosPost == 'asig_organizacion_clave':
                        argumentos['asig_organizacion_clave__exact'] = request.POST[
                            datosPost]

                    if datosPost == 'contratacion_desde':
                        fecha = request.POST.get('contratacion_desde').split('/')
                        argumentos['pers_fecha_contratacion__gte'] = fecha[2]+'-'+fecha[1]+'-'+fecha[0]

                    if datosPost == 'contratacion_hasta':
                        fecha = request.POST.get('contratacion_hasta').split('/')
                        argumentos['pers_fecha_contratacion__lte'] = fecha[2]+'-'+fecha[1]+'-'+fecha[0]

                    if datosPost == 'grup_compania_jde':
                        argumentos['grup_compania_jde__contains'] = request.POST[
                            datosPost]

                    if datosPost == 'grup_fase_jde':
                        argumentos['grup_fase_jde__exact'] = request.POST[
                            datosPost]

                    if datosPost == 'grup_nomina_jde':
                        argumentos['grup_nomina_jde__exact'] = request.POST[
                            datosPost]

        rows = VIEW_EMPLEADOS_FULL.objects.using('ebs_p').filter(**argumentos).values_list(
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
                        if (row[col_num] != '-'):

                            fecha = datetime.datetime.strptime(
                                row[col_num], '%Y-%m-%d %H:%M:%S').date()
                            ws.write(row_num, col_num, fecha, date_format)
                        else:

                            ws.write(row_num, col_num, row[col_num])
                            fecha = datetime.datetime.strptime(
                                row[col_num], '%Y-%m-%d %H:%M:%S').date()
                            ws.write(row_num, col_num, fecha, date_format)
                    else:

                        ws.write(row_num, col_num, row[col_num])

        wb.save(response)
        return response

# -------------- DASHBOARD -------------- #


@method_decorator(group_required('CH_ADMIN', 'CH_OPERA'), name='dispatch')
class Dashboard(View):

    def __init__(self):
        self.template_name = 'dashboard.html'

    def get(self, request):

        form = OrganizacionesFilterForm()

        contexto = {
            'form': form,
        }
        return render(request, self.template_name, contexto)


# -------------- ORGANIGRAMA EBS  -------------- #
@method_decorator(group_required('CH_ADMIN', 'CH_OPERA'), name='dispatch')
class Organigrama(View):

    def __init__(self):
        self.template_name = 'organigrama.html'

    def get(self, request):

        form_organizaciones = OrganizacionesFilterForm()
        form_empresas = EmpresasFilterForm()

        contexto = {
            'form': form_organizaciones,
            'form2': form_empresas,
        }
        return render(request, self.template_name, contexto)


@method_decorator(group_required('CH_ADMIN', 'CH_OPERA'), name='dispatch')
class OrganigramaOrgAPI(View):

    def get(self, request, pk):

        daddies = VIEW_ORGANIGRAMA.objects.using(
            'ebs_p').filter(asig_organizacion_clave=pk)

        serializador = VIEW_ORGANIGRAMA_ORG_SERIALIZADO()
        lista_json = serializador.get_Json(daddies)

        return HttpResponse(
            lista_json,
            content_type="application/json"
        )


@method_decorator(group_required('CH_ADMIN', 'CH_OPERA'), name='dispatch')
class OrganigramaEmpAPI(View):

    def get(self, request, pk):
        daddies = VIEW_ORGANIGRAMA.objects.using(
            'ebs_p').filter(grup_compania_jde=pk)

        len(daddies)
        serializador = VIEW_ORGANIGRAMA_EMP_SERIALIZADO()
        lista_json = serializador.get_Json(daddies)

        return HttpResponse(
            lista_json,
            content_type="application/json"
        )


# --------------  EXPEDIENTES EMPLEADOS -------------- #

@method_decorator(group_required('CH_ADMIN', 'CH_OPERA'), name='dispatch')
class ExpedientesGeneral(View):

    def __init__(self):
        self.template_name = 'expedientes_general.html'

    def get(self, request):

        form = ExpedientesFilterForm()

        contexto = {
            'form': form,
        }

        return render(request, self.template_name, contexto)


@method_decorator(group_required('CH_ADMIN', 'CH_OPERA'), name='dispatch')
class Solicitudes(View):

    def __init__(self):
        self.template_name = 'solicitud/empleado_solicitud.html'

    def get(self, request):

        form = SolicitudesFilterForm()
        form2 = SolicitudesEditarForm()
        clave = request.user.profile.clave_rh

        if clave is not None:
            oficina = VIEW_EMPLEADOS_FULL.objects.using('ebs_p').get(pers_empleado_numero= request.user.profile.clave_rh)

            contexto = {
                'form': form,
                'form2': form2,
                'oficina': oficina.asig_ubicacion_clave,
            }
        else:
            contexto = {
                'form': form,
                'form2': form2,
            }

        return render(request, self.template_name, contexto)


@method_decorator(group_required('CH_ADMIN', 'CH_OPERA'), name='dispatch')
class ExpedientesGrado(View):

    def __init__(self):
        self.template_name = 'expedientes_grado.html'

    def get(self, request):

        form = GradoAcademicoFilterForm()

        contexto = {
            'form': form,
        }

        return render(request, self.template_name, contexto)


@method_decorator(group_required('CH_ADMIN', 'CH_OPERA'), name='dispatch')
class ExpedientesDocPersonal(View):

    def __init__(self):
        self.template_name = 'documento_personal/expedientes_docpersonal.html'

    def get(self, request):

        form = DocPersonalFilterForm()

        contexto = {
            'form': form,
        }

        return render(request, self.template_name, contexto)


@method_decorator(group_required('CH_ADMIN', 'CH_OPERA'), name='dispatch')
class ExpedientesDocCapacitacion(View):

    def __init__(self):
        self.template_name = 'documento_capacitacion/expedientes_doccapacitacion.html'

    def get(self, request):

        form = DocCapacitacionFilterForm()

        contexto = {
            'form': form,
        }

        return render(request, self.template_name, contexto)


@method_decorator(group_required('CH_ADMIN', 'CH_OPERA'), name='dispatch')
class EmpleadoExpediente(View):

    def __init__(self):
        self.template_name = 'empleado_expediente.html'

    def get(self, request, _numero_empleado):

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

    def comprobar_Direccion(self, _empleado):
        ruta = ''
        url = ''

        for dato in _empleado:
            url = 'capitalhumano/fotos/' + dato.nombre_foto

        if default_storage.exists(url):
            ruta = '/media/' + url
        else:
            ruta = '/static/theme/img/avatar-150.png'

        return ruta


# -------------- PERFILES DE PUESTOS DOCUMENTO  -------------- #


class PerfilPuesto(View):

    def get(self, request):

        formulario = PerfilPuestoListaForm()

        contexto = {
            'form': formulario
        }

        return render(request, 'perfilpuesto/perfil_lista.html', contexto)


class PerfilPuestoNuevo(View):

    def __init__(self):

        #self.template_name = 'perfilpuesto/perfil_nuevo.html'
        self.template_name = 'perfilpuesto/perfil.html'

    def get(self, request):

        formulario = PerfilPuestoDocumentoForm()
        form_puesto_cargo = PerfilAgregarPuestoCargoForm()
        form_competencias = PerfilAgregarCompetenciaForm()

        contexto = {
            'form': formulario,
            'form2': form_puesto_cargo,
            'formc': form_competencias
        }

        return render(request, self.template_name, contexto)

    def post(self, request):

        formulario = PerfilPuestoDocumentoForm(request.POST)
        datos_formulario = formulario.cleaned_data

        if formulario.is_valid():
            perfilpuesto = formulario.save(commit=False)

            perfilpuesto.asig_puesto_clave = datos_formulario.get('desc_puesto')
            perfilpuesto.created_by = request.user.profile


            perfilpuesto.save()

            return redirect(reverse('capitalhumano:perfil_nuevo'))

        contexto = {
            'form': formulario
        }

        return render(request, self.template_name, contexto)




@method_decorator(group_required('CH_ADMIN'), name='dispatch')
class PerfilPuestoConfiguraciones(View):

    def get(self, request):

        return render(request, 'perfilpuesto/perfil_configuracion.html')
