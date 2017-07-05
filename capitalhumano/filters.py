# -*- coding: utf-8 -*-

# Django API REST
from rest_framework import filters
from django_filters import CharFilter

# Modelos:
from .models import PerfilPuestoDocumento
from .models import Archivo


class PerfilpuestoDocumentoFilter(filters.FilterSet):

    empleado_puesto_desc = CharFilter(
        name="empleado_puesto_desc",
        lookup_expr="icontains"
    )

    class Meta:
        model = PerfilPuestoDocumento
        fields = [
            'id',
            'empleado_puesto_desc',
        ]


class ArchivoPersonalFilter(filters.FilterSet):

    relacion_personal__numero_empleado = CharFilter(
        name="relacion_personal__numero_empleado",
        lookup_expr="contains")

    class Meta:
        model = Archivo
        fields = [
            'relacion_personal__numero_empleado',
        ]


class ArchivoCapacitacionFilter(filters.FilterSet):

    relacion_capacitacion__numero_empleado = CharFilter(
        name="relacion_capacitacion__numero_empleado",
        lookup_expr="contains")

    class Meta:
        model = Archivo
        fields = [
            'relacion_capacitacion__numero_empleado',
        ]
