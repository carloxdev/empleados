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
from django.forms import RadioSelect
from django.forms import ImageField
from django.forms import FileInput
from django.core.exceptions import NON_FIELD_ERRORS

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
from .models import Falla
from .models import Requisito
from .models import Metodologia


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


class ProcesoAuditoriaForm(Form):

    proceso = ChoiceField(
        widget=Select(attrs={'class': 'select2'})
    )

    subproceso =  CharField(
        widget=Select(attrs={'class': 'select2', 'required': 'required'}),
    )

    rep_subproceso = CharField(
        label='Representate del Subproceso',
        widget=Select(attrs={'class': 'select2', 'required': 'required'}),
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

    def __init__(self, _auditores_designados_choices, *args, **kwargs):
        super(ProcesoAuditoriaForm, self).__init__(*args, **kwargs)
        self.fields['proceso'].choices = self.get_Proceso()
        self.fields['auditor'].choices = _auditores_designados_choices
        self.fields['sitio'].choices = self.get_Sitio()

    def get_Proceso(self):

        valores = [('', '-------')]

        procesos = Proceso.objects.all()

        for proceso in procesos:

            valores.append(
                (
                    proceso.pk,
                    proceso.proceso
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


class ProcesoAuditoriaEdicionForm(Form):

    proceso = ChoiceField(
        widget=Select(attrs={'class': 'select2', 'disabled':'disabled'}),
        required=False
    )

    subproceso =  ChoiceField(
        widget=Select(attrs={'class': 'select2', 'required': 'required'}),
    )

    rep_subproceso = ChoiceField(
        label='Representate del Subproceso',
        widget=Select(attrs={'class': 'select2', 'required': 'required'}),
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

    def __init__(self, _auditores_designados_choices, _subprocesos_choices, _rep_subprocesos_choices, *args, **kwargs):
        super(ProcesoAuditoriaEdicionForm, self).__init__(*args, **kwargs)
        self.fields['proceso'].choices = self.get_Proceso()
        self.fields['subproceso'].choices = _subprocesos_choices
        self.fields['rep_subproceso'].choices = _rep_subprocesos_choices
        self.fields['auditor'].choices = _auditores_designados_choices
        self.fields['sitio'].choices = self.get_Sitio()

    def get_Proceso(self):

        valores = [('', '-------')]

        procesos = Proceso.objects.all()

        for proceso in procesos:

            valores.append(
                (
                    proceso.pk,
                    proceso.proceso
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


class RequisitoProcesoForm(Form):

    criterio = ChoiceField(
        widget=Select(attrs={'class': 'select2'}),
    )

    requisito = CharField(
        widget=Select(attrs={'class': 'select2'}),
        required=False
    )

    def __init__(self, _criterios_auditoria, *args, **kwargs):
        super(RequisitoProcesoForm, self).__init__(*args, **kwargs)
        self.fields['criterio'].choices = _criterios_auditoria


class HallazgoProcesoForm(Form):

    TIPO_HALLAZGO = (
        ('', '-------'),
        ('Mayor A', 'Mayor A'),
        ('Menor B', 'Menor B'),
        ('Observacion', 'Observacion')
    )

    titulo = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs'}),
    )

    requisito_referencia = MultipleChoiceField(
        label='Requisitos de referencia',
        widget=SelectMultiple(attrs={'class': 'select2', 'multiple': 'multiple'}),
    )

    descripciones = MultipleChoiceField(
        widget=SelectMultiple(attrs={'class': 'select2', 'multiple': 'multiple'}),
        required=False
    )

    tipo_hallazgo = ChoiceField(
        label="Tipo de hallazgo",
        widget=Select(attrs={'class': 'select2'}),
        choices=TIPO_HALLAZGO
    )

    observaciones = CharField(
        widget=Textarea(attrs={'class': 'form-control input-xs', 'rows': '5'}),
    )

    def __init__(self, *args, **kwargs):
        super(HallazgoProcesoForm, self).__init__(*args, **kwargs)
        self.fields['requisito_referencia'].choices = self.get_Requisitos()
        self.fields['descripciones'].choices = self.get_Descripciones()

    def get_Descripciones(self):

        valores = []

        fallas = Falla.objects.all()

        for falla in fallas:

            valores.append(
                (
                    falla.pk,
                    falla.falla
                )
            )
        return valores

    def get_Requisitos(self):

        valores = []

        requisitos = Requisito.objects.all()

        for requisito in requisitos:

            valores.append(
                (
                    requisito.pk,
                    requisito.requisito
                )
            )
        return valores


class HallazgoProcesoFilterForm(Form):

    TIPO_HALLAZGO = (
        ('','-------'),
        ('Mayor A', 'Mayor A'),
        ('Menor B', 'Menor B'),
        ('Observacion', 'Observacion')
    )

    HALLAZGO_CERRADO = (
        ('Si', 'Si'),
        ('No', 'No')
    )

    ESTADOS = (
        ('','-------'),
        ('En Captura','En Captura'),
        ('Autorizado','Autorizado'),
        ('En Aprobacion','En Aprobacion'),
        ('Aprobado','Aprobado'),
        ('Autorizado','Autorizado'),
        ('Rechazado','Rechazado'),
        ('Cancelado','Cancelado'),
        ('Realizada','Realizada')
    )

    titulo = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs', 'id': 'id_titulo_filter'}),
        required=False
    )

    estado = ChoiceField(
        widget=Select(attrs={'class': 'select2', 'id': 'id_estado_filter'}),
        choices=ESTADOS,
        required=False
    )

    tipo_hallazgo = ChoiceField(
        label="Tipo de hallazgo",
        widget=Select(attrs={'class': 'select2', 'id': 'id_tipo_hallazgo_filter'}),
        choices=TIPO_HALLAZGO,
        required=False
    )

    cerrado = ChoiceField(
        widget=RadioSelect,
        choices=HALLAZGO_CERRADO,
        required=False
    )


class HallazgoProcesoDetalleForm(Form):

    TIPO_HALLAZGO = (
        ('', '-------'),
        ('Mayor A', 'Mayor A'),
        ('Menor B', 'Menor B'),
        ('Observacion', 'Observacion')
    )

    titulo = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs', 'maxlength': '40'}),
    )

    requisito_referencia = MultipleChoiceField(
        label='Requisitos de referencia',
        widget=SelectMultiple(attrs={'class': 'select2', 'multiple': 'multiple'}),
    )

    descripciones = MultipleChoiceField(
        widget=SelectMultiple(attrs={'class': 'select2', 'multiple': 'multiple'}),
        required=False
    )

    tipo_hallazgo = ChoiceField(
        label="Tipo de hallazgo",
        widget=Select(attrs={'class': 'select2'}),
        choices=TIPO_HALLAZGO
    )

    observaciones = CharField(
        widget=Textarea(attrs={'class': 'form-control input-xs', 'rows': '5', 'maxlength': '400'}),
    )

    def __init__(self, *args, **kwargs):
        super(HallazgoProcesoDetalleForm, self).__init__(*args, **kwargs)
        self.fields['requisito_referencia'].choices = self.get_Requisitos()
        self.fields['descripciones'].choices = self.get_Descripciones()

    def get_Descripciones(self):

        valores = []

        fallas = Falla.objects.all()

        for falla in fallas:

            valores.append(
                (
                    falla.pk,
                    falla.falla
                )
            )
        return valores

    def get_Requisitos(self):

        valores = []

        requisitos = Requisito.objects.all()

        for requisito in requisitos:

            valores.append(
                (
                    requisito.pk,
                    requisito.requisito
                )
            )
        return valores


class AnalisisHallazgoForm(Form):

    titulo = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs', 'maxlength': '40'}),
    )

    metodologia = ChoiceField(
        widget=Select(attrs={'class': 'select2'}),
    )

    causas = CharField(
        label='Causas Probables de la No Conformidad',
        widget=Textarea(attrs={'class': 'form-control input-xs', 'rows': '4', 'maxlength': '400'}),
    )

    imagen = ImageField(
        label='Recursos Necesarios',
        widget=FileInput(attrs={'class': 'inputfile', 'name': 'file-2', 'data-multiple-caption': '{count} Archivos seleccionados', 'multiple': '', 'id': 'id_imagen_analisis'}),
    )

    def __init__(self, *args, **kwargs):
        super(AnalisisHallazgoForm, self).__init__(*args, **kwargs)
        self.fields['metodologia'].choices = self.get_Metodologia()

    def get_Metodologia(self):

        valores = [('', '-------')]

        metodologias = Metodologia.objects.all()

        for metodologia in metodologias:

            valores.append(
                (
                    metodologia.pk,
                    metodologia.metodologia
                )
            )
        return valores


class PlanAccionHallazgoForm(Form):

    titulo = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs', 'maxlength': '40'}),
    )

    actividad = CharField(
        widget=Textarea(attrs={'class': 'form-control input-xs', 'rows': '4', 'maxlength': '400'}),
    )

    responsable = ChoiceField(
        widget=Select(attrs={'class': 'select2'})
    )

    fecha_programada = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs', 'name': 'fecha_programada'}),
    )

    evidencia = CharField(
        widget=Textarea(attrs={'class': 'form-control input-xs', 'rows': '3', 'maxlength': '140'}),
    )

    def __init__(self, *args, **kargs):
        super(PlanAccionHallazgoForm, self).__init__(*args, **kargs)
        self.fields['responsable'].choices = self.get_Empleados()

    def get_Empleados(self):

        valores = [('', '-------')]

        empleados = VIEW_EMPLEADOS_SIMPLE.objects.using('ebs_p').all()

        for empleado in empleados:

            if not (empleado.pers_empleado_numero is u''):
                valores.append(
                    (
                        empleado.pers_empleado_numero,
                        empleado.pers_empleado_numero + ' : ' + empleado.pers_nombre_completo
                    )
                )
        return valores


class SeguimientoPlanAccionForm(Form):

    resultado_seguimiento = CharField(
        widget=Textarea(attrs={'class': 'form-control input-xs', 'rows': '4', 'maxlength': '400'}),
    )

    fecha_seguimiento = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs', 'name': 'fecha_seguimiento'}),
    )

    imagen = ImageField(
        label='',
        widget=FileInput(attrs={'class': 'inputfile', 'name': 'file-2', 'data-multiple-caption': '{count} Archivos seleccionados', 'multiple': '', 'id': 'id_imagen_seguimiento_plan' }),
    )


class SeguimeintoPlanAccionEvaluacionForm(Form):

    RESULTADO_EVALUACION = (
        ('Cumple', 'Cumple'),
        ('No cumple', 'No cumple'),
    )

    resultado = ChoiceField(
        widget=RadioSelect,
        choices=RESULTADO_EVALUACION
    )

    resultado_evaluacion = CharField(
        widget=Textarea(attrs={'class': 'form-control input-xs', 'rows': '4', 'maxlength': '400', 'id': 'id_resultado_evaluacion_plan_eval'}),
    )

    fecha_evaluacion = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs', 'name': 'fecha_evaluacion', 'id': 'id_fecha_evaluacion_plan_eval'}),
    )

    criterio_decision = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs', 'maxlength': '120', 'id': 'id_criterio_decision_plan_eval'}),
    )

    observaciones = CharField(
        widget=Textarea(attrs={'class': 'form-control input-xs', 'rows': '4', 'maxlength': '400', 'id': 'id_observaciones_plan_eval'}),
    )

    imagen = ImageField(
        label='Recursos Necesarios',
        widget=FileInput(attrs={'class': 'inputfile', 'name': 'file-2', 'data-multiple-caption': '{count} Archivos seleccionados', 'multiple': '', 'id': 'id_imagen_plan_eval' }),
    )


class EvidenciaHallazgoForm(Form):

    titulo = CharField(
        widget=TextInput(attrs={'class': 'form-control input-xs', 'maxlength': '40'}),
    )

    observacion = CharField(
        widget=Textarea(attrs={'class': 'form-control input-xs', 'rows': '4', 'maxlength': '400'}),
    )

    imagen_evidencia = ImageField(
        label='Recursos Necesarios',
        widget=FileInput(attrs={'class': 'inputfile', 'name': 'file-2', 'data-multiple-caption': '{count} Archivos seleccionados', 'multiple': '' }),
    )
