# -*- coding: utf-8 -*-

# Django Atajos:
from django.shortcuts import render
from django.http import HttpResponse

# Librerias de Django
from django.views.generic.base import View
from django.core.files.storage import default_storage

# Modelos
from ebs.models import VIEW_EMPLEADOS_FULL
from ebs.models import VIEW_ORGANIGRAMA

# Serializers
from serializers import VIEW_ORGANIGRAMA_ORG_SERIALIZADO


class EmpleadoPerfil(View):

    def __init__(self):
        self.template_name = 'empleado_perfil.html'

    def get(self, request):
        logeado = request.user
        empleado = VIEW_EMPLEADOS_FULL.objects.using('ebs_d').filter(
            pers_empleado_numero=logeado.profile.clave_rh)
        url = self.construir_Url(empleado)
        ruta = self.comprobar_Direccion(url)

        contexto = {
            'empleado': empleado,
            'ruta': ruta,
        }
        return render(request, self.template_name, contexto)

    def construir_Url(self, _empleado):
        nombre = ''
        for dato in _empleado:
            if dato.pers_segundo_nombre == '-':
                nombre = dato.pers_primer_nombre + '_' \
                    + dato.pers_apellido_paterno + '_'  \
                    + dato.pers_apellido_materno
            else:
                nombre = dato.pers_primer_nombre + '_' \
                    + dato.pers_segundo_nombre + '_'  \
                    + dato.pers_apellido_paterno + '_'  \
                    + dato.pers_apellido_materno
        url = 'capitalhumano/images/user_foto/' + nombre + '.jpg'
        return url

    def comprobar_Direccion(self, _url):
        ruta = ''

        if default_storage.exists(_url):
            ruta = '/media/' + _url
        else:
            ruta = '/static/theme/img/avatar-150.png'

        return ruta


class EmpleadoOrganigrama(View):

    def __init__(self):
        self.template_name = 'empleado_perfil_organigrama.html'

    def get(self, request):
        clave = request.user.profile.clave_rh
        empleado = VIEW_ORGANIGRAMA.objects.using(
            "ebs_d").get(pers_empleado_numero=clave)

        organizacion = empleado.asig_organizacion_clave

        contexto = {
            'organizacion': organizacion,
        }
        return render(request, self.template_name, contexto)


class EmpleadoOrganigramaAPI(View):

    def get(self, request, pk):

        daddies = VIEW_ORGANIGRAMA.objects.using(
            'ebs_d').filter(asig_organizacion_clave=pk)

        serializador = VIEW_ORGANIGRAMA_ORG_SERIALIZADO()
        lista_json = serializador.get_Json(daddies)

        return HttpResponse(
            lista_json,
            content_type="application/json"
        )
