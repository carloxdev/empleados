from django.contrib import admin

# Register your models here.
from .models import PerfilPuestoDocumento
from .models import CatalogoCursos


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


@admin.register(CatalogoCursos)
class CursosAdmin(admin.ModelAdmin):
    list_display = (
        'descripcion',
        'vencimiento',
        'created_by',
        'created_date',
        'updated_date',
    )  
 


