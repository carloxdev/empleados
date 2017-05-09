# Librerias/Clases propias

# Librerias/Clases de Terceros
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend


# Librerias Propias

# Modelos:
from .models import ViaticoCabecera
from .models import ViaticoLinea

# Serializadores:
from .serializers import ViaticoCabeceraSerializer
from .serializers import ViaticoLineaSerializer

# Filtros:
from .filters import ViaticoCabeceraFilter

# Paginacion:
from home.pagination import GenericPagination


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
