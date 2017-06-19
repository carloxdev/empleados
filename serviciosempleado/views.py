# -*- coding: utf-8 -*-

# Django Atajos:
from django.shortcuts import render

# Librerias de Django
from django.views.generic.base import View

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
        contexto = {
            'empleado': empleado,
        }
        return render(request, self.template_name, contexto)


class EmpleadoOrganigrama(View):

    def __init__(self):
        self.template_name = 'empleado_perfil_organigrama.html'

    def get(self, request):

        return render(request, self.template_name)


class EmpleadoOrganigramaOrgAPI(View):

    def get(self, request, pk):

        daddies = VIEW_ORGANIGRAMA.objects.using(
            'ebs_d').filter(asig_organizacion_clave=pk)

        serializador = VIEW_ORGANIGRAMA_ORG_SERIALIZADO()
        lista_json = serializador.get_Json(daddies)

        return HttpResponse(
            lista_json,
            content_type="application/json"
        )
