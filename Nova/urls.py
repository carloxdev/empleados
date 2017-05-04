
# Liberias Django
from django.conf.urls import url
from django.contrib import admin
from django.conf.urls import include

from .router_urls import router


# -------------- URLS -------------- #

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include(router.urls)),

    url(r'', include('finanzas.urls', namespace="finanzas")),
    url(r'', include('compras.urls', namespace="compras")),
    url(r'', include('home.urls', namespace="home")),
    url(r'', include('seguridad.urls', namespace="seguridad")),
    url(r'', include('sgi.urls', namespace="sgi")),
]
