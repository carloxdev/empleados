# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Librerias Terceros:
# from simple_history.models import HistoricalRecords

# Otros Modelos:
from administracion.models import Empresa
from administracion.models import Contrato


class Criterio(models.Model):

    CLASIFICACION = (
        ('norma', 'Norma'),
        ('legal', 'Legal'),
        ('contractual', 'Contractual'),
        ('rsc', 'RSC'),
    )

    criterio = models.CharField(max_length=120)
    clasificacion = models.CharField(max_length=15, choices=CLASIFICACION, default="norma")
    create_by = models.CharField(max_length=240, blank=True)
    create_date = models.DateTimeField(
        auto_now=False,
        auto_now_add=True,
        null=True,
        blank=True
    )
    update_by = models.CharField(max_length=240, blank=True)
    update_date = models.DateTimeField(
        auto_now=True,
        auto_now_add=False,
        null=True,
        blank=True
    )

    def __str__(self):
        return "%s" % (self.criterio)

    def __unicode__(self):
        return "%s" % (self.criterio)


class Requisito(models.Model):
    requisito = models.CharField(max_length=400)
    criterio = models.ForeignKey(Criterio)
    create_by = models.CharField(max_length=240, blank=True)
    create_date = models.DateTimeField(
        auto_now=False,
        auto_now_add=True,
        null=True,
        blank=True
    )
    update_by = models.CharField(max_length=240, blank=True)
    update_date = models.DateTimeField(
        auto_now=True,
        auto_now_add=False,
        null=True,
        blank=True
    )

    def __str__(self):
        return "%s" % (self.requisito)

    def __unicode__(self):
        return "%s" % (self.requisito)


class Proceso(models.Model):
    proceso = models.CharField(max_length=160)
    create_by = models.CharField(max_length=240, blank=True)
    create_date = models.DateTimeField(
        auto_now=False,
        auto_now_add=True,
        null=True,
        blank=True
    )
    update_by = models.CharField(max_length=240, blank=True)
    update_date = models.DateTimeField(
        auto_now=True,
        auto_now_add=False,
        null=True,
        blank=True
    )

    def __str__(self):
        return "%s" % (self.proceso)

    def __unicode__(self):
        return "%s" % (self.proceso)


class Subproceso(models.Model):
    subproceso = models.CharField(max_length=160)
    proceso = models.ForeignKey(Proceso)
    create_by = models.CharField(max_length=240, blank=True)
    create_date = models.DateTimeField(
        auto_now=False,
        auto_now_add=True,
        null=True,
        blank=True
    )
    update_by = models.CharField(max_length=240, blank=True)
    update_date = models.DateTimeField(
        auto_now=True,
        auto_now_add=False,
        null=True,
        blank=True
    )

    def __str__(self):
        return "%s" % (self.subproceso)

    def __unicode__(self):
        return "%s" % (self.subproceso)


class Responsable(models.Model):
    nombre_completo = models.CharField(max_length=240)
    numero_empleado = models.CharField(max_length=30)
    proceso = models.ForeignKey(Proceso)
    create_by = models.CharField(max_length=240, blank=True)
    create_date = models.DateTimeField(
        auto_now=False,
        auto_now_add=True,
        null=True,
        blank=True
    )
    update_by = models.CharField(max_length=240, blank=True)
    update_date = models.DateTimeField(
        auto_now=True,
        auto_now_add=False,
        null=True,
        blank=True
    )

    def __str__(self):
        return "%s" % (self.nombre_completo)

    def __unicode__(self):
        return "%s" % (self.nombre_completo)


class Rol(models.Model):
    nombre_completo = models.CharField(max_length=240)
    numero_empleado = models.CharField(max_length=30)
    rol = models.CharField(max_length=30)
    create_by = models.CharField(max_length=240, blank=True)
    create_date = models.DateTimeField(
        auto_now=False,
        auto_now_add=True,
        null=True,
        blank=True
    )
    update_by = models.CharField(max_length=240, blank=True)
    update_date = models.DateTimeField(
        auto_now=True,
        auto_now_add=False,
        null=True,
        blank=True
    )

    def __str__(self):
        return "%s" % (self.nombre_completo)

    def __unicode__(self):
        return "%s" % (self.nombre_completo)


class CompaniaAccion(models.Model):
    compania_codigo = models.CharField(max_length=5)
    compania = models.CharField(max_length=160)
    personal_rol = models.ForeignKey(Rol)
    create_by = models.CharField(max_length=240, blank=True)
    create_date = models.DateTimeField(
        auto_now=False,
        auto_now_add=True,
        null=True,
        blank=True
    )
    update_by = models.CharField(max_length=240, blank=True)
    update_date = models.DateTimeField(
        auto_now=True,
        auto_now_add=False,
        null=True,
        blank=True
    )

    def __str__(self):
        return "%s" % (self.compania)

    def __unicode__(self):
        return "%s" % (self.compania)


class Sitio(models.Model):
    sitio = models.CharField(max_length=200)
    create_by = models.CharField(max_length=240, blank=True)
    create_date = models.DateTimeField(
        auto_now=False,
        auto_now_add=True,
        null=True,
        blank=True
    )
    update_by = models.CharField(max_length=240, blank=True)
    update_date = models.DateTimeField(
        auto_now=True,
        auto_now_add=False,
        null=True,
        blank=True
    )

    def __str__(self):
        return "%s" % (self.sitio)

    def __unicode__(self):
        return "%s" % (self.sitio)


class Metodologia(models.Model):
    metodologia = models.CharField(max_length=120)
    create_by = models.CharField(max_length=240, blank=True)
    create_date = models.DateTimeField(
        auto_now=False,
        auto_now_add=True,
        null=True,
        blank=True
    )
    update_by = models.CharField(max_length=240, blank=True)
    update_date = models.DateTimeField(
        auto_now=True,
        auto_now_add=False,
        null=True,
        blank=True
    )

    def __str__(self):
        return "%s" % (self.metodologia)

    def __unicode__(self):
        return "%s" % (self.metodologia)


class Falla(models.Model):
    codigo = models.CharField(max_length=16)
    falla = models.CharField(max_length=300)
    create_by = models.CharField(max_length=240, blank=True)
    create_date = models.DateTimeField(
        auto_now=False,
        auto_now_add=True,
        null=True,
        blank=True
    )
    update_by = models.CharField(max_length=240, blank=True)
    update_date = models.DateTimeField(
        auto_now=True,
        auto_now_add=False,
        null=True,
        blank=True
    )

    def __str__(self):
        return "%s" % (self.falla)

    def __unicode__(self):
        return "%s" % (self.falla)


class Formato(models.Model):
    compania_codigo = models.CharField(max_length=5)
    compania = models.CharField(max_length=160)
    titulo = models.CharField(max_length=120)
    no_revision = models.CharField(max_length=6)
    vigencia_inicio = models.DateField()
    codigo = models.CharField(max_length=16)
    descripcion = models.CharField(max_length=220)
    create_by = models.CharField(max_length=240, blank=True)
    create_date = models.DateTimeField(
        auto_now=False,
        auto_now_add=True,
        null=True,
        blank=True
    )
    update_by = models.CharField(max_length=240, blank=True)
    update_date = models.DateTimeField(
        auto_now=True,
        auto_now_add=False,
        null=True,
        blank=True
    )

    def __str__(self):
        return "%s" % (self.titulo)

    def __unicode__(self):
        return "%s" % (self.titulo)


class Auditoria(models.Model):
    folio = models.CharField(max_length=12)
    tipo_auditoria = models.CharField(max_length=17)
    compania = models.CharField(max_length=60)
    criterio = models.ManyToManyField(Criterio, blank=True)
    contrato = models.ManyToManyField(Contrato, blank=True)
    fecha_programada_inicial = models.DateField(null=True, blank=True)
    fecha_programada_final = models.DateField(null=True, blank=True)
    objetivo = models.CharField(max_length=400, blank=True)
    alcance = models.CharField(max_length=400, blank=True)
    recurso_necesario = models.CharField(max_length=300, blank=True)
    fecha_real_inicial = models.DateField(null=True, blank=True)
    fecha_real_final = models.DateField(null=True, blank=True)
    estado = models.CharField(max_length=13)
    auditor_lider = models.CharField(max_length=30, blank=True)
    autorizador = models.CharField(max_length=30, blank=True)
    aprobador = models.CharField(max_length=30, blank=True)
    create_by = models.CharField(max_length=240, blank=True)
    create_date = models.DateTimeField(
        auto_now=False,
        auto_now_add=True,
        null=True,
        blank=True
    )
    update_by = models.CharField(max_length=240, blank=True)
    update_date = models.DateTimeField(
        auto_now=True,
        auto_now_add=False,
        null=True,
        blank=True
    )
    fecha_autorizacion = models.DateTimeField(null=True, blank=True)
    fecha_aprobacion = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return "%s" % (self.compania)

    def __unicode__(self):
        return "%s" % (self.compania)
