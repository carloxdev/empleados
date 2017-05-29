# -*- coding: utf-8 -*-

# Librerias/Clases Python

# Librerias/Clases Django
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.shortcuts import redirect
from django.core.urlresolvers import reverse
from django.views.generic.base import View
# from django.views.generic import CreateView

# Librerias/Clases propias

# Modelos:
from .models import ViaticoCabecera

# Formularios:
from .forms import ViaticoCabeceraForm
# from .forms import ViaticoLineaForm
from .forms import ViaticoFilterForm


class ViaticoLista(View):
    def __init__(self):
        self.template_name = 'viatico/viatico_lista.html'

    def get(self, request):

        formulario = ViaticoFilterForm()

        contexto = {
            'form': formulario
        }

        return render(request, self.template_name, contexto)


class ViaticoCabeceraNuevo(View):

    def __init__(self):
        self.template_name = 'viatico/viatico_nuevo.html'

    def get(self, request):

        formulario = ViaticoCabeceraForm()

        contexto = {
            'form': formulario
        }

        return render(request, self.template_name, contexto)

    def post(self, request):

        formulario = ViaticoCabeceraForm(request.POST)

        if formulario.is_valid():

            viatico = formulario.save(commit=False)
            viatico.created_by = request.user.profile
            viatico.updated_by = request.user.profile
            viatico.save()

            return redirect(reverse('finanzas:viatico_lineas'))

        contexto = {
            'form': formulario
        }
        return render(request, self.template_name, contexto)


class ViaticoCabeceraEditar(View):

    def __init__(self):
        self.template_name = 'viatico/viatico_editar.html'

    def obtener_Viatico(self, pk):
        viatico = get_object_or_404(ViaticoCabecera, pk=pk)

        return viatico

    def get(self, request, pk):

        formulario = ViaticoCabeceraForm(instance=self.obtener_Viatico(pk))

        contexto = {
            'form': formulario
        }
        return render(request, self.template_name, contexto)

    def post(self, request, pk):

        formulario = ViaticoCabeceraForm(request.POST, instance=self.obtener_Viatico(pk))

        if formulario.is_valid():
            viatico = formulario.save(commit=False)
            viatico.updated_by = request.user.profile
            viatico.save()

            return redirect(reverse('finanzas:viatico_lista'))

        contexto = {
            'form': formulario,
        }
        return render(request, self.template_name, contexto)


class ViaticoLineas(View):
    def __init__(self):
        self.template_name = 'viatico/viatico_lineas.html'

    def get(self, request, pk):

        # formulario = ViaticoFilterForm()

        # contexto = {
        #     'form': formulario
        # }

        return render(request, self.template_name, {})
