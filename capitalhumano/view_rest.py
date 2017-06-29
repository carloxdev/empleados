
# Librerias de Terceros

# Django API Rest:
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend

# Librerias Propias

# Modelos:
from .models import PerfilPuestoDocumento
from .models import Archivo


# Serializadores:
from .serializers import PerfilPuestoDocumentoSerializer
from .serializers import ArchivoPersonalSerializer

# Paginadores:
from .pagination import GenericPagination

# Filtros:
from .filters import PerfilpuestoDocumentoFilter
from .filters import ArchivoPersonalFilter


# -------------- DOCUMENTO PERFIL PUESTOS - API REST -------------- #

class VIEW_DOCUMENTO_PERFIL_PUESTO_ByPageAPI(viewsets.ModelViewSet):
    queryset = PerfilPuestoDocumento.objects.all()
    serializer_class = PerfilPuestoDocumentoSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = PerfilpuestoDocumentoFilter
    pagination_class = GenericPagination
    permission_classes = (IsAuthenticated,)


class Archivo_Personal_API(viewsets.ModelViewSet):
    queryset = Archivo.objects.all()
    serializer_class = ArchivoPersonalSerializer


class Archivo_Personal_ByPageAPI(viewsets.ModelViewSet):
    queryset = Archivo.objects.all()
    serializer_class = ArchivoPersonalSerializer
    pagination_class = GenericPagination
    filter_backends = (DjangoFilterBackend,)
    filter_class = ArchivoPersonalFilter
