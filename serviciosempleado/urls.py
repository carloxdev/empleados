
# Django's Libraries
from django.conf.urls import url
from django.conf import settings
from django.conf.urls.static import static

# Own's Libraries
from .views import EmpleadoPerfil
from .views import EmpleadoOrganigrama
from .views import EmpleadoOrganigramaAPI

from .views import MiViaticoLista

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
        r'^perfil/organigrama/json-org/(?P<pk>\d+)/(?P<clave_rh>\d+)/$',
        EmpleadoOrganigramaAPI.as_view(),
        name='organigrama_json_org'
    ),
    url(
        r'^mi/viaticos/$',
        MiViaticoLista.as_view(),
        name="mi_viatico_lista"
    )
]
