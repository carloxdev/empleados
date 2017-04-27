# -*- coding: utf-8 -*-

# Django API REST
from rest_framework import filters
from django_filters import CharFilter


# Modelos:
from .models import VIEW_EMPLEADOS_SIMPLE

class VIEW_EMPLEADOS_SIMPLE_Filter(filters.FilterSet):

    pers_empleado_numero = CharFilter(
        name="pers_empleado_numero",
        lookup_expr="icontains"
    )

    class Meta:
    	model = VIEW_EMPLEADOS_SIMPLE
    	fields = [
            'pers_clave', 
		    'pers_tipo_codigo', 
		    'pers_tipo_desc', 
		    'pers_empleado_numero', 
		    'pers_titulo', 
		    'pers_primer_nombre', 
		    'pers_segundo_nombre', 
		    'pers_apellido_paterno', 
		    'pers_apellido_materno', 
		    'pers_nombre_completo', 
		    'pers_genero_clave', 
		    'pers_genero_desc', 
		    'pers_curp', 
		    'pers_nacionalidad_clave', 
		    'pers_rfc', 
		    'pers_numero_imss', 
		    'pers_ife', 
		    'pers_fecha_nacimiento', 
		    'pers_ciudad_nacimiento', 
		    'pers_estado_nacimiento', 
		    'pers_pais_nacimiento_clave', 
		    'pers_fecha_efective_desde', 
		    'pers_fecha_efective_hasta', 
		    'pers_email', 
		    'pers_estado_civil', 
		    'pers_estado_civil_desc', 
		    'pers_fecha_contratacion',  
    	]

