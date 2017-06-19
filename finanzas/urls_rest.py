
# Librerias APi Rest:
from rest_framework import routers

# API Rest Vistas:
from finanzas.views_rest import ViaticoCabeceraAPI
from finanzas.views_rest import ViaticoLineaAPI
from finanzas.views_rest import ViaticoCabeceraByPageAPI
from finanzas.views_rest import ViaticoLineaByPageAPI

router_finanzas = routers.DefaultRouter()

router_finanzas.register(
    r'viaticocabecera',
    ViaticoCabeceraAPI,
    'viaticocabecera'
)
router_finanzas.register(
    r'viaticolinea',
    ViaticoLineaAPI,
    'viaticolinea'
)
router_finanzas.register(
    r'viaticocabecera_bypage',
    ViaticoCabeceraByPageAPI,
    'viaticocabecera_bypage'
)
router_finanzas.register(
    r'viaticolinea_bypage',
    ViaticoLineaByPageAPI,
    'viaticolinea_bypage'
)
