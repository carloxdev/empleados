from django.conf.urls import url

from .views import ViaticoNuevo
from .views import ViaticoLinea
from django.shortcuts import redirect

urlpatterns = [
    url(r'^viatico/nuevo/$', ViaticoNuevo.as_view(), name="viatico_nuevo"),
    url(r'^viatico/solicitudes/$', ViaticoLinea.as_view(), name="viatico_solicitudes"),
    
]
