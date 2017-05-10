from django.conf.urls import url

from .views import EmpleadoLista


urlpatterns = [
    url(r'^empleados/$', EmpleadoLista.as_view(), name="empleado_lista"),
]
