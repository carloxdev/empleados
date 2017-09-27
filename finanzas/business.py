
# Python's Libraries
from datetime import datetime

# Django's Libraries
from django.shortcuts import get_object_or_404

# Own's Libraries
from .models import ViaticoCabecera

from jde.business import AutorizadorGastosBusiness
from jde.business import CentroCostoBusiness

from django.template.loader import render_to_string
from django.contrib.auth.models import User


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
    def get_ViaticoCabecera(self, _pk):
        viatico_cabecera = get_object_or_404(ViaticoCabecera, pk=_pk)
        return viatico_cabecera

    @classmethod
    def get_ByAutorizar(self, _value):

        if _value.isdigit():
            viaticos_cabecera = ViaticoCabecera.objects.filter(
                autorizador_clave=_value,
                status="fin"
            )
        else:
            viaticos_cabecera = ViaticoCabecera.objects.all()

        return viaticos_cabecera

    @classmethod
    def autorizar(self, _documento, _user):

        if str(_user.username) == str(_documento.autorizador_clave):

            _documento.status = "aut"
            _documento.approved_date = datetime.now()
            _documento.approved_by = _user.profile
            _documento.updated_by = _user.profile
            _documento.save()
        else:
            raise ValueError("Usted no tiene permisos para autorizar este viatico")

    @classmethod
    def cancelar(self, _documento, _user):

        if str(_user.username) == str(_documento.autorizador_clave):

            _documento.status = "can"
            _documento.updated_by = _user.profile
            _documento.save()
        else:
            raise ValueError("Usted no tiene permisos para cancelar este viatico")

    @classmethod
    def send_Mail_ToFinish(self, _subject, _text, _documento, _user):

        mensaje = render_to_string(
            'autorizacion/email.html',
            {
                'viatico': _documento,
                'texto': _text
            }
        )

        personal = []

        personal.append(_documento.empleado_clave)
        personal.append(_documento.autorizador_clave)

        usuarios = User.objects.filter(username__in=personal)

        for usuario in usuarios:

            # Envia correo al creador
            usuario.email_user(_subject, mensaje)

    @classmethod
    def send_Mail_ToAprove(self, _subject, _text, _documento, _user):
        mensaje = render_to_string(
            'autorizacion/email.html',
            {
                'viatico': _documento,
                'texto': _text
            }
        )

        personal = ['200689', '201118', '201518', '201996']

        personal.append(_documento.empleado_clave)
        personal.append(_documento.autorizador_clave)

        usuarios = User.objects.filter(username__in=personal)

        for usuario in usuarios:

            # Envia correo al creador
            usuario.email_user(_subject, mensaje)

    @classmethod
    def set_FinalizarCaptura(self, _cabecera, _user):

        _cabecera.status = "fin"
        _cabecera.updated_by = _user.profile
        import ipdb; ipdb.set_trace()
        _cabecera.save()
