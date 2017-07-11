# -*- coding: utf-8 -*-

# Librerias/Clases Python
from __future__ import unicode_literals

# Librerias/Clases Django
from django.db import models

# Librerias/Clases de Terceros
from simple_history.models import HistoricalRecords

# Librerias/Clases propias
from seguridad.models import Profile
from administracion.models import Zona
from administracion.models import Empresa

# Validadores:
from home.validators import valid_extension
from home.validators import validate_image

# Utilidades:
from utilities import get_FilePath_Incidencia
from utilities import get_FilePath_Resolucion
from .validators import valid_extension


class CentroAtencion(models.Model):

    descripcion = models.CharField(max_length=144)

    created_by = models.ForeignKey(Profile, related_name='scta_created_by')
    created_date = models.DateTimeField(
        auto_now=False,
        auto_now_add=True,
    )
    updated_by = models.ForeignKey(Profile, related_name='scta_updated_by', null=True, blank=True)
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
        verbose_name_plural = "Centros de Atencion"


class IncidenciaTipo(models.Model):

    descripcion = models.CharField(max_length=144)

    created_by = models.ForeignKey(Profile, related_name='stpi_created_by')
    created_date = models.DateTimeField(
        auto_now=False,
        auto_now_add=True,
    )
    updated_by = models.ForeignKey(Profile, related_name='stpi_updated_by', null=True, blank=True)
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
        verbose_name_plural = "Tipos de Incidencia"


class IncidenciaDocumento(models.Model):

    STATUS_OPCIONES = (
        ('abi', 'Abierto'),
        ('cer', 'Cerrado'),
        ('pro', 'Proceso'),
        ('can', 'Cancelado'),
    )

    tipo = models.ForeignKey(IncidenciaTipo, on_delete=models.PROTECT)
    es_registrable = models.BooleanField(default=False)
    fecha = models.DateTimeField()
    empleado_id = models.IntegerField(default=0)
    empleado_nombre = models.CharField(max_length=144)
    zona = models.ForeignKey(Zona, on_delete=models.PROTECT, null=True)
    empleado_proyecto = models.CharField(max_length=50)
    empleado_proyecto_desc = models.CharField(max_length=144)
    empleado_puesto = models.IntegerField(default=0)
    empleado_puesto_desc = models.CharField(max_length=144)
    empleado_un = models.CharField(max_length=144)
    empresa = models.ForeignKey(Empresa, on_delete=models.PROTECT, null=True)
    area_id = models.IntegerField(default=0)
    area_descripcion = models.CharField(max_length=144)
    lugar = models.CharField(max_length=144)
    dias_incapcidad = models.IntegerField(default=0, blank=True)
    centro_atencion = models.ForeignKey(CentroAtencion, blank=True, null=True)
    tiene_acr = models.BooleanField(default=False, blank=True)
    status = models.CharField(
        choices=STATUS_OPCIONES,
        default="abi",
        max_length=3
    )

    created_by = models.ForeignKey(Profile, related_name='sdci_created_by')
    created_date = models.DateTimeField(
        auto_now=False,
        auto_now_add=True
    )
    updated_by = models.ForeignKey(Profile, related_name='sdci_updated_by', null=True, blank=True)
    updated_date = models.DateTimeField(
        auto_now=True,
        auto_now_add=False,
        null=True,
        blank=True
    )
    # history = HistoricalRecords()

    def __unicode__(self):
        cadena = "%s" % (self.id)
        return cadena

    def __str__(self):
        cadena = "%s" % (self.id)
        return cadena

    class Meta:
        verbose_name_plural = "Documentos de Incidencia"


class IncidenciaArchivo(models.Model):

    TIPO_OPCIONES = (
        ('alt', 'Alta'),
        ('mod', 'Modificacion'),
        ('seg', 'Seguimiento'),
    )

    incidencia = models.ForeignKey(IncidenciaDocumento)

    tipo = models.CharField(
        choices=TIPO_OPCIONES,
        default="abi",
        max_length=3
    )

    archivo = models.FileField(
        upload_to=get_FilePath_Incidencia, validators=[valid_extension]
    )

    created_by = models.ForeignKey(Profile, related_name='siar_created_by')
    created_date = models.DateTimeField(
        auto_now=False,
        auto_now_add=True
    )
    updated_by = models.ForeignKey(Profile, related_name='siar_updated_by', null=True, blank=True)
    updated_date = models.DateTimeField(
        auto_now=True,
        auto_now_add=False,
        null=True,
        blank=True
    )

    class Meta:
        verbose_name_plural = "Archivos de Incidencia"


class ResolucionTipo(models.Model):

    descripcion = models.CharField(max_length=144)

    created_by = models.ForeignKey(Profile, related_name='sret_created_by')
    created_date = models.DateTimeField(
        auto_now=False,
        auto_now_add=True,
    )
    updated_by = models.ForeignKey(Profile, related_name='sret_updated_by', null=True, blank=True)
    updated_date = models.DateTimeField(
        auto_now=True,
        auto_now_add=False,
        null=True,
        blank=True
    )
    history = HistoricalRecords()

    def __unicode__(self):
        cadena2 = "%s - %s" % (self.id, self.descripcion)
        return cadena2

    def __str__(self):
        cadena2 = "%s - %s" % (self.id, self.descripcion)
        return cadena2

    class Meta:
        verbose_name_plural = "Tipos de Resolucion"


class IncidenciaResolucion(models.Model):


    STATUS_OPCIONES = (
        ('abi', 'Abierto'),
        ('cer', 'Cerrado'),
        ('pro', 'Proceso'),
        ('can', 'Cancelado'),
    )

    incidencia = models.ForeignKey(IncidenciaDocumento)
    mensaje = models.TextField(blank=True, null=True)
    tipo = models.ForeignKey(ResolucionTipo, null=True, blank=True)
    status = models.CharField(
        choices=STATUS_OPCIONES,
        default="abi",
        max_length=3
    )

    created_by = models.ForeignKey(Profile, related_name='sire_created_by')
    created_date = models.DateTimeField(
        auto_now=False,
        auto_now_add=True,
    )
    updated_by = models.ForeignKey(Profile, related_name='sire_updated_by', null=True, blank=True)
    updated_date = models.DateTimeField(
        auto_now=True,
        auto_now_add=False,
        null=True,
        blank=True
    )
    history = HistoricalRecords()

    def __unicode__(self):
        cadena3 = "%s" % (self.tipo)
        return cadena3

    def __str__(self):
        cadena2 = "%s" % (self.tipo)
        return cadena2

    class Meta:
        verbose_name_plural = "Resoluciones"


class ResolucionArchivo(models.Model):

    resolucion = models.ForeignKey(IncidenciaResolucion)

    archivo = models.FileField(
        upload_to=get_FilePath_Resolucion
    )

    created_by = models.ForeignKey(Profile, related_name='srar_created_by')
    created_date = models.DateTimeField(
        auto_now=False,
        auto_now_add=True
    )
    updated_by = models.ForeignKey(Profile, related_name='srar_updated_by', null=True, blank=True)
    updated_date = models.DateTimeField(
        auto_now=True,
        auto_now_add=False,
        null=True,
        blank=True
    )

    class Meta:
        verbose_name_plural = "Archivos de resolucion"


class EmpleadosZona(models.Model):

    totalempleado = models.IntegerField(default=0)
    incidencias_registrables = models.IntegerField(default=0)
    zona = models.ForeignKey(Zona, on_delete=models.PROTECT, null=True)
    anio = models.IntegerField(default=0)
    created_by = models.ForeignKey(Profile, related_name='xsempzon_created_by', null=True)
    created_date = models.DateTimeField(
        auto_now=False,
        auto_now_add=True,
        null=True,
        blank=True
    )
    updated_by = models.ForeignKey(Profile, related_name='xsempzon_updated_by', null=True)
    updated_date = models.DateTimeField(
        auto_now=True,
        auto_now_add=False,
        null=True,
        blank=True
    )


    class Meta:
        verbose_name_plural = "Empleados por Zona"

class VIEW_INCIDENCIAS_ZONA(models.Model):
    id = models.IntegerField(primary_key=True)
    trir = models.CharField(max_length=240)
    total_incidencias = models.CharField(max_length=240)
    descripcion = models.CharField(max_length=240)
    anio = models.CharField(max_length=240)
    totalempleado = models.CharField(max_length=240)

    class Meta:
        managed = False
        db_table = "VIEW_INCIDENCIAS_ZONA"      


