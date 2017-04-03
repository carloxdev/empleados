# -*- coding: utf-8 -*-
# Django:
from django.forms import ModelForm
from django.forms import TextInput
from django.forms import Textarea
from django.forms import Select
from django.forms import Form
from django.forms import CharField

from .models import ViaticoCabecera


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

        widgets = {'empleado': TextInput(attrs={'class': 'form-control input-xs'}),
                   'fecha_partida': TextInput(attrs={
                       'class': 'form-control input-xs',
                       'data-date-format': 'yyyy-mm-dd'
                   }),
                   'fecha_regreso': TextInput(attrs={
                       'class': 'form-control input-xs',
                       'data-date-format': 'yyyy-mm-dd'
                   }),
                   'unidad_negocio': TextInput(attrs={'class': 'form-control input-xs'}),
                   'ciudad_destino': TextInput(attrs={'class': 'form-control input-xs'}),
                   'proposito_viaje': Textarea(attrs={'class': 'form-control input-xs'}),
                   'requiere_vehiculo': Select(attrs={'class': 'form-control input-xs'},
                                               choices=ViaticoCabecera.VEHICULO_OPCIONES),
                   'no_vehiculo': TextInput(attrs={'class': 'form-control input-xs'}),
                   'nombre_empresa': TextInput(attrs={'class': 'form-control input-xs'}),
                   'rfc': TextInput(attrs={'class': 'form-control input-xs'}),
                   'direccion': TextInput(attrs={'class': 'form-control input-xs'}),
                   'grupo': TextInput(attrs={'class': 'form-control input-xs'}),
                   'autorizador': TextInput(attrs={'class': 'form-control input-xs'}),
                   'estado_solicitud': TextInput(attrs={'class': 'form-control input-xs'}),

                   }


class ViaticoLineaForm(Form):

    concepto = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )
    observaciones = CharField(
        widget=Textarea(attrs={'class': 'form-control input-xs'})
    )
    importe = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )


class ViaticoFilterForm(Form):

    empleado = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )
    fecha_partida_inicio = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )
    fecha_partida_fin = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs',
                                'data-date-format': 'yyyy-mm-dd'})
    )
    fecha_regreso_inicio = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs',
                                'data-date-format': 'yyyy-mm-dd'})
    )
    fecha_regreso_fin = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs',
                                'data-date-format': 'yyyy-mm-dd'})
    )
    unidad_negocio = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )
    ciudad_destino = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )
    autorizador = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )
