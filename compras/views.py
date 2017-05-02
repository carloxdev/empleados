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
from jde.models import VIEW_UNIDADES
from jde.models import VIEW_COMPANIAS
from jde.models import VIEW_AUTORIZACIONES
from jde.models import VIEW_RECEPCIONES

# Formularios
from .forms import ComprasSeguimientoFilterForm

# Serializadores:
from .serializers import CompraSeguimientoSerializer
from .serializers import CompraSeguimientoSucursalSerializer
from .serializers import CompraSeguimientoCompaniaSerializer
from .serializers import CompraSeguimientoAutorizacionesSerializer
from .serializers import CompraSeguimientoRecepcionesSerializer

# Filtros:
from .filters import CompraSeguimientoFilter
from .filters import CompraSeguimientoAutorizacionesFilter
from .filters import CompraSeguimientoRecepcionesFilter

# Paginacion
from .pagination import GenericPagination


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

class CompraSeguimientoSucursalAPI(viewsets.ModelViewSet):
    queryset = VIEW_UNIDADES.objects.using('jde_p').all()
    serializer_class = CompraSeguimientoSucursalSerializer

class CompraSeguimientoCompaniaAPI(viewsets.ModelViewSet):
    queryset = VIEW_COMPANIAS.objects.using('jde_p').all()
    serializer_class = CompraSeguimientoCompaniaSerializer

class CompraSeguimientoAutorizacionesAPI(viewsets.ReadOnlyModelViewSet):
    queryset = VIEW_AUTORIZACIONES.objects.using('jde_p').all()
    serializer_class = CompraSeguimientoAutorizacionesSerializer
    pagination_class = GenericPagination

    filter_backends = (DjangoFilterBackend,)
    filter_class = CompraSeguimientoAutorizacionesFilter

class CompraSeguimientoRecepcionesAPI(viewsets.ReadOnlyModelViewSet):
    queryset = VIEW_RECEPCIONES.objects.using('jde_p').all()
    serializer_class = CompraSeguimientoRecepcionesSerializer
    pagination_class = GenericPagination

    filter_backends = (DjangoFilterBackend,)
    filter_class = CompraSeguimientoRecepcionesFilter

