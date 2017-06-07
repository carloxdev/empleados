# Librerias APi Rest:
from rest_framework import routers

from ebs.views_rest import VIEW_EMPLEADOS_SIMPLE_API
from ebs.views_rest import VIEW_EMPLEADOS_SIMPLE_ByPageAPI
from ebs.views_rest import VIEW_EMPLEADOS_FULL_API
from ebs.views_rest import VIEW_EMPLEADOS_FULL_ByPageAPI
from ebs.views_rest import VIEW_ORGANIZACIONES_API
from ebs.views_rest import VIEW_EMPLEADOS_GRADO_API
from ebs.views_rest import VIEW_ORGANIGRAMA_API


router_ebs = routers.DefaultRouter()

router_ebs.register(
    r'viewempleadossimple',
    VIEW_EMPLEADOS_SIMPLE_API,
    'viewempleadossimple'
)
router_ebs.register(
    r'viewempleadosfull',
    VIEW_EMPLEADOS_FULL_API,
    'viewempleadosfull'
)
router_ebs.register(
    r'viewempleadossimple_bypage',
    VIEW_EMPLEADOS_SIMPLE_ByPageAPI,
    'viewempleadossimple_bypage'
)
router_ebs.register(
    r'vieworganizaciones',
    VIEW_ORGANIZACIONES_API,
    'vieworganizaciones'
)
router_ebs.register(
    r'viewempleadosgrado',
    VIEW_EMPLEADOS_GRADO_API,
    'viewempleadosgrado'
)
router_ebs.register(
    r'vieworganigrama',
    VIEW_ORGANIGRAMA_API,
    'vieworganigrama'
)

