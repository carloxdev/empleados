
from django.conf.urls import url
from django.contrib import admin
from django.conf.urls import include

from rest_framework import routers
from finanzas.views import ViaticoAPI2
from seguridad.views import UsuariosAPI

router = routers.DefaultRouter()
router.register(
    r'viaticos', ViaticoAPI2
)
router.register(
    r'usuarios', UsuariosAPI
)


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'', include('finanzas.urls', namespace="finanzas")),
    url(r'', include('home.urls', namespace="home")),
    url(r'', include('seguridad.urls', namespace="seguridad")),

    url(r'^api/', include(router.urls)),
]
