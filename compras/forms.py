# -*- coding: utf-8 -*-
# Django:
from django.forms import ModelForm
from django.forms import TextInput
from django.forms import Textarea
from django.forms import Select
from django.forms import Form
from django.forms import DateField
from django.forms import CharField
from django.forms import IntegerField
from django.forms import NumberInput

class ComprasSeguimientoForm(Form):
    COMPANIAS = (
        ('*', ''),
        ('1', '1 - SISTEMAS INTEGRALES DE COMPRESION S.A. DE C.V.'),
        ('2', '2 - PART TECHNICAL SERVICES SA DE CV'),
        ('3', '3 - INMOBILIARIA Y PROYECTOS DE CONSTRUCCION S.A. DE C.V.'),
        ('4', '4 - MANTENIMIENTO ESPECIALIZADO Y TRANSPORTE S.A. DE C.V.'),
        ('6', '6 - ACEITEMEX SA DE CV'),
        ('7', '7 - SINEA SA DE CV'),
        ('8', '8 - RANCHO LA SUPREMA EXCELENCIA S DE PR DE R.L.'),
        ('9', '9 - AEROLINEA MACFLY SA DE CV'),
        ('10', '10 - GRUPO EXSEN SA DE CV'),
        ('11', '11 - ALHER OIL &amp; GAS SA DE CV'),
        ('12', '12 - TINGLO SA DE CV'),
        ('14', '14 - DUXCON SA DE CV'),
        ('15', '15 - TFS TURBINE FIELD SOLUTIONS'),
        ('16', '16 - H3A1 SA DE CV'),
        ('18', '18 - GEOLIS SA DE CV'),
        ('19', '19 - CONSORCIO PETROLERO 5M DEL GOLFO S.A.P.I. DE C.V.'),
    )
    TIPOSREQUISISION = (
        ('*', ''),
        ('SR','SR - Requisición de Servicios'),
        ('OR','OR - Requisición de Materiales'),
        ('XR','XR - Requisición de Activos'),
        ('SJ','SJ - Requisición de JackUp'),
        ('1N','1N - Requisición para compra Nacional'),
        ('1P','1P - Requisición para compra Nacional Rel'),
        ('1I','1I - Requisición para compra de Importacion'),
        ('1Q','1Q - Requisición para compra de Importacion Rel')
    )
    TIPOSCOTIZACION = (
        ('*', ''),
        ('QS','QS - Cotización de Servicio'),
        ('OQ','OQ - Cotización de Materiales'),
        ('QX','QX - Cotización de Activos'),
        ('QJ','QJ - Cotización de JackUp'),
        ('2N','2N - Cotizacion para compra Nacional'),
        ('2P','2P - Cotizacion para compra Nacional Rel'),
        ('2I','2I - Cotizacion para compra de Importacion'),
        ('2Q','2Q - Cotizacion para compra de Importacion Rel')
    )
    TIPOSOC = (
        ('*', ''),
        ('OS','OS - OC de Servicio'),
        ('OP','OP - OC de Materiales'),
        ('OX','OX - OC de Activos'),
        ('OJ','OJ - OC de JackUp'),
        ('3N','3N - Orden para compra Nacional'),
        ('3P','3P - Orden para compra Nacional Rel'),
        ('3I','3I - Orden para compra de Importacion'),
        ('3Q','3Q - Orden para compra de Importacion Rel')   
    )

    CANCELADAS = (
        ('NO', 'No mostrar'),
        ('SI', 'Si mostrar')
        
    )
    RECEPCION = (
        ('*', ''),
        ('SI', 'Con recepción'),
        ('NO', 'Sin recepción')
    )

    compania = CharField(
        widget=Select(attrs={'class': 'form-control input-xs'}, choices=COMPANIAS)
    )
    sucursal = CharField(
        widget=Select(attrs={'class': 'select2 nova-select2'})
    )
    comprador = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )

    requisicion = IntegerField(
        widget=NumberInput(attrs={'class': 'form-control input-xs', 'min': '1'})
    )
    requisicion_tipo = CharField(
        widget=Select(attrs={'class': 'form-control input-xs'}, choices=TIPOSREQUISISION)
    )
    requisicion_originador = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )
    requisicion_canceladas = CharField(
        widget=Select(attrs={'class': 'form-control input-xs'}, choices=CANCELADAS)
    )

    cotizacion = IntegerField(
        widget=NumberInput(attrs={'class': 'form-control input-xs', 'min': '1' })
    )
    cotizacion_tipo = CharField(
        widget=Select(attrs={'class': 'form-control input-xs'}, choices=TIPOSCOTIZACION)
    )
    cotizacion_originador = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )
    cotizacion_canceladas = CharField(
        widget=Select(attrs={'class': 'form-control input-xs'}, choices=CANCELADAS)
    )

    oc = IntegerField(
        widget=NumberInput(attrs={'class': 'form-control input-xs', 'min': '1'})
    )
    oc_tipo = CharField(
        widget=Select(attrs={'class': 'form-control input-xs'}, choices=TIPOSOC)
    )
    oc_canceladas = CharField(
        widget=Select(attrs={'class': 'form-control input-xs'}, choices=CANCELADAS)
    )
    oc_desde = DateField(
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )
    oc_hasta = DateField(
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )

    proveedor = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )
    item = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )
    recepcion = CharField(
        widget=Select(attrs={'class': 'form-control input-xs'}, choices=RECEPCION)
    )


