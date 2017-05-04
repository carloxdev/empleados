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
from jde.models import VIEW_ITEMS

# Formularios
from .forms import ComprasSeguimientoFilterForm

# Serializadores:
from .serializers import viewscomprasSerializer
from .serializers import viewunidadesSerializer
from .serializers import viewcompaniasSerializer
from .serializers import viewautorizacionesSerializer
from .serializers import viewrecepcionesSerializer
from .serializers import viewitemsSerializer

# Filtros:
from .filters import viewscomprasFilter
from .filters import viewautorizacionesFilter
from .filters import viewrecepcionesFilter
from .filters import viewitemsFilter

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

class viewscomprasAPI(viewsets.ModelViewSet):
    queryset = VIEW_SCOMPRAS.objects.using('jde_p').all()
    serializer_class = viewscomprasSerializer

    filter_backends = (DjangoFilterBackend,)
    filter_class = viewscomprasFilter

class viewscomprasByPageAPI(viewsets.ModelViewSet):
    queryset = VIEW_SCOMPRAS.objects.using('jde_p').all()
    serializer_class = viewscomprasSerializer
    pagination_class = GenericPagination

    filter_backends = (DjangoFilterBackend,)
    filter_class = viewscomprasFilter

class viewunidadesAPI(viewsets.ModelViewSet):
    queryset = VIEW_UNIDADES.objects.using('jde_p').all()
    serializer_class = viewunidadesSerializer

class viewcompaniasAPI(viewsets.ModelViewSet):
    queryset = VIEW_COMPANIAS.objects.using('jde_p').all()
    serializer_class = viewcompaniasSerializer

class viewautorizacionesAPI(viewsets.ReadOnlyModelViewSet):
    queryset = VIEW_AUTORIZACIONES.objects.using('jde_p').all()
    serializer_class = viewautorizacionesSerializer

    filter_backends = (DjangoFilterBackend,)
    filter_class = viewautorizacionesFilter

class viewrecepcionesAPI(viewsets.ReadOnlyModelViewSet):
    queryset = VIEW_RECEPCIONES.objects.using('jde_p').all()
    serializer_class = viewrecepcionesSerializer

    filter_backends = (DjangoFilterBackend,)
    filter_class = viewrecepcionesFilter

class viewitemsAPI(viewsets.ReadOnlyModelViewSet):
    queryset = VIEW_ITEMS.objects.using('jde_p').all()
    serializer_class = viewitemsSerializer
    #pagination_class = GenericPagination
    filter_backends = (DjangoFilterBackend,)
    filter_class = viewitemsFilter

