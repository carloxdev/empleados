# Librerias APi Rest:
from rest_framework import routers

# VIEW REST
from .view_rest import CriterioAPI
from .view_rest import RequisitoAPI
from .view_rest import ProcesoAPI
from .view_rest import SubprocesoAPI
from .view_rest import ResponsableAPI
from .view_rest import RolAPI
from .view_rest import CompaniaAPI
from .view_rest import SitioAPI
from .view_rest import FallaAPI
from .view_rest import MetodologiaAPI
from .view_rest import FormatoAPI

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
    r'rol',
    RolAPI,
    'rol'
)
router_calidad.register(
    r'compania',
    CompaniaAPI,
    'compania'
)
router_calidad.register(
    r'sitio',
    SitioAPI,
    'sitio'
)
router_calidad.register(
    r'metodologia',
    MetodologiaAPI,
    'metodologia'
)
router_calidad.register(
    r'falla',
    FallaAPI,
    'falla'
)
router_calidad.register(
    r'formato',
    FormatoAPI,
    'formato'
)
