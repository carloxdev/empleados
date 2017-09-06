# Librerias APi Rest:
from rest_framework import routers

from .view_rest import ArchivoSolicitudAPI
from .view_rest import ArchivoSolicitudByPageAPI
from .view_rest import SolicitudAPI
from .view_rest import AsuntoAPI


router_administracion = routers.DefaultRouter()

router_administracion.register(
    r'asunto',
    AsuntoAPI,
    'asunto'
)
router_administracion.register(
    r'solicitud',
    SolicitudAPI,
    'solicitud'
)
router_administracion.register(
    r'archivosolicitud',
    ArchivoSolicitudAPI,
    'archivosolicitud'
)
router_administracion.register(
    r'archivosolicitud_bypage',
    ArchivoSolicitudByPageAPI,
    'archivosolicitud_bypage'
)
