from django.contrib import admin

# Register your models here.
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
