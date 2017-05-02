# -*- coding: utf-8 -*-

# Librerias Django:
from django.forms import ModelForm
from django.forms import TextInput
from django.forms import CheckboxInput
# from django.forms import Textarea
from django.forms import Select
# from django.forms import Form
from django.forms import CharField
from django.forms import ChoiceField
from django.forms import IntegerField
from django.forms import BooleanField


# Librerias Propias:
from .models import IncidenciaDocumento
from .models import IncidenciaTipo

from ebs.models import VIEW_EMPLEADOS_SIMPLE
from administracion.models import Zona

from django import forms


class IncidenciaDocumentoFilterForm(forms.Form):

    numero = IntegerField(label="No. Documento")
    tipo = ChoiceField(widget=Select())
    fecha_mayorque = CharField()
    fecha_menorque = CharField()
    es_registrable = BooleanField()
    zona = ChoiceField(widget=Select())

    def __init__(self, *args, **kwargs):
        super(IncidenciaDocumentoFilterForm, self).__init__(
            *args, **kwargs)
        self.fields['tipo'].choices = self.get_Tipos()
        self.fields['zona'].choices = self.get_Zonas()

    def get_Tipos(self):

        valores = [('', '------')]

        tipos = IncidenciaTipo.objects.all()

        for tipo in tipos:
            valores.append(
                (
                    tipo.id,
                    tipo.descripcion
                )
            )

        return valores

    def get_Zonas(self):

        valor = [('', '------')]

        zonas = Zona.objects.all()

        for zona in zonas:
            valor.append(
                (
                    zona.id,
                    zona.descripcion
                )
            )

        return valor


class IncidenciaDocumentoForm(ModelForm):

    empleado_id = ChoiceField(
        label='Empleado: ',
        widget=Select(attrs={'class': 'form-control input-sm'})
    )

    def __init__(self, *args, **kwargs):
        super(IncidenciaDocumentoForm, self).__init__(
            *args, **kwargs)
        self.fields['empleado_id'].choices = self.get_EmpleadosEbs()
        # self.fields['zona'].choices = self.get_Zonas()

    def get_EmpleadosEbs(self):

        valores = [('', '-------')]

        empleados = VIEW_EMPLEADOS_SIMPLE.objects.using('ebs_d').all()

        for empleado in empleados:

            descripcion = "%s - %s" % (
                empleado.pers_empleado_numero,
                empleado.pers_nombre_completo
            )

            valores.append(
                (
                    empleado.pers_empleado_numero,
                    descripcion,
                )
            )

        return valores

    class Meta:
        model = IncidenciaDocumento

        fields = [
            'tipo',
            'es_registrable',
            'fecha',
            'empleado_id',
            'zona',
            # 'empleado_nombre',
            #'empleado_zona',
            # 'empleado_proyecto',
            # 'empleado_proyecto_desc',
            # 'empleado_puesto',
            # 'empleado_puesto_desc',
            # 'empleado_un',
            #'empleado_organizacion',
            'area_id',
            'area_descripcion',
            'lugar',
            'dias_incapcidad',
            'centro_atencion',
            'tiene_acr',
            # 'status'
        ]
        # 'created_by',
        # 'created_date',
        # 'updated_by',
        # 'updated_date' ]

        labels = {
            'tipo': 'Tipo',
            'es_registrable': 'Registrable',
            'fecha': 'Fecha',
            'empleado_id': 'Empleado id ',
            'zona': 'Zona',
            # 'empleado_nombre': 'Nombre',
            #'empleado_zona': 'Zona del Empleado',
            # 'empleado_proyecto': 'Proyecto id',
            # 'empleado_proyecto_desc': 'Proyecto',
            # 'empleado_puesto': 'Puesto_id',
            # 'empleado_puesto_desc': 'Puesto',
            # 'empleado_un': 'Unidad de Negocio',
            #'empleado_organizacion': 'Organizacion',
            'area': 'Area id',
            'area_descripcion': 'Area',
            'lugar': 'Lugar de Incidencia',
            'dias_incapcidad': 'Dias Incapacidad',
            'centro_atencion': 'Centro de Atencion',
            'tiene_acr': 'acr Analisis Raiz Causa',
            # 'status': 'Estado de la solicitud',
        }

        widgets = {
            'tipo': Select(attrs={'class': 'form-control input-sm'}),
            'es_registrable': CheckboxInput(),
            'fecha': TextInput(attrs={'class': 'form-control pull-right input-sm',
                                      'data-date-format': 'yyyy-mm-dd'}),
            'empleado_id': Select(attrs={'class': 'form-control input-sm'}),
            # 'empleado_nombre': TextInput(attrs={'class': 'form-control input-xs'}),
            'zona': Select(attrs={'class': 'form-control input-sm'}),
            # 'empleado_proyecto': TextInput(attrs={'class': 'form-control input-xs'}),
            # 'empleado_proyecto_desc': TextInput(attrs={'class': 'form-control input-xs'}),
            # 'empleado_puesto': TextInput(attrs={'class': 'form-control input-xs'}),
            # 'empleado_puesto_desc': TextInput(attrs={'class': 'form-control input-xs'}),
            # 'empleado_un': TextInput(attrs={'class': 'form-control input-xs'}),
            # 'empleado_organizacion': TextInput(attrs={'class': 'form-control input-xs'}),
            'area': TextInput(attrs={'class': 'form-control input-xs'}),
            'area_descripcion': TextInput(attrs={'class': 'form-control input-xs'}),
            'lugar': TextInput(attrs={'class': 'form-control input-xs'}),
            'dias_incapacidad': TextInput(attrs={'class': 'form-control input-xs'}),
            'centro_atencion': Select(attrs={'class': 'form-control input-sm'}),
            'tiene_acr': CheckboxInput(),
            # 'status': Select(attrs={'class': 'form-control input-sm'}),
            #'Archivo': FileInput(attrs={'class': 'dropzone dz-clickable dz-started'}),
        }
