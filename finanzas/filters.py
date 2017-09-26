# Django API REST
from rest_framework import filters
from django_filters import CharFilter
# from django_filters import DateFilter

# Modelos:
from .models import ViaticoCabecera
from .models import ViaticoLinea


class ViaticoCabeceraFilter(filters.FilterSet):

    proposito_viaje = CharFilter(
        name="proposito_viaje",
        lookup_expr="icontains"
    )
    empleado_clave = CharFilter(
        name="empleado_clave",
        lookup_expr="icontains"
    )
    un_clave = CharFilter(
        name="un_clave",
        lookup_expr="icontains"
    )
    ciudad_destino = CharFilter(
        name="ciudad_destino",
        lookup_expr="icontains"
    )
    autorizador_clave = CharFilter(
        name="autorizador_clave",
        lookup_expr="icontains"
    )
    creacion_fecha_mayorque = CharFilter(
        label="Fecha Creacion mayor a",
        name="creacion_fecha_mayorque",
        method='filter_fecha_mayorque'
    )
    creacion_fecha_menorque = CharFilter(
        label="Fecha Creacion menor a",
        name="creacion_fecha_menorque",
        method='filter_fecha_menorque'
    )
    status = CharFilter(
        label="Status",
        name="status",
        lookup_expr="icontains"
    )

    class Meta:
        model = ViaticoCabecera
        fields = [
            'proposito_viaje',
            'empleado_clave',
            'un_clave',
            'ciudad_destino',
            'autorizador_clave',
            'status',
        ]

    def filter_fecha_mayorque(self, queryset, name, value):

        valor = "{}T00:00:00".format(value)

        if not value:
            return queryset
        else:
            consulta = queryset.filter(created_date__gte=valor)
            return consulta

    def filter_fecha_menorque(self, queryset, name, value):

        valor = "{}T23:59:59".format(value)

        if not value:
            return queryset
        else:
            consulta = queryset.filter(created_date__lte=valor)
            return consulta


class ViaticoLineaFilter(filters.FilterSet):

    concepto_clave = CharFilter(name="concepto_clave", lookup_expr="icontains")

    class Meta:
        model = ViaticoLinea
        fields = [
            'id',
            'cabecera',
            'concepto_clave'
        ]
