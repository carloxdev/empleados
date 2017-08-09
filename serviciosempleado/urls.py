from django.conf.urls import url
from django.conf import settings
from django.conf.urls.static import static

# VISTAS
from .views import EmpleadoPerfil
from .views import EmpleadoOrganigrama
from .views import EmpleadoOrganigramaAPI
from .views import ViaticoLista
from .views import ViaticoCabeceraNuevo
from .views import ViaticoCabeceraEditar
from .views import ViaticoLineas

urlpatterns = [
    # Empleados

    url(
        r'^perfil/miexpediente/$',
        EmpleadoPerfil.as_view(),
        name="empleado_perfil"
    ),
    url(
        r'^perfil/organigrama/$',
        EmpleadoOrganigrama.as_view(),
        name="empleado_organigrama"
    ),
    url(
        r'^perfil/organigrama/json-org/(?P<pk>\d+)/(?P<clave_rh>\d+)/$',
        EmpleadoOrganigramaAPI.as_view(),
        name='organigrama_json_org'
    ),
    # Viaticos

    url(r'^viaticos/$', ViaticoLista.as_view(), name="viatico_lista"),
    url(r'^viaticos/nuevo/$', ViaticoCabeceraNuevo.as_view(), name="viatico_nuevo"),
    url(r'^viaticos/(?P<pk>\d)/editar/$', ViaticoCabeceraEditar.as_view(), name="viatico_editar"),
    url(r'^viaticos/(?P<pk>\d+)/lineas/$', ViaticoLineas.as_view(), name="viatico_lineas"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
