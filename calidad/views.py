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
from django.db import IntegrityError
from django.contrib import messages

# Django Urls:
from django.core.urlresolvers import reverse

# Django Urls:
from django.http import HttpResponse

# Librerias/Clases de Terceros

# Librerias/Clases propias
from .methods import CalidadMethods

# Modelos:
from administracion.models import Contrato
from jde.models import VIEW_CONTRATO
from .models import Criterio
from .models import Proceso
from .models import Rol
from .models import Formato
from .models import Auditoria
from .models import Criterio
from .models import AuditoriaContrato
from .models import CompaniaAccion
from .models import ProcesoAuditoria
from .models import Responsable
from .models import RequisitoProceso
from .models import Requisito
from .models import HallazgoProceso
from .models import Falla
from .models import Subproceso

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
from .forms import ProcesoAuditoriaForm
from .forms import RequisitoProcesoForm
from .forms import HallazgoProcesoForm
from .forms import HallazgoProcesoFilterForm
from .forms import ProcesoAuditoriaEdicionForm
from .forms import HallazgoProcesoDetalleForm
from .forms import AnalisisHallazgoForm
from .forms import PlanAccionHallazgoForm
from .forms import SeguimientoPlanAccionForm
from .forms import SeguimeintoPlanAccionEvaluacionForm
from .forms import EvidenciaHallazgoForm

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

        auditorias = Auditoria.objects.all()
        # formulario = EmpleadoFilterForm()

        contexto = {
            # 'form': formulario
            'auditorias' : auditorias
        }

        return render(request, self.template_name, contexto)


class GeneralFormularioCreate(View):

    def __init__(self):
        self.template_name = 'auditoria/general_formulario.html'

    def get(self, request):

        formulario = GeneralAuditoriaForm()

        contexto = {
            'form': formulario,
            'operation': 'Nuevo'
        }

        return render(request, self.template_name, contexto)

    def post(self, request):

        formulario = GeneralAuditoriaForm(request.POST)

        compania_codigo = request.POST['compania'].split(':')[0]
        mensaje = ""
        mensaje_autorizador = ""
        mensaje_aprobador = ""
        mensaje_lider = ""
        error = False

        try:
            autorizador = Rol.objects.get(companiaaccion__compania_codigo=compania_codigo, rol='Autorizador')
        except Rol.DoesNotExist:
            mensaje_autorizador = " Autorizador"
            error = True
        try:
            aprobador = Rol.objects.get(companiaaccion__compania_codigo=compania_codigo, rol='Aprobador')
        except Rol.DoesNotExist:
            mensaje_aprobador = " Aprobador"
            error = True
        try:
            auditor_lider = Rol.objects.get(companiaaccion__compania_codigo=compania_codigo, rol='Auditor Lider')
        except Rol.DoesNotExist:
            mensaje_lider = " Auditor lider"
            error = True

        if error:
            mensaje = CalidadMethods.get_Coma(mensaje_autorizador, mensaje_aprobador) + CalidadMethods.get_Coma(mensaje_aprobador, mensaje_lider) + mensaje_lider

        contexto = {
            'form': formulario,
            'mensaje': mensaje,
        }

        if len(mensaje):
            return render(request, self.template_name, contexto)

        if formulario.is_valid():
            datos_formulario = formulario.cleaned_data
            auditoria = Auditoria()

            auditoria.folio = self.get_Folio()
            auditoria.tipo_auditoria = datos_formulario.get('tipo_de_auditoria')
            auditoria.compania = datos_formulario.get('compania')
            if datos_formulario.get('fecha_programada_ini') is not u'':
                auditoria.fecha_programada_inicial = CalidadMethods.get_FechaConFormato(datos_formulario.get('fecha_programada_ini'))
            if datos_formulario.get('fecha_programada_fin') is not u'':
                auditoria.fecha_programada_final = CalidadMethods.get_FechaConFormato(datos_formulario.get('fecha_programada_fin'))
            auditoria.objetivo = datos_formulario.get('objetivo')
            auditoria.alcance = datos_formulario.get('alcance')
            auditoria.recurso_necesario = datos_formulario.get('recursos_necesarios')
            auditoria.estado = 'En Captura'
            auditoria.autorizador = autorizador.nombre_completo
            auditoria.aprobador = aprobador.nombre_completo
            auditoria.create_by = CalidadMethods.get_Usuario(request.user.id)
            auditoria.save()

            for criterio in datos_formulario.get('criterios'):
                cri = Criterio.objects.get(pk=criterio)
                auditoria.criterio.add(cri)

            for contrato in datos_formulario.get('contratos'):
                contratos = AuditoriaContrato()
                contratos.id_auditoria = Auditoria.objects.get(pk =  auditoria.pk)
                contratos.id_contrato = contrato
                contratos.save()

            return redirect(reverse('calidad:auditor_formulario_update', kwargs={'pk': auditoria.pk}))


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


class GeneralFormularioUpdate(View):

    def __init__(self):
        self.template_name = 'auditoria/general_formulario.html'

    def get(self, request, pk):

        auditoria = get_object_or_404( Auditoria, pk=pk )
        contratos = []
        criterios = []

        for contrato in AuditoriaContrato.objects.filter( id_auditoria=pk ):
            contratos.append(contrato.id_contrato)

        for criterio in auditoria.criterio.all():
            criterios.append(criterio.pk)

        initial_data = {
            'tipo_de_auditoria' : auditoria.tipo_auditoria,
            'compania' : auditoria.compania,
            'contratos' : contratos,
            'criterios' : criterios,
            'fecha_programada_ini': CalidadMethods.set_FechaConFormato(auditoria.fecha_programada_inicial),
            'fecha_programada_fin': CalidadMethods.set_FechaConFormato(auditoria.fecha_programada_final),
            'objetivo': auditoria.objetivo,
            'alcance': auditoria.alcance,
            'recursos_necesarios': auditoria.recurso_necesario,
        }

        formulario = GeneralAuditoriaForm( initial=initial_data )

        contexto = {
            'form': formulario,
            'operation': 'Editar',
            'folio': auditoria.folio,
            'pk': pk,
        }

        return render(request, self.template_name, contexto)

    def post(self, request, pk):

        formulario = GeneralAuditoriaForm(request.POST)
        auditoria = get_object_or_404(Auditoria, pk = pk)

        compania_codigo = request.POST['compania'].split(':')[0]
        mensaje = ""
        mensaje_autorizador = ""
        mensaje_aprobador = ""
        mensaje_lider = ""
        error = False

        try:
            autorizador = Rol.objects.get(companiaaccion__compania_codigo=compania_codigo, rol='Autorizador')
        except Rol.DoesNotExist:
            mensaje_autorizador = " Autorizador"
            error = True
        try:
            aprobador = Rol.objects.get(companiaaccion__compania_codigo=compania_codigo, rol='Aprobador')
        except Rol.DoesNotExist:
            mensaje_aprobador = " Aprobador"
            error = True
        try:
            auditor_lider = Rol.objects.get(companiaaccion__compania_codigo=compania_codigo, rol='Auditor Lider')
        except Rol.DoesNotExist:
            mensaje_lider = " Auditor lider"
            error = True

        if error:
            mensaje = CalidadMethods.get_Coma(mensaje_autorizador, mensaje_aprobador) + CalidadMethods.get_Coma(mensaje_aprobador, mensaje_lider) + mensaje_lider

        contexto = {
            'form': formulario,
            'mensaje': mensaje,
        }

        if len(mensaje):
            return render(request, self.template_name, contexto)

        if formulario.is_valid():
            datos_formulario = formulario.cleaned_data

            contrato = VIEW_CONTRATO()
            criterio = Criterio()
            auditoria.tipo_auditoria = datos_formulario.get('tipo_de_auditoria')
            auditoria.compania = datos_formulario.get('compania')
            if datos_formulario.get('fecha_programada_ini') is not u'':
                auditoria.fecha_programada_inicial = CalidadMethods.get_FechaConFormato(datos_formulario.get('fecha_programada_ini'))
            if datos_formulario.get('fecha_programada_fin') is not u'':
                auditoria.fecha_programada_final = CalidadMethods.get_FechaConFormato(datos_formulario.get('fecha_programada_fin'))
            auditoria.objetivo = datos_formulario.get('objetivo')
            auditoria.alcance = datos_formulario.get('alcance')
            auditoria.recurso_necesario = datos_formulario.get('recursos_necesarios')
            auditoria.update_by = CalidadMethods.get_Usuario(request.user.id)
            auditoria.save()

            aud_cri_list_db = []
            aud_con_list_db = []

            for criterio_lista in auditoria.criterio.all():
                aud_cri_list_db.append(criterio_lista.id)

            for criterio in datos_formulario.get('criterios'):
                cri = Criterio.objects.get(pk=criterio)

                if cri.pk in aud_cri_list_db:
                    aud_cri_list_db.remove(cri.pk)
                else:
                    auditoria.criterio.add(cri)

            for lista in aud_cri_list_db:
                auditoria.criterio.remove(Criterio.objects.get(pk=lista))

            contratos = AuditoriaContrato.objects.filter(id_auditoria = pk)

            for contrato in contratos:
                aud_con_list_db.append(contrato.id_contrato)

            for contrato in datos_formulario.get('contratos'):

                if contrato in aud_con_list_db:

                    aud_con_list_db.remove(contrato)
                else:
                    con = AuditoriaContrato()
                    con.id_contrato = contrato
                    con.id_auditoria = Auditoria.objects.get(pk = pk)
                    con.save()

            for lista in aud_con_list_db:
                AuditoriaContrato.objects.filter(id_auditoria = pk, id_contrato = lista).delete()

            return redirect(reverse('calidad:general_formulario_update', kwargs={'pk': pk}))

        contratos = []
        criterios = []

        for contrato in AuditoriaContrato.objects.filter( id_auditoria=pk ):
            contratos.append(contrato.id_contrato)

        for criterio in auditoria.criterio.all():
            criterios.append(criterio.pk)

        initial_data = {
            'tipo_de_auditoria' : auditoria.tipo_auditoria,
            'compania' : auditoria.compania,
            'contratos' : contratos,
            'criterios' : criterios,
            'fecha_programada_ini': CalidadMethods.set_FechaConFormato(auditoria.fecha_programada_inicial),
            'fecha_programada_fin': CalidadMethods.set_FechaConFormato(auditoria.fecha_programada_final),
            'objetivo': auditoria.objetivo,
            'alcance': auditoria.alcance,
            'recursos_necesarios': auditoria.recurso_necesario,
        }

        contexto = {
            'form': formulario,
            'operation': 'Editar',
            'folio': auditoria.folio,
            'pk': pk,
        }

        return render(request, self.template_name, contexto)


class AuditorFormularioUpdate(View):

    def __init__(self):
        self.template_name = 'auditor/auditor_formulario.html'

    def get(self, request, pk):
        auditoria = get_object_or_404( Auditoria, pk = pk )
        compania_codigo = auditoria.compania.split(':')[0]
        auditor_lider = Rol.objects.filter(companiaaccion__compania_codigo=compania_codigo, rol='Auditor Lider' )


        auditores_designados = []
        auditores_colaboradores = []

        for aud_des in auditoria.auditores_designados.all():
            auditores_designados.append(aud_des.pk)

        for aud_col in auditoria.auditores_colaboradores.all():
            auditores_colaboradores.append(aud_col.pk)

        initial_data = {
            'auditor_lider': auditor_lider[0].nombre_completo,
            'auditores_designados': auditores_designados,
            'auditores_colaboradores': auditores_colaboradores
        }

        formulario = AuditorForm( initial = initial_data )

        contexto = {
            'form': formulario,
            'folio': auditoria.folio,
            'pk': pk,
            'operation': 'Editar',
        }

        return render(request, self.template_name, contexto)

    def post(self, request, pk):
        formulario = AuditorForm(request.POST)
        auditoria = Auditoria.objects.get(pk = pk)

        if formulario.is_valid():
            datos_formulario = formulario.cleaned_data

            rol = Rol()
            auditoria.auditor_lider = datos_formulario.get('auditor_lider')
            auditoria.save()
            for auditores_designados in datos_formulario.get('auditores_designados'):
                aud_des = Rol.objects.get(pk=auditores_designados)
                auditoria.auditores_designados.add(aud_des)

            for auditores_colaboradores in datos_formulario.get('auditores_colaboradores'):
                aud_col = Rol.objects.get(pk=auditores_colaboradores)
                auditoria.auditores_colaboradores.add(aud_col)

            return redirect(reverse('calidad:proceso_lista', kwargs={ 'pk': pk }))

        contexto = {
            'form': formulario,
            'folio': auditoria.folio,
            'pk': pk,
            'operation': 'Editar',
        }

        return render(request, self.template_name, contexto)


class ProcesoLista(View):

    def __init__(self):
        self.template_name = 'proceso/proceso_lista.html'

    def get(self, request, pk):

        auditoria = get_object_or_404(Auditoria, pk = pk)
        auditores_designados = self.get_AuditoresDesignados( auditoria )
        procesos = ProcesoAuditoria.objects.filter(auditoria = pk)

        formulario = ProcesoAuditoriaForm( auditores_designados )

        contexto = {
            'pk': pk,
            'folio': auditoria.folio,
            'form': formulario,
            'procesos': procesos
        }

        return render(request, self.template_name, contexto)

    def post(self, request, pk):

        auditoria = get_object_or_404(Auditoria, pk = pk)
        auditores_designados = self.get_AuditoresDesignados( auditoria )

        formulario = ProcesoAuditoriaForm( auditores_designados, request.POST )

        if formulario.is_valid():
            try:

                datos_formulario = formulario.cleaned_data
                responsable = Responsable.objects.get( pk = datos_formulario.get('rep_subproceso') )
                aud_des = auditoria.auditores_designados.get( pk = datos_formulario.get('auditor') )
                subproceso = Subproceso.objects.get( pk = datos_formulario.get('subproceso') )
                proceso = ProcesoAuditoria()

                proceso.auditoria = Auditoria.objects.get(pk = pk)
                proceso.proceso = subproceso.proceso
                proceso.subproceso = subproceso.subproceso
                proceso.rep_subpro_nombre_completo = responsable.nombre_completo
                proceso.rep_subpro_numero_empleado = responsable.numero_empleado
                proceso.fecha_programada_inicial = CalidadMethods.get_FechaConFormato(datos_formulario.get('fecha_programada_ini'))
                proceso.fecha_programada_final = CalidadMethods.get_FechaConFormato(datos_formulario.get('fecha_programada_fin'))
                proceso.auditor_nombre_completo = aud_des.nombre_completo
                proceso.auditor_numero_empleado = aud_des.numero_empleado
                proceso.sitio = datos_formulario.get('sitio')
                proceso.create_by = CalidadMethods.get_Usuario(request.user.id)
                proceso.save()

            except IntegrityError as e:

                messages.add_message(request, messages.WARNING, "Este subproceso ya está registrado.", extra_tags='subproceso_existe')
                return redirect(reverse('calidad:proceso_lista', kwargs={ 'pk': pk }))

            return redirect(reverse('calidad:proceso_formulario_update', kwargs={ 'pk': pk, 'pk_pro': proceso.pk }))

        procesos = ProcesoAuditoria.objects.filter(auditoria = pk)

        contexto = {
            'pk': pk,
            'folio': auditoria.folio,
            'form': formulario,
            'procesos': procesos
        }

        return render(request, self.template_name, contexto)


    def get_AuditoresDesignados(self, auditoria):

        valores = [('', '-------')]

        for aud_des in auditoria.auditores_designados.all():

            valores.append(
                (
                    aud_des.pk,
                    aud_des.numero_empleado + ' : ' + aud_des.nombre_completo
                )
            )
        return valores


class ProcesoFormularioUpdate(View):

    def __init__(self):
        self.template_name = 'proceso/proceso_formulario.html'

    def get(self, request, pk, pk_pro):

        auditoria = get_object_or_404(Auditoria, pk = pk)
        auditores_designados = self.get_AuditoresDesignados( auditoria )
        proceso_aud = get_object_or_404(ProcesoAuditoria, pk = pk_pro, auditoria = pk)

        proceso = Proceso.objects.get(proceso = proceso_aud.proceso)
        subproceso = Subproceso.objects.get(subproceso = proceso_aud.subproceso)
        responsable = Responsable.objects.get( numero_empleado=proceso_aud.rep_subpro_numero_empleado, proceso=proceso.pk )

        auditor_des = auditoria.auditores_designados.get( numero_empleado = proceso_aud.auditor_numero_empleado )
        subprocesos = self.get_Subprocesos(proceso.pk)
        rep_subprocesos = self.get_RepSubprocesos(proceso.pk)

        initial_data = {
            'proceso' : proceso.pk,
            'subproceso' : subproceso.pk ,
            'rep_subproceso' : responsable.pk,
            'fecha_programada_ini': CalidadMethods.set_FechaConFormato(proceso_aud.fecha_programada_inicial),
            'fecha_programada_fin': CalidadMethods.set_FechaConFormato(proceso_aud.fecha_programada_final),
            'auditor' : auditor_des.pk,
            'sitio' : proceso_aud.sitio,
        }
        formulario = ProcesoAuditoriaEdicionForm( auditores_designados, subprocesos, rep_subprocesos, initial_data )

        contexto = {
            'pk': pk,
            'pk_pro': pk_pro,
            'folio': auditoria.folio,
            'proceso': proceso_aud.proceso,
            'form': formulario,
        }

        return render(request, self.template_name, contexto)

    def post(self, request, pk, pk_pro):

        proceso = get_object_or_404(ProcesoAuditoria, pk = pk_pro)
        auditoria = get_object_or_404(Auditoria, pk = pk)
        auditores_designados = self.get_AuditoresDesignados( auditoria )

        id_proceso_select = Proceso.objects.get(proceso = proceso.proceso)

        subprocesos = self.get_Subprocesos(id_proceso_select.pk)
        rep_subprocesos = self.get_RepSubprocesos(id_proceso_select.pk)

        formulario = ProcesoAuditoriaEdicionForm( auditores_designados, subprocesos, rep_subprocesos, request.POST )

        if formulario.is_valid():

            datos_formulario = formulario.cleaned_data
            responsable = Responsable.objects.get( pk = datos_formulario.get('rep_subproceso') )
            aud_des = auditoria.auditores_designados.get( pk = datos_formulario.get('auditor') )
            subproceso = Subproceso.objects.get( pk = datos_formulario.get('subproceso') )

            proceso.subproceso = subproceso.subproceso
            proceso.rep_subpro_nombre_completo = responsable.nombre_completo
            proceso.rep_subpro_numero_empleado = responsable.numero_empleado
            proceso.fecha_programada_inicial = CalidadMethods.get_FechaConFormato(datos_formulario.get('fecha_programada_ini'))
            proceso.fecha_programada_final = CalidadMethods.get_FechaConFormato(datos_formulario.get('fecha_programada_fin'))
            proceso.auditor_nombre_completo = aud_des.nombre_completo
            proceso.auditor_numero_empleado = aud_des.numero_empleado
            proceso.sitio = datos_formulario.get('sitio')
            proceso.update_by = CalidadMethods.get_Usuario(request.user.id)
            proceso.save()

            return redirect(reverse('calidad:proceso_formulario_update', kwargs={ 'pk': pk, 'pk_pro': proceso.pk }))

        contexto = {
            'pk': pk,
            'pk_pro': pk_pro,
            'folio': auditoria.folio,
            'form': formulario,
        }

        return render(request, self.template_name, contexto)


    def get_AuditoresDesignados(self, _auditoria):

        valores = [('', '-------')]

        for aud_des in _auditoria.auditores_designados.all():

            valores.append(
                (
                    aud_des.pk,
                    aud_des.numero_empleado + ' : ' + aud_des.nombre_completo
                )
            )
        return valores

    def get_Subprocesos(self, _proceso):

        valores = [('', '-------')]

        for subproceso in Subproceso.objects.filter(proceso_id = _proceso):

            valores.append(
                (
                    subproceso.pk,
                    subproceso.subproceso
                )
            )
        return valores

    def get_RepSubprocesos(self, _proceso):

        valores = [('', '-------')]

        for responsable in Responsable.objects.filter(proceso_id = _proceso):

            valores.append(
                (
                    responsable.pk,
                    responsable.numero_empleado + ' : ' + responsable.nombre_completo
                )
            )
        return valores


class RequisitoLista(View):

    def __init__(self):
        self.template_name = 'requisito_auditoria/requisito_lista.html'

    def get(self, request, pk, pk_pro):

        auditoria = Auditoria.objects.get(pk = pk)
        proceso = get_object_or_404(ProcesoAuditoria, pk = pk_pro, auditoria = pk)
        criterios_auditoria = self.get_criterio(auditoria)
        formulario = RequisitoProcesoForm(criterios_auditoria)
        requisitos = RequisitoProceso.objects.filter(proceso_auditoria = pk_pro)

        contexto = {
            'form': formulario,
            'pk': pk,
            'pk_pro': pk_pro,
            'proceso': proceso.proceso,
            'requisitos': requisitos,
            'folio': auditoria.folio
        }

        return render(request, self.template_name, contexto)

    def post(self, request, pk, pk_pro):

        auditoria = Auditoria.objects.get(pk = pk)
        proceso = ProcesoAuditoria.objects.get(pk = pk_pro)
        criterios_auditoria = self.get_criterio(auditoria)
        formulario = RequisitoProcesoForm(criterios_auditoria, request.POST)

        if formulario.is_valid():

            try:

                req_pro = RequisitoProceso()
                datos_formulario = formulario.cleaned_data
                req_pro.proceso_auditoria = ProcesoAuditoria.objects.get(pk = pk_pro )
                req_pro.requisito = Requisito.objects.get(pk = datos_formulario.get('requisito'))
                req_pro.create_by = CalidadMethods.get_Usuario(request.user.id)
                req_pro.save()
            except IntegrityError as e:

                messages.add_message(request, messages.WARNING, "Este requisito ya existe para el proceso.", extra_tags='requisito_existe')

            return redirect(reverse('calidad:requisito_lista', kwargs={ 'pk': pk, 'pk_pro': pk_pro }))

        requisitos = RequisitoProceso.objects.all()

        contexto = {
            'form': formulario,
            'pk': pk,
            'pk_pro': pk_pro,
            'proceso': proceso.proceso,
            'requisitos': requisitos
        }

        return render(request, self.template_name, contexto)

    def get_criterio(self, auditoria):

        valores = [('0', '-------')]

        for criterio in auditoria.criterio.all():

            valores.append(
                (
                    criterio.pk,
                    criterio.criterio
                )
            )
        return valores


class HallazgoLista(View):

    def __init__(self):
        self.template_name = 'hallazgo/hallazgo_lista.html'

    def get(self, request, pk, pk_pro):

        auditoria = Auditoria.objects.get(pk = pk)
        procesos = ProcesoAuditoria.objects.filter(auditoria = pk)
        proceso = get_object_or_404(ProcesoAuditoria, pk = pk_pro, auditoria = pk)
        requisitos = Requisito.objects.all()
        formulario = HallazgoProcesoForm()
        formulario_filtro = HallazgoProcesoFilterForm( request.GET )

        argumentos = {}

        if request.GET:
            campos_formulario = []

            for campos in HallazgoProcesoFilterForm():
                campos_formulario.append(campos.name)

            for campoGet in request.GET:
                if campoGet in campos_formulario:
                    if request.GET[campoGet] != '':
                        if campoGet == 'titulo':
                            argumentos['titulo__icontains'] = request.GET[campoGet]

                        if campoGet == 'estado':
                            argumentos['estado__exact'] = request.GET[campoGet]

                        if campoGet == 'tipo_hallazgo':
                            argumentos['tipo_hallazgo__exact'] = request.GET[campoGet]

                        if campoGet == 'cerrado':
                            argumentos['cerrado__exact'] = request.GET[campoGet]

        hallazgos = HallazgoProceso.objects.filter(proceso = pk_pro, proceso__auditoria = pk, **argumentos)

        contexto = {
            'form': formulario,
            'form_filter': formulario_filtro,
            'pk': pk,
            'pk_pro': pk_pro,
            'proceso': proceso.proceso,
            'subproceso': proceso.subproceso,
            'hallazgos': hallazgos,
            'folio': auditoria.folio
        }

        return render(request, self.template_name, contexto)

    def post(self, request, pk, pk_pro):

        auditoria = Auditoria.objects.get(pk = pk)
        procesos = ProcesoAuditoria.objects.filter(auditoria = pk)
        proceso = ProcesoAuditoria.objects.get(pk = pk_pro)
        requisitos = Requisito.objects.all()
        hallazgos = HallazgoProceso.objects.filter(proceso = pk_pro)

        formulario = HallazgoProcesoForm(request.POST)
        formulario_filtro = HallazgoProcesoFilterForm()

        if formulario.is_valid():
            datos_formulario = formulario.cleaned_data
            hallazgo = HallazgoProceso()

            hallazgo.titulo = datos_formulario.get('titulo')
            hallazgo.proceso = proceso
            hallazgo.tipo_hallazgo = datos_formulario.get('tipo_hallazgo')
            hallazgo.observacion = datos_formulario.get('observaciones')
            hallazgo.cerrado = "No"
            hallazgo.create_by = CalidadMethods.get_Usuario(request.user.id)
            hallazgo.save()

            for requisito_choice in datos_formulario.get('requisito_referencia'):
                requisito = Requisito.objects.get(pk=requisito_choice)
                hallazgo.requisito_referencia.add(requisito)

            for descripcion_choice in datos_formulario.get('descripciones'):
                descripcion = Falla.objects.get(pk=descripcion_choice)
                hallazgo.falla.add(descripcion)

            return redirect(reverse('calidad:hallazgo_lista', kwargs={ 'pk': pk, 'pk_pro': proceso.pk }))

        contexto = {
            'form': formulario,
            'form_filter': formulario_filtro,
            'pk': pk,
            'pk_pro': pk_pro,
            'proceso': proceso.proceso,
            'subproceso': proceso.subproceso,
            'hallazgos': hallazgos,
            'folio': auditoria.folio
        }
        return render(request, self.template_name, contexto)


class HallazgoDetalle(View):

    def __init__(self):
        self.template_name = 'hallazgo/hallazgo_detalle.html'

    def get(self, request, pk, pk_pro, pk_hal):
        auditoria = get_object_or_404(Auditoria, pk = pk)
        proceso = get_object_or_404(ProcesoAuditoria, pk = pk_pro)
        hallazgo = get_object_or_404(HallazgoProceso, pk = pk_hal)

        requisitos = []
        descripciones = []

        for requisito in hallazgo.requisito_referencia.all():
            requisitos.append(requisito.pk)

        for descripcion in hallazgo.falla.all():
            descripciones.append(descripcion.pk)

        initial_data = {
            'titulo' : hallazgo.titulo,
            'requisito_referencia' : requisitos,
            'descripciones' : descripciones,
            'tipo_hallazgo' : hallazgo.tipo_hallazgo,
            'observaciones' : hallazgo.observacion,
        }

        formulario_hallazgo = HallazgoProcesoDetalleForm(initial_data)
        formulario_analisis_causa = AnalisisHallazgoForm()
        formulario_plan_accion_hallazgo = PlanAccionHallazgoForm()
        formulario_seguimiento_plan = SeguimientoPlanAccionForm()
        formulario_seguimiento_plan_evaluacion = SeguimeintoPlanAccionEvaluacionForm()
        formulario_evidencia_hallazgo = EvidenciaHallazgoForm()

        contexto = {
            'pk': pk,
            'pk_pro': pk_pro,
            'pk_hal': pk_hal,
            'folio': auditoria.folio,
            'proceso': proceso.proceso,
            'subproceso': proceso.subproceso,
            'titulo': hallazgo.titulo,
            'cerrado': hallazgo.cerrado,
            'form': formulario_hallazgo,
            'formulario_analisis_causa': formulario_analisis_causa,
            'formulario_plan_accion_hallazgo': formulario_plan_accion_hallazgo,
            'formulario_seguimiento_plan': formulario_seguimiento_plan,
            'formulario_seguimiento_plan_evaluacion': formulario_seguimiento_plan_evaluacion,
            'formulario_evidencia_hallazgo': formulario_evidencia_hallazgo,
        }

        return render(request, self.template_name, contexto)

    def post(self, request, pk, pk_pro, pk_hal):

        auditoria = get_object_or_404(Auditoria, pk = pk)
        proceso = get_object_or_404(ProcesoAuditoria, pk = pk_pro)
        hallazgo = get_object_or_404(HallazgoProceso, pk = pk_hal)

        formulario_hallazgo = HallazgoProcesoDetalleForm(request.POST)
        formulario_analisis_causa = AnalisisHallazgoForm()
        formulario_plan_accion_hallazgo = PlanAccionHallazgoForm()
        formulario_seguimiento_plan = SeguimientoPlanAccionForm()
        formulario_seguimiento_plan_evaluacion = SeguimeintoPlanAccionEvaluacionForm()
        formulario_evidencia_hallazgo = EvidenciaHallazgoForm()

        if hallazgo.cerrado == "No":
            if formulario_hallazgo.is_valid():
                datos_formulario = formulario_hallazgo.cleaned_data

                hallazgo.titulo = datos_formulario.get('titulo')
                hallazgo.tipo_hallazgo = datos_formulario.get('tipo_hallazgo')
                hallazgo.observacion = datos_formulario.get('observaciones')
                hallazgo.update_by = CalidadMethods.get_Usuario(request.user.id)
                hallazgo.save()

                requisito_hallazgo_list_db = []
                descripcion_hallazgo_list_db = []

                for requistio in hallazgo.requisito_referencia.all():
                    requisito_hallazgo_list_db.append(requistio.id)

                for requisito_choice in datos_formulario.get('requisito_referencia'):
                    requisito = Requisito.objects.get(pk=requisito_choice)

                    if requisito.pk in requisito_hallazgo_list_db:
                        requisito_hallazgo_list_db.remove(requisito.pk)
                    else:
                        hallazgo.requisito_referencia.add(requisito)

                for list_requisito_db in requisito_hallazgo_list_db:
                    hallazgo.requisito_referencia.remove(Requisito.objects.get(pk=list_requisito_db))


                for descripcion in hallazgo.falla.all():
                    descripcion_hallazgo_list_db.append(descripcion.id)

                for descripcion_choice in datos_formulario.get('descripciones'):
                    descripcion = Falla.objects.get(pk=descripcion_choice)

                    if descripcion.pk in descripcion_hallazgo_list_db:
                        descripcion_hallazgo_list_db.remove(descripcion.pk)
                    else:
                        hallazgo.falla.add(descripcion)

                for list_descripcion_db in descripcion_hallazgo_list_db:
                    hallazgo.falla.remove(Falla.objects.get(pk=list_descripcion_db))

                return redirect(reverse('calidad:hallazgo_detalle', kwargs={ 'pk': pk, 'pk_pro': pk_pro, 'pk_hal': pk_hal }))
        else:
            return redirect(reverse('calidad:hallazgo_detalle', kwargs={ 'pk': pk, 'pk_pro': pk_pro, 'pk_hal': pk_hal }))

        contexto = {
            'form': formulario_hallazgo,
            'formulario_analisis_causa': formulario_analisis_causa,
            'formulario_plan_accion_hallazgo': formulario_plan_accion_hallazgo,
            'formulario_seguimiento_plan': formulario_seguimiento_plan,
            'formulario_seguimiento_plan_evaluacion': formulario_seguimiento_plan_evaluacion,
            'formulario_evidencia_hallazgo': formulario_evidencia_hallazgo,
            'pk': pk,
            'pk_pro': pk_pro,
            'proceso': proceso.proceso,
            'subproceso': proceso.subproceso,
            'titulo': hallazgo.titulo,
            'cerrado': hallazgo.cerrado,
            'folio': auditoria.folio,
        }
        return render(request, self.template_name, contexto)


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
