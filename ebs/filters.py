# -*- coding: utf-8 -*-

# Django API REST
from rest_framework import filters
from django_filters import CharFilter
from django_filters import NumberFilter


# Modelos:
from .models import VIEW_EMPLEADOS_SIMPLE
from .models import VIEW_EMPLEADOS_FULL
from .models import VIEW_EMPLEADOS_GRADO


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


class VIEW_EMPLEADOS_FULL_Filter(filters.FilterSet):

    pers_empleado_numero = CharFilter(
        name="pers_empleado_numero",
        lookup_expr="icontains"
    )
    pers_primer_nombre = CharFilter(
        name="pers_primer_nombre",
        lookup_expr="icontains"
    )
    pers_segundo_nombre = CharFilter(
        name="pers_segundo_nombre",
        lookup_expr="icontains"
    )
    pers_apellido_paterno = CharFilter(
        name="pers_apellido_paterno",
        lookup_expr="icontains"
    )
    pers_apellido_materno = CharFilter(
        name="pers_apellido_materno",
        lookup_expr="icontains"
    )
    pers_genero_clave = CharFilter(
        name="pers_genero_clave",
        lookup_expr="exact"
    )
    pers_tipo_codigo = NumberFilter(
        name="pers_tipo_codigo",
        lookup_expr="icontains"
    )
    asig_puesto_clave = NumberFilter(
        name="asig_puesto_clave",
        lookup_expr="icontains"
    )
    asig_organizacion_clave = NumberFilter(
        name="asig_organizacion_clave",
        lookup_expr="icontains"
    )
    pers_fecha_contratacion_desde = CharFilter(
        name="pers_fecha_contratacion",
        lookup_expr="gte"
    )
    pers_fecha_contratacion_hasta = CharFilter(
        name="pers_fecha_contratacion",
        lookup_expr="lte"
    )
    grup_compania_jde = CharFilter(
        name="grup_compania_jde",
        lookup_expr="contains"
    )
    # zona = CharFilter(
    #     name="zona",
    #     lookup_expr="icontains"
    # )
    grup_fase_jde = CharFilter(
        name="grup_fase_jde",
        lookup_expr="exact"
    )
    grup_nomina_jde = CharFilter(
        name="grup_nomina_jde",
        lookup_expr="exact"
    )

    class Meta:
        model = VIEW_EMPLEADOS_FULL
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
        ]


class VIEW_EMPLEADOS_GRADO_Filter(filters.FilterSet):

    pers_empleado_numero = CharFilter(
        name="pers_empleado_numero",
        lookup_expr="icontains"
    )

    class Meta:
        model = VIEW_EMPLEADOS_GRADO
        fields = [
            'pers_clave',
            'pers_empleado_numero',
            'pers_nombre_completo',
            'asig_puesto_desc',
            'qua_grado_academico',
            'qua_ultimo_estudio',
            'qua_especialidad',
            'qua_version_num',
        ]