
# Liberias Django
from django.conf.urls import url
from django.contrib import admin
from django.conf.urls import include

from ebs.urls_rest import router_ebs
from jde.urls_rest import router_jde
from finanzas.urls_rest import router_finanzas
from seguridad.urls_rest import router_seguridad
from sgi.urls_rest import router_sgi

# Librerias necesarias para publicar Medias en DEBUG
from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api-ebs/', include(router_ebs.urls)),
    url(r'^api-jde/', include(router_jde.urls)),
    url(r'^api-finanzas/', include(router_finanzas.urls)),
    url(r'^api-seguridad/', include(router_seguridad.urls)),
    url(r'^api-sgi/', include(router_sgi.urls)),

    url(r'^', include('django.contrib.auth.urls')),

    url(r'', include('finanzas.urls', namespace="finanzas")),
    url(r'', include('compras.urls', namespace="compras")),
    url(r'', include('home.urls', namespace="home")),
    url(r'', include('seguridad.urls', namespace="seguridad")),
    url(r'', include('sgi.urls', namespace="sgi")),
    url(r'', include('capitalHumano.urls', namespace="capitalhumano")),
]


if settings.DEBUG:

    urlpatterns = urlpatterns + \
        static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
