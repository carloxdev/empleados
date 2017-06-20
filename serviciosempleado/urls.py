from django.conf.urls import url

# VISTAS
from .views import EmpleadoPerfil
from .views import EmpleadoOrganigrama
from .views import EmpleadoOrganigramaAPI

urlpatterns = [

    url(
        r'^perfil/miexpediente/$',
        EmpleadoPerfil.as_view(),
        name="empleado_perfil"
    ),
    url(
        r'^perfil/organigrama/$',
        EmpleadoOrganigrama.as_view(),
        name="empleado_organigrama"
    ),
    url(
        r'^perfil/organigrama/json-org/(?P<pk>\d+)/$',
        EmpleadoOrganigramaAPI.as_view(),
        name='organigrama_json_org'
    ),
]
