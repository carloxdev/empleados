# -*- coding: utf-8 -*-

# Librerias/Clases Python
from __future__ import unicode_literals

# Librerias/Clases Django
from django.db import models

# Librerias/Clases de Terceros
from simple_history.models import HistoricalRecords

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
    asig_puesto_clave = models.CharField(max_length=144)
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


class Cursos(models.Model):

    descripcion = models.CharField(max_length=255)
    vencimiento = models.CharField(max_length=30)
    created_by = models.ForeignKey(Profile, related_name='curexp_created_by')
    created_date = models.DateTimeField(
        auto_now=False,
        auto_now_add=True
    )
    updated_by = models.ForeignKey(Profile, related_name='curexp_updated_by', null=True, blank=True)
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
        verbose_name_plural = "Cursos"  


class ExpedienteDocumento(models.Model):

    doc_nombre = models.CharField(max_length=250)
    doc_idempleado = models.IntegerField(default=0)
    doc_tipo = models.CharField(max_length=80)
    doc_subtipo = models.CharField(max_length=255)
    doc_agrupador = models.CharField(max_length=255)
    doc_ruta = models.FileField(
        upload_to=get_FilePath_Expedientes
    )
    doc_mes = models.CharField(max_length=3)
    doc_anio = models.IntegerField(default=0, blank=True)
    doc_descripcion = models.CharField(max_length=255)
    doc_created_by = models.ForeignKey(Profile, related_name='docexp_created_by')
    doc_created_date = models.DateTimeField(
            auto_now=False,
            auto_now_add=True
        )
    doc_id_curso = models.ForeignKey(Cursos, on_delete=models.PROTECT)
    doc_id_capacitacion = models.CharField(max_length=50)
    doc_fecha_ini_vig = models.DateTimeField()
    doc_fecha_fin_vig = models.DateTimeField()

    doc_updated_by = models.ForeignKey(Profile, related_name='docexp_updated_by', null=True, blank=True)
    doc_updated_date = models.DateTimeField(
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
        verbose_name_plural = "Documentos de Expedientes Empleados"  



class TipoDocumentoPersonal(models.Model):

    descripcion = models.CharField(max_length=255)
    created_by = models.ForeignKey(Profile, related_name='tipodocper_created_by')
    created_date = models.DateTimeField(
        auto_now=False,
        auto_now_add=True
    )
    updated_by = models.ForeignKey(Profile, related_name='tipodocper_updated_by', null=True, blank=True)
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
        verbose_name_plural = "Tipo Documento Personal"  

