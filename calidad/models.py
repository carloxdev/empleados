# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Librerias Terceros:
# from simple_history.models import HistoricalRecords

# Otros Modelos:


class criterio(models.Model):

    CRITERIO_CLASIFICACION = (
        ('norma', 'Norma'),
        ('legal', 'Legal'),
        ('contractual', 'Contractual'),
        ('rsc', 'RSC'),
    )

    criterio = models.CharField(max_length=120)
    clasificacion = models.CharField(max_length=15, choices=CRITERIO_CLASIFICACION, default="norma")


class requisito(models.Model):
    requisito = models.CharField(max_length=400)
    criterio = models.ForeignKey(criterio)


class proceso(models.Model):
    proceso = models.CharField(max_length=160)


class subproceso(models.Model):
    subproceso = models.CharField(max_length=160)
    proceso = models.ForeignKey(proceso)


class usuario(models.Model):
    nombre_completo = models.CharField(max_length=240)
    rol = models.CharField(max_length=30)
    # compania


class sitio(models.Model):
    sitio = models.CharField(max_length=200)


class metodologia(models.Model):
    metodologia = models.CharField(max_length=120)


class falla(models.Model):
    falla = models.CharField(max_length=300)
    codigo = models.CharField(max_length=16)


class formato(models.Model):
    titulo = models.CharField(max_length=120)
    no_revision = models.CharField(max_length=6)
    vigencia_inicio = models.DateField()
    codigo = models.CharField(max_length=16)
    descripcion = models.CharField(max_length=220)
    # compania

class auditoria(models.Model):
    folio = models.CharField(primary_key=True, max_length=12)
    tipo_auditoria = models.CharField(max_length=17)
    compania = models.CharField(max_length=60)
    fecha_programada_inicial = models.DateField(null=True, blank=True)
    fecha_programada_final = models.DateField(null=True, blank=True)
    objetivo = models.CharField(max_length=400, blank=True)
    alcance = models.CharField(max_length=400, blank=True)
    recurso_necesario = models.CharField(max_length=300, blank=True)
    fecha_real_inicial = models.DateField(null=True, blank=True)
    fecha_real_final = models.DateField(null=True, blank=True)
    estado = models.CharField(max_length=13)
    auditor_lider = models.CharField(max_length=30, blank=True)
    autorizador = models.CharField(max_length=30, blank=True)
    aprobador = models.CharField(max_length=30, blank=True)
    create_by = models.CharField(max_length=240, blank=True)
    create_date = models.DateTimeField(
        auto_now=False,
        auto_now_add=True,
        null=True,
        blank=True
    )
    update_by = models.CharField(max_length=240, blank=True)
    update_date = models.DateTimeField(
        auto_now=True,
        auto_now_add=False,
        null=True,
        blank=True
    )
    fecha_autorizacion = models.DateTimeField(null=True, blank=True)
    fecha_aprobacion = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return "%s" % (self.compania)

    def __unicode__(self):
        return "%s" % (self.compania)
