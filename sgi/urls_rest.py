# Librerias APi Rest:
from rest_framework import routers


from sgi.views_rest import IncidenciaDocumentoAPI
from sgi.views_rest import IncidenciaDocumentoByPageAPI
from sgi.views_rest import IncidenciaTipoAPI
from sgi.views_rest import CentroAtencionAPI
from sgi.views_rest import IncidenciaArchivoByPageAPI
from sgi.views_rest import IncidenciaArchivoAPI
from sgi.views_rest import IncidenciaEmpleadosZonaAPI


router_sgi = routers.DefaultRouter()


router_sgi.register(
    r'incidenciadocumento',
    IncidenciaDocumentoAPI,
    'incidenciadocumento'
)

router_sgi.register(
    r'incidenciadocumento_bypage',
    IncidenciaDocumentoByPageAPI,
    'incidenciadocumento_bypage'
)

router_sgi.register(
    r'incidenciatipo',
    IncidenciaTipoAPI,
    'incidenciatipo'
)

router_sgi.register(
    r'incidenciacentroatencion',
    CentroAtencionAPI,
    'incidenciacentroatencion'
)

router_sgi.register(
    r'incidenciaarchivo_bypage',
    IncidenciaArchivoByPageAPI,
    'incidenciaarchivo_bypage'
)

router_sgi.register(
    r'incidenciaarchivo',
    IncidenciaArchivoAPI,
    'incidenciaarchivo'
)

router_sgi.register(
    r'incidenciaempleadoszona',
    IncidenciaEmpleadosZonaAPI,
    'incidenciaempleadoszona'
)
