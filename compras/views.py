# -*- coding: utf-8 -*-

# Django Atajos:
from django.shortcuts import render

# Librerias de Django
from django.views.generic.base import View

# Librerias de Propias

# Formularios
from .forms import SeguimientoComprasFilterForm


# -------------- COMPRAS -------------- #

class SeguimientoComprasLista(View):
    def __init__(self):
        self.template_name = 'seguimiento_compras_lista.html'

    def get(self, request):

        formulario = SeguimientoComprasFilterForm()

        contexto = {
            'form': formulario
        }

        return render(request, self.template_name, contexto)
