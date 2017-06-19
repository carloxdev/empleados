# -*- coding: utf-8 -*-

# Django Atajos:
from django.shortcuts import render
from django.http import HttpResponse

# Librerias de Django
from django.views.generic.base import View

# Librerias de Propias

# Formularios
from .forms import EmpleadoFilterForm
from .forms import OrganizacionesFilterForm
from .forms import EmpresasFilterForm
from .forms import PerfilPuestoDocumentoForm

# Serializer crear organigrama
from ebs.serializers import VIEW_ORGANIGRAMA_ORG_SERIALIZADO
from ebs.serializers import VIEW_ORGANIGRAMA_EMP_SERIALIZADO

# Modelos
from ebs.models import VIEW_ORGANIGRAMA


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