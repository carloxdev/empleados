# Django API REST
from rest_framework import filters
from django_filters import CharFilter
from django_filters import DateFilter

# Modelos:
from .models import ViaticoCabecera


class ViaticoCabeceraFilter(filters.FilterSet):

    autorizador = CharFilter(
        name="autorizador",
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

    class Meta:
        model = ViaticoCabecera
        fields = [
            'empleado',
            'fecha_partida',
            'fecha_regreso_inicio',
            'fecha_regreso_fin',
            'unidad_negocio',
            'ciudad_destino',
            'proposito_viaje',
            'autorizador',
        ]
