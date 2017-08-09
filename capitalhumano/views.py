# -*- coding: utf-8 -*-

# Django Atajos:
from django.shortcuts import render
from django.http import HttpResponse

# Librerias de Django
from django.views.generic.base import View
from django.core.files.storage import default_storage

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

        formulario = EmpleadoFilterForm()

        contexto = {
            'form': formulario
        }

        return render(request, self.template_name, contexto)

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
            'ebs_d').filter(asig_organizacion_clave=pk)

        serializador = VIEW_ORGANIGRAMA_ORG_SERIALIZADO()
        lista_json = serializador.get_Json(daddies)

        return HttpResponse(
            lista_json,
            content_type="application/json"
        )


class EmpleadoOrganigramaEmpAPI(View):

    def get(self, request, pk):

        daddies = VIEW_ORGANIGRAMA.objects.using(
            'ebs_d').filter(grup_compania_jde=pk)

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
