
# Librerias de Terceros

# Django API Rest:
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend

# Librerias Propias

# Modelos:
# from .models import IncidenciaDocumento
# from .models import IncidenciaTipo
# from .models import CentroAtencion
# from .models import IncidenciaArchivo
# from .models import IncidenciaResolucion
# from .models import EmpleadosZona
# from .models import VIEW_INCIDENCIAS_ZONA

# # Serializadores:
# from .serializers import IncidenciaDocumentoSerializer
# from .serializers import IncidenciaTipoSerializer
# from .serializers import CentroAtencionSerializer
# from .serializers import IncidenciaArchivoSerializer
# from .serializers import IncidenciaResolucionSerializer
# from .serializers import EmpleadosZonaSerializer
# from .serializers import VIEW_INCIDENCIAS_ZONASerializer

# Paginadores:
from .pagination import GenericPagination

# Filtros:
# from .filters import IncidenciaDocumentoFilter
# from .filters import IncidenciaArchivoFilter


# -------------- INCIDENCIA DOCUMENTO - API REST -------------- #

# class IncidenciaDocumentoAPI(viewsets.ModelViewSet):
#     queryset = IncidenciaDocumento.objects.all()
#     serializer_class = IncidenciaDocumentoSerializer
#     filter_backends = (DjangoFilterBackend,)
#     filter_class = IncidenciaDocumentoFilter
#     permission_classes = (IsAuthenticated,)


# class IncidenciaDocumentoByPageAPI(viewsets.ModelViewSet):
#     queryset = IncidenciaDocumento.objects.all()
#     serializer_class = IncidenciaDocumentoSerializer
#     filter_backends = (DjangoFilterBackend,)
#     filter_class = IncidenciaDocumentoFilter
#     pagination_class = GenericPagination
#     permission_classes = (IsAuthenticated,)


# # -------------- INCIDENCIA ANEXO - API REST -------------- #

# class IncidenciaArchivoByPageAPI(viewsets.ModelViewSet):
#     queryset = IncidenciaArchivo.objects.all()
#     serializer_class = IncidenciaArchivoSerializer
#     filter_backends = (DjangoFilterBackend,)
#     filter_class = IncidenciaArchivoFilter
#     pagination_class = GenericPagination
#     permission_classes = (IsAuthenticated,)


# class IncidenciaArchivoAPI(viewsets.ModelViewSet):
#     queryset = IncidenciaArchivo.objects.all()
#     serializer_class = IncidenciaArchivoSerializer
#     filter_backends = (DjangoFilterBackend,)
#     filter_fields = ('id',)
#     permission_classes = (IsAuthenticated,)


# # -------------- INCIDENCIA TIPO - API REST -------------- #

# class IncidenciaTipoAPI(viewsets.ModelViewSet):
#     queryset = IncidenciaTipo.objects.all()
#     serializer_class = IncidenciaTipoSerializer
#     permission_classes = (IsAuthenticated,)


# class CentroAtencionAPI(viewsets.ModelViewSet):
#     queryset = CentroAtencion.objects.all()
#     serializer_class = CentroAtencionSerializer
#     permission_classes = (IsAuthenticated,)


# # -------------- INCIDENCIA RESOLUCION - API REST -------------- #

# class IncidenciaResolucionAPI(viewsets.ModelViewSet):
#     queryset = IncidenciaResolucion.objects.all()
#     serializer_class = IncidenciaResolucionSerializer
#     permission_classes = (IsAuthenticated,)


# # -------------- INCIDENCIA EMPLEADOS ZONA - API REST -------------- #

# class IncidenciaEmpleadosZonaAPI(viewsets.ModelViewSet):
#     queryset = EmpleadosZona.objects.all()
#     serializer_class = EmpleadosZonaSerializer
#     permission_classes = (IsAuthenticated,)

# # -------------- INCIDENCIA EMPLEADOS ZONA - API REST -------------- #

# class VIEW_INCIDENCIAS_ZONAAPI(viewsets.ModelViewSet):
#     queryset = VIEW_INCIDENCIAS_ZONA.objects.all()
#     serializer_class = VIEW_INCIDENCIAS_ZONASerializer
#     permission_classes = (IsAuthenticated,)    
