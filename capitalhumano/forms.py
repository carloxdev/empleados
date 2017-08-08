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
from django.forms import CheckboxInput
from django.forms import FileInput
from django.forms import DateInput
from django.forms import DateField
from django.forms import FileField
from django.forms import ModelChoiceField

# Modelos
from jde.models import VIEW_UNIDADES
from ebs.models import VIEW_TIPO_PERSONAS
from ebs.models import VIEW_PUESTOS
from ebs.models import VIEW_ORGANIZACIONES
from administracion.models import Empresa
from capitalhumano.models import PerfilPuestoDocumento
from .models import Curso
from .models import TipoDocumento


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
            attrs={'name': 'fecha_contratacion', 'class': 'form-control input-xs', 'readonly': ''}
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
        ('', '---------'),
        ('1120', 'ADMINISTRATIVO'),
        ('1123', 'EX-EMPLEADO'),
        ('1124', 'EX-EMPLEADO Y CANDIDATO'),
        ('1125', 'CONTACTO'),
        ('1118', 'CANDIDATO'),
    )
    GRADO_ACADEMICO_CHOICES = (
        ('', '---------'),
        ('1', 'NINGUNA'),
        ('2', 'LEER Y ESCRIBIR'),
        ('3', 'PRIMARIA'),
        ('4', 'SECUNDARIA'),
        ('5', 'TECNICA'),
        ('6', 'BACHILLERATO'),
        ('7', 'LICENCIATURA'),
        ('8', 'MAESTRIA'),
        ('9', 'DOCTORADO'),
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
        label="Unidad de negocio(JDE)",
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
    # ----------
    tipo_documento = ChoiceField(
        label="Tipo documento",
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
    grado_academico = ChoiceField(
        label="Grado academico",
        choices=GRADO_ACADEMICO_CHOICES,
        widget=Select(
            attrs={'class': 'select2 nova-select2'}
        )
    )
    disciplina_academica = ChoiceField(
        label="Disciplina academica",
        widget=Select(
            attrs={'class': 'select2 nova-select2'}
        )
    )

    def __init__(self, *args, **kwargs):
        super(ExpedientesFilterForm, self).__init__(*args, **kwargs)
        self.fields[
            'asig_organizacion_clave'].choices = self.get_Organizaciones()
        self.fields['tipo_documento'].choices = self.get_TipoDocumento()
        self.fields['curso'].choices = self.get_Curso()

    def get_Organizaciones(self):
        valores = [('', '------------')]

        organizaciones = VIEW_ORGANIZACIONES.objects.using('ebs_d').all()
        for organizacion in organizaciones:

            valores.append(
                (
                    organizacion.clave_org,
                    organizacion.desc_org
                )
            )
        return valores

    def get_TipoDocumento(self):
        valores = [('', '------------')]

        documentos = TipoDocumento.objects.all()
        for documento in documentos:

            valores.append(
                (
                    documento.id,
                    documento.tipo_documento
                )
            )
        return valores

    def get_Curso(self):
        valores = [('', '------------')]

        cursos = Curso.objects.all()
        for curso in cursos:

            valores.append(
                (
                    curso.id,
                    curso.nombre_curso
                )
            )
        return valores


# class ExpedientesDocFilterForm(Form):

#     tipo_documento = ChoiceField(
#         label="Tipo documento",
#         widget=Select(
#             attrs={'class': 'select2 nova-select2'}
#         )
#     )
#     curso = ChoiceField(
#         label="Curso",
#         widget=Select(
#             attrs={'class': 'select2 nova-select2'}
#         )
#     )
#     grado_academico = ChoiceField(
#         label="Curso",
#         widget=Select(
#             attrs={'class': 'select2 nova-select2'}
#         )
#     )
#     disciplina_academica = ChoiceField(
#         label="Disciplina academica",
#         widget=Select(
#             attrs={'class': 'select2 nova-select2'}
#         )
#     )


class NuevoDocumentoPersonalForm(Form):

    AGRUPADOR = (
        ('per', 'Personal'),
        ('qhse', 'QHSE'),
        ('amo', 'Amonestación'),
        ('adm', 'Administración'),
        ('ope', 'Operaciones'),
        ('rec', 'Reconocimiento'),
    )

    tipo_documento = ModelChoiceField(
        label="Tipo de documento",
        queryset=TipoDocumento.objects.all(),
        empty_label=None,
        widget=Select(attrs={'class': 'select2 nova-select2'}))

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
        widget=FileInput(attrs={'class': 'dropzone dz-clickable dz-started', 'type': 'file'}))

    def __init__(self, *args, **kwargs):
        super(NuevoDocumentoPersonalForm, self).__init__(*args, **kwargs)
        self.fields['vigencia_inicio'].required = False
        self.fields['vigencia_fin'].required = False


class NuevoDocumentoCapacitacionForm(Form):
    MODALIDAD = (
        ('pre', 'Curso presencial'),
        ('vir', 'Curso virtual'),
        ('prev', 'Curso previo'),
    )
    MONEDA = (
        ('mxn', 'Moneda nacional (MXN)'),
        ('usd', 'Dolares (USD)'),
        ('eur', 'Euro (EUR)'),
    )
    AREA = (
        ('administrativa', 'Administrativa'),
        ('operativa', 'Operativa'),
    )
    AGRUPADOR = (
        ('per', 'Personal'),
        ('qhse', 'QHSE'),
        ('amo', 'Amonestación'),
        ('adm', 'Administración'),
        ('ope', 'Operaciones'),
        ('rec', 'Reconocimiento'),
    )

    curso = ModelChoiceField(
        label="Curso",
        queryset=Curso.objects.all(),
        empty_label=None,
        widget=Select(attrs={'class': 'select2 nova-select2'}))

    proveedor = CharField(
        label="Proveedor",
        widget=TextInput(attrs={'class': 'form-control input-xs'}))

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
        label="Duración",
        widget=TextInput(attrs={'class': 'form-control input-xs'}))

    observaciones = CharField(
        label="Observaciones",
        widget=TextInput(attrs={'class': 'form-control input-xs'}))

    archivocap = FileField(
        label="Archivo",
        widget=FileInput(attrs={'class': 'dropzone dz-clickable dz-started'}))

    def __init__(self, *args, **kwargs):
        super(NuevoDocumentoCapacitacionForm, self).__init__(*args, **kwargs)
        self.fields['departamento'].choices = self.get_Organizaciones()

    def get_Organizaciones(self):
        valores = []

        organizaciones = VIEW_ORGANIZACIONES.objects.using('ebs_d').all()
        for organizacion in organizaciones:
            valores.append(
                (
                    organizacion.desc_org,
                    organizacion.desc_org
                )
            )
        return valores
