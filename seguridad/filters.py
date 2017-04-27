# Django API REST
from rest_framework import filters
from django_filters import CharFilter
from django_filters import DateFilter

# Modelos:
from .models import Profile


class ProfileFilter(filters.FilterSet):

    usuario__username = CharFilter(
        name="usuario__username",
        lookup_expr="icontains"
    )

    usuario__first_name = CharFilter(
        name="usuario__first_name",
        lookup_expr="icontains"
    )

    usuario__last_name = CharFilter(
        name="usuario__last_name",
        lookup_expr="icontains"
    )

    usuario__email = CharFilter(
        name="usuario__email",
        lookup_expr="icontains"
    )
    usuario__date_joined_mayorque = CharFilter(
        name='usuario__date_joined_mayorque',
        method="filter_date_joined_mayorque"
    )

    usuario__date_joined_menorque = CharFilter(
        name='usuario__date_joined_menorque',
        method="filter_date_joined_menorque"
    )

    class Meta:
        model = Profile
        fields = [
            'usuario__username',
            'usuario__first_name',
            'usuario__last_name',
            'usuario__email',
            'clave_rh',
            'usuario__date_joined_mayorque',
            'usuario__date_joined_menorque',
        ]


    def filter_date_joined_mayorque(self, queryset, name, value):

        valor = "{}T00:00:00".format(value)

        if not value:
            return queryset
        else:
            consulta = queryset.filter(usuario__date_joined__gte=valor)
            return consulta

    def filter_date_joined_menorque(self, queryset, name, value):

        valor = "{}T23:59:59".format(value)

        if not value:
            return queryset
        else:
            consulta = queryset.filter(usuario__date_joined__lte=valor)
            return consulta
