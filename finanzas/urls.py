from django.conf.urls import url

from .views import ViaticoLista
from .views import ViaticoAutoriacion
from .views import ViaticoNuevo
from .views import ViaticoEditar
from .views import ViaticoEliminar
from .views import ViaticoAPI

urlpatterns = [
    url(r'^viaticos/$', ViaticoLista.as_view(), name="viatico_lista"),
    url(r'^viaticos/nuevo/$', ViaticoNuevo.as_view(), name="viatico_nuevo"),
    url(
        r'^viaticos/editar/(?P<clave>.*)/$',
        ViaticoEditar.as_view(),
        name='viatico_editar'
    ),
    url(
        r'^viaticos/eliminar/(?P<pk>\d+)$',
        ViaticoEliminar.as_view(),
        name='viatico_eliminar'
    ),
    url(
        r'^viaticos/autoriza/$',
        ViaticoAutoriacion.as_view(),
        name="viatico_autoriza"
    ),
    url(
        r'^viaticos/api/$',
        ViaticoAPI.as_view(),
        name="viatico_api"
    ),
]
