# -*- coding: utf-8 -*-
# Librerias Python
import os

# Models
from ebs.models import VIEW_EMPLEADOS_FULL


def get_FilePath_DocPersonal(instance, filename):

    numero_empleado = instance.content_object.numero_empleado
    empleado = VIEW_EMPLEADOS_FULL.objects.using(
        "ebs_d").filter(pers_empleado_numero=numero_empleado)
    nombre = ''
    for dato in empleado:
        nombre = dato.pers_nombre_completo

    if instance.tipo_archivo == 'per':
        upload_dir = os.path.join(
            'capitalhumano', 'expedientes', str(nombre), 'Personal')

        return os.path.join(upload_dir, filename)
    elif instance.tipo_archivo == 'cap':
        upload_dir = os.path.join(
            'capitalhumano', 'expedientes', str(nombre), 'Capacitacion')

    return os.path.join(upload_dir, filename)
