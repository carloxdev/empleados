# -*- coding: 850 -*-
# -*- coding: utf-8 -*-
# Librerias Python
import os
import urllib
from datetime import datetime

# Own's Libraries
from ebs.models import VIEW_EMPLEADOS_FULL


def get_FilePath_Archivo(instance, filename):

    if instance.tipo_archivo in ('per', 'cap', 'sol', 'res'):
        fecha_hoy = datetime.now()
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
        elif instance.tipo_archivo == 'sol':
            fecha = '%s-%s-%s' % (fecha_hoy.day, fecha_hoy.month, fecha_hoy.year)
            extension = os.path.splitext(filename)
            nombre = "%s_%s_%s%s" % (fecha, nombre, numero_empleado, extension[1])
            return os.path.join('capitalhumano', 'solicitudes', nombre)
        elif instance.tipo_archivo == 'res':
            fecha = '%s-%s-%s' % (fecha_hoy.day, fecha_hoy.month, fecha_hoy.year)
            extension = os.path.splitext(filename)
            nombre = "R-%s_%s_%s%s" % (fecha, nombre, numero_empleado, extension[1])
            return os.path.join('capitalhumano', 'solicitudes', nombre)
        return os.path.join(upload_dir, filename)

    elif instance.tipo_archivo in ('cal_anali', 'cal_evid', 'cal_eval'):

        auditoria = instance.content_object.hallazgo.proceso.auditoria.folio

        upload_dir = os.path.join('calidad', "%s" % (auditoria), 'hallazgo', "%s" % (instance.tipo_archivo), )

        return os.path.join(upload_dir, filename)

    elif instance.tipo_archivo == 'cal_segui':

        auditoria = instance.content_object.plan_accion_hallazgo.hallazgo.proceso.auditoria.folio

        upload_dir = os.path.join('calidad', "%s" % (auditoria), 'hallazgo', "%s" % (instance.tipo_archivo), )

        return os.path.join(upload_dir, filename)


def get_Url_With_Querystring(path, **kwargs):
    return path + '?' + urllib.urlencode(kwargs)
