from django.contrib import admin
from django.contrib.contenttypes.admin import GenericTabularInline

# Register your models here.
from .models import PerfilPuestoDocumento
from .models import Curso
from .models import TipoDocumento
from home.models import Archivo
from .models import DocumentoPersonal
from .models import DocumentoCapacitacion
from .models import PerfilPuestosCargo
from .models import PerfilCompetencias
from .models import PerfilExperencia
from .models import PerfilIndicadores
from .models import EvaluacionPlantillas


@admin.register(PerfilPuestoDocumento)
class DocumentoPerfilPuestoAdmin(admin.ModelAdmin):
    list_display = (
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

@admin.register(PerfilPuestosCargo)
class PerfilPuestosCargoAdmin(admin.ModelAdmin):
    list_display = (
        'pk',
        'id_puesto_cargo',
        'descripcion',
        'created_by',
        'created_date',
        'updated_by',
        'updated_date',
    )

@admin.register(PerfilExperencia)
class PerfilExperienciaAdmin(admin.ModelAdmin):
    list_display = (
        'pk',
        'descripcion',
        'anios',
        'created_by',
        'created_date',
        'updated_by',
        'updated_date',
    )

@admin.register(PerfilCompetencias)
class PerfilPuestosCompetenciasAdmin(admin.ModelAdmin):
    list_display = (
        'pk',
        'id_puesto',
        'tipo_competencia',
        'descripcion',
        'porcentaje',
        'created_by',
        'created_date',
        'updated_by',
        'updated_date',
    )

@admin.register(Curso)
class CursosAdmin(admin.ModelAdmin):
    list_display = (
        'nombre_curso',
        'vencimiento',
        'created_by',
        'created_date',
        'updated_by',
        'updated_date',
    )


@admin.register(TipoDocumento)
class TipoDocumentoAdmin(admin.ModelAdmin):
    list_display = (
        'tipo_documento',
        'created_by',
        'created_date',
        'updated_by',
        'updated_date',
    )

@admin.register(EvaluacionPlantillas)
class EvaluacionPlantillaAdmin(admin.ModelAdmin):
    list_display = (
        'pk',
        'descripcion',
        'vigencia',
        'created_by',
        'created_date',
        'updated_by',
        'updated_date',
    )    

@admin.register(PerfilIndicadores)
class PerfilIndicadoresAdmin(admin.ModelAdmin):
    list_display = (
        'pk',
        'plantilla',
        'cvepuesto',
        'departamento',
        'puesto',
        'linea',
        'objetivo',
        'unidad_medida',
        'descripcion_kpi',
        'porcentaje',
        'meta_minima',
        'meta_satisfactoria',
        'meta_excelente',
        'created_by',
        'created_date',
        'updated_by',
        'updated_date',
    )

class ArchivoInline(GenericTabularInline):
    model = Archivo
    ct_field_name = 'content_type'
    id_field_name = 'object_id'


class DocumentoPersonalOptions(admin.ModelAdmin):
    model = DocumentoPersonal
    inlines = (ArchivoInline,)


class DocumentoCapacitacionOptions(admin.ModelAdmin):
    model = DocumentoCapacitacion
    inlines = (ArchivoInline,)


admin.site.register(DocumentoPersonal, DocumentoPersonalOptions)
admin.site.register(DocumentoCapacitacion, DocumentoCapacitacionOptions)
