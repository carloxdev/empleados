# -*- coding: utf-8 -*-
# Librerias/Clases Python
from __future__ import unicode_literals

from django.db.models.signals import pre_delete
from django.dispatch import receiver
from django.conf import settings
import os

# Librerias/Clases Django
from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericRelation

# Librerias/Clases propias
from seguridad.models import Profile

# Utilidades:
from utilities import get_FilePath_Expedientes


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
    asig_puesto_clave = models.CharField(max_length=144, default=True)
    reporta = models.CharField(max_length=144)
    proposito = models.CharField(max_length=144)
    funciones = models.CharField(max_length=144)
    responsabilidades = models.CharField(max_length=144)
    reporte = models.CharField(max_length=144)
    edad_minima = models.CharField(max_length=10)
    edad_maxima = models.CharField(max_length=10)
    nivel_estudio = models.CharField(max_length=144)
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
    requerimentos = models.CharField(max_length=144)

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
    tipo_documento = models.CharField(max_length=255)

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
    )

    tipo_archivo = models.CharField(
        choices=TIPO,
        default="per",
        max_length=3)
    archivo = models.FileField(
        upload_to=get_FilePath_Expedientes
    )

    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
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

    AGRUPADOR = (
        ('per', 'Personal'),
        ('qhse', 'QHSE'),
        ('amo', 'Amonestación'),
        ('adm', 'Administración'),
        ('ope', 'Operaciones'),
        ('rec', 'Reconocimiento'),
    )

    numero_empleado = models.CharField(max_length=6)
    tipo_documento = models.ForeignKey(TipoDocumento)  # Catalogo
    agrupador = models.CharField(
        choices=AGRUPADOR,
        default="per",
        max_length=20
    )
    vigencia_inicio = models.DateField(null=True, blank=True)
    vigencia_fin = models.DateField(null=True, blank=True)
    relacion = GenericRelation(Archivo, related_query_name='relacion_personal')

    created_by = models.ForeignKey(Profile, related_name='docper_created_by')
    created_date = models.DateTimeField(
        auto_now=False,
        auto_now_add=True
    )

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
    file_path = settings.BASE_DIR + "/media/" + str(instance.archivo)
    print(file_path)

    if os.path.isfile(file_path):
        os.remove(file_path)
