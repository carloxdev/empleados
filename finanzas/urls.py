from django.conf.urls import url

from .views import ViaticoLista
from .views import ViaticoAutoriacion


urlpatterns = [
    url(r'^viaticos/$', ViaticoLista.as_view(), name="viatico_lista"),
    url(
        r'^viaticos/autoriza/$',
        ViaticoAutoriacion.as_view(),
        name="viatico_autoriza"
    ),
]
