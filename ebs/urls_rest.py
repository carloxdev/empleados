# Librerias APi Rest:
from rest_framework import routers

from ebs.views_rest import VIEW_EMPLEADOS_SIMPLE_API
from ebs.views_rest import VIEW_EMPLEADOS_SIMPLE_ByPageAPI
from ebs.views_rest import VIEW_EMPLEADOS_FULL_API
from ebs.views_rest import VIEW_EMPLEADOS_FULL_ByPageAPI

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
    r'viewempleadosfull_bypage',
    VIEW_EMPLEADOS_FULL_ByPageAPI,
    'viewempleadosfull_bypage'
)
