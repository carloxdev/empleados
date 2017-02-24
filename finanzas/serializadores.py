from rest_framework import serializers
from .models import ViaticoCabecera


class ViaticoCabeceraSerializer(serializers.HyperlinkedModelSerializer):

    created_by = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()

    class Meta:
        model = ViaticoCabecera
        fields = (
            'descripcion',
            'empleado',
            'autorizador',
            'fecha_partida',
            'empresa',
            'un',
            'ciudad_destino',
            'status',
            'vehiculo_requerido',
            'vehiculo_numero',
            'proposito',
            'created_by',
            # 'updated_by',
        )

    def get_created_by(self, obj):

        try:
            return obj.created_by.get_full_name()
        except:
            return ""

    def get_status(self, obj):

        try:
            return obj.get_status_display()
        except:
            return ""
