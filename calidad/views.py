# -*- coding: utf-8 -*-

# Librerias/Clases Python

# Librerias/Clases Django
from django.shortcuts import render
from django.views.generic.base import View


# Librerias/Clases de Terceros

# Librerias/Clases propias

# Modelos:

# Otros Modelos:


# Formularios:


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


class ConfiguracionRequisitoLista(View):
    def __init__(self):
        self.template_name = 'criterio/configuracion_lista.html'

    def get(self, request):

        # formulario = EmpleadoFilterForm()

        # contexto = {
        #     'form': formulario
        # }

        return render(request, self.template_name, {})


class ConfiguracionProcesoLista(View):
    def __init__(self):
        self.template_name = 'proceso/configuracion_lista.html'

    def get(self, request):

        # formulario = EmpleadoFilterForm()

        # contexto = {
        #     'form': formulario
        # }

        return render(request, self.template_name, {})


class ConfiguracionAprobadorLista(View):
    def __init__(self):
        self.template_name = 'aprobador/configuracion_lista.html'

    def get(self, request):

        # formulario = EmpleadoFilterForm()

        # contexto = {
        #     'form': formulario
        # }

        return render(request, self.template_name, {})


class ConfiguracionAuditorInternoFormulario(View):
    def __init__(self):
        self.template_name = 'auditor_interno/configuracion_formulario.html'

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


class ConfiguracionTipoHallazgoLista(View):
    def __init__(self):
        self.template_name = 'hallazgo/configuracion_lista.html'

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
