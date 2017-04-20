from django.conf.urls import url

from .views import IncidenciaDocumentoNuevo
from .views import IncidenciaDocumentoLista


urlpatterns = [
    url(r'^incidencias/$', IncidenciaDocumentoLista.as_view(), name="incidencia_lista"),
    url(r'^incidencias/nuevo/$', IncidenciaDocumentoNuevo.as_view(), name="incidencia_nuevo"),
]
