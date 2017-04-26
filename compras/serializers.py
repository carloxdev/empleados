
# API Rest:
from rest_framework import serializers

# Modelos:
from jde.models import VIEW_SCOMPRAS
from jde.models import VIEW_UNIDADES
from jde.models import VIEW_COMPANIAS


class CompraSeguimientoSerializer(serializers.HyperlinkedModelSerializer):
      class Meta:
            model = VIEW_SCOMPRAS
            fields = (
                  'req_compania',
                  'req_compania_desc',
                  'req_un',
                  'req_un_desc',
                  'req_un_proyecto',
                  'req_un_proyecto_desc',
                  'req_tipo',
                  'req_tipo_desc',
                  'req',
                  'req_linea',
                  'req_linea_tipo',
                  'req_generador',
                  'req_generador_desc',
                  'req_fecha_creacion',
                  'req_fecha_necesidad',
                  'req_estado_last',
                  'req_estado_last_desc',
                  'req_estado_next',
                  'req_item_numero',
                  'req_item_desc',
                  'req_comprador',
                  'req_comprador_desc',
                  'req_cantidad_solicitada',
                  'req_udm',
                  'req_udm_desc',
                  'cot_compania',
                  'cot_tipo',
                  'cot',
                  'cot_linea',
                  'cot_generador',
                  'cot_fecha_creacion',
                  'cot_estado_last',
                  'cot_estado_last_desc',
                  'cot_estado_next',
                  'ord_compania',
                  'ord_tipo',
                  'ord_tipo_desc',
                  'ord',
                  'ord_fecha_creacion',
                  'ord_fecha_entrega',
                  'ord_generador',
                  'ord_generador_desc',
                  'ord_linea',
                  'ord_proveedor',
                  'ord_proveedor_desc',
                  'ord_estado_last',
                  'ord_estado_last_desc',
                  'ord_estado_next',
                  'ord_cantidad_solic',
                  'ord_udm',
                  'ord_udm_desc',
                  'ord_cantidad_recib',
                  'ord_cantidad_xrecib',
                  'ord_recepcion',
                  'ord_pu_ex',
                  'ord_total_ex',
                  'ord_monto_recib_ex',
                  'ord_monto_xrecib_ex',
                  'ord_moneda',
                  'ord_moneda_desc',
                  'ord_tasa',
                  'ord_pu_mx',
                  'ord_total_mx',
                  'ord_monto_recib_mx',
                  'ord_monto_xrecib_mx',
                  'ord_impuesto',
                  'ord_impuesto_desc',
                  'ord_impuesto_flag',
                  'ord_descuento',
                  'ord_termino_pago',
                  'ord_termino_pago_desc',
                  'ord_updated_by',
                  'ord_updated_by_desc',
                  )


class CompraSeguimientoSucursalSerializer(serializers.HyperlinkedModelSerializer):
      class Meta:
            model = VIEW_UNIDADES
            fields = (
                  'clave',
                  'desc_corta'
      )

class CompraSeguimientoCompaniaSerializer(serializers.HyperlinkedModelSerializer):
      class Meta:
            model = VIEW_COMPANIAS
            fields = (
                  'comp_code',
                  'comp_desc',
                  'comp_book_code',
                  'book_desc',
      )