
# API Rest:
from rest_framework import serializers

# Modelos:
from .models import ViaticoCabecera
from .models import ViaticoLinea


class ViaticoCabeceraSerializer(serializers.HyperlinkedModelSerializer):

    status = serializers.SerializerMethodField()

    class Meta:
        model = ViaticoCabecera
        fields = (
            'url',
            'pk',
            'empleado_clave',
            'empleado_descripcion',
            'fecha_partida',
            'fecha_regreso',
            'unidad_negocio',
            'ciudad_destino',
            'proposito_viaje',
            'empresa_clave',
            'empresa_descripcion',
            'rfc',
            'direccion',
            'grupo',
            'autorizador',
            'status',
            'fecha_autorizacion',
            'created_date',
            'created_by',
            'updated_date',
            'updated_by',
            'importe_total'
        )

    def get_status(self, obj):

        try:
            return obj.get_status_display()

        except Exception as e:
            return str(e)


class ViaticoLineaSerializer(serializers.ModelSerializer):

    class Meta:
        model = ViaticoLinea
        fields = (
            'url',
            'pk',
            'cabecera',
            'concepto',
            'observaciones',
            'importe',
            'created_date',
            'created_by',
            'updated_date',
            'updated_by',
        )
