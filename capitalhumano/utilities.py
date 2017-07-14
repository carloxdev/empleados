# -*- coding: utf-8 -*-
# Librerias Python
import os

# Models
from ebs.models import VIEW_EMPLEADOS_FULL


def get_FilePath_Expedientes(instance, filename):

    numero_empleado = instance.content_object.numero_empleado
    empleado = VIEW_EMPLEADOS_FULL.objects.using(
        "ebs_d").filter(pers_empleado_numero=numero_empleado)
    nombre = ''
    for dato in empleado:
        nombre = dato.pers_nombre_completo

    upload_dir = os.path.join('capitalhumano', 'expedientes', str(nombre),)

    return os.path.join(upload_dir, filename)
