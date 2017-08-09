
# Librerias de Terceros

# Django API Rest:
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend

# Librerias Propias

# Modelos:
from .models import PerfilPuestoDocumento
from .models import DocumentoPersonal
from .models import DocumentoCapacitacion
from .models import Archivo


# Serializadores:
from .serializers import PerfilPuestoDocumentoSerializer
from .serializers import DocumentoPersonalSerializers
from .serializers import ArchivoPersonalSerializer
from .serializers import ArchivoCapacitacionSerializer
from .serializers import ArchivoSerializers
from .serializers import DocumentoCapacitacionSerializers

# Paginadores:
from .pagination import GenericPagination

# Filtros:
from .filters import PerfilpuestoDocumentoFilter
from .filters import ArchivoPersonalFilter
from .filters import ArchivoCapacitacionFilter
from .filters import ArchivoFilter
from .filters import DocumentoPersonalFilter


# -------------- DOCUMENTO PERFIL PUESTOS - API REST -------------- #

class VIEW_DOCUMENTO_PERFIL_PUESTO_ByPageAPI(viewsets.ModelViewSet):
    queryset = PerfilPuestoDocumento.objects.all()
    serializer_class = PerfilPuestoDocumentoSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = PerfilpuestoDocumentoFilter
    pagination_class = GenericPagination
    permission_classes = (IsAuthenticated,)


class DocumentoPersonalAPI(viewsets.ModelViewSet):
    queryset = DocumentoPersonal.objects.all()
    serializer_class = DocumentoPersonalSerializers
    filter_backends = (DjangoFilterBackend,)
    filter_class = DocumentoPersonalFilter
    permission_classes = (IsAuthenticated,)


class DocumentoCapacitacionAPI(viewsets.ModelViewSet):
    queryset = DocumentoCapacitacion.objects.all()
    serializer_class = DocumentoCapacitacionSerializers
    permission_classes = (IsAuthenticated,)


class ArchivoAPI(viewsets.ModelViewSet):
    queryset = Archivo.objects.all()
    serializer_class = ArchivoSerializers
    filter_backends = (DjangoFilterBackend,)
    filter_class = ArchivoFilter
    permission_classes = (IsAuthenticated,)


class ArchivoPersonalAPI(viewsets.ModelViewSet):
    queryset = Archivo.objects.filter(
        tipo_archivo='per').order_by('-created_date')
    serializer_class = ArchivoPersonalSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = ArchivoPersonalFilter
    permission_classes = (IsAuthenticated,)


class ArchivoPersonalByPageAPI(viewsets.ModelViewSet):
    queryset = Archivo.objects.filter(
        tipo_archivo='per').order_by('-created_date')
    serializer_class = ArchivoPersonalSerializer
    pagination_class = GenericPagination
    filter_backends = (DjangoFilterBackend,)
    filter_class = ArchivoPersonalFilter
    permission_classes = (IsAuthenticated,)


class ArchivoCapacitacionAPI(viewsets.ModelViewSet):
    queryset = Archivo.objects.filter(
        tipo_archivo='cap').order_by('-created_date')
    serializer_class = ArchivoCapacitacionSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = ArchivoCapacitacionFilter
    permission_classes = (IsAuthenticated,)


class ArchivoCapacitacionByPageAPI(viewsets.ModelViewSet):
    queryset = Archivo.objects.filter(
        tipo_archivo='cap').order_by('-created_date')
    serializer_class = ArchivoCapacitacionSerializer
    pagination_class = GenericPagination
    filter_backends = (DjangoFilterBackend,)
    filter_class = ArchivoCapacitacionFilter
    permission_classes = (IsAuthenticated,)
