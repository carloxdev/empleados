from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    usuario = models.OneToOneField(User, on_delete=models.CASCADE)
    clave_empleado = models.IntegerField(
        blank=True
    )
    clave_jde = models.CharField(
        max_length=144,
        null=True
    )
    foto = models.ImageField(
        upload_to='usuarios/fotos',
        blank=True
    )
