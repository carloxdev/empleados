
# API Rest:
from rest_framework import serializers

# Modelos:
from .models import ViaticoCabecera
from .models import ViaticoLinea


class ViaticoCabeceraSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = ViaticoCabecera
        fields = (
            'url',
            'pk',
            'empleado'
        )


class ViaticoLineaSerializer(serializers.HyperlinkedModelSerializer):

    cabecera = serializers.SerializerMethodField()

    class Meta:
        model = ViaticoLinea
        fields = (
            'url',
            'cabecera',
            'concepto',
            'observaciones',
            'importe',
        )

    def get_cabecera(self, obj):

        try:
            empleado = obj.empleado
            return empleado

        except Exception as e:
            return str(e)
