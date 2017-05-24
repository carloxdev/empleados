
# Own's Libraries
from ebs.models import VIEW_EMPLEADOS_SIMPLE
from seguridad.business import UserBusiness


class EmpleadoBusiness(object):

    @classmethod
    def get_Activos(self):
        """ Funcion que devuelve solo a empleados activos,
            que tienen numero de empleado y
            los regresa ordenados por nombre """

        empleados = VIEW_EMPLEADOS_SIMPLE.objects.using('ebs_d').filter(
            pers_tipo_codigo__in=['1121', '1120']
        ).exclude(
            pers_empleado_numero__isnull=True
        ).order_by('pers_nombre_completo')

        return empleados

    @classmethod
    def get_Todos(self):

        empleados = VIEW_EMPLEADOS_SIMPLE.objects.using('ebs_d').exclude(
            pers_empleado_numero__isnull=True
        ).order_by('pers_nombre_completo')

        return empleados

    @classmethod
    def get_Todos_ForSelectCustom(self):
        """ Funcion que devuelve una lista de Tuplas,
            con ciertos datos del empleado y
            los regresa ordenados por nombre """

        valores = [('', '-------', '', ''), ]

        empleados = VIEW_EMPLEADOS_SIMPLE.objects.using('ebs_d').exclude(
            pers_empleado_numero__isnull=True
        ).order_by('pers_nombre_completo')

        for empleado in empleados:

            option_value = empleado.pers_empleado_numero,
            option_status_desc = self.get_StatusDescription(empleado.pers_tipo_codigo)
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
                ),
            )

        return valores

    @classmethod
    def get_StatusDescription(self, value):

        if value in [1124, 1123]:
            return "(baja)"

        else:
            return ""

    @classmethod
    def get_SinUsuario_ForSelect(self):
        """ Funcion que devuelve una lista de tuplas,
            con los Empleados que no tienen
            usuario asignado
        """

        valores = [('', '------')]

        lista = UserBusiness.get_RhClaves()

        empleados = VIEW_EMPLEADOS_SIMPLE.objects.filter(
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
