# -*- coding: utf-8 -*-

# Librerias/Clases Python
import datetime

# Librerias/Clases Django
from django.shortcuts import render
from django.views.generic.base import View
from django.views.generic.edit import CreateView
from django.views.generic.edit import UpdateView
from django.shortcuts import get_object_or_404
from django.shortcuts import redirect
from django.core.urlresolvers import reverse_lazy

# Django Urls:
from django.core.urlresolvers import reverse

# Django Urls:
from django.http import HttpResponse

# Librerias/Clases de Terceros

# Librerias/Clases propias

# Modelos:
from .models import Criterio
from .models import Proceso
from .models import Rol
from .models import Formato
from .models import Auditoria
from administracion.models import Contrato
from .models import Criterio
from .models import CompaniaAccion

# Otros Modelos:


# Formularios:
from .forms import CriterioForm
from .forms import RequisitoFilterForm
from .forms import RequisitoForm
from .forms import ProcesoForm
from .forms import SubprocesoForm
from .forms import ResponsableForm
from .forms import RolForm
from .forms import RolFilterForm
from .forms import CompaniaRolForm
from .forms import SitioForm
from .forms import MetodologiaForm
from .forms import FallaForm
from .forms import FormatoForm
from .forms import GeneralAuditoriaForm
from .forms import AuditorForm

# Serializadore:
from .serializers import RequisitoSerilizado
from .serializers import SubprocesoSerilizado


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

        formulario = GeneralAuditoriaForm()

        contexto = {
            'form': formulario
        }

        return render(request, self.template_name, contexto)

    def post(self, request):

        formulario = GeneralAuditoriaForm(request.POST)

        if formulario.is_valid():
            datos_formulario = formulario.cleaned_data
            auditoria = Auditoria()
            contrato = Contrato()
            criterio = Criterio()
            auditoria.folio = self.get_Folio()
            auditoria.tipo_auditoria = datos_formulario.get('tipo_de_auditoria')
            auditoria.compania = datos_formulario.get('compania')
            if datos_formulario.get('fecha_programada_ini') is not u'':
                auditoria.fecha_programada_inicial = datos_formulario.get('fecha_programada_ini')
            if datos_formulario.get('fecha_programada_fin') is not u'':
                auditoria.fecha_programada_final = datos_formulario.get('fecha_programada_fin')
            auditoria.objetivo = datos_formulario.get('objetivo')
            auditoria.alcance = datos_formulario.get('alcance')
            auditoria.recurso_necesario = datos_formulario.get('recursos_necesarios')
            auditoria.save()

            for criterio in datos_formulario.get('criterios'):
                cri = Criterio.objects.get(pk=criterio)
                auditoria.criterio.add(cri)

            for contrato in datos_formulario.get('contratos'):
                con = Contrato.objects.get(con_clave=contrato)
                auditoria.contrato.add(con)

            return redirect(reverse('calidad:auditor_formulario', kwargs={'pk': auditoria.pk}))

        contexto = {
            'form': formulario,
            'operation': 'Nuevo',
        }

        return render(request, self.template_name, contexto)

    def get_Folio(self):
        fecha = datetime.datetime.now()
        last_digits = str(fecha.year)[2:]
        auditorias = Auditoria.objects.filter(folio__icontains=last_digits)
        noAuditoria = ""
        no_aud_act = 1

        if len(auditorias):
            for auditoria in auditorias:
                folio = int(auditoria.folio.split("-")[1])
                if folio > no_aud_act:
                    no_aud_act = folio
            no_aud_act = no_aud_act + 1

        if len(str(no_aud_act)) == 1:
            noAuditoria = "0"+str(no_aud_act)
        return "AUD-" +noAuditoria+ "-" + last_digits


class AuditorFormulario(View):

    def __init__(self):
        self.template_name = 'auditor/auditor_formulario.html'

    def get(self, request, pk):


        auditoria = Auditoria.objects.get(pk = pk)
        compania_codigo = auditoria.compania.split(':')[0]
        # auditor_lider = CompaniaAccion.objects.filter(compania_codigo = compania_codigo, rol__rol='Auditor Lider')
        auditor_lider = Rol.objects.filter(companiaaccion__compania_codigo=compania_codigo, rol='Auditor Lider' )
        # auditor_lider = Rol.objects.filter(compania=auditoria.compania, rol='Auditor Lider')
        # formulario = EmpleadoFilterForm()
        formulario = AuditorForm(initial = {'auditor_lider': auditor_lider[0].nombre_completo})
        contexto = {
            'form': formulario,
            'folio': auditoria.folio,
        }

        return render(request, self.template_name, contexto)


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
        formularioResponsable = ResponsableForm()

        contexto = {
            'formularioProceso': formularioProceso,
            'formularioSubproceso': formularioSubproceso,
            'formularioResponsable': formularioResponsable
        }

        return render(request, self.template_name, contexto)


class ConfiguracionSubprocesoAPI(View):

    def get(self, request):

        daddies = Proceso.objects.all()

        serializador = SubprocesoSerilizado()
        lista_json = serializador.get_Json(daddies)
        return HttpResponse(
            lista_json,
            content_type="application/json"
        )


class ConfiguracionRolLista(View):

    def __init__(self):
        self.template_name = 'rol/configuracion_lista.html'

    def get(self, request):

        formularioRol = RolForm()
        formularioRolFiltro = RolFilterForm()
        formularioCompaniaRol = CompaniaRolForm()
        roles = Rol.objects.all()
        contexto = {
            'formularioRol': formularioRol,
            'formularioRolFiltro': formularioRolFiltro,
            'formularioCompaniaRol': formularioCompaniaRol,
            'roles': roles,
        }

        return render(request, self.template_name, contexto)

    # def post(self, request):

    #     formulario = RolForm(request.POST)

    #     if formulario.is_valid():
    #         datos_formulario = formulario.cleaned_data
    #         rol = Rol()
    #         texto = datos_formulario.get('empleado')
    #         datos = texto.split(":")
    #         numero_empleado = datos[0]
    #         nombre_completo = datos[1]
    #         rol.numero_empleado = numero_empleado
    #         rol.nombre_completo = nombre_completo
    #         rol.rol = datos_formulario.get('rol')
    #         rol.save()

    #         return redirect(reverse('calidad:configuracion_rol_lista'))

    #     contexto = {
    #         'form': formulario,
    #         'operation': 'Nuevo',
    #     }

    #     return render(request, self.template_name, contexto)


# class ConfiguracionRolNuevo(View):

#     def __init__(self):
#         self.template_name = 'rol/configuracion_lista.html'

#     def get(self, request):

#         formularioRol = RolForm()
#         formularioRolFiltro = RolFilterForm()
#         formularioCompaniaRol = CompaniaRolForm()
#         roles = Rol.objects.all()
#         contexto = {
#             'formularioRol': formularioRol,
#             'formularioRolFiltro': formularioRolFiltro,
#             'formularioCompaniaRol': formularioCompaniaRol,
#             'roles': roles,
#         }
#         return render(request, self.template_name, contexto)

#     def post(self, request):
#         formulario = RolForm(request.POST)

#         if formulario.is_valid():
#             datos_formulario = formulario.cleaned_data
#             rol = Rol()
#             texto = datos_formulario.get('empleado')
#             datos = texto.split(":")
#             numero_empleado = datos[0]
#             nombre_completo = datos[1]
#             rol.numero_empleado = numero_empleado
#             rol.nombre_completo = nombre_completo
#             rol.rol = datos_formulario.get('rol')
#             rol.save()

#             return redirect(reverse('calidad:configuracion_rol_lista'))

#         contexto = {
#             'form': formulario,
#             'operation': 'Nuevo',
#         }

#         return render(request, self.template_name, contexto)


# class ConfiguracionRolEditar(View):

#     def __init__(self):
#         self.template_name = 'rol/configuracion_lista.html'

#     def get(self, request):

#         formularioRol = RolForm()
#         formularioRolFiltro = RolFilterForm()
#         formularioCompaniaRol = CompaniaRolForm()
#         roles = Rol.objects.all()
#         contexto = {
#             'formularioRol': formularioRol,
#             'formularioRolFiltro': formularioRolFiltro,
#             'formularioCompaniaRol': formularioCompaniaRol,
#             'roles': roles,
#         }

#         return render(request, self.template_name, contexto)

#     def post(self, request):

#         rol = get_object_or_404(Rol, pk=pk)

#         formulario = RolForm(request.POST)

#         if formulario.is_valid():
#             datos_formulario = formulario.cleaned_data
#             rol = Rol()
#             texto = datos_formulario.get('empleado')
#             datos = texto.split(":")
#             numero_empleado = datos[0]
#             nombre_completo = datos[1]
#             rol.numero_empleado = numero_empleado
#             rol.nombre_completo = nombre_completo
#             rol.rol = datos_formulario.get('rol')
#             rol.save()

#             return redirect(reverse('calidad:configuracion_rol_lista'))

#         contexto = {
#             'form': formulario,
#             'operation': 'Nuevo',
#         }

#         return render(request, self.template_name, contexto)


class ConfiguracionSitioLista(View):

    def __init__(self):
        self.template_name = 'sitio/configuracion_lista.html'

    def get(self, request):

        formulario = SitioForm()

        contexto = {
            'form': formulario
        }

        return render(request, self.template_name, contexto)


class ConfiguracionMetodologiaLista(View):

    def __init__(self):
        self.template_name = 'metodologia/configuracion_lista.html'

    def get(self, request):

        formulario = MetodologiaForm()

        contexto = {
            'form': formulario
        }

        return render(request, self.template_name, contexto)


class ConfiguracionTipoFallaLista(View):

    def __init__(self):
        self.template_name = 'falla/configuracion_lista.html'

    def get(self, request):

        formulario = FallaForm()

        contexto = {
            'form': formulario
        }

        return render(request, self.template_name, contexto)


class ConfiguracionFormatoLista(View):

    def __init__(self):
        self.template_name = 'formato/configuracion_lista.html'

    def get(self, request):

        formulario = FormatoForm()
        formatos = Formato.objects.all()

        contexto = {
            'form': formulario,
            'formatos': formatos
        }

        return render(request, self.template_name, contexto)
