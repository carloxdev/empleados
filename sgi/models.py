# -*- coding: utf-8 -*-

# Librerias/Clases Python
from __future__ import unicode_literals

# Librerias/Clases Django
from django.db import models

# Librerias/Clases de Terceros
from simple_history.models import HistoricalRecords

# Librerias/Clases propias
from seguridad.models import Profile
from home.utilidades import get_FilePath


class CentroAtencion(models.Model):

    descripcion = models.CharField(max_length=144)

    created_by = models.ForeignKey(Profile, related_name='cta_created_by')
    created_date = models.DateTimeField(
        auto_now=False,
        auto_now_add=True,
    )
    updated_by = models.ForeignKey(Profile, related_name='cta_updated_by', null=True)
    updated_date = models.DateTimeField(
        auto_now=True,
        auto_now_add=False,
        null=True,
        blank=True
    )
    history = HistoricalRecords()


class IncidenciaTipos(models.Model):

    descripcion = models.CharField(max_length=144)

    created_by = models.ForeignKey(Profile, related_name='tpi_created_by')
    created_date = models.DateTimeField(
        auto_now=False,
        auto_now_add=True,
    )
    updated_by = models.ForeignKey(Profile, related_name='tpi_updated_by', null=True)
    updated_date = models.DateTimeField(
        auto_now=True,
        auto_now_add=False,
        null=True,
        blank=True
    )
    history = HistoricalRecords()


class IncidenciaDocumento(models.Model):

    STATUS_OPCIONES = (
        ('abi', 'Abierto'),
        ('cer', 'Cerrado'),
        ('pro', 'Proceso'),
        ('can', 'Cancelado'),
    )

    tipo = models.ForeignKey(IncidenciaTipos)
    descripcion = models.CharField(max_length=144)
    registrable = models.BooleanField(default=False)
    fecha = models.DateTimeField()
    empleado_id = models.IntegerField(default=0)
    empleado_nombre = models.CharField(max_length=144)
    empleado_zona = models.CharField(max_length=144)
    empleado_proyecto = models.CharField(max_length=50)
    empleado_proyecto_desc = models.CharField(max_length=144)
    empleado_puesto = models.IntegerField(default=0)
    empleado_puesto_desc = models.CharField(max_length=144)
    empleado_un = models.CharField(max_length=144)
    empleado_organizacion = models.CharField(max_length=144)
    area_id = models.IntegerField(default=0)
    area_descripcion = models.CharField(max_length=144)
    lugar = models.CharField(max_length=144)
    dias_incapcidad = models.IntegerField(default=0)
    centro_atencion = models.ForeignKey(CentroAtencion, blank=True, null=True)
    acr = models.BooleanField(default=False, blank=True)
    status = models.CharField(
        choices=STATUS_OPCIONES,
        default="abi",
        max_length=3
    )

    created_by = models.ForeignKey(Profile, related_name='dci_created_by')
    created_date = models.DateTimeField(
        auto_now=False,
        auto_now_add=True
    )
    updated_by = models.ForeignKey(Profile, related_name='dci_updated_by', null=True)
    updated_date = models.DateTimeField(
        auto_now=True,
        auto_now_add=False,
        null=True,
        blank=True
    )
    history = HistoricalRecords()


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
        upload_to=get_FilePath
    )

    created_by = models.ForeignKey(Profile, related_name='iar_created_by')
    created_date = models.DateTimeField(
        auto_now=False,
        auto_now_add=True
    )
    updated_by = models.ForeignKey(Profile, related_name='iar_updated_by', null=True)
    updated_date = models.DateTimeField(
        auto_now=True,
        auto_now_add=False,
        null=True,
        blank=True
    )


class ResolucionTipo(models.Model):

    descripcion = models.CharField(max_length=144)

    created_by = models.ForeignKey(Profile, related_name='ret_created_by')
    created_date = models.DateTimeField(
        auto_now=False,
        auto_now_add=True,
    )
    updated_by = models.ForeignKey(Profile, related_name='ret_updated_by', null=True)
    updated_date = models.DateTimeField(
        auto_now=True,
        auto_now_add=False,
        null=True,
        blank=True
    )
    history = HistoricalRecords()


class IncidenciaResolucion(models.Model):

    incidencia = models.ForeignKey(IncidenciaDocumento)
    mensaje = models.TextField(blank=True, null=True)
    tipo = models.ForeignKey(ResolucionTipo, null=True, blank=True)

    created_by = models.ForeignKey(Profile, related_name='ire_created_by')
    created_date = models.DateTimeField(
        auto_now=False,
        auto_now_add=True,
    )
    updated_by = models.ForeignKey(Profile, related_name='ire_updated_by', null=True)
    updated_date = models.DateTimeField(
        auto_now=True,
        auto_now_add=False,
        null=True,
        blank=True
    )
    history = HistoricalRecords()


class ResolucionArchivo(models.Model):

    resolucion = models.ForeignKey(IncidenciaResolucion)

    archivo = models.FileField(
        upload_to=get_FilePath
    )

    created_by = models.ForeignKey(Profile, related_name='rar_created_by')
    created_date = models.DateTimeField(
        auto_now=False,
        auto_now_add=True
    )
    updated_by = models.ForeignKey(Profile, related_name='rar_updated_by', null=True)
    updated_date = models.DateTimeField(
        auto_now=True,
        auto_now_add=False,
        null=True,
        blank=True
    )
