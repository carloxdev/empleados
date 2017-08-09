
# Librerias de Terceros

# Django API Rest:
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend

# Librerias Propias

# Modelos:
from .models import VIEW_EMPLEADOS_SIMPLE
from .models import VIEW_EMPLEADOS_FULL
from .models import VIEW_EMPLEADOS_GRADO
from .models import VIEW_ORGANIZACIONES
from .models import VIEW_ORGANIGRAMA

# Serializadores:
from .serializers import VIEW_EMPLEADOS_SIMPLE_Serializer
from .serializers import VIEW_EMPLEADOS_FULL_Serializer
from .serializers import VIEW_EMPLEADOS_GRADO_Serializer
from .serializers import VIEW_ORGANIZACIONES_Serializer
from .serializers import VIEW_ORGANIGRAMA_Serializer

# Paginacion:
from .pagination import GenericPagination

# Filtros:
from .filters import VIEW_EMPLEADOS_SIMPLE_Filter
from .filters import VIEW_EMPLEADOS_FULL_Filter
from .filters import VIEW_ORGANIGRAMA_Filter


class VIEW_EMPLEADOS_SIMPLE_API(viewsets.ModelViewSet):
    queryset = VIEW_EMPLEADOS_SIMPLE.objects.using('ebs_p').all()
    serializer_class = VIEW_EMPLEADOS_SIMPLE_Serializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = VIEW_EMPLEADOS_SIMPLE_Filter
    # permission_classes = (IsAuthenticated,)


class VIEW_EMPLEADOS_SIMPLE_ByPageAPI(viewsets.ModelViewSet):
    queryset = VIEW_EMPLEADOS_SIMPLE.objects.using('ebs_p').all()
    serializer_class = VIEW_EMPLEADOS_SIMPLE_Serializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = VIEW_EMPLEADOS_SIMPLE_Filter
    pagination_class = GenericPagination
    # permission_classes = (IsAuthenticated,)


class VIEW_EMPLEADOS_FULL_API(viewsets.ModelViewSet):
    queryset = VIEW_EMPLEADOS_FULL.objects.using('ebs_p').all()
    serializer_class = VIEW_EMPLEADOS_FULL_Serializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = VIEW_EMPLEADOS_FULL_Filter
    permission_classes = (IsAuthenticated,)


class VIEW_EMPLEADOS_FULL_ByPageAPI(viewsets.ModelViewSet):
    queryset = VIEW_EMPLEADOS_FULL.objects.using('ebs_p').all()
    serializer_class = VIEW_EMPLEADOS_FULL_Serializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = VIEW_EMPLEADOS_FULL_Filter
    pagination_class = GenericPagination
    permission_classes = (IsAuthenticated,)


class VIEW_ORGANIZACIONES_API(viewsets.ModelViewSet):
    queryset = VIEW_ORGANIZACIONES.objects.using('ebs_p').all()
    serializer_class = VIEW_ORGANIZACIONES_Serializer


class VIEW_EMPLEADOS_GRADO_API(viewsets.ModelViewSet):
    queryset = VIEW_EMPLEADOS_GRADO.objects.using('ebs_p').all()
    serializer_class = VIEW_EMPLEADOS_GRADO_Serializer


class VIEW_ORGANIGRAMA_API(viewsets.ModelViewSet):
    queryset = VIEW_ORGANIGRAMA.objects.using('ebs_p').all()
    serializer_class = VIEW_ORGANIGRAMA_Serializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = VIEW_ORGANIGRAMA_Filter
