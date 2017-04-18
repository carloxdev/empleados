# Django API REST
from rest_framework import filters
from django_filters import CharFilter
from django_filters import DateFilter

# Modelos:
from .models import Usuario


class UsuarioFilter(filters.FilterSet):

    primer_nombre = CharFilter(
        name="primer_nombre",
        lookup_expr="icontains"
    )

    apellido_materno = CharFilter(
        name="apellido_materno",
        lookup_expr="icontains"
    )

    apellido_paterno = CharFilter(
        name="apellido_paterno",
        lookup_expr="icontains"
    )

    genero = CharFilter(
        name="genero",
        lookup_expr="icontains"
    )

    puesto = CharFilter(
        name="puesto",
        lookup_expr="icontains"
    )

    compania = CharFilter(
        name="compania",
        lookup_expr="icontains"
    )

    zona = CharFilter(
        name="zona",
        lookup_expr="icontains"
    )

    class Meta:
        model = Usuario
        fields = [
            'primer_nombre',
            'apellido_materno',
            'apellido_paterno',
            'genero',
            'puesto',
            'compania',
            'zona',
        ]
