from django.conf.urls import url
from django.conf import settings
from django.conf.urls.static import static

# VISTAS
from .views import EmpleadoPerfil
from .views import EmpleadoOrganigrama
from .views import EmpleadoOrganigramaAPI

urlpatterns = [

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
        r'^perfil/organigrama/json-org/(?P<pk>\d+)/$',
        EmpleadoOrganigramaAPI.as_view(),
        name='organigrama_json_org'
    ),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
