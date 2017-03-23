from django.conf.urls import url

from .views import ViaticoNuevo
from .views import ViaticoLineaLista

urlpatterns = [
    url(r'^viatico/nuevo/$', ViaticoNuevo.as_view(), name="viatico_nuevo"),
    url(r'^viatico/solicitudes/$', ViaticoLineaLista.as_view(), name="viatico_solicitudes"),
]
