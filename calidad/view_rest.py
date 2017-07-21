
# Librerias de Terceros

# Django API Rest:
from rest_framework import viewsets
from rest_framework import filters
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend

# Librerias Propias

# Modelos:
from .models import Criterio
from .models import Requisito
from .models import Proceso
from .models import Subproceso
from .models import Responsable
from .models import Rol
from .models import CompaniaAccion
from .models import Sitio
from .models import Metodologia
from .models import Falla


# Serializadores:
from .serializers import CriterioSerializer
from .serializers import RequisitoSerializer
from .serializers import ProcesoSerializer
from .serializers import SubprocesoSerializer
from .serializers import ResponsableSerializer
from .serializers import RolSerializer
from .serializers import CompaniaAccionSerializer
from .serializers import SitioSerializer
from .serializers import MetodologiaSerializer
from .serializers import FallaSerializer

# Paginadores:
# from .pagination import GenericPagination

# Filtros:
from .filters import ResponsablesFilter
from .filters import CompaniaAccionFilter
from .filters import RolFilter


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


class ResponsableAPI(viewsets.ModelViewSet):
    queryset = Responsable.objects.all()
    serializer_class = ResponsableSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = (filters.DjangoFilterBackend,)
    filter_backends = (DjangoFilterBackend,)
    filter_class = ResponsablesFilter


class RolAPI(viewsets.ModelViewSet):
    queryset = Rol.objects.all()
    serializer_class = RolSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = (filters.DjangoFilterBackend,)
    filter_backends = (DjangoFilterBackend,)
    filter_class = RolFilter


class CompaniaAPI(viewsets.ModelViewSet):
    queryset = CompaniaAccion.objects.all()
    serializer_class = CompaniaAccionSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = (filters.DjangoFilterBackend,)
    filter_backends = (DjangoFilterBackend,)
    filter_class = CompaniaAccionFilter


class SitioAPI(viewsets.ModelViewSet):
    queryset = Sitio.objects.all()
    serializer_class = SitioSerializer
    permission_classes = (IsAuthenticated,)


class MetodologiaAPI(viewsets.ModelViewSet):
    queryset = Metodologia.objects.all()
    serializer_class = MetodologiaSerializer
    permission_classes = (IsAuthenticated,)


class FallaAPI(viewsets.ModelViewSet):
    queryset = Falla.objects.all()
    serializer_class = FallaSerializer
    permission_classes = (IsAuthenticated,)
