# Django:
from django.forms import ModelForm

from .models import ViaticoCabecera

from django import forms

from jde.models import F0101
from jde.models import VIEW_UNIDADES


class ViaticoCabeceraFormEdit(ModelForm):

    class Meta:
        model = ViaticoCabecera
        fields = '__all__'


class ViaticoCabeceraForm(forms.Form):

    descripcion = forms.CharField(max_length=140)
    empleado = forms.ChoiceField(
        # widget=forms.Select()
    )
    autorizador = forms.CharField(max_length=140)
    fecha_partida = forms.DateField()
    empresa = forms.CharField(max_length=140)
    un = forms.ChoiceField()
    ciudad_destino = forms.CharField(max_length=140)
    status = forms.ChoiceField()
    vehiculo_requerido = forms.ChoiceField()
    vehiculo_numero = forms.CharField(max_length=140, required=False)
    proposito = forms.CharField(widget=forms.Textarea())

    def __init__(self, *args, **kwargs):
        super(ViaticoCabeceraForm, self).__init__(*args, **kwargs)
        self.fields['empleado'].choices = self.get_Empleados()
        self.fields['status'].choices = ViaticoCabecera.VIATICO_ESTADOS
        self.fields['vehiculo_requerido'].choices = self.get_VehiculoOpciones()
        self.fields['un'].choices = self.get_Unidades()

    def get_VehiculoOpciones(self):

        opciones = [('', 'Selecciona'), ]

        for opt in ViaticoCabecera.VEHICULO_OPCIONES:
            opciones.append(
                opt
            )

        return opciones

    def get_Empleados(self):
        empleados = [('', 'Todas'), ]
        registros = F0101.objects.using('jde_d').filter(
            tipo='E  ').order_by('clave')

        for registro in registros:
            nombre = registro.nombre.encode('utf-8')
            descripcion = "({}) {}".format(registro.clave, nombre)

            empleados.append(
                (registro.clave, descripcion)
            )
        return empleados

    def get_Unidades(self):
        unidades = [('', 'Todas'), ]
        registros = VIEW_UNIDADES.objects.using('jde_p').filter(
            tipo__in=['F1', 'F2', 'DP', 'DR', 'ST', 'PA', 'GE'],
        ).exclude(reclass='HST').order_by("clave")

        for registro in registros:
            descripcion = registro.desc_larga.encode('utf-8')
            unidades.append(
                (registro.clave, descripcion)
            )

        return unidades
