

# Librerias Propias

# Otros Modelos:
from ebs.models import VIEW_EMPLEADOS_SIMPLE


def get_EmpleadosEbs_Todos():
    """ Funcion que devuelve a todos los Empledos,
        que tienen numero de empleado y
        los regresa ordenados por nombre """

    valores = [('', '-------', '', '', ''), ]

    empleados = VIEW_EMPLEADOS_SIMPLE.objects.using('ebs_d').exclude(
        pers_empleado_numero__isnull=True
    ).order_by('pers_nombre_completo')

    for empleado in empleados:

        option_value = empleado.pers_empleado_numero,
        option_status_desc = get_StatusDescription(empleado.pers_tipo_codigo)
        option_label = "%s : %s %s" % (
            empleado.pers_empleado_numero,
            empleado.pers_nombre_completo,
            option_status_desc
        )
        option_text = empleado.pers_nombre_completo,
        option_status = empleado.pers_tipo_codigo

        valores.append(
            (
                option_value,
                option_label,
                option_text,
                option_status,
                option_status_desc
            )
        )

    return valores


def get_EmpleadosEbs_Activos():
    """ Funcion que devuelve solo a empleados activos,
        que tienen numero de empleado y
        los regresa ordenados por nombre """

    valores = [('', '-------', '', '', ''), ]

    empleados = VIEW_EMPLEADOS_SIMPLE.objects.using('ebs_d').filter(
        pers_tipo_codigo__in=['1121', '1120']
    ).exclude(
        pers_empleado_numero__isnull=True
    ).order_by('pers_nombre_completo')

    for empleado in empleados:

        option_value = empleado.pers_empleado_numero,
        option_label = "%s : %s" % (
            empleado.pers_empleado_numero,
            empleado.pers_nombre_completo
        )
        option_text = empleado.pers_nombre_completo,
        option_status = empleado.pers_tipo_codigo
        option_status_desc = get_StatusDescription(empleado.pers_tipo_codigo)

        valores.append(
            (
                option_value,
                option_label,
                option_text,
                option_status,
                option_status_desc
            )
        )

    return valores


def get_StatusDescription(value):

    if value in [1124, 1123]:
        return "(baja)"

    else:
        return ""
