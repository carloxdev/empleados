# Librerias APi Rest:
from rest_framework import routers


from capitalhumano.view_rest import VIEW_DOCUMENTO_PERFIL_PUESTO_ByPageAPI
from capitalhumano.view_rest import PERFIL_API
from capitalhumano.view_rest import PERFIL_ByPageAPI

router_capitalhumano = routers.DefaultRouter()


router_capitalhumano.register(
    r'perfilpuestodocumento',
    VIEW_DOCUMENTO_PERFIL_PUESTO_ByPageAPI,
    'perfilpuestodocumento'
)

router_capitalhumano.register(
    r'personaldocumento',
    PERFIL_API,
    'personaldocumento'
)
router_capitalhumano.register(
    r'personaldocumento_bypage',
    PERFIL_ByPageAPI,
    'personaldocumento_bypage'
)
