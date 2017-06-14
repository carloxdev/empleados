from django.conf.urls import url

# VISTAS
from .views import EmpleadoPerfil
from .views import EmpleadoOrganigrama

urlpatterns = [

    url(r'^perfil/miexpediente/$', EmpleadoPerfil.as_view(),
        name="empleado_perfil"),
    url(r'^perfil/organigrama/$', EmpleadoOrganigrama.as_view(),
        name="empleado_organigrama"),
]
