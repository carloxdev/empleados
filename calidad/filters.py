# -*- coding: utf-8 -*-

# Django API REST
from rest_framework import filters
from django_filters import CharFilter
from django_filters import NumberFilter

# Modelos:
from .models import Requisito
from .models import Responsable
from .models import CompaniaAccion
from .models import Rol
from .models import RequisitoProceso
from .models import HallazgoProceso
from .models import Subproceso
from .models import AnalisisHallazgo
from .models import PlanAccionHallazgo
from .models import SeguimientoPlanAccion
from .models import EvidenciaHallazgo

class RequisitoFilter(filters.FilterSet):

    requisito = CharFilter(
        name="requisito",
        lookup_expr="icontains"
    )

    criterio_id = NumberFilter(
        name="criterio_id",
        lookup_expr="exact"
    )

    class Meta:
        model = Requisito
        fields = [
            'requisito',
            'criterio_id'
        ]


class ResponsablesFilter(filters.FilterSet):

    nombre_completo = CharFilter(
        name="nombre_completo",
        lookup_expr="exact"
    )

    numero_empleado = CharFilter(
        name="numero_empleado",
        lookup_expr="exact"
    )

    proceso_id = NumberFilter(
        name="proceso_id",
        lookup_expr="exact"
    )

    class Meta:
        model = Responsable
        fields = [
            'nombre_completo',
            'numero_empleado',
            'proceso_id',
        ]


class CompaniaAccionFilter(filters.FilterSet):

    compania_codigo = CharFilter(
        name="compania_codigo",
        lookup_expr="exact"
    )

    compania = CharFilter(
        name="compania",
        lookup_expr="exact"
    )

    personal_rol_id = NumberFilter(
        name="personal_rol_id",
        lookup_expr="exact"
    )

    class Meta:
        model = CompaniaAccion
        fields = [
            'compania_codigo',
            'compania',
            'personal_rol_id',
        ]


class RolFilter(filters.FilterSet):

    nombre_completo = CharFilter(
        name="nombre_completo",
        lookup_expr="exact"
    )

    numero_empleado = CharFilter(
        name="numero_empleado",
        lookup_expr="exact"
    )

    rol = CharFilter(
        name="rol",
        lookup_expr="exact"
    )

    class Meta:
        model = Rol
        fields = [
            'nombre_completo',
            'numero_empleado',
            'rol',
        ]


class RequisitoProcesoFilter(filters.FilterSet):

    requisito_id = NumberFilter(
        name="requisito_id",
        lookup_expr="exact"
    )
    proceso_auditoria_id = NumberFilter(
        name="proceso_auditoria_id",
        lookup_expr="exact"
    )

    class Meta:
        model = RequisitoProceso
        fields = [
            'requisito_id',
            'proceso_auditoria_id'
        ]


class HallazgoProcesoFilter(filters.FilterSet):

    titulo = CharFilter(
        name="titulo",
        lookup_expr="icontains"
    )

    estado = CharFilter(
        name="estado",
        lookup_expr="exact"
    )

    tipo_hallazgo = CharFilter(
        name="tipo_hallazgo",
        lookup_expr="exact"
    )

    cerrado = CharFilter(
        name="cerrado",
        lookup_expr="exact"
    )

    class Meta:
        model = HallazgoProceso
        fields = [
            'titulo',
            'estado',
            'tipo_hallazgo',
            'cerrado',
        ]

class SubprocesoFilter(filters.FilterSet):

    subproceso = CharFilter(
        name="subproceso",
        lookup_expr="exact"
    )

    proceso_id = NumberFilter(
        name="proceso_id",
        lookup_expr="exact"
    )

    class Meta:
        model = Subproceso
        fields = [
            'subproceso',
            'proceso_id',
        ]

class AnalisisHallazgoFilter(filters.FilterSet):

    titulo = CharFilter(
        name="titulo",
        lookup_expr="icontains"
    )

    hallazgo_id = NumberFilter(
        name="hallazgo_id",
        lookup_expr="exact"
    )

    class Meta:
        model = AnalisisHallazgo
        fields = [
            'titulo',
            'hallazgo_id'
        ]


class PlanAccionHallazgoFilter(filters.FilterSet):

    titulo = CharFilter(
        name="titulo",
        lookup_expr="icontains"
    )

    hallazgo_id = NumberFilter(
        name="hallazgo_id",
        lookup_expr="exact"
    )

    class Meta:
        model = PlanAccionHallazgo
        fields = (
            'titulo',
            'actividad',
            'responsable',
            'fecha_programada',
            'evidencia',
            'hallazgo',
            'hallazgo_id',
            'resultado',
            'resultado_evaluacion',
            'fecha_evaluacion',
            'criterio_decision',
            'tipo_accion',
            'observacion',
            'create_by',
            'create_date',
            'update_by',
            'update_date',
        )


class SeguimientoPlanAccionFilter(filters.FilterSet):

    plan_accion_hallazgo_id = NumberFilter(
        name="hallazgo_id",
        lookup_expr="exact"
    )

    class Meta:
        model = SeguimientoPlanAccion
        fields = (
            'resultado_seguimiento',
            'fecha_seguimiento',
            'plan_accion_hallazgo',
            'plan_accion_hallazgo_id',
            'create_by',
            'create_date',
            'update_by',
            'update_date',
        )


class EvidenciaHallazgoFilter(filters.FilterSet):

    titulo = CharFilter(
        name="titulo",
        lookup_expr="icontains"
    )

    hallazgo_id = NumberFilter(
        name="hallazgo_id",
        lookup_expr="exact"
    )

    class Meta:
        model = EvidenciaHallazgo
        fields = (
            'titulo',
            'observacion',
            'hallazgo',
            'hallazgo_id',
            'create_by',
            'create_date',
            'update_by',
            'update_date',
        )
