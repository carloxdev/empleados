# -*- coding: utf-8 -*-

# Django Atajos:
from django.shortcuts import render

# Librerias de Django
from django.views.generic.base import View

# Librerias de Propias

# Formularios
from .forms import EmpleadosFilterForm


# -------------- EMPLEADOS -------------- #

class Empleados(View):
    def __init__(self):
        self.template_name = 'empleados/empleados_filtro.html'

    def get(self, request):

        formulario = EmpleadosFilterForm()

        contexto = {
            'form': formulario
        }

        return render(request, self.template_name, contexto)
