
# Django's Libraries
from django.shortcuts import get_object_or_404

# Own's Libraries
from .models import ViaticoCabecera

from jde.business import AutorizadorGastosBusiness
from jde.business import CentroCostoBusiness


class ViaticoBusiness(object):

    @classmethod
    def set_Data_Autorizacion(self, _viatico_cabecera):

        data_autorizador = AutorizadorGastosBusiness.get_ByEmpleado(
            _viatico_cabecera.empleado_clave
        )

        if data_autorizador.grupo_descripcion != '-':
            _viatico_cabecera.autorizador_grupo = data_autorizador.grupo_descripcion
            _viatico_cabecera.autorizador_clave = data_autorizador.autorizador_clave
            _viatico_cabecera.autorizador_descripcion = data_autorizador.autorizador_nombre
        else:
            raise ValueError("Este empleado no tiene configurado un autorizador, favor de contactar al Depto. CXP")

    @classmethod
    def set_Data_Compania(self, _viatico_cabecera):
        data_compania = CentroCostoBusiness.get_ByClave(
            _viatico_cabecera.un_clave
        )

        _viatico_cabecera.empresa_descripcion = data_compania.compania_desc
        _viatico_cabecera.empresa_rfc = data_compania.compania_rfc
        _viatico_cabecera.empresa_direccion = data_compania.compania_direccion

    @classmethod
    def get_ViaticoCabevera(self, _pk):
        viatico_cabecera = get_object_or_404(ViaticoCabecera, pk=_pk)
        return viatico_cabecera
