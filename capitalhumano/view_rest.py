
# Librerias de Terceros

# Django API Rest:
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend

# Librerias Propias

# Modelos:
from .models import PerfilPuestoDocumento


# Serializadores:
from .serializers import PerfilPuestoDocumentoSerializer

# Paginadores:
from .pagination import GenericPagination

# Filtros:
from .filters import PerfilpuestoDocumentoFilter


# -------------- DOCUMENTO PERFIL PUESTOS - API REST -------------- #

class VIEW_DOCUMENTO_PERFIL_PUESTO_ByPageAPI(viewsets.ModelViewSet):
    queryset = PerfilPuestoDocumento.objects.all()
    serializer_class = PerfilPuestoDocumentoSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = PerfilpuestoDocumentoFilter
    pagination_class = GenericPagination
    permission_classes = (IsAuthenticated,)