# Django API REST
from rest_framework import filters
from django_filters import CharFilter
# from django_filters import DateFilter

# Modelos:
from .models import ViaticoCabecera


class ViaticoCabeceraFilter(filters.FilterSet):

    empleado_clave = CharFilter(
        name="empleado_clave",
        lookup_expr="icontains"
    )

    empleado_descripcion = CharFilter(
        name="empleado_descripcion",
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

    created_date_mayorque = CharFilter(
        name="created_date_mayorque",
        method='filter_fecha_mayorque'
    )
    created_date_menorque = CharFilter(
        name="created_date_menorque",
        method='filter_fecha_menorque'
    )

    class Meta:
        model = ViaticoCabecera
        fields = [
            'empleado_clave',
            'empleado_descripcion',
            'unidad_negocio',
            'ciudad_destino',
            'autorizador',
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
