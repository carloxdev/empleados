# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

# Register your models here.
from .models import Criterio
from .models import Requisito


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
