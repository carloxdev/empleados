from django.shortcuts import render
from django.shortcuts import redirect
from django.core.urlresolvers import reverse

# Create your views here.
from django.views.generic.base import View

from .models import ViaticoCabecera


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
