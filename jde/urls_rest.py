# Librerias APi Rest:
from rest_framework import routers

from jde.views_rest import VIEW_USUARIOS_API
from jde.views_rest import VIEW_SCOMPRAS_API
from jde.views_rest import VIEW_SCOMPRAS_ByPageAPI
from jde.views_rest import VIEW_UNIDADES_API
from jde.views_rest import VIEW_COMPANIAS_API
from jde.views_rest import VIEW_AUTORIZACIONES_ByPageAPI
from jde.views_rest import VIEW_RECEPCIONES_API
from jde.views_rest import VIEW_RECEPCIONES_ByPageAPI
from jde.views_rest import VIEW_PROVEEDORES_API
from jde.views_rest import VIEW_PROVEEDORES_ByPageAPI


router_jde = routers.DefaultRouter()

router_jde.register(
    r'viewusuarios',
    VIEW_USUARIOS_API,
    'viewusuarios'
)

router_jde.register(
    r'viewscompras',
    VIEW_SCOMPRAS_API,
    'viewscompras'
)

router_jde.register(
    r'viewscompras_bypage',
    VIEW_SCOMPRAS_ByPageAPI,
    'viewscompras_bypage'
)

router_jde.register(
    r'viewcompanias',
    VIEW_COMPANIAS_API,
    'viewcompanias'
)

router_jde.register(
    r'viewunidades',
    VIEW_UNIDADES_API,
    'viewunidades',
)

router_jde.register(
    r'viewautorizaciones_bypage',
    VIEW_AUTORIZACIONES_ByPageAPI,
    'viewautorizaciones_bypage',
)

router_jde.register(
    r'viewrecepciones',
    VIEW_RECEPCIONES_API,
    'viewrecepciones',
)


router_jde.register(
    r'viewrecepciones_bypage',
    VIEW_RECEPCIONES_ByPageAPI,
    'viewrecepciones_bypage',
)

router_jde.register(
    r'viewproveedores',
    VIEW_PROVEEDORES_API,
    'viewproveedores',
)

router_jde.register(
    r'viewproveedores_bypage',
    VIEW_PROVEEDORES_ByPageAPI,
    'viewproveedores_bypage',
)
