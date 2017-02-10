from django.shortcuts import render
from django.shortcuts import redirect
from django.core.urlresolvers import reverse
from django.core.urlresolvers import reverse_lazy
from django.shortcuts import get_object_or_404

# Create your views here.
from django.views.generic.base import View

from django.views.generic.edit import DeleteView

from .models import ViaticoCabecera

from .forms import ViaticoCabeceraForm


class ViaticoLista(View):

    def get(self, request):

        lista_viaticos = ViaticoCabecera.objects.all()

        contexto = {
            'registros': lista_viaticos,
        }

        return render(request, 'viatico_lista.html', contexto)

    def post(self, request):

        # import ipdb
        # ipdb.set_trace()

        print "entro al POST"

        return render(request, 'viatico_lista.html', {})


class ViaticoAutoriacion(View):

    def get(self, request):

        return render(request, 'viatico_autorizacion.html', {})

    def post(self, request):

        return redirect(
            reverse('finanzas:viatico_lista')
        )


class ViaticoNuevo(View):

    def __init__(self):
        self.template = 'viatico_nuevo.html'

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


class ViaticoEditar(View):

    def __init__(self):
        self.template = 'viatico_editar.html'

    def get(self, request, clave):

        registro = get_object_or_404(ViaticoCabecera, pk=clave)

        # formulario = ViaticoCabeceraForm(
        #     initial={
        #         'descripcion': registro.descripcion,
        #         'empleado': registro.empleado
        #     }
        # )

        formulario = ViaticoCabeceraForm(
            instance=registro
        )

        contexto = {
            'form': formulario
        }

        return render(request, self.template, contexto)

    def post(self, request, clave):

        registro = get_object_or_404(ViaticoCabecera, pk=clave)

        error = ""
        formulario = ViaticoCabeceraForm(request.POST, instance=registro)

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
    template_name = 'viatico_eliminar.html'
    model = ViaticoCabecera
    success_url = reverse_lazy('finanzas:viatico_lista')

    # def get_context_data(self, **kwargs):
    #     context = super(ViaticoEliminar, self).get_context_data(**kwargs)

    #     datos = {
    #         "mensaje": "Se va eliminar"
    #     }

    #     context.update(datos)

    #     return context
