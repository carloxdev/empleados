from django.contrib import admin

# Register your models here.
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
        'unidad_negocio_clave',
        'unidad_negocio_descripcion',
        'ciudad_destino',
        'proposito_viaje',
        'empresa',
        'rfc',
        'direccion',
        'grupo',
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
        'cabecera',
        'pk',
        'concepto',
        'observaciones',
        'importe',
        'created_by',
        'created_date',
        'updated_by',
        'updated_date',
    )
