# -*- coding: utf-8 -*-

# Librerias/Clases Django
from django.forms import Form
from django.forms import CharField
from django.forms import ChoiceField
from django.forms import TextInput
from django.forms import Select


# Librerias/Clases propias
from home.forms_fields import SelectCustom

# modelos


class CriterioForm(Form):
    CLASIFICACION = (
        ('', '------'),
        ('norma', 'Norma'),
        ('legal', 'Legal'),
        ('contractual', 'Contractual'),
        ('rsc', 'RSC'),
    )

    clasificacion = ChoiceField(
        label='Clasificación',
        widget=Select(attrs={'class': 'select2', 'id': 'id_clasificacion_criterio'}),
        choices=CLASIFICACION
    )

    criterio = CharField(
        label='Criterio',
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )


class RequisitoForm(Form):

    requisito = CharField(
        label='Requisito',
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )


class RequisitoFilterForm(Form):

    requisito = CharField(
        label='Requisito',
        widget=TextInput(attrs={'class': 'form-control input-xs', 'id': 'id_requisito_filtro'})
    )


class ProcesoForm(Form):

    proceso = CharField(
        label='Proceso',
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )

    responsable = ChoiceField(
        label='Responsables',
        widget=SelectCustom(attrs={'class': 'form-control input-xs', 'multiple': 'multiple', 'id': 'id_responsable'})
    )


class SubprocesoForm(Form):

    subproceso = CharField(
        label='Subproceso',
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )
