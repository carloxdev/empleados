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
from django.forms import ModelForm
from django.forms import CheckboxInput

# Librerias Propias:
from django import forms
from django.forms import Form

# Modelos
from jde.models import VIEW_UNIDADES
from ebs.models import VIEW_TIPO_PERSONAS
from ebs.models import VIEW_PUESTOS
from ebs.models import VIEW_ORGANIZACIONES
from administracion.models import Empresa
from capitalhumano.models import PerfilPuestoDocumento
from ebs.models import VIEW_EMPLEADOS_FULL


class OrganizacionesFilterForm(Form):
    organizaciones = ChoiceField(label='Organizaciones', widget=Select(
        attrs={'class': 'select2 nova-select2'}))

    def __init__(self, *args, **kwargs):
        super(OrganizacionesFilterForm, self).__init__(*args, **kwargs)
        self.fields['organizaciones'].choices = self.get_Organizaciones()

    def get_Organizaciones(self):
        valores = [('0', 'TODAS LAS ORGANIZACIONES')]

        organizaciones = VIEW_ORGANIZACIONES.objects.using('ebs_d').all()
        for organizacion in organizaciones:

            valores.append(
                (
                    organizacion.clave_org,
                    str(int(organizacion.clave_org)) +
                    ' : ' + organizacion.desc_org
                )
            )
        return valores


class EmpresasFilterForm(Form):
    empresas = ChoiceField(label='Empresas', widget=Select(
        attrs={'class': 'select2 nova-select2'}))

    def __init__(self, *args, **kwargs):
        super(EmpresasFilterForm, self).__init__(*args, **kwargs)
        self.fields['empresas'].choices = self.get_Empresas()

    def get_Empresas(self):
        valores = [('0', 'TODAS LAS EMPRESAS')]

        empresas = Empresa.objects.all()
        for empresa in empresas:

            valores.append(
                (
                    empresa.descripcion_ebs,
                    str(int(empresa.clave)) + ' : ' + empresa.descripcion,
                )
            )
        return valores


class EmpleadoFilterForm(Form):
    GENERO = (
        ('F', 'Femenino'),
        ('M', 'Masculino'),
    )
    NOMINA = (
        ('ADMINISTRATIVA', 'Administrativa'),
        ('OPERATIVA', 'Operativa'),
    )

    pers_primer_nombre = CharField(widget=TextInput(
        attrs={'class': 'form-control input-xs'}))
    pers_segundo_nombre = CharField(widget=TextInput(
        attrs={'class': 'form-control input-xs'}))
    pers_apellido_paterno = CharField(widget=TextInput(
        attrs={'class': 'form-control input-xs'}))
    pers_apellido_materno = CharField(widget=TextInput(
        attrs={'class': 'form-control input-xs'}))
    pers_genero_clave = ChoiceField(widget=RadioSelect, choices=GENERO)
    pers_empleado_numero = IntegerField(widget=NumberInput(
        attrs={'class': 'form-control input-xs', 'min': '1'}))
    pers_tipo_codigo = ChoiceField(widget=Select(
        attrs={'class': 'select2 nova-select2'}))
    asig_puesto_clave = ChoiceField(widget=Select(
        attrs={'class': 'select2 nova-select2'}))
    asig_organizacion_clave = ChoiceField(
        widget=Select(attrs={'class': 'select2 nova-select2'}))
    grup_compania_jde = ChoiceField(widget=Select(
        attrs={'class': 'select2 nova-select2'}))
    # zona = CharField(widget=TextInput(attrs={'class': 'form-control input-xs'}))
    grup_fase_jde = ChoiceField(widget=Select(
        attrs={'class': 'select2 nova-select2'}))
    grup_nomina_jde = ChoiceField(widget=RadioSelect, choices=NOMINA)

    def __init__(self, *args, **kwargs):
        super(EmpleadoFilterForm, self).__init__(
            *args, **kwargs)
        self.fields['pers_tipo_codigo'].choices = self.get_Tipos()
        self.fields['asig_puesto_clave'].choices = self.get_Puestos()
        self.fields['asig_organizacion_clave'].choices = self.get_Organizacion()
        self.fields['grup_compania_jde'].choices = self.get_Compania()
        self.fields['grup_fase_jde'].choices = self.get_Sucursal()

    def get_Tipos(self):

        valores = [('', '-------')]

        tipos = VIEW_TIPO_PERSONAS.objects.using('ebs_d').all()

        for tipo in tipos:

            valores.append(
                (
                    tipo.clave_tipo,
                    str(int(tipo.clave_tipo)) + ' - ' + tipo.desc_tipo,
                )
            )
        return valores

    def get_Puestos(self):

        valores = [('', '-------')]

        puestos = VIEW_PUESTOS.objects.using('ebs_d').all()

        for puesto in puestos:

            valores.append(
                (
                    puesto.clave_puesto,
                    str(int(puesto.clave_puesto)) + ' - ' + puesto.desc_puesto,
                )
            )
        return valores

    def get_Organizacion(self):

        valores = [('', '-------')]

        organizaciones = VIEW_ORGANIZACIONES.objects.using('ebs_d').all()

        for organizacion in organizaciones:

            valores.append(
                (
                    organizacion.clave_org,
                    str(int(organizacion.clave_org)) +
                    ' - ' + organizacion.desc_org,
                )
            )
        return valores

    def get_Compania(self):

        valores = [('', '-------')]

        companias = Empresa.objects.all()

        for compania in companias:
            print(compania.clave)
            valores.append(
                (
                    compania.descripcion_jde,
                    str(int(compania.clave)) + ' - ' + compania.descripcion,
                )
            )
        return valores

    def get_Sucursal(self):

        valores = [('', '-------')]

        unidades = VIEW_UNIDADES.objects.using('jde_p').all()

        for unidad in unidades:

            valores.append(
                (
                    unidad.clave,
                    '(' + unidad.clave + ')' + ' ' + unidad.desc_corta,
                )
            )
        return valores



class PerfilPuestoDocumentoForm(Form):

    desc_puesto = ChoiceField(
        label='Empleado: ',
        widget=Select(attrs={'class': 'form-control input-sm'})
    )

    def __init__(self, *args, **kwargs):
        super(PerfilPuestoDocumentoForm, self).__init__(
            *args, **kwargs)
        self.fields['desc_puesto'].choices = self.get_Puestos()
        # self.fields['zona'].choices = self.get_Zonas()

    def get_Puestos(self):

        valores = [('', '-------')]

        puestos = VIEW_PUESTOS.objects.using('ebs_d').all()

        for puesto in puestos:

            valores.append(
                (
                    puesto.clave_puesto,
                    str(int(puesto.clave_puesto)) + ' - ' + puesto.desc_puesto,
                )
            )
        return valores


class ExpedientesFilterForm(Form):

    TIPO_CHOICES = (
        ('0', '---------'),
        ('1120', 'ADMINISTRATIVO'),
        ('1123', 'EX-EMPLEADO'),
        ('1124', 'EX-EMPLEADO Y CANDIDATO'),
        ('1125', 'CONTACTO'),
        ('1118', 'CANDIDATO'),
    )

    pers_primer_nombre = CharField(
        label="Primer nombre",
        widget=TextInput(
            attrs={'class': 'form-control input-xs'}
        )
    )
    pers_segundo_nombre = CharField(
        label="Segundo nombre",
        widget=TextInput(
            attrs={'class': 'form-control input-xs'}
        )
    )
    pers_apellido_paterno = CharField(
        label="Apellido paterno",
        widget=TextInput(
            attrs={'class': 'form-control input-xs'}
        )
    )
    pers_apellido_materno = CharField(
        label="Apellido materno",
        widget=TextInput(
            attrs={'class': 'form-control input-xs'}
        )
    )
    asig_organizacion_clave = ChoiceField(
        label="Organización",
        widget=Select(
            attrs={'class': 'select2 nova-select2'}
        )
    )
    grup_fase_jde = CharField(
        label="Centro de costos",
        widget=TextInput(
            attrs={'class': 'form-control input-xs'}
        )
    )
    pers_empleado_numero = CharField(
        label="Numero de empleado",
        widget=TextInput(
            attrs={'class': 'form-control input-xs'}
        )
    )
    pers_tipo_codigo = ChoiceField(
        label="Tipo de empleado",
        choices=TIPO_CHOICES,
        widget=Select(
            attrs={'class': 'select2 nova-select2'}
        )
    )

    def __init__(self, *args, **kwargs):
        super(ExpedientesFilterForm, self).__init__(*args, **kwargs)
        self.fields['asig_organizacion_clave'].choices = self.get_Organizaciones()
        # self.fields['pers_tipo_codigo'].choices = self.get_TipoEmpleado()

    def get_Organizaciones(self):
        valores = [('0', '------------')]

        organizaciones = VIEW_ORGANIZACIONES.objects.using('ebs_d').all()
        for organizacion in organizaciones:

            valores.append(
                (
                    organizacion.clave_org,
                    organizacion.desc_org,
                )
            )
        return valores


    class Meta:
        model = PerfilPuestoDocumento

        fields = [
            'desc_puesto',
            'reporta',
            'proposito',
            'funciones',
            'responsabilidades',
            'reporte',
            'edad_minima',
            'edad_maxima',
            'nivel_estudio',
            'estado_civil',
            'genero',
            'cambio_residencia',
            'disponibilidad_viajar',
            'requerimentos'
        ]
        # 'created_by',
        # 'created_date',
        # 'updated_by',
        # 'updated_date' ]

        labels = {
           
            'reporta': 'Reporta a :',
            'proposito': 'Proposito :',
            'funciones': 'Funciones :',
            'responsabilidades': 'Responsabilidades :',
            'reporte': 'Reporte :',
            'edad_minima': 'Edad Minima:',
            'edad_maxima': 'Edad Maxima:',
            'nivel_estudio': 'Nivel Estudio:',
            'estado_civil': 'Estado Civil:',
            'genero': 'Genero:',
            'cambio_residencia': 'Cambio Residencia:',
            'disponibilidad_viajar': 'disponibilidad viajar:',
            'requerimentos': 'Requerimentos:',
     
        }

        widgets = {
            'reporta': Select(attrs={'class': 'form-control input-sm'}),
            'proposito': TextInput(attrs={'class': 'form-control input-xs'}),
            'funciones': TextInput(attrs={'class': 'form-control input-xs'}),
            'responsabilidades': TextInput(attrs={'class': 'form-control input-xs'}),
            'edad_minima': TextInput(attrs={'class': 'form-control input-xs'}),
            'edad_maxima': TextInput(attrs={'class': 'form-control input-xs'}),
            'nivel_estudio': TextInput(attrs={'class': 'form-control input-xs'}),
            'estado_civil': TextInput(attrs={'class': 'form-control input-xs'}),
            'genero': TextInput(attrs={'class': 'form-control input-xs'}),
            'cambio_residencia': CheckboxInput(),
            'disponibilidad_viajar': TextInput(attrs={'class': 'form-control input-xs'}),
            'requerimentos': TextInput(attrs={'class': 'form-control input-xs'}),
        }    

    def get_TipoEmpleado(self):
        valores = [('0', '------------')]

        tipos = VIEW_EMPLEADOS_FULL.objects.using('ebs_d').all()

        #tipos = list(set(VIEW_EMPLEADOS_FULL.objects.using('ebs_d').values_list('pers_tipo_codigo', flat=True)))

        for tipo in tipos:

            valores.append(
                (
                    tipo.pers_tipo_codigo,
                    tipo.pers_tipo_desc
                )
            )
        return valores
