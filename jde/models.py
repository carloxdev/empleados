# -*- coding: utf-8 -*-

# Librerias Django:
from __future__ import unicode_literals
from django.db import models
from django.conf import settings


class F0101(models.Model):

    clave = models.IntegerField(db_column='ABAN8', primary_key=True)
    nombre = models.CharField(max_length=40, db_column='ABALPH')
    tipo = models.CharField(max_length=3, db_column='ABAT1')
    rfc = models.CharField(max_length=20, db_column='ABTAX')

    class Meta:
        managed = False
        if settings.DEBUG:
            db_table = u'"CRPDTA"."F0101"'
        else:
            db_table = u'"PRODDTA"."F0101"'

    def __str__(self):
        return "{} - {}".format(self.clave, self.nombre)


class VIEW_UNIDADES(models.Model):
    clave = models.CharField(
        max_length=12, primary_key=True, db_column='CLAVE')
    tipo = models.CharField(max_length=2, db_column='TIPO')
    compania = models.CharField(max_length=5, db_column='COMPANIA')
    desc_corta = models.CharField(max_length=30, db_column='DESC_CORTA')
    desc_larga = models.CharField(max_length=75, db_column='DESC_LARGA')
    reclass = models.CharField(max_length=10, db_column='RECLASS')

    class Meta:
        managed = False
        db_table = u'"NUVPD"."VIEW_UNIDADES"'

    def __str__(self):
        return self.desc_larga


class F5903000(models.Model):
    # UUID
    ftgenkey = models.CharField(max_length=40, primary_key=True)

    # RFC EMISOR
    fttax = models.CharField(max_length=20, null=True, blank=True)
    # RFC RECEPTOR
    fttaxs = models.CharField(max_length=20, null=True, blank=True)
    # Tipo (CXC, CXP)
    ftbrtpo = models.CharField(max_length=3)
    fttxr1 = models.IntegerField(default=0)
    fttxr2 = models.IntegerField(default=0)
    fttxr3 = models.IntegerField(default=0)
    fttxr4 = models.IntegerField(default=0)
    fttxr5 = models.IntegerField(default=0)
    ftafa1 = models.IntegerField(default=0)
    ftafa2 = models.IntegerField(default=0)
    ftafa3 = models.IntegerField(default=0)
    ftafa4 = models.IntegerField(default=0)
    ftafa5 = models.IntegerField(default=0)
    # MONEDA
    ftcrcd = models.CharField(max_length=3, null=True, blank=True)
    # Tasa de conversion
    ftcrr = models.IntegerField(default=0)
    # Total
    ftamrt1 = models.IntegerField(default=0)
    # Subtotal
    ftamrt2 = models.IntegerField(default=0)
    # Total
    ftamrt3 = models.IntegerField(default=0)
    ftlo01 = models.CharField(max_length=5, null=True, blank=True)
    fturab = models.IntegerField(default=0)
    fturat = models.IntegerField(default=0)
    # CODIGO PROCESADO  FTURCD (default 0)
    fturcd = models.CharField(max_length=2, null=True, blank=True)
    fturdt = models.IntegerField(default=0)
    fturrf = models.CharField(max_length=15, null=True, blank=True)
    ftuser = models.CharField(max_length=10, null=True, blank=True)
    ftpid = models.CharField(max_length=10, null=True, blank=True)
    ftjobn = models.CharField(max_length=10, null=True, blank=True)
    ftupmj = models.IntegerField(default=0)
    ftupmt = models.IntegerField(default=0)
    ftivd = models.IntegerField(default=0)
    ftan8 = models.IntegerField(default=0)

    class Meta:
        managed = False
        if settings.DEBUG:
            db_table = u'"CRPDTA"."F5903000"'
        else:
            db_table = u'"PRODDTA"."F5903000"'

    def __str__(self):
        return self.FTGENKEY


class VIEW_SCOMPRAS(models.Model):

    req_compania = models.CharField(max_length=5)
    req_compania_desc = models.CharField(max_length=30)
    req_un = models.CharField(max_length=12)
    req_un_desc = models.CharField(max_length=60)
    req_un_proyecto = models.CharField(max_length=3)
    req_un_proyecto_desc = models.CharField(max_length=30)
    req_tipo = models.CharField(max_length=2)
    req_tipo_desc = models.CharField(max_length=30)
    req = models.IntegerField(primary_key=True)
    req_linea = models.IntegerField()
    req_linea_tipo = models.CharField(max_length=2)
    req_generador = models.CharField(max_length=10)
    req_generador_desc = models.CharField(max_length=40)
    req_fecha_creacion = models.DateTimeField()
    req_fecha_necesidad = models.DateTimeField()
    req_estado_last = models.CharField(max_length=3)
    req_estado_last_desc = models.CharField(max_length=30)
    req_estado_next = models.CharField(max_length=3)
    req_item_numero = models.CharField(max_length=25)
    req_item_desc = models.CharField(max_length=61)
    req_comprador = models.IntegerField()
    req_comprador_desc = models.CharField(max_length=40)
    req_cantidad_solicitada = models.CharField(max_length=30)
    req_udm = models.CharField(max_length=2)
    req_udm_desc = models.CharField(max_length=30)
    cot_compania = models.CharField(max_length=5)
    cot_tipo = models.CharField(max_length=2)
    cot = models.IntegerField()
    cot_linea = models.IntegerField()
    cot_generador = models.CharField(max_length=10)
    cot_fecha_creacion = models.DateTimeField()
    cot_estado_last = models.CharField(max_length=3)
    cot_estado_last_desc = models.CharField(max_length=30)
    cot_estado_next = models.CharField(max_length=3)
    ord_compania = models.CharField(max_length=5)
    ord_tipo = models.CharField(max_length=2)
    ord_tipo_desc = models.CharField(max_length=30)
    ord = models.IntegerField()
    ord_fecha_creacion = models.DateTimeField()
    ord_fecha_entrega = models.DateTimeField()
    ord_generador = models.CharField(max_length=10)
    ord_generador_desc = models.CharField(max_length=40)
    ord_linea = models.IntegerField()
    ord_proveedor = models.IntegerField()
    ord_proveedor_desc = models.CharField(max_length=40)
    ord_estado_last = models.CharField(max_length=3)
    ord_estado_last_desc = models.CharField(max_length=30)
    ord_estado_next = models.CharField(max_length=3)
    ord_cantidad_solic = models.IntegerField()
    ord_udm = models.CharField(max_length=2)
    ord_udm_desc = models.CharField(max_length=30)
    ord_cantidad_recib = models.CharField(max_length=30)
    ord_cantidad_xrecib = models.CharField(max_length=30)
    ord_recepcion = models.CharField(max_length=9)
    ord_pu_ex = models.CharField(max_length=30)
    ord_total_ex = models.CharField(max_length=30)
    ord_monto_recib_ex = models.CharField(max_length=30)
    ord_monto_xrecib_ex = models.CharField(max_length=30)
    ord_moneda = models.CharField(max_length=3)
    ord_moneda_desc = models.CharField(max_length=30)
    ord_tasa = models.CharField(max_length=30)
    ord_pu_mx = models.CharField(max_length=30)
    ord_total_mx = models.CharField(max_length=30)
    ord_monto_recib_mx = models.CharField(max_length=30)
    ord_monto_xrecib_mx = models.CharField(max_length=30)
    ord_impuesto = models.CharField(max_length=10)
    ord_impuesto_desc = models.CharField(max_length=30)
    ord_impuesto_flag = models.CharField(max_length=2)
    ord_descuento = models.IntegerField()
    ord_termino_pago = models.CharField(max_length=3)
    ord_termino_pago_desc = models.CharField(max_length=30)
    ord_updated_by = models.CharField(max_length=10)
    ord_updated_by_desc = models.CharField(max_length=40)

    class Meta:
        managed = False
        db_table = u'"NUVPD"."VIEW_SCOMPRAS"'

    def __str__(self):
        return "{} - {} - {} - {}".format(
            self.req_compania,
            self.req_tipo,
            self.req,
            self.req_linea
        )


class VIEW_INVENTARIO(models.Model):
    proyecto_cve = models.CharField(max_length=10, primary_key=True)
    proyecto_desc = models.CharField(max_length=30)
    articulo_cve = models.CharField(max_length=25)
    articulo_desc = models.CharField(max_length=60)
    imglpt = models.CharField(max_length=4)
    un_cve = models.CharField(max_length=12)
    un_desc = models.CharField(max_length=40)
    fecha_recepcion = models.DateField()
    cantidad_recep = models.DecimalField(max_digits=20, decimal_places=4)
    costounimin = models.DecimalField(max_digits=20, decimal_places=4)
    costouniavg = models.DecimalField(max_digits=20, decimal_places=4)
    costounimax = models.DecimalField(max_digits=20, decimal_places=4)

    class Meta:
        managed = False
        db_table = u'"NUVPD"."VIEW_INVENTARIO"'

    def __str__(self):
        return "{} - {} - {} - {}".format(
            self.proyecto_cve,
            self.proyecto_desc,
            self.articulo_cve,
            self.articulo_desc
        )


class VIEW_INVENTARIO_UN(models.Model):
    proyecto_cve = models.CharField(max_length=10, primary_key=True)
    proyecto_desc = models.CharField(max_length=30)
    cantidad_recep = models.DecimalField(max_digits=20, decimal_places=4)
    costounimin = models.DecimalField(max_digits=20, decimal_places=4)
    costouniavg = models.DecimalField(max_digits=20, decimal_places=4)
    costounimax = models.DecimalField(max_digits=20, decimal_places=4)

    class Meta:
        managed = False
        db_table = u'"NUVPD"."VIEW_INVENTARIOUN"'

    def __str__(self):
        return "{} - {} - {} - {}".format(
            self.proyecto_cve,
            self.proyecto_desc,
        )


class VM_PORF_COMPRAS(models.Model):

    base = models.CharField(max_length=30)
    doc_compania = models.CharField(max_length=5)
    doc_compania_desc = models.CharField(max_length=30)
    anio = models.CharField(max_length=4)
    periodo = models.CharField(max_length=2)
    doc_tipo = models.CharField(max_length=2)
    doc_tipo_desc = models.CharField(max_length=30)
    doc_numero = models.IntegerField(primary_key=True)
    doc_fecha_lm = models.DateField()
    un_proyecto = models.CharField(max_length=3)
    un_proyecto_desc = models.CharField(max_length=30)
    un_proyecto_zona = models.CharField(max_length=30)
    un_proyecto_tipo = models.CharField(max_length=2)
    un_proyecto_tipo_desc = models.CharField(max_length=60)
    un = models.CharField(max_length=12)
    un_desc = models.CharField(max_length=60)
    cuenta_objeto = models.CharField(max_length=6)
    cuenta_auxiliar = models.CharField(max_length=8)
    cuenta_desc = models.CharField(max_length=30)
    cuenta_tipo = models.CharField(max_length=3)
    cuenta_tipo_desc = models.CharField(max_length=30)
    cuenta_clase = models.CharField(max_length=3)
    cuenta_clase_desc = models.CharField(max_length=30)
    cuenta_flujo = models.CharField(max_length=3)
    cuenta_flujo_desc = models.CharField(max_length=30)
    cuenta_clase_porf = models.CharField(max_length=3)
    cuenta_clase_porf_desc = models.CharField(max_length=30)
    monto_mx = models.DecimalField(max_digits=20, decimal_places=4)
    enero_mx = models.DecimalField(max_digits=20, decimal_places=4)
    febrero_mx = models.DecimalField(max_digits=20, decimal_places=4)
    marzo_mx = models.DecimalField(max_digits=20, decimal_places=4)
    abril_mx = models.DecimalField(max_digits=20, decimal_places=4)
    mayo_mx = models.DecimalField(max_digits=20, decimal_places=4)
    junio_mx = models.DecimalField(max_digits=20, decimal_places=4)
    julio_mx = models.DecimalField(max_digits=20, decimal_places=4)
    agosto_mx = models.DecimalField(max_digits=20, decimal_places=4)
    septiembre_mx = models.DecimalField(max_digits=20, decimal_places=4)
    octubre_mx = models.DecimalField(max_digits=20, decimal_places=4)
    noviembre_mx = models.DecimalField(max_digits=20, decimal_places=4)
    diciembre_mx = models.DecimalField(max_digits=20, decimal_places=4)

    class Meta:
        managed = False
        db_table = u'"NUVPD"."VM_PORF_COMPRAS"'

    def __str__(self):
        return "{} - {} - {}".format(
            self.doc_compania,
            self.doc_tipo,
            self.doc_numero
        )


class VM_PORF_CXC(models.Model):

    base = models.CharField(max_length=30)
    doc_compania = models.CharField(max_length=5)
    doc_compania_desc = models.CharField(max_length=30)
    anio = models.CharField(max_length=4)
    periodo = models.CharField(max_length=2)
    doc_tipo = models.CharField(max_length=2)
    doc_tipo_desc = models.CharField(max_length=30)
    doc_numero = models.IntegerField(primary_key=True)
    doc_fecha_lm = models.DateField()
    un_proyecto = models.CharField(max_length=3)
    un_proyecto_desc = models.CharField(max_length=30)
    un_proyecto_zona = models.CharField(max_length=30)
    un_proyecto_tipo = models.CharField(max_length=2)
    un_proyecto_tipo_desc = models.CharField(max_length=60)
    un = models.CharField(max_length=12)
    un_desc = models.CharField(max_length=60)
    cuenta_numero = models.CharField(max_length=29)
    cuenta_desc = models.CharField(max_length=30)
    cuenta_tipo = models.CharField(max_length=3)
    cuenta_tipo_desc = models.CharField(max_length=30)
    cuenta_clase = models.CharField(max_length=3)
    cuenta_clase_desc = models.CharField(max_length=30)
    cuenta_flujo = models.CharField(max_length=3)
    cuenta_flujo_desc = models.CharField(max_length=30)
    cuenta_porf_clase = models.CharField(max_length=3)
    cuenta_porf_clase_desc = models.CharField(max_length=30)
    monto_mx = models.DecimalField(max_digits=20, decimal_places=4)
    enero_mx = models.DecimalField(max_digits=20, decimal_places=4)
    febrero_mx = models.DecimalField(max_digits=20, decimal_places=4)
    marzo_mx = models.DecimalField(max_digits=20, decimal_places=4)
    abril_mx = models.DecimalField(max_digits=20, decimal_places=4)
    mayo_mx = models.DecimalField(max_digits=20, decimal_places=4)
    junio_mx = models.DecimalField(max_digits=20, decimal_places=4)
    julio_mx = models.DecimalField(max_digits=20, decimal_places=4)
    agosto_mx = models.DecimalField(max_digits=20, decimal_places=4)
    septiembre_mx = models.DecimalField(max_digits=20, decimal_places=4)
    octubre_mx = models.DecimalField(max_digits=20, decimal_places=4)
    noviembre_mx = models.DecimalField(max_digits=20, decimal_places=4)
    diciembre_mx = models.DecimalField(max_digits=20, decimal_places=4)

    class Meta:
        managed = False
        db_table = u'"NUVPD"."VM_PORF_CXC"'

    def __str__(self):
        return "{} - {} - {}".format(
            self.doc_compania,
            self.doc_tipo,
            self.doc_numero
        )


class VM_PORF_CXP(models.Model):

    base = models.CharField(max_length=30)
    doc_compania = models.CharField(max_length=5)
    doc_compania_desc = models.CharField(max_length=30)
    anio = models.CharField(max_length=4)
    periodo = models.CharField(max_length=2)
    doc_tipo = models.CharField(max_length=2)
    doc_tipo_desc = models.CharField(max_length=30)
    doc_numero = models.IntegerField(primary_key=True)
    doc_fecha_lm = models.DateField()
    un_proyecto = models.CharField(max_length=3)
    un_proyecto_desc = models.CharField(max_length=30)
    un_proyecto_zona = models.CharField(max_length=30)
    un_proyecto_tipo = models.CharField(max_length=2)
    un_proyecto_tipo_desc = models.CharField(max_length=60)
    un = models.CharField(max_length=12)
    un_desc = models.CharField(max_length=60)
    cuenta_numero = models.CharField(max_length=29)
    cuenta_desc = models.CharField(max_length=30)
    cuenta_tipo = models.CharField(max_length=3)
    cuenta_tipo_desc = models.CharField(max_length=30)
    cuenta_clase = models.CharField(max_length=3)
    cuenta_clase_desc = models.CharField(max_length=30)
    cuenta_flujo = models.CharField(max_length=3)
    cuenta_flujo_desc = models.CharField(max_length=30)
    cuenta_porf_clase = models.CharField(max_length=3)
    cuenta_porf_clase_desc = models.CharField(max_length=30)
    monto_mx = models.DecimalField(max_digits=20, decimal_places=4)
    enero_mx = models.DecimalField(max_digits=20, decimal_places=4)
    febrero_mx = models.DecimalField(max_digits=20, decimal_places=4)
    marzo_mx = models.DecimalField(max_digits=20, decimal_places=4)
    abril_mx = models.DecimalField(max_digits=20, decimal_places=4)
    mayo_mx = models.DecimalField(max_digits=20, decimal_places=4)
    junio_mx = models.DecimalField(max_digits=20, decimal_places=4)
    julio_mx = models.DecimalField(max_digits=20, decimal_places=4)
    agosto_mx = models.DecimalField(max_digits=20, decimal_places=4)
    septiembre_mx = models.DecimalField(max_digits=20, decimal_places=4)
    octubre_mx = models.DecimalField(max_digits=20, decimal_places=4)
    noviembre_mx = models.DecimalField(max_digits=20, decimal_places=4)
    diciembre_mx = models.DecimalField(max_digits=20, decimal_places=4)

    class Meta:
        managed = False
        db_table = u'"NUVPD"."VM_PORF_CXP"'

    def __str__(self):
        return "{} - {} - {}".format(
            self.doc_compania,
            self.doc_tipo,
            self.doc_numero
        )


class VM_PORF_NOMINA(models.Model):

    base = models.CharField(max_length=30)
    doc_compania = models.CharField(max_length=5)
    doc_compania_desc = models.CharField(max_length=30)
    anio = models.CharField(max_length=4)
    periodo = models.CharField(max_length=2)
    doc_tipo = models.CharField(max_length=2)
    doc_tipo_desc = models.CharField(max_length=30)
    doc_numero = models.IntegerField(primary_key=True)
    doc_fecha_lm = models.DateField()
    un_proyecto = models.CharField(max_length=3)
    un_proyecto_desc = models.CharField(max_length=30)
    un_proyecto_zona = models.CharField(max_length=30)
    un_proyecto_tipo = models.CharField(max_length=2)
    un_proyecto_tipo_desc = models.CharField(max_length=60)
    un = models.CharField(max_length=12)
    un_desc = models.CharField(max_length=60)
    cuenta_numero = models.CharField(max_length=29)
    cuenta_desc = models.CharField(max_length=30)
    cuenta_tipo = models.CharField(max_length=3)
    cuenta_tipo_desc = models.CharField(max_length=30)
    cuenta_clase = models.CharField(max_length=3)
    cuenta_clase_desc = models.CharField(max_length=30)
    cuenta_flujo = models.CharField(max_length=3)
    cuenta_flujo_desc = models.CharField(max_length=30)
    cuenta_porf_clase = models.CharField(max_length=3)
    cuenta_porf_clase_desc = models.CharField(max_length=30)
    monto_mx = models.DecimalField(max_digits=20, decimal_places=4)
    enero_mx = models.DecimalField(max_digits=20, decimal_places=4)
    febrero_mx = models.DecimalField(max_digits=20, decimal_places=4)
    marzo_mx = models.DecimalField(max_digits=20, decimal_places=4)
    abril_mx = models.DecimalField(max_digits=20, decimal_places=4)
    mayo_mx = models.DecimalField(max_digits=20, decimal_places=4)
    junio_mx = models.DecimalField(max_digits=20, decimal_places=4)
    julio_mx = models.DecimalField(max_digits=20, decimal_places=4)
    agosto_mx = models.DecimalField(max_digits=20, decimal_places=4)
    septiembre_mx = models.DecimalField(max_digits=20, decimal_places=4)
    octubre_mx = models.DecimalField(max_digits=20, decimal_places=4)
    noviembre_mx = models.DecimalField(max_digits=20, decimal_places=4)
    diciembre_mx = models.DecimalField(max_digits=20, decimal_places=4)

    class Meta:
        managed = False
        db_table = u'"NUVPD"."VM_PORF_NOMINA"'

    def __str__(self):
        return "{} - {} - {}".format(
            self.doc_compania,
            self.doc_tipo,
            self.doc_numero
        )


class VIEW_RECEPSINCOTEJO(models.Model):

    oc_compania = models.CharField(max_length=5)
    oc_compania_desc = models.CharField(max_length=30)
    oc_proyecto = models.CharField(max_length=3)
    oc_proyecto_desc = models.CharField(max_length=30)
    oc_un = models.CharField(max_length=12)
    oc_un_desc = models.CharField(max_length=60)
    oc_numero = models.IntegerField(primary_key=True)
    oc_tipo = models.CharField(max_length=2)
    oc_tipo_desc = models.CharField(max_length=30)
    oc_linea = models.IntegerField()
    oc_linea_tipo = models.CharField(max_length=2)
    oc_linea_tipo_desc = models.CharField(max_length=30)
    oc_fecha_creacion = models.DateField()
    oc_fecha_cancelacion = models.DateField()
    oc_estado_ultimo = models.CharField(max_length=3)
    oc_estado_siguiente = models.CharField(max_length=3)
    oc_comprador = models.IntegerField()
    oc_comprador_desc = models.CharField(max_length=40)
    oc_originador = models.CharField(max_length=10)
    oc_originador_desc = models.CharField(max_length=40)
    oc_proveedor = models.IntegerField()
    oc_proveedor_desc = models.CharField(max_length=40)
    oc_item = models.IntegerField()
    oc_item_numero = models.CharField(max_length=25)
    oc_item_desc = models.CharField(max_length=60)
    oc_cantidad_solic = models.DecimalField(max_digits=20, decimal_places=4)
    oc_udm = models.CharField(max_length=2)
    oc_udm_desc = models.CharField(max_length=30)
    oc_cantidad_recib = models.DecimalField(max_digits=20, decimal_places=4)
    oc_cantidad_xrecib = models.DecimalField(max_digits=20, decimal_places=4)
    oc_recepcion = models.CharField(max_length=9)
    oc_pu_ex = models.DecimalField(max_digits=20, decimal_places=4)
    oc_total_ex = models.DecimalField(max_digits=20, decimal_places=4)
    oc_monto_recib_ex = models.DecimalField(max_digits=20, decimal_places=4)
    oc_monto_xrecib_ex = models.DecimalField(max_digits=20, decimal_places=4)
    oc_moneda = models.CharField(max_length=3)
    oc_tasa = models.DecimalField(max_digits=20, decimal_places=4)
    oc_pu_mx = models.DecimalField(max_digits=20, decimal_places=4)
    oc_total_mx = models.DecimalField(max_digits=20, decimal_places=4)
    oc_monto_recib_mx = models.DecimalField(max_digits=20, decimal_places=4)
    oc_monto_xrecib_mx = models.DecimalField(max_digits=20, decimal_places=4)
    recepcion_no = models.DecimalField(max_digits=20, decimal_places=4)
    recepcion_compania = models.CharField(max_length=5)
    recepcion_tipo = models.CharField(max_length=2)
    recepcion_doc = models.IntegerField()
    recepcion_linea = models.IntegerField()
    recepcion_fecha = models.DateField()
    recepcion_fecha_lm = models.DateField()
    recepcion_cantidad = models.DecimalField(max_digits=20, decimal_places=4)
    recepcion_udm = models.CharField(max_length=2)
    recepcion_pu_ex = models.DecimalField(max_digits=20, decimal_places=4)
    recepcion_monto_ex = models.DecimalField(max_digits=20, decimal_places=4)
    recepcion_moneda = models.CharField(max_length=3)
    recepcion_tasa = models.DecimalField(max_digits=20, decimal_places=4)
    recepcion_pu_mx = models.DecimalField(max_digits=20, decimal_places=4)
    recepcion_monto_mx = models.DecimalField(max_digits=20, decimal_places=4)
    recepcion_contenedor = models.CharField(max_length=20)
    recepcion_batch = models.IntegerField()
    recepcion_batch_tipo = models.CharField(max_length=2)
    recepcion_originador = models.CharField(max_length=10)
    recepcion_originador_desc = models.CharField(max_length=40)
    fac_compania = models.CharField(max_length=5)
    fac_tipo = models.CharField(max_length=2)
    fac = models.IntegerField()
    fac_linea = models.IntegerField()
    fac_updater = models.CharField(max_length=10)
    fac_updater_desc = models.CharField(max_length=40)
    fac_fecha_update = models.DateField()

    class Meta:
        managed = False
        db_table = u'"NUVPD"."VIEW_RECEPSINCOTEJO"'

    def __str__(self):
        return "{} - {} - {}".format(
            self.doc_compania,
            self.oc_tipo,
            self.oc_numero,
            self.oc_linea,
        )
