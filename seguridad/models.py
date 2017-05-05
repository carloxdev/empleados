# -*- coding: utf-8 -*-

# Librerias Django:
from __future__ import unicode_literals
from django.db import models

# Modelos:
from django.contrib.auth.models import User

# Django Signals:
from django.db.models.signals import post_save
from django.dispatch import receiver


class Profile(models.Model):
    usuario = models.OneToOneField(User, on_delete=models.CASCADE)
    clave_rh = models.IntegerField(
        blank=False,
        null=True,
    )
    clave_jde = models.CharField(
        max_length=144,
        null=True,
        blank=True,
    )
    foto = models.ImageField(
        upload_to='usuarios/fotos/',
        blank=True,
        null=True,
    )

    fecha_nacimiento = models.DateField(null=True, blank=True)

    def __unicode__(self):
        nombre_completo = self.usuario.get_full_name()

        if nombre_completo == "":
            nombre_completo = self.usuario.username

        return nombre_completo

    def __str__(self):
        nombre_completo = self.usuario.get_full_name()

        if nombre_completo == "":
            nombre_completo = self.usuario.username

        return nombre_completo


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(usuario=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
