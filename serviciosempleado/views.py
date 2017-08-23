# -*- coding: utf-8 -*-

# Django's Libraries
from django.http import HttpResponse
from django.shortcuts import render
from django.views.generic.base import View
from django.core.files.storage import default_storage

# Own's Libraries
from ebs.models import VIEW_EMPLEADOS_FULL
from ebs.models import VIEW_ORGANIGRAMA

from .serializers import VIEW_ORGANIGRAMA_ORG_SERIALIZADO

from .forms import MiViaticoFilterForm
from .forms import NuevaSolicitudForm


class EmpleadoPerfil(View):

    def __init__(self):
        self.template_name = 'empleado_perfil.html'

    def get(self, request):
        usuario_logeado = request.user.profile.clave_rh
        if usuario_logeado is not None:
            form = NuevaSolicitudForm()
            empleado = VIEW_EMPLEADOS_FULL.objects.using('ebs_p').filter(
                pers_empleado_numero=usuario_logeado)

            ruta = self.comprobar_Direccion(empleado)

            contexto = {
                'form': form,
                'empleado': empleado,
                'ruta': ruta,
            }
        else:
            contexto = {}
        return render(request, self.template_name, contexto)

    def comprobar_Direccion(self, _empleado):
        ruta = ''
        url = ''

        for dato in _empleado:
            url = 'capitalhumano/images/' + dato.nombre_foto

        if default_storage.exists(url):
            ruta = '/media/' + url
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
                "ebs_p").get(pers_empleado_numero=clave)

            organizacion = empleado.asig_organizacion_clave

            contexto = {
                'organizacion': organizacion,
            }
        else:
            contexto = {}
        return render(request, self.template_name, contexto)


class EmpleadoOrganigramaAPI(View):

    def get(self, request, pk, clave_rh):

        daddies = VIEW_ORGANIGRAMA.objects.using(
            'ebs_p').filter(asig_organizacion_clave=pk)

        serializador = VIEW_ORGANIGRAMA_ORG_SERIALIZADO()
        lista_json = serializador.get_Json(daddies, clave_rh)

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
