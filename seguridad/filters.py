# Django API REST
from rest_framework import filters
from django_filters import CharFilter

# Modelos:
from .models import User
from .models import Profile


class ProfileFilter(filters.FilterSet):

    first_name = CharFilter(
        name="first_name",
        lookup_expr="icontains"
    )

    last_name = CharFilter(
        name="last_name",
        lookup_expr="icontains"
    )

    class Meta:
        model = Profile
        fields = [
            'usuario',
            'first_name',
            'last_name',
            'clave_rh',
        ]