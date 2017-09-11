# Django API REST
from rest_framework import filters
from django_filters import CharFilter

# Otros modelos
from .models import Solicitud


class ArchivoSolicitudFilter(filters.FilterSet):

    pk = CharFilter(
        name="pk",
        lookup_expr="contains")

    numero_empleado = CharFilter(
        name="numero_empleado",
        lookup_expr="contains")

    status = CharFilter(
        name="status",
        lookup_expr="contains")

    clave_departamento = CharFilter(
        name="clave_departamento",
        method="filter_departamento")

    asunto = CharFilter(
        name="asunto",
        method="filter_asunto")

    class Meta:
        model = Solicitud
        fields = [
            'pk',
            'numero_empleado',
            'status',
            'clave_departamento',
            'asunto',
        ]

    def filter_departamento(self, queryset, name, value):

        if not value:
            return ' '
        else:
            clave = queryset.filter(
                clave_departamento=value)
            return clave

    def filter_asunto(self, queryset, name, value):

        if not value:
            return ' '
        else:
            asunto = queryset.filter(asunto=value)
            return asunto
