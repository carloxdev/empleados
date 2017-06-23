# -*- coding: utf-8 -*-

# Librerias/Clases Python

# Librerias/Clases Django
from django.shortcuts import render
from django.shortcuts import redirect
from django.shortcuts import get_object_or_404
from django.views.generic.base import View
from django.core.urlresolvers import reverse


# Librerias/Clases de Terceros


# Librerias/Clases propias

# Modelos:
from .models import IncidenciaDocumento
from .models import IncidenciaTipo
from .models import CentroAtencion
from .models import IncidenciaArchivo
from .models import IncidenciaResolucion

# Otros Modelos:
#from ebs.models import VIEW_EMPLEADOS_FULL
from administracion.models import Zona
from administracion.models import Empresa

# Formularios:
# from .forms import IncidenciaDocumentoForm
# from .forms import IncidenciaDocumentoFilterForm
# from .forms import IncidenciaArchivoForm
# from .forms import IncidenciaResolucionForm

from django.utils.formats import date_format

# Email:
#from django.core.mail import send_mail
from django.core.mail import EmailMultiAlternatives

#from django.core.mail import send_mail
# from django.shortcuts import get_object_or_404
# from django.shortcuts import redirect

# # Django Urls:
# from django.core.urlresolvers import reverse
# #from django.core.urlresolvers import reverse_lazy
# #from django.http import HttpResponse


# -------------- INCIDENCIA DOCUMENTO  -------------- #

# class IncidenciaDocumentoLista(View):
#     def __init__(self):
#         self.template_name = 'incidencia/incidencia_lista.html'

#     def get(self, request):

#         formulario = IncidenciaDocumentoFilterForm()

#         contexto = {
#             'form': formulario
#         }

#         return render(request, self.template_name, contexto)


# class IncidenciaDocumentoNuevo(View):

#     def __init__(self):
#         self.template_name = 'incidencia/incidencia_nuevo.html'

#     def get(self, request):

#         formulario = IncidenciaDocumentoForm()

#         contexto = {
#             'form': formulario
#         }

#         return render(request, self.template_name, contexto)

#     def post(self, request):

#         formulario = IncidenciaDocumentoForm(request.POST)

#         if formulario.is_valid():
#             incidencia = formulario.save(commit=False)

#             empleado = get_object_or_404(
#                 VIEW_EMPLEADOS_FULL.objects.using('ebs_d').all(),
#                 pers_empleado_numero=incidencia.empleado_id
#             )

#             incidencia.empleado_nombre = empleado.pers_nombre_completo

#             incidencia.empleado_proyecto = empleado.grup_proyecto_code_jde
#             incidencia.empleado_proyecto_desc = empleado.grup_proyecto_jde
#             incidencia.empleado_puesto = empleado.asig_puesto_clave
#             incidencia.empleado_puesto_desc = empleado.asig_puesto_desc

#             #import ipdb; ipdb.set_trace()
#             empresa = Empresa.objects.filter(descripcion=empleado.grup_compania_jde)

#             incidencia.empresa = empresa[0]
#             incidencia.area_id = empleado.asig_ubicacion_clave
#             incidencia.area_descripcion = empleado.asig_ubicacion_desc
#             incidencia.empleado_un = empleado.grup_fase_jde
#             incidencia.created_by = request.user.profile

#             incidencia.save()

#             #send_mail("Asunto", 
#             #"Mensaje...Probando linea 1 desde django", 
#             #'"Notificaciones Nuvoil" <notificaciones@nuvoil.com>',
#             #['janet.castro@nuvoil.com'])

#             subject = 'ALTA DE INCIDENCIA'
#             text_content = 'Mensaje...nLinea 2nLinea3'
#             #html_content = '<h2>Mensaje</2><p> Empleado: ' + incidencia.empleado_nombre + ' </p>'
#             html_content = """\
#                            <html>
#                            <body>
#                            <center> 
#                              <table width=650 cellpadding=0 cellspacing=2 border=0>  
#                                 <tr>  
#                                 <td width=1% valign=top><a href="mailto:ti@nuvoil.com"><img src="" alt=Nuvoil width=197 height=76 border=0 alt="Nuvoil"></a></td> 
#                                 <td align=right><font face=arial size=-1><a href="mailto:ti@nuvoil.com">Enviarnos e-mail</a></font><hr size=4 noshade color="#D10018"></td> 
#                                 </tr>   
#                             </table> 
#                             <br><br> 
#                             <table width=500 cellpadding=7 cellspacing=0 border=0> 
#                             <tr><td align=center><font face=arial size=+1><b>Notificaciones</b></font></td></tr>  
#                             <tr><td><font face=arial size=-1>El siguiente mensaje fue generado automaticamente, por favor no lo responda</font>  
#                             </td></tr> 
#                             <tr><td> 
#                                 <table width='100%' cellpadding=0 cellspacing=0 border=0 bgcolor=cccccc><tr><td height=1></td></tr></table> 
#                                 <table width='100%' cellpadding=10 cellspacing=0 border=0 bgcolor=eeeeee>  
#                                 <tr><td align=center>  
#                                      <table class=style1 font-family=calibri> 
#                                      <tr><td colspan=8 align=center><strong>   INCIDENCIAS  </strong></td></tr> 
#                                      <tr>  
#                                      <td style=background-color: #C0C0C0> <strong>INCIDENCIA</strong></td> 
#                                      <td style=background-color: #C0C0C0> <strong>CATEGORIA</strong></td> 
#                                      <td style=background-color: #C0C0C0> <strong>DESCRIPCION</strong></td> 
#                                      <td style=background-color: #C0C0C0> <strong>EMPLEADO</strong></td>  
#                                      <td style=background-color: #C0C0C0> <strong>FECHA DE INCIDENCIA</strong></td>  
#                                      <td style=background-color: #C0C0C0> 
#                                      <strong>ZONA</strong></td> 
#                                      <td style=background-color: #C0C0C0>  
#                                      <strong>ESTATUS</strong></td> 
#                                      <tr>
#                                           <td> """ + str(incidencia.pk) + """ </td> 
#                                           <td> """ + str(incidencia.tipo) + """ </td> 
#                                           <td> """ + str(incidencia.es_registrable) + """ </td> 
#                                           <td> """ + incidencia.empleado_nombre + """ </td> 
#                                           <td> """ + str(incidencia.fecha) + """ </td> 
#                                           <td> """ + str(incidencia.zona) + """ </td> 
#                                           <td> """ + str(incidencia.status)  + """ </td>
#                                      </tr> 
#                                      <tr> 
#                                 </td></tr>  
#                                 </table>  
#                                <table width='100%' cellpadding=0 cellspacing=0 border=0 bgcolor=cccccc><tr><td height=1></td></tr></table>   
#                             </td></tr> 
#                             <tr><td align=center><font face=arial size=-1></font></td></tr> 
#                             </table> 
#                             <br>  
#                             <hr size=4 noshade width=650 color="#D10018"> 
#                             <font face=arial size=-2>Copyright &copy; 2017 Nuvoil</font>  
#                             </center>  
#                             </body> 
#                             </html> 
#                            """

#             from_email = '"Notificaciones Nuvoil" <notificaciones@nuvoil.com>'
#             to = 'janet.castro@nuvoil.com'
#             msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
#             msg.attach_alternative(html_content, "text/html")
#             msg.send()

#             #send_mail("Subject", "Email body", settings.EMAIL_HOST_USER, "janexa@gmail.com", fail_silently=False)

#             #return redirect(reverse('sgi:incidencia_lista'))
#             #return render(request, self.template_name2, contexto)
#             return redirect(reverse('sgi:incidencia_archivo', kwargs={'incidencia_id': incidencia.pk}))

#         contexto = {
#             'form': formulario
#         }

#         return render(request, self.template_name, contexto)

#     # def post(self, request):

#     #     formulario = IncidenciaDocumentoForm(request.POST)

#     #     if formulario.is_valid():

#     #         indidencia = formulario.save(commite=False)

#     #         incidencia.created_by = request.user.profile

#     #         incidencia.save()

#     #         return redirect(reverse('sgi:incidencia_lista'))

#     #     contexto = {
#     #         'form': formulario
#     #     }

#     #     return render(request, self.template_name, contexto)

#         # datos_formulario = formulario.cleaned_data


# class IncidenciaDocumentoNuevo(CreateView):
#     model = IncidenciaDocumento

#     template_name = 'incidencia/incidencia_nuevo.html'
#     form_class = IncidenciaDocumentoForm

#     def get_context_data(self, **kwargs):
#         context = super(IncidenciaDocumentoNuevo, self).get_context_data(**kwargs)
#         if 'form' not in context:
#             context['form'] = self.form_class(self.request.GET)

#     def post(self, request, *args, **kwargs):
#         self.object = self.get_object
#         form = self.form_class(request.POST)

#         if form.is_valid():
#             formulario = form.cleaned_data
#             incidencia = IncidenciaDocumento()
#             incidencia.tipo = formulario.get('tipo')
#             incidencia.registrable = formulario.get('registrable')
#             incidencia.empleado_nombre = formulario.get('empleado_nombre')
#             incidencia.empleado_zona = formulario.get('empleado_zona')
#             incidencia.empleado_proyecto_desc = formulario.get('empleado_proyecto_desc')
#             incidencia.empleado_puesto_desc = formulario.get('empleado_puesto_desc')
#             incidencia.empleado_un = formulario.get('empleado_un')
#             incidencia.empleado_organizacion = formulario.get('empleado_organizacion')
#             incidencia.area_descripcion = formulario.get('area_descripcion')
#             incidencia.lugar = formulario.get('lugar')
#             incidencia.dias_incapcidad = formulario.get('dias_incapcidad')
#             incidencia.centro_atencion = formulario.get('centro_atencion')
#             incidencia.acr = formulario.get('acr')
#             incidencia.status = formulario.get('status')

#             incidencia.save()

#             # return redirect(reverse('finanzas:viatico_editar', kwargs={'pk': incidencia.id}))

#         else:
#             contexto = {
#                 'form': form
#             }
#             return render(request, self.template_name, contexto)


# class IncidenciaDocumentoEditar(View):

#     def __init__(self):
#         self.template_name = 'incidencia/incidencia_editar.html'

#     def get(self, request, pk):
#         empleado = get_object_or_404(IncidenciaDocumento, pk=pk)
#         formulario = IncidenciaDocumentoForm(instance=empleado)

#         #operation = viatico.get_status_display()

#         contexto = {
#             'form': formulario,
#         }
#         return render(request, self.template_name, contexto)

#     def post(self, request, pk):

#         # empleado = get_object_or_404(
#         #         VIEW_EMPLEADOS_FULL.objects.using('ebs_d').all(),
#         #         pers_empleado_numero=incidencia.empleado_id
#         #     )
#         empleado = get_object_or_404(IncidenciaDocumento, pk=pk)
#         formulario = IncidenciaDocumentoForm(request.POST, instance=empleado)

#         if formulario.is_valid():
#             incidencia = formulario.save(commit=False)

#             empleado = get_object_or_404(
#                 VIEW_EMPLEADOS_FULL.objects.using('ebs_d').all(),
#                 pers_empleado_numero=incidencia.empleado_id
#             )

#             incidencia.empleado_nombre = empleado.pers_nombre_completo

#             incidencia.empleado_proyecto = empleado.grup_proyecto_code_jde
#             incidencia.empleado_proyecto_desc = empleado.grup_proyecto_jde
#             incidencia.empleado_puesto = empleado.asig_puesto_clave
#             incidencia.empleado_puesto_desc = empleado.asig_puesto_desc

#             empresa = Empresa.objects.filter(descripcion=empleado.grup_compania_jde)

#             incidencia.empresa = empresa[0]
#             incidencia.area_id = empleado.asig_ubicacion_clave
#             incidencia.area_descripcion = empleado.asig_ubicacion_desc
#             incidencia.empleado_un = empleado.grup_fase_jde
#             incidencia.created_by = request.user.profile

#             incidencia.save()

#             return redirect(reverse('sgi:incidencia_lista'))

#         contexto = {
#             'form': formulario
#         }
#         return render(request, self.template_name, contexto)


# class IncidenciaDocumentoArchivo(View):

#     def __init__(self):
#         self.template_name = 'incidencia/incidencia_archivo.html'
        

#     def get(self, request, incidencia_id):

#         incidencia = IncidenciaDocumento.objects.get(pk=incidencia_id)

#         # import ipdb; ipdb.set_trace()
#         incidencia_archivos = IncidenciaArchivo.objects.filter(incidencia=incidencia)

#         # anexos = IncidenciaArchivo.objects.filter(id=pk)
#         form = IncidenciaArchivoForm(
#             initial={
#                 'incidencia': incidencia
#             }
#         )

#         contexto = {
#             'form': form,
#             'incidencia_id': incidencia_id,
#             'anexos': incidencia_archivos,
#         }

#         return render(request, self.template_name, contexto)

#     def post(self, request, incidencia_id):

#         form = IncidenciaArchivoForm(request.POST, request.FILES)

#         incidencia_archivos = IncidenciaArchivo.objects.filter(incidencia_id=incidencia_id)

#         if form.is_valid():

#             incidencia_archivo = form.save(commit=False)
#             incidencia_archivo.created_by = request.user.profile
#             incidencia_archivo.save()

#         contexto = {
#             'form': form,
#             'incidencia_id': incidencia_id,
#             'anexos': incidencia_archivos,
#         }

#         return render(request, self.template_name, contexto)


# class IncidenciaResolucionNuevo(View):

#     def __init__(self):
#         self.template_name = 'incidencia/incidencia_seguimiento.html'

#     def get(self, request, incidencia_id):


#         incidencia = IncidenciaDocumento.objects.get(pk=incidencia_id)

#         # import ipdb; ipdb.set_trace()
#         incidencia_resolucion = IncidenciaResolucion.objects.filter(incidencia_id=incidencia).order_by('-created_date')

#         # import ipdb; ipdb.set_trace()

#         print incidencia_resolucion

#         form = IncidenciaResolucionForm(
#             initial={
#                 'incidencia': incidencia,
#             }
#         )

#         contexto = {
#             'form': form,
#             'incidencia_id': incidencia_id,
#             'resoluciones': incidencia_resolucion,
#         }

#         return render(request, self.template_name, contexto)

#     def post(self, request, incidencia_id):

#         # form = IncidenciaResolucionForm(request.POST)

#         # incidencia_resolucion = IncidenciaResolucion.objects.filter(incidencia=incidencia_id)

#         # if form.is_valid():

#         #     incidencia_resolucion = form.save(commit=False)
#         #     incidencia_resolucion.created_by = request.user.profile
#         #     incidencia_resolucion.save()

#         #     return redirect(reverse('sgi:incidencia_lista'))

#         # contexto = {
#         #     'form': form,
#         #     'incidencia_id': incidencia_id,
#         #     'anexos': incidencia_resolucion,
#         # }
#         incidencia_documento = get_object_or_404(IncidenciaDocumento, pk=incidencia_id)
#         # print incidencia_documento
#         incidenciaid = incidencia_id
#         formulario = IncidenciaResolucionForm(request.POST)
    
#         if formulario.is_valid():

#             datos_formulario = formulario.cleaned_data
#             Incidencia_Resolucion = IncidenciaResolucion()
#             Incidencia_Resolucion.incidencia_id = incidenciaid
#             Incidencia_Resolucion.mensaje = datos_formulario.get('mensaje')
#             Incidencia_Resolucion.tipo_id = datos_formulario.get('tipo')
#             Incidencia_Resolucion.status = datos_formulario.get('estatus')
#             Incidencia_Resolucion.created_by  = request.user.profile

#             Incidencia_Resolucion.save()

#             # ACTUALIZO EL STATUS EN EL MODELO INCIDENCIADOCUMENTO
            
#             incidencia_documento.status = Incidencia_Resolucion.status
#             incidencia_documento.save()
            

#             #return redirect(reverse('sgi:incidencia_lista'))
#             return redirect(reverse('sgi:incidencia_archivo', kwargs={'incidencia_id': Incidencia_Resolucion.incidencia_id }))

#         # contexto = {
#         #             'form': formulario,
#         #             'incidencia_id': incidencia_id,
#         #             'anexos': incidencia_resolucion,
#         #         }
#                 #return render(request, self.template_name, contexto)
#         #return redirect(reverse('sgi:incidencia_archivo', kwargs={'incidencia_id': Incidencia_Resolucion.incidencia_id }))


# class IncidenciaGraficas(View):

#     def get(self, request):

<<<<<<< HEAD
#         return render(request, 'incidencia/incidencia_grafica.html')


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


class EquipoAuditorFormulario(View):
    def __init__(self):
        self.template_name = 'equipo_auditor/equipo_auditor_formulario.html'

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


class RequisitoFormulario(View):
    def __init__(self):
        self.template_name = 'requisito_auditoria/requisito_formulario.html'

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


class EvidenciaFormulario(View):
    def __init__(self):
        self.template_name = 'evidencia/evidencia_formulario.html'

    def get(self, request):

        # formulario = EmpleadoFilterForm()

        # contexto = {
        #     'form': formulario
        # }

        return render(request, self.template_name, {})


class PlanAccionLista(View):
    def __init__(self):
        self.template_name = 'plan_accion/plan_accion_lista.html'

    def get(self, request):

        # formulario = EmpleadoFilterForm()

        # contexto = {
        #     'form': formulario
        # }

        return render(request, self.template_name, {})


class SeguimientoPlanAccionFormulario(View):
    def __init__(self):
        self.template_name = 'seguimiento_plan_accion/seguimiento_plan_accion_formulario.html'

    def get(self, request):

        # formulario = EmpleadoFilterForm()

        # contexto = {
        #     'form': formulario
        # }

        return render(request, self.template_name, {})


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


class ConfiguracionRolLista(View):
    def __init__(self):
        self.template_name = 'rol/configuracion_lista.html'

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


class ConfiguracionContratoLista(View):
    def __init__(self):
        self.template_name = 'contrato/configuracion_lista.html'

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
=======
        return render(request, 'incidencia/incidencia_grafica.html')
>>>>>>> origin/master
