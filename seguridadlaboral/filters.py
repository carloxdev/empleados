# -*- coding: utf-8 -*-

# Django API REST
from rest_framework import filters
from django_filters import CharFilter
# from django_filters import DateFilter
# from django_filters import NumberFilter


# Modelos:
from .models import IncidenciaDocumento
from .models import CentroAtencion
from administracion.models import Zona
from .models import IncidenciaArchivo
from .models import IncidenciaResolucion


class IncidenciaDocumentoFilter(filters.FilterSet):

    zona = CharFilter(
        name="zona_id",
        method='filter_zona',
        lookup_expr="icontains"
    )

    status = CharFilter(
        name="status",
        lookup_expr="icontains"
    )

    es_registrable = CharFilter(
        name="es_registrable",
        lookup_expr="icontains"
    )


    # fecha_anio = CharFilter(
    #     name="fecha_anio",
    #     method='get_fecha_byanio'
    # )

    fecha_mayorque = CharFilter(
        name='fecha_mayorque',
        method='filter_fecha_mayorque'
    )

    fecha_menorque = CharFilter(
        name='fecha_menorque',
        method='filter_fecha_menorque'
    )

    empleado_nombre = CharFilter(
        name="empleado_nombre",
        lookup_expr="icontains"
    )

    empleado_proyecto_desc = CharFilter(
        name="empleado_proyecto_desc",
        lookup_expr="icontains"
    )

    empleado_puesto_desc = CharFilter(
        name="empleado_proyecto_desc",
        lookup_expr="icontains"
    )

    empleado_organizacion = CharFilter(
        name="empleado_organizacion",
        lookup_expr="icontains"
    )

    class Meta:
        model = IncidenciaDocumento
        fields = [
            'id',
            'tipo',
            'fecha_mayorque',
            'fecha_menorque',
            'es_registrable',
            'zona_id',
            'status',
            'empleado_nombre',
            'empleado_proyecto_desc',
            'empleado_puesto_desc',
            'empleado_organizacion',
            'centro_atencion',
        ]


    def filter_zona(self, queryset, name, value):

        if not value:
            return ' '
        else:
            zona = queryset.filter(
                zona_id=value)
            return zona

    # def get_fecha_byanio(self, queryset, name, value):

    #     if not value:
    #         return queryset
    #     else:
    #         consulta = queryset.filter(fecha__year=value)
    #         return consulta

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


class CentroAtencionFilter(filters.FilterSet):

    descripcion = CharFilter(
        name="descripcion",
        lookup_expr="icontains"
    )   

    class Meta:
        model = IncidenciaDocumento
        fields = [
            'id',
            'descripcion',
            'created_by',
        ] 

class IncidenciaArchivoFilter(filters.FilterSet):

    id = CharFilter(
        name="id",
        lookup_expr="icontains"
    )

    incidencia_id = CharFilter(
        name="incidencia_ids",
        lookup_expr="icontains"
    )

    class Meta:
        model = IncidenciaArchivo
        fields = [
            'id',
            'incidencia_id',
        ]               

class IncidenciaResolucionFilter(filters.FilterSet):

    id_incidencia = CharFilter(
        name="incidencia",
        lookup_expr="icontains"
    )

    class Meta:
        model = IncidenciaResolucion
        fields = [
            'incidencia', 
        ]               
