# Librerias Python
import os


def get_FilePath_Incidencia(instance, filename):

    if (instance.incidencia_id):
        upload_dir = os.path.join(
            'incidencias', str(instance.incidencia_id), 'files')

    return os.path.join(upload_dir, filename)


def get_FilePath_Resolucion(instance, filename):

    if instance.resolucion_id:
        upload_dir = os.path.join(
            'incidencias', str(instance.resolucion.incidencia_id), 'files', 'resoluciones')

    return os.path.join(upload_dir, filename)
