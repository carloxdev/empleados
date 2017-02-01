from django.conf.urls import url

from .views import ViaticoLista


urlpatterns = [
    url(r'^viaticos/$', ViaticoLista.as_view(), name="viatico_lista"),
]
