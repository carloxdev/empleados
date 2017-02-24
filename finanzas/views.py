from django.shortcuts import render
from django.shortcuts import redirect
from django.core.urlresolvers import reverse
from django.core.urlresolvers import reverse_lazy
from django.shortcuts import get_object_or_404

from django.http import HttpResponse
import json

# Create your views here.
from django.views.generic.base import View

from django.views.generic.edit import DeleteView

from .models import ViaticoCabecera

from .forms import ViaticoCabeceraForm
from .forms import ViaticoCabeceraFormEdit

from rest_framework import viewsets
from serializadores import ViaticoCabeceraSerializer


class ViaticoLista(View):

    def get(self, request):

        lista_viaticos = ViaticoCabecera.objects.all()

        contexto = {
            'registros': lista_viaticos,
        }

        return render(request, 'viatico/viatico_lista.html', contexto)

    def post(self, request):

        # import ipdb
        # ipdb.set_trace()

        print "entro al POST"

        return render(request, 'viatico/viatico_lista.html', {})


class ViaticoAutoriacion(View):

    def get(self, request):

        return render(request, 'viatico/viatico_autorizacion.html', {})

    def post(self, request):

        return redirect(
            reverse('finanzas:viatico_lista')
        )


class ViaticoNuevo(View):

    def __init__(self):
        self.template = 'viatico/viatico_nuevo.html'

    def get(self, request):

        formulario = ViaticoCabeceraForm()

        contexto = {
            'form': formulario
        }

        return render(request, self.template, contexto)

    def post(self, request):

        error = ""
        formulario = ViaticoCabeceraForm(request.POST)

        if formulario.is_valid():

            datos = formulario.cleaned_data

            viatico = ViaticoCabecera()
            viatico.descripcion = datos.get('descripcion')
            viatico.empleado = datos.get('empleado')
            viatico.autorizador = datos.get('autorizador')
            viatico.fecha_partida = datos.get('fecha_partida')
            viatico.empresa = datos.get('empresa')
            viatico.un = datos.get('un')
            viatico.ciudad_destino = datos.get('ciudad_destino')
            viatico.status = datos.get('status')
            viatico.vehiculo_requerido = datos.get('vehiculo_requerido')
            viatico.vehiculo_numero = datos.get('vehiculo_numero')
            viatico.proposito = datos.get('proposito')

            viatico.created_by = request.user
            viatico.updated_by = request.user

            viatico.save()

            return redirect(
                reverse('finanzas:viatico_lista')
            )
        else:
            error = "El formulario no es valido"

        contexto = {
            'mensaje': error,
            'form': formulario
        }

        return render(request, self.template, contexto)


class ViaticoEditar(View):

    def __init__(self):
        self.template = 'viatico/viatico_editar.html'

    def get(self, request, clave):

        registro = get_object_or_404(ViaticoCabecera, pk=clave)

        formulario = ViaticoCabeceraFormEdit(
            instance=registro
        )

        contexto = {
            'form': formulario
        }

        return render(request, self.template, contexto)

    def post(self, request, clave):

        registro = get_object_or_404(ViaticoCabecera, pk=clave)

        error = ""
        formulario = ViaticoCabeceraFormEdit(request.POST, instance=registro)

        if formulario.is_valid():
            formulario.save()

            return redirect(
                reverse('finanzas:viatico_lista')
            )
        else:
            error = "El formulario no es valido"

        contexto = {
            'mensaje': error,
            'form': formulario
        }

        return render(request, self.template, contexto)


class ViaticoEliminar(DeleteView):
    template_name = 'viatico/viatico_eliminar.html'
    model = ViaticoCabecera
    success_url = reverse_lazy('finanzas:viatico_lista')


class ViaticoAPI(View):

    def get(self, request):

        registros = ViaticoCabecera.objects.all()

        lista = []

        for r in registros:

            mensaje = {
                'empleado': r.empleado,
                'descripcion': r.descripcion
            }

            lista.append(mensaje)

        data = json.dumps(lista)

        return HttpResponse(data, content_type='application/json')


class ViaticoAPI2(viewsets.ModelViewSet):
    queryset = ViaticoCabecera.objects.all()
    serializer_class = ViaticoCabeceraSerializer
