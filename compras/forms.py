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
from django.forms import ChoiceField
from django.forms import RadioSelect

#Modelos
from jde.models import VIEW_COMPANIAS
from jde.models import VIEW_UNIDADES

class ComprasSeguimientoFilterForm(Form):
    TIPOS_REQUISISION = (
        ('', ''),
        ('SR','SR - Requisición de Servicios'),
        ('OR','OR - Requisición de Materiales'),
        ('XR','XR - Requisición de Activos'),
        ('SJ','SJ - Requisición de JackUp'),
        ('1N','1N - Requisición para compra Nacional'),
        ('1P','1P - Requisición para compra Nacional Rel'),
        ('1I','1I - Requisición para compra de Importacion'),
        ('1Q','1Q - Requisición para compra de Importacion Rel')
    )
    TIPOS_COTIZACION = (
        ('', ''),
        ('QS','QS - Cotización de Servicio'),
        ('OQ','OQ - Cotización de Materiales'),
        ('QX','QX - Cotización de Activos'),
        ('QJ','QJ - Cotización de JackUp'),
        ('2N','2N - Cotizacion para compra Nacional'),
        ('2P','2P - Cotizacion para compra Nacional Rel'),
        ('2I','2I - Cotizacion para compra de Importacion'),
        ('2Q','2Q - Cotizacion para compra de Importacion Rel')
    )
    TIPOS_OC = (
        ('', ''),
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
        ('', 'No'),
        ('980', 'Si')
        
    )
    RECEPCION = (
        ('', ''),
        ('COMPLETA', 'Con recepción'),
        ('PENDIENTE', 'Sin recepción'),
        ('PARCIAL', 'Parcial')
    )

    compania = ChoiceField(
        widget=Select(attrs={'class': 'select2 input-xs'})
    )
    sucursal = ChoiceField(
        widget=Select(attrs={'class': 'select2 nova-select2'})
    )
    comprador = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )

    requisicion = IntegerField(
        widget=NumberInput(attrs={'class': 'form-control input-xs', 'min': '1'})
    )
    requisicion_tipo = CharField(
        widget=Select(attrs={'class': 'form-control input-xs'}, choices=TIPOS_REQUISISION)
    )
    requisicion_originador = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )
    requisicion_canceladas = ChoiceField(
        widget=RadioSelect, choices=CANCELADAS
    )

    cotizacion = IntegerField(
        widget=NumberInput(attrs={'class': 'form-control input-xs', 'min': '1' })
    )
    cotizacion_tipo = CharField(
        widget=Select(attrs={'class': 'form-control input-xs'}, choices=TIPOS_COTIZACION)
    )
    cotizacion_originador = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )
    cotizacion_canceladas = ChoiceField(
        widget=RadioSelect, choices=CANCELADAS
    )

    oc = IntegerField(
        widget=NumberInput(attrs={'class': 'form-control input-xs', 'min': '1'})
    )
    oc_tipo = CharField(
        widget=Select(attrs={'class': 'form-control input-xs'}, choices=TIPOS_OC)
    )
    oc_canceladas = ChoiceField(
        widget=RadioSelect, choices=CANCELADAS
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

    def __init__(self, *args, **kwargs):
        super(ComprasSeguimientoFilterForm, self).__init__(
            *args, **kwargs)
        self.fields['compania'].choices= self.get_Compania()
        self.fields['sucursal'].choices= self.get_Sucursal()

    def get_Compania(self):

        valores = [('','-------')]

        companias = VIEW_COMPANIAS.objects.using('jde_p').all()

        for compania in companias:

            valores.append(
                (   
                    compania.comp_code,
                    str(int(compania.comp_code)) + ' - ' + compania.comp_desc,
                )
            )
        return valores

    def get_Sucursal(self):

        valores = [('','-------')]

        unidades = VIEW_UNIDADES.objects.using('jde_p').all()

        for unidad in unidades:

            valores.append(
                (   
                    unidad.clave,
                    '(' + unidad.clave + ')' + ' ' + unidad.desc_corta,
                )
            )
        return valores