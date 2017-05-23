# -*- coding: utf-8 -*-

# Django Atajos:
from django.shortcuts import render

# Librerias de Django
from django.views.generic.base import View

# Librerias de Propias

# Formularios
from .forms import EmpleadoFilterForm


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

        contexto = {
        }

        return render(request, self.template_name, contexto)
