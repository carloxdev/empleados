# -*- coding: utf-8 -*-

# Librerias/Clases Django
from django.forms import Form
from django.forms import CharField
from django.forms import ChoiceField
from django.forms import TextInput
from django.forms import Select


# Librerias/Clases propias


# modelos
from ebs.models import VIEW_EMPLEADOS_SIMPLE
from jde.models import VIEW_COMPANIAS


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

        # empleados = VIEW_EMPLEADOS_SIMPLE.objects.using('ebs_d').all()
        # AQUI APLICAR FILTRO DE EXCLUIR
        empleados = VIEW_EMPLEADOS_SIMPLE.objects.using('ebs_p').filter(pers_nombre_completo__icontains="GARCIA JIMENEZ")

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
        label='Subproceso',
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )


class UsuarioForm(Form):
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
        label='Clasificación',
        widget=Select(attrs={'class': 'select2'}),
        choices=ROL
    )

    def __init__(self, *args, **kargs):
        super(UsuarioForm, self).__init__(*args, **kargs)
        self.fields['empleado'].choices = self.get_Empleados()

    def get_Empleados(self):

        valores = []

        # empleados = VIEW_EMPLEADOS_SIMPLE.objects.using('ebs_d').all()
        empleados = VIEW_EMPLEADOS_SIMPLE.objects.using('ebs_p').filter(pers_nombre_completo__icontains="GARCIA JIMENEZ")

        for empleado in empleados:

            if not (empleado.pers_empleado_numero is u''):
                valores.append(
                    (
                        empleado.pers_empleado_numero,
                        empleado.pers_empleado_numero + ' : ' + empleado.pers_nombre_completo
                    )
                )
        return valores


class UsuarioFilterForm(Form):

    empleado_filtro = CharField(
        label='Empleado',
        widget=TextInput(attrs={'class': 'form-control input-xs'})
    )

    rol_filtro = ChoiceField(
        label='Rol',
        widget=Select(attrs={'class': 'select2'}),
        choices=UsuarioForm.ROL
    )


class CompaniaUsuarioForm(Form):

    compania = ChoiceField(
        widget=Select(attrs={'class': 'form-control', 'multiple': 'multiple', 'id': 'id_responsable'})
    )

    def __init__(self, *args, **kargs):
        super(CompaniaUsuarioForm, self).__init__(*args, **kargs)
        self.fields['compania'].choices = self.get_Companias()

    def get_Companias(self):

        valores = []

        companias = VIEW_COMPANIAS.objects.using('jde_p').all()

        for compania in companias:

            valores.append(
                (
                    compania.comp_code,
                    str(int(compania.comp_code)) + ' - ' + compania.comp_desc,
                )
            )
        return valores
