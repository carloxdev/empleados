from django.contrib import admin

# Register your models here.
from .models import PerfilPuestoDocumento


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

    
