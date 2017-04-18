# -*- coding: utf-8 -*-
# Django Atajos:
from django.shortcuts import render
from django.core.urlresolvers import reverse_lazy

# Librerias de Django
from django.views.generic.base import View
from django.views.generic import CreateView
from django.views.generic import UpdateView
from django.views.generic import ListView
from django.views.generic import TemplateView

# Librerias Python

# Librerias de Terceros:

# API Rest:
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend

# Formularios:
from .forms import UsuarioFormularioForm

# Modelos:
from .models import Usuario

# Serializadores:
from .serializers import UsuarioSerializer

# Filtros:
from .filters import UsuarioFilter

# Paginacion
from .pagination import GenericPagination

# -------------- USUARIOS -------------- #

#class UsuarioBusqueda(View):
 #   model = Usuario
    

class UsuarioFormulario(CreateView):
    model = Usuario
    form_class = UsuarioFormularioForm
    template_name = 'usuarios/usuario_formulario.html'
    success_url = reverse_lazy('usuarios:usuario_lista')

# class UsuarioEditar(UpdateView):
#     model = Usuario
#     form_class = UsuarioFormularioForm
#     template_name = 'usuarios/usuario_formulario.html'
#     success_url = reverse_lazy ('usuarios:usuario_lista')

class UsuarioEditar(UpdateView):
    model = Usuario
    form_class = UsuarioFormularioForm
    template_name = 'usuarios/usuario_editar.html'
    success_url = reverse_lazy ('usuarios:usuario_lista')

class UsuarioBusqueda(TemplateView):
    template_name = 'usuarios/usuario_busqueda.html'

class UsuarioLista(ListView):
    model = Usuario
    template_name = 'usuarios/usuario_lista.html'


# -------------- USUARIOS API REST -------------- #

class UsuarioAPI(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = UsuarioFilter


class UsuarioByPageAPI(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = UsuarioFilter
    pagination_class = GenericPagination


