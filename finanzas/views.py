# -*- coding: utf-8 -*-

# Python's Libraries
import urllib

# Django's Libraries
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.shortcuts import redirect
from django.core.urlresolvers import reverse
from django.views.generic.base import View
from django.contrib import messages

# Own's Libraries
from .models import ViaticoCabecera

from .forms import ViaticoCabeceraForm
from .forms import ViaticoFilterForm
from .forms import ViaticoLineaForm

from .forms import AnticipoFilterForm


class ViaticoLista(View):
    template_name = 'viatico/viatico_lista.html'

    def get(self, request):

        formulario = ViaticoFilterForm()

        contexto = {
            'form': formulario
        }

        return render(request, self.template_name, contexto)


class ViaticoCabeceraNuevo(View):
    template_name = 'viatico/viatico_nuevo.html'

    def get(self, request):

        formulario = ViaticoCabeceraForm()

        contexto = {
            'form': formulario
        }

        return render(request, self.template_name, contexto)

    def url_with_querystring(self, path, **kwargs):
        return path + '?' + urllib.urlencode(kwargs)

    def post(self, request):

        formulario = ViaticoCabeceraForm(request.POST)

        if formulario.is_valid():
            viatico = formulario.save(commit=False)
            viatico.created_by = request.user.profile
            viatico.updated_by = request.user.profile
            viatico.save()

            return redirect(
                self.url_with_querystring(
                    reverse('finanzas:viatico_editar', kwargs={'pk': viatico.pk}),
                    new=True
                )
            )

        contexto = {
            'form': formulario
        }
        return render(request, self.template_name, contexto)


class ViaticoCabeceraEditar(View):
    template_name = 'viatico/viatico_editar.html'

    def obtener_Viatico(self, pk):
        viatico = get_object_or_404(ViaticoCabecera, pk=pk)

        return viatico

    def get(self, request, pk):

        if len(request.GET):
            flag_new = bool(request.GET['new'])
        else:
            flag_new = False

        formulario = ViaticoCabeceraForm(instance=self.obtener_Viatico(pk))
        formulario_linea = ViaticoLineaForm()

        contexto = {
            'form': formulario,
            'form_linea': formulario_linea,
            'flag_new': flag_new
        }
        return render(request, self.template_name, contexto)

    def post(self, request, pk):

        formulario = ViaticoCabeceraForm(request.POST, instance=self.obtener_Viatico(pk))
        formulario_linea = ViaticoLineaForm()

        if formulario.is_valid():
            viatico = formulario.save(commit=False)
            viatico.updated_by = request.user.profile
            viatico.save()
            messages.success(request, "Se modifico la solicitud exitosamente")

        contexto = {
            'form': formulario,
            'form_linea': formulario_linea
        }
        return render(request, self.template_name, contexto)


class AnticipoLista(View):
    def __init__(self):
        self.template_name = 'anticipo/anticipo_lista.html'

    def get(self, request):
        formulario = AnticipoFilterForm()

        contexto = {
            'form': formulario
        }

        return render(request, self.template_name, contexto)
