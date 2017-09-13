# -*- coding: utf-8 -*-
# Librerias Python
import os
from datetime import datetime

# Models
from ebs.models import VIEW_EMPLEADOS_FULL

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


# def get_FilePath_Incidencia(instance, filename):

#     if (instance.incidencia_id):
#         upload_dir = os.path.join(
#             'incidencias', str(instance.incidencia_id))

#     return os.path.join(upload_dir, filename)

def get_FilePath_Incidencia(instance, filename):

    if (instance.incidencia_id):

	fecha_hoy = datetime.now()
	fecha = '%s-%s-%s' % (fecha_hoy.day, fecha_hoy.month, fecha_hoy.year)	
	 # numero_empleado = instance.empleado_id
	 #    empleado = VIEW_EMPLEADOS_FULL.objects.using(
	 #        "ebs_p").filter(pers_empleado_numero=numero_empleado)
	 #    nombre = ''
	 #    for dato in empleado:
	 #        nombre = dato.pers_nombre_completo

    upload_dir = os.path.join('incidencias')
    filename = "%s_%s_%s.pdf" % ('INC',instance.incidencia_id,fecha)

    return os.path.join(upload_dir, filename)


def get_FilePath_Resolucion(instance, filename):

    if instance.resolucion_id:
        upload_dir = os.path.join(
            'incidencias', str(instance.resolucion.incidencia_id), 'files', 'resoluciones')

    return os.path.join(upload_dir, filename)    
