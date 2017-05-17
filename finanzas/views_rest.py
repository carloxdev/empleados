
# Librerias de Terceros

# Django API Rest:
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend

# Librerias Propias

# Modelos:
from .models import ViaticoCabecera
from .models import ViaticoLinea

# Serializadores:
from .serializers import ViaticoCabeceraSerializer
from .serializers import ViaticoLineaSerializer

# Paginacion:
from .pagination import GenericPagination

# Filtros:
from .filters import ViaticoCabeceraFilter


class ViaticoCabeceraAPI(viewsets.ModelViewSet):
    queryset = ViaticoCabecera.objects.all()
    serializer_class = ViaticoCabeceraSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = ViaticoCabeceraFilter
    permission_classes = (IsAuthenticated,)


class ViaticoLineaAPI(viewsets.ModelViewSet):
    queryset = ViaticoLinea.objects.all()
    serializer_class = ViaticoLineaSerializer
    permission_classes = (IsAuthenticated,)


class ViaticoCabeceraByPageAPI(viewsets.ModelViewSet):
    queryset = ViaticoCabecera.objects.all()
    serializer_class = ViaticoCabeceraSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = ViaticoCabeceraFilter
    pagination_class = GenericPagination
    permission_classes = (IsAuthenticated,)


class ViaticoLineaByPageAPI(viewsets.ModelViewSet):
    queryset = ViaticoLinea.objects.all()
    serializer_class = ViaticoLineaSerializer
    pagination_class = GenericPagination
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('cabecera',)
    permission_classes = (IsAuthenticated,)
