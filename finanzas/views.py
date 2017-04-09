# -*- coding: utf-8 -*-
# Django Atajos:
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.shortcuts import redirect


# Django Urls:
from django.core.urlresolvers import reverse
#from django.core.urlresolvers import reverse_lazy
#from django.http import HttpResponse

# Librerias de Django
from django.views.generic.base import View
from django.views.generic import CreateView

# Librerias Python

# Librerias de Terceros:
# API Rest:
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend

# Modelos:
from .models import ViaticoCabecera
from .models import ViaticoLinea

# Formularios
from .forms import ViaticoCabeceraForm
from .forms import ViaticoLineaForm
from .forms import ViaticoFilterForm

# Serializadores:
from .serializers import ViaticoCabeceraSerializer
from .serializers import ViaticoLineaSerializer

# Filtros:
from .filters import ViaticoCabeceraFilter

# Paginacion
from .pagination import GenericPagination

# -------------- VIATICO -------------- #


class ViaticoLista(View):
    def __init__(self):
        self.template_name = 'viatico/viatico_lista.html'

    def get(self, request):

        formulario = ViaticoFilterForm()

        contexto = {
            'form': formulario
        }

        return render(request, self.template_name, contexto)

    def post(self, request):
        return render(request, self.template_name, {})


class ViaticoNuevo(CreateView):
    model = ViaticoCabecera
    second_model = ViaticoLinea
    template_name = 'viatico/viatico_nuevo.html'
    form_class = ViaticoCabeceraForm
    second_form_class = ViaticoLineaForm
    operation = 'EN EDICIÓN'

    def get_context_data(self, **kwargs):
        context = super(ViaticoNuevo, self).get_context_data(**kwargs)
        if 'form' not in context:
            context['form'] = self.form_class(self.request.GET)
        if 'form2' not in context:
            context['form2'] = self.second_form_class(self.request.GET)
        if 'operation' not in context:
            context['operation'] = self.operation
        return context

    def post(self, request, *args, **kwargs):
        self.object = self.get_object
        form = self.form_class(request.POST)
        form2 = self.second_form_class()
        operation = self.operation

        if form.is_valid():
            formulario = form.cleaned_data
            viatico = ViaticoCabecera()
            viatico.empleado = formulario.get('empleado')
            viatico.fecha_partida = formulario.get('fecha_partida')
            viatico.fecha_regreso = formulario.get('fecha_regreso')
            viatico.unidad_negocio = formulario.get('unidad_negocio')
            viatico.ciudad_destino = formulario.get('ciudad_destino')
            viatico.proposito_viaje = formulario.get('proposito_viaje')
            viatico.requiere_vehiculo = formulario.get('requiere_vehiculo')
            viatico.no_vehiculo = formulario.get('no_vehiculo')
            viatico.nombre_empresa = formulario.get('nombre_empresa')
            viatico.rfc = formulario.get('rfc')
            viatico.direccion = formulario.get('direccion')
            viatico.grupo = formulario.get('grupo')
            viatico.autorizador = formulario.get('autorizador')
            viatico.status = formulario.get('status')

            viatico.save()

            return redirect(reverse('finanzas:viatico_editar', kwargs={'pk': viatico.id}))

        else:
            contexto = {
                'form': form,
                'form2': form2,
                'operation': operation
            }
            return render(request, self.template_name, contexto)


class ViaticoEditar(View):

    def __init__(self):
        self.template_name = 'viatico/viatico_editar.html'

    def get(self, request, pk):
        viatico = get_object_or_404(ViaticoCabecera, pk=pk)
        formulario = ViaticoCabeceraForm(instance=viatico)
        formulario2 = ViaticoLineaForm()
        operation = viatico.get_status_display()

        contexto = {
            'form': formulario,
            'form2': formulario2,
            'operation': operation,
            'id_cabecera': viatico.id,
        }
        return render(request, self.template_name, contexto)

    def post(self, request, pk):

        viatico = get_object_or_404(ViaticoCabecera, pk=pk)
        formulario = ViaticoCabeceraForm(request.POST, instance=viatico)
        operation = viatico.get_status_display()

        if formulario.is_valid():
            viatico = formulario.save()
            return redirect(reverse('finanzas:viatico_lista'))

        contexto = {
            'form': formulario,
            'operation': operation,
            'id_cabecera': viatico.id,
        }
        return render(request, self.template_name, contexto)

# -------------- VIATICO - API REST -------------- #


class ViaticoCabeceraAPI(viewsets.ModelViewSet):
    queryset = ViaticoCabecera.objects.all()
    serializer_class = ViaticoCabeceraSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = ViaticoCabeceraFilter


class ViaticoLineaAPI(viewsets.ModelViewSet):
    queryset = ViaticoLinea.objects.all()
    serializer_class = ViaticoLineaSerializer


class ViaticoCabeceraByPageAPI(viewsets.ModelViewSet):
    queryset = ViaticoCabecera.objects.all()
    serializer_class = ViaticoCabeceraSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = ViaticoCabeceraFilter
    pagination_class = GenericPagination


class ViaticoLineaByPageAPI(viewsets.ModelViewSet):
    queryset = ViaticoLinea.objects.all()
    serializer_class = ViaticoLineaSerializer
    pagination_class = GenericPagination
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('cabecera',)
