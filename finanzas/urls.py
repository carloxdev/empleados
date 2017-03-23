from django.conf.urls import url

from .views import ViaticoNuevo
from .views import ViaticoSolicitud

urlpatterns = [
    url(r'^viatico/nuevo/$', ViaticoNuevo.as_view(), name="viatico_nuevo"),
    url(r'^viatico/solicitudes/$', ViaticoSolicitud.as_view(), name="viatico_solicitud"),

]
