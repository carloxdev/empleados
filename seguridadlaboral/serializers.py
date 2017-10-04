

from rest_framework import serializers

from .models import IncidenciaDocumento
from .models import IncidenciaTipo
from .models import CentroAtencion
from .models import IncidenciaArchivo
from .models import IncidenciaResolucion
from .models import EmpleadosZona
from .models import VIEW_INCIDENCIAS_ZONA
from jde.models import VIEW_CENTROSCOSTO


class IncidenciaDocumentoSerializer(serializers.HyperlinkedModelSerializer):

    tipo = serializers.SerializerMethodField()
    centro_atencion = serializers.SerializerMethodField()
    zona = serializers.SerializerMethodField()
    empleado_organizacion = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()
    es_registrable = serializers.SerializerMethodField()
    tiene_acr = serializers.SerializerMethodField()

    class Meta:
        model = IncidenciaDocumento
        fields = (
            'pk',
            'tipo',
            'es_registrable',
            'fecha',
            'empleado_id',
            'empleado_nombre',
            'zona',
            # 'empleado_zona',
            'empleado_proyecto',
            'empleado_proyecto_desc',
            'empleado_puesto',
            'empleado_puesto_desc',
            'empleado_un',
            'empleado_organizacion',
            'area_id',
            'area_descripcion',
            'lugar',
            'dias_incapcidad',
            'centro_atencion',
            'tiene_acr',
            'status',
            'created_by',
            'created_date',
            'updated_by',
            'updated_date',
        )

    def get_tiene_acr(self, obj):
        try:
            if obj.tiene_acr == 0:
               tiene_acr = 'NO'
            elif obj.tiene_acr == 1:
                tiene_acr = 'SI'
            return tiene_acr
        except Exception as e:
            print str(e)
            return " "


    def get_es_registrable(self, obj):
        try:
            if obj.es_registrable == 1:
               es_registrable = 'REGISTRABLE'
            elif obj.es_registrable == 0:
                es_registrable = 'NO REGISTRABLE'
            return es_registrable
        except Exception as e:
            print str(e)
            return " " 

    def get_status(self, obj):
        try:
            status = ''
            if obj.status == 'abi':
                status = 'ABIERTO'
            elif obj.status == 'cer':
                status = 'CERRADO'
            elif obj.status == 'pro':
                status = 'PROCESO'
            elif obj.status == 'can':
                status = 'CANCELADO'
            return status
        except Exception as e:
            print str(e)
            return " "              

    def get_empleado_organizacion(self, obj):
        try:
            empleado_organizacion = VIEW_CENTROSCOSTO.objects.using(
                'jde_p').get(clave=obj.empleado_un)
            return empleado_organizacion.descripcion
        except Exception as e:
            print str(e)
            return " "    

    def get_zona(self, obj):

        return obj.zona.descripcion

        # try:
        #     if obj.zona.descripcion == 'VILLAHERMOSA':
        #        zona == 1
        #     elif obj.zona.descripcion == 'POZA RICA':
        #          zona == 2
        #     elif obj.zona.descripcion == 'REYNOSA':
        #         zona == 3
        #     elif obj.zona.descripcion == 'VERACRUZ':
        #         zona == 4
        #     elif obj.zona.descripcion == 'NARANJOS':
        #         zona == 5
        #     elif obj.zona.descripcion == 'CD.CARMEN':
        #         zona == 6               
        #     return obj.zona.id
        # except Exception as e:
        #     print str(e)
        #     return " " 

    def get_tipo(self, obj):

        return obj.tipo.descripcion

    def get_centro_atencion(self, obj):

        try:
            return obj.centro_atencion.descripcion

        except Exception as e:
            print str(e)
            return " "

    

class IncidenciaTipoSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = IncidenciaTipo
        fields = (
            'descripcion',
        )


class CentroAtencionSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = CentroAtencion
        fields = (
            'descripcion',
        )

class IncidenciaArchivoSerializer(serializers.HyperlinkedModelSerializer):

    #tipo = serializers.SerializerMethodField()
    id = serializers.SerializerMethodField()

    class Meta:
        model = IncidenciaArchivo
        fields = (
            'url',
            'id',
            'incidencia',
            'tipo',
            'archivo',
            'created_by',
            'created_date',
            'updated_by',
            'updated_date',
        )

    def get_id(self, obj):
        try:
            return obj.id.tag
        except:
            return ""    

    # def get_tipo(self, obj):

    #     return obj.tipo.tipo   

class IncidenciaResolucionSerializer(serializers.HyperlinkedModelSerializer):

    tipo = serializers.SerializerMethodField()
    

    class Meta:
        model = IncidenciaResolucion
        fields = (
            'incidencia',
            'mensaje',
            'tipo',
            'created_by',
            'created_date',
            'updated_by',
            'updated_date',
        )

    def get_tipo(self, obj):

        return obj.tipo.descripcion


class EmpleadosZonaSerializer(serializers.HyperlinkedModelSerializer):

    zona = serializers.SerializerMethodField()

    class Meta:
        model = EmpleadosZona
        fields = (
            'totalempleado',
            'incidencias_registrables',
            'zona',
            'anio',
            'created_by',
            'created_date',
            'updated_by',
            'updated_date',
        )

    def get_zona(self, obj):

        return obj.zona.descripcion


class VIEW_INCIDENCIAS_ZONASerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = VIEW_INCIDENCIAS_ZONA
        fields = (
            'id',
            'trir',
            'total_incidencias',
            'descripcion',
            'anio',
            'totalempleado',
        )       



    