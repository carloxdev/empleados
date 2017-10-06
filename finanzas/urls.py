# Django's Libraries
from django.conf.urls import url

# Own's Libraries
from .views import ViaticoLista
from .views import ViaticoCabeceraNuevo
from .views import ViaticoCabeceraEditar
from .views import ViaticoCabeceraCancelar

from .views import AnticipoLista
from .views import Flujo

urlpatterns = [

    # Anticipos
    url(r'^anticipos/$', AnticipoLista.as_view(), name="anticipo_lista"),

    # Viaticos
    url(r'^viaticos/$', ViaticoLista.as_view(), name="viatico_lista"),
    url(r'^viaticos/nuevo/$', ViaticoCabeceraNuevo.as_view(), name="viatico_nuevo"),
    url(r'^viaticos/(?P<_pk>\d+)/editar/$', ViaticoCabeceraEditar.as_view(), name="viatico_editar"),
    url(r'^viaticos/(?P<_pk>\d+)/cancelar/$', ViaticoCabeceraCancelar.as_view(), name="viatico_cancelar"),

    # Flujo
    url(r'^reportes/flujo/$', Flujo.as_view(), name="flujo"),
]
