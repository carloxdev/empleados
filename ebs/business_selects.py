

# Librerias Propias

# Otros Modelos:
from ebs.models import VIEW_EMPLEADOS_SIMPLE


def get_EmpleadosEbs():
    """ Funcion que devuelve solo a empleados activos,
        que tienen numero de empleado y
        los regresa ordenados por nombre """

    valores = [('', '-------'), ]

    empleados = VIEW_EMPLEADOS_SIMPLE.objects.using('ebs_d').filter(
        pers_tipo_codigo__in=['1121', '1120']
    ).exclude(
        pers_empleado_numero__isnull=True
    ).order_by('pers_nombre_completo')

    for empleado in empleados:

        descripcion = "%s : %s" % (
            empleado.pers_empleado_numero,
            empleado.pers_nombre_completo
        )

        valores.append(
            (
                empleado.pers_empleado_numero,
                descripcion
            )
        )
    return valores
