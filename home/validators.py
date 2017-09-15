# -*- coding: utf-8 -*-

from django.core.exceptions import ValidationError


def valid_extension(value):
    if (not value.name.endswith('.png') and
        not value.name.endswith('.jpeg') and
            not value.name.endswith('.jpg') and
            not value.name.endswith('.PNG') and
            not value.name.endswith('.JPEG') and
            not value.name.endswith('.JPG')):

        raise ValidationError("Archivos permitidos: .jpg, .jpeg, .png")


def validate_image(fieldfile_obj):
    filesize = fieldfile_obj.file.size
    megabyte_limit = 10.0
    bits_limit = megabyte_limit * 1024 * 1024
    if filesize > bits_limit:
        raise ValidationError("Tamaño Máximo de Archivo %sMB" %
                              str(megabyte_limit))


def validate_Extension(obj):
    if (not obj.name.endswith('.png') and
        not obj.name.endswith('.jpeg') and
        not obj.name.endswith('.jpg') and
        not obj.name.endswith('.PNG') and
        not obj.name.endswith('.JPEG') and
            not obj.name.endswith('.JPG')):

        raise ValidationError("Solo se permiten archivos con extensión: .jpg, .jpeg, .png")


def validate_Size(obj):
    filesize = obj.file.size
    megabyte_limit = 10.0
    bits_limit = megabyte_limit * 1024 * 1024
    if filesize > bits_limit:
        raise ValidationError("Tamaño máximo permitido %sMB" %
                              str(megabyte_limit))
