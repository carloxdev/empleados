# Librerias APi Rest:
from rest_framework import routers

# VIEW REST
from .view_rest import CriterioAPI
from .view_rest import RequisitoAPI
from .view_rest import ProcesoAPI
from .view_rest import SubprocesoAPI
from .view_rest import ResponsableAPI
from .view_rest import UsuarioAPI

router_calidad = routers.DefaultRouter()


router_calidad.register(
    r'criterio',
    CriterioAPI,
    'criterio'
)

router_calidad.register(
    r'requisito',
    RequisitoAPI,
    'requisito'
)

router_calidad.register(
    r'proceso',
    ProcesoAPI,
    'proceso'
)

router_calidad.register(
    r'subproceso',
    SubprocesoAPI,
    'subproceso'
)

router_calidad.register(
    r'responsable',
    ResponsableAPI,
    'responsable'
)

router_calidad.register(
    r'usuario',
    UsuarioAPI,
    'usuario'
)