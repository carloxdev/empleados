from django.conf.urls import url

# VISTAS
from .views import EmpleadoLista
from .views import EmpleadoDashboard
from .views import EmpleadoOrganigrama
from .views import EmpleadoOrganigramaAPI


urlpatterns = [
    url(
        r'^dashboard/$',
        EmpleadoDashboard.as_view(),
        name="empleado_dashboard"
    ),
    url(
        r'^organigrama/$',
        EmpleadoOrganigrama.as_view(),
        name="empleado_organigrama"
    ),
    url(
        r'^empleados/$',
        EmpleadoLista.as_view(),
        name="empleado_lista"
    ),
    url(
        r'^organigrama/json/(?P<pk>\d+)/$',
        EmpleadoOrganigramaAPI.as_view(),
        name='organigrama_json'
    ),
]
