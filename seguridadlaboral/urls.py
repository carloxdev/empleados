from django.conf.urls import url

from .views import IncidenciaDocumentoNuevo
from .views import IncidenciaDocumentoLista
from .views import IncidenciaDocumentoEditar
from .views import IncidenciaDocumentoArchivo
from .views import IncidenciaResolucionNuevo
from .views import IncidenciaGraficas


urlpatterns = [
    url(r'^seguridadlaboral/$', IncidenciaDocumentoLista.as_view(), name="incidencia_lista"),
    url(r'^seguridadlaboral/nuevo/$', IncidenciaDocumentoNuevo.as_view(), name="incidencia_nuevo"),
    url(r'^seguridadlaboral/(?P<pk>\d+)/editar/$', IncidenciaDocumentoEditar.as_view(), name="incidencia_editar"),
    url(
        r'^seguridadlaboral/(?P<incidencia_id>\d+)/archivos/$',
        IncidenciaDocumentoArchivo.as_view(),
        name='incidencia_archivo'
    ),
    url( 
        r'^seguridadlaboral/(?P<incidencia_id>\d+)/seguimiento/$',
        IncidenciaResolucionNuevo.as_view(),
        name='incidencia_seguimiento'
    ),
    url(
        r'^seguridadlaboral/graficas/$',
        IncidenciaGraficas.as_view(),
        name='incidencia_grafica'
    ),
]