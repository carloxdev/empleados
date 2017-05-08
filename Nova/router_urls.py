# Librerias APi Rest:
from rest_framework import routers

# API Rest Vistas:
from finanzas.views import ViaticoCabeceraAPI
from finanzas.views import ViaticoLineaAPI
from finanzas.views import ViaticoCabeceraByPageAPI
from finanzas.views import ViaticoLineaByPageAPI

from sgi.views import IncidenciaDocumentoAPI
from sgi.views import IncidenciaDocumentoByPageAPI
from sgi.views import IncidenciaTipoAPI
from sgi.views import CentroAtencionAPI
from sgi.views import IncidenciaArchivoByPageAPI

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
from jde.views import VIEW_SCOMPRAS_API
from jde.views import VIEW_SCOMPRAS_ByPageAPI
from jde.views import VIEW_UNIDADES_API
from jde.views import VIEW_COMPANIAS_API
from jde.views import VIEW_AUTORIZACIONES_ByPageAPI
from jde.views import VIEW_RECEPCIONES_ByPageAPI


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

# -------------- EBS -------------- #

router.register(
    r'viewempleadossimple',
    VIEW_EMPLEADOS_SIMPLE_API,
    'viewempleadossimple'
)


router.register(
    r'viewempleadosfull',
    VIEW_EMPLEADOS_FULL_API,
    'viewempleadosfull'
)

router.register(
    r'viewempleadossimple_bypage',
    VIEW_EMPLEADOS_SIMPLE_ByPageAPI,
    'viewempleadossimple_bypage'
)

router.register(
    r'viewempleadosfull_bypage',
    VIEW_EMPLEADOS_FULL_ByPageAPI,
    'viewempleadosfull_bypage'
)

# -------------- JDE -------------- #

router.register(
    r'viewusuarios',
    VIEW_USUARIOS_API,
    'viewusuarios'
)

router.register(
    r'viewscompras',
    VIEW_SCOMPRAS_API,
    'viewscompras'
)

router.register(
    r'viewscompras_bypage',
    VIEW_SCOMPRAS_ByPageAPI,
    'viewscompras_bypage'
)

router.register(
    r'viewcompanias',
    VIEW_COMPANIAS_API,
    'viewcompanias'
)

router.register(
    r'viewunidades',
    VIEW_UNIDADES_API,
    'viewunidades',
)

router.register(
    r'viewautorizaciones_bypage',
    VIEW_AUTORIZACIONES_ByPageAPI,
    'viewautorizaciones_bypage',
)

router.register(
    r'viewrecepciones_bypage',
    VIEW_RECEPCIONES_ByPageAPI,
    'viewrecepciones_bypage',
)

