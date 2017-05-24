
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

# Serializadores:
from .serializers import VIEW_EMPLEADOS_SIMPLE_Serializer
from .serializers import VIEW_EMPLEADOS_FULL_Serializer
from .serializers import VIEW_EMPLEADOS_GRADO_Serializer

# Paginacion:
from .pagination import GenericPagination

# Filtros:
from .filters import VIEW_EMPLEADOS_SIMPLE_Filter
from .filters import VIEW_EMPLEADOS_FULL_Filter
from .filters import VIEW_EMPLEADOS_GRADO_Filter


class VIEW_EMPLEADOS_SIMPLE_API(viewsets.ModelViewSet):
    queryset = VIEW_EMPLEADOS_SIMPLE.objects.using('ebs_d').all()
    serializer_class = VIEW_EMPLEADOS_SIMPLE_Serializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = VIEW_EMPLEADOS_SIMPLE_Filter
    # permission_classes = (IsAuthenticated,)


class VIEW_EMPLEADOS_SIMPLE_ByPageAPI(viewsets.ModelViewSet):
    queryset = VIEW_EMPLEADOS_SIMPLE.objects.using('ebs_d').all()
    serializer_class = VIEW_EMPLEADOS_SIMPLE_Serializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = VIEW_EMPLEADOS_SIMPLE_Filter
    pagination_class = GenericPagination
    # permission_classes = (IsAuthenticated,)


class VIEW_EMPLEADOS_FULL_API(viewsets.ModelViewSet):
    queryset = VIEW_EMPLEADOS_FULL.objects.using('ebs_d').all()
    serializer_class = VIEW_EMPLEADOS_FULL_Serializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = VIEW_EMPLEADOS_FULL_Filter
    permission_classes = (IsAuthenticated,)


class VIEW_EMPLEADOS_FULL_ByPageAPI(viewsets.ModelViewSet):
    queryset = VIEW_EMPLEADOS_FULL.objects.using('ebs_d').all()
    serializer_class = VIEW_EMPLEADOS_FULL_Serializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = VIEW_EMPLEADOS_FULL_Filter
    pagination_class = GenericPagination
    permission_classes = (IsAuthenticated,)

class VIEW_EMPLEADOS_GRADO_API(viewsets.ModelViewSet):
    queryset = VIEW_EMPLEADOS_GRADO.objects.using('ebs_d').all()
    serializer_class = VIEW_EMPLEADOS_GRADO_Serializer
   
    


