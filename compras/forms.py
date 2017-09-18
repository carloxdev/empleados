# -*- coding: utf-8 -*-
# Django:
from django.forms import TextInput
from django.forms import Select
from django.forms import Form
from django.forms import CharField
from django.forms import IntegerField
from django.forms import NumberInput
from django.forms import ChoiceField
from django.forms import RadioSelect

# Modelos
from jde.models import VIEW_COMPANIAS
from jde.models import VIEW_UNIDADES
from jde.models import VIEW_USUARIOS


class SeguimientoComprasFilterForm(Form):
    TIPOS_REQUISISION = (
        ('', '-------'),
        ('SR', 'SR - Requisición de Servicios'),
        ('OR', 'OR - Requisición de Materiales'),
        ('XR', 'XR - Requisición de Activos'),
        ('SJ', 'SJ - Requisición de JackUp'),
        ('1N', '1N - Requisición para compra Nacional'),
        ('1P', '1P - Requisición para compra Nacional Rel'),
        ('1I', '1I - Requisición para compra de Importacion'),
        ('1Q', '1Q - Requisición para compra de Importacion Rel')
    )
    TIPOS_COTIZACION = (
        ('', '-------'),
        ('QS', 'QS - Cotización de Servicio'),
        ('OQ', 'OQ - Cotización de Materiales'),
        ('QX', 'QX - Cotización de Activos'),
        ('QJ', 'QJ - Cotización de JackUp'),
        ('2N', '2N - Cotizacion para compra Nacional'),
        ('2P', '2P - Cotizacion para compra Nacional Rel'),
        ('2I', '2I - Cotizacion para compra de Importacion'),
        ('2Q', '2Q - Cotizacion para compra de Importacion Rel')
    )
    TIPOS_OC = (
        ('', '-------'),
        ('OS', 'OS - OC de Servicio'),
        ('OP', 'OP - OC de Materiales'),
        ('OX', 'OX - OC de Activos'),
        ('OJ', 'OJ - OC de JackUp'),
        ('3N', '3N - Orden para compra Nacional'),
        ('3P', '3P - Orden para compra Nacional Rel'),
        ('3I', '3I - Orden para compra de Importacion'),
        ('3Q', '3Q - Orden para compra de Importacion Rel')
    )

    CANCELADAS = (
        ('', 'No'),
        ('980', 'Si')

    )
    RECEPCION = (
        ('', '-------'),
        ('COMPLETA', 'Con recepción'),
        ('PENDIENTE', 'Sin recepción'),
        ('PARCIAL', 'Parcial')
    )

    compania = ChoiceField(
        widget=Select(attrs={'name': 'compania', 'class': 'select2 nova-select2'})
    )
    sucursal = ChoiceField(
        label="Sucursal/Planta",
        widget=Select(attrs={'name': 'sucursal', 'class': 'select2 nova-select2'})
    )
    comprador = CharField(
        label="Comprador Nombre",
        widget=TextInput(
            attrs={'name': 'comprador', 'class': 'form-control input-xs', 'placeholder': 'Ejemplo: JORDAN'})
    )

    requisicion = IntegerField(
        label="Requisicion No.",
        widget=NumberInput(
            attrs={'name': 'requisicion', 'class': 'form-control input-xs', 'min': '1'})
    )
    requisicion_tipo = CharField(
        label="Requisicion Tipo",
        widget=Select(attrs={'name': 'requisicion_tipo', 'class': 'form-control input-xs'},
                      choices=TIPOS_REQUISISION)
    )
    requisicion_originador = ChoiceField(
        label="Requisicion Originador",
        widget=Select(attrs={'name': 'requisicion_originador', 'class': 'select2 nova-select2'})
    )
    requisicion_canceladas = ChoiceField(
        label='¿Mostrar canceladas?',
        widget=RadioSelect, choices=CANCELADAS
    )
    requisicion_desde = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs', 'readonly': 'readonly'})
    )

    requisicion_hasta = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs', 'readonly': 'readonly'})
    )

    cotizacion = IntegerField(
        label="Cotizacion No.",
        widget=NumberInput(
            attrs={'name': 'cotizacion', 'class': 'form-control input-xs', 'min': '1'})
    )
    cotizacion_tipo = CharField(
        label="Cotizacion Tipo",
        widget=Select(attrs={'name': 'cotizacion_tipo', 'class': 'form-control input-xs'},
                      choices=TIPOS_COTIZACION)
    )
    cotizacion_originador = ChoiceField(
        label="Cotizacion Originador",
        widget=Select(attrs={'name': 'cotizacion_originador', 'class': 'select2 nova-select2'})
    )
    cotizacion_canceladas = ChoiceField(
        label='¿Mostrar canceladas?',
        widget=RadioSelect, choices=CANCELADAS
    )

    oc = IntegerField(
        label="Orden No.",
        widget=NumberInput(
            attrs={'name': 'oc', 'class': 'form-control input-xs', 'min': '1'})
    )
    oc_tipo = CharField(
        label="Orden Tipo",
        widget=Select(
            attrs={'name': 'oc_tipo', 'class': 'form-control input-xs'}, choices=TIPOS_OC)
    )
    oc_originador = ChoiceField(
        label="Orden Originador",
        widget=Select(attrs={'name': 'oc_originador', 'class': 'select2 nova-select2'})
    )
    oc_canceladas = ChoiceField(
        label='¿Mostrar canceladas?',
        widget=RadioSelect, choices=CANCELADAS
    )
    oc_desde = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs', 'readonly': 'readonly'})
    )
    oc_hasta = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs', 'readonly': 'readonly'})
    )

    proveedor = CharField(
        label="Proveedor Nombre",
        widget=TextInput(
            attrs={'name': 'proveedor', 'class': 'form-control input-xs', 'placeholder': 'Ejemplo: SANTANDREU'})
    )
    item = CharField(
        label="Articulo descripcion",
        widget=TextInput(
            attrs={'name': 'item', 'class': 'form-control input-xs', 'placeholder': 'Ejemplo: TUBERIA'})
    )
    recepcion = CharField(
        widget=Select(
            attrs={'name': 'recepcion', 'class': 'form-control input-xs'}, choices=RECEPCION)
    )

    def __init__(self, *args, **kwargs):
        super(SeguimientoComprasFilterForm, self).__init__(
            *args, **kwargs)
        self.fields['compania'].choices = self.get_Compania()
        self.fields['sucursal'].choices = self.get_Sucursal()
        self.fields['requisicion_originador'].choices = self.get_Originador()
        self.fields['cotizacion_originador'].choices = self.get_Originador()
        self.fields['oc_originador'].choices = self.get_Originador()

    def get_Compania(self):

        valores = [('', '-------')]

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

        valores = [('', '-------')]

        unidades = VIEW_UNIDADES.objects.using('jde_p').all()

        for unidad in unidades:

            valores.append(
                (
                    unidad.clave,
                    '(' + unidad.clave + ')' + ' ' + unidad.desc_corta,
                )
            )
        return valores

    def get_Originador(self):
        valores = [('', '-------')]
        originadores = VIEW_USUARIOS.objects.using(
            'jde_p').filter(dir_tipo__contains="E")

        for originador in originadores:
            valores.append(
                (originador.clave,
                    originador.dir_desc,
                 )
            )
        return valores
