from django.contrib import admin

# Register your models here.
from .models import ViaticoCabecera
from .models import ViaticoLinea


@admin.register(ViaticoCabecera)
class ViaticoCabeceraAdmin(admin.ModelAdmin):
    list_display = (
        'empleado',
        'fecha_partida',
        'fecha_regreso',
        'unidad_negocio',
        'ciudad_destino',
        'proposito_viaje',
        'requiere_vehiculo',
        'no_vehiculo',
        'nombre_empresa',
        'rfc',
        'direccion',
        'grupo',
        'autorizador',
        'estado_solicitud',
        'fecha_autorizacion',
    )


@admin.register(ViaticoLinea)
class ViaticoLineaAdmin(admin.ModelAdmin):
    list_display = (
        'cabecera',
        'concepto',
        'observaciones',
        'importe',
    )
