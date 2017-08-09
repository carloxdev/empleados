# -*- coding: utf-8 -*-

# Django API REST
from rest_framework import filters
from django_filters import CharFilter
from django_filters import DateFilter
from django_filters import NumberFilter

# Modelos:
from .models import VIEW_SCOMPRAS
from .models import VIEW_INVENTARIO
from .models import VIEW_INVENTARIO_UN
from .models import VIEW_RECEPSINCOTEJO
from .models import VIEW_USUARIOS
from .models import VIEW_AUTORIZACIONES
from .models import VIEW_RECEPCIONES
from .models import VIEW_ITEMS

from .models import VM_PORF_COMPRAS
from .models import VM_PORF_CXC
from .models import VM_PORF_CXP
from .models import VM_PORF_NOMINA
from .models import VIEW_PROVEEDORES


# ----------------- VIEW_INVENTARIO ----------------- #


class VIEW_INVENTARIO_UN_Filter(filters.FilterSet):

    proyecto_cve = CharFilter(
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

    proyecto_cve = CharFilter(
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

    cuenta_desc = CharFilter(
        name="cuenta_desc",
        lookup_expr="contains"
    )
    doc_fecha_lm_ini = DateFilter(
        name="doc_fecha_lm",
        lookup_expr="gte"
    )
    doc_fecha_lm_fin = DateFilter(
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

    cuenta_desc = CharFilter(
        name="cuenta_desc",
        lookup_expr="contains"
    )
    doc_fecha_lm_ini = DateFilter(
        name="doc_fecha_lm",
        lookup_expr="gte"
    )
    doc_fecha_lm_fin = DateFilter(
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

    cuenta_desc = CharFilter(
        name="cuenta_desc",
        lookup_expr="contains"
    )
    doc_fecha_lm_ini = DateFilter(
        name="doc_fecha_lm",
        lookup_expr="gte"
    )
    doc_fecha_lm_fin = DateFilter(
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

    cuenta_desc = CharFilter(
        name="cuenta_desc",
        lookup_expr="contains"
    )
    doc_fecha_lm_ini = DateFilter(
        name="doc_fecha_lm",
        lookup_expr="gte"
    )
    doc_fecha_lm_fin = DateFilter(
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

    oc_comprador_desc = CharFilter(
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

# ----------------- VIEW_USUARIOS ----------------- #


class VIEW_USUARIOS_Filter(filters.FilterSet):

    clave = CharFilter(
        name="clave",
        lookup_expr="icontains"
    )

    class Meta:
        model = VIEW_USUARIOS
        fields = [
            'dir_tipo_desc',
            'dir_tipo',
            'dir_desc',
            'dir',
            'clave',
        ]


class VIEW_SCOMPRAS_Filter(filters.FilterSet):

    req_compania = CharFilter(
        name="req_compania",
        lookup_expr="exact"
    )
    req_un = CharFilter(
        name="req_un",
        lookup_expr="exact"
    )
    req_comprador_desc = CharFilter(
        name="req_comprador_desc",
        lookup_expr="icontains"
    )
    req = NumberFilter(
        name="req",
        lookup_expr="exact"
    )
    req_tipo = CharFilter(
        name="req_tipo",
        lookup_expr="exact"
    )
    req_generador = CharFilter(
        name="req_generador",
        lookup_expr="contains"
    )
    req_estado_last = CharFilter(
        name="req_estado_last",
        lookup_expr="exact"
    )
    cot = NumberFilter(
        name="cot",
        lookup_expr="exact"
    )
    cot_tipo = CharFilter(
        name="cot_tipo",
        lookup_expr="exact"
    )
    cot_generador = CharFilter(
        name="cot_generador",
        lookup_expr="contains"
    )
    cot_estado_last = CharFilter(
        name="cot_estado_last",
        lookup_expr="exact"
    )
    ord = NumberFilter(
        name="ord",
        lookup_expr="exact"
    )
    ord_tipo = CharFilter(
        name="ord_tipo",
        lookup_expr="exact"
    )
    ord_generador = CharFilter(
        name="ord_generador",
        lookup_expr="contains"
    )
    ord_estado_last = CharFilter(
        name="ord_estado_last",
        lookup_expr="exact"
    )
    req_fecha_creacion_desde = CharFilter(
        name="req_fecha_creacion_desde",
        method="req_filter_fecha_desde"
    )
    req_fecha_creacion_hasta = CharFilter(
        name="req_fecha_creacion_hasta",
        method="req_filter_fecha_hasta"
    )
    ord_fecha_creacion_desde = CharFilter(
        name="ord_fecha_creacion_desde",
        method="ord_filter_fecha_desde"
    )
    ord_fecha_creacion_hasta = CharFilter(
        name="ord_fecha_creacion_hasta",
        method="ord_filter_fecha_hasta"
    )
    ord_proveedor_desc = CharFilter(
        name="ord_proveedor_desc",
        lookup_expr="icontains"
    )
    req_item_desc = CharFilter(
        name="req_item_desc",
        lookup_expr="icontains"
    )
    ord_recepcion = CharFilter(
        name="ord_recepcion",
        lookup_expr="exact"
    )

    class Meta:
        model = VIEW_SCOMPRAS
        fields = [
            'req_compania',
            'req_un',
            'req_comprador_desc',
            'req',
            'req_tipo',
            'req_generador',
            'req_estado_last',
            'req_fecha_creacion',
            'ord_fecha_creacion',
            'cot',
            'cot_tipo',
            'cot_generador',
            'cot_estado_last',
            'ord',
            'ord_tipo',
            'ord_generador',
            'ord_estado_last',
            'ord_proveedor_desc',
            'req_item_desc',
            'ord_recepcion'
        ]

    def req_filter_fecha_desde(self, queryset, name, value):

        valor = "{}T00:00:00".format(value)

        if not value:

            return queryset
        else:

            consulta = queryset.filter(req_fecha_creacion__gte=valor)

            return consulta

    def req_filter_fecha_hasta(self, queryset, name, value):

        valor = "{}T23:59:59".format(value)

        if not value:
            return queryset
        else:
            consulta = queryset.filter(req_fecha_creacion__lte=valor)

            return consulta

    def ord_filter_fecha_desde(self, queryset, name, value):

        valor = "{}T00:00:00".format(value)

        if not value:

            return queryset
        else:

            consulta = queryset.filter(ord_fecha_creacion__gte=valor)

            return consulta

    def ord_filter_fecha_hasta(self, queryset, name, value):

        valor = "{}T23:59:59".format(value)

        if not value:
            return queryset
        else:
            consulta = queryset.filter(ord_fecha_creacion__lte=valor)

            return consulta


class VIEW_AUTORIZACIONES_Filter(filters.FilterSet):

    oc = NumberFilter(
        name="oc",
        lookup_expr="exact"
    )
    oc_tipo = CharFilter(
        name="oc_tipo",
        lookup_expr="exact"
    )
    oc_compania = CharFilter(
        name="oc_compania",
        lookup_expr="exact"
    )

    class Meta:
        model = VIEW_AUTORIZACIONES
        fields = [
            'oc',
            'oc_tipo',
            'oc_compania'
        ]


class VIEW_RECEPCIONES_Filter(filters.FilterSet):

    oc = NumberFilter(
        name="oc",
        lookup_expr="exact"
    )
    oc_tipo = CharFilter(
        name="oc_tipo",
        lookup_expr="exact"
    )
    oc_compania = CharFilter(
        name="oc_compania",
        lookup_expr="exact"
    )
    oc_linea = NumberFilter(
        name="oc_linea",
        lookup_expr="exact"
    )
    tran_tipo = NumberFilter(
        name="tran_tipo",
        lookup_expr="exact"
    )

    class Meta:
        model = VIEW_RECEPCIONES
        fields = [
            'oc',
            'oc_tipo',
            'oc_compania',
            'oc_linea',
            'tran_tipo'
        ]


# ----------------- VIEW_PROVEEDORES ----------------- #

class VIEW_PROVEEDORES_Filter(filters.FilterSet):

    clave = CharFilter(
        name="clave",
        lookup_expr="contains"
    )

    descripcion = CharFilter(
        name="descripcion",
        lookup_expr="contains"
    )

    class Meta:
        model = VIEW_PROVEEDORES
        fields = [
            'clave',
            'descripcion'
        ]