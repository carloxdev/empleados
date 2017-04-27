# Librerias/Clases Django
from django.shortcuts import render
from django.shortcuts import redirect
from django.shortcuts import get_object_or_404
from django.views.generic.base import View
from django.core.urlresolvers import reverse

# Librerias de Terceros:
# API Rest:
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend

# Modelos:
from .models import VIEW_EMPLEADOS_SIMPLE
from .models import VIEW_EMPLEADOS_FULL

# Serializadores:
from .serializers import VIEW_EMPLEADOS_SIMPLE_Serializer
from .serializers import VIEW_EMPLEADOS_FULL_Serializer

# Paginadores:
from .pagination import GenericPagination

# Filtros:
from .filters import VIEW_EMPLEADOS_SIMPLE_Filter
from .filters import VIEW_EMPLEADOS_FULL_Filter



# -------------- EBS - API REST -------------- #

class VIEW_EMPLEADOS_SIMPLE_API(viewsets.ModelViewSet):
    queryset = VIEW_EMPLEADOS_SIMPLE.objects.using('ebs_d').all()
    serializer_class = VIEW_EMPLEADOS_SIMPLE_Serializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = VIEW_EMPLEADOS_SIMPLE_Filter
    pagination_class = GenericPagination


class VIEW_EMPLEADOS_FULL_API(viewsets.ModelViewSet):
    queryset = VIEW_EMPLEADOS_FULL.objects.using('ebs_d').all()
    serializer_class = VIEW_EMPLEADOS_FULL_Serializer 
    filter_backends = (DjangoFilterBackend,)
    filter_class = VIEW_EMPLEADOS_FULL_Filter
    pagination_class = GenericPagination  


