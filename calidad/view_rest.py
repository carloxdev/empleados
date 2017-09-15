
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
from .models import Formato
from .models import ProcesoAuditoria
from .models import RequisitoProceso
from .models import HallazgoProceso
from .models import AnalisisHallazgo


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
from .serializers import FormatoSerializer
from .serializers import ProcesoAuditoriaSerializer
from .serializers import RequisitoProcesoSerializer
from .serializers import HallazgoProcesoSerializer
from .serializers import AnalisisHallazgoSerializer

# Paginadores:
from .pagination import GenericPagination

# Filtros:
from .filters import ResponsablesFilter
from .filters import CompaniaAccionFilter
from .filters import RolFilter
from .filters import RequisitoFilter
from .filters import RequisitoProcesoFilter
from .filters import HallazgoProcesoFilter
from .filters import SubprocesoFilter
from .filters import AnalisisHallazgoFilter


# -------------- Calidad - API REST -------------- #

class CriterioAPI(viewsets.ModelViewSet):
    queryset = Criterio.objects.all()
    serializer_class = CriterioSerializer
    permission_classes = (IsAuthenticated,)


class RequisitoAPI(viewsets.ModelViewSet):
    queryset = Requisito.objects.all()
    serializer_class = RequisitoSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = (filters.DjangoFilterBackend,)
    filter_backends = (DjangoFilterBackend,)
    filter_class = RequisitoFilter


class ProcesoAPI(viewsets.ModelViewSet):
    queryset = Proceso.objects.all()
    serializer_class = ProcesoSerializer
    permission_classes = (IsAuthenticated,)


class SubprocesoAPI(viewsets.ModelViewSet):
    queryset = Subproceso.objects.all()
    serializer_class = SubprocesoSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = (filters.DjangoFilterBackend,)
    filter_backends = (DjangoFilterBackend,)
    filter_class = SubprocesoFilter


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


class SitioByPageAPI(viewsets.ModelViewSet):
    queryset = Sitio.objects.all()
    serializer_class = SitioSerializer
    permission_classes = (IsAuthenticated,)
    pagination_class = GenericPagination


class MetodologiaAPI(viewsets.ModelViewSet):
    queryset = Metodologia.objects.all()
    serializer_class = MetodologiaSerializer
    permission_classes = (IsAuthenticated,)


class MetodologiaByPageAPI(viewsets.ModelViewSet):
    queryset = Metodologia.objects.all()
    serializer_class = MetodologiaSerializer
    permission_classes = (IsAuthenticated,)
    pagination_class = GenericPagination


class FallaAPI(viewsets.ModelViewSet):
    queryset = Falla.objects.all()
    serializer_class = FallaSerializer
    permission_classes = (IsAuthenticated,)


class FallaByPageAPI(viewsets.ModelViewSet):
    queryset = Falla.objects.all()
    serializer_class = FallaSerializer
    permission_classes = (IsAuthenticated,)
    pagination_class = GenericPagination


class FormatoAPI(viewsets.ModelViewSet):
    queryset = Formato.objects.all()
    serializer_class = FormatoSerializer
    permission_classes = (IsAuthenticated,)


class ProcesoAuditoriaAPI(viewsets.ModelViewSet):
    queryset = ProcesoAuditoria.objects.all()
    serializer_class = ProcesoAuditoriaSerializer
    permission_classes = (IsAuthenticated,)


class RequisitoProcesoAPI(viewsets.ModelViewSet):
    queryset = RequisitoProceso.objects.all()
    serializer_class = RequisitoProcesoSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = (filters.DjangoFilterBackend,)
    filter_backends = (DjangoFilterBackend,)
    filter_class = RequisitoProcesoFilter


class HallazgoProcesoAPI(viewsets.ModelViewSet):
    queryset = HallazgoProceso.objects.all()
    serializer_class = HallazgoProcesoSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = (filters.DjangoFilterBackend,)
    filter_backends = (DjangoFilterBackend,)
    filter_class = HallazgoProcesoFilter


class AnalisisHallazgoAPI(viewsets.ModelViewSet):
    queryset = AnalisisHallazgo.objects.all()
    serializer_class = AnalisisHallazgoSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = (filters.DjangoFilterBackend,)
    filter_backends = (DjangoFilterBackend,)
    filter_class = AnalisisHallazgoFilter
