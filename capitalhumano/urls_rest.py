# Librerias APi Rest:
from rest_framework import routers

from capitalhumano.view_rest import VIEW_DOCUMENTO_PERFIL_PUESTO_ByPageAPI
from capitalhumano.view_rest import DocumentoPersonalAPI
from capitalhumano.view_rest import DocumentoCapacitacionAPI
from capitalhumano.view_rest import ArchivoPersonalByPageAPI
from capitalhumano.view_rest import ArchivoCapacitacionByPageAPI
from capitalhumano.view_rest import ArchivoPersonalAPI
from capitalhumano.view_rest import ArchivoCapacitacionAPI
from capitalhumano.view_rest import ArchivoAPI

router_capitalhumano = routers.DefaultRouter()


router_capitalhumano.register(
    r'perfilpuestodocumento',
    VIEW_DOCUMENTO_PERFIL_PUESTO_ByPageAPI,
    'perfilpuestodocumento'
)
router_capitalhumano.register(
    r'documentopersonal',
    DocumentoPersonalAPI,
    'documentopersonal'
)
router_capitalhumano.register(
    r'documentocapacitacion',
    DocumentoCapacitacionAPI,
    'documentocapacitacion'
)
router_capitalhumano.register(
    r'archivo',
    ArchivoAPI,
    'archivo'
)
router_capitalhumano.register(
    r'archivopersonal',
    ArchivoPersonalAPI,
    'archivopersonal'
)
router_capitalhumano.register(
    r'archivopersonal_bypage',
    ArchivoPersonalByPageAPI,
    'archivopersonal_bypage'
)
router_capitalhumano.register(
    r'archivocapacitacion',
    ArchivoCapacitacionAPI,
    'archivocapacitacion'
)
router_capitalhumano.register(
    r'archivocapacitacion_bypage',
    ArchivoCapacitacionByPageAPI,
    'archivocapacitacion_bypage'
)
