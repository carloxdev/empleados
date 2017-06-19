
# Third's Libraries
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend

# Own's Libraries
from .models import ViaticoCabecera
from .models import ViaticoLinea

from .serializers import ViaticoCabeceraSerializer
from .serializers import ViaticoLineaSerializer

from .pagination import GenericPagination

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
