# Django API REST
from rest_framework import filters
from django_filters import CharFilter

# Otros modelos
from .models import Solicitud
from ebs.models import VIEW_EMPLEADOS_FULL


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

    numero_empleado_oficina = CharFilter(
        name="numero_empleado_oficina",
        method="filter_oficina")

    class Meta:
        model = Solicitud
        fields = [
            'pk',
            'numero_empleado',
            'status',
            'clave_departamento',
            'asunto',
            'numero_empleado_oficina',
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

    def filter_oficina(self, queryset, name, value):

        if not value:
            return ' '
        else:
            lugar = VIEW_EMPLEADOS_FULL.objects.using(
                'ebs_p').filter(asig_ubicacion_clave=value)

            empleados = queryset.all()
            incluir = []

            for dato in lugar:
                if empleados.filter(numero_empleado=dato.pers_empleado_numero):
                    incluir.append(dato.pers_empleado_numero)
            return empleados.filter(numero_empleado__in=incluir)
