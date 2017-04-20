from django.conf.urls import url

from .views import IncidenciaDocumentoNuevo



urlpatterns = [
    url(r'^incidencia/nuevo/$', IncidenciaDocumentoNuevo.as_view(), name="incidencia_nuevo"),
]
