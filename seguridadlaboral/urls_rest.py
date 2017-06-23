# Librerias APi Rest:
from rest_framework import routers


from seguridadlaboral.views_rest import IncidenciaDocumentoAPI
from seguridadlaboral.views_rest import IncidenciaDocumentoByPageAPI
from seguridadlaboral.views_rest import IncidenciaTipoAPI
from seguridadlaboral.views_rest import CentroAtencionAPI
from seguridadlaboral.views_rest import IncidenciaArchivoByPageAPI
from seguridadlaboral.views_rest import IncidenciaArchivoAPI
from seguridadlaboral.views_rest import IncidenciaEmpleadosZonaAPI
from seguridadlaboral.views_rest import VIEW_INCIDENCIAS_ZONAAPI



router_seguridadlaboral = routers.DefaultRouter()


router_seguridadlaboral.register(
    r'incidenciadocumento',
    IncidenciaDocumentoAPI,
    'incidenciadocumento'
)

router_seguridadlaboral.register(
    r'incidenciadocumento_bypage',
    IncidenciaDocumentoByPageAPI,
    'incidenciadocumento_bypage'
)

router_seguridadlaboral.register(
    r'incidenciatipo',
    IncidenciaTipoAPI,
    'incidenciatipo'
)

router_seguridadlaboral.register(
    r'incidenciacentroatencion',
    CentroAtencionAPI,
    'incidenciacentroatencion'
)

router_seguridadlaboral.register(
    r'incidenciaarchivo_bypage',
    IncidenciaArchivoByPageAPI,
    'incidenciaarchivo_bypage'
)

router_seguridadlaboral.register(
    r'incidenciaarchivo',
    IncidenciaArchivoAPI,
    'incidenciaarchivo'
)

router_seguridadlaboral.register(
    r'incidenciaempleadoszona',
    IncidenciaEmpleadosZonaAPI,
    'incidenciaempleadoszona'
)

router_seguridadlaboral.register(
    r'viewincidenciasporzona',
    VIEW_INCIDENCIAS_ZONAAPI,
    'viewincidenciasporzona'
)
