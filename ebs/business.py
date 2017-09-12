
# Own's Libraries
from ebs.models import VIEW_EMPLEADOS_SIMPLE
from ebs.models import VIEW_EMPLEADOS_FULL
from seguridad.business import UserBusiness


class EmpleadoBusiness(object):

    @classmethod
    def get_Activos(self):

        empleados = VIEW_EMPLEADOS_SIMPLE.objects.using('ebs_p').filter(
            pers_tipo_codigo__in=['1121', '1120']
        ).exclude(
            pers_empleado_numero__isnull=True
        ).order_by('pers_nombre_completo')

        return empleados

    @classmethod
    def get_ByNumero(self, _numero):
        empleado = VIEW_EMPLEADOS_SIMPLE.objects.using('ebs_p').get(pers_empleado_numero=_numero)

        return empleado

    @classmethod
    def get_Todos(self):

        empleados = VIEW_EMPLEADOS_SIMPLE.objects.using('ebs_p').exclude(
            pers_empleado_numero__isnull=True
        ).order_by('pers_nombre_completo')

        return empleados

    @classmethod
    def get_Todos_ForSelectCustom(self):

        valores = [('', '-------', '', ''), ]

        empleados = self.get_Todos()

        for empleado in empleados:

            option_value = empleado.pers_empleado_numero
            option_status_desc = self.get_StatusDescription(empleado.pers_tipo_codigo)
            option_label = "%s : %s %s" % (
                empleado.pers_empleado_numero,
                empleado.pers_nombre_completo,
                option_status_desc
            )
            option_text = empleado.pers_nombre_completo
            option_status = empleado.pers_tipo_codigo

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
    def get_Activos_ForSelectCustom(self):

        valores = [('', '-------', '', ''), ]

        empleados = self.get_Activos()

        for empleado in empleados:

            option_value = empleado.pers_empleado_numero
            option_status_desc = self.get_StatusDescription(empleado.pers_tipo_codigo)
            option_label = "%s : %s %s" % (
                empleado.pers_empleado_numero,
                empleado.pers_nombre_completo,
                option_status_desc
            )
            option_text = empleado.pers_nombre_completo
            option_status = empleado.pers_tipo_codigo

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
    def get_Activos_ForSelect(self):

        valores = [('', '-------'), ]

        empleados = self.get_Activos()

        for empleado in empleados:

            option_value = empleado.pers_empleado_numero

            option_label = "%s : %s" % (
                empleado.pers_empleado_numero,
                empleado.pers_nombre_completo
            )

            valores.append(
                (
                    option_value,
                    option_label
                )
            )

        return valores

    @classmethod
    def get_StatusDescription(self, value):

        if value in [1124, 1123]:
            return "(Expleado)"

        else:
            return ""

    @classmethod
    def get_SinUsuario_ForSelect(self):

        valores = [('', '------')]

        lista = UserBusiness.get_RhClaves()

        empleados = VIEW_EMPLEADOS_SIMPLE.objects.using('ebs_p').exclude(
            pers_empleado_numero__in=lista
        )

        for empleado in empleados:

            option_value = empleado.pers_empleado_numero

            option_label = "%s : %s" % (
                empleado.pers_empleado_numero,
                empleado.pers_nombre_completo
            )

            valores.append(
                (
                    option_value,
                    option_label
                )
            )

        return valores

    @classmethod
    def get_Empresa(self, _value):

        empleado = VIEW_EMPLEADOS_FULL.objects.using('ebs_p').get(
            pers_empleado_numero=_value
        )

        return empleado.grup_compania_jde
