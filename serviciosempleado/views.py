# -*- coding: utf-8 -*-

# Django's Libraries
from django.http import HttpResponse
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.shortcuts import redirect
from django.core.urlresolvers import reverse
from django.views.generic.base import View
from django.core.files.storage import default_storage

# Own's Libraries
from ebs.models import VIEW_EMPLEADOS_FULL
from ebs.models import VIEW_ORGANIGRAMA

from .serializers import VIEW_ORGANIGRAMA_ORG_SERIALIZADO

from .forms import MiViaticoFilterForm


class EmpleadoPerfil(View):

    def __init__(self):
        self.template_name = 'empleado_perfil.html'

    def get(self, request):
        usuario_logeado = request.user.profile.clave_rh
        if usuario_logeado is not None:
            empleado = VIEW_EMPLEADOS_FULL.objects.using('ebs_d').filter(
                pers_empleado_numero=usuario_logeado)

            url = self.construir_Url(empleado)
            ruta = self.comprobar_Direccion(url)

            contexto = {
                'empleado': empleado,
                'ruta': ruta,
            }
        else:
            contexto = {}
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
        if clave is not None:
            empleado = VIEW_ORGANIGRAMA.objects.using(
                "ebs_d").get(pers_empleado_numero=clave)

            organizacion = empleado.asig_organizacion_clave

            contexto = {
                'organizacion': organizacion,
            }
        else:
            contexto = {}
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


class MiViaticoLista(View):
    def __init__(self):
        self.template_name = 'mi_viatico/mi_viatico_lista.html'

    def get(self, request):

        formulario = MiViaticoFilterForm()

        contexto = {
            'form': formulario
        }

        return render(request, self.template_name, contexto)
