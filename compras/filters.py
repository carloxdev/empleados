# Django API REST
from rest_framework import filters
from django_filters import CharFilter
from django_filters import DateFilter
from django_filters import NumberFilter

# Modelos:
from jde.models import VIEW_SCOMPRAS
from jde.models import VIEW_UNIDADES
from jde.models import VIEW_AUTORIZACIONES
from jde.models import VIEW_RECEPCIONES
from jde.models import VIEW_ITEMS


class viewscomprasFilter(filters.FilterSet):

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
    req_generador_desc = CharFilter(
        name="req_generador_desc",
        lookup_expr="icontains"
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
            'req_generador_desc',
            'req_estado_last',
            'req_fecha_creacion_desde',
            'req_fecha_creacion_hasta',
            'ord_fecha_creacion_desde',
            'ord_fecha_creacion_hasta',
            'cot',
            'cot_tipo',
            'cot_estado_last',
            'ord',
            'ord_tipo',
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
            
            consulta = queryset.filter(cot_fecha_creacion__gte=valor)
            
            return consulta

    def ord_filter_fecha_hasta(self, queryset, name, value):

        valor = "{}T23:59:59".format(value)

        if not value:
            return queryset
        else:
            consulta = queryset.filter(cot_fecha_creacion__lte=valor)

            return consulta


class viewautorizacionesFilter(filters.FilterSet):

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
        model=VIEW_AUTORIZACIONES
        fields = [ 
                'oc',
                'oc_tipo',
                'oc_compania'
        ]

class viewrecepcionesFilter(filters.FilterSet):

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
        model=VIEW_RECEPCIONES
        fields = [ 
                'oc',
                'oc_tipo',
                'oc_compania',
                'oc_linea',
                'tran_tipo'
        ]

class viewitemsFilter(filters.FilterSet):
    descripcion = CharFilter(
        name="descripcion",
        lookup_expr="icontains"
    )

    class Meta:
        model = VIEW_ITEMS
        fields = [
            'descripcion'
        ]
