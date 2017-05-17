
# Librerias Propias
from django.contrib.auth.models import User

# Librerias Propias

# Otros Modelos:
from ebs.models import VIEW_EMPLEADOS_SIMPLE
from jde.models import VIEW_UNIDADES
from jde.models import VIEW_CENTROSCOSTO


def get_Usuarios(self):

    valores = [('', '------')]

    usuarios = User.objects.all().order_by('username')

    for usuario in usuarios:
        valores.append(
            (
                usuario.username,
                usuario.get_full_name()
            )
        )

    return valores


def get_EmpleadosEbs(self):
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


def get_CentrosCostoJde(self):

    valores = [('', '------')]

    if settings.DEBUG:
        centros = VIEW_CENTROSCOSTO.objects.using('jde_p').exclude(
            estructura="HST"
        ).exclude(
            estado="N"
        ).order_by(
            'clave'
        )
    else:
        centros = VIEW_CENTROSCOSTO.objects.using('jde_p').exclude(
            estructura="HST"
        ).exclude(
            estado="N"
        ).order_by(
            'clave'
        )

    for centro in centros:

        descripcion = "%s : %s" % (
            centro.clave,
            centro.descripcion
        )

        valores.append(
            (
                centro.clave,
                descripcion
            )
        )

    return valores
