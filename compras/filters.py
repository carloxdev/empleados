# Django API REST
from rest_framework import filters
from django_filters import CharFilter
from django_filters import DateFilter
from django_filters import NumberFilter

# Modelos:
from jde.models import VIEW_SCOMPRAS
from jde.models import VIEW_UNIDADES


class CompraSeguimientoFilter(filters.FilterSet):

    req_compania = CharFilter(
        name="req_compania",
        lookup_expr="icontains"
    )
    req_un = CharFilter(
        name="req_un",
        lookup_expr="contains"
    )
    req_comprador_desc = CharFilter(
        name="req_comprador_desc",
        lookup_expr="icontains"
    )
    req = NumberFilter(
        name="req",
        lookup_expr="contains"
    )
    req_tipo = CharFilter(
        name="req_tipo",
        lookup_expr="contains"
    )
    req_generador_desc = CharFilter(
        name="req_generador_desc",
        lookup_expr="icontains"
    )
    req_estado_last = CharFilter(
        name="req_estado_last",
        lookup_expr="contains"
    )
    cot = NumberFilter(
        name="cot",
        lookup_expr="contains"
    )
    cot_tipo = CharFilter(
        name="cot_tipo",
        lookup_expr="contains"
    )
    cot_estado_last = CharFilter(
        name="cot_estado_last",
        lookup_expr="contains"
    )
    ord = NumberFilter(
        name="ord",
        lookup_expr="contains"
    )
    ord_tipo = CharFilter(
        name="ord_tipo",
        lookup_expr="contains"
    )
    ord_generador_desc = CharFilter(
        name="ord_generador_desc",
        lookup_expr="icontains"
    )
    ord_estado_last = CharFilter(
        name="ord_estado_last",
        lookup_expr="contains"
    )
    ord_fecha_creacion = DateFilter(
        name = "ord_fecha_creacion",
        lookup_expr="gte"
    )
    ord_fecha_entrega = DateFilter(
        name = "ord_fecha_entrega",
        lookup_expr="lte"
    )
    ord_proveedor_desc = CharFilter(
        name="ord_proveedor_desc",
        lookup_expr="icontains"
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
            'req_estado_last',
            'cot',
            'cot_tipo',
            'cot_estado_last',
            'ord',
            'ord_tipo',
            'ord_generador_desc',
            'ord_estado_last',
            'ord_fecha_creacion',
            'ord_fecha_entrega',
            'ord_proveedor_desc',
        ]
