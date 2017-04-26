# -*- coding: utf-8 -*-

# Django API REST
from rest_framework import filters
from django_filters import CharFilter



# Modelos:
from .models import VIEW_EMPLEADOS_SIMPLE

class VIEW_EMPLEADOS_SIMPLEFilter(filters.FilterSet):

    pers_empleado_numero = CharFilter(
        name="pers_empleado_numero",
        lookup_expr="icontains"
    )

