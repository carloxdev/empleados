# -*- coding: utf-8 -*-
# Django:
from django.forms import ModelForm
from django.forms import TextInput
from django.forms import Textarea
from django.forms import Select
from django.forms import Form
from django.forms import CharField

from .models import IncidenciaDocumento


class IncidenciaDocumentoForm(ModelForm):

    class Meta:
        model = IncidenciaDocumento

        fields = ['tipo',
                  'registrable',
                  #'empleado_id',
                  'empleado_nombre',
                  'empleado_zona',
                  'empleado_proyecto_desc',
                  #'empleado_puesto',
                  'empleado_puesto_desc',
                  'empleado_un',
                  'empleado_organizacion',
                  #'area_id',
                  'area_descripcion',
                  'lugar',
                  'dias_incapcidad',
                  'centro_atencion',
                  'acr',
                  'status']
                  # 'created_by',
                  # 'created_date',
                  # 'updated_by',
                  # 'updated_date' ]

        labels = {'tipo': 'Tipo',
                  'registrable': 'Registrable',
                  'empleado_nombre': 'Nombre',
                  'empleado_zona': 'Zona del Empleado',
                  'empleado_proyecto_desc': 'Proyecto',
                  'empleado_puesto_desc': 'Puesto',
                  'empleado_un': 'Unidad de Negocio',
                  'empleado_organizacion': 'Organizacion',
                  'area_descripcion': 'Area',
                  'lugar': 'Lugar de Incidencia',
                  'dias_incapcidad': 'Dias Incapacidad',
                  'centro_atencion': 'Centro de Atencion',
                  'acr': 'acr Analisis Raiz Causa',
                  'status': 'Estado de la solicitud',
                  }

        widgets = {'tipo': TextInput(attrs={'class': 'form-control input-xs'}),
                   'registrable': TextInput(attrs={'class': 'form-control input-xs'}),
                   'empleado_nombre': TextInput(attrs={'class': 'form-control input-xs'}),
                   'empleado_zona': TextInput(attrs={'class': 'form-control input-xs'}),
                   'empleado_proyecto_desc': TextInput(attrs={'class': 'form-control input-xs'}),
                   'empleado_puesto_desc': TextInput(attrs={'class': 'form-control input-xs'}),
                   'empleado_un': TextInput(attrs={'class': 'form-control input-xs'}),
                   'empleado_organizacion': TextInput(attrs={'class': 'form-control input-xs'}),
                   'area_descripcion': TextInput(attrs={'class': 'form-control input-xs'}),
                   'lugar': TextInput(attrs={'class': 'form-control input-xs'}),
                   'dias_incapacidad': TextInput(attrs={'class': 'form-control input-xs'}),
                   'centro_atencion': TextInput(attrs={'class': 'form-control input-xs'}),
                   'acr': TextInput(attrs={'class': 'form-control input-xs'}),
                   'status': TextInput(attrs={'class': 'form-control input-xs'}),
                   }