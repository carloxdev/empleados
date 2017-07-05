# -*- coding: utf-8 -*-

# Librerias/Clases Django
from django.forms import Form
from django.forms import CharField
from django.forms import ChoiceField
from django.forms import TextInput


# Librerias/Clases propias
from home.forms_fields import SelectCustom

# modelos


class CriterioForm(Form):

    clasificacion = ChoiceField(
        label='Clasificación',
        widget=SelectCustom(attrs={'class': 'form-control input-xs'})
    )

    criterio = CharField(
        label='criterio',
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )


class RequisitoForm(Form):

    requisito = CharField(
        label='Requisito',
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )


class CriterioFilterForm(Form):

    requisito = CharField(
        label='Requisito',
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )
