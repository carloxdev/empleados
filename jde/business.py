# Django's Libraries
from django.conf import settings

# Own's Libraries
from jde.models import VIEW_CENTROSCOSTO
from jde.models import VIEW_GASTOS_AUTORIZADORES


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
    def get_Todos(self):

        centros = None

        if settings.DEBUG:
            centros = VIEW_CENTROSCOSTO.objects.using('jde_p').exclude(
                estructura="HST"
            ).order_by(
                'clave'
            )[:20]
        else:
            centros = VIEW_CENTROSCOSTO.objects.using('jde_p').exclude(
                estructura="HST"
            ).order_by(
                'clave'
            )

        return centros

    @classmethod
    def get_Activos_ForSelect(self):

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
    def get_Activos_ForSelectCustom(self):

        valores = [('', '-------', '', ''), ]

        centros = self.get_Activos()

        for centro in centros:

            option_value = centro.clave
            option_status_desc = self.get_StatusDescription(centro.estado)
            option_label = "%s : %s %s" % (
                centro.clave,
                centro.descripcion,
                option_status_desc
            )
            option_text = centro.descripcion
            option_status = centro.estado

            valores.append(
                (
                    option_value,
                    option_label,
                    option_text,
                    option_status
                )
            )

        return valores

    @classmethod
    def get_Todos_ForSelectCustom(self):

        valores = [('', '-------', '', ''), ]

        centros = self.get_Todos()

        for centro in centros:

            option_value = centro.clave
            option_status_desc = self.get_StatusDescription(centro.estado)
            option_label = "%s : %s %s" % (
                centro.clave,
                centro.descripcion,
                option_status_desc
            )
            option_text = centro.descripcion
            option_status = centro.estado

            valores.append(
                (
                    option_value,
                    option_label,
                    option_text,
                    option_status
                )
            )

        return valores

    @classmethod
    def get_Todos_ForSelect(self):
        valores = [('', '-------'), ]

        centros = self.get_Todos()

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


class AutorizadorGastosBusiness(object):

    @classmethod
    def get_ByEmpleado(self, _empleado_clave):

        record = VIEW_GASTOS_AUTORIZADORES.objects.using('jde_p').get(empleado_clave=_empleado_clave)

        return record
