# Librerias APi Rest:
from rest_framework import routers


from seguridad.views_rest import UserAPI
from seguridad.views_rest import UserByPageAPI
from seguridad.views_rest import ProfileAPI
from seguridad.views_rest import ProfileByPageAPI
from seguridad.views_rest import ProfileExcelAPI

router_seguridad = routers.DefaultRouter()


router_seguridad.register(
    r'user',
    UserAPI,
    'user'
)
router_seguridad.register(
    r'profile',
    ProfileAPI,
    'profile'
)
router_seguridad.register(
    r'user_bypage',
    UserByPageAPI,
    'user_bypage'
)
router_seguridad.register(
    r'profile_bypage',
    ProfileByPageAPI,
    'profile_bypage'
)
router_seguridad.register(
    r'profileexcel',
    ProfileExcelAPI,
    'profileexcel'
)
