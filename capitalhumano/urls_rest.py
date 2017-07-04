# Librerias APi Rest:
from rest_framework import routers


from capitalhumano.view_rest import VIEW_DOCUMENTO_PERFIL_PUESTO_ByPageAPI
from capitalhumano.view_rest import Archivo_Personal_API
from capitalhumano.view_rest import Archivo_Personal_ByPageAPI
from capitalhumano.view_rest import Archivo_Capacitacion_ByPageAPI

router_capitalhumano = routers.DefaultRouter()


router_capitalhumano.register(
    r'perfilpuestodocumento',
    VIEW_DOCUMENTO_PERFIL_PUESTO_ByPageAPI,
    'perfilpuestodocumento'
)

router_capitalhumano.register(
    r'documentopersonal',
    Archivo_Personal_API,
    'documentopersonal'
)
router_capitalhumano.register(
    r'documentopersonal_bypage',
    Archivo_Personal_ByPageAPI,
    'documentopersonal_bypage'
)
router_capitalhumano.register(
    r'documentocapacitacion_bypage',
    Archivo_Capacitacion_ByPageAPI,
    'documentocapacitacion_bypage'
)
