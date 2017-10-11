# -*- coding: utf-8 -*-

# Librerias API REST:
from rest_framework import serializers

# Modelos:
from .models import VIEW_SCOMPRAS
from .models import VIEW_INVENTARIO
from .models import VM_PORF_COMPRAS
from .models import VM_PORF_CXC
from .models import VM_PORF_CXP
from .models import VM_PORF_NOMINA
from .models import VIEW_RECEPSINCOTEJO
from .models import VIEW_USUARIOS
from .models import VIEW_UNIDADES
from .models import VIEW_COMPANIAS
from .models import VIEW_AUTORIZACIONES
from .models import VIEW_RECEPCIONES
from .models import VIEW_PROVEEDORES
from .models import VIEW_FLUJO_EGRESOS
from .models import VIEW_FLUJO_INGRESOS


class VIEW_INVENTARIO_UN_Serializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = VIEW_INVENTARIO
        fields = (
            'proyecto_cve',
            'proyecto_desc',
            'cantidad_recep',
            'costounimin',
            'costouniavg',
            'costounimax',
        )


class VIEW_INVENTARIO_Serializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = VIEW_INVENTARIO
        fields = (
            'proyecto_cve',
            'proyecto_desc',
            'articulo_cve',
            'articulo_desc',
            'imglpt',
            'un_cve',
            'un_desc',
            'fecha_recepcion',
            'cantidad_recep',
            'costounimin',
            'costouniavg',
            'costounimax',
        )


class VM_PORF_COMPRAS_Serializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = VM_PORF_COMPRAS
        fields = (
            'base',
            'doc_compania',
            'doc_compania_desc',
            'anio',
            'periodo',
            'doc_tipo',
            'doc_tipo_desc',
            'doc_numero',
            'doc_fecha_lm',
            'un_proyecto',
            'un_proyecto_desc',
            'un_proyecto_zona',
            'un_proyecto_tipo',
            'un_proyecto_tipo_desc',
            'un',
            'un_desc',
            'cuenta_objeto',
            'cuenta_auxiliar',
            'cuenta_desc',
            'cuenta_tipo',
            'cuenta_tipo_desc',
            'cuenta_clase',
            'cuenta_clase_desc',
            'cuenta_flujo',
            'cuenta_flujo_desc',
            'cuenta_clase_porf',
            'cuenta_clase_porf_desc',
            'monto_mx',
            'enero_mx',
            'febrero_mx',
            'marzo_mx',
            'abril_mx',
            'mayo_mx',
            'junio_mx',
            'julio_mx',
            'agosto_mx',
            'septiembre_mx',
            'octubre_mx',
            'noviembre_mx',
            'diciembre_mx',
        )


class VM_PORF_CXC_Serializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = VM_PORF_CXC
        fields = (
            'base',
            'doc_compania',
            'doc_compania_desc',
            'anio',
            'periodo',
            'doc_tipo',
            'doc_tipo_desc',
            'doc_numero',
            'doc_fecha_lm',
            'un_proyecto',
            'un_proyecto_desc',
            'un_proyecto_zona',
            'un_proyecto_tipo',
            'un_proyecto_tipo_desc',
            'un',
            'un_desc',
            'cuenta_numero',
            'cuenta_desc',
            'cuenta_tipo',
            'cuenta_tipo_desc',
            'cuenta_clase',
            'cuenta_clase_desc',
            'cuenta_flujo',
            'cuenta_flujo_desc',
            'cuenta_porf_clase',
            'cuenta_porf_clase_desc',
            'monto_mx',
            'enero_mx',
            'febrero_mx',
            'marzo_mx',
            'abril_mx',
            'mayo_mx',
            'junio_mx',
            'julio_mx',
            'agosto_mx',
            'septiembre_mx',
            'octubre_mx',
            'noviembre_mx',
            'diciembre_mx',
        )


class VM_PORF_CXP_Serializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = VM_PORF_CXP
        fields = (
            'base',
            'doc_compania',
            'doc_compania_desc',
            'anio',
            'periodo',
            'doc_tipo',
            'doc_tipo_desc',
            'doc_numero',
            'doc_fecha_lm',
            'un_proyecto',
            'un_proyecto_desc',
            'un_proyecto_zona',
            'un_proyecto_tipo',
            'un_proyecto_tipo_desc',
            'un',
            'un_desc',
            'cuenta_numero',
            'cuenta_desc',
            'cuenta_tipo',
            'cuenta_tipo_desc',
            'cuenta_clase',
            'cuenta_clase_desc',
            'cuenta_flujo',
            'cuenta_flujo_desc',
            'cuenta_porf_clase',
            'cuenta_porf_clase_desc',
            'monto_mx',
            'enero_mx',
            'febrero_mx',
            'marzo_mx',
            'abril_mx',
            'mayo_mx',
            'junio_mx',
            'julio_mx',
            'agosto_mx',
            'septiembre_mx',
            'octubre_mx',
            'noviembre_mx',
            'diciembre_mx',
        )


class VM_PORF_NOMINA_Serializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = VM_PORF_NOMINA
        fields = (
            'base',
            'doc_compania',
            'doc_compania_desc',
            'anio',
            'periodo',
            'doc_tipo',
            'doc_tipo_desc',
            'doc_numero',
            'doc_fecha_lm',
            'un_proyecto',
            'un_proyecto_desc',
            'un_proyecto_zona',
            'un_proyecto_tipo',
            'un_proyecto_tipo_desc',
            'un',
            'un_desc',
            'cuenta_numero',
            'cuenta_desc',
            'cuenta_tipo',
            'cuenta_tipo_desc',
            'cuenta_clase',
            'cuenta_clase_desc',
            'cuenta_flujo',
            'cuenta_flujo_desc',
            'cuenta_porf_clase',
            'cuenta_porf_clase_desc',
            'monto_mx',
            'enero_mx',
            'febrero_mx',
            'marzo_mx',
            'abril_mx',
            'mayo_mx',
            'junio_mx',
            'julio_mx',
            'agosto_mx',
            'septiembre_mx',
            'octubre_mx',
            'noviembre_mx',
            'diciembre_mx',
        )


class VIEW_RECEPSINCOTEJO_Serializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = VIEW_RECEPSINCOTEJO
        fields = (
            'oc_compania',
            'oc_compania_desc',
            'oc_proyecto',
            'oc_proyecto_desc',
            'oc_un',
            'oc_un_desc',
            'oc_numero',
            'oc_tipo',
            'oc_tipo_desc',
            'oc_linea',
            'oc_linea_tipo',
            'oc_linea_tipo_desc',
            'oc_fecha_creacion',
            'oc_fecha_cancelacion',
            'oc_estado_ultimo',
            'oc_estado_siguiente',
            'oc_comprador',
            'oc_comprador_desc',
            'oc_originador',
            'oc_originador_desc',
            'oc_proveedor',
            'oc_proveedor_desc',
            'oc_item',
            'oc_item_numero',
            'oc_item_desc',
            'oc_cantidad_solic',
            'oc_udm',
            'oc_udm_desc',
            'oc_cantidad_recib',
            'oc_cantidad_xrecib',
            'oc_recepcion',
            'oc_pu_ex',
            'oc_total_ex',
            'oc_monto_recib_ex',
            'oc_monto_xrecib_ex',
            'oc_moneda',
            'oc_tasa',
            'oc_pu_mx',
            'oc_total_mx',
            'oc_monto_recib_mx',
            'oc_monto_xrecib_mx',
            'recepcion_no',
            'recepcion_compania',
            'recepcion_tipo',
            'recepcion_doc',
            'recepcion_linea',
            'recepcion_fecha',
            'recepcion_fecha_lm',
            'recepcion_cantidad',
            'recepcion_udm',
            'recepcion_pu_ex',
            'recepcion_monto_ex',
            'recepcion_moneda',
            'recepcion_tasa',
            'recepcion_pu_mx',
            'recepcion_monto_mx',
            'recepcion_contenedor',
            'recepcion_batch',
            'recepcion_batch_tipo',
            'recepcion_originador',
            'recepcion_originador_desc',
            'fac_compania',
            'fac_tipo',
            'fac',
            'fac_linea',
            'fac_updater',
            'fac_updater_desc',
            'fac_fecha_update',
        )


class VIEW_USUARIOS_Serializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = VIEW_USUARIOS
        fields = (
            'dir_tipo_desc',
            'dir_tipo',
            'dir_desc',
            'dir',
            'clave',
        )


class VIEW_SCOMPRAS_Serializer(serializers.HyperlinkedModelSerializer):

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
            'req_glclass',
            'req_glclass_desc',
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
            # 'cotejo',
        )


class VIEW_UNIDADES_Serializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = VIEW_UNIDADES
        fields = (
            'clave',
            'desc_corta'
        )


class VIEW_COMPANIAS_Serializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = VIEW_COMPANIAS
        fields = (
            'comp_code',
            'comp_desc',
            'comp_book_code',
            'book_desc',
        )


class VIEW_AUTORIZACIONES_Serializer(serializers.ModelSerializer):

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


class VIEW_RECEPCIONES_Serializer(serializers.ModelSerializer):

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


class VIEW_PROVEEDORES_Serializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = VIEW_PROVEEDORES
        fields = (
            'clave',
            'descripcion',
        )


class VIEW_FLUJO_EGRESOS_Serializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = VIEW_FLUJO_EGRESOS
        fields = (
            'compania',
            'anio',
            'tipo_un',
            'descripcion_un',
            'cuenta_clase_desc',
            'enero',
            'febrero',
            'marzo',
            'abril',
            'mayo',
            'junio',
            'julio',
            'agosto',
            'septiembre',
            'octubre',
            'noviembre',
            'diciembre',
            'total',
            'cxp',
        )


class VIEW_FLUJO_INGRESOS_Serializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = VIEW_FLUJO_INGRESOS
        fields = (
            'compania',
            'anio',
            'tipo_un',
            'descripcion_un',
            'cuenta_clase_desc',
            'enero',
            'febrero',
            'marzo',
            'abril',
            'mayo',
            'junio',
            'julio',
            'agosto',
            'septiembre',
            'octubre',
            'noviembre',
            'diciembre',
            'total',
        )
