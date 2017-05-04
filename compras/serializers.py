
# API Rest:
from rest_framework import serializers

# Modelos:
from jde.models import VIEW_SCOMPRAS
from jde.models import VIEW_UNIDADES
from jde.models import VIEW_COMPANIAS
from jde.models import VIEW_AUTORIZACIONES
from jde.models import VIEW_RECEPCIONES
from jde.models import VIEW_USUARIOS
from jde.models import VIEW_ITEMS

class viewscomprasSerializer(serializers.HyperlinkedModelSerializer):
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


class viewunidadesSerializer(serializers.HyperlinkedModelSerializer):
      class Meta:
            model = VIEW_UNIDADES
            fields = (
                  'clave',
                  'desc_corta'
      )

class viewcompaniasSerializer(serializers.HyperlinkedModelSerializer):
      class Meta:
            model = VIEW_COMPANIAS
            fields = (
                  'comp_code',
                  'comp_desc',
                  'comp_book_code',
                  'book_desc',
      )

class viewautorizacionesSerializer(serializers.ModelSerializer):
      class Meta:
            model = VIEW_AUTORIZACIONES
            fields = (
                  'orden',
                  'ruta',
                  'estado',
                  'un',
                  'oc_compania',
                  'oc_tipo',
                  'oc',
                  'oc_sufix',
                  'autorizador',
                  'autorizador_desc',
                  'autorizacion_fecha',
                  'autorizacion_hora',
                  'lista_estados',
      )

class viewrecepcionesSerializer(serializers.ModelSerializer):
      class Meta:
            model = VIEW_RECEPCIONES
            fields = (
                  'fecha_lm',
                  'cantidad_recib',
                  'udm_recib',
                  'pu_ex',
                  'monto_recib_ex',
                  'moneda',
                  'tasa',
                  'pu_mx',
                  'monto_recib_mx',
                  'impuesto',
                  'impuesto_flag',
                  'batch',
                  'batch_tipo',
                  'activo',
                  'ubicacion',
                  'lote',
                  'contenedor',
                  'observaciones',
                  'updater',
                  'updater_desc',
                  'fecha_update',
                  'oc_compania',
                  'oc_tipo',
                  'oc',
                  'oc_linea',
                  'oc_linea_tipo',
                  'oc_sufix',
                  'tran_compania',
                  'tran_un',
                  'tran_tipo',
                  'tran_tipo_desc',
                  'tran_linea',
                  'doc_compania',
                  'doc_tipo',
                  'doc',
                  'doc_linea',
                  'doc_je_linea',
                  'doc_factura',
                  'proveedor',
                  'item',
                  'item_numero',
                  'item_descripcion',
                  'item_glclass',
                  'originador',
                  'originador_desc',
                  'fecha_creacion',
                  'fecha_tran',
      )

class viewitemsSerializer(serializers.HyperlinkedModelSerializer):

      class Meta:
            model = VIEW_ITEMS
            fields = (
                  'clave',
                  'descripcion',
            )