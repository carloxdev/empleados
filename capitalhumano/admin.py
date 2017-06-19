from django.contrib import admin

# Register your models here.
from .models import PerfilPuestoDocumento
from .models import Cursos
from .models import ExpedienteDocumento
from .models import TipoDocumentoPersonal


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


@admin.register(Cursos)
class CursosAdmin(admin.ModelAdmin):
    list_display = (
        'descripcion',
        'vencimiento',
        'created_by',
        'created_date',
        'updated_date',
    )  
 


@admin.register(ExpedienteDocumento)
class ExpedienteDocumentoAdmin(admin.ModelAdmin):
    list_display = (
        'pk',
        'doc_nombre',
        'doc_idempleado',
        'doc_tipo',
        'doc_subtipo',
        'doc_agrupador',
        'doc_ruta',
        'doc_mes',
        'doc_anio',
        'doc_descripcion',
        'doc_created_by',
        'doc_created_date',
        'doc_id_curso',
        'doc_id_capacitacion',
        'doc_fecha_ini_vig',
        'doc_fecha_fin_vig',
        'doc_updated_by',
        'doc_updated_date',
    )


@admin.register(TipoDocumentoPersonal)
class TipoDocumentoPersonalAdmin(admin.ModelAdmin):
    list_display = (
        'descripcion',
        'created_by',
        'created_date',
        'updated_by',
        'updated_date',
    )