# -*- coding: utf-8 -*-

from datetime import date
from datetime import timedelta

# Django API REST
from rest_framework import filters
from django_filters import CharFilter

# Modelos:
from .models import PerfilPuestoDocumento

# Otros Modelos
from home.models import Archivo

from ebs.models import VIEW_EMPLEADOS_FULL
from .models import DocumentoPersonal
from .models import DocumentoCapacitacion
from .models import TipoDocumento
from .models import Curso

from .models import PerfilPuestosCargo
from .models import PerfilCompetencias
from .models import PerfilIndicadores


class PerfilPuestoDocumentoFilter(filters.FilterSet):

    empleado_puesto_desc = CharFilter(
        name="empleado_puesto_desc",
        lookup_expr="icontains"
    )

    class Meta:
        model = PerfilPuestoDocumento
        fields = [
            'id',
            'empleado_puesto_desc',
            'asig_puesto_clave',
        ]


class PerfilpuestosCargoFilter(filters.FilterSet):

    pk = CharFilter(
        name="id",
        lookup_expr="icontains"
    )

    id_puesto = CharFilter(
        name="id_puesto",
        lookup_expr="icontains"
    )

    class Meta:
        model = PerfilPuestosCargo
        fields = [
            'pk',
            'id_puesto',
        ]


class PerfilCompetenciaFilter(filters.FilterSet):

    pk = CharFilter(
        name="id",
        lookup_expr="icontains")

    id_puesto = CharFilter(
        name="id_puesto",
        lookup_expr="contains")

    class Meta:
        model = PerfilCompetencias
        fields = [
            'pk',
            'id_puesto',
        ]


class DocumentoPersonalFilter(filters.FilterSet):

    numero_empleado = CharFilter(
        name="numero_empleado",
        lookup_expr="contains")

    agrupador = CharFilter(
        name="agrupador",
        lookup_expr="contains")

    tipo_documento = CharFilter(
        name="tipo_documento",
        method="filter_documento")

    tipo_documento_organizacion = CharFilter(
        name="tipo_documento_organizacion",
        method="filter_organizacion")

    tipo_documento_estatus = CharFilter(
        name='tipo_documento_estatus',
        method="filter_estatus"
    )

    class Meta:
        model = DocumentoPersonal
        fields = [
            'numero_empleado',
            'agrupador',
            'tipo_documento',
            'tipo_documento_organizacion',
            'tipo_documento_estatus',
        ]

    def filter_documento(self, queryset, name, value):

        if not value:
            return ' '
        else:
            documento = queryset.filter(
                tipo_documento=value)
            return documento

    def filter_organizacion(self, queryset, name, value):

        if not value:
            return ' '
        else:
            organizacion = VIEW_EMPLEADOS_FULL.objects.using(
                'ebs_p').filter(asig_organizacion_clave=value)
            empleados = queryset.all()
            incluir = []

            for dato in organizacion:
                if empleados.filter(numero_empleado=dato.pers_empleado_numero):
                    incluir.append(dato.pers_empleado_numero)

            return empleados.filter(numero_empleado__in=incluir)

    def filter_estatus(self, queryset, name, value):

        if not value:
            return ''
        else:
            empleados = queryset.all()
            fecha_actual = date.today()
            incluir = []
            fecha_por_vencer = fecha_actual + timedelta(days=90)

            if value == 'ven':
                for dato in empleados:
                    if dato is not None:
                        if dato.vigencia_fin is not None:
                            if dato.vigencia_fin < fecha_actual:
                                incluir.append(dato.id)
            elif value == 'por':
                for dato in empleados:
                    if dato is not None:
                        if dato.vigencia_fin is not None:
                            if (dato.vigencia_fin > fecha_actual) and \
                                    (dato.vigencia_fin <= fecha_por_vencer):
                                incluir.append(dato.id)

            return empleados.filter(id__in=incluir)


class DocumentoCapacitacionFilter(filters.FilterSet):

    numero_empleado = CharFilter(
        name="numero_empleado",
        lookup_expr="contains")

    curso = CharFilter(
        name="curso",
        method="filter_curso")

    agrupador = CharFilter(
        name="agrupador",
        lookup_expr="contains")

    area = CharFilter(
        name="area",
        lookup_expr="contains")

    proveedor = CharFilter(
        name="proveedor",
        method="filter_proveedor")

    curso_organizacion = CharFilter(
        name="curso_organizacion",
        method="filter_organizacion")

    curso_estatus = CharFilter(
        name="curso_estatus",
        method="filter_estatus")

    class Meta:
        model = DocumentoCapacitacion
        fields = [
            'numero_empleado',
            'curso',
            'agrupador',
            'area',
            'proveedor',
            'curso_organizacion',
            'curso_estatus',
        ]

    def filter_curso(self, queryset, name, value):

        if not value:
            return ' '
        else:
            curso = queryset.filter(curso=value)
            return curso

    def filter_organizacion(self, queryset, name, value):

        if not value:
            return ' '
        else:
            organizacion = VIEW_EMPLEADOS_FULL.objects.using(
                'ebs_p').filter(asig_organizacion_clave=value)
            empleados = queryset.all()
            incluir = []

            for dato in organizacion:
                if empleados.filter(numero_empleado=dato.pers_empleado_numero):
                    incluir.append(dato.pers_empleado_numero)

            return empleados.filter(numero_empleado__in=incluir)

    def filter_estatus(self, queryset, name, value):

        if not value:
            return ''
        else:
            empleados = queryset.all()
            fecha_actual = date.today()
            incluir = []
            fecha_por_vencer = fecha_actual + timedelta(days=90)

            if value == 'ven':
                for dato in empleados:
                    if dato.fecha_vencimiento != "Indefinido":
                        if dato.fecha_vencimiento != 0.0:
                            if dato.fecha_vencimiento < fecha_actual:
                                incluir.append(dato.id)
            elif value == 'por':
                for dato in empleados:
                    if dato.fecha_vencimiento != "Indefinido":
                        if dato.fecha_vencimiento != 0.0:
                            if (dato.fecha_vencimiento > fecha_actual) and \
                                    (dato.fecha_vencimiento <= fecha_por_vencer):
                                incluir.append(dato.id)

            return empleados.filter(id__in=incluir)

    def filter_proveedor(self, queryset, name, value):

        if not value:
            return ' '
        else:
            proveedor = queryset.filter(proveedor=value)
            return proveedor


class CursoFilter(filters.FilterSet):

    pk = CharFilter(
        name="pk",
        lookup_expr="exact")

    class Meta:
        model = Curso
        fields = [
            'pk',
            'nombre_curso',
            'vencimiento',
        ]


class TipoDocumentoFilter(filters.FilterSet):

    pk = CharFilter(
        name="pk",
        lookup_expr="icontains")

    tipo_documento = CharFilter(
        name="tipo_documento",
        lookup_expr="icontains")

    agrupador = CharFilter(
        name="agrupador",
        lookup_expr="icontains")

    class Meta:
        model = TipoDocumento
        fields = [
            'pk',
            'tipo_documento',
            'agrupador',
        ]

class PerfilIndicadorFilter(filters.FilterSet):

    pk = CharFilter(
        name="pk",
        lookup_expr="icontains")

    cvepuesto = CharFilter(
        name="cvepuesto",
        lookup_expr="icontains")

    class Meta:
        model = PerfilIndicadores
        fields = [
            'pk',
            'cvepuesto',
        ]