# -*- coding: utf-8 -*-

# Librerias/Clases Django

from django.forms import ModelForm
from django.forms import TextInput
from django.forms import Textarea
from django.forms import Select
from django.forms import Form
from django.forms import CharField
from django.forms import ChoiceField
from django.forms import HiddenInput


from bootstrap3_datetime.widgets import DateTimePicker


from django.conf import settings
from django.contrib.auth.models import User


# Librerias/Clases propias

# Modelos:
from .models import ViaticoCabecera

# Librerias:
from .forms_fields import SelectWithDescriptions

# Otros Modelos:
from ebs.models import VIEW_EMPLEADOS_SIMPLE
from jde.models import VIEW_UNIDADES
from jde.models import VIEW_CENTROSCOSTO


class ViaticoFilterForm(Form):

    empleado = ChoiceField(
        widget=Select(attrs={'class': 'select2'})
    )

    unidad_negocio = ChoiceField(
        widget=Select(attrs={'class': 'select2'})
    )

    ciudad_destino = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )

    autorizador = ChoiceField(
        widget=Select(attrs={'class': 'select2'})
    )

    def __init__(self, *args, **kwargs):
        super(ViaticoFilterForm, self).__init__(*args, **kwargs)
        self.fields['empleado'].choices = self.get_Empleados()
        self.fields['unidad_negocio'].choices = self.get_UnidadesNegocio()
        self.fields['autorizador'].choices = self.get_Usuarios()

    def get_Empleados(self):

        valores = [('', '------')]

        if settings.DEBUG:
            empleados = VIEW_EMPLEADOS_SIMPLE.objects.using('ebs_d').exclude(
                pers_empleado_numero__isnull=True
            ).order_by('pers_nombre_completo')
        else:
            empleados = VIEW_EMPLEADOS_SIMPLE.objects.using('ebs_p').exclude(
                pers_empleado_numero__isnull=True
            ).order_by('pers_nombre_completo')

        for empleado in empleados:

            descripcion = "%s - %s" % (
                empleado.pers_empleado_numero,
                empleado.pers_nombre_completo
            )
            valores.append(
                (
                    empleado.pers_empleado_numero,
                    descripcion
                )
            )

        return valores

    def get_UnidadesNegocio(self):

        valores = [('', '------')]

        if settings.DEBUG:
            unidades = VIEW_UNIDADES.objects.using('jde_p').exclude(estructura="HST").order_by('clave')
        else:
            unidades = VIEW_UNIDADES.objects.using('jde_p').exclude(estructura="HST").order_by('clave')

        for unidad in unidades:

            descripcion = "%s - %s" % (
                unidad.clave,
                unidad.desc_corta
            )

            valores.append(
                (
                    unidad.clave,
                    descripcion
                )
            )

        return valores

    def get_Usuarios(self):

        valores = [('', '------')]

        usuarios = User.objects.all().order_by('username')

        for usuario in usuarios:
            valores.append(
                (
                    usuario.username,
                    usuario.get_full_name()
                )
            )

        return valores


class ViaticoCabeceraNuevoForm(ModelForm):

    empleado_clave = ChoiceField(
        label="Empleado",
        widget=SelectWithDescriptions(
            attrs={'class': 'form-control input-xs'}
        )
    )

    unidad_negocio_clave = ChoiceField(
        label="Unidad Negocio",
        widget=SelectWithDescriptions(
            attrs={'class': 'form-control input-xs'}
        )
    )

    class Meta:
        model = ViaticoCabecera

        fields = [
            'empleado_clave',
            'empleado_descripcion',
            'unidad_negocio_clave',
            'unidad_negocio_descripcion',
            'fecha_partida',
            'fecha_regreso',
            'proposito_viaje',
            'ciudad_destino',
        ]

        widgets = {
            'fecha_partida': DateTimePicker(
                options={
                    "format": "YYYY-MM-DD HH:mm",
                    "pickSeconds": False,
                }
            ),
            'empleado_descripcion': HiddenInput(),
            'unidad_negocio_descripcion': HiddenInput(),
            'proposito_viaje': Textarea(attrs={'class': 'form-control'}),
            # 'fecha_partida': TextInput(attrs={'class': 'form-control input-xs'}),
            'fecha_regreso': TextInput(attrs={'class': 'form-control input-xs'}),
            'ciudad_destino': TextInput(attrs={'class': 'form-control input-xs'}),
        }

    def __init__(self, *args, **kwargs):
        super(ViaticoCabeceraNuevoForm, self).__init__(*args, **kwargs)
        self.fields['empleado_clave'].choices = self.get_EmpleadosEbs()
        self.fields['unidad_negocio_clave'].choices = self.get_CentrosCostoJde()

    def get_EmpleadosEbs(self):
        valores = [('', '-------'), ]

        empleados = VIEW_EMPLEADOS_SIMPLE.objects.using('ebs_d').filter(
            pers_tipo_codigo__in=['1121', '1120']
        ).exclude(
            pers_empleado_numero__isnull=True
        ).order_by('pers_nombre_completo')

        for empleado in empleados:

            descripcion = "%s : %s" % (
                empleado.pers_empleado_numero,
                empleado.pers_nombre_completo
            )

            valores.append(
                (
                    empleado.pers_empleado_numero,
                    descripcion
                )
            )
        return valores

    def get_CentrosCostoJde(self):

        valores = [('', '------')]

        if settings.DEBUG:
            centros = VIEW_CENTROSCOSTO.objects.using('jde_p').exclude(
                estructura="HST"
            ).exclude(
                estado="N"
            ).order_by(
                'clave'
            )
        else:
            centros = VIEW_CENTROSCOSTO.objects.using('jde_p').exclude(
                estructura="HST"
            ).exclude(
                estado="N"
            ).order_by(
                'clave'
            )

        for centro in centros:

            descripcion = "%s : %s" % (
                centro.clave,
                centro.descripcion
            )

            valores.append(
                (
                    centro.clave,
                    descripcion
                )
            )

        return valores


class ViaticoLineaForm(Form):

    concepto = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )
    observaciones = CharField(
        widget=Textarea(attrs={'class': 'form-control input-xs'})
    )
    importe = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )
