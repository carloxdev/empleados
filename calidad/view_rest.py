
# Librerias de Terceros

# Django API Rest:
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
# from django_filters.rest_framework import DjangoFilterBackend

# Librerias Propias

# Modelos:
from .models import Criterio
from .models import Requisito
from .models import Proceso
from .models import Subproceso
# from .models import Requisito


# Serializadores:
from .serializers import CriterioSerializer
from .serializers import RequisitoSerializer
from .serializers import ProcesoSerializer
from .serializers import SubprocesoSerializer

# Paginadores:
# from .pagination import GenericPagination

# Filtros:
# from .filters import RequisitoFilter


# -------------- Calidad - API REST -------------- #

class CriterioAPI(viewsets.ModelViewSet):
    queryset = Criterio.objects.all()
    serializer_class = CriterioSerializer
    permission_classes = (IsAuthenticated,)


class RequisitoAPI(viewsets.ModelViewSet):
    queryset = Requisito.objects.all()
    serializer_class = RequisitoSerializer
    permission_classes = (IsAuthenticated,)


class ProcesoAPI(viewsets.ModelViewSet):
    queryset = Proceso.objects.all()
    serializer_class = ProcesoSerializer
    permission_classes = (IsAuthenticated,)


class SubprocesoAPI(viewsets.ModelViewSet):
    queryset = Subproceso.objects.all()
    serializer_class = SubprocesoSerializer
    permission_classes = (IsAuthenticated,)
