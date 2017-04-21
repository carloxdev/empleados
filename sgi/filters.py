# -*- coding: utf-8 -*-

# Django API REST
from rest_framework import filters

# Modelos:
from .models import IncidenciaDocumento


class IncidenciaDocumentoFilter(filters.FilterSet):

    class Meta:
        model = IncidenciaDocumento
        fields = [
            'pk',
            'tipo',
            'fecha',
            'es_registrable',
            'empleado_zona',
        ]
