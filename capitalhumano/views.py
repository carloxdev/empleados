# -*- coding: utf-8 -*-

# Django Atajos:
from django.shortcuts import render
from django.http import HttpResponse

# Librerias de Django
from django.views.generic.base import View
from django.core.files.storage import default_storage
from django.contrib.contenttypes.models import ContentType

# Librerias de Propias

# Formularios
from .forms import EmpleadoFilterForm
from .forms import OrganizacionesFilterForm
from .forms import EmpresasFilterForm
from .forms import ExpedientesFilterForm
from .forms import PerfilPuestoDocumentoForm
from .forms import NuevoDocumentoPersonalForm
from .forms import NuevoDocumentoCapacitacionForm

# Serializer crear organigrama
from serializers import VIEW_ORGANIGRAMA_ORG_SERIALIZADO
from serializers import VIEW_ORGANIGRAMA_EMP_SERIALIZADO

# Modelos
from ebs.models import VIEW_ORGANIGRAMA
from ebs.models import VIEW_EMPLEADOS_FULL
from .models import Archivo
from .models import DocumentoPersonal
from .models import DocumentoCapacitacion


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
        self.template_name = 'empleado_expedientes.html'

    def get(self, request):
        form = ExpedientesFilterForm()

        contexto = {
            'form': form
        }

        return render(request, self.template_name, contexto)

    def post(self, request):
        form = ExpedientesFilterForm(request.POST)

        contexto = {
            'form': form
        }

        return render(request, self.template_name, contexto)


class EmpleadoExpediente(View):

    def __init__(self):
        self.template_name = 'empleado_expediente.html'

    def get(self, request, pk):
        form_per = NuevoDocumentoPersonalForm()
        form_cap = NuevoDocumentoCapacitacionForm()
        empleado = VIEW_EMPLEADOS_FULL.objects.using(
            "ebs_d").filter(pers_empleado_numero=pk)

        ruta = self.comprobar_Direccion(empleado)

        contexto = {
            'empleado': empleado,
            'ruta': ruta,
            'form': form_per,
            'form2': form_cap
        }

        return render(request, self.template_name, contexto)

    def post(self, request, pk):
        numero_empleado = pk
        form_per = NuevoDocumentoPersonalForm(request.POST, request.FILES)
        form_cap = NuevoDocumentoCapacitacionForm(request.POST, request.FILES)
        empleado = VIEW_EMPLEADOS_FULL.objects.using(
            "ebs_d").filter(pers_empleado_numero=numero_empleado)

        ruta = self.comprobar_Direccion(empleado)

        if form_per.is_valid():

            datos_formulario = form_per.cleaned_data
            content_type = ContentType.objects.get_for_model(DocumentoPersonal)

            doc_personal = DocumentoPersonal()
            doc_personal.numero_empleado = numero_empleado
            doc_personal.tipo_documento = datos_formulario.get(
                'tipo_documento')
            doc_personal.agrupador = datos_formulario.get('agrupador')
            doc_personal.vigencia_inicio = datos_formulario.get(
                'vigencia_inicio')
            doc_personal.vigencia_fin = datos_formulario.get('vigencia_fin')
            doc_personal.created_by = request.user.profile
            doc_personal.save()
            archivo = Archivo()
            archivo.tipo_archivo = 'per'
            archivo.archivo = datos_formulario.get('archivo')
            archivo.content_type = content_type
            archivo.object_id = doc_personal.id
            archivo.created_by = request.user.profile
            archivo.updated_by = request.user.profile
            archivo.save()
        elif form_cap.is_valid():
            datos_formulario = form_cap.cleaned_data
            content_type = ContentType.objects.get_for_model(DocumentoCapacitacion)

            doc_capacitacion = DocumentoCapacitacion()
            doc_capacitacion.numero_empleado = numero_empleado
            doc_capacitacion.curso = datos_formulario.get('curso')
            doc_capacitacion.proveedor = datos_formulario.get('proveedor')
            doc_capacitacion.modalidad = datos_formulario.get('modalidad')
            doc_capacitacion.lugar = datos_formulario.get('lugar')
            doc_capacitacion.costo = datos_formulario.get('costo')
            doc_capacitacion.moneda = datos_formulario.get('moneda')
            doc_capacitacion.departamento = datos_formulario.get('departamento')
            doc_capacitacion.fecha_inicio = datos_formulario.get('fecha_inicio')
            doc_capacitacion.fecha_fin = datos_formulario.get('fecha_fin')
            doc_capacitacion.duracion = datos_formulario.get('duracion')
            doc_capacitacion.observaciones = datos_formulario.get('observaciones')
            doc_capacitacion.created_by = request.user.profile
            doc_capacitacion.save()
            archivo = Archivo()
            archivo.tipo_archivo = 'cap'
            archivo.archivo = datos_formulario.get('archivo')
            archivo.content_type = content_type
            archivo.object_id = doc_capacitacion.id
            archivo.created_by = request.user.profile
            archivo.updated_by = request.user.profile
            archivo.save()

        contexto = {
            'empleado': empleado,
            'ruta': ruta,
            'form': form_per,
            'form2': form_cap,
        }

        return render(request, self.template_name, contexto)

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
