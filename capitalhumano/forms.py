# -*- coding: utf-8 -*-

# Django forms:
from django.forms import TextInput
from django.forms import Select
from django.forms import Form
from django.forms import CharField
from django.forms import IntegerField
from django.forms import NumberInput
from django.forms import ChoiceField
from django.forms import RadioSelect
from django.forms import CheckboxInput
from django.forms import FileInput
from django.forms import ClearableFileInput
from django.forms import DateInput
from django.forms import DateField
from django.forms import FileField
from django.forms import Textarea

# Modelos
from jde.models import VIEW_UNIDADES
from ebs.models import VIEW_TIPO_PERSONAS
from ebs.models import VIEW_PUESTOS
from ebs.models import VIEW_ORGANIZACIONES
from administracion.models import Empresa
from administracion.models import Asunto
from capitalhumano.models import PerfilPuestoDocumento


# Business
from .business import EmpleadoBusiness


class OrganizacionesFilterForm(Form):
    organizaciones = ChoiceField(label='Organizaciones', widget=Select(
        attrs={'class': 'select2 nova-select2'}))

    def __init__(self, *args, **kwargs):
        super(OrganizacionesFilterForm, self).__init__(*args, **kwargs)
        self.fields['organizaciones'].choices = self.get_Organizaciones()

    def get_Organizaciones(self):
        valores = [('', 'TODAS LAS ORGANIZACIONES')]

        organizaciones = VIEW_ORGANIZACIONES.objects.using('ebs_p').all()
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
        valores = [('', 'TODAS LAS EMPRESAS')]

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

    pers_primer_nombre = CharField(
        label='Primer nombre',
        widget=TextInput(
            attrs={'class': 'form-control input-xs'}))

    pers_segundo_nombre = CharField(
        label='Segundo nombre',
        widget=TextInput(
            attrs={'class': 'form-control input-xs'}))

    pers_apellido_paterno = CharField(
        label='Apellido paterno',
        widget=TextInput(
            attrs={'class': 'form-control input-xs'}))

    pers_apellido_materno = CharField(
        label='Apellido materno',
        widget=TextInput(
            attrs={'class': 'form-control input-xs'}))

    pers_genero_clave = ChoiceField(
        label='Género',
        widget=RadioSelect, choices=GENERO)

    pers_empleado_numero = IntegerField(
        label='Número de empleado',
        widget=NumberInput(
            attrs={'class': 'form-control input-xs', 'min': '1'}))

    pers_tipo_codigo = ChoiceField(
        label='Tipo',
        widget=Select(
            attrs={'class': 'select2 nova-select2'}))

    asig_puesto_clave = ChoiceField(
        label='Puesto',
        widget=Select(
            attrs={'class': 'select2 nova-select2'}))

    asig_organizacion_clave = ChoiceField(
        label='Organización',
        widget=Select(
            attrs={'class': 'select2 nova-select2'}))

    fecha_contratacion = CharField(
        label='Fecha de contratación',
        widget=TextInput(
            attrs={'name': 'fecha_contratacion',
                   'class': 'form-control input-xs', 'readonly': ''}
        ),
    )

    grup_compania_jde = ChoiceField(
        label='Compañia',
        widget=Select(
            attrs={'class': 'select2 nova-select2'}))

    # zona = CharField(
    #     label='Zona',
    #     widget=TextInput(
    #         attrs={'class': 'form-control input-xs'}))

    grup_fase_jde = ChoiceField(
        label='Centro de costos',
        widget=Select(
            attrs={'class': 'select2 nova-select2'}))

    grup_nomina_jde = ChoiceField(
        label='Nómina',
        widget=RadioSelect, choices=NOMINA)

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

        tipos = VIEW_TIPO_PERSONAS.objects.using('ebs_p').all()

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

        puestos = VIEW_PUESTOS.objects.using('ebs_p').all()

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

        organizaciones = VIEW_ORGANIZACIONES.objects.using('ebs_p').all()

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

    asig_puesto_clave = ChoiceField(widget=Select(
        attrs={'class': 'select2 nova-select2'}))

    class Meta:
        model = PerfilPuestoDocumento

        fields = [
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
            'requerimentos',
            'puesto_acargo',
        ]
        # 'created_by',
        # 'created_date',
        # 'updated_by',
        # 'updated_date' ]

        labels = {
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
            # 'reporta': Select(attrs={'class': 'form-control input-sm'}),
            'proposito': TextInput(attrs={'class': 'form-control input-xs'}),
            'funciones': TextInput(attrs={'class': 'form-control input-xs'}),
            'responsabilidades': Textarea(attrs={'class': 'form-control input-xs', 'rows': '5'}),
            'edad_minima': TextInput(attrs={'class': 'form-control input-xs'}),
            'edad_maxima': TextInput(attrs={'class': 'form-control input-xs'}),
            'nivel_estudio': TextInput(attrs={'class': 'form-control input-xs'}),
            'estado_civil': TextInput(attrs={'class': 'form-control input-xs'}),
            'genero': TextInput(attrs={'class': 'form-control input-xs'}),
            'cambio_residencia': CheckboxInput(),
            'disponibilidad_viajar': TextInput(attrs={'class': 'form-control input-xs'}),
            'requerimentos': TextInput(attrs={'class': 'form-control input-xs'}),
        }

    desc_puesto = ChoiceField(label='Puesto', widget=Select(
        attrs={'class': 'select2 nova-select2'}))

    reporta = ChoiceField(label='Reporta', widget=Select(
        attrs={'class': 'select2 nova-select2'}))

    def __init__(self, *args, **kwargs):
        super(PerfilPuestoDocumentoForm, self).__init__(
            *args, **kwargs)
        self.fields['reporta'].choices = self.get_Puestos()
        self.fields['desc_puesto'].choices = self.get_Puestos()
        # self.fields['zona'].choices = self.get_Zonas()

    def get_Puestos(self):

        valores = [('', '-------')]

        puestos = VIEW_PUESTOS.objects.using('ebs_p').all()

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
        ('', '------------'),
        ('1120', 'ADMINISTRATIVO'),
        ('1123', 'EX-EMPLEADO'),
        ('1124', 'EX-EMPLEADO Y CANDIDATO'),
        ('1125', 'CONTACTO'),
        ('1118', 'CANDIDATO'),
    )

    asig_organizacion_clave = ChoiceField(
        label="Organización",
        widget=Select(
            attrs={'class': 'select2 nova-select2'}
        )
    )
    grup_fase_jde = CharField(
        label="Unidad de negocio",
        widget=TextInput(
            attrs={'class': 'form-control input-xs'}
        )
    )
    pers_empleado_numero = ChoiceField(
        label="Numero de empleado",
        widget=Select(
            attrs={'class': 'select2 nova-select2'}
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
        self.fields[
            'asig_organizacion_clave'].choices = EmpleadoBusiness.get_Organizaciones()
        self.fields[
            'pers_empleado_numero'].choices = EmpleadoBusiness.get_Empleados()


class SolicitudesFilterForm(Form):
    STATUS = (
        ('', '------------'),
        ('cap', 'En captura'),
        ('act', 'Actualizado'),
        ('rech', 'Rechazado'),
    )
    asunto = ChoiceField(
        label="Asunto",
        widget=Select(attrs={'class': 'select2 nova-select2'}))

    folio = CharField(
        label="Folio",
        widget=TextInput(attrs={'class': 'form-control input-xs'}))

    numero_empleado = ChoiceField(
        label="Numero empleado",
        widget=Select(attrs={'class': 'select2 nova-select2'}))

    status = ChoiceField(
        label="Estatus",
        choices=STATUS,
        widget=Select(attrs={'class': 'select2 nova-select2'}))

    def __init__(self, *args, **kwargs):
        super(SolicitudesFilterForm, self).__init__(*args, **kwargs)
        self.fields['asunto'].choices = self.get_Asuntos()
        self.fields[
            'numero_empleado'].choices = EmpleadoBusiness.get_Empleados()

    def get_Asuntos(self):
        valores = [('', '------------')]

        asuntos = Asunto.objects.all()
        for asunto in asuntos:

            valores.append(
                (
                    asunto.pk,
                    asunto.nombre
                )
            )
        return valores


class SolicitudesEditarForm(Form):
    STATUS = (
        ('cap', 'En captura'),
        ('act', 'Actualizado'),
        ('rech', 'Rechazado'),
    )

    observaciones = CharField(
        label="Observaciones:",
        widget=Textarea(attrs={'class': 'form-control input-xs', 'rows': '4'}))

    status_editar = ChoiceField(
        label="Estatus",
        choices=STATUS,
        widget=Select(attrs={'class': 'select2 nova-select2'}))

    def __init__(self, *args, **kwargs):
        super(SolicitudesEditarForm, self).__init__(*args, **kwargs)
        self.fields['observaciones'].required = False


class GradoAcademicoFilterForm(Form):

    GRADO_ACADEMICO_CHOICES = (
        ('', '------------'),
        ('NINGUNA', 'NINGUNA'),
        ('LEER Y ESCRIBIR', 'LEER Y ESCRIBIR'),
        ('PRIMARIA', 'PRIMARIA'),
        ('SECUNDARIA', 'SECUNDARIA'),
        ('TECNICA', 'TECNICA'),
        ('BACHILLERATO', 'BACHILLERATO'),
        ('LICENCIATURA', 'LICENCIATURA'),
        ('MAESTRIA', 'MAESTRIA'),
        ('DOCTORADO', 'DOCTORADO'),
    )
    pers_empleado_numero = ChoiceField(
        label="Numero de empleado",
        widget=Select(
            attrs={'class': 'select2 nova-select2'}
        )
    )
    qua_grado_academico = ChoiceField(
        label="Grado academico",
        choices=GRADO_ACADEMICO_CHOICES,
        widget=Select(
            attrs={'class': 'select2 nova-select2'}
        )
    )
    qua_especialidad = ChoiceField(
        label="Disciplina academica",
        widget=Select(
            attrs={'class': 'select2 nova-select2'}
        )
    )
    asig_organizacion_id = ChoiceField(
        label="Organización",
        widget=Select(
            attrs={'class': 'select2 nova-select2'}
        )
    )

    def __init__(self, *args, **kwargs):
        super(GradoAcademicoFilterForm, self).__init__(*args, **kwargs)
        self.fields[
            'asig_organizacion_id'].choices = EmpleadoBusiness.get_Organizaciones()
        self.fields['asig_organizacion_id'].required = False
        self.fields[
            'qua_especialidad'].choices = EmpleadoBusiness.get_Especialidades()
        self.fields[
            'pers_empleado_numero'].choices = EmpleadoBusiness.get_Empleados()


class DocPersonalFilterForm(Form):

    AGRUPADOR_CHOICES = (
        ('', '------------'),
        ('per', 'Personal'),
        ('qhse', 'QHSE'),
        ('amo', 'Amonestación'),
        ('adm', 'Administración'),
        ('ope', 'Operaciones'),
        ('rec', 'Reconocimiento'),
    )
    ESTATUS = (
        ('', '------------'),
        ('ven', 'VENCIDOS'),
        ('por', 'POR VENCER'),
    )
    agrupador = ChoiceField(
        label="Agrupador",
        choices=AGRUPADOR_CHOICES,
        widget=Select(
            attrs={'class': 'select2 nova-select2'}
        )
    )
    numero_empleado = ChoiceField(
        label="Numero de empleado",
        widget=Select(
            attrs={'class': 'select2 nova-select2'}
        )
    )
    asig_organizacion_clave = ChoiceField(
        label="Organización",
        widget=Select(
            attrs={'class': 'select2 nova-select2'}
        )
    )

    tipo_documento = ChoiceField(
        label="Tipo documento",
        widget=Select(
            attrs={'class': 'select2 nova-select2'}
        )
    )
    estatus = ChoiceField(
        label="Vencimiento",
        choices=ESTATUS,
        widget=Select(attrs={'class': 'select2 nova-select2'}
                      )
    )

    def __init__(self, *args, **kwargs):
        super(DocPersonalFilterForm, self).__init__(*args, **kwargs)
        self.fields[
            'asig_organizacion_clave'].choices = EmpleadoBusiness.get_Organizaciones()
        self.fields['asig_organizacion_clave'].required = False
        self.fields[
            'tipo_documento'].choices = EmpleadoBusiness.get_TipoDocumento()
        self.fields['tipo_documento'].required = False
        self.fields[
            'numero_empleado'].choices = EmpleadoBusiness.get_Empleados()


class DocCapacitacionFilterForm(Form):

    AGRUPADOR_CHOICES = (
        ('', '------------'),
        ('per', 'Personal'),
        ('qhse', 'QHSE'),
        ('amo', 'Amonestación'),
        ('adm', 'Administración'),
        ('ope', 'Operaciones'),
        ('rec', 'Reconocimiento'),
    )
    AREA_CHOICES = (
        ('', '------------'),
        ('administrativa', 'Administrativa'),
        ('operativa', 'Operativa'),
    )
    ESTATUS = (
        ('', '------------'),
        ('ven', 'VENCIDOS'),
        ('por', 'POR VENCER'),
    )

    agrupador = ChoiceField(
        label="Agrupador",
        choices=AGRUPADOR_CHOICES,
        widget=Select(
            attrs={'class': 'select2 nova-select2'}
        )
    )
    area = ChoiceField(
        label="Area",
        choices=AREA_CHOICES,
        widget=Select(
            attrs={'class': 'select2 nova-select2'}
        )
    )
    numero_empleado = ChoiceField(
        label="Numero de empleado",
        widget=Select(
            attrs={'class': 'select2 nova-select2'}
        )
    )
    asig_organizacion_clave = ChoiceField(
        label="Organización",
        widget=Select(
            attrs={'class': 'select2 nova-select2'}
        )
    )
    curso = ChoiceField(
        label="Curso",
        widget=Select(
            attrs={'class': 'select2 nova-select2'}
        )
    )
    estatus = ChoiceField(
        label="Vencimiento",
        choices=ESTATUS,
        widget=Select(attrs={'class': 'select2 nova-select2'}
                      )
    )
    proveedor = ChoiceField(
        label="Proveedor",
        widget=Select(attrs={'class': 'select2 nova-select2'}
                      )
    )

    def __init__(self, *args, **kwargs):
        super(DocCapacitacionFilterForm, self).__init__(*args, **kwargs)
        self.fields[
            'asig_organizacion_clave'].choices = EmpleadoBusiness.get_Organizaciones()
        self.fields['asig_organizacion_clave'].required = False
        self.fields['curso'].choices = EmpleadoBusiness.get_Curso()
        self.fields['curso'].required = False
        self.fields['proveedor'].choices = EmpleadoBusiness.get_Proveedores()
        self.fields[
            'numero_empleado'].choices = EmpleadoBusiness.get_Empleados()


class NuevoDocumentoPersonalForm(Form):

    AGRUPADOR = (
        ('', '------------'),
        ('per', 'Personal'),
        ('qhse', 'QHSE'),
        ('amo', 'Amonestación'),
        ('adm', 'Administración'),
        ('ope', 'Operaciones'),
        ('rec', 'Reconocimiento'),
    )

    tipo_documento = ChoiceField(
        label="Tipo documento",
        widget=Select(
            attrs={'class': 'select2 nova-select2'}
        )
    )

    agrupador = ChoiceField(
        label="Agrupador",
        choices=AGRUPADOR,
        widget=Select(attrs={'class': 'select2 nova-select2'}))

    vigencia_inicio = DateField(
        label="Vigencia",
        widget=DateInput(format=('%d/%m/%Y'),
                         attrs={'class': 'form-control input-xs'}))
    vigencia_fin = DateField(
        widget=DateInput(format=('%d/%m/%Y'),
                         attrs={'class': 'form-control input-xs'}))

    archivo = FileField(
        label="Archivo",
        widget=ClearableFileInput(attrs={'class': 'dropzone dz-clickable dz-started', 'type': 'file', 'multiple': True}))

    def __init__(self, *args, **kwargs):
        super(NuevoDocumentoPersonalForm, self).__init__(*args, **kwargs)
        self.fields['vigencia_inicio'].required = False
        self.fields['vigencia_fin'].required = False
        self.fields[
            'tipo_documento'].choices = EmpleadoBusiness.get_TipoDocumento()


class NuevoDocumentoCapacitacionForm(Form):
    MODALIDAD = (
        ('', '------------'),
        ('pre', 'Curso presencial'),
        ('vir', 'Curso virtual'),
        ('prev', 'Curso previo'),
    )
    MONEDA = (
        ('', '------------'),
        ('mxn', 'Moneda nacional (MXN)'),
        ('usd', 'Dolares (USD)'),
        ('eur', 'Euro (EUR)'),
    )
    AREA = (
        ('', '------------'),
        ('ADMINISTRATIVA', 'Administrativa'),
        ('OPERATIVA', 'Operativa'),
    )
    AGRUPADOR = (
        ('', '------------'),
        ('per', 'Personal'),
        ('qhse', 'QHSE'),
        ('amo', 'Amonestación'),
        ('adm', 'Administración'),
        ('ope', 'Operaciones'),
        ('rec', 'Reconocimiento'),
    )

    curso = ChoiceField(
        label="Curso",
        widget=Select(attrs={'class': 'select2 nova-select2'}))

    proveedor = ChoiceField(
        label="Proveedor",
        widget=Select(attrs={'class': 'select2 nova-select2'}))

    agrupadorcap = ChoiceField(
        label="Agrupador",
        choices=AGRUPADOR,
        widget=Select(attrs={'class': 'select2 nova-select2'}))

    area = ChoiceField(
        label="Area",
        choices=AREA,
        widget=Select(attrs={'class': 'select2 nova-select2'}))

    modalidad = ChoiceField(
        label="Modalidad",
        choices=MODALIDAD,
        widget=Select(attrs={'class': 'select2 nova-select2'}))

    lugar = CharField(
        label="Lugar",
        widget=TextInput(attrs={'class': 'form-control input-xs'}))

    costo = CharField(
        label="Costo",
        widget=TextInput(attrs={'class': 'form-control input-xs'}))

    moneda = ChoiceField(
        label="Moneda",
        choices=MONEDA,
        widget=Select(attrs={'class': 'select2 nova-select2'}))

    departamento = ChoiceField(
        label="Departamento",
        widget=Select(attrs={'class': 'select2 nova-select2'}))

    fecha_inicio = DateField(
        label="Vigencia",
        widget=DateInput(format=('%d/%m/%Y'),
                         attrs={'class': 'form-control input-xs'}))
    fecha_fin = DateField(
        widget=DateInput(format=('%d/%m/%Y'),
                         attrs={'class': 'form-control input-xs'}))

    duracion = CharField(
        label="Duración(hrs)",
        widget=TextInput(attrs={'class': 'form-control input-xs'}))

    observaciones = CharField(
        label="Observaciones",
        widget=TextInput(attrs={'class': 'form-control input-xs'}))

    archivocap = FileField(
        label="Archivo",
        widget=ClearableFileInput(attrs={'class': 'dropzone dz-clickable dz-started', 'type': 'file', 'multiple':True }))

    def __init__(self, *args, **kwargs):
        super(NuevoDocumentoCapacitacionForm, self).__init__(*args, **kwargs)

        self.fields[
            'departamento'].choices = EmpleadoBusiness.get_Organizaciones()
        self.fields['proveedor'].choices = EmpleadoBusiness.get_Proveedores()
        self.fields['curso'].choices = EmpleadoBusiness.get_Curso()


class PerfilAgregarPuestoCargoForm(Form):

    desc_puesto2 = ChoiceField(label='Puesto', widget=Select(
        attrs={'class': 'select2 nova-select2'}))

    def __init__(self, *args, **kwargs):
        super(PerfilAgregarPuestoCargoForm, self).__init__(
            *args, **kwargs)
        self.fields['desc_puesto2'].choices = self.get_Puestos()
        # self.fields['zona'].choices = self.get_Zonas()

    def get_Puestos(self):

        valores = [('', '-------')]

        puestos = VIEW_PUESTOS.objects.using('ebs_d').all()

        for puesto in puestos:

            valores.append(
                (
                    str(int(puesto.clave_puesto)) + ' - ' + puesto.desc_puesto,
                    # puesto.clave_puesto,
                    str(int(puesto.clave_puesto)) + ' - ' + puesto.desc_puesto,
                )
            )
        return valores


class PerfilPuestoListaForm(Form):

    TIPO_ESTUDIOS = (
        ('ind', 'Indistinto'),
        ('sol', 'Soltero'),
        ('cas', 'Casado'),
        ('uni', 'Union Libre'),
        ('viu', 'Viudo'),
        ('div', 'Divorciado'),
    )

    asig_puesto_clave = ChoiceField(widget=Select(
        attrs={'class': 'select2 nova-select2'}))

    class Meta:
        model = PerfilPuestoDocumento

        fields = [
            'asig_puesto_clave',
            'nivel_estudio',
            'reporta',
            'areas_experiencia_id',
            'departamento',
        ]

        labels = {
            'asig_puesto_clave': 'Puesto:',
            'nivel_estudio': 'Nivel Estudio :',
            'reporta': 'Reporta :',
            'areas_experiencia_id': 'Areas_experiencia :',
            'departamento': 'Departamento:',
        }

    asig_puesto_clave = ChoiceField(label='Puesto', widget=Select(
        attrs={'class': 'select2 nova-select2'}))

    reporta = ChoiceField(label='Reporta', widget=Select(
        attrs={'class': 'select2 nova-select2'}))

    nivel_estudio = ChoiceField(
        label="Nivel de Estudios",
        choices=TIPO_ESTUDIOS,
        widget=Select(
            attrs={'class': 'select2 nova-select2'}
        )
    )

    def __init__(self, *args, **kwargs):
        super(PerfilPuestoListaForm, self).__init__(
            *args, **kwargs)
        self.fields['reporta'].choices = self.get_Puestos()
        self.fields['asig_puesto_clave'].choices = self.get_Puestos()

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
