# -*- coding: utf-8 -*-

# Librerias/Clases Python
from django.db.models.signals import pre_delete
from django.dispatch import receiver
from django.conf import settings
import os

# Librerias/Clases Django
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models

# Otros Modelos
from seguridad.models import Profile

# Utilidades:
from .utilities import get_FilePath_Archivo

class Archivo(models.Model):
    TIPO = (
        ('per', 'Personal'),
        ('cap', 'Capacitacion'),
        ('sol', 'Solicitud'),
        ('cal', 'Calidad'),
    )

    tipo_archivo = models.CharField(
        choices=TIPO,
        default="per",
        max_length=3)
    archivo = models.FileField(
        upload_to=get_FilePath_Archivo
    )
    content_type = models.ForeignKey(
        ContentType, on_delete=models.CASCADE,
        related_name='content_type')
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')

    created_by = models.ForeignKey(
        Profile, related_name='archcap_created_by')
    created_date = models.DateTimeField(
        auto_now=False,
        auto_now_add=True
    )
    updated_by = models.ForeignKey(
        Profile, related_name='archcap_updated_by', null=True, blank=True)
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
        verbose_name_plural = "Archivos"

@receiver(pre_delete, sender=Archivo)
def _directorios_delete(sender, instance, using, **kwargs):
    file_path = settings.BASE_DIR + "/media/" + "%s" % (instance.archivo)

    if os.path.isfile(file_path):
        os.remove(file_path)
