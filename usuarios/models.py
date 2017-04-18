# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models


class Usuario(models.Model):
    primer_nombre = models.CharField(max_length=20)
    segundo_nombre = models.CharField(max_length=20, blank=False)
    apellido_paterno = models.CharField(max_length=60)
    apellido_materno = models.CharField(max_length=60)
    genero = models.CharField(max_length=10)
    numero = models.IntegerField()
    tipo = models.CharField(max_length=60)
    puesto = models.CharField(max_length=60)
    organizacion = models.CharField(max_length=60)
    fecha_inicio_contratacion = models.DateField()
    fecha_fin_contratacion = models.DateField()
    compania = models.CharField(max_length=60)
    zona = models.CharField(max_length=60)
    centro_costos = models.CharField(max_length=60)
    nomina = models.CharField(max_length=60)
