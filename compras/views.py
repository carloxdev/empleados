# -*- coding: utf-8 -*-

# Django Atajos:
from django.shortcuts import render

# Librerias de Django
from django.views.generic.base import View

# Librerias de Propias

# Formularios
from .forms import ComprasSeguimientoFilterForm


# -------------- COMPRAS -------------- #

class Seguimiento(View):
    def __init__(self):
        self.template_name = 'seguimiento/seguimiento_filtro.html'

    def get(self, request):

        formulario = ComprasSeguimientoFilterForm()

        contexto = {
            'form': formulario
        }

        return render(request, self.template_name, contexto)
