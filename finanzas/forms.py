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
from jde.models import VIEW_POLITICA_VIATICOS
from jde.models import VIEW_FLUJO_EGRESOS

from jde.business import CentroCostoBusiness
from ebs.business import EmpleadoBusiness

from home.forms_fields import SelectCustom


class ViaticoFilterForm(Form):
    VIATICO_ESTADOS = (
        ('', '------'),
        ('cap', 'En edicion'),
        ('sau', 'Sin autorizar'),
        ('aut', 'Autorizado'),
        ('rec', 'Rechazado'),
        ('fin', 'Finalizado'),
        ('can', 'Cancelado'),
    )

    empleado_clave = ChoiceField(
        widget=SelectCustom(attrs={'class': 'select2 form-control input-xs'})
    )

    un_clave = ChoiceField(
        label="Unidad de Negocio",
        widget=SelectCustom(attrs={'class': 'select2 form-control input-xs'})
    )

    autorizador_clave = ChoiceField(
        label="Autorizador",
        widget=SelectCustom(attrs={'class': 'select2 form-control input-xs'})
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
        widget=TextInput(
            attrs={'class': 'form-control input-xs', 'readonly': 'readonly'})
    )

    created_date_menorque = CharField(
        widget=TextInput(
            attrs={'class': 'form-control input-xs', 'readonly': 'readonly'})
    )

    status = ChoiceField(
        label="Estado",
        widget=Select(attrs={'class': 'select2 form-control input-xs'}),
        choices=VIATICO_ESTADOS
    )

    def __init__(self, *args, **kwargs):
        super(ViaticoFilterForm, self).__init__(*args, **kwargs)
        self.fields['empleado_clave'].required = False
        self.fields['un_clave'].required = False
        self.fields['autorizador_clave'].required = False

        self.fields[
            'empleado_clave'].choices = EmpleadoBusiness.get_Todos_ForSelectCustom()
        self.fields[
            'un_clave'].choices = CentroCostoBusiness.get_Todos_ForSelectCustom()
        self.fields[
            'autorizador_clave'].choices = EmpleadoBusiness.get_Todos_ForSelectCustom()


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
        self.fields[
            'empleado_clave'].choices = EmpleadoBusiness.get_Activos_ForSelect()
        self.fields[
            'un_clave'].choices = CentroCostoBusiness.get_Activos_ForSelect()

    def clean_fecha_regreso(self):
        f_partida = self.cleaned_data['fecha_partida']
        f_regreso = self.cleaned_data['fecha_regreso']

        if f_partida > f_regreso:
            raise ValidationError(
                "La fecha de regreso no puede ser menor a la fecha partida")

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


class ViaticoLineaForm(Form):

    concepto = ChoiceField(
        widget=SelectCustom(
            attrs={'class': 'select2 input-xs', 'maxlength': '60'})
    )
    observaciones = ChoiceField(
        widget=Textarea(attrs={'class': 'form-control input-xs',
                               'rows': '10', 'required': 'required', 'cols': '40'})
    )

    importe = ChoiceField(
        widget=NumberInput(attrs={'class': 'form-control input-xs',
                                  'value': '0.0', 'step': '0.01', 'required': 'required', })
    )

    def __init__(self, id_empleado, *args, **kargs):
        super(ViaticoLineaForm, self).__init__(*args, **kargs)
        self.fields['concepto'].choices = self.get_Conceptos(id_empleado)

    def get_Conceptos(self, id_empleado):

        valores = [('', '-------', '', ''), ]

        conceptos = VIEW_POLITICA_VIATICOS.objects.using(
            'jde_p').filter(idempleado=id_empleado)

        for concepto in conceptos:

            valores.append(
                (
                    concepto.concepto,
                    concepto.desconcepto,
                    concepto.limite,
                    concepto.desconcepto
                )
            )

        return valores


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
        self.fields[
            'empleado'].choices = EmpleadoBusiness.get_Todos_ForSelectCustom()
        self.fields[
            'unidad_negocio'].choices = CentroCostoBusiness.get_Todos_ForSelectCustom()
        self.fields[
            'autorizador'].choices = EmpleadoBusiness.get_Todos_ForSelectCustom()


class FLujoFilterForm(Form):
    ANIOS = (
        ('17', '2017'),
        ('16', '2016'),
        ('15', '2015'),
        ('14', '2014'),
        ('13', '2013'),
    )

    anio = ChoiceField(
        label="Año",
        choices=ANIOS,
        widget=Select(attrs={'class': 'form-control input-xs'})
    )

    proyecto = ChoiceField(
        label="Proyecto",
        widget=Select(attrs={'class': 'form-control input-xs'})
    )

    centro_costos = ChoiceField(
        label="Centro de costos",
        widget=Select(attrs={'class': 'form-control input-xs'})
    )

    def __init__(self, *args, **kwargs):
        super(FLujoFilterForm, self).__init__(*args, **kwargs)
        self.fields[
            'proyecto'].choices = self.get_Proyecto()
        self.fields[
            'centro_costos'].choices = self.get_CC()

    def get_Proyecto(self):
        valores = [('', '------')]

        proyectos = VIEW_FLUJO_EGRESOS.objects.using('jde_p').filter(tipo_un='PROYECTO').order_by(
            'descripcion_un').values_list('descripcion_un', flat=True).distinct()
        for proyecto in proyectos:
            valores.append((proyecto,
                            proyecto)
                           )

        return valores

    def get_CC(self):
        valores = [('', '------')]

        proyectos = VIEW_FLUJO_EGRESOS.objects.using('jde_p').filter(tipo_un='CC').order_by(
            'descripcion_un').values_list('descripcion_un', flat=True).distinct()                          
        for proyecto in proyectos:
            valores.append((proyecto,
                            proyecto)
                           )

        return valores
