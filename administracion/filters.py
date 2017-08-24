# Django API REST
from rest_framework import filters
from django_filters import CharFilter

# Otros modelos
from .models import Archivo


class ArchivoSolicitudFilter(filters.FilterSet):

    relacion_solicitud__status = CharFilter(
        name="relacion_solicitud__status",
        lookup_expr="contains")

    relacion_solicitud__clave_departamento = CharFilter(
        name="relacion_solicitud__clave_departamento",
        method="filter_departamento")

    relacion_solicitud__asunto = CharFilter(
        name="relacion_solicitud__asunto",
        method="filter_asunto")

    relacion_solicitud__numero_empleado = CharFilter(
        name="relacion_solicitud__numero_empleado",
        lookup_expr="contains")

    relacion_solicitud__id = CharFilter(
        name="relacion_solicitud__id",
        lookup_expr="contains")

    class Meta:
        model = Archivo
        fields = [
            'relacion_solicitud__id',
            'relacion_solicitud__status',
            'relacion_solicitud__clave_departamento',
            'relacion_solicitud__asunto',
            'relacion_solicitud__numero_empleado',
        ]

    def filter_departamento(self, queryset, name, value):

        if not value:
            return ' '
        else:
            clave = queryset.filter(
                relacion_solicitud__clave_departamento=value)
            return clave

    def filter_asunto(self, queryset, name, value):

        if not value:
            return ' '
        else:
            asunto = queryset.filter(relacion_solicitud__asunto=value)
            return asunto
