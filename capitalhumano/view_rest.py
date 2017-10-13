
# Librerias de Terceros

# Django API Rest:
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend

# Librerias Propias

# Modelos:
from .models import TipoDocumento
from .models import DocumentoPersonal
from .models import DocumentoCapacitacion
from .models import PerfilPuestoDocumento
from .models import PerfilPuestosCargo
from .models import PerfilCompetencias
from .models import PerfilIndicadores
from .models import Curso

# Serializadores:
from .serializers import PersonalSerializer
from .serializers import CapacitacionSerializer
from .serializers import TipoDocumentoSerializer
from .serializers import DocumentoPersonalSerializers
from .serializers import DocumentoCapacitacionSerializers
from .serializers import PerfilPuestoDocumentoSerializer
from .serializers import PerfilPuestosCargoSerializer
from .serializers import PerfilCompetenciaSerializer
from .serializers import PerfilIndicadorSerializer
from .serializers import CursoNuevoSerializer
from .serializers import CursoSerializer

# Paginadores:
from .pagination import GenericPagination

# Filtros:
from .filters import DocumentoPersonalFilter
from .filters import DocumentoCapacitacionFilter
from .filters import TipoDocumentoFilter
from .filters import PerfilPuestoDocumentoFilter
from .filters import PerfilpuestosCargoFilter
from .filters import PerfilCompetenciaFilter
from .filters import PerfilIndicadorFilter
from .filters import CursoFilter


# -------------- DOCUMENTOS CAPITAL HUMANO -------------- #
class CursoAPI(viewsets.ModelViewSet):
    queryset = Curso.objects.all().order_by('-created_date')
    serializer_class = CursoNuevoSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = CursoFilter
    permission_classes = (IsAuthenticated,)


class CursoByPageAPI(viewsets.ModelViewSet):
    queryset = Curso.objects.all().order_by('-created_date')
    serializer_class = CursoSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = CursoFilter
    pagination_class = GenericPagination
    permission_classes = (IsAuthenticated,)


class TipoDocumentoAPI(viewsets.ModelViewSet):
    queryset = TipoDocumento.objects.all().order_by('-created_date')
    serializer_class = TipoDocumentoSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = TipoDocumentoFilter
    permission_classes = (IsAuthenticated,)


class PersonalAPI(viewsets.ModelViewSet):
    queryset = DocumentoPersonal.objects.all().order_by('-created_date')
    serializer_class = PersonalSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = DocumentoPersonalFilter
    permission_classes = (IsAuthenticated,)


class PersonalByPageAPI(viewsets.ModelViewSet):
    queryset = DocumentoPersonal.objects.all().order_by('-created_date')
    serializer_class = PersonalSerializer
    pagination_class = GenericPagination
    filter_backends = (DjangoFilterBackend,)
    filter_class = DocumentoPersonalFilter
    permission_classes = (IsAuthenticated,)


class CapacitacionAPI(viewsets.ModelViewSet):
    queryset = DocumentoCapacitacion.objects.all().order_by('-created_date')
    serializer_class = CapacitacionSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = DocumentoCapacitacionFilter
    permission_classes = (IsAuthenticated,)


class CapacitacionByPageAPI(viewsets.ModelViewSet):
    queryset = DocumentoCapacitacion.objects.all().order_by('-created_date')
    serializer_class = CapacitacionSerializer
    pagination_class = GenericPagination
    filter_backends = (DjangoFilterBackend,)
    filter_class = DocumentoCapacitacionFilter
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

# -------------- DOCUMENTO PERFIL PUESTOS - API REST -------------- #


class PerfilPuestosCargoAPI(viewsets.ModelViewSet):
    queryset = PerfilPuestosCargo.objects.all()
    serializer_class = PerfilPuestosCargoSerializer


class PerfilPuestosCargoByPageAPI(viewsets.ModelViewSet):
    queryset = PerfilPuestosCargo.objects.all()
    serializer_class = PerfilPuestosCargoSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = PerfilpuestosCargoFilter
    pagination_class = GenericPagination
    permission_classes = (IsAuthenticated,)


class PerfilPuestosDocumentoAPI(viewsets.ModelViewSet):
    queryset = PerfilPuestoDocumento.objects.all()
    serializer_class = PerfilPuestoDocumentoSerializer


class PerfilPuestosDocumentoByPageAPI(viewsets.ModelViewSet):
    queryset = PerfilPuestoDocumento.objects.all()
    serializer_class = PerfilPuestoDocumentoSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = PerfilPuestoDocumentoFilter
    pagination_class = GenericPagination
    permission_classes = (IsAuthenticated,)


class PerfilCompetenciasAPI(viewsets.ModelViewSet):
    queryset = PerfilCompetencias.objects.all()
    serializer_class = PerfilCompetenciaSerializer


class PerfilCompetenciasByPageAPI(viewsets.ModelViewSet):
    queryset = PerfilCompetencias.objects.all()
    serializer_class = PerfilCompetenciaSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = PerfilCompetenciaFilter
    pagination_class = GenericPagination
    permission_classes = (IsAuthenticated,)

class PerfilIndicadoresAPI(viewsets.ModelViewSet):
    queryset = PerfilIndicadores.objects.all()
    serializer_class = PerfilIndicadorSerializer


class PerfilIndicadoresByPageAPI(viewsets.ModelViewSet):
    queryset = PerfilIndicadores.objects.all()
    serializer_class = PerfilIndicadorSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = PerfilIndicadorFilter
    pagination_class = GenericPagination
    permission_classes = (IsAuthenticated,)

