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

# Serializer crear organigrama
from ebs.serializers import VIEW_ORGANIGRAMA_ORG_SERIALIZADO
from ebs.serializers import VIEW_ORGANIGRAMA_EMP_SERIALIZADO

# Modelos
from ebs.models import VIEW_ORGANIGRAMA
from administracion.models import Empresa


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

# -------------- INDICADORES -------------- #


class EmpleadoDashboard(View):

    def __init__(self):
        self.template_name = 'empleado_dashboard.html'

    def get(self, request):

        form = OrganizacionesFilterForm()

        contexto = {
            'form': form,
        }
        return render(request, self.template_name, contexto)


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
        print pk+'AQUI ESTA LA EMPRESA'
        daddies = VIEW_ORGANIGRAMA.objects.using(
            'ebs_d').filter(grup_compania_jde=pk) 

        serializador = VIEW_ORGANIGRAMA_EMP_SERIALIZADO()
        lista_json = serializador.get_Json(daddies)

        return HttpResponse(
            lista_json,
            content_type="application/json"
        )


class PerfilPuesto(View):

    def get(self, request):

        return render(request, 'perfilpuesto/perfil_lista.html')


class PerfilPuestoNuevo(View):

    def get(self, request):

        return render(request, 'perfilpuesto/perfil_nuevo.html')


class PerfilPuestoNuevo2(View):

    def get(self, request):

        return render(request, 'perfilpuesto/perfil_nuevo2.html')


class PerfilPuestoConfiguraciones(View):

    def get(self, request):

        return render(request, 'perfilpuesto/perfil_configuracion.html')
