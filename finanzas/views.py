from django.shortcuts import render

# Create your views here.
from django.views.generic.base import View


class ViaticoLista(View):

    def get(self, request):
        # import ipdb
        # ipdb.set_trace()
        lista_compras = [
            'Talco',
            'manzanas',
            'perro'
        ]

        contexto = {
            'mivariable': lista_compras
        }

        return render(request, 'viatico_lista.html', contexto)
