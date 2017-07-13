# Librerias APi Rest:
from rest_framework import routers

from capitalhumano.view_rest import VIEW_DOCUMENTO_PERFIL_PUESTO_ByPageAPI
from capitalhumano.view_rest import DocumentoPersonalAPI
from capitalhumano.view_rest import DocumentoCapacitacionAPI
from capitalhumano.view_rest import ArchivoPersonalByPageAPI
from capitalhumano.view_rest import ArchivoCapacitacionByPageAPI
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
    r'documentopersonal_bypage',
    ArchivoPersonalByPageAPI,
    'documentopersonal_bypage'
)
router_capitalhumano.register(
    r'documentocapacitacion_bypage',
    ArchivoCapacitacionByPageAPI,
    'documentocapacitacion_bypage'
)
