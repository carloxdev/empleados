

from rest_framework import serializers

from .models import IncidenciaDocumento
from .models import IncidenciaTipo


class IncidenciaDocumentoSerializer(serializers.HyperlinkedModelSerializer):

    tipo = serializers.SerializerMethodField()

    class Meta:
        model = IncidenciaDocumento
        fields = (
            'tipo',
            # 'registrable',
            # 'fecha',
            # 'empleado_id',
            # 'empleado_nombre',
            # 'empleado_zona',
            # 'empleado_proyecto',
            # 'empleado_proyecto_desc',
            # 'empleado_puesto',
            # 'empleado_puesto_desc',
            # 'empleado_un',
            # 'empleado_organizacion',
            # 'area_id',
            # 'area_descripcion',
            # 'lugar',
            # 'dias_incapcidad',
            # 'centro_atencion',
            # 'acr',
            # 'status',
            # 'created_by',
            # 'created_date',
            # 'updated_by',
            # 'updated_date',
        )

    def get_tipo(self, obj):

        return obj.tipo.descripcion


class IncidenciaTipoSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = IncidenciaTipo
        fields = (
            'descripcion',
        )
