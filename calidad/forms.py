# -*- coding: utf-8 -*-

# Librerias/Clases Django
from django.forms import Form
from django.forms import CharField
from django.forms import ChoiceField
from django.forms import MultipleChoiceField
from django.forms import TextInput
from django.forms import Select
from django.forms import Textarea
from django.forms import NumberInput
from django.forms import SelectMultiple

# Librerias/Clases propias


# modelos
from ebs.models import VIEW_EMPLEADOS_SIMPLE
from jde.models import VIEW_COMPANIAS
from jde.models import VIEW_CONTRATO
from administracion.models import Contrato
from .models import Criterio
from .models import Rol
from .models import Proceso
from .models import Subproceso
from .models import Sitio
from .models import Responsable


class CriterioForm(Form):
    CLASIFICACION = (
        ('', '------'),
        ('Norma', 'Norma'),
        ('Legal', 'Legal'),
        ('Contractual', 'Contractual'),
        ('RSC', 'RSC'),
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

        empleados = VIEW_EMPLEADOS_SIMPLE.objects.using('ebs_p').all()

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

        empleados = VIEW_EMPLEADOS_SIMPLE.objects.using('ebs_p').all()

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

    contratos = MultipleChoiceField(
        widget=SelectMultiple(attrs={'class': 'select2', 'multiple': 'multiple'}),
        required=False
    )

    criterios = MultipleChoiceField(
        widget=SelectMultiple(attrs={'class': 'select2', 'multiple': 'multiple'}),
        required=False
    )

    fecha_programada_ini = CharField(
        label='Fecha Programada inicial / final',
        widget=TextInput(attrs={'class': 'form-control input-xs', 'name': 'fecha_programada_ini'}),
        required=False
    )

    fecha_programada_fin = CharField(
        label='',
        widget=TextInput(attrs={'class': 'form-control input-xs', 'name': 'fecha_programada_fin'}),
        required=False
    )

    objetivo = CharField(
        widget=Textarea(attrs={'class': 'form-control input-xs', 'rows': '6'}),
        required=False
    )

    alcance = CharField(
        widget=Textarea(attrs={'class': 'form-control input-xs', 'rows': '6'}),
        required=False
    )

    recursos_necesarios = CharField(
        widget=Textarea(attrs={'class': 'form-control input-xs', 'rows': '6'}),
        required=False
    )

    def __init__(self, *args, **kwargs):
        super(GeneralAuditoriaForm, self).__init__(*args, **kwargs)
        self.fields['compania'].choices = self.get_Compania()
        self.fields['contratos'].choices = self.get_Contratos()
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

        valores = []

        contratos = VIEW_CONTRATO.objects.using('jde_p').all()

        for contrato in contratos:

            valores.append(
                (
                    contrato.proyecto,
                    str(int(contrato.proyecto)) + ' - ' + contrato.proyecto_desc,
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


class AuditorForm(Form):

    auditor_lider = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs', 'readonly': 'true'})
    )

    auditores_designados = MultipleChoiceField(
        widget=SelectMultiple(attrs={'class': 'select2', 'multiple': 'multiple'}),
        required=False
    )

    auditores_colaboradores = MultipleChoiceField(
        widget=SelectMultiple(attrs={'class': 'select2', 'multiple': 'multiple'}),
        required= False
    )

    def __init__(self, *args, **kargs):
        super(AuditorForm, self).__init__(*args, **kargs)
        self.fields['auditores_designados'].choices = self.get_Auditores()
        self.fields['auditores_colaboradores'].choices = self.get_Auditores()

    def get_Auditores(self):

        valores = []

        auditores = Rol.objects.filter(rol="Auditor Interno")

        for auditor in auditores:

            if not (auditor.numero_empleado is u''):
                valores.append(
                    (
                        auditor.pk,
                        auditor.numero_empleado + ' : ' + auditor.nombre_completo
                    )
                )
        return valores


class AuditoriaProcesoForm(Form):

    proceso = ChoiceField(
        widget=Select(attrs={'class': 'select2'})
    )

    subproceso = ChoiceField(
        widget=Select(attrs={'class': 'select2'})
    )

    rep_subproceso = ChoiceField(
        label='Representate del Subproceso',
        widget=Select(attrs={'class': 'select2'})
    )

    fecha_programada_ini = CharField(
        label='Fecha Programada desde / hasta',
        widget=TextInput(attrs={'class': 'form-control input-xs', 'name': 'fecha_programada_ini'}),
    )

    fecha_programada_fin = CharField(
        label='',
        widget=TextInput(attrs={'class': 'form-control input-xs', 'name': 'fecha_programada_fin'}),
    )

    auditor = ChoiceField(
        widget=Select(attrs={'class': 'select2'})
    )

    sitio = ChoiceField(
        widget=Select(attrs={'class': 'select2'})
    )

    def __init__(self, auditores_designados_choices, proceso_required, *args, **kwargs):
        super(AuditoriaProcesoForm, self).__init__(*args, **kwargs)
        self.fields['proceso'].choices = self.get_Proceso()
        self.fields['proceso'].required = proceso_required
        if not proceso_required:
            self.fields['proceso'].widget.attrs['disabled'] = 'disabled'
        self.fields['subproceso'].choices = self.get_Subproceso()
        self.fields['rep_subproceso'].choices = self.get_Representante()
        self.fields['auditor'].choices = auditores_designados_choices
        self.fields['sitio'].choices = self.get_Sitio()

    def get_Proceso(self):

        valores = [('', '-------')]

        procesos = Proceso.objects.all()

        for proceso in procesos:

            valores.append(
                (
                    proceso.proceso,
                    proceso.proceso
                )
            )
        return valores

    def get_Subproceso(self):

        valores = [('', '-------')]

        subprocesos = Subproceso.objects.all()

        for subproceso in subprocesos:

            valores.append(
                (
                    subproceso.subproceso,
                    subproceso.subproceso
                )
            )
        return valores

    def get_Representante(self):

        valores = [('', '-------')]

        responsables = Responsable.objects.all()

        for responsable in responsables:

            valores.append(
                (
                    responsable.pk,
                    responsable.numero_empleado + ' : ' + responsable.nombre_completo
                )
            )
        return valores

    def get_Sitio(self):

        valores = [('', '-------')]

        sitios = Sitio.objects.all()

        for sitio in sitios:

            valores.append(
                (
                    sitio.sitio,
                    sitio.sitio
                )
            )
        return valores

class ProcesoRequisitoForm(Form):

    criterio = ChoiceField(
        widget=Select(attrs={'class': 'select2'}),
    )

    requisito = CharField(
        widget=Select(attrs={'class': 'select2'}),
        required=False
    )

    def __init__(self, criterios_auditoria, *args, **kwargs):
        super(ProcesoRequisitoForm, self).__init__(*args, **kwargs)
        self.fields['criterio'].choices = criterios_auditoria
