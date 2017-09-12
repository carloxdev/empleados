# -*- coding: utf-8 -*-
# Librerias/Clases Python
from __future__ import unicode_literals

from django.db.models.signals import pre_delete
from django.dispatch import receiver
from django.conf import settings
import os
from datetime import timedelta

# Librerias/Clases de Terceros
from simple_history.models import HistoricalRecords

# Librerias/Clases Django
from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericRelation

# Modelos
from seguridad.models import Profile
from ebs.models import VIEW_EMPLEADOS_FULL

# Utilidades:
from utilities import get_FilePath_Expedientes


class PerfilPuestosCargo(models.Model):

    id_puesto = models.CharField(max_length=144, null=True, blank=True)
    id_puesto_cargo = models.CharField(max_length=144, null=True, blank=True)
    descripcion = models.CharField(max_length=144, null=True, blank=True)

    created_by = models.ForeignKey(Profile, related_name='pp_created_by')
    created_date = models.DateTimeField(
        auto_now=False,
        auto_now_add=True
    )
    updated_by = models.ForeignKey(
        Profile, related_name='pp_updated_by', null=True, blank=True)
    updated_date = models.DateTimeField(
        auto_now=True,
        auto_now_add=False,
        null=True,
        blank=True
    )
    ##history = HistoricalRecords()

    def __unicode__(self):
        cadena = "%s - %s" % (self.id_puesto, self.descripcion)
        return cadena

    def __str__(self):
        cadena = "%s - %s" % (self.id_puesto, self.descripcion)
        return cadena

    class Meta:
        verbose_name_plural = "Perfil - Puestos a Cargo"


class PerfilExperencia(models.Model):

    descripcion = models.CharField(max_length=144, null=True, blank=True)
    anios = models.CharField(max_length=3, null=True, blank=True)

    created_by = models.ForeignKey(Profile, related_name='pexp_created_by')
    created_date = models.DateTimeField(
        auto_now=False,
        auto_now_add=True
    )
    updated_by = models.ForeignKey(
        Profile, related_name='pexp_updated_by', null=True, blank=True)
    updated_date = models.DateTimeField(
        auto_now=True,
        auto_now_add=False,
        null=True,
        blank=True
    )
    history = HistoricalRecords()

    def __unicode__(self):
        cadena = "%s - %s" % (self.id, self.descripcion)
        return cadena

    def __str__(self):
        cadena = "%s - %s" % (self.id, self.descripcion)
        return cadena

    class Meta:
        verbose_name_plural = "Areas de Experiencia"


class PerfilCompetencias(models.Model):

    OPCIONES = (
        ('adm', 'Administrativas'),
        ('tec', 'Tecnicas'),
    )

    tipo_competencia = models.CharField(
        choices=OPCIONES,
        default="adm",
        max_length=3
    )

    id_puesto = models.CharField(max_length=144)
    cve_descripcion = models.CharField(max_length=10, null=True, blank=True)
    #id_descripcion = models.CharField(max_length=10)

    descripcion = models.CharField(max_length=144, null=True, blank=True)
    porcentaje = models.IntegerField(default=0)

    created_by = models.ForeignKey(Profile, related_name='pper_created_by')
    created_date = models.DateTimeField(
        auto_now=False,
        auto_now_add=True,
    )
    updated_by = models.ForeignKey(
        Profile, related_name='pper_updated_by', null=True, blank=True)
    updated_date = models.DateTimeField(
        auto_now=True,
        auto_now_add=False,
        null=True,
        blank=True
    )
    history = HistoricalRecords()

    def __unicode__(self):
        cadena = "%s - %s" % (self.id, self.descripcion)
        return cadena

    def __str__(self):
        cadena = "%s - %s" % (self.id, self.descripcion)
        return cadena

    class Meta:
        verbose_name_plural = "Perfil Competencias"


class PerfilPuestoDocumento(models.Model):

    GENERO_OPCIONES = (
        ('ind', 'Indistinto'),
        ('hom', 'Hombre'),
        ('muj', 'Mujer'),
    )

    ESTADO_OPCIONES = (
        ('ind', 'Indistinto'),
        ('sol', 'Soltero'),
        ('cas', 'Casado'),
        ('uni', 'Union Libre'),
        ('viu', 'Viudo'),
        ('div', 'Divorciado'),
    )

    empleado_puesto_desc = models.CharField(max_length=144)
    asig_puesto_clave = models.CharField(max_length=144)
    reporta = models.CharField(max_length=144, null=True, blank=True)
    objetivo = models.CharField(max_length=144, null=True, blank=True)
    funciones = models.CharField(max_length=144, null=True, blank=True)
    responsabilidades = models.CharField(max_length=144, null=True, blank=True)
    reporte = models.CharField(max_length=144, null=True, blank=True)
    posicion = models.CharField(max_length=144)
    puesto_acargo = models.ForeignKey(
        PerfilPuestosCargo, blank=True, null=True)
    edad_minima = models.CharField(max_length=10, blank=True)
    edad_maxima = models.CharField(max_length=10, blank=True)
    nivel_estudio = models.CharField(max_length=144, blank=True)
    estado_civil = models.CharField(
        choices=ESTADO_OPCIONES,
        default="ind",
        max_length=3
    )
    genero = models.CharField(
        choices=GENERO_OPCIONES,
        default="ind",
        max_length=3
    )
    cambio_residencia = models.BooleanField(default=False)
    disponibilidad_viajar = models.BooleanField(default=False)
    requerimentos = models.CharField(max_length=144,  blank=True, null=True)
    areas_experiencia = models.ForeignKey(PerfilExperencia, blank=True, null=True)
    proposito = models.CharField(max_length=144, blank=True)

   

    def __unicode__(self):
        cadena = "%s" % (self.id)
        return cadena

    def __str__(self):
        cadena = "%s" % (self.id)
        return cadena

    class Meta:
        verbose_name_plural = "Documentos de Perfiles de Puestos"



class Curso(models.Model):

    nombre_curso = models.CharField(max_length=255)
    vencimiento = models.CharField(max_length=30)

    created_by = models.ForeignKey(Profile, related_name='curso_created_by')
    created_date = models.DateTimeField(
        auto_now=False,
        auto_now_add=True
    )
    updated_by = models.ForeignKey(
        Profile, related_name='curso_updated_by', null=True, blank=True)
    updated_date = models.DateTimeField(
        auto_now=True,
        auto_now_add=False,
        null=True,
        blank=True
    )

    def __unicode__(self):
        cadena = "%s" % (self.nombre_curso)
        return cadena

    def __str__(self):
        cadena = "%s" % (self.nombre_curso)
        return cadena

    class Meta:
        verbose_name_plural = "Cursos"


class TipoDocumento(models.Model):
    AGRUPADOR = (
        ('per', 'Personal'),
        ('med', 'Medico'),
        ('amo', 'Faltas al reglamento'),
        ('adm', 'Documentos Administrativos'),
        ('gra', 'Grados Academicos'),
        ('com', 'Comprobantes laborales'),
        ('cre', 'Credenciales'),
        ('equ', 'Equipo Asignado'),
    )
    tipo_documento = models.CharField(max_length=255)
    agrupador = models.CharField(
        choices=AGRUPADOR,
        default="per",
        max_length=10
    )
    created_by = models.ForeignKey(
        Profile, related_name='tipodocper_created_by')
    created_date = models.DateTimeField(
        auto_now=False,
        auto_now_add=True
    )
    updated_by = models.ForeignKey(
        Profile, related_name='tipodocper_updated_by', null=True, blank=True)
    updated_date = models.DateTimeField(
        auto_now=True,
        auto_now_add=False,
        null=True,
        blank=True
    )

    def __unicode__(self):
        cadena = "%s" % (self.tipo_documento)
        return cadena

    def __str__(self):
        cadena = "%s" % (self.tipo_documento)
        return cadena

    class Meta:
        verbose_name_plural = "Tipo de documento personal"


class Archivo(models.Model):
    TIPO = (
        ('per', 'Personal'),
        ('cap', 'Capacitacion'),
        ('sol', 'Solicitud'),
    )

    tipo_archivo = models.CharField(
        choices=TIPO,
        default="per",
        max_length=3)
    archivo = models.FileField(
        upload_to=get_FilePath_Expedientes
    )
    content_type = models.ForeignKey(
        ContentType, on_delete=models.CASCADE,
        related_name='content_type')
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')

    created_by = models.ForeignKey(
        Profile, related_name='archcap_created_by')
    created_date = models.DateTimeField(
        auto_now=False,
        auto_now_add=True
    )
    updated_by = models.ForeignKey(
        Profile, related_name='archcap_updated_by', null=True, blank=True)
    updated_date = models.DateTimeField(
        auto_now=True,
        auto_now_add=False,
        null=True,
        blank=True
    )

    def __unicode__(self):
        cadena = "%s" % (self.id)
        return cadena

    def __str__(self):
        cadena = "%s" % (self.id)
        return cadena

    class Meta:
        verbose_name_plural = "Archivos"


class DocumentoPersonal(models.Model):

    numero_empleado = models.CharField(max_length=6)
    tipo_documento = models.ForeignKey(TipoDocumento)
    vigencia_inicio = models.DateField(null=True, blank=True)
    vigencia_fin = models.DateField(null=True, blank=True)
    relacion = GenericRelation(Archivo, related_query_name='relacion_personal')

    created_by = models.ForeignKey(Profile, related_name='docper_created_by')
    created_date = models.DateTimeField(
        auto_now=False,
        auto_now_add=True
    )

    def _get_organizacion(self):
        try:
            empleado = VIEW_EMPLEADOS_FULL.objects.using('ebs_p').filter(
                pers_empleado_numero=self.numero_empleado)
            for dato in empleado:
                return dato.asig_organizacion_desc
        except Exception:
            return 0.0
    organizacion = property(_get_organizacion)

    def _get_nombre_completo(self):
        try:
            empleado = VIEW_EMPLEADOS_FULL.objects.using('ebs_p').filter(
                pers_empleado_numero=self.numero_empleado)
            for dato in empleado:
                return dato.pers_nombre_completo
        except Exception:
            return 0.0
    nombre_completo = property(_get_nombre_completo)

    def __unicode__(self):
        cadena = "%s" % (self.numero_empleado)
        return cadena

    def __str__(self):
        cadena = "%s" % (self.numero_empleado)
        return cadena

    class Meta:
        verbose_name_plural = "Documento Personal"


class DocumentoCapacitacion(models.Model):
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
    AGRUPADOR = (
        ('per', 'Personal'),
        ('qhse', 'QHSE'),
        ('amo', 'Amonestación'),
        ('adm', 'Administración'),
        ('ope', 'Operaciones'),
        ('rec', 'Reconocimiento'),
    )

    numero_empleado = models.IntegerField(default=0)
    curso = models.ForeignKey(Curso, on_delete=models.PROTECT)
    proveedor = models.CharField(max_length=255)  # Sacar de jde
    modalidad = models.CharField(
        choices=MODALIDAD,
        default="pre",
        max_length=4
    )
    lugar = models.CharField(max_length=250)
    costo = models.DecimalField(max_digits=14, decimal_places=2)
    moneda = models.CharField(
        choices=MONEDA,
        default="mxn",
        max_length=3
    )
    departamento = models.CharField(max_length=250)
    fecha_inicio = models.DateField(auto_now=False)
    fecha_fin = models.DateField(auto_now=False)
    duracion = models.IntegerField()
    observaciones = models.CharField(max_length=100)
    agrupador = models.CharField(
        choices=AGRUPADOR,
        default="per",
        max_length=20
    )
    area = models.CharField(max_length=50, default='administrativa')
    relacion = GenericRelation(
        Archivo, related_query_name='relacion_capacitacion')

    created_by = models.ForeignKey(Profile, related_name='doccap_created_by')
    created_date = models.DateTimeField(
        auto_now=False,
        auto_now_add=True
    )

    def _get_fecha_vencimiento(self):
        try:
            fecha = self.fecha_fin
            duracion = self.curso.vencimiento

            if (duracion == '*') or (duracion == 'Ind'):
                return 'Indefinido'
            else:
                dias = int(duracion) * 365
                resultado = fecha + timedelta(days=dias)
                return resultado
        except Exception:
            return 0.0
    fecha_vencimiento = property(_get_fecha_vencimiento)

    def _get_organizacion(self):
        try:
            empleado = VIEW_EMPLEADOS_FULL.objects.using('ebs_p').filter(
                pers_empleado_numero=self.numero_empleado)
            for dato in empleado:
                return dato.asig_organizacion_desc
        except Exception:
            return 0.0
    organizacion = property(_get_organizacion)

    def _get_nombre_completo(self):
        try:
            empleado = VIEW_EMPLEADOS_FULL.objects.using('ebs_p').filter(
                pers_empleado_numero=self.numero_empleado)
            for dato in empleado:
                return dato.pers_nombre_completo
        except Exception:
            return 0.0
    nombre_completo = property(_get_nombre_completo)

    def __unicode__(self):
        cadena = "%s" % (self.numero_empleado)
        return cadena

    def __str__(self):
        cadena = "%s" % (self.numero_empleado)
        return cadena

    class Meta:
        verbose_name_plural = "Documento Capacitacion"


@receiver(pre_delete, sender=Archivo)
def _directorios_delete(sender, instance, using, **kwargs):
    file_path = settings.BASE_DIR + "/media/" + "%s" % (instance.archivo)

    if os.path.isfile(file_path):
        os.remove(file_path)
