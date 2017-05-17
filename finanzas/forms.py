# -*- coding: utf-8 -*-

# Librerias/Clases Django
from django.forms import ModelForm
from django.forms import TextInput
from django.forms import Textarea
from django.forms import Select
from django.forms import Form
from django.forms import CharField
from django.forms import ChoiceField

from django.conf import settings

# Librerias/Clases propias

# Modelos:
from .models import ViaticoCabecera
from ebs.models import VIEW_EMPLEADOS_SIMPLE


class ViaticoFilterForm(Form):

    empleado = ChoiceField(
        widget=Select(attrs={'class': 'select2'})
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

    def __init__(self, *args, **kwargs):
        super(ViaticoFilterForm, self).__init__(*args, **kwargs)
        self.fields['empleado'].choices = self.get_Empleados()

    def get_Empleados(self):

        valores = [('', '------')]

        empleados = VIEW_EMPLEADOS_SIMPLE.objects.using('ebs_d').all()

        for empleado in empleados:
            valores.append(
                (
                    empleado.pers_clave,
                    empleado.pers_nombre_completo
                )
            )

        return valores


class ViaticoCabeceraForm(ModelForm):

    class Meta:
        model = ViaticoCabecera

        fields = [
            'empleado',
            'fecha_partida',
            'fecha_regreso',
            'unidad_negocio',
            'ciudad_destino',
            'proposito_viaje',
            'nombre_empresa',
            'rfc',
            'direccion',
            'grupo',
            'autorizador',
            'status',
        ]

        labels = {
            'empleado': 'Empleado',
            'fecha_partida': 'Fecha de partida',
            'fecha_regreso': 'Fecha de regreso',
            'unidad_negocio': 'Unidad de negocio',
            'ciudad_destino': 'Ciudad de destino',
            'proposito_viaje': 'Proposito del viaje',
            'nombre_empresa': 'Empresa',
            'rfc': 'RFC',
            'direccion': 'Dirección',
            'grupo': 'Grupo',
            'autorizador': 'Autorizador',
            'status': 'Estado',
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
                   'nombre_empresa': TextInput(attrs={'class': 'form-control input-xs'}),
                   'rfc': TextInput(attrs={'class': 'form-control input-xs'}),
                   'direccion': TextInput(attrs={'class': 'form-control input-xs'}),
                   'grupo': TextInput(attrs={'class': 'form-control input-xs'}),
                   'autorizador': TextInput(attrs={'class': 'form-control input-xs'}),
                   'status': TextInput(attrs={'class': 'form-control input-xs'}),
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
