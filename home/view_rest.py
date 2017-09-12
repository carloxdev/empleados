# Django API Rest:
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend

# Modelos
from .models import Archivo

# Serializadores
from .serializers import ArchivoSerializers

# Paginadores:
from .pagination import GenericPagination

# Filtros:
from .filters import ArchivoFilter


class ArchivoAPI(viewsets.ModelViewSet):
    queryset = Archivo.objects.all()
    serializer_class = ArchivoSerializers
    filter_backends = (DjangoFilterBackend,)
    filter_class = ArchivoFilter
    permission_classes = (IsAuthenticated,)
