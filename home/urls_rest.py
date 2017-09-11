# Librerias APi Rest:
from rest_framework import routers

from .view_rest import ArchivoAPI

router_home = routers.DefaultRouter()

router_home.register(
    r'archivo',
    ArchivoAPI,
    'archivo'
)
