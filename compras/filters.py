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
        method="filter_fecha_desde" 
    )
    req_fecha_creacion_hasta = CharFilter(
        name="req_fecha_creacion_hasta",
        method="filter_fecha_hasta"
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
    def filter_fecha_desde(self, queryset, name, value):

        valor = "{}T00:00:00".format(value)

        if not value:
            
            return queryset
        else:
            
            consulta = queryset.filter(req_fecha_creacion__gte=valor)
            
            return consulta

    def filter_fecha_hasta(self, queryset, name, value):

        valor = "{}T23:59:59".format(value)

        if not value:
            return queryset
        else:
            consulta = queryset.filter(req_fecha_creacion__lte=valor)
            # import ipdb; ipdb.set_trace()
            return consulta
    #def __init__(self, *args, **kwargs):
    #    super(CompraSeguimientoFilter, self).__init__(
    #        *args, **kwargs
    #    )
    #    print(self.data['req_fecha_creacion_desde'])

    #    if self.data['req_fecha_creacion_desde'] == self.data['req_fecha_creacion_hasta']:
    #        self.filters['req_fecha_creacion_desde'].lookup_expr = "exact"
    #        self.filters['req_fecha_creacion_desde'].name = "req_fecha_creacion"
    #        self.filters['req_fecha_creacion_hasta'].lookup_expr = "exact"
    #        self.filters['req_fecha_creacion_hasta'].name = "req_fecha_creacion"

