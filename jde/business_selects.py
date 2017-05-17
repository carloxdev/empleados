# Librerias Django
from django.conf import settings

# Librerias Propias
from jde.models import VIEW_CENTROSCOSTO


def get_CentrosCostoJde():
    """ Funcion que devuelve solo a a centro de costos activos,
        excluye a los antigusos y
        los regresa ordenados por clave """

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
