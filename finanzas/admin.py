
# Django's Libraries
from django.contrib import admin

# Own's Libraries
from .models import ViaticoCabecera
from .models import ViaticoLinea


@admin.register(ViaticoCabecera)
class ViaticoCabeceraAdmin(admin.ModelAdmin):
    list_display = (
        'pk',
        'empleado_clave',
        'empleado_descripcion',
        'fecha_partida',
        'fecha_regreso',
        'un_clave',
        'un_descripcion',
        'ciudad_destino',
        'proposito_viaje',
        'empresa_descripcion',
        'empresa_rfc',
        'empresa_direccion',
        'autorizador_grupo',
        'autorizador_clave',
        'autorizador_descripcion',
        'status',
        'approved_by',
        'approved_date',
        'importe_total',
        'created_by',
        'created_date',
        'updated_by',
        'updated_date',
    )


@admin.register(ViaticoLinea)
class ViaticoLineaAdmin(admin.ModelAdmin):
    list_display = (
        'slug',
        'cabecera',
        'concepto_clave',
        'concepto_descripcion',
        'observaciones',
        'importe',
        'created_by',
        'created_date',
        'updated_by',
        'updated_date',
    )
