# -*- coding: utf-8 -*-

# Librerias de Terceros

# Django API Rest
from rest_framework.pagination import PageNumberPagination


class GenericPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'


class GenericPaginationCompras(PageNumberPagination):
    page_size = 200
    page_size_query_param = 'page_size'
