# -*- coding: utf-8 -*-

# Librerias Django
from __future__ import unicode_literals
from django.db import models

# Librerias Terceros:
from simple_history.models import HistoricalRecords

# Otros Modelos:
from seguridad.models import Profile


class ViaticoCabecera(models.Model):

    VIATICO_ESTADOS = (
        ('cap', 'En edición'),
        ('sau', 'Sin autorizar'),
        ('aut', 'Autorizado'),
        ('rec', 'Rechazado'),
        ('fin', 'Finalizado'),
        ('can', 'Cancelado'),
    )

    empleado = models.CharField(max_length=60)
    fecha_partida = models.DateField()
    fecha_regreso = models.DateField()
    unidad_negocio = models.CharField(max_length=80, blank=False, null=False)
    ciudad_destino = models.CharField(max_length=150, blank=False, null=False)
    proposito_viaje = models.TextField(max_length=250, blank=False, null=False)
    nombre_empresa = models.CharField(max_length=80)
    rfc = models.CharField(max_length=13)
    direccion = models.CharField(max_length=60, blank=False)
    grupo = models.CharField(max_length=40)
    autorizador = models.CharField(max_length=60, blank=False)
    importe_total = models.DecimalField(max_digits=7, decimal_places=2, blank=False, null=False)
    status = models.CharField(
        choices=VIATICO_ESTADOS,
        default="cap",
        max_length=3)
    fecha_autorizacion = models.DateTimeField(
        null=True,
        blank=True
    )
    created_by = models.ForeignKey(Profile, related_name='via_created_by', null=True)
    created_date = models.DateTimeField(
        auto_now=False,
        auto_now_add=True,
        null=True,
        blank=True
    )
    updated_by = models.ForeignKey(Profile, related_name='via_updated_by', null=True)
    updated_date = models.DateTimeField(
        auto_now=True,
        auto_now_add=False,
        null=True,
        blank=True
    )
    history = HistoricalRecords()

    class Meta:
        verbose_name_plural = "Viaticos Cabeceras"

    def __str__(self):
        return "%s - %s" % (self.pk, self.empleado)

    def __unicode__(self):
        return "%s - %s" % (self.pk, self.empleado)


class ViaticoLinea(models.Model):
    cabecera = models.ForeignKey(ViaticoCabecera)
    concepto = models.CharField(max_length=60, blank=False, null=False)
    observaciones = models.CharField(max_length=140, blank=False, null=False)
    importe = models.DecimalField(max_digits=7, decimal_places=2, blank=False, null=False)

    created_by = models.ForeignKey(Profile, related_name='vialinea_created_by', null=True)
    created_date = models.DateTimeField(
        auto_now=False,
        auto_now_add=True,
        null=True,
        blank=True
    )
    updated_by = models.ForeignKey(Profile, related_name='vialinea_updated_by', null=True)
    updated_date = models.DateTimeField(
        auto_now=True,
        auto_now_add=False,
        null=True,
        blank=True
    )
    history = HistoricalRecords()

    class Meta:
        verbose_name_plural = "Viaticos Lineas"

    def __str__(self):
        return "%s : %s" % (self.cabecera, self.concepto)

    def __unicode__(self):
        return "%s : %s" % (self.cabecera, self.concepto)
