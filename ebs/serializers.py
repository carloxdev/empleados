# -*- coding: utf-8 -*-


# Librerias API REST:
from rest_framework import serializers

# Modelos:
from models import VIEW_EMPLEADOS_SIMPLE
from models import VIEW_EMPLEADOS_FULL
from models import VIEW_EMPLEADOS_GRADO
from models import VIEW_ORGANIZACIONES
from models import VIEW_ORGANIGRAMA
from models import VIEW_ESPECIALIDADES
from models import VIEW_COMPETENCIAS


class VIEW_EMPLEADOS_SIMPLE_Serializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = VIEW_EMPLEADOS_SIMPLE
        fields = (
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
        )


class VIEW_EMPLEADOS_FULL_Serializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = VIEW_EMPLEADOS_FULL
        fields = (
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
            'asig_clave',
            'asig_empleado_numero',
            'asig_persona_clave',
            'asig_fecha_inicio',
            'asig_fecha_fin',
            'asig_organizacion_clave',
            'asig_organizacion_desc',
            'asig_trabajo_clave',
            'asig_trabajo_desc',
            'asig_grado_clave',
            'asig_grado_desc',
            'asig_ubicacion_clave',
            'asig_ubicacion_desc',
            'asig_grupo_clave',
            'asig_grupo_desc',
            'asig_puesto_clave',
            'asig_puesto_desc',
            'asig_nomina_clave',
            'asig_nomina_desc',
            'asig_estado_clave',
            'asig_estado_desc',
            'asig_categoria_codigo',
            'asig_salario_base_clave',
            'asig_salario_base_desc',
            'informacion_estatutaria_clave',
            'informacion_estatutaria_desc',
            'asig_version',
            'asig_jefe_directo_clave',
            'asig_jefe_directo_desc',
            'asig_salario_in',
            'asig_salario_out',
            'asig_tipo_empleado',
            'grup_clave',
            'grup_nombre',
            'grup_bandera_habilitado',
            'grup_nomina_jde',
            'grup_compania_jde',
            'grup_proyecto_jde',
            'grup_proyecto_code_jde',
            'grup_fase_jde',
            'grup_fase_code_jde',
            'grup_puesto_jde',
            'grup_puesto_code_jde',
            'metodo_asignacion_id',
            'metodo_nombre',
            'metodo_tipo',
            'metodo_prioridad',
            'metodo_fecha_efec_desde',
            'metodo_fecha_efec_hasta',
            'metodo_importe_saldo',
            'metodo_porcentaje',
            'metodo_pago',
            'metodo_sucursal',
            'metodo_cuenta',
            'metodo_banco',
            'metodo_tipo_cuenta_id',
            'metodo_clabe',
        )


class VIEW_ORGANIZACIONES_Serializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = VIEW_ORGANIZACIONES
        fields = (
            'clave_org',
            'desc_org'
        )


class VIEW_EMPLEADOS_GRADO_Serializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = VIEW_EMPLEADOS_GRADO
        fields = (
            'pers_clave',
            'pers_empleado_numero',
            'pers_nombre_completo',
            'asig_organizacion_id',
            'asig_organizacion_desc',
            'asig_puesto_desc',
            'qua_grado_academico',
            'qua_ultimo_estudio',
            'qua_especialidad',
            'qua_version_num',
        )


class VIEW_ORGANIGRAMA_Serializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = VIEW_ORGANIGRAMA
        fields = (
            'pers_empleado_numero',
            'pers_nombre_completo',
            'asig_trabajo_desc',
            'pers_clave',
            'asig_organizacion_desc',
            'asig_organizacion_clave',
            'asig_puesto_desc',
            'grup_compania_jde',
            'grup_proyecto_jde',
            'asig_jefe_directo_clave',
            'jefe_nombre_completo',
            'nivel_estructura',
            'ruta',
            'ruta2',
            'grup_fase_jde',
            'asig_ubicacion_desc',
            'tipo',
        )


class VIEW_ESPECIALIDADES_Serializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = VIEW_ESPECIALIDADES
        fields = (
            'qua_especialidad',
        )


class VIEW_COMPETENCIAS_Serializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = VIEW_COMPETENCIAS
        fields = (
            'competence_id',
            'descripcion',
        )
