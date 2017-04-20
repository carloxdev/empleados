# Django API REST
from rest_framework import filters
from django_filters import CharFilter
from django_filters import DateFilter

# Modelos:
from .models import User


class UsuarioFilter(filters.FilterSet):

    password = CharFilter(
        name="password",
        lookup_expr="icontains"
    )

    username = CharFilter(
        name="username",
        lookup_expr="icontains"
    )
    first_name = CharFilter(
        name="first_name",
        lookup_expr="icontains"
    )
    last_name = CharFilter(
        name="last_name",
        lookup_expr="icontains"
    )
    email = CharFilter(
        name="email",
        lookup_expr="icontains"
    )
    is_active = CharFilter(
        name="is_active",
        lookup_expr="icontains"
    )

    
    class Meta:
        model = User
        fields = [
            'password',
            'username',
            'first_name',
            'last_name',
            'email',
            'is_active',
        ]

class ProfileFilter(filters.FilterSet):

    clave_rh = CharFilter(
        name="clave_rh",
        lookup_expr="icontains"
    )

    clave_jde = CharFilter(
        name="clave_jde",
        lookup_expr="icontains"
    )
    foto = CharFilter(
        name="foto",
        lookup_expr="icontains"
    )
    fecha_nacimiento = CharFilter(
        name="fecha_nacimiento",
        lookup_expr="icontains"
    )
   
    
    class Meta:
        model = User
        fields = [
            'clave_rh',
            'clave_jde',
            'foto',
            'fecha_nacimiento',
        ]
