# -*- coding: utf-8 -*-

# Django's Libraries
from django.forms import ModelForm
from django.forms import TextInput
from django.forms import Textarea
from django.forms import Select
from django.forms import Form
from django.forms import CharField
from django.forms import ChoiceField
from django.forms import HiddenInput

# Own's Libraries
from .models import ViaticoCabecera

from jde.business import CentroCostoBusiness
from ebs.business import EmpleadoBusiness

from home.forms_fields import SelectCustom


class ViaticoFilterForm(Form):

    proposito_viaje = CharField(
        label="Proposito del viaje",
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )

    empleado = ChoiceField(
        widget=SelectCustom(attrs={'class': 'form-control input-xs'})
    )

    unidad_negocio = ChoiceField(
        label="Unidad de Negocio",
        widget=SelectCustom(attrs={'class': 'form-control input-xs'})
    )

    ciudad_destino = CharField(
        label="Destino",
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )

    autorizador = ChoiceField(
        widget=SelectCustom(attrs={'class': 'form-control input-xs'})
    )

    created_date_mayorque = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )

    created_date_menorque = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )

    def __init__(self, *args, **kwargs):
        super(ViaticoFilterForm, self).__init__(*args, **kwargs)
        self.fields['empleado'].choices = EmpleadoBusiness.get_Todos_ForSelectCustom()
        self.fields['unidad_negocio'].choices = CentroCostoBusiness.get_Todos_ForSelectCustom()
        self.fields['autorizador'].choices = EmpleadoBusiness.get_Todos_ForSelectCustom()


class ViaticoCabeceraForm(ModelForm):

    empleado_clave = ChoiceField(
        label="Empleado",
        widget=SelectCustom(
            attrs={'class': 'form-control input-xs'}
        )
    )

    unidad_negocio_clave = ChoiceField(
        label="Unidad Negocio",
        widget=SelectCustom(
            attrs={'class': 'form-control input-xs'}
        )
    )

    class Meta:
        model = ViaticoCabecera

        fields = [
            'empleado_clave',
            'empleado_descripcion',
            'unidad_negocio_clave',
            'unidad_negocio_descripcion',
            'fecha_partida',
            'fecha_regreso',
            'proposito_viaje',
            'ciudad_destino',
        ]

        widgets = {
            'empleado_descripcion': HiddenInput(),
            'unidad_negocio_descripcion': HiddenInput(),
            'proposito_viaje': Textarea(attrs={'class': 'form-control'}),
            'fecha_partida': TextInput(attrs={'class': 'form-control input-xs', 'readonly': 'readonly'}),
            'fecha_regreso': TextInput(attrs={'class': 'form-control input-xs', 'readonly': 'readonly'}),
            'ciudad_destino': TextInput(attrs={'class': 'form-control input-xs'}),
        }

    def __init__(self, *args, **kwargs):
        super(ViaticoCabeceraForm, self).__init__(*args, **kwargs)
        self.fields['empleado_clave'].choices = EmpleadoBusiness.get_Activos_ForSelectCustom()
        self.fields['unidad_negocio_clave'].choices = CentroCostoBusiness.get_Activos_ForSelectCustom()


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


class AnticipoFilterForm(Form):

    proposito_viaje = CharField(
        label="Proposito del viaje",
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )

    empleado = ChoiceField(
        widget=SelectCustom(attrs={'class': 'form-control input-xs'})
    )

    unidad_negocio = ChoiceField(
        label="Unidad de Negocio",
        widget=SelectCustom(attrs={'class': 'form-control input-xs'})
    )

    ciudad_destino = CharField(
        label="Destino",
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )

    autorizador = ChoiceField(
        widget=SelectCustom(attrs={'class': 'form-control input-xs'})
    )

    created_date_mayorque = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )

    created_date_menorque = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )

    def __init__(self, *args, **kwargs):
        super(AnticipoFilterForm, self).__init__(*args, **kwargs)
        self.fields['empleado'].choices = EmpleadoBusiness.get_Todos_ForSelectCustom()
        self.fields['unidad_negocio'].choices = CentroCostoBusiness.get_Todos_ForSelectCustom()
        self.fields['autorizador'].choices = EmpleadoBusiness.get_Todos_ForSelectCustom()
