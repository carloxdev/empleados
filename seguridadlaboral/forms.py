# -*- coding: utf-8 -*-

# Librerias Django:
from django.forms import ModelForm
from django.forms import TextInput
from django.forms import CheckboxInput
from django.forms import Textarea
from django.forms import Select
from django.forms import NumberInput
from django.forms import DateTimeInput
# from django.forms import Form
from django.forms import CharField
from django.forms import ChoiceField
from django.forms import IntegerField
from django.forms import BooleanField
from django.forms import FileInput
from django.forms import HiddenInput
from django.forms import RadioSelect

# Librerias Propias:
from .models import IncidenciaDocumento
from .models import IncidenciaTipo
from .models import IncidenciaArchivo
from .models import IncidenciaResolucion
from .models import ResolucionTipo
from .models import CentroAtencion

from ebs.models import VIEW_EMPLEADOS_SIMPLE
from administracion.models import Zona

from django import forms
from django.forms import Form


class IncidenciaDocumentoFilterForm(forms.Form):

    TIPOS = (
        ('1', 'Registrable'),
        ('0', 'No Registrable'),
    )
    # numero = IntegerField(label="No. Documento")
    # tipo = ChoiceField(widget=Select())
    # fecha_mayorque = CharField()
    # fecha_menorque = CharField()
    numero = IntegerField(
        label="No de Documento:",
        widget=NumberInput(
            attrs={'class': 'form-control input-xs', 'min': '1'})
    )
    tipo = ChoiceField(
        label="Categoria:",
        widget=Select(attrs={'class': 'select2 nova-select2'})
    )
    fecha_mayorque = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs', 'readonly': 'readonly'})
    )
    fecha_menorque = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs', 'readonly': 'readonly'})
    )
    # es_registrable = BooleanField(
    #     label="Registrable:"
    # )

    es_registrable = ChoiceField(
    label='Tipo',
    widget=RadioSelect, choices=TIPOS)

    zona = ChoiceField(
        label="Zona:",
        widget=Select(attrs={'class': 'select2 nova-select2'})
    )

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


# class IncidenciaDocumentoForm(Form):

#     empleado_id = ChoiceField(
#         label='Empleado: ',
#         widget=Select(attrs={'class': 'form-control input-sm','required':'required'}),
#         required=True
#     )

#     fecha = CharField(
#         label='Fecha',
#         widget=TextInput(
#             attrs={'name': 'fecha',
#                    'class': 'form-control input-xs', 'readonly': 'readonly'}
#         ),
#     )

#     tipo = ChoiceField(widget=Select())

#     es_registrable = BooleanField(
#         label="Registrable:",
#         required=False
#     )

    
#     zona = ChoiceField(
#         label="Zona:",
#         widget=Select(attrs={'required':'required'})
#     )

#     lugar = CharField(
#         label="Lugar:",
#         widget=TextInput(attrs={'class': 'form-control input-xs'})
#     )

#     dias_incapcidad = IntegerField(
#         label="Dias de Incapacidad",
#         required=False,
#         widget=NumberInput(attrs={'class': 'form-control input-xs', 'min': '0'})
#     )

#     centro_atencion = ChoiceField(
#         label="Centro de Atencion:",
#         widget=Select()
#     )

#     tiene_acr = BooleanField(
#         label="Tiene Acr:",
#         required=False
#     )


#     def __init__(self, *args, **kwargs):
#         super(IncidenciaDocumentoForm, self).__init__(
#             *args, **kwargs)
#         self.fields['empleado_id'].choices = self.get_EmpleadosEbs()
#         self.fields['tipo'].choices = self.get_Tipos()
#         self.fields['zona'].choices = self.get_Zonas()
#         self.fields['centro_atencion'].choices = self.get_CentroAtencion()

#     def get_EmpleadosEbs(self):

#         valores = [('', '-------')]

#         empleados = VIEW_EMPLEADOS_SIMPLE.objects.using('ebs_p').all()

#         for empleado in empleados:

#             descripcion = "%s - %s" % (
#                 empleado.pers_empleado_numero,
#                 empleado.pers_nombre_completo
#             )

#             valores.append(
#                 (
#                     empleado.pers_empleado_numero,
#                     descripcion,
#                 )
#             )

#         return valores

#     def get_Tipos(self):

#         valores = [('', '------')]

#         tipos = IncidenciaTipo.objects.all()

#         for tipo in tipos:
#             valores.append(
#                 (
#                     tipo.id,
#                     tipo.descripcion
#                 )
#             )

#         return valores

#     def get_Zonas(self):

#         valor = [('', '------')]

#         zonas = Zona.objects.all()

#         for zona in zonas:
#             valor.append(
#                 (
#                     zona.id,
#                     zona.descripcion
#                 )
#             )

#         return valor 

#     def get_CentroAtencion(self):

#         valor = [('', '------')]

#         centros = CentroAtencion.objects.all()

#         for centro in centros:
#             valor.append(
#                 (
#                     centro.id,
#                     centro.descripcion
#                 )
#             )

#         return valor        

#     # class Meta:
#     #     model = IncidenciaDocumento

#     #     fields = [
#     #         #'tipo',
#     #         'es_registrable',
#     #         #'fecha',
#     #         'empleado_id',
#     #         'zona',
#     #         # 'empleado_nombre',
#     #         #'empleado_zona',
#     #         # 'empleado_proyecto',
#     #         # 'empleado_proyecto_desc',
#     #         # 'empleado_puesto',
#     #         # 'empleado_puesto_desc',
#     #         # 'empleado_un',
#     #         #'empleado_organizacion',
#     #         #'area_id',
#     #         #'area_descripcion',
#     #         'lugar',
#     #         'dias_incapcidad',
#     #         'centro_atencion',
#     #         'tiene_acr',
#     #         # 'status'
#     #     ]
#         # 'created_by',
#         # 'created_date',
#         # 'updated_by',
#         # 'updated_date' ]

#         # labels = {
#         #     #'tipo': 'Tipo:',
#         #     'es_registrable': 'Registrable:',
#         #     #'fecha': 'Fecha:',
#         #     'empleado_id': 'Empleado:',
#         #     'zona': 'Zona:',
#         #     # 'empleado_nombre': 'Nombre',
#         #     #'empleado_zona': 'Zona del Empleado',
#         #     # 'empleado_proyecto': 'Proyecto id',
#         #     # 'empleado_proyecto_desc': 'Proyecto',
#         #     # 'empleado_puesto': 'Puesto_id',
#         #     # 'empleado_puesto_desc': 'Puesto',
#         #     # 'empleado_un': 'Unidad de Negocio',
#         #     #'empleado_organizacion': 'Organizacion',
#         #     #'area': 'Area id',
#         #     #'area_descripcion': 'Area',
#         #     'lugar': 'Lugar de Incidencia:',
#         #     'dias_incapcidad': 'Dias Incapacidad:',
#         #     'centro_atencion': 'Centro de Atención:',
#         #     'tiene_acr': 'Analisis Raiz Causa:',
#         #     # 'status': 'Estado de la solicitud',
#         # }

#         # widgets = {
#         #     #'tipo': Select(attrs={'class': 'select2 nova-select2'}),
#         #     'es_registrable': CheckboxInput(),
#         #     #'fecha': DateTimeInput(format=('%d/%m/%Y %H:%M:%S.%f'), attrs={'class': 'form-control input-xs'}),
#         #     #'fecha': TextInput(attrs={'class': 'form-control input-xs', 'readonly': 'readonly'}),
#         #     'empleado_id': Select(attrs={'class': 'select2 nova-select2'}),
#         #     # 'empleado_nombre': TextInput(attrs={'class': 'form-control input-xs'}),
#         #     'zona': Select(attrs={'class': 'select2 nova-select2'}),
#         #     # 'empleado_proyecto': TextInput(attrs={'class': 'form-control input-xs'}),
#         #     # 'empleado_proyecto_desc': TextInput(attrs={'class': 'form-control input-xs'}),
#         #     # 'empleado_puesto': TextInput(attrs={'class': 'form-control input-xs'}),
#         #     # 'empleado_puesto_desc': TextInput(attrs={'class': 'form-control input-xs'}),
#         #     # 'empleado_un': TextInput(attrs={'class': 'form-control input-xs'}),
#         #     # 'empleado_organizacion': TextInput(attrs={'class': 'form-control input-xs'}),
#         #     #'area': TextInput(attrs={'class': 'form-control input-xs'}),
#         #     #'area_descripcion': TextInput(attrs={'class': 'form-control input-xs'}),
#         #     'lugar': TextInput(attrs={'class': 'form-control input-xs'}),
#         #     'dias_incapcidad': NumberInput(attrs={'class': 'form-control input-xs', 'min': '0'}),
#         #     'centro_atencion': Select(attrs={'class': 'select2 nova-select2'}),
#         #     'tiene_acr': CheckboxInput(),
#         #     # 'status': Select(attrs={'class': 'form-control input-sm'}),
#         #     #'Archivo': FileInput(attrs={'class': 'dropzone dz-clickable dz-started'}),
#         # }
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

        empleados = VIEW_EMPLEADOS_SIMPLE.objects.using('ebs_p').all()

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
            #'area_id',
            #'area_descripcion',
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
            'tipo': 'Tipo:',
            'es_registrable': 'Registrable:',
            'fecha': 'Fecha:',
            'empleado_id': 'Empleado:',
            'zona': 'Zona:',
            # 'empleado_nombre': 'Nombre',
            #'empleado_zona': 'Zona del Empleado',
            # 'empleado_proyecto': 'Proyecto id',
            # 'empleado_proyecto_desc': 'Proyecto',
            # 'empleado_puesto': 'Puesto_id',
            # 'empleado_puesto_desc': 'Puesto',
            # 'empleado_un': 'Unidad de Negocio',
            #'empleado_organizacion': 'Organizacion',
            #'area': 'Area id',
            #'area_descripcion': 'Area',
            'lugar': 'Lugar de Incidencia:',
            'dias_incapcidad': 'Dias Incapacidad:',
            'centro_atencion': 'Centro de Atención:',
            'tiene_acr': 'Analisis Raiz Causa:',
            # 'status': 'Estado de la solicitud',
        }

        widgets = {
            'tipo': Select(attrs={'class': 'select2 nova-select2'}),
            'es_registrable': CheckboxInput(),
            'fecha': TextInput(attrs={'class': 'form-control input-xs', 'readonly': 'readonly'}),
            'empleado_id': Select(attrs={'class': 'select2 nova-select2'}),
            # 'empleado_nombre': TextInput(attrs={'class': 'form-control input-xs'}),
            'zona': Select(attrs={'class': 'select2 nova-select2'}),
            # 'empleado_proyecto': TextInput(attrs={'class': 'form-control input-xs'}),
            # 'empleado_proyecto_desc': TextInput(attrs={'class': 'form-control input-xs'}),
            # 'empleado_puesto': TextInput(attrs={'class': 'form-control input-xs'}),
            # 'empleado_puesto_desc': TextInput(attrs={'class': 'form-control input-xs'}),
            # 'empleado_un': TextInput(attrs={'class': 'form-control input-xs'}),
            # 'empleado_organizacion': TextInput(attrs={'class': 'form-control input-xs'}),
            #'area': TextInput(attrs={'class': 'form-control input-xs'}),
            #'area_descripcion': TextInput(attrs={'class': 'form-control input-xs'}),
            'lugar': TextInput(attrs={'class': 'form-control input-xs'}),
            'dias_incapcidad': NumberInput(attrs={'class': 'form-control input-xs', 'min': '0'}),
            'centro_atencion': Select(attrs={'class': 'select2 nova-select2'}),
            'tiene_acr': CheckboxInput(),
            # 'status': Select(attrs={'class': 'form-control input-sm'}),
            #'Archivo': FileInput(attrs={'class': 'dropzone dz-clickable dz-started'}),
        }



class IncidenciaArchivoForm(ModelForm):

    class Meta:
        model = IncidenciaArchivo
        fields = [
            'incidencia',
            'tipo',
            'archivo'
        ]
        labels = {
            'tipo': 'Status',
        }
        widgets = {
            'incidencia': HiddenInput(),
            'archivo': FileInput(attrs={'class': 'dropzone dz-clickable dz-started'}),
        }

class IncidenciaResolucionForm(Form):

    # incidencia = HiddenInput()
    incidencia = CharField(
        widget=HiddenInput()
    )

    mensaje = CharField(
        widget=Textarea(attrs={'class': 'form-control input-xs'})
    )

    tipo = ChoiceField(widget=Select())
    estatus = ChoiceField(widget=Select())


    def __init__(self, *args, **kwargs):
        super(IncidenciaResolucionForm, self).__init__(
            *args, **kwargs)
        self.fields['tipo'].choices = self.get_Tipos()
        self.fields['estatus'].choices = self.get_Estatus()


    def get_Tipos(self):

        valores = [('', '------')]

        tipos = ResolucionTipo.objects.all()

        for tipo in tipos:
            valores.append(
                (
                    tipo.id,
                    tipo.descripcion
                )
            )

        return valores

    def get_Estatus(self):

        valores = [('', '------'),('abi', 'Abierto'), ('cer', 'Cerrado'),('pro', 'Proceso'),('can', 'Cancelado')]

        return valores



    # estatus = ChoiceField(
    #     widget=Select(
    #         attrs={'class': 'form-control input-sm'}
    #     )
    # )



    # def __init__(self, *args, **kwargs):
    #     super(IncidenciaResolucionForm, self).__init__(
    #         *args, **kwargs)
    #     self.fields['estatus'].choices = self.get_estatus()


    # def get_estatus(self):

    #     valores = [('', '-------')]

    #     estados = IncidenciaDocumento.objects.all()

    #     for estatus in estados:

    #         descripcion = "%s - %s" % (
    #             estatus.status,
    #             estatus.status
    #         )

    #         valores.append(
    #             (
    #                 estatus.status
    #             )
    #         )

    #     return valores
