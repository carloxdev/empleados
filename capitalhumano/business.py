
# Own's Libraries
from ebs.models import VIEW_ORGANIZACIONES
from jde.models import VIEW_PROVEEDORES
from .models import TipoDocumento
from .models import Curso


class EmpleadoBusiness(object):

    @classmethod
    def get_Organizaciones(self):
        valores = [('', '------------')]

        organizaciones = VIEW_ORGANIZACIONES.objects.using('ebs_p').all()
        for organizacion in organizaciones:

            valores.append(
                (
                    organizacion.clave_org,
                    organizacion.desc_org
                )
            )
        return valores

    @classmethod
    def get_TipoDocumento(self):
        valores = [('', '------------')]

        documentos = TipoDocumento.objects.all()
        for documento in documentos:

            valores.append(
                (
                    documento.id,
                    documento.tipo_documento
                )
            )
        return valores

    @classmethod
    def get_Curso(self):
        valores = [('', '------------')]

        cursos = Curso.objects.all()
        for curso in cursos:

            valores.append(
                (
                    curso.id,
                    curso.nombre_curso
                )
            )
        return valores

    @classmethod
    def get_Proveedores(self):
        valores = [('', '------------')]

        proveedores = VIEW_PROVEEDORES.objects.using('jde_p').all()
        for proveedor in proveedores:
            valores.append(
                (
                    proveedor.clave,
                    proveedor.descripcion
                )
            )
        return valores
