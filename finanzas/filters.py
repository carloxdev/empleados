# Django API REST
from rest_framework import filters
from django_filters import CharFilter
from django_filters import DateFilter

# Modelos:
from .models import ViaticoCabecera


class ViaticoCabeceraFilter(filters.FilterSet):

    created_date_inicio = DateFilter(
        name="created_date",
        lookup_expr="gte"
    )
    created_date_fin = DateFilter(
        name="created_date",
        lookup_expr="lte"
    )

    empleado = CharFilter(
        name="empleado",
        lookup_expr="icontains"
    )

    unidad_negocio = CharFilter(
        name="unidad_negocio",
        lookup_expr="icontains"
    )

    ciudad_destino = CharFilter(
        name="ciudad_destino",
        lookup_expr="icontains"
    )

    autorizador = CharFilter(
        name="autorizador",
        lookup_expr="icontains"
    )

    class Meta:
        model = ViaticoCabecera
        fields = [
            'empleado',
            'unidad_negocio',
            'ciudad_destino',
            'autorizador',
            'created_date_inicio',
            'created_date_fin',
        ]
