# -*- coding: utf-8 -*-
# Django:
from django.forms import ModelForm
from django.forms import TextInput
# -*- coding: utf-8 -*-
from .models import Usuario


class UsuarioFormularioForm(ModelForm):
    class Meta:
        model = Usuario

        fields = ['primer_nombre',
                  'segundo_nombre',
                  'apellido_paterno',
                  'apellido_materno',
                  'genero',
                  'numero',
                  'tipo',
                  'puesto',
                  'organizacion',
                  'fecha_inicio_contratacion',
                  'fecha_fin_contratacion',
                  'compania',
                  'zona',
                  'centro_costos',
                  'nomina', ]

        labels = {'primer_nombre': 'Primer nombre',
                  'segundo_nombre': 'Segundo nombre',
                  'apellido_paterno': 'Apellido paterno',
                  'apellido_materno': 'Apellido materno',
                  'genero': 'Genero:',
                  'numero': 'Numero',
                  'tipo': 'Tipo',
                  'puesto': 'Puesto',
                  'organizacion': 'Organizacion',
                  'fecha_inicio_contratacion': 'Fecha de contración',
                  'fecha_fin_contratacion': 'Fecha de terminación del contrato',
                  'compania': 'Compañia',
                  'zona': 'Zona',
                  'centro_costos': 'Centro de costos',
                  'nomina': 'Nomina',

                  }

        widgets = {'primer_nombre': TextInput(attrs={'class': 'form-control input-xs'}),
                   'segundo_nombre': TextInput(attrs={'class': 'form-control input-xs'}),
                   'apellido_paterno': TextInput(attrs={'class': 'form-control input-xs'}),
                   'apellido_materno': TextInput(attrs={'class': 'form-control input-xs'}),
                   'genero': TextInput(attrs={'class': 'form-control input-xs'}),
                   'numero': TextInput(attrs={'class': 'form-control input-xs'}),
                   'tipo': TextInput(attrs={'class': 'form-control input-xs'}),
                   'puesto': TextInput(attrs={'class': 'form-control input-xs'}),
                   'organizacion': TextInput(attrs={'class': 'form-control input-xs'}),
                   'fecha_inicio_contratacion': TextInput(attrs={'class': 'form-control input-xs', 'data-date-format': 'yyyy-mm-dd'}),
                   'fecha_fin_contratacion': TextInput(attrs={'class': 'form-control input-xs', 'data-date-format': 'yyyy-mm-dd'}),
                   'compania': TextInput(attrs={'class': 'form-control input-xs'}),
                   'zona': TextInput(attrs={'class': 'form-control input-xs'}),
                   'centro_costos': TextInput(attrs={'class': 'form-control input-xs'}),
                   'nomina': TextInput(attrs={'class': 'form-control input-xs'}),
                   }
