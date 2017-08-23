from django.conf.urls import url

from .views import ViaticoLista
from .views import ViaticoCabeceraNuevo
from .views import ViaticoCabeceraEditar
from .views import ViaticoLineas

# VISTAS
from .views import AnticipoLista

urlpatterns = [

    # Anticipos
    url(r'^anticipos/$', AnticipoLista.as_view(), name="anticipo_lista"),

    # Viaticos
    url(r'^viaticos/$', ViaticoLista.as_view(), name="viatico_lista"),
    url(r'^viaticos/nuevo/$', ViaticoCabeceraNuevo.as_view(), name="viatico_nuevo"),
    url(r'^viaticos/(?P<pk>\d+)/editar/$', ViaticoCabeceraEditar.as_view(), name="viatico_editar"),
    url(r'^viaticos/(?P<pk>\d+)/lineas/$', ViaticoLineas.as_view(), name="viatico_lineas"),
]
