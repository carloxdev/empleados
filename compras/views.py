# -*- coding: utf-8 -*-
# Django Atajos:
from django.shortcuts import render

# Librerias de Django
from django.views.generic.base import View

# Librerias de Terceros:
# API Rest:
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend

# Modelos:
from jde.models import VIEW_SCOMPRAS

# Formularios
from .forms import ComprasSeguimientoForm

# Serializadores:
from .serializers import CompraSeguimientoSerializer

# Filtros:
from .filters import CompraSeguimientoFilter

# Paginacion
from .pagination import GenericPagination


# -------------- COMPRAS -------------- #

class Seguimiento(View):
    def __init__(self):
        self.template_name = 'seguimiento/seguimiento_filtro.html'

    def get(self, request):
        formulario = ComprasSeguimientoForm()
        contexto = {
            'form': formulario
        }

        return render(request, self.template_name, contexto)

# -------------- COMPRAS - API REST -------------- #


class CompraSeguimientoAPI(viewsets.ModelViewSet):
    queryset = VIEW_SCOMPRAS.objects.using('jde_p').all()
    serializer_class = CompraSeguimientoSerializer

    filter_backends = (DjangoFilterBackend,)
    filter_class = CompraSeguimientoFilter


class CompraSeguimientoByPageAPI(viewsets.ModelViewSet):
    queryset = VIEW_SCOMPRAS.objects.using('jde_p').all()
    serializer_class = CompraSeguimientoSerializer
    pagination_class = GenericPagination

    filter_backends = (DjangoFilterBackend,)
    filter_class = CompraSeguimientoFilter
