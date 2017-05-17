from django.contrib import admin

# Register your models here.
from .models import Zona
from .models import Empresa


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
