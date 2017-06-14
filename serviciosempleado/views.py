# -*- coding: utf-8 -*-

# Django Atajos:
from django.shortcuts import render

# Librerias de Django
from django.views.generic.base import View

# Modelos
from ebs.models import VIEW_EMPLEADOS_FULL


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
