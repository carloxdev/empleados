from __future__ import unicode_literals

from django.db import models

from django.contrib.auth.models import User

# Create your models here.


class ViaticoCabecera(models.Model):

    VIATICO_ESTADO = (
        ('CAP', 'CAPTURA'),
        ('AUT', 'AUTORIZADA'),
        ('REC', 'RECHAZADA'),
        ('FIN', 'FINALIZADA'),
    )

    descripcion = models.CharField(max_length=140)
    empleado = models.CharField(max_length=140)
    autorizador = models.CharField(max_length=140)
    fecha_partida = models.DateField()
    empresa = models.CharField(max_length=140)
    un = models.CharField(max_length=140)
    ciudad_destino = models.CharField(max_length=140)
    status = models.CharField(
        choices=VIATICO_ESTADO,
        max_length=4,
        default="CAP"
    )
    vehiculo_requerido = models.BooleanField(default=False)
    vehiculo_numero = models.CharField(max_length=140, blank=True)

    proposito = models.TextField()

    created_by = models.ForeignKey(
        User,
        related_name='viatico_originador'
    )
    created_date = models.DateTimeField(
        auto_now=False,
        auto_now_add=True,
        null=True,
        blank=True
    )
    updated_by = models.ForeignKey(
        User,
        related_name='viatico_actualizador'
    )
    updated_date = models.DateTimeField(
        auto_now=True,
        auto_now_add=False,
        null=True,
        blank=True
    )

    def __str__(self):
        cadena = "Clave: {} , Descripcion: {}".format(
            self.pk, self.descripcion)
        return cadena.encode('utf-8')

    class Meta:
        verbose_name_plural = "Viaticos Cabecera"
