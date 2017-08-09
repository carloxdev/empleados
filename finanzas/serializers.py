# Librerias Python:

# API Rest:
from rest_framework import serializers

# Modelos
# from ebs.models import VIEW_EMPLEADOS_FULL
from .models import ViaticoCabecera
from .models import ViaticoLinea


class ViaticoCabeceraSerializer(serializers.HyperlinkedModelSerializer):

    status = serializers.SerializerMethodField()
    empresa = serializers.SerializerMethodField()
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
            'unidad_negocio_clave',
            'unidad_negocio_descripcion',
            'ciudad_destino',
            'proposito_viaje',
            'empresa',
            'rfc',
            'direccion',
            'grupo',
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
            print str(e)
            return ""

    def get_empresa(self, obj):

        try:
            return obj.empresa.clave

        except Exception as e:
            print str(e)
            return ""

    def get_created_by(self, obj):

        try:
            return obj.created_by.usuario.username
        except Exception as e:
            print str(e)
            return ""

    def get_approved_by(self, obj):

        try:
            return obj.approved_by.usuario.username
        except Exception as e:
            print str(e)

    def get_updated_by(self, obj):

        try:
            return obj.updated_by.usuario.username
        except Exception as e:
            print str(e)
            return ""


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
