from django.conf.urls import url

from .views import ViaticoLista
from .views import ViaticoCabeceraNuevo
from .views import ViaticoCabeceraEditar
from .views import ViaticoLineas

app_name = "finanzas"

urlpatterns = [
    url(r'^viaticos/$', ViaticoLista.as_view(), name="viatico_lista"),
    url(r'^viaticos/nuevo/$', ViaticoCabeceraNuevo.as_view(), name="viatico_nuevo"),
    url(r'^viaticos/(?P<pk>\d)/editar/$', ViaticoCabeceraEditar.as_view(), name="viatico_editar"),
    url(r'^viaticos/(?P<pk>\d+)/lineas/$', ViaticoLineas.as_view(), name="viatico_lineas"),
]
