# -*- coding: utf-8 -*-

# Django API REST
import django_filters
from rest_framework import filters

# Modelos:
from .models import VIEW_SCOMPRAS
from .models import VIEW_INVENTARIO
from .models import VIEW_INVENTARIO_UN
from .models import VM_PORF_COMPRAS
from .models import VM_PORF_CXC
from .models import VM_PORF_CXP
from .models import VM_PORF_NOMINA
from .models import VIEW_RECEPSINCOTEJO

# ----------------- VIEW_SCOMPRAS ----------------- #


class VIEW_SCOMPRAS_Filter(filters.FilterSet):

    req_comprador_desc = django_filters.CharFilter(
        name="req_comprador_desc",
        lookup_expr="contains"
    )

    req_generador_desc = django_filters.CharFilter(
        name="req_generador_desc",
        lookup_expr="contains"
    )

    fecha_min = django_filters.DateTimeFilter(
        name="req_fecha_creacion",
        lookup_expr="gte"
    )
    fecha_mx = django_filters.DateTimeFilter(
        name="req_fecha_creacion",
        lookup_expr="lte"
    )

    ord_proveedor_desc = django_filters.CharFilter(
        name="ord_proveedor_desc",
        lookup_expr="contains"
    )

    req_item_desc = django_filters.CharFilter(
        name="req_item_desc",
        lookup_expr="contains"
    )

    class Meta:
        model = VIEW_SCOMPRAS
        fields = [
            'req_compania',
            'req_un',
            'req_comprador_desc',
            'req',
            'req_tipo',
            'req_generador_desc',

            'fecha_min',
            'fecha_mx',

            'cot',
            'cot_tipo',
            'cot_generador',

            'ord',
            'ord_tipo',
            'ord_generador',

            'ord_proveedor_desc',
            'req_item_numero',
            'req_item_desc',

            'ord_recepcion',
        ]

# ----------------- VIEW_INVENTARIO ----------------- #


class VIEW_INVENTARIO_UN_Filter(filters.FilterSet):

    proyecto_cve = django_filters.CharFilter(
        name="proyecto_cve",
        lookup_expr="contains"
    )

    class Meta:
        model = VIEW_INVENTARIO_UN
        fields = [
            'proyecto_cve',
            'proyecto_desc',
        ]


class VIEW_INVENTARIO_Filter(filters.FilterSet):

    proyecto_cve = django_filters.CharFilter(
        name="proyecto_cve",
        lookup_expr="contains"
    )

    class Meta:
        model = VIEW_INVENTARIO
        fields = [
            'proyecto_cve',
            'proyecto_desc',
            'articulo_cve',
            'articulo_desc',
            'imglpt',
            'un_cve',
            'un_desc',
            'fecha_recepcion',
        ]

# ----------------- VM_PORF_COMPRAS ----------------- #


class VM_PORF_COMPRAS_Filter(filters.FilterSet):

    cuenta_desc = django_filters.CharFilter(
        name="cuenta_desc",
        lookup_expr="contains"
    )
    doc_fecha_lm_ini = django_filters.DateFilter(
        name="doc_fecha_lm",
        lookup_expr="gte"
    )
    doc_fecha_lm_fin = django_filters.DateFilter(
        name="doc_fecha_lm",
        lookup_expr="lte"
    )

    class Meta:
        model = VM_PORF_COMPRAS
        fields = [
            'doc_compania',
            'anio',
            'periodo',
            'doc_tipo',
            'doc_numero',
            'doc_fecha_lm_ini',
            'doc_fecha_lm_fin',
            'un_proyecto',
            'un',
            'cuenta_desc',
            'cuenta_clase',
            'cuenta_clase_porf',
        ]

# ----------------- VM_PORF_CXC ----------------- #


class VM_PORF_CXC_Filter(filters.FilterSet):

    cuenta_desc = django_filters.CharFilter(
        name="cuenta_desc",
        lookup_expr="contains"
    )
    doc_fecha_lm_ini = django_filters.DateFilter(
        name="doc_fecha_lm",
        lookup_expr="gte"
    )
    doc_fecha_lm_fin = django_filters.DateFilter(
        name="doc_fecha_lm",
        lookup_expr="lte"
    )

    class Meta:
        model = VM_PORF_CXC
        fields = [
            'doc_compania',
            'anio',
            'periodo',
            'doc_tipo',
            'doc_numero',
            'doc_fecha_lm_ini',
            'doc_fecha_lm_fin',
            'un_proyecto',
            'un',
            'cuenta_desc',
            'cuenta_clase',
            'cuenta_porf_clase',
        ]

# ----------------- VM_PORF_CXP ----------------- #


class VM_PORF_CXP_Filter(filters.FilterSet):

    cuenta_desc = django_filters.CharFilter(
        name="cuenta_desc",
        lookup_expr="contains"
    )
    doc_fecha_lm_ini = django_filters.DateFilter(
        name="doc_fecha_lm",
        lookup_expr="gte"
    )
    doc_fecha_lm_fin = django_filters.DateFilter(
        name="doc_fecha_lm",
        lookup_expr="lte"
    )

    class Meta:
        model = VM_PORF_CXP
        fields = [
            'doc_compania',
            'anio',
            'periodo',
            'doc_tipo',
            'doc_numero',
            'doc_fecha_lm_ini',
            'doc_fecha_lm_fin',
            'un_proyecto',
            'un',
            'cuenta_desc',
            'cuenta_clase',
            'cuenta_porf_clase',
        ]


# ----------------- VM_PORF_NOMINA ----------------- #

class VM_PORF_NOMINA_Filter(filters.FilterSet):

    cuenta_desc = django_filters.CharFilter(
        name="cuenta_desc",
        lookup_expr="contains"
    )
    doc_fecha_lm_ini = django_filters.DateFilter(
        name="doc_fecha_lm",
        lookup_expr="gte"
    )
    doc_fecha_lm_fin = django_filters.DateFilter(
        name="doc_fecha_lm",
        lookup_expr="lte"
    )

    class Meta:
        model = VM_PORF_NOMINA
        fields = [
            'doc_compania',
            'anio',
            'periodo',
            'doc_tipo',
            'doc_numero',
            'doc_fecha_lm_ini',
            'doc_fecha_lm_fin',
            'un_proyecto',
            'un',
            'cuenta_desc',
            'cuenta_clase',
            'cuenta_porf_clase',
        ]


# ----------------- VIEW_RECEPSINCOTEJO ----------------- #

class VIEW_RECEPSINCOTEJO_Filter(filters.FilterSet):

    oc_comprador_desc = django_filters.CharFilter(
        name="oc_comprador_desc",
        lookup_expr="contains"
    )

    class Meta:
        model = VIEW_RECEPSINCOTEJO
        fields = [
            'oc_compania',
            'oc_comprador_desc',
            'oc_tipo',
        ]
