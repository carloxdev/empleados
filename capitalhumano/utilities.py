# -*- coding: 850 -*-
# -*- coding: utf-8 -*-
# Librerias Python
import os

# Models
from ebs.models import VIEW_EMPLEADOS_FULL


def get_FilePath_Expedientes(instance, filename):

    numero_empleado = instance.content_object.numero_empleado
    empleado = VIEW_EMPLEADOS_FULL.objects.using(
        "ebs_p").filter(pers_empleado_numero=numero_empleado)
    nombre = ''
    for dato in empleado:
        nombre = dato.pers_nombre_completo

    upload_dir = os.path.join('capitalhumano', 'expedientes', "%s" % (nombre),)

    if instance.tipo_archivo == 'per':
        filename = "%s_%s_%s.pdf" % (instance.content_object.tipo_documento.tipo_documento, nombre, numero_empleado)
    elif instance.tipo_archivo == 'cap':
        filename = "C-%s_%s_%s.pdf" % (instance.content_object.curso.id, nombre, numero_empleado)
    return os.path.join(upload_dir, filename)
 