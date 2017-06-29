from django.contrib import admin

# Register your models here.
from .models import PerfilPuestoDocumento
from .models import Curso
from .models import TipoDocumento
from .models import Archivo
from .models import DocumentoPersonal
from .models import DocumentoCapacitacion


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


@admin.register(Archivo)
class ArchivoAdmin(admin.ModelAdmin):
    list_display = (
        'content_object',
        'tipo_archivo',
        'archivo',
        'created_by',
        'created_date',
        'updated_by',
        'updated_date',
    )


@admin.register(DocumentoCapacitacion)
class CapacitacionAdmin(admin.ModelAdmin):
    list_display = (
        'relacion',
        'curso',
        'proveedor',
        'numero_empleado',
        'modalidad',
        'lugar',
        'costo',
        'moneda',
        'departamento',
        'fecha_inicio',
        'fecha_fin',
        'duracion',
        'observaciones',
        'created_by',
        'created_date',
    )


@admin.register(DocumentoPersonal)
class PersonalAdmin(admin.ModelAdmin):
    list_display = (
        'relacion',
        'numero_empleado',
        'tipo_documento',
        'agrupador',
        'vigencia_inicio',
        'vigencia_fin',
        'created_by',
        'created_date',
    )
