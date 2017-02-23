from django.contrib import admin

# Register your models here.
from .models import Profile


@admin.register(Profile)
class AdminProfile(admin.ModelAdmin):
    list_display = (
        'usuario',
        'clave_empleado',
        'clave_jde',
        'foto',
    )
