from django.conf.urls import url

from .views import SeguimientoComprasLista


urlpatterns = [
    url(r'^seguimiento_compras/$', SeguimientoComprasLista.as_view(), name="seguimiento_compras_lista"),
    # url(r'^seguimiento_compras/excel/$', export_compras_csv, name="export_compras_csv"),
]
