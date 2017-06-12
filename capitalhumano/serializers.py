from rest_framework import serializers

from .models import PerfilPuestoDocumento

class PerfilPuestoDocumentoSerializer(serializers.HyperlinkedModelSerializer):

   
    class Meta:
        model = PerfilPuestoDocumento
        fields = (
            'pk',
	        'empleado_puesto_desc',
	        'reporta',
	        'proposito',
	        'funciones',
	        'responsabilidades',
	        'reporte',
	        'edad_minima',
	        'edad_maxima',
	        'nivel_estudio',
	        'estado_civil',
	        'genero',
	        'cambio_residencia',
	        'disponibilidad_viajar',
	        'requerimentos',
        )

    



