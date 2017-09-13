# -*- coding: utf-8 -*

# Librerias Django
from __future__ import unicode_literals
from django.db import models

# Librerias Terceros:
from simple_history.models import HistoricalRecords

# Otros Modelos:
from seguridad.models import Profile
from administracion.models import Empresa


class ViaticoCabecera(models.Model):

    VIATICO_ESTADOS = (
        ('cap', 'En edicion'),
        ('sau', 'Sin autorizar'),
        ('aut', 'Autorizado'),
        ('rec', 'Rechazado'),
        ('fin', 'Finalizado'),
        ('can', 'Cancelado'),
    )

    empleado_clave = models.IntegerField(default=0)
    empleado_descripcion = models.CharField(max_length=60, null=True, blank=True)
    fecha_partida = models.DateField()
    fecha_regreso = models.DateField()
    unidad_negocio_clave = models.CharField(max_length=80, blank=False, null=False)
    unidad_negocio_descripcion = models.CharField(max_length=144, null=True, blank=True)
    ciudad_destino = models.CharField(max_length=150, blank=False, null=False)
    proposito_viaje = models.TextField(max_length=250, blank=False, null=False)
    empresa = models.CharField(max_length=150, blank=False, null=False)
    rfc = models.CharField(max_length=13, blank=True, null=True)
    direccion = models.CharField(max_length=60, blank=True, null=True)
    grupo = models.CharField(max_length=40, blank=True, null=True)

    autorizador_clave = models.IntegerField(default=0, blank=True)
    autorizador_descripcion = models.CharField(max_length=60, blank=True, null=True)

    status = models.CharField(max_length=5, choices=VIATICO_ESTADOS, default="cap")

    approved_by = models.ForeignKey(Profile, related_name='via_autorizador', blank=True, null=True)
    approved_date = models.DateTimeField(
        null=True,
        blank=True
    )

    importe_total = models.DecimalField(
        max_digits=7,
        decimal_places=2,
        blank=True,
        null=True,
        default=0.0
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
        return "%s - %s" % (self.pk, self.empleado_descripcion)

    def __unicode__(self):
        return "%s - %s" % (self.pk, self.empleado_descripcion)


class ViaticoLinea(models.Model):
    slug = models.SlugField(max_length=100, null=True, blank=True)
    cabecera = models.ForeignKey(ViaticoCabecera)
    concepto = models.CharField(max_length=60, blank=False, null=False)
    observaciones = models.CharField(max_length=140, blank=False, null=False)
    importe = models.DecimalField(max_digits=7, decimal_places=2, blank=False, default=0.0)
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

    def save(self, *args, **kwargs):

        if self.pk is None:
            if ViaticoLinea.objects.filter(cabecera=self.cabecera).count():
                last_line = ViaticoLinea.objects.filter(cabecera=self.cabecera).order_by('-id')[0]
                self.slug = int(last_line.slug) + 1
            else:
                self.slug = 1

        super(ViaticoLinea, self).save(*args, **kwargs)

    def __str__(self):
        return "%s : %s" % (self.cabecera, self.concepto)

    def __unicode__(self):
        return "%s : %s" % (self.cabecera, self.concepto)
