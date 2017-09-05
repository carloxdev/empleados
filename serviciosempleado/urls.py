
# Django's Libraries
from django.conf.urls import url

# Own's Libraries
from .views import MiPerfil
from .views import MiOrganigrama
from .views import EmpleadoOrganigramaAPI
from .views import MiBuzon
from .views import MiNomina
from .views import MiViaticoLista

urlpatterns = [

    url(
        r'^mi/expediente/$',
        MiPerfil.as_view(),
        name="mi_perfil"
    ),
    url(
        r'^mi/organigrama/$',
        MiOrganigrama.as_view(),
        name="mi_organigrama"
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
    ),
    url(
        r'^mi/buzon/$',
        MiBuzon.as_view(),
        name="mi_buzon"
    ),
    url(
        r'^mi/nomina/$',
        MiNomina.as_view(),
        name="mi_nomina"
    ),
]
