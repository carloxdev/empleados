# -*- coding: utf-8 -*-

# Django Atajos:
from django.shortcuts import render

# Librerias de Django
from django.views.generic.base import View

# Librerias de Propias

# Formularios
from .forms import EmpleadoFilterForm
from .forms import OrganizacionesFilterForm


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

        form = OrganizacionesFilterForm()

        contexto = {
            'form': form,
        }
        return render(request, self.template_name, contexto)


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

