# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

# Register your models here.
from .models import Criterio
from .models import Requisito
from .models import Proceso
from .models import Subproceso
from .models import Responsable
from .models import Usuario
from .models import CompaniaAccion


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


@admin.register(Usuario)
class Usuario(admin.ModelAdmin):
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
        'usuario',
        'create_by',
        'create_date',
        'update_by',
        'update_date',
    )
