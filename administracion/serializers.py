from rest_framework import serializers

# Modelos
from .models import Asunto
from .models import Solicitud
from capitalhumano.models import Archivo
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
    status = serializers.SerializerMethodField()
    clave_departamento = serializers.SerializerMethodField()
    asunto = serializers.SerializerMethodField()
    descripcion = serializers.SerializerMethodField()
    numero_empleado = serializers.SerializerMethodField()
    observaciones = serializers.SerializerMethodField()
    created_by = serializers.SerializerMethodField()
    updated_by = serializers.SerializerMethodField()

    class Meta:
        model = Archivo
        fields = (
            'pk',
            'status',
            'clave_departamento',
            'asunto',
            'descripcion',
            'numero_empleado',
            'observaciones',
            'archivo',
            'object_id',
            'created_by',
            'created_date',
            'updated_by',
            'updated_date',
        )

    def get_numero_empleado(self, obj):
        try:
            return obj.content_object.numero_empleado
        except Exception as e:
            print str(e)
            return " "

    def get_observaciones(self, obj):
        try:
            if obj.content_object.observaciones == '':
                return '--'
            else:
                return obj.content_object.observaciones
        except Exception as e:
            print str(e)
            return " "

    def get_status(self, obj):
        try:
            status = ''
            if obj.content_object.status == 'cap':
                status = 'En captura'
            elif obj.content_object.status == 'act':
                status = 'Actualizado'
            elif obj.content_object.status == 'rech':
                status = 'Rechazado'
            return status
        except Exception as e:
            print str(e)
            return " "

    def get_clave_departamento(self, obj):
        try:
            departamento = VIEW_ORGANIZACIONES.objects.using('ebs_p').get(
                clave_org=obj.content_object.clave_departamento)
            return departamento.desc_org
        except Exception as e:
            print str(e)
            return " "

    def get_asunto(self, obj):
        try:
            return obj.content_object.asunto.nombre
        except Exception as e:
            print str(e)
            return " "

    def get_descripcion(self, obj):
        try:
            return obj.content_object.descripcion
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
            return obj.content_object.updated_by.usuario.get_full_name()
        except Exception as e:
            print str(e)
            return " "
