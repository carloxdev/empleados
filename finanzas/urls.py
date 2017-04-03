from django.conf.urls import url

from .views import ViaticoLista
from .views import ViaticoNuevo
from .views import ViaticoEditar


urlpatterns = [
    url(r'^viaticos$', ViaticoLista.as_view(), name="viatico_lista"),
    url(r'^viaticos/nuevo/$', ViaticoNuevo.as_view(), name="viatico_nuevo"),
    url(r'^viaticos/editar/(?P<pk>\d+)/$', ViaticoEditar.as_view(), name="viatico_editar"),
]
