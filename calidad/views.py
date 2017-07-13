# -*- coding: utf-8 -*-

# Librerias/Clases Python

# Librerias/Clases Django
from django.shortcuts import render
from django.views.generic.base import View

# Django Urls:
from django.http import HttpResponse

# Librerias/Clases de Terceros

# Librerias/Clases propias

# Modelos:
from .models import Criterio
from .models import Requisito

# Otros Modelos:


# Formularios:
from .forms import CriterioForm
from .forms import RequisitoFilterForm
from .forms import RequisitoForm
from .forms import ProcesoForm
from .forms import SubprocesoForm

# Serializadore:
from .serializers import RequisitoSerilizado


# ----------------- CALIDAD - Dashboard ----------------- #


class CalidadDashboard(View):
    def __init__(self):
        self.template_name = 'dashboard/calidad_dashboard.html'

    def get(self, request):

        # formulario = EmpleadoFilterForm()

        # contexto = {
        #     'form': formulario
        # }

        return render(request, self.template_name, {})


# ----------------- CALIDAD - AUDITORIAS ----------------- #

class AuditoriaLista(View):
    def __init__(self):
        self.template_name = 'auditoria/auditoria_lista.html'

    def get(self, request):

        # formulario = EmpleadoFilterForm()

        # contexto = {
        #     'form': formulario
        # }

        return render(request, self.template_name, {})


class GeneralFormulario(View):
    def __init__(self):
        self.template_name = 'auditoria/general_formulario.html'

    def get(self, request):

        # formulario = EmpleadoFilterForm()

        # contexto = {
        #     'form': formulario
        # }

        return render(request, self.template_name, {})


class AuditorFormulario(View):
    def __init__(self):
        self.template_name = 'auditor/auditor_formulario.html'

    def get(self, request):

        # formulario = EmpleadoFilterForm()

        # contexto = {
        #     'form': formulario
        # }

        return render(request, self.template_name, {})


class ProcesoLista(View):
    def __init__(self):
        self.template_name = 'proceso/proceso_lista.html'

    def get(self, request):

        # formulario = EmpleadoFilterForm()

        # contexto = {
        #     'form': formulario
        # }

        return render(request, self.template_name, {})


class ProcesoFormulario(View):
    def __init__(self):
        self.template_name = 'proceso/proceso_formulario.html'

    def get(self, request):

        # formulario = EmpleadoFilterForm()

        # contexto = {
        #     'form': formulario
        # }

        return render(request, self.template_name, {})


class RequisitoLista(View):
    def __init__(self):
        self.template_name = 'requisito_auditoria/requisito_lista.html'

    def get(self, request):

        # formulario = EmpleadoFilterForm()

        # contexto = {
        #     'form': formulario
        # }

        return render(request, self.template_name, {})


class HallazgoLista(View):
    def __init__(self):
        self.template_name = 'hallazgo/hallazgo_lista.html'

    def get(self, request):

        # formulario = EmpleadoFilterForm()

        # contexto = {
        #     'form': formulario
        # }

        return render(request, self.template_name, {})


class HallazgoDetalle(View):
    def __init__(self):
        self.template_name = 'hallazgo/hallazgo_detalle.html'

    def get(self, request):

        # formulario = EmpleadoFilterForm()

        # contexto = {
        #     'form': formulario
        # }

        return render(request, self.template_name, {})


# class EvidenciaFormulario(View):
#     def __init__(self):
#         self.template_name = 'evidencia/evidencia_formulario.html'

#     def get(self, request):

#         # formulario = EmpleadoFilterForm()

#         # contexto = {
#         #     'form': formulario
#         # }

#         return render(request, self.template_name, {})


# class PlanAccionLista(View):
#     def __init__(self):
#         self.template_name = 'plan_accion/plan_accion_lista.html'

#     def get(self, request):

#         # formulario = EmpleadoFilterForm()

#         # contexto = {
#         #     'form': formulario
#         # }

#         return render(request, self.template_name, {})


# class SeguimientoPlanAccionFormulario(View):
#     def __init__(self):
#         self.template_name = 'seguimiento_plan_accion/seguimiento_plan_accion_formulario.html'

#     def get(self, request):

#         # formulario = EmpleadoFilterForm()

#         # contexto = {
#         #     'form': formulario
#         # }

#         return render(request, self.template_name, {})


# ----------------- CALIDAD - PROGRAMA ----------------- #


class ProgramaLista(View):
    def __init__(self):
        self.template_name = 'programa_lista.html'

    def get(self, request):

        # formulario = EmpleadoFilterForm()

        # contexto = {
        #     'form': formulario
        # }

        return render(request, self.template_name, {})

# ----------------- CALIDAD - CONFIGURACION ----------------- #


class ConfiguracionCriterioLista(View):
    def __init__(self):
        self.template_name = 'criterio/configuracion_lista.html'

    def get(self, request):

        formularioCriterio = CriterioForm()
        formularioRequisito = RequisitoForm()
        formularioFiltro = RequisitoFilterForm()

        contexto = {
            'formularioCriterio': formularioCriterio,
            'formularioRequisito': formularioRequisito,
            'formularioFiltro': formularioFiltro
        }

        return render(request, self.template_name, contexto)


class ConfiguracionRequisitoAPI(View):

    def get(self, request):

        daddies = Criterio.objects.all()

        serializador = RequisitoSerilizado()
        lista_json = serializador.get_Json(daddies)
        return HttpResponse(
            lista_json,
            content_type="application/json"
        )


class ConfiguracionProcesoLista(View):
    def __init__(self):
        self.template_name = 'proceso/configuracion_lista.html'

    def get(self, request):

        formularioProceso = ProcesoForm()
        formularioSubproceso = SubprocesoForm()

        contexto = {
            'formularioProceso': formularioProceso,
            'formularioSubproceso': formularioSubproceso,
        }

        return render(request, self.template_name, contexto)


class ConfiguracionUsuarioLista(View):
    def __init__(self):
        self.template_name = 'usuario/configuracion_lista.html'

    def get(self, request):

        # formulario = EmpleadoFilterForm()

        # contexto = {
        #     'form': formulario
        # }

        return render(request, self.template_name, {})


class ConfiguracionSitioLista(View):
    def __init__(self):
        self.template_name = 'sitio/configuracion_lista.html'

    def get(self, request):

        # formulario = EmpleadoFilterForm()

        # contexto = {
        #     'form': formulario
        # }

        return render(request, self.template_name, {})


class ConfiguracionMetodologiaLista(View):
    def __init__(self):
        self.template_name = 'metodologia/configuracion_lista.html'

    def get(self, request):

        # formulario = EmpleadoFilterForm()

        # contexto = {
        #     'form': formulario
        # }

        return render(request, self.template_name, {})


class ConfiguracionTipoFallaLista(View):
    def __init__(self):
        self.template_name = 'falla/configuracion_lista.html'

    def get(self, request):

        # formulario = EmpleadoFilterForm()

        # contexto = {
        #     'form': formulario
        # }

        return render(request, self.template_name, {})


class ConfiguracionFormatoLista(View):
    def __init__(self):
        self.template_name = 'formato/configuracion_lista.html'

    def get(self, request):

        # formulario = EmpleadoFilterForm()

        # contexto = {
        #     'form': formulario
        # }

        return render(request, self.template_name, {})
