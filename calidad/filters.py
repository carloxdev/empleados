# -*- coding: utf-8 -*-

# Django API REST
from rest_framework import filters
from django_filters import CharFilter
from django_filters import NumberFilter

# Modelos:
from .models import Requisito
from .models import Responsable


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

class ResponsablesFilter(filters.FilterSet):

    nombre_completo = CharFilter(
        name="nombre_completo",
        lookup_expr="exact"
    )

    numero_empleado = CharFilter(
        name="numero_empleado",
        lookup_expr="exact"
    )

    proceso_id = NumberFilter(
        name="proceso_id",
        lookup_expr="exact"
    )

    class Meta:
        model = Responsable
        fields = [
            'nombre_completo',
            'numero_empleado',
            'proceso_id',
        ]
