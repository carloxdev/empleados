# -*- coding: utf-8 -*-
from django import forms
from .models import ViaticoCabecera, ViaticoLinea
from django.forms import ModelForm
from finanzas.models import VEHICULO_OPCIONES

#from django.utils.timezone import datetime

class ViaticoCabeceraForm(forms.ModelForm):
    class Meta:
        model = ViaticoCabecera        
        
        fields = '__all__'
        
        labels = {  'empleado' : 'Empleado',
                    'fecha_partida' : 'Fecha de partida',
                    'fecha_regreso' : 'Fecha de regreso',
                    'unidad_negocio' : 'Unidad de negocio',
                    'ciudad_destino' : 'Ciudad de destino',
                    'proposito_viaje' : 'Proposito del viaje',
                    'requiere_vehiculo' : '¿requiere vehículo?',
                    'no_vehiculo' : 'No. del vehículo',
                    'nombre_empresa' : 'Nombre de la empresa',
                    'rfc' : 'RFC',
                    'direccion' : 'Dirección',
                    'grupo' : 'Grupo',
                    'autorizador' : 'Autorizador',
                    'estado_solicitud' : 'Estado de la solicitud',
                    
        }
        
        widgets = { 'empleado' : forms.TextInput(attrs={'class':'form-control input-sm'}),
                    'fecha_partida' : forms.TextInput(attrs={'class':'form-control input-sm', 'data-date-format': 'yyyy-mm-dd'}),
                    'fecha_regreso' : forms.TextInput(attrs={'class':'form-control input-sm', 'data-date-format': 'yyyy-mm-dd'}),
                    'unidad_negocio' : forms.TextInput(attrs={'class':'form-control input-sm'}),
                    'ciudad_destino' : forms.TextInput(attrs={'class':'form-control input-sm'}),
                    'proposito_viaje' : forms.Textarea(attrs={'class':'form-control input-sm'}),
                    'requiere_vehiculo' : forms.Select(choices= VEHICULO_OPCIONES),
                    'no_vehiculo' : forms.TextInput(attrs={'class':'form-control input-sm'}),
                    'nombre_empresa' : forms.TextInput(attrs={'class':'form-control input-sm'}),
                    'rfc' : forms.TextInput(attrs={'class':'form-control input-sm'}),
                    'direccion' : forms.TextInput(attrs={'class':'form-control input-sm'}),
                    'grupo' : forms.TextInput(attrs={'class':'form-control input-sm'}),
                    'autorizador' : forms.TextInput(attrs={'class':'form-control input-sm'}),
                    'estado_solicitud' : forms.TextInput(attrs={'class':'form-control input-sm'}),
                    
        }

class ViaticoLineaForm(forms.ModelForm):
    class Meta:
        model = ViaticoLinea
        fields = '__all__'
        
        labels = {  'concepto' : 'Concepto',
                    'observaciones' : 'Observaciones',
                    'importe' : 'Importe',
        }
        
        widgets = { 'concepto' : forms.TextInput(attrs={'class':'form-control input-sm'}),
                    'observaciones' : forms.Textarea(attrs={'class':'form-control input-sm'}),
                    'importe' : forms.NumberInput(attrs={'class':'form-control input-sm'}),
        }