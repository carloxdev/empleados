# -*- coding: utf-8 -*-

# Librerias Django
from __future__ import unicode_literals
from django.db import models

# Otros Modelos:
from seguridad.models import Profile


class Zona(models.Model):

    descripcion = models.CharField(max_length=144)

    created_by = models.ForeignKey(Profile, related_name='zon_created_by', null=True)
    created_date = models.DateTimeField(
        auto_now=False,
        auto_now_add=True,
        null=True,
        blank=True
    )
    updated_by = models.ForeignKey(Profile, related_name='zon_updated_by', null=True)
    updated_date = models.DateTimeField(
        auto_now=True,
        auto_now_add=False,
        null=True,
        blank=True
    )

    def __str__(self):
        return self.descripcion

    def __unicode__(self):
        return self.descripcion


class Empresa(models.Model):

    clave = models.CharField(max_length=50, unique=True)
    descripcion = models.CharField(max_length=144)
    descripcion_jde = models.CharField(max_length=144)
    alias = models.CharField(max_length=40, blank=True, null=True)
    created_by = models.ForeignKey(Profile, related_name='emp_created_by', null=True)
    created_date = models.DateTimeField(
        auto_now=False,
        auto_now_add=True,
        null=True,
        blank=True
    )
    updated_by = models.ForeignKey(Profile, related_name='emp_updated_by', null=True)
    updated_date = models.DateTimeField(
        auto_now=True,
        auto_now_add=False,
        null=True,
        blank=True
    )

    def __str__(self):
        return self.descripcion

    def __unicode__(self):
        return self.descripcion
