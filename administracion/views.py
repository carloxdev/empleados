from django.shortcuts import render

# Librerias de Terceros:
# API Rest:
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend

# Modelos:
from ebs.models import VIEW_EMPLEADOS_SIMPLE
from ebs.models import VIEW_EMPLEADOS_FULL

# Serializadores:
from .serializers import VIEW_EMPLEADOS_SIMPLE_Serializer
from .serializers import VIEW_EMPLEADOS_FULL_Serializer


# -------------- ADMINISTRACION - API REST -------------- #

class VIEW_EMPLEADOS_SIMPLE_API(viewsets.ModelViewSet):
    queryset = VIEW_EMPLEADOS_SIMPLE.objects.using('ebs_d').all()
    serializer_class = VIEW_EMPLEADOS_SIMPLE_Serializer

class VIEW_EMPLEADOS_FULL_API(viewsets.ModelViewSet):
    queryset = VIEW_EMPLEADOS_FULL.objects.using('ebs_d').all()
    serializer_class = VIEW_EMPLEADOS_FULL_Serializer   

