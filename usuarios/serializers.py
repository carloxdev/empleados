
# API Rest:
from rest_framework import serializers

# Modelos:
from .models import Usuario


class UsuarioSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Usuario
        fields = (
            'url',
            'pk',
            'primer_nombre',
            'segundo_nombre',
            'apellido_paterno',
            'apellido_materno',
            'genero',
            'numero',
            'tipo',
            'puesto',
            'organizacion',
            'fecha_inicio_contratacion',
            'fecha_fin_contratacion',
            'compania',
            'zona',
            'centro_costos',
            'nomina'
        )