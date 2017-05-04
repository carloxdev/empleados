# -*- coding: utf-8 -*-

# API Rest:
from rest_framework import viewsets
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend

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
from .models import VIEW_UNIDADES
from .models import VIEW_COMPANIAS
from .models import VIEW_AUTORIZACIONES
from .models import VIEW_RECEPCIONES
from .models import VIEW_ITEMS

# Serializadores:
from .serializers import VIEW_SCOMPRAS_Serializer
from .serializers import VIEW_INVENTARIO_Serializer
from .serializers import VIEW_INVENTARIO_UN_Serializer
from .serializers import VIEW_RECEPSINCOTEJO_Serializer
from .serializers import VIEW_USUARIOS_Serializer
from .serializers import VIEW_UNIDADES_Serializer
from .serializers import VIEW_COMPANIAS_Serializer
from .serializers import VIEW_AUTORIZACIONES_Serializer
from .serializers import VIEW_RECEPCIONES_Serializer

from .serializers import VM_PORF_COMPRAS_Serializer
from .serializers import VM_PORF_CXC_Serializer
from .serializers import VM_PORF_CXP_Serializer
from .serializers import VM_PORF_NOMINA_Serializer

# Paginadores:
from .pagination import GenericPagination

# Filtros:
from .filters import VIEW_SCOMPRAS_Filter
from .filters import VIEW_INVENTARIO_Filter
from .filters import VIEW_INVENTARIO_UN_Filter
from .filters import VIEW_RECEPSINCOTEJO_Filter
from .filters import VIEW_USUARIOS_Filter
from .filters import VIEW_AUTORIZACIONES_Filter
from .filters import VIEW_RECEPCIONES_Filter

from .filters import VM_PORF_COMPRAS_Filter
from .filters import VM_PORF_CXC_Filter
from .filters import VM_PORF_CXP_Filter
from .filters import VM_PORF_NOMINA_Filter


# ----------------- VIEW_SCOMPRAS ----------------- #


class VIEW_SCOMPRAS_API(viewsets.ModelViewSet):
    queryset = VIEW_SCOMPRAS.objects.using('jde_p').all()
    serializer_class = VIEW_SCOMPRAS_Serializer

    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = VIEW_SCOMPRAS_Filter


class VIEW_SCOMPRAS_ByPageAPI(viewsets.ModelViewSet):
    queryset = VIEW_SCOMPRAS.objects.using('jde_p').all()
    serializer_class = VIEW_SCOMPRAS_Serializer
    pagination_class = GenericPagination

    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = VIEW_SCOMPRAS_Filter


# ----------------- VIEW_INVENTARIO ----------------- #


class VIEW_INVENTARIO_ByPageAPI(viewsets.ModelViewSet):
    queryset = VIEW_INVENTARIO.objects.using('jde_p').all()
    serializer_class = VIEW_INVENTARIO_Serializer
    pagination_class = GenericPagination

    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = VIEW_INVENTARIO_Filter


class VIEW_INVENTARIO_UN_ByPageAPI(viewsets.ModelViewSet):
    queryset = VIEW_INVENTARIO_UN.objects.using('jde_p').all()
    serializer_class = VIEW_INVENTARIO_UN_Serializer
    pagination_class = GenericPagination

    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = VIEW_INVENTARIO_UN_Filter


# ----------------- VM_PORF_COMPRAS ----------------- #

class VM_PORF_COMPRAS_API(viewsets.ModelViewSet):
    queryset = VM_PORF_COMPRAS.objects.using('jde_p').all()
    serializer_class = VM_PORF_COMPRAS_Serializer

    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = VM_PORF_COMPRAS_Filter


class VM_PORF_COMPRAS_ByPageAPI(viewsets.ModelViewSet):
    queryset = VM_PORF_COMPRAS.objects.using('jde_p').all()
    serializer_class = VM_PORF_COMPRAS_Serializer
    pagination_class = GenericPagination

    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = VM_PORF_COMPRAS_Filter


# ----------------- VM_PORF_CXC ----------------- #

class VM_PORF_CXC_API(viewsets.ModelViewSet):
    queryset = VM_PORF_CXC.objects.using('jde_p').all()
    serializer_class = VM_PORF_CXC_Serializer

    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = VM_PORF_CXC_Filter


class VM_PORF_CXC_ByPageAPI(viewsets.ModelViewSet):
    queryset = VM_PORF_CXC.objects.using('jde_p').all()
    serializer_class = VM_PORF_CXC_Serializer
    pagination_class = GenericPagination

    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = VM_PORF_CXC_Filter


# ----------------- VM_PORF_CXP ----------------- #


class VM_PORF_CXP_API(viewsets.ModelViewSet):
    queryset = VM_PORF_CXP.objects.using('jde_p').all()
    serializer_class = VM_PORF_CXP_Serializer

    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = VM_PORF_CXP_Filter


class VM_PORF_CXP_ByPageAPI(viewsets.ModelViewSet):
    queryset = VM_PORF_CXP.objects.using('jde_p').all()
    serializer_class = VM_PORF_CXP_Serializer
    pagination_class = GenericPagination

    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = VM_PORF_CXP_Filter


# ----------------- VM_PORF_NOMINA ----------------- #

class VM_PORF_NOMINA_API(viewsets.ModelViewSet):
    queryset = VM_PORF_NOMINA.objects.using('jde_p').all()
    serializer_class = VM_PORF_NOMINA_Serializer

    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = VM_PORF_NOMINA_Filter


class VM_PORF_NOMINA_ByPageAPI(viewsets.ModelViewSet):
    queryset = VM_PORF_NOMINA.objects.using('jde_p').all()
    serializer_class = VM_PORF_NOMINA_Serializer
    pagination_class = GenericPagination

    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = VM_PORF_NOMINA_Filter


# ----------------- VIEW_RECEPSINCOTEJO ----------------- #

class VIEW_RECEPSINCOTEJO_API(viewsets.ModelViewSet):
    queryset = VIEW_RECEPSINCOTEJO.objects.using('jde_p').all()
    serializer_class = VIEW_RECEPSINCOTEJO_Serializer

    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = VIEW_RECEPSINCOTEJO_Filter

# ----------------- VIEW_USUARIOS ----------------- #


class VIEW_USUARIOS_API(viewsets.ModelViewSet):
    queryset = VIEW_USUARIOS.objects.using('jde_p').all()
    serializer_class = VIEW_USUARIOS_Serializer

    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = VIEW_USUARIOS_Filter


class VIEWS_COMPRAS_API(viewsets.ModelViewSet):
    queryset = VIEW_SCOMPRAS.objects.using('jde_p').all()
    serializer_class = VIEW_SCOMPRAS_Serializer

    filter_backends = (DjangoFilterBackend,)
    filter_class = VIEW_SCOMPRAS_Filter


class VIEW_UNIDADES_API(viewsets.ModelViewSet):
    queryset = VIEW_UNIDADES.objects.using('jde_p').all()
    serializer_class = VIEW_UNIDADES_Serializer


class VIEW_COMPANIAS_API(viewsets.ModelViewSet):
    queryset = VIEW_COMPANIAS.objects.using('jde_p').all()
    serializer_class = VIEW_COMPANIAS_Serializer


class VIEW_AUTORIZACIONES_ByPageAPI(viewsets.ReadOnlyModelViewSet):
    queryset = VIEW_AUTORIZACIONES.objects.using('jde_p').all()
    serializer_class = VIEW_AUTORIZACIONES_Serializer
    pagination_class = GenericPagination

    filter_backends = (DjangoFilterBackend,)
    filter_class = VIEW_AUTORIZACIONES_Filter


class VIEW_RECEPCIONES_ByPageAPI(viewsets.ReadOnlyModelViewSet):
    queryset = VIEW_RECEPCIONES.objects.using('jde_p').all()
    serializer_class = VIEW_RECEPCIONES_Serializer
    pagination_class = GenericPagination

    filter_backends = (DjangoFilterBackend,)
    filter_class = VIEW_RECEPCIONES_Filter

