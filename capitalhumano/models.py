# -*- coding: utf-8 -*-

# Librerias/Clases Python
from __future__ import unicode_literals

# Librerias/Clases Django
from django.db import models

# Librerias/Clases propias
from seguridad.models import Profile

# Utilidades:
from utilities import get_FilePath_Expedientes


class PerfilPuestoDocumento(models.Model):

    GENERO_OPCIONES = (
        ('ind', 'Indistinto'),
        ('hom', 'Hombre'),
        ('muj', 'Mujer'),
    )

    ESTADO_OPCIONES = (
        ('ind', 'Indistinto'),
        ('sol', 'Soltero'),
        ('cas', 'Casado'),
        ('uni', 'Union Libre'),
        ('viu', 'Viudo'),
        ('div', 'Divorciado'),
    )

    empleado_puesto_desc = models.CharField(max_length=144)
    asig_puesto_clave = models.CharField(max_length=144)
    reporta = models.CharField(max_length=144)
    proposito = models.CharField(max_length=144)
    funciones = models.CharField(max_length=144)
    responsabilidades = models.CharField(max_length=144)
    reporte = models.CharField(max_length=144)
    edad_minima = models.CharField(max_length=10)
    edad_maxima = models.CharField(max_length=10)
    nivel_estudio = models.CharField(max_length=144)
    estado_civil = models.CharField(
        choices=ESTADO_OPCIONES,
        default="ind",
        max_length=3
    )
    genero = models.CharField(
        choices=GENERO_OPCIONES,
        default="ind",
        max_length=3
    )
    cambio_residencia = models.BooleanField(default=False)
    disponibilidad_viajar = models.BooleanField(default=False)
    requerimentos = models.CharField(max_length=144)

    def __unicode__(self):
        cadena = "%s" % (self.id)
        return cadena

    def __str__(self):
        cadena = "%s" % (self.id)
        return cadena

    class Meta:
        verbose_name_plural = "Documentos de Perfiles de Puestos"


class CatalogoCursos(models.Model):

    descripcion = models.CharField(max_length=255)
    vencimiento = models.CharField(max_length=30)

    created_by = models.ForeignKey(Profile, related_name='curexp_created_by')
    created_date = models.DateTimeField(
        auto_now=False,
        auto_now_add=True
    )
    updated_by = models.ForeignKey(
        Profile, related_name='curexp_updated_by', null=True, blank=True)
    updated_date = models.DateTimeField(
        auto_now=True,
        auto_now_add=False,
        null=True,
        blank=True
    )

    def __unicode__(self):
        cadena = "%s" % (self.id)
        return cadena

    def __str__(self):
        cadena = "%s" % (self.id)
        return cadena

    class Meta:
        verbose_name_plural = "Cursos"



class DocumentoCapacitacion(models.Model):
    MODALIDAD = (
        ('CURSO-PRESENCIAL', 'CURSO PRESENCIAL'),
        ('CURSO-VIRTUAL', 'CURSO VIRTUAL'),
        ('CURSO-PREVIO', 'CURSO PREVIO'),
    )
    MONEDA = (
        ('MXN', 'MONEDA NACIONAL (MXN)'),
        ('USD', 'DOLARES (USD)'),
        ('EUR', 'EURO (EUR)'),
    )
    nombre_documento = models.CharField(max_length=250)
    curso = models.ForeignKey(CatalogoCursos, on_delete=models.PROTECT)
    proveedor = models.CharField(max_length=255)  # Sacar de jde
    numero_empleado = models.IntegerField(default=0)
    modalidad = models.CharField(
        choices=MODALIDAD,
        default="CURSO-PRESENCIAL",
        max_length=3
    )
    lugar = models.CharField(max_length=250)
    costo = models.DecimalField(max_digits=5, decimal_places=2)
    moneda = models.CharField(
        choices=MONEDA,
        default="MXN",
        max_length=3
    )
    departamento = models.CharField(max_length=250)  # Jalar del ebs
    fecha_inicio = models.DateField(auto_now=False)
    fecha_fin = models.DateField(auto_now=False)
    duracion = models.IntegerField()
    observaciones = models.CharField(max_length=100)

    

    doc_created_by = models.ForeignKey(
        Profile, related_name='docexp_created_by')
    doc_created_date = models.DateTimeField(
        auto_now=False,
        auto_now_add=True
    )

   

    def __unicode__(self):
        cadena = "%s" % (self.id)
        return cadena

    def __str__(self):
        cadena = "%s" % (self.id)
        return cadena

    class Meta:
        verbose_name_plural = "Capacitaciones"


class DocumentoPersonal(models.Model):

    
    AGRUPADOR = (
        ('PERSONAL', 'PERSONAL'),
        ('QHSE', 'QHSE'),
        ('AMONESTACIÓN', 'AMONESTACIÓN'),
        ('ADMINISTRACIÓN', 'ADMINISTRACIÓN'),
        ('OPERACIONES', 'OPERACIONES'),
        ('RECONOCIMIENTO', 'RECONOCIMIENTO'),
    )
    numero_empleado = models.CharField(max_length=6)
    nombre = models.CharField(max_length=250)
    subtipo = models.CharField(max_length=255)  # Catalogo
    agrupador = models.CharField(
        choices=AGRUPADOR,
        default="per",
        max_length=3
    )
   
    fecha = models.DateField()

    vigencia_inicio = models.DateField()
    vigencia_fin = models.DateField()


    def __unicode__(self):
        cadena = "%s" % (self.id)
        return cadena

    def __str__(self):
        cadena = "%s" % (self.id)
        return cadena

    class Meta:
        verbose_name_plural = "Documentos Personales"


class DocumentoArchivo(models.Model):
    TIPO = (
        ('PERSONAL', 'PERSONAL'),
        ('CAPACITACION', 'CAPACITACION'),
    )
    capacitacion = models.ForeignKey(DocumentoCapacitacion)  #id de capacitacion
    documento = models.ForeignKey(DocumentoPersonal)   #id de documento personal
    numero_empleado = models.IntegerField(default=0)
    archivo = models.CharField(max_length=250) 
    tipo = models.CharField(
        choices=TIPO,
        max_length=3
    )
    ruta = models.FileField(
        upload_to=get_FilePath_Expedientes
    )
    created_by = models.ForeignKey(
        Profile, related_name='tipodocper_created_by')
    created_date = models.DateTimeField(
        auto_now=False,
        auto_now_add=True
    )
    updated_by = models.ForeignKey(
        Profile, related_name='tipodocper_updated_by', null=True, blank=True)
    updated_date = models.DateTimeField(
        auto_now=True,
        auto_now_add=False,
        null=True,
        blank=True
    )

    def __unicode__(self):
        cadena = "%s" % (self.id)
        return cadena

    def __str__(self):
        cadena = "%s" % (self.id)
        return cadena

    class Meta:
        verbose_name_plural = "Documentos Archivos"


