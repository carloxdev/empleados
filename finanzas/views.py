# -*- coding: utf-8 -*-

# Django Atajos:
from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django.shortcuts import redirect
from django.core.urlresolvers import reverse
from django.views.generic.base import View

# Librerias de Django
from django.views.generic.base import View
from django.core.files.storage import default_storage

# Modelos
from .models import ViaticoCabecera

#Formularios
from .forms import AnticipoFilterForm

class AnticipoLista(View):
    def __init__(self):
        self.template_name = 'anticipo/anticipo_lista.html'

    def get(self, request):
        formulario = AnticipoFilterForm()

        contexto = {
            'form': formulario
        }

        return render(request, self.template_name, contexto)
