# -*- coding: utf-8 -*-

# Django API REST
from rest_framework import filters
from django_filters import CharFilter

# Modelos:
from .models import Requisito


# class RequisitoFilter(filters.FilterSet):

#     requisito = CharFilter(
#         name="empleado_puesto_desc",
#         lookup_expr="icontains"
#     )

#     class Meta:
#         model = Requisito
#         fields = [
#             'requisito',
#         ]
