from django.contrib import admin

# Register your models here.
from .models import ViaticoCabecera


@admin.register(ViaticoCabecera)
class AdminViaticoCabecera(admin.ModelAdmin):
    list_display = (
        'descripcion',
        'empleado',
        'autorizador',
        'fecha_partida',
        'empresa',
        'un',
        'ciudad_destino',
        'status',
        'vehiculo_requerido',
        'vehiculo_numero',
        'proposito',
        'created_by',
        'created_date',
        'updated_by',
        'updated_date',
    )
