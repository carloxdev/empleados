# -*- coding: utf-8 -*-
# Django:
from django.forms import ModelForm
from django.forms import TextInput
from django.forms import Textarea
from django.forms import NumberInput
from django.forms import Select
from django.forms import Form
from django.forms import CharField

from .models import ViaticoCabecera, ViaticoLinea


class ViaticoCabeceraForm(ModelForm):

    class Meta:
        model = ViaticoCabecera

        fields = '__all__'

        labels = {'empleado': 'Empleado',
                  'fecha_partida': 'Fecha de partida',
                  'fecha_regreso': 'Fecha de regreso',
                  'unidad_negocio': 'Unidad de negocio',
                  'ciudad_destino': 'Ciudad de destino',
                  'proposito_viaje': 'Proposito del viaje',
                  'requiere_vehiculo': '¿requiere vehículo?',
                  'no_vehiculo': 'No. del vehículo',
                  'nombre_empresa': 'Nombre de la empresa',
                  'rfc': 'RFC',
                  'direccion': 'Dirección',
                  'grupo': 'Grupo',
                  'autorizador': 'Autorizador',
                  'estado_solicitud': 'Estado de la solicitud',

                  }

        widgets = {'empleado': TextInput(attrs={'class': 'form-control input-sm'}),
                   'fecha_partida': TextInput(attrs={
                       'class': 'form-control input-sm',
                       'data-date-format': 'yyyy-mm-dd'
                   }),
                   'fecha_regreso': TextInput(attrs={
                       'class': 'form-control input-sm',
                       'data-date-format': 'yyyy-mm-dd'
                   }),
                   'unidad_negocio': TextInput(attrs={'class': 'form-control input-sm'}),
                   'ciudad_destino': TextInput(attrs={'class': 'form-control input-sm'}),
                   'proposito_viaje': Textarea(attrs={'class': 'form-control input-sm'}),
                   'requiere_vehiculo': Select(choices=ViaticoCabecera.VEHICULO_OPCIONES),
                   'no_vehiculo': TextInput(attrs={'class': 'form-control input-sm'}),
                   'nombre_empresa': TextInput(attrs={'class': 'form-control input-sm'}),
                   'rfc': TextInput(attrs={'class': 'form-control input-sm'}),
                   'direccion': TextInput(attrs={'class': 'form-control input-sm'}),
                   'grupo': TextInput(attrs={'class': 'form-control input-sm'}),
                   'autorizador': TextInput(attrs={'class': 'form-control input-sm'}),
                   'estado_solicitud': TextInput(attrs={'class': 'form-control input-sm'}),

                   }


class ViaticoLineaForm(ModelForm):

    class Meta:
        model = ViaticoLinea
        fields = '__all__'

        labels = {'concepto': 'Concepto',
                  'observaciones': 'Observaciones',
                  'importe': 'Importe',
                  }

        widgets = {'concepto': TextInput(attrs={
            'class': 'form-control input-sm'
        }),
            'observaciones': Textarea(attrs={
                'class': 'form-control input-sm'
            }),
            'importe': NumberInput(attrs={
                'class': 'form-control input-sm'
            }),
        }


class ViaticoFilterForm(Form):

    empleado = CharField(
        widget=TextInput(attrs={'class': 'form-control input-sm'})
    )
    fecha_partida = CharField(
        widget=TextInput(attrs={'class': 'form-control pull-right input-sm',
                                'data-date-format': 'yyyy-mm-dd'})
    )
    fecha_regreso_inicio = CharField(
        widget=TextInput(attrs={'class': 'form-control pull-right input-sm',
                                'data-date-format': 'yyyy-mm-dd'})
    )
    fecha_regreso_fin = CharField(
        widget=TextInput(attrs={'class': 'form-control pull-right input-sm',
                                'data-date-format': 'yyyy-mm-dd'})
    )
    unidad_negocio = CharField(
        widget=TextInput(attrs={'class': 'form-control input-sm'})
    )
    ciudad_destino = CharField(
        widget=TextInput(attrs={'class': 'form-control input-sm'})
    )
    autorizador = CharField(
        widget=TextInput(attrs={'class': 'form-control input-sm'})
    )
