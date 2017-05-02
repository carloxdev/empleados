# -*- coding: utf-8 -*-

# Librerias/Clases Python

# Librerias/Clases Django
from django.shortcuts import render
from django.shortcuts import redirect
from django.shortcuts import get_object_or_404
from django.views.generic.base import View
from django.core.urlresolvers import reverse


# Librerias/Clases de Terceros
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend


# Librerias/Clases propias

# Modelos:
from .models import IncidenciaDocumento
from .models import IncidenciaTipo
from .models import CentroAtencion

# Otros Modelos:
from ebs.models import VIEW_EMPLEADOS_FULL
from administracion.models import Zona
from administracion.models import Empresa

# Formularios:
from .forms import IncidenciaDocumentoForm
from .forms import IncidenciaDocumentoFilterForm

# Serializadores:
from .serializers import IncidenciaDocumentoSerializer
from .serializers import IncidenciaTipoSerializer
from .serializers import CentroAtencionSerializer

# Filtros:
from home.pagination import GenericPagination

# Paginacion:
from .filters import IncidenciaDocumentoFilter


# from django.shortcuts import get_object_or_404
# from django.shortcuts import redirect

# # Django Urls:
# from django.core.urlresolvers import reverse
# #from django.core.urlresolvers import reverse_lazy
# #from django.http import HttpResponse


# -------------- INCIDENCIA DOCUMENTO  -------------- #

class IncidenciaDocumentoLista(View):
    def __init__(self):
        self.template_name = 'incidencia/incidencia_lista.html'

    def get(self, request):

        formulario = IncidenciaDocumentoFilterForm()

        contexto = {
            'form': formulario
        }

        return render(request, self.template_name, contexto)


class IncidenciaDocumentoNuevo(View):

    def __init__(self):
        self.template_name = 'incidencia/incidencia_nuevo.html'

    def get(self, request):

        formulario = IncidenciaDocumentoForm()

        contexto = {
            'form': formulario
        }

        return render(request, self.template_name, contexto)

    def post(self, request):

        formulario = IncidenciaDocumentoForm(request.POST)

        if formulario.is_valid():
            incidencia = formulario.save(commit=False)

            empleado = get_object_or_404(
                VIEW_EMPLEADOS_FULL.objects.using('ebs_d').all(),
                pers_empleado_numero=incidencia.empleado_id
            )

            incidencia.empleado_nombre = empleado.pers_nombre_completo

            # if empleado.asig_ubicacion_desc == 'OFICINA VILLAHERMOSA JUJO' or \
            #         empleado.asig_ubicacion_desc == 'OFICINA VILLAHERMOSA CEDROS' or \
            #         empleado.asig_ubicacion_desc == 'OFICINA VILLAHERMOSA MANGOS':

            #     incidencia.zona = Zona.objects.get(pk=1)

            # elif empleado.asig_ubicacion_desc == 'OFICINA POZA RICA':

            #     incidencia.zona = Zona.objects.get(pk=2)

            # elif empleado.asig_ubicacion_desc == 'OFICINA REYNOSA':

            #     incidencia.zona = Zona.objects.get(pk=3)

            # elif empleado.asig_ubicacion_desc == 'OFICINA VERACRUZ' or \
            #         empleado.asig_ubicacion_desc == 'OFICINA NARANJOS':

            #     incidencia.zona = Zona.objects.get(pk=4)

            # else:
            #     incidencia.zona = Zona.objects.get(pk=5)

            incidencia.empleado_proyecto = empleado.grup_proyecto_code_jde
            incidencia.empleado_proyecto_desc = empleado.grup_proyecto_jde
            incidencia.empleado_puesto = empleado.asig_puesto_clave
            incidencia.empleado_puesto_desc = empleado.asig_puesto_desc

            empresa = Empresa.objects.filter(descripcion=empleado.grup_compania_jde)

            incidencia.empresa = empresa[0]
            incidencia.area_id = empleado.asig_ubicacion_clave
            incidencia.area_descripcion = empleado.asig_ubicacion_desc
            incidencia.empleado_un = empleado.grup_fase_jde
            incidencia.created_by = request.user.profile

            incidencia.save()

            return redirect(reverse('sgi:incidencia_lista'))

        contexto = {
            'form': formulario
        }

        return render(request, self.template_name, contexto)

    # def post(self, request):

    #     formulario = IncidenciaDocumentoForm(request.POST)

    #     if formulario.is_valid():

    #         indidencia = formulario.save(commite=False)

    #         incidencia.created_by = request.user.profile

    #         incidencia.save()

    #         return redirect(reverse('sgi:incidencia_lista'))

    #     contexto = {
    #         'form': formulario
    #     }

    #     return render(request, self.template_name, contexto)

        # datos_formulario = formulario.cleaned_data


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


class IncidenciaDocumentoEditar(View):

    def __init__(self):
        self.template_name = 'incidencia/incidencia_editar.html'

    def get(self, request, pk):
        empleado =  get_object_or_404(IncidenciaDocumento, pk=pk)
        formulario = IncidenciaDocumentoForm(instance=empleado)

        #operation = viatico.get_status_display()

        contexto = {
            'form': formulario,
        }
        return render(request, self.template_name, contexto)

    def post(self, request, pk):

        # empleado = get_object_or_404(
        #         VIEW_EMPLEADOS_FULL.objects.using('ebs_d').all(),
        #         pers_empleado_numero=incidencia.empleado_id
        #     )
        empleado =  get_object_or_404(IncidenciaDocumento, pk=pk)
        formulario = IncidenciaDocumentoForm(request.POST, instance=empleado)
        
        if formulario.is_valid():
            incidencia = formulario.save(commit=False)

            empleado = get_object_or_404(
                VIEW_EMPLEADOS_FULL.objects.using('ebs_d').all(),
                pers_empleado_numero=incidencia.empleado_id
            )

            incidencia.empleado_nombre = empleado.pers_nombre_completo

            incidencia.empleado_proyecto = empleado.grup_proyecto_code_jde
            incidencia.empleado_proyecto_desc = empleado.grup_proyecto_jde
            incidencia.empleado_puesto = empleado.asig_puesto_clave
            incidencia.empleado_puesto_desc = empleado.asig_puesto_desc

            empresa = Empresa.objects.filter(descripcion=empleado.grup_compania_jde)

            incidencia.empresa = empresa[0]
            incidencia.area_id = empleado.asig_ubicacion_clave
            incidencia.area_descripcion = empleado.asig_ubicacion_desc
            incidencia.empleado_un = empleado.grup_fase_jde
            incidencia.created_by = request.user.profile

            incidencia.save()

            return redirect(reverse('sgi:incidencia_lista'))

        contexto = {
            'form': formulario
        }
        return render(request, self.template_name, contexto)



# -------------- INCIDENCIA DOCUMENTO - API REST -------------- #

class IncidenciaDocumentoAPI(viewsets.ModelViewSet):
    queryset = IncidenciaDocumento.objects.all()
    serializer_class = IncidenciaDocumentoSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = IncidenciaDocumentoFilter


class IncidenciaDocumentoByPageAPI(viewsets.ModelViewSet):
    queryset = IncidenciaDocumento.objects.all()
    serializer_class = IncidenciaDocumentoSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = IncidenciaDocumentoFilter
    pagination_class = GenericPagination


# -------------- INCIDENCIA TIPO - API REST -------------- #

class IncidenciaTipoAPI(viewsets.ModelViewSet):
    queryset = IncidenciaTipo.objects.all()
    serializer_class = IncidenciaTipoSerializer


class CentroAtencionAPI(viewsets.ModelViewSet):
    queryset = CentroAtencion.objects.all()
    serializer_class = CentroAtencionSerializer
