from django.conf.urls import url

# VISTAS
from .views import EmpleadoLista
from .views import EmpleadoDashboard


urlpatterns = [
    url(r'^dashboard/$', EmpleadoDashboard.as_view(), name="dashboard"),
    url(r'^empleados/$', EmpleadoLista.as_view(), name="empleado_lista"),
]
