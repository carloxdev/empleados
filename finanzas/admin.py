from django.contrib import admin

# Register your models here.
from .models import ViaticoCabecera
from .models import ViaticoLinea


@admin.register(ViaticoCabecera)
class ViaticoCabeceraAdmin(admin.ModelAdmin):
    list_display = (
        'pk',
        'empleado',
        'fecha_partida',
        'fecha_regreso',
        'unidad_negocio',
        'ciudad_destino',
        'proposito_viaje',
        'nombre_empresa',
        'rfc',
        'direccion',
        'grupo',
        'autorizador',
        'fecha_autorizacion',
        'status',
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
