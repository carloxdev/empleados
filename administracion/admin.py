from django.contrib import admin
from django.contrib.contenttypes.admin import GenericTabularInline

# Register your models here.
from capitalhumano.models import Archivo
from .models import Asunto
from .models import Solicitud
from .models import Zona
from .models import Empresa
from .models import Contrato
from .models import Cliente


@admin.register(Zona)
class ZonaAdmin(admin.ModelAdmin):
    list_display = (
        'pk',
        'descripcion',
        'created_by',
        'created_date',
        'updated_by',
        'updated_date',
    )


@admin.register(Empresa)
class EmpresaAdmin(admin.ModelAdmin):
    list_display = (
        'pk',
        'clave',
        'descripcion',
        'created_by',
        'created_date',
        'updated_by',
        'updated_date',
    )


@admin.register(Cliente)
class ClienteAdmin(admin.ModelAdmin):
    list_display = (
        'pk',
        'clave',
        'nombre',
        'created_by',
        'created_date',
        'updated_by',
        'updated_date',
    )


@admin.register(Contrato)
class ContratoAdmin(admin.ModelAdmin):
    list_display = (
        'pk',
        'con_clave',
        'con_numero',
        'con_nombre',
        'con_descripcion',
        'con_cliente',
        'con_inicio',
        'con_termino',
        'con_ampliacion',
        'con_comentarios',
        'con_zona',
        'con_coordinador',
        'con_supervisor',
        'con_estado',
        'created_by',
        'created_date',
        'updated_by',
        'updated_date',
    )

@admin.register(Asunto)
class AsuntoAdmin(admin.ModelAdmin):
    list_display = (
        'pk',
        'nombre',
    )

class ArchivoInline(GenericTabularInline):
    model = Archivo
    ct_field_name = 'content_type'
    id_field_name = 'object_id'


class SolicitudOptions(admin.ModelAdmin):
    model = Solicitud
    inlines = (ArchivoInline,)

admin.site.register(Solicitud, SolicitudOptions)
