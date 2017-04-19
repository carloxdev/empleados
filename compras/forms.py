# -*- coding: utf-8 -*-
# Django:
from django.forms import ModelForm
from django.forms import TextInput
from django.forms import Textarea
from django.forms import Select
from django.forms import Form
from django.forms import CharField

class ComprasSeguimientoForm(Form):
    COMPANIAS = (
        ('sig', 'Sistemas Integrales de Compresión'),
        ('aceitemex', 'Aceitemex'),
    )
    TIPOS = (
        ('SR - Requision', 'SR - Requision'),
        ('QS - Cotizacion', 'QS - Cotizacion')
    )
    CANCELADAS = (
        ('si', 'Si mostrar'),
        ('no', 'No mostrar')
    )
    RECEPCION = (
        ('si', 'Con recepción'),
        ('no', 'Sin recepción')
    )


    compania = CharField(
        widget=Select(attrs={'class': 'form-control input-xs'}, choices=COMPANIAS)
    )
    sucursal = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )
    comprador = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )

    requisicion = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )
    requisicion_tipo = CharField(
        widget=Select(attrs={'class': 'form-control input-xs'}, choices=TIPOS)
    )
    requisicion_originador = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )
    requisicion_canceladas = CharField(
        widget=Select(attrs={'class': 'form-control input-xs'}, choices=CANCELADAS)
    )

    cotizacion = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )
    cotizacion_tipo = CharField(
        widget=Select(attrs={'class': 'form-control input-xs'}, choices=TIPOS)
    )
    cotizacion_originador = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )
    cotizacion_canceladas = CharField(
        widget=Select(attrs={'class': 'form-control input-xs'}, choices=CANCELADAS)
    )

    oc = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )
    oc_tipo = CharField(
        widget=Select(attrs={'class': 'form-control input-xs'}, choices=TIPOS)
    )
    oc_originador = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )
    oc_canceladas = CharField(
        widget=Select(attrs={'class': 'form-control input-xs'}, choices=CANCELADAS)
    )
    oc_desde = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )
    oc_hasta = CharField(
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


