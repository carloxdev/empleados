# Librerias Django
from django.conf import settings

# Librerias Propias
from jde.models import VIEW_CENTROSCOSTO


def get_CentrosCostoJde():
    """ Funcion que devuelve solo a a centro de costos activos,
        excluye a los antigusos y
        los regresa ordenados por clave """

    valores = [('', '-------', '', '', ''), ]

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

        option_value = centro.clave
        option_label = "%s : %s" % (
            centro.clave,
            centro.descripcion
        )
        option_text = centro.descripcion
        option_status = centro.estado
        option_status_desc = get_StatusDescription(centro.estado)

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

    if value == "N":
        return "desactivado"
    else:
        return "activo"
