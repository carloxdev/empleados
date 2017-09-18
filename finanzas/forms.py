# -*- coding: utf-8 -*-

# Django's Libraries
from django.forms import ModelForm
from django.forms import TextInput
from django.forms import NumberInput
from django.forms import Textarea
from django.forms import Select
from django.forms import Form
from django.forms import CharField
from django.forms import ChoiceField
from django.forms import HiddenInput
from django.forms import DateInput
from django.forms import ValidationError

# Own's Libraries
from .models import ViaticoCabecera
from .models import ViaticoLinea

from jde.business import CentroCostoBusiness
from ebs.business import EmpleadoBusiness

from home.forms_fields import SelectCustom


class ViaticoFilterForm(Form):

    empleado_clave = ChoiceField(
        widget=SelectCustom(attrs={'class': 'form-control input-xs'})
    )

    un_clave = ChoiceField(
        label="Unidad de Negocio",
        widget=SelectCustom(attrs={'class': 'form-control input-xs'})
    )

    autorizador_clave = ChoiceField(
        widget=SelectCustom(attrs={'class': 'form-control input-xs'})
    )

    proposito_viaje = CharField(
        label="Proposito del viaje",
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )

    ciudad_destino = CharField(
        label="Destino",
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )

    created_date_mayorque = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs', 'readonly': 'readonly'})
    )

    created_date_menorque = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs', 'readonly': 'readonly'})
    )

    def __init__(self, *args, **kwargs):
        super(ViaticoFilterForm, self).__init__(*args, **kwargs)
        self.fields['empleado_clave'].required = False
        self.fields['un_clave'].required = False
        self.fields['autorizador_clave'].required = False

        self.fields['empleado_clave'].choices = EmpleadoBusiness.get_Todos_ForSelectCustom()
        self.fields['un_clave'].choices = CentroCostoBusiness.get_Todos_ForSelectCustom()
        self.fields['autorizador_clave'].choices = EmpleadoBusiness.get_Todos_ForSelectCustom()


class ViaticoCabeceraForm(ModelForm):

    empleado_clave = ChoiceField(
        label="Empleado",
        widget=Select(
            attrs={'class': 'form-control input-xs'}
        )
    )

    un_clave = ChoiceField(
        label="Unidad Negocio",
        widget=Select(
            attrs={'class': 'form-control input-xs'}
        )
    )

    class Meta:
        model = ViaticoCabecera

        fields = [
            'empleado_clave',
            'empleado_descripcion',
            'un_clave',
            'un_descripcion',
            'fecha_partida',
            'fecha_regreso',
            'proposito_viaje',
            'ciudad_destino',
        ]

        widgets = {
            'empleado_descripcion': HiddenInput(),
            'un_descripcion': HiddenInput(),
            'proposito_viaje': Textarea(attrs={'class': 'form-control'}),
            'fecha_partida': DateInput(attrs={'class': 'form-control input-xs', 'readonly': 'readonly'}, format='%d/%m/%Y'),
            'fecha_regreso': DateInput(attrs={'class': 'form-control input-xs', 'readonly': 'readonly'}, format='%d/%m/%Y'),
            'ciudad_destino': TextInput(attrs={'class': 'form-control input-xs'}),
        }

    def __init__(self, *args, **kwargs):
        super(ViaticoCabeceraForm, self).__init__(*args, **kwargs)
        self.fields['empleado_clave'].choices = EmpleadoBusiness.get_Activos_ForSelect()
        self.fields['un_clave'].choices = CentroCostoBusiness.get_Activos_ForSelect()

    def clean_fecha_regreso(self):
        f_partida = self.cleaned_data['fecha_partida']
        f_regreso = self.cleaned_data['fecha_regreso']

        if f_partida > f_regreso:
            raise ValidationError("La fecha de regreso no puede ser menor a la fecha partida")

        return f_regreso

    def clean(self):
        cleaned_data = super(ViaticoCabeceraForm, self).clean()
        empleado_descripcion = cleaned_data.get("empleado_descripcion")
        un_descripcion = cleaned_data.get("un_descripcion")

        if empleado_descripcion is None:
            raise ValidationError(
                "No se pudo obtener la descripcion de empleado"
            )

        if un_descripcion is None:
            raise ValidationError(
                "No se pudo obtener la descripcion de la UN"
            )


class ViaticoLineaForm(ModelForm):

    class Meta:
        model = ViaticoLinea

        fields = [
            'concepto',
            'observaciones',
            'importe'
        ]

        widgets = {
            'concepto': TextInput(attrs={'class': 'form-control input-xs'}),
            'observaciones': Textarea(attrs={'class': 'form-control input-xs'}),
            'importe': NumberInput(attrs={'class': 'form-control input-xs'})
        }


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
