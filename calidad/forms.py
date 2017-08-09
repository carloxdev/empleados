# -*- coding: utf-8 -*-

# Librerias/Clases Django
from django.forms import Form
from django.forms import CharField
from django.forms import ChoiceField
from django.forms import TextInput
from django.forms import Select
from django.forms import Textarea
from django.forms import NumberInput

# Librerias/Clases propias


# modelos
from ebs.models import VIEW_EMPLEADOS_SIMPLE
from jde.models import VIEW_COMPANIAS
from .models import Criterio


class CriterioForm(Form):
    CLASIFICACION = (
        ('', '------'),
        ('norma', 'Norma'),
        ('legal', 'Legal'),
        ('contractual', 'Contractual'),
        ('rsc', 'RSC'),
    )

    clasificacion = ChoiceField(
        label='Clasificación',
        widget=Select(attrs={'class': 'select2', 'id': 'id_clasificacion_criterio'}),
        choices=CLASIFICACION
    )

    criterio = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )


class RequisitoForm(Form):

    requisito = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )


class RequisitoFilterForm(Form):

    requisito = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs', 'id': 'id_requisito_filtro'})
    )


class ProcesoForm(Form):

    proceso = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )


class ResponsableForm(Form):

    responsable = ChoiceField(
        widget=Select(attrs={'class': 'form-control', 'id': 'id_responsable'})
    )

    def __init__(self, *args, **kargs):
        super(ResponsableForm, self).__init__(*args, **kargs)
        self.fields['responsable'].choices = self.get_Empleados()

    def get_Empleados(self):

        valores = []

        empleados = VIEW_EMPLEADOS_SIMPLE.objects.using('ebs_p')

        for empleado in empleados:

            if not (empleado.pers_empleado_numero is u''):
                valores.append(
                    (
                        empleado.pers_empleado_numero,
                        empleado.pers_empleado_numero + ' : ' + empleado.pers_nombre_completo
                    )
                )
        return valores


class SubprocesoForm(Form):

    subproceso = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )


class RolForm(Form):
    ROL = (
        ('', '------'),
        ('Aprobador', 'Aprobador'),
        ('Auditor Lider', 'Auditor lider'),
        ('Autorizador', 'Autorizador'),
        ('Auditor Interno', 'Auditor interno'),
    )

    empleado = ChoiceField(
        widget=Select(attrs={'class': 'select2'})
    )

    rol = ChoiceField(
        widget=Select(attrs={'class': 'select2'}),
        choices=ROL
    )

    def __init__(self, *args, **kargs):
        super(RolForm, self).__init__(*args, **kargs)
        self.fields['empleado'].choices = self.get_Empleados()

    def get_Empleados(self):

        valores = [('', '-------')]

        empleados = VIEW_EMPLEADOS_SIMPLE.objects.using('ebs_p').filter(pers_nombre_completo__icontains="GARCIA JIMENEZ")

        for empleado in empleados:

            if not (empleado.pers_empleado_numero is u''):
                valores.append(
                    (
                        empleado.pers_empleado_numero + ':' + empleado.pers_nombre_completo,
                        empleado.pers_empleado_numero + ' : ' + empleado.pers_nombre_completo
                    )
                )
        return valores


class RolFilterForm(Form):

    empleado_filtro = ChoiceField(
        label='Empleado',
        widget=Select(attrs={'class': 'select2'})
    )

    rol_filtro = ChoiceField(
        label='Rol',
        widget=Select(attrs={'class': 'select2'}),
        choices=RolForm.ROL
    )

    def __init__(self, *args, **kargs):
        super(RolFilterForm, self).__init__(*args, **kargs)
        self.fields['empleado_filtro'].choices = self.get_Empleados()

    def get_Empleados(self):

        valores = [('', '-------')]

        empleados = VIEW_EMPLEADOS_SIMPLE.objects.using('ebs_p').filter(pers_nombre_completo__icontains="GARCIA JIMENEZ")

        for empleado in empleados:

            if not (empleado.pers_empleado_numero is u''):
                valores.append(
                    (
                        empleado.pers_empleado_numero + ':' + empleado.pers_nombre_completo,
                        empleado.pers_empleado_numero + ' : ' + empleado.pers_nombre_completo
                    )
                )
        return valores


class CompaniaRolForm(Form):

    compania = ChoiceField(
        widget=Select(attrs={'class': 'select2'})
    )

    def __init__(self, *args, **kargs):
        super(CompaniaRolForm, self).__init__(*args, **kargs)
        self.fields['compania'].choices = self.get_Companias()

    def get_Companias(self):

        valores = [('', '-------')]

        companias = VIEW_COMPANIAS.objects.using('jde_p').all()

        for compania in companias:

            valores.append(
                (
                    str(compania.comp_code) + ':' + compania.comp_desc,
                    str(int(compania.comp_code)) + ' - ' + compania.comp_desc,
                )
            )
        return valores


class SitioForm(Form):

    sitio = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )


class MetodologiaForm(Form):

    metodologia = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )


class FallaForm(Form):

    codigo = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )

    falla = CharField(
        label='Descripción',
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )


class FormatoForm(Form):

    titulo = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )

    no_revision = CharField(
        widget=NumberInput(attrs={'class': 'form-control input-xs', 'min': '1'})
    )

    vigencia = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )

    codigo = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )

    descripcion = CharField(
        widget=Textarea(attrs={'class': 'form-control input-xs'})
    )

    compania = ChoiceField(
        widget=Select(attrs={'class': 'select2'})
    )

    def __init__(self, *args, **kargs):
        super(FormatoForm, self).__init__(*args, **kargs)
        self.fields['compania'].choices = self.get_Companias()

    def get_Companias(self):

        valores = [('', '-------')]

        companias = VIEW_COMPANIAS.objects.using('jde_p').all()

        for compania in companias:

            valores.append(
                (
                    str(compania.comp_code) + ':' + compania.comp_desc,
                    str(int(compania.comp_code)) + ' - ' + compania.comp_desc,
                )
            )
        return valores

class GeneralAuditoriaForm(Form):
    TIPO_AUDITORIA = (
        ('', '------'),
        ('AUI', 'Auditoria Interna'),
        ('AUE', 'Auditoria Externa'),
        ('MC', 'Mejora Continua'),
    )

    tipo_de_auditoria = ChoiceField(
        widget=Select(attrs={'class': 'select2'}),
        choices=TIPO_AUDITORIA
    )

    compania = ChoiceField(
        widget=Select(attrs={'class': 'select2'})
    )

    contratos = ChoiceField(
        widget=Select(attrs={'class': 'select2', 'multiple': 'multiple'})
    )

    criterios = ChoiceField(
        widget=Select(attrs={'class': 'select2', 'multiple': 'multiple'})
    )

    fecha_programada_ini = CharField(
        label='Fecha Programada inicial / final',
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )

    fecha_programada_fin = CharField(
        label='',
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )

    objetivo = CharField(
        widget=Textarea(attrs={'class': 'form-control input-xs'})
    )

    alcance = CharField(
        widget=Textarea(attrs={'class': 'form-control input-xs'})
    )

    recursos_necesarios = CharField(
        widget=Textarea(attrs={'class': 'form-control input-xs'})
    )

    def __init__(self, *args, **kwargs):
        super(GeneralAuditoriaForm, self).__init__(*args, **kwargs)
        self.fields['compania'].choices = self.get_Compania()
        # self.fields['contratos'].choices = self.get_Contratos()
        self.fields['criterios'].choices = self.get_Criterios()

    def get_Compania(self):

        valores = [('', '-------')]

        companias = VIEW_COMPANIAS.objects.using('jde_p').all()

        for compania in companias:

            valores.append(
                (
                    str(compania.comp_code) + ':' + compania.comp_desc,
                    str(int(compania.comp_code)) + ' - ' + compania.comp_desc,
                )
            )
        return valores

    def get_Contratos(self):

        valores = [('', '-------')]

        companias = VIEW_COMPANIAS.objects.using('jde_p').all()

        for compania in companias:

            valores.append(
                (
                    str(compania.comp_code) + ':' + compania.comp_desc,
                    str(int(compania.comp_code)) + ' - ' + compania.comp_desc,
                )
            )
        return valores


    def get_Criterios(self):

        valores = []

        criterios = Criterio.objects.all()

        for criterio in criterios:

            valores.append(
                (
                    criterio.pk,
                    criterio.criterio,
                )
            )
        return valores
