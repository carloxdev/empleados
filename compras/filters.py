# Django API REST
from rest_framework import filters
from django_filters import CharFilter
from django_filters import DateFilter

# Modelos:
from jde.models import VIEW_SCOMPRAS


class CompraSeguimientoFilter(filters.FilterSet):

    req_compania = CharFilter(
        name="req_compania",
        lookup_expr="icontains"
    )

    class Meta:
        model = VIEW_SCOMPRAS
        fields = [
            'req_compania',
        ]
