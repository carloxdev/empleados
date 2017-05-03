from django.conf.urls import url

from .views import IncidenciaDocumentoNuevo
from .views import IncidenciaDocumentoLista
from .views import IncidenciaDocumentoEditar
from .views import IncidenciaDocumentoArchivo


urlpatterns = [
    url(r'^incidencias/$', IncidenciaDocumentoLista.as_view(), name="incidencia_lista"),
    url(r'^incidencias/nuevo/$', IncidenciaDocumentoNuevo.as_view(), name="incidencia_nuevo"),
    url(r'^incidencias/editar/(?P<pk>\d+)/$', IncidenciaDocumentoEditar.as_view(), name="incidencia_editar"),
    url(
        r'^incidencias/anexos/(?P<pk>\d+)/$',
        IncidenciaDocumentoArchivo.as_view(),
        name='incidencia_archivo'
    ),
]
