from __future__ import unicode_literals

from django.db import models


class ViaticoCabecera(models.Model):

    VIATICO_ESTADOS = (
        ('CAP', 'EN EDICION'),
        ('AUT', 'AUTORIZADO'),
        ('REC', 'RECHAZADO'),
        ('FIN', 'FINALIZADO'),
        ('CAN', 'CANCELADO'),
    )

    VEHICULO_OPCIONES = (
        ('SI', 'SI'),
        ('NO', 'NO'),
        ('PA', 'SOY PASAJERO')
    )

    empleado = models.CharField(max_length=60)
    fecha_partida = models.DateField()
    fecha_regreso = models.DateField()
    unidad_negocio = models.CharField(max_length=80, blank=False, null=False)
    ciudad_destino = models.CharField(max_length=150, blank=False, null=False)
    proposito_viaje = models.TextField(max_length=250, blank=False, null=False)
    requiere_vehiculo = models.CharField(
        choices=VEHICULO_OPCIONES,
        max_length=3)
    no_vehiculo = models.CharField(max_length=15, blank=True)
    nombre_empresa = models.CharField(max_length=80)
    rfc = models.CharField(max_length=13)
    direccion = models.CharField(max_length=60, blank=True)
    grupo = models.CharField(max_length=40)
    autorizador = models.CharField(max_length=60, blank=False)
    estado_solicitud = models.CharField(
        choices=VIATICO_ESTADOS,
        default="CAP",
        max_length=3)
    fecha_autorizacion = models.DateField(
        auto_now=False,
        auto_now_add=True,
        null=True,
        blank=True)

    created_date = models.DateTimeField(
        auto_now=False,
        auto_now_add=True,
        null=True,
        blank=True
    )

    updated_date = models.DateTimeField(
        auto_now=True,
        auto_now_add=False,
        null=True,
        blank=True
    )

    class Meta:
        verbose_name_plural = "Viaticos Cabeceras"

    def __str__(self):
        return "%s - %s" % (self.pk, self.empleado)


class ViaticoLinea(models.Model):
    cabecera = models.ForeignKey(ViaticoCabecera)
    concepto = models.CharField(max_length=60, blank=False, null=False)
    observaciones = models.CharField(max_length=140, blank=False, null=False)
    importe = models.IntegerField(blank=False, null=False)

    class Meta:
        verbose_name_plural = "Viaticos Lineas"

    def __str__(self):
        return "%s : %s" % (self.cabecera, self.concepto)
