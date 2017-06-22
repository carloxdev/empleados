# Librerias APi Rest:
from rest_framework import routers


from capitalhumano.view_rest import VIEW_DOCUMENTO_PERFIL_PUESTO_ByPageAPI
from capitalhumano.view_rest import PERFIL_API

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
