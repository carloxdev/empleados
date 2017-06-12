# -*- coding: utf-8 -*-

# Librerias/Clases Python
from __future__ import unicode_literals

# Librerias/Clases Django
from django.db import models

# Librerias/Clases propias
from seguridad.models import Profile

# Librerias/Clases de Terceros
from simple_history.models import HistoricalRecords

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
    reporta = models.CharField(max_length=144)
    proposito = models.CharField(max_length=144)
    funciones = models.CharField(max_length=144)
    responsabilidades = models.CharField(max_length=144)
    reporte = models.CharField(max_length=144)
    edad_minima = models.CharField(max_length=10)
    edad_maxima = models.CharField(max_length=10)
    nivel_estudio = models.CharField(max_length=144)
    estado_civil = models.CharField(
        choices= ESTADO_OPCIONES,
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
