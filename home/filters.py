# Django API REST
from rest_framework import filters
from django_filters import CharFilter

# Modelos:
from .models import Archivo

class ArchivoFilter(filters.FilterSet):

    pk = CharFilter(
        name="pk",
        lookup_expr="icontains")

    class Meta:
        model = Archivo
        fields = [
            'pk',
        ]
