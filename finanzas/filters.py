# Django API REST
from rest_framework import filters
from django_filters import CharFilter
from django_filters import DateFilter

# Modelos:
from .models import ViaticoCabecera


class ViaticoCabeceraFilter(filters.FilterSet):

    empleado = CharFilter(
        name="empleado",
        lookup_expr="icontains"
    )

    fecha_regreso_inicio = DateFilter(
        name="fecha_regreso",
        lookup_expr="gte"
    )

    fecha_regreso_fin = DateFilter(
        name="fecha_regreso",
        lookup_expr="lte"
    )

    unidad_negocio = CharFilter(
        name="ciudad_destino",
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
            'fecha_partida',
            'fecha_regreso_inicio',
            'fecha_regreso_fin',
            'unidad_negocio',
            'ciudad_destino',
            'autorizador',
        ]
