# -*- coding: utf-8 -*-

# API Rest:
from rest_framework import viewsets
from rest_framework import filters

# Modelos:
from .models import VIEW_SCOMPRAS
from .models import VIEW_INVENTARIO
from .models import VIEW_INVENTARIO_UN
from .models import VM_PORF_COMPRAS
from .models import VM_PORF_CXC
from .models import VM_PORF_CXP
from .models import VM_PORF_NOMINA
from .models import VIEW_RECEPSINCOTEJO
from .models import VIEW_USUARIOS

# Serializadores:
from .serializers import VIEW_SCOMPRAS_Serializer
from .serializers import VIEW_INVENTARIO_Serializer
from .serializers import VIEW_INVENTARIO_UN_Serializer
from .serializers import VM_PORF_COMPRAS_Serializer
from .serializers import VM_PORF_CXC_Serializer
from .serializers import VM_PORF_CXP_Serializer
from .serializers import VM_PORF_NOMINA_Serializer
from .serializers import VIEW_RECEPSINCOTEJO_Serializer
from .serializers import VIEW_USUARIOS_Serializer

# Paginadores:
from .pagination import GenericPagination

# Filtros:
from .filters import VIEW_SCOMPRAS_Filter
from .filters import VIEW_INVENTARIO_Filter
from .filters import VIEW_INVENTARIO_UN_Filter
from .filters import VM_PORF_COMPRAS_Filter
from .filters import VM_PORF_CXC_Filter
from .filters import VM_PORF_CXP_Filter
from .filters import VM_PORF_NOMINA_Filter
from .filters import VIEW_RECEPSINCOTEJO_Filter
from .filters import VIEW_USUARIOS_Filter


# ----------------- VIEW_SCOMPRAS ----------------- #

class VIEW_SCOMPRAS_API(viewsets.ModelViewSet):
    queryset = VIEW_SCOMPRAS.objects.using('jprod').all()
    serializer_class = VIEW_SCOMPRAS_Serializer
    pagination_class = GenericPagination

    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = VIEW_SCOMPRAS_Filter


class VIEW_SCOMPRAS_Todos_API(viewsets.ModelViewSet):
    queryset = VIEW_SCOMPRAS.objects.using('jprod').all()
    serializer_class = VIEW_SCOMPRAS_Serializer

    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = VIEW_SCOMPRAS_Filter

# ----------------- VIEW_INVENTARIO ----------------- #


class VIEW_INVENTARIO_API(viewsets.ModelViewSet):
    queryset = VIEW_INVENTARIO.objects.using('jprod').all()
    serializer_class = VIEW_INVENTARIO_Serializer
    pagination_class = GenericPagination

    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = VIEW_INVENTARIO_Filter


class VIEW_INVENTARIO_UN_API(viewsets.ModelViewSet):
    queryset = VIEW_INVENTARIO_UN.objects.using('jprod').all()
    serializer_class = VIEW_INVENTARIO_UN_Serializer
    pagination_class = GenericPagination

    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = VIEW_INVENTARIO_UN_Filter


# ----------------- VM_PORF_COMPRAS ----------------- #


class VM_PORF_COMPRAS_API(viewsets.ModelViewSet):
    queryset = VM_PORF_COMPRAS.objects.using('jprod').all()
    serializer_class = VM_PORF_COMPRAS_Serializer
    pagination_class = GenericPagination

    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = VM_PORF_COMPRAS_Filter


class VM_PORF_COMPRAS_Todos_API(viewsets.ModelViewSet):
    queryset = VM_PORF_COMPRAS.objects.using('jprod').all()
    serializer_class = VM_PORF_COMPRAS_Serializer

    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = VM_PORF_COMPRAS_Filter


# ----------------- VM_PORF_CXC ----------------- #

class VM_PORF_CXC_API(viewsets.ModelViewSet):
    queryset = VM_PORF_CXC.objects.using('jprod').all()
    serializer_class = VM_PORF_CXC_Serializer
    pagination_class = GenericPagination

    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = VM_PORF_CXC_Filter


class VM_PORF_CXC_Todos_API(viewsets.ModelViewSet):
    queryset = VM_PORF_CXC.objects.using('jprod').all()
    serializer_class = VM_PORF_CXC_Serializer

    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = VM_PORF_CXC_Filter


# ----------------- VM_PORF_CXP ----------------- #

class VM_PORF_CXP_API(viewsets.ModelViewSet):
    queryset = VM_PORF_CXP.objects.using('jprod').all()
    serializer_class = VM_PORF_CXP_Serializer
    pagination_class = GenericPagination

    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = VM_PORF_CXP_Filter


class VM_PORF_CXP_Todos_API(viewsets.ModelViewSet):
    queryset = VM_PORF_CXP.objects.using('jprod').all()
    serializer_class = VM_PORF_CXP_Serializer

    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = VM_PORF_CXP_Filter


# ----------------- VM_PORF_NOMINA ----------------- #

class VM_PORF_NOMINA_API(viewsets.ModelViewSet):
    queryset = VM_PORF_NOMINA.objects.using('jprod').all()
    serializer_class = VM_PORF_NOMINA_Serializer
    pagination_class = GenericPagination

    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = VM_PORF_NOMINA_Filter


class VM_PORF_NOMINA_Todos_API(viewsets.ModelViewSet):
    queryset = VM_PORF_NOMINA.objects.using('jprod').all()
    serializer_class = VM_PORF_NOMINA_Serializer

    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = VM_PORF_NOMINA_Filter


# ----------------- VIEW_RECEPSINCOTEJO ----------------- #


class VIEW_RECEPSINCOTEJO_Todos_API(viewsets.ModelViewSet):
    queryset = VIEW_RECEPSINCOTEJO.objects.using('jprod').all()
    serializer_class = VIEW_RECEPSINCOTEJO_Serializer

    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = VIEW_RECEPSINCOTEJO_Filter

# ----------------- VIEW_USUARIOS ----------------- #

class VIEW_USUARIOS_API(viewsets.ModelViewSet):
    queryset = VIEW_USUARIOS.objects.using('jde_p').all()
    serializer_class = VIEW_USUARIOS_Serializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = VIEW_USUARIOS_Filter
        
