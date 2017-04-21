# Django API REST
from rest_framework import filters
from django_filters import CharFilter

# Modelos:
from .models import Profile


class ProfileFilter(filters.FilterSet):

    usuario__first_name = CharFilter(
        name="usuario__first_name",
        lookup_expr="icontains"
    )

    usuario__last_name = CharFilter(
        name="usuario__last_name",
        lookup_expr="icontains"
    )

    class Meta:
        model = Profile
        fields = [
            'usuario',
            'usuario__first_name',
            'usuario__last_name',
            'clave_rh',
        ]
