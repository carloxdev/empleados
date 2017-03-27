# Librerias de Django
from django.views.generic import CreateView
from django.views.generic import ListView

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

# Serializadores:
from .serializers import ViaticoCabeceraSerializer
from .serializers import ViaticoLineaSerializer

# Filtros:
from .filters import ViaticoCabeceraFilter

# Paginacion
from .pagination import GenericPagination

# -------------- VIATICO -------------- #


class ViaticoLista(ListView):
    model = ViaticoCabecera
    template_name = 'viatico/viatico_lista.html'
    context_object_name = 'viaticos_solicitudes'


class ViaticoNuevo(CreateView):
    model = ViaticoCabecera
    second_model = ViaticoLinea
    template_name = 'viatico/viatico_formulario.html'
    form_class = ViaticoCabeceraForm
    second_form_class = ViaticoLineaForm

    def get_context_data(self, **kwargs):
        context = super(ViaticoNuevo, self).get_context_data(**kwargs)
        if 'form' not in context:
            context['form'] = self.form_class(self.request.GET)
        if 'form2' not in context:
            context['form2'] = self.second_form_class(self.request.GET)
        return context


# -------------- VIATICO - API REST -------------- #

class ViaticoCabeceraAPI(viewsets.ModelViewSet):
    queryset = ViaticoCabecera.objects.all()
    serializer_class = ViaticoCabeceraSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = ViaticoCabeceraFilter


class ViaticoLineaAPI(viewsets.ModelViewSet):
    queryset = ViaticoLinea.objects.all()
    serializer_class = ViaticoLineaSerializer


class ViaticoCabeceraPaginado(viewsets.ModelViewSet):
    queryset = ViaticoCabecera.objects.all()
    serializer_class = ViaticoCabeceraSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = ViaticoCabeceraFilter
    pagination_class = GenericPagination


class ViaticoLineaPaginado(viewsets.ModelViewSet):
    queryset = ViaticoLinea.objects.all()
    serializer_class = ViaticoLineaSerializer
    pagination_class = GenericPagination
