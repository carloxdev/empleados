# -*- coding: utf-8 -*-

# Librerias Python
from __future__ import unicode_literals

# Librerias Django:
from django.db import models


class VIEW_EMPLEADOS_SIMPLE(models.Model):
    pers_clave = models.IntegerField(primary_key=True)
    pers_tipo_codigo = models.IntegerField()
    pers_tipo_desc = models.CharField(max_length=80)
    pers_empleado_numero = models.CharField(max_length=30)
    pers_titulo = models.CharField(max_length=30)
    pers_primer_nombre = models.CharField(max_length=150)
    pers_segundo_nombre = models.CharField(max_length=60)
    pers_apellido_paterno = models.CharField(max_length=150)
    pers_apellido_materno = models.CharField(max_length=150)
    pers_nombre_completo = models.CharField(max_length=240)
    pers_genero_clave = models.CharField(max_length=30)
    pers_genero_desc = models.CharField(max_length=11)
    pers_curp = models.CharField(max_length=30)
    pers_nacionalidad_clave = models.CharField(max_length=30)
    pers_rfc = models.CharField(max_length=150)
    pers_numero_imss = models.CharField(max_length=150)
    pers_ife = models.CharField(max_length=150)
    pers_fecha_nacimiento = models.CharField(max_length=8)
    pers_ciudad_nacimiento = models.CharField(max_length=90)
    pers_estado_nacimiento = models.CharField(max_length=90)
    pers_pais_nacimiento_clave = models.CharField(max_length=90)
    pers_fecha_efective_desde = models.CharField(max_length=8)
    pers_fecha_efective_hasta = models.CharField(max_length=8)
    pers_email = models.CharField(max_length=240)
    pers_estado_civil = models.CharField(max_length=30)
    pers_estado_civil_desc = models.CharField(max_length=7)
    pers_fecha_contratacion = models.CharField(max_length=8)

    class Meta:
        managed = False
        db_table = u'"NUVAPP"."VIEW_EMPLEADOS_SIMPLE"'
