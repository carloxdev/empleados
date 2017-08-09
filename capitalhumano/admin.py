from django.contrib import admin
from django.contrib.contenttypes.admin import GenericTabularInline

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
