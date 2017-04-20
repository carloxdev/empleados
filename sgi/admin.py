from django.contrib import admin

# Register your models here.
from .models import CentroAtencion
from .models import IncidenciaTipo
from .models import IncidenciaDocumento
from .models import IncidenciaArchivo
from .models import ResolucionTipo
from .models import IncidenciaResolucion
from .models import ResolucionArchivo


@admin.register(CentroAtencion)
class CentroAtencionAdmin(admin.ModelAdmin):
    list_display = (
        'pk',
        'descripcion',
        'created_by',
        'created_date',
        'updated_by',
        'updated_date',
    )


@admin.register(IncidenciaTipo)
class IncidenciaTipoAdmin(admin.ModelAdmin):
    list_display = (
        'pk',
        'descripcion',
        'created_by',
        'created_date',
        'updated_by',
        'updated_date',
    )


@admin.register(IncidenciaDocumento)
class IncidenciaDocumentoAdmin(admin.ModelAdmin):
    list_display = (
        'pk',
        'tipo',
        'registrable',
        'empleado_id',
        'empleado_nombre',
        'empleado_zona',
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
        'acr',
        'status',
        'created_by',
        'created_date',
        'updated_by',
        'updated_date',
    )


@admin.register(IncidenciaArchivo)
class IncidenciaArchivoAdmin(admin.ModelAdmin):
    list_display = (
        'pk',
        'incidencia',
        'tipo',
        'archivo',
        'created_by',
        'created_date',
        'updated_by',
        'updated_date',
    )


@admin.register(ResolucionTipo)
class ResolucionTipoAdmin(admin.ModelAdmin):
    list_display = (
        'pk',
        'descripcion',
        'created_by',
        'created_date',
        'updated_by',
        'updated_date',
    )


@admin.register(IncidenciaResolucion)
class IncidenciaResolucionAdmin(admin.ModelAdmin):
    list_display = (
        'pk',
        'incidencia',
        'mensaje',
        'tipo',
        'created_by',
        'created_date',
        'updated_by',
        'updated_date',
    )


@admin.register(ResolucionArchivo)
class ResolucionArchivoAdmin(admin.ModelAdmin):
    list_display = (
        'resolucion',
        'archivo',
        'created_by',
        'created_date',
        'updated_by',
        'updated_date',
    )
