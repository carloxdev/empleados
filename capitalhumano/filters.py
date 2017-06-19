# -*- coding: utf-8 -*-

# Django API REST
from rest_framework import filters
from django_filters import CharFilter
# from django_filters import DateFilter
# from django_filters import NumberFilter


# Modelos:
from .models import PerfilPuestoDocumento


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
