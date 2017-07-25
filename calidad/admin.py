# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

# Register your models here.
from .models import Criterio
from .models import Requisito
from .models import Proceso
from .models import Subproceso
from .models import Responsable
from .models import Rol
from .models import CompaniaAccion
from .models import Sitio
from .models import Metodologia
from .models import Formato
from .models import Falla
from .models import Auditoria


@admin.register(Criterio)
class Criterio(admin.ModelAdmin):
    list_display = (
        'pk',
        'criterio',
        'clasificacion',
        'create_by',
        'create_date',
        'update_by',
        'update_date',
    )


@admin.register(Requisito)
class Requisito(admin.ModelAdmin):
    list_display = (
        'pk',
        'requisito',
        'criterio',
        'create_by',
        'create_date',
        'update_by',
        'update_date',
    )


@admin.register(Proceso)
class Proceso(admin.ModelAdmin):
    list_display = (
        'pk',
        'proceso',
        'create_by',
        'create_date',
        'update_by',
        'update_date',
    )


@admin.register(Subproceso)
class Subproceso(admin.ModelAdmin):
    list_display = (
        'pk',
        'subproceso',
        'proceso',
        'create_by',
        'create_date',
        'update_by',
        'update_date',
    )


@admin.register(Responsable)
class Responsable(admin.ModelAdmin):
    list_display = (
        'pk',
        'nombre_completo',
        'numero_empleado',
        'proceso',
        'create_by',
        'create_date',
        'update_by',
        'update_date',
    )


@admin.register(Rol)
class Rol(admin.ModelAdmin):
    list_display = (
        'pk',
        'nombre_completo',
        'numero_empleado',
        'rol',
        'create_by',
        'create_date',
        'update_by',
        'update_date',
    )


@admin.register(CompaniaAccion)
class CompaniaAccion(admin.ModelAdmin):
    list_display = (
        'pk',
        'compania_codigo',
        'compania',
        'personal_rol',
        'create_by',
        'create_date',
        'update_by',
        'update_date',
    )


@admin.register(Sitio)
class Sitio(admin.ModelAdmin):
    list_display = (
        'pk',
        'sitio',
        'create_by',
        'create_date',
        'update_by',
        'update_date',
    )


@admin.register(Metodologia)
class Metodologia(admin.ModelAdmin):
    list_display = (
        'pk',
        'metodologia',
        'create_by',
        'create_date',
        'update_by',
        'update_date',
    )


@admin.register(Falla)
class Falla(admin.ModelAdmin):
    list_display = (
        'pk',
        'codigo',
        'falla',
        'create_by',
        'create_date',
        'update_by',
        'update_date',
    )


@admin.register(Formato)
class Formato(admin.ModelAdmin):
    list_display = (
        'pk',
        'compania_codigo',
        'compania',
        'titulo',
        'no_revision',
        'vigencia_inicio',
        'codigo',
        'descripcion',
        'create_by',
        'create_date',
        'update_by',
        'update_date',
    )


# @admin.register(Auditoria)
# class Auditoria(admin.ModelAdmin):
#     list_display = (
#         'pk',
#         'metodologia',
#         'create_by',
#         'create_date',
#         'update_by',
#         'update_date',
#     )
