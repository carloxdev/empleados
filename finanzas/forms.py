# -*- coding: utf-8 -*-

# Librerias/Clases Django

from django.forms import ModelForm
from django.forms import TextInput
from django.forms import Textarea
# from django.forms import Select
from django.forms import Form
from django.forms import CharField
from django.forms import ChoiceField
from django.forms import HiddenInput

# Librerias/Clases propias
from .models import ViaticoCabecera

from home.forms_fields import SelectCustom

from jde.business import CentroCostoBusiness
from ebs.business import EmpleadoBusiness

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
