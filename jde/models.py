# -*- coding: utf-8 -*-

# Librerias Django:
from __future__ import unicode_literals
from django.db import models
from django.conf import settings


class F0101(models.Model):

    clave = models.IntegerField(db_column='ABAN8', primary_key=True)
    nombre = models.CharField(max_length=40, db_column='ABALPH')
    tipo = models.CharField(max_length=3, db_column='ABAT1')
    rfc = models.CharField(max_length=20, db_column='ABTAX')

    class Meta:
        managed = False
        if settings.DEBUG:
            db_table = u'"CRPDTA"."F0101"'
        else:
            db_table = u'"PRODDTA"."F0101"'

    def __str__(self):
        return "{} - {}".format(self.clave, self.nombre)


class VIEW_UNIDADES(models.Model):
    clave = models.CharField(
        max_length=12, primary_key=True, db_column='CLAVE')
    tipo = models.CharField(max_length=2, db_column='TIPO')
    compania = models.CharField(max_length=5, db_column='COMPANIA')
    desc_corta = models.CharField(max_length=30, db_column='DESC_CORTA')
    desc_larga = models.CharField(max_length=75, db_column='DESC_LARGA')
    reclass = models.CharField(max_length=10, db_column='RECLASS')

    class Meta:
        managed = False
        db_table = u'"NUVPD"."VIEW_UNIDADES"'

    def __str__(self):
        return self.desc_larga
