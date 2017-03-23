from django.conf.urls import url

from .views import ViaticoLista
from .views import ViaticoNuevo


urlpatterns = [
    url(r'^viaticos$', ViaticoLista.as_view(), name="viatico_lista"),
    url(r'^viaticos/nuevo/$', ViaticoNuevo.as_view(), name="viatico_nuevo"),
]
