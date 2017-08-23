
# Django's Libraries
from django.conf.urls import url
from django.contrib import admin
from django.conf.urls import include

# Own's Libraries
from ebs.urls_rest import router_ebs
from jde.urls_rest import router_jde
from seguridad.urls_rest import router_seguridad
from capitalhumano.urls_rest import router_capitalhumano
from administracion.urls_rest import router_administracion
from seguridadlaboral.urls_rest import router_seguridadlaboral
from calidad.urls_rest import router_calidad
from finanzas.urls_rest import router_viaticos

from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api-ebs/', include(router_ebs.urls)),
    url(r'^api-jde/', include(router_jde.urls)),
    url(r'^api-finanzas/', include(router_viaticos.urls)),
    url(r'^api-seguridad/', include(router_seguridad.urls)),
    url(r'^api-capitalhumano/', include(router_capitalhumano.urls)),
    url(r'^api-administracion/', include(router_administracion.urls)),
    url(r'^api-seguridadlaboral/', include(router_seguridadlaboral.urls)),
    url(r'^api-calidad/', include(router_calidad.urls)),

    url(r'', include('compras.urls', namespace="compras")),
    url(r'', include('home.urls', namespace="home")),
    url(r'', include('seguridad.urls', namespace="seguridad")),
    url(r'', include('capitalhumano.urls', namespace="capitalhumano")),
    url(r'', include('serviciosempleado.urls', namespace="serviciosempleado")),
    url(r'', include('seguridadlaboral.urls', namespace="seguridadlaboral")),
    url(r'', include('calidad.urls', namespace="calidad")),
    url(r'', include('finanzas.urls', namespace="finanzas")),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
