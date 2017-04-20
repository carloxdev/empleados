
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

from compras.views import CompraSeguimientoAPI
from compras.views import CompraSeguimientoByPageAPI
from compras.views import CompraSeguimientoSucursalAPI

from sgi.views import IncidenciaDocumentoAPI
from sgi.views import IncidenciaTipoAPI
from sgi.views import CentroAtencionAPI

from seguridad.views import UserAPI
from seguridad.views import UserByPageAPI
from seguridad.views import ProfileAPI
from seguridad.views import ProfileByPageAPI

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
    r'compraseguimiento',
    CompraSeguimientoAPI,
    'compraseguimiento'
)

router.register(
    r'compraseguimiento_bypage',
    CompraSeguimientoByPageAPI,
    'compraseguimiento_bypage'
)

<<<<<<< Updated upstream
# -------------- SGI -------------- #

router.register(
    r'incidenciadocumento',
    IncidenciaDocumentoAPI,
    'incidenciadocumento'
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


=======
router.register(
    r'compraseguimientosucursal',
    CompraSeguimientoSucursalAPI,
    'compraseguimientosucursal',
)
>>>>>>> Stashed changes
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
