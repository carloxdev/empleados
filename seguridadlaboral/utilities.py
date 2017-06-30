# -*- coding: utf-8 -*-
# Librerias Python
import os

# para guardar el archivo por carpeta con el nombre de cada incidencia y dentro una carpeta de files

# def get_FilePath_Incidencia(instance, filename):

#     if (instance.incidencia_id):
#         upload_dir = os.path.join(
#             'incidencias', str(instance.incidencia_id), 'files')

#     return os.path.join(upload_dir, filename)


# def get_FilePath_Resolucion(instance, filename):

#     if instance.resolucion_id:
#         upload_dir = os.path.join(
#             'incidencias', str(instance.resolucion.incidencia_id), 'files', 'resoluciones')

#     return os.path.join(upload_dir, filename)


def get_FilePath_Incidencia(instance, filename):

    if (instance.incidencia_id):
        upload_dir = os.path.join(
            'incidencias', str(instance.incidencia_id))

    return os.path.join(upload_dir, filename)


def get_FilePath_Resolucion(instance, filename):

    if instance.resolucion_id:
        upload_dir = os.path.join(
            'incidencias', str(instance.resolucion.incidencia_id), 'files', 'resoluciones')

    return os.path.join(upload_dir, filename)    
