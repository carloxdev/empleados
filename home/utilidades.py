# Librerias Python
import os


def get_FilePath(instance, filename):
    if (instance.incidencia_id):
        upload_dir = os.path.join(
            'incidencias', instance.incidencia_id, 'files')

    if (instance.resolucion_id):
        upload_dir = os.path.join(
            'incidencias', instance.resolucion.incidencia_id, 'files', 'resoluciones')

    return os.path.join(upload_dir, filename)
