from rest_framework import serializers

# Modelos
from .models import Asunto
from .models import Solicitud
from ebs.models import VIEW_ORGANIZACIONES


class SolicitudSerializers(serializers.HyperlinkedModelSerializer):
    asunto = serializers.PrimaryKeyRelatedField(
        queryset=Asunto.objects.all())

    class Meta:
        model = Solicitud
        fields = (
            'pk',
            'status',
            'clave_departamento',
            'asunto',
            'descripcion',
            'numero_empleado',
            'observaciones',
            'created_by',
            'created_date',
            'updated_by',
            'updated_date',
        )


class AsuntoSerializers(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Asunto
        fields = (
            'pk',
            'nombre',
        )


class ArchivoSolicitudSerializer(serializers.HyperlinkedModelSerializer):
    archivo = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='archivo-detail'
    )
    status = serializers.SerializerMethodField()
    clave_departamento = serializers.SerializerMethodField()
    asunto = serializers.SerializerMethodField()
    created_by = serializers.SerializerMethodField()
    updated_by = serializers.SerializerMethodField()

    class Meta:
        model = Solicitud
        fields = (
            'pk',
            'numero_empleado',
            'status',
            'clave_departamento',
            'asunto',
            'descripcion',
            'observaciones',
            'archivo',
            'created_by',
            'created_date',
            'updated_by',
            'updated_date',
        )

    def get_status(self, obj):
        try:
            status = ''
            if obj.status == 'cap':
                status = 'En captura'
            elif obj.status == 'act':
                status = 'Actualizado'
            elif obj.status == 'rech':
                status = 'Rechazado'
            return status
        except Exception as e:
            print str(e)
            return " "

    def get_clave_departamento(self, obj):
        try:
            departamento = VIEW_ORGANIZACIONES.objects.using('ebs_p').get(
                clave_org=obj.clave_departamento)
            return departamento.desc_org
        except Exception as e:
            print str(e)
            return " "

    def get_asunto(self, obj):
        try:
            return obj.asunto.nombre
        except Exception as e:
            print str(e)
            return " "

    def get_created_by(self, obj):
        try:
            return obj.created_by.usuario.get_full_name()
        except Exception as e:
            print str(e)
            return " "

    def get_updated_by(self, obj):
        try:
            if obj.updated_by is None:
                return '--'
            else:
                return obj.updated_by.usuario.get_full_name()
        except Exception as e:
            print str(e)
            return " "
