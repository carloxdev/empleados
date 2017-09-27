# -*- coding: utf-8 -*-

# Librerias/Clases Django

from django.forms import TextInput
from django.forms import Textarea
from django.forms import Form
from django.forms import Select
from django.forms import CharField
from django.forms import ChoiceField
from django.forms import FileField
from django.forms import ClearableFileInput

from home.forms_fields import SelectCustom

from jde.business import CentroCostoBusiness
from ebs.business import EmpleadoBusiness

# Modelos
from administracion.models import Asunto


class NuevaSolicitudForm(Form):

    asunto = ChoiceField(
        label="Asunto",
        widget=Select(attrs={'class': 'select2 nova-select2'}))

    descripcion = CharField(
        label="Descripcion",
        widget=Textarea(attrs={'class': 'form-control input-xs', 'placeholder': 'Ejemplo: Se detectaron incosistencias en la informacion...', 'rows': '5'}))

    archivo = FileField(
        label="Archivos",
        widget=ClearableFileInput(attrs={'class': 'dropzone dz-clickable dz-started', 'type': 'file', 'multiple': True}))

    def __init__(self, *args, **kwargs):
        super(NuevaSolicitudForm, self).__init__(*args, **kwargs)
        self.fields['asunto'].choices = self.get_Asuntos()

    def get_Asuntos(self):
        valores = [('', '------------')]

        asuntos = Asunto.objects.all()
        for asunto in asuntos:

            valores.append(
                (
                    asunto.pk,
                    asunto.nombre
                )
            )
        return valores


class MiViaticoFilterForm(Form):

    proposito_viaje = CharField(
        label="Proposito del viaje",
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )

    empleado = ChoiceField(
        widget=SelectCustom(attrs={'class': 'select2 form-control input-xs'})
    )

    unidad_negocio = ChoiceField(
        label="Unidad de Negocio",
        widget=SelectCustom(attrs={'class': 'select2 form-control input-xs'})
    )

    ciudad_destino = CharField(
        label="Destino",
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )

    autorizador = ChoiceField(
        widget=SelectCustom(attrs={'class': 'select2 form-control input-xs'})
    )

    created_date_mayorque = CharField(
        widget=TextInput(
            attrs={'class': 'form-control input-xs', 'readonly': 'readonly'})
    )

    created_date_menorque = CharField(
        widget=TextInput(
            attrs={'class': 'form-control input-xs', 'readonly': 'readonly'})
    )

    def __init__(self, *args, **kwargs):
        super(MiViaticoFilterForm, self).__init__(*args, **kwargs)
        self.fields[
            'empleado'].choices = EmpleadoBusiness.get_Todos_ForSelectCustom()
        self.fields[
            'unidad_negocio'].choices = CentroCostoBusiness.get_Todos_ForSelectCustom()
        self.fields[
            'autorizador'].choices = EmpleadoBusiness.get_Todos_ForSelectCustom()


class SolicitudesFilterForm(Form):
    STATUS = (
        ('', '------------'),
        ('cap', 'En captura'),
        ('act', 'Actualizado'),
        ('rech', 'Rechazado'),
        ('eli', 'Eliminado'),
    )
    asuntofiltro = ChoiceField(
        label="Asunto",
        widget=Select(attrs={'class': 'select2 nova-select2'}))

    folio = CharField(
        label="Folio",
        widget=TextInput(attrs={'class': 'form-control input-xs'}))

    status = ChoiceField(
        label="Estatus",
        choices=STATUS,
        widget=Select(attrs={'class': 'select2 nova-select2'}))

    def __init__(self, *args, **kwargs):
        super(SolicitudesFilterForm, self).__init__(*args, **kwargs)
        self.fields['asuntofiltro'].choices = self.get_Asuntos()

    def get_Asuntos(self):
        valores = [('', '------------')]

        asuntos = Asunto.objects.all()
        for asunto in asuntos:

            valores.append(
                (
                    asunto.pk,
                    asunto.nombre
                )
            )
        return valores
