# -*- coding: utf-8 -*-

# Django API REST
from rest_framework import filters
from django_filters import CharFilter
from django_filters import DateFilter
from django_filters import NumberFilter


# Modelos:
from .models import IncidenciaDocumento


class IncidenciaDocumentoFilter(filters.FilterSet):

    empleado_zona = CharFilter(
        name="empleado_zona",
        lookup_expr="icontains"
    )

    fecha_mayorque = CharFilter(
        name='fecha_mayorque',
        method='filter_fecha_mayorque'
    )

    fecha_menorque = CharFilter(
        name='fecha_menorque',
        method='filter_fecha_menorque'
    )

    class Meta:
        model = IncidenciaDocumento
        fields = [
            'tipo',
            'fecha_mayorque',
            'fecha_menorque',
            'es_registrable',
            'empleado_zona',
        ]

    def filter_fecha_mayorque(self, queryset, name, value):

        valor = "{}T00:00:00".format(value)

        if not value:
            return queryset
        else:
            consulta = queryset.filter(fecha__gte=valor)
            return consulta

    def filter_fecha_menorque(self, queryset, name, value):

        valor = "{}T23:59:59".format(value)

        if not value:
            return queryset
        else:
            consulta = queryset.filter(fecha__lte=valor)
            return consulta
