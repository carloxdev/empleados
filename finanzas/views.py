# -*- coding: utf-8 -*-

# Librerias/Clases Python

# Librerias/Clases Django
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.shortcuts import redirect
from django.core.urlresolvers import reverse
from django.views.generic.base import View
from django.views.generic import CreateView

# Librerias/Clases de Terceros
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend

# Librerias/Clases propias

# Modelos:
from .models import ViaticoCabecera
from .models import ViaticoLinea

# Formularios:
from .forms import ViaticoCabeceraForm
from .forms import ViaticoLineaForm
from .forms import ViaticoFilterForm

# Serializadores:
from .serializers import ViaticoCabeceraSerializer
# from .serializers import ViaticoLineaSerializer

# Filtros:
from .filters import ViaticoCabeceraFilter

# Paginacion:
from home.pagination import GenericPagination

# from django.core.urlresolvers import reverse_lazy
# from django.http import HttpResponse


# -------------- VIATICO -------------- #

class ViaticoLista(View):
    def __init__(self):
        self.template_name = 'viatico/viatico_lista.html'

    def get(self, request):

        formulario = ViaticoFilterForm()

        contexto = {
            'form': formulario
        }

        return render(request, self.template_name, contexto)


class ViaticoNuevo(View):

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
            viatico.save()

            return redirect(reverse('finanzas:viatico_editar', kwargs={'pk': viatico.id}))

        contexto = {
            'form': formulario
        }
        return render(request, self.template_name, contexto)


class ViaticoEditar(View):

    def __init__(self):
        self.template_name = 'viatico/viatico_editar.html'

    def get(self, request, pk):
        viatico = get_object_or_404(ViaticoCabecera, pk=pk)
        formulario = ViaticoCabeceraForm(instance=viatico)
        formulario2 = ViaticoLineaForm()
        operation = viatico.get_status_display()

        contexto = {
            'form': formulario,
            'form2': formulario2,
            'operation': operation,
            'id_cabecera': viatico.id,
        }
        return render(request, self.template_name, contexto)

    def post(self, request, pk):

        viatico = get_object_or_404(ViaticoCabecera, pk=pk)
        formulario = ViaticoCabeceraForm(request.POST, instance=viatico)
        operation = viatico.get_status_display()

        if formulario.is_valid():
            viatico = formulario.save()
            return redirect(reverse('finanzas:viatico_lista'))

        contexto = {
            'form': formulario,
            'operation': operation,
            'id_cabecera': viatico.id,
        }
        return render(request, self.template_name, contexto)


# -------------- VIATICO - API REST -------------- #

class ViaticoCabeceraAPI(viewsets.ModelViewSet):
    queryset = ViaticoCabecera.objects.all()
    serializer_class = ViaticoCabeceraSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = ViaticoCabeceraFilter


class ViaticoCabeceraByPageAPI(viewsets.ModelViewSet):
    queryset = ViaticoCabecera.objects.all()
    serializer_class = ViaticoCabeceraSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = ViaticoCabeceraFilter
    pagination_class = GenericPagination
