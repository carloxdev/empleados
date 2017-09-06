# Django API Rest:
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend

# Modelos:
from capitalhumano.models import Archivo
from .models import Solicitud
from .models import Asunto

# Serializadores
from .serializers import ArchivoSolicitudSerializer
from .serializers import SolicitudSerializers
from .serializers import AsuntoSerializers

# Filters
from .filters import ArchivoSolicitudFilter

# Paginadores:
from .pagination import GenericPagination


class AsuntoAPI(viewsets.ModelViewSet):
    queryset = Asunto.objects.all().order_by('-created_date')
    serializer_class = AsuntoSerializers
    permission_classes = (IsAuthenticated,)


class SolicitudAPI(viewsets.ModelViewSet):
    queryset = Solicitud.objects.all().order_by('-created_date')
    serializer_class = SolicitudSerializers
    permission_classes = (IsAuthenticated,)


class ArchivoSolicitudAPI(viewsets.ModelViewSet):
    queryset = Archivo.objects.filter(
        tipo_archivo='sol').order_by('-created_date')
    serializer_class = ArchivoSolicitudSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = ArchivoSolicitudFilter
    permission_classes = (IsAuthenticated,)


class ArchivoSolicitudByPageAPI(viewsets.ModelViewSet):
    queryset = Archivo.objects.filter(
        tipo_archivo='sol').order_by('-created_date')
    serializer_class = ArchivoSolicitudSerializer
    pagination_class = GenericPagination
    filter_backends = (DjangoFilterBackend,)
    filter_class = ArchivoSolicitudFilter
    permission_classes = (IsAuthenticated,)
