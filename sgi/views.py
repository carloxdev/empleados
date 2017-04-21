# -*- coding: utf-8 -*-
# Django Atajos:
from django.shortcuts import render
# from django.shortcuts import get_object_or_404
# from django.shortcuts import redirect

# # Django Urls:
# from django.core.urlresolvers import reverse
# #from django.core.urlresolvers import reverse_lazy
# #from django.http import HttpResponse

from rest_framework import viewsets

from .serializers import IncidenciaDocumentoSerializer
from .serializers import IncidenciaTipoSerializer
from .serializers import CentroAtencionSerializer

from .filters import IncidenciaDocumentoFilter
# # Librerias de Django
from django.views.generic.base import View
from django.views.generic import CreateView
from django_filters.rest_framework import DjangoFilterBackend

# Modelos:
from .models import IncidenciaDocumento
from .models import IncidenciaTipo
from .models import CentroAtencion

# Formularios
from .forms import IncidenciaDocumentoForm


class IncidenciaDocumentoLista(View):
    def __init__(self):
        self.template_name = 'incidencia/incidencia_lista.html'

    def get(self, request):

        # formulario = ViaticoFilterForm()

        # contexto = {
        #     'form': formulario
        # }

        return render(request, self.template_name, {})


class IncidenciaDocumentoNuevo(CreateView):
    model = IncidenciaDocumento

    template_name = 'incidencia/incidencia_nuevo.html'
    form_class = IncidenciaDocumentoForm

    def get_context_data(self, **kwargs):
        context = super(IncidenciaDocumentoNuevo, self).get_context_data(**kwargs)
        if 'form' not in context:
            context['form'] = self.form_class(self.request.GET)

    def post(self, request, *args, **kwargs):
        self.object = self.get_object
        form = self.form_class(request.POST)

        if form.is_valid():
            formulario = form.cleaned_data
            incidencia = IncidenciaDocumento()
            incidencia.tipo = formulario.get('tipo')
            incidencia.registrable = formulario.get('registrable')
            incidencia.empleado_nombre = formulario.get('empleado_nombre')
            incidencia.empleado_zona = formulario.get('empleado_zona')
            incidencia.empleado_proyecto_desc = formulario.get('empleado_proyecto_desc')
            incidencia.empleado_puesto_desc = formulario.get('empleado_puesto_desc')
            incidencia.empleado_un = formulario.get('empleado_un')
            incidencia.empleado_organizacion = formulario.get('empleado_organizacion')
            incidencia.area_descripcion = formulario.get('area_descripcion')
            incidencia.lugar = formulario.get('lugar')
            incidencia.dias_incapcidad = formulario.get('dias_incapcidad')
            incidencia.centro_atencion = formulario.get('centro_atencion')
            incidencia.acr = formulario.get('acr')
            incidencia.status = formulario.get('status')

            incidencia.save()

            # return redirect(reverse('finanzas:viatico_editar', kwargs={'pk': incidencia.id}))

        else:
            contexto = {
                'form': form
            }
            return render(request, self.template_name, contexto)


# -------------- API REST -------------- #

class IncidenciaDocumentoAPI(viewsets.ModelViewSet):
    queryset = IncidenciaDocumento.objects.all()
    serializer_class = IncidenciaDocumentoSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = IncidenciaDocumentoFilter


class IncidenciaTipoAPI(viewsets.ModelViewSet):
    queryset = IncidenciaTipo.objects.all()
    serializer_class = IncidenciaTipoSerializer


class CentroAtencionAPI(viewsets.ModelViewSet):
    queryset = CentroAtencion.objects.all()
    serializer_class = CentroAtencionSerializer
