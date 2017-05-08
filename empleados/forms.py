# -*- coding: utf-8 -*-
# Django:
from django.forms import TextInput
from django.forms import Select
from django.forms import Form

from django.forms import CharField
from django.forms import IntegerField
from django.forms import NumberInput
from django.forms import ChoiceField
from django.forms import RadioSelect

# Modelos


class EmpleadosFilterForm(Form):
    GENERO = (
        ('F', 'Femenino'),
        ('M', 'Masculino'),
    )
    TIPO = (
        ('', '-------'),
        ('MHP', 'MHP'),
    )
    PUESTO = (
        ('', '-------'),
        ('A', 'Analista de medio ambiente'),
    )
    ORGANIZACION = (
        ('', '-------'),
        ('CV', 'Coordinacion Villahermosa'),
    )
    CENTRO_DE_COSTOS = (
        ('', '-------'),
        ('F201113', 'F201113'),
    )
    NOMINA = (
        ('ADMINISTRATIVA', 'Administrativa'),
        ('OPERATIVA', 'Operativa'),
    )

    pers_primer_nombre = CharField(widget=TextInput(attrs={'class': 'form-control input-xs'}))
    pers_segundo_nombre = CharField(widget=TextInput(attrs={'class': 'form-control input-xs'}))
    pers_apellido_paterno = CharField(widget=TextInput(attrs={'class': 'form-control input-xs'}))
    pers_apellido_materno = CharField(widget=TextInput(attrs={'class': 'form-control input-xs'}))
    pers_genero_clave = ChoiceField(widget=RadioSelect, choices=GENERO)
    pers_empleado_numero = IntegerField(widget=NumberInput(attrs={'class': 'form-control input-xs', 'min': '1'}))
    pers_tipo_codigo = ChoiceField(widget=Select(attrs={'class': 'select2 nova-select2'}), choices=TIPO)
    asig_puesto_clave = ChoiceField(widget=Select(attrs={'class': 'select2 nova-select2'}), choices=PUESTO)
    asig_organizacion_clave = ChoiceField(widget=Select(attrs={'class': 'select2 nova-select2'}), choices=ORGANIZACION)
    grup_compania_jde = CharField(widget=TextInput(attrs={'class': 'form-control input-xs'}))
    zona = CharField(widget=TextInput(attrs={'class': 'form-control input-xs'}))  # PREGUNTAR POR EL CAMPO
    metodo_sucursal = ChoiceField(widget=Select(attrs={'class': 'select2 nova-select2'}), choices=CENTRO_DE_COSTOS)
    grup_nomina_jde = ChoiceField(widget=RadioSelect, choices=NOMINA)

    # def __init__(self, *args, **kwargs):
    #     super(EmpleadosFilterForm, self).__init__(
    #         *args, **kwargs)
    #     self.fields['asig_puesto_clave'].choices = self.get_datos()
    #     self.fields['asig_organizacion_clave'].choices = self.get_datos()
    #     self.fields['grup_compania_jde'].choices = self.get_datos()

    # def get_datos(self):

#        valores = [('', '-------')]

#        companias = 'VIEW_COMPANIAS.objects.using().all()'
#
#       for compania in companias:

        # valores.append(
        #     (
        #         compania.comp_code,
        #         #str(int(compania.comp_code)) + ' - ' + compania.comp_desc,
        #     )
        # )
 #       return valores
