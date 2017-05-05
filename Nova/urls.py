
# Liberias Django
from django.conf.urls import url
from django.contrib import admin
from django.conf.urls import include


# Librerias APi Rest:
from rest_framework import routers

# API Rest Vistas:
from finanzas.views import ViaticoCabeceraAPI
from finanzas.views import ViaticoLineaAPI
from finanzas.views import ViaticoCabeceraByPageAPI
from finanzas.views import ViaticoLineaByPageAPI

from compras.views import viewscomprasAPI
from compras.views import viewscomprasByPageAPI
from compras.views import viewunidadesAPI
from compras.views import viewcompaniasAPI
from compras.views import viewautorizacionesAPI
from compras.views import viewrecepcionesAPI
from compras.views import viewitemsAPI

from sgi.views import IncidenciaDocumentoAPI
from sgi.views import IncidenciaDocumentoByPageAPI
from sgi.views import IncidenciaTipoAPI
from sgi.views import CentroAtencionAPI
from sgi.views import IncidenciaArchivoByPageAPI
from sgi.views import IncidenciaResolucionAPI

from seguridad.views import UserAPI
from seguridad.views import UserByPageAPI
from seguridad.views import ProfileAPI
from seguridad.views import ProfileByPageAPI
from seguridad.views import ProfileExcelAPI

from ebs.views import VIEW_EMPLEADOS_SIMPLE_API
from ebs.views import VIEW_EMPLEADOS_SIMPLE_ByPageAPI
from ebs.views import VIEW_EMPLEADOS_FULL_API
from ebs.views import VIEW_EMPLEADOS_FULL_ByPageAPI

from jde.views import VIEW_USUARIOS_API


router = routers.DefaultRouter()

# -------------- Security -------------- #

router.register(
    r'user',
    UserAPI,
    'user'
)
router.register(
    r'profile',
    ProfileAPI,
    'profile'
)
router.register(
    r'user_bypage',
    UserByPageAPI,
    'user_bypage'
)
router.register(
    r'profile_bypage',
    ProfileByPageAPI,
    'profile_bypage'
)
router.register(
    r'profileexcel',
    ProfileExcelAPI,
    'profileexcel'
)

# -------------- Finanzas -------------- #

router.register(
    r'viaticocabecera',
    ViaticoCabeceraAPI,
    'viaticocabecera'
)
router.register(
    r'viaticolinea',
    ViaticoLineaAPI,
    'viaticolinea'
)
router.register(
    r'viaticocabecera_bypage',
    ViaticoCabeceraByPageAPI,
    'viaticocabecera_bypage'
)
router.register(
    r'viaticolinea_bypage',
    ViaticoLineaByPageAPI,
    'viaticolinea_bypage'
)

# -------------- Compras -------------- #

router.register(
    r'viewscompras',
    viewscomprasAPI,
    'viewscompras'
)

router.register(
    r'viewscompras_bypage',
    viewscomprasByPageAPI,
    'viewscompras_bypage'
)

router.register(
    r'viewcompanias',
    viewcompaniasAPI,
    'viewcompanias'
)

router.register(
    r'viewunidades',
    viewunidadesAPI,
    'viewunidades',
)

router.register(
    r'viewautorizaciones',
    viewautorizacionesAPI,
    'viewautorizaciones',
)

router.register(
    r'viewrecepciones',
    viewrecepcionesAPI,
    'viewrecepciones',
)

router.register(
    r'viewitems',
    viewitemsAPI,
    'viewitems',
)
# -------------- SGI -------------- #

router.register(
    r'incidenciadocumento',
    IncidenciaDocumentoAPI,
    'incidenciadocumento'
)

router.register(
    r'incidenciadocumento_bypage',
    IncidenciaDocumentoByPageAPI,
    'incidenciadocumento_bypage'
)

router.register(
    r'incidenciatipo',
    IncidenciaTipoAPI,
    'incidenciatipo'
)

router.register(
    r'incidenciacentroatencion',
    CentroAtencionAPI,
    'incidenciacentroatencion'
)

router.register(
    r'incidenciaarchivo',
    IncidenciaArchivoByPageAPI,
    'incidenciaarchivo'
)

router.register(
    r'incidenciaresolucion',
    IncidenciaResolucionAPI,
    'incidenciaresolucion'
)

# -------------- EBS -------------- #

router.register(
    r'view_empleados_simple',
    VIEW_EMPLEADOS_SIMPLE_API,
    'view_empleados_simple'
)

router.register(
    r'view_empleados_full_bypage',
    VIEW_EMPLEADOS_SIMPLE_ByPageAPI,
    'view_empleados_full_bypage'
)

router.register(
    r'view_empleados_full',
    VIEW_EMPLEADOS_FULL_API,
    'view_empleados_full'
)

router.register(
    r'view_empleados_full_bypage',
    VIEW_EMPLEADOS_FULL_ByPageAPI,
    'view_empleados_full_bypage'
)

# -------------- JDE -------------- #

router.register(
    r'viewusuarios',
    VIEW_USUARIOS_API,
    'viewusuarios'
)



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
