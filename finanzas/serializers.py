
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
            'empleado',
            'fecha_partida',
            'fecha_regreso',
            'unidad_negocio',
            'ciudad_destino',
            'proposito_viaje',
            'requiere_vehiculo',
            'no_vehiculo',
            'nombre_empresa',
            'rfc',
            'direccion',
            'grupo',
            'autorizador',
            'estado_solicitud',
            'fecha_autorizacion',
            'fecha_creacion',
            'fecha_actualizacion',
        )


class ViaticoLineaSerializer(serializers.ModelSerializer):

    # cabecera = serializers.SerializerMethodField()

    class Meta:
        model = ViaticoLinea
        fields = (
            'url',
            'pk',
            'cabecera',
            'concepto',
            'observaciones',
            'importe',
        )

    # def get_cabecera(self, obj):

    #     try:
    #         empleado = obj.cabecera.empleado
    #         return empleado

    #     except Exception as e:
    #         return str(e)
