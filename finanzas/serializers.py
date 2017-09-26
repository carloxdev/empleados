# Librerias Python:

# API Rest:
from rest_framework import serializers

# Modelos
# from ebs.models import VIEW_EMPLEADOS_FULL
from .models import ViaticoCabecera
from .models import ViaticoLinea


class ViaticoCabeceraSerializer(serializers.HyperlinkedModelSerializer):

    status = serializers.SerializerMethodField()
    created_by = serializers.SerializerMethodField()
    approved_by = serializers.SerializerMethodField()
    updated_by = serializers.SerializerMethodField()

    class Meta:
        model = ViaticoCabecera
        fields = (
            'url',
            'pk',
            'empleado_clave',
            'empleado_descripcion',
            'fecha_partida',
            'fecha_regreso',
            'un_clave',
            'un_descripcion',
            'ciudad_destino',
            'proposito_viaje',
            'empresa_descripcion',
            'empresa_rfc',
            'empresa_direccion',
            'autorizador_grupo',
            'autorizador_clave',
            'autorizador_descripcion',
            'status',
            'importe_total',
            'approved_by',
            'approved_date',
            'created_by',
            'created_date',
            'updated_by',
            'updated_date',
        )

    def get_status(self, obj):

        try:
            return obj.get_status_display()

        except Exception as e:
            return ""

    def get_created_by(self, obj):

        try:
            if obj.created_by:
                return obj.created_by.usuario.username
            else:
                return ""
        except Exception as e:
            return ""

    def get_approved_by(self, obj):

        try:
            if obj.approved_by:
                return obj.approved_by.usuario.username
            else:
                return ""
        except Exception as e:
            return ""

    def get_updated_by(self, obj):

        try:
            if obj.updated_by:
                return obj.updated_by.usuario.username
            else:
                return ""
        except Exception as e:
            return ""


class ViaticoLineaSerializer(serializers.ModelSerializer):

    class Meta:
        model = ViaticoLinea
        fields = (
            'url',
            'pk',
            'slug',
            'cabecera',
            'concepto_clave',
            'concepto_descripcion',
            'observaciones',
            'importe',
            'created_date',
            'created_by',
            'updated_date',
            'updated_by',
        )
