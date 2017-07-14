
# Django's Libraries
from django.conf.urls import url
from django.contrib import admin
from django.conf.urls import include

# Own's Libraries
from ebs.urls_rest import router_ebs
from jde.urls_rest import router_jde
from serviciosempleado.urls_rest import router_viaticos
from seguridad.urls_rest import router_seguridad
from capitalhumano.urls_rest import router_capitalhumano
from seguridadlaboral.urls_rest import router_seguridadlaboral
from calidad.urls_rest import router_calidad

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api-ebs/', include(router_ebs.urls)),
    url(r'^api-jde/', include(router_jde.urls)),
    url(r'^api-serviciosempleado/', include(router_viaticos.urls)),
    url(r'^api-seguridad/', include(router_seguridad.urls)),
    url(r'^api-capitalhumano/', include(router_capitalhumano.urls)),
    url(r'^api-seguridadlaboral/', include(router_seguridadlaboral.urls)),
    url(r'^api-calidad/', include(router_calidad.urls)),

    url(r'', include('compras.urls', namespace="compras")),
    url(r'', include('home.urls', namespace="home")),
    url(r'', include('seguridad.urls', namespace="seguridad")),
    url(r'', include('capitalhumano.urls', namespace="capitalhumano")),
    url(r'', include('serviciosempleado.urls', namespace="serviciosempleado")),
    url(r'', include('seguridadlaboral.urls', namespace="seguridadlaboral")),
    url(r'', include('calidad.urls', namespace="calidad")),

]
