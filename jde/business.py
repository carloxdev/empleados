# Django's Libraries
from django.conf import settings

# Own's Libraries
from jde.models import VIEW_CENTROSCOSTO


class CentroCostoBusiness(object):

    @classmethod
    def get_Activos(self):

        centros = None

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

        return centros

    @classmethod
    def get_Activos_ForSelect(self):
        """ Funcion que devuelve solo a a centro de costos activos,
            excluye a los antigusos y
            los regresa ordenados por clave """

        valores = [('', '-------'), ]

        centros = self.get_Activos()

        for centro in centros:

            option_value = centro.clave
            option_label = "%s : %s" % (
                centro.clave,
                centro.descripcion
            )

            valores.append(
                (
                    option_value,
                    option_label,
                )
            )

        return valores

    @classmethod
    def get_StatusDescription(self, _value):

        if _value == "N":
            return "(desactivado)"
        else:
            return ""
