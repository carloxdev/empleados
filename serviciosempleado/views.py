# -*- coding: utf-8 -*-

# Django's Libraries
from django.http import HttpResponse
from django.shortcuts import render
from django.views.generic.base import View
from django.core.files.storage import default_storage

# Modelos
from ebs.models import VIEW_EMPLEADOS_FULL
from ebs.models import VIEW_ORGANIGRAMA

# Serializers
from .serializers import VIEW_ORGANIGRAMA_ORG_SERIALIZADO

# Fomularios
from .forms import MiViaticoFilterForm
from .forms import NuevaSolicitudForm
from .forms import SolicitudesFilterForm


class MiPerfil(View):

    def __init__(self):
        self.template_name = 'mi_perfil.html'

    def get(self, request):
        usuario_logeado = request.user.profile.clave_rh
        if usuario_logeado is not None:
            form = NuevaSolicitudForm()
            empleado = VIEW_EMPLEADOS_FULL.objects.using('ebs_p').filter(
                pers_empleado_numero=usuario_logeado)

            ruta = self.comprobar_Direccion(empleado)

            for dato in empleado:
                fecha_contratacion = self.construir_Fecha(
                    dato.pers_fecha_contratacion)
                fecha_nacimiento = self.construir_Fecha(
                    dato.pers_fecha_nacimiento)

            contexto = {
                'form': form,
                'empleado': empleado,
                'fecha_contratacion': fecha_contratacion,
                'fecha_nacimiento': fecha_nacimiento,
                'ruta': ruta,
            }
        else:
            contexto = {}
        return render(request, self.template_name, contexto)

    def comprobar_Direccion(self, _empleado):
        ruta = ''
        url = ''
        url2 = ''

        for dato in _empleado:
            url = 'capitalhumano/fotos/' + dato.nombre_foto + '.JPG'
            url2 = 'capitalhumano/fotos/' + dato.nombre_foto + '.jpg'

        if default_storage.exists(url):
            ruta = '/media/' + url
        elif default_storage.exists(url2):
            ruta = '/media/' + url2
        else:
            ruta = '/static/theme/img/avatar-150.png'

        return ruta

    def construir_Fecha(self, _campo):
        fecha_split = _campo.split('-')
        fecha = fecha_split[2].split(" 00:00:00")[
            0] + "/" + fecha_split[1] + "/" + fecha_split[0]
        return fecha


class MiOrganigrama(View):

    def __init__(self):
        self.template_name = 'mi_organigrama.html'

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


class MiBuzon(View):

    def __init__(self):
        self.template_name = 'mi_buzon/mi_buzon.html'

    def get(self, request):
        clave = request.user.profile.clave_rh
        if clave is not None:

            form = SolicitudesFilterForm()
            form_nuevo = NuevaSolicitudForm()

            contexto = {
                'form': form,
                'form2': form_nuevo,
            }
        else:
            contexto = {}

        return render(request, self.template_name, contexto)


class MiNomina(View):

    def __init__(self):
        self.template_name = 'mi_nomina.html'

    def get(self, request):
        clave = request.user.profile.clave_rh
        if clave is not None:
            empleado = VIEW_EMPLEADOS_FULL.objects.using(
                'ebs_p').get(pers_empleado_numero=clave)
            contexto = {
                'rfc': empleado.pers_rfc
            }
        else:
            contexto = {}

        return render(request, self.template_name, contexto)
