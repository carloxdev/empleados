# Librerias APi Rest:
from rest_framework import routers

from .view_rest import PersonalAPI
from .view_rest import PersonalByPageAPI
from .view_rest import CapacitacionAPI
from .view_rest import CapacitacionByPageAPI
from .view_rest import TipoDocumentoAPI
from .view_rest import DocumentoPersonalAPI
from .view_rest import DocumentoCapacitacionAPI

from capitalhumano.view_rest import PerfilPuestosCargoAPI
from capitalhumano.view_rest import PerfilPuestosCargoByPageAPI
from capitalhumano.view_rest import PerfilPuestosDocumentoAPI
from capitalhumano.view_rest import PerfilPuestosDocumentoByPageAPI
from capitalhumano.view_rest import PerfilCompetenciasAPI
from capitalhumano.view_rest import PerfilCompetenciasByPageAPI
from capitalhumano.view_rest import PerfilIndicadoresAPI
from capitalhumano.view_rest import PerfilIndicadoresByPageAPI


router_capitalhumano = routers.DefaultRouter()

# --------------------DOCUMENTOS--------------------
router_capitalhumano.register(
    r'tipo_documento',
    TipoDocumentoAPI,
    'tipo_documento'
)
router_capitalhumano.register(
    r'personal',
    PersonalAPI,
    'personal'
)
router_capitalhumano.register(
    r'personal_bypage',
    PersonalByPageAPI,
    'personal_bypage'
)
router_capitalhumano.register(
    r'capacitacion',
    CapacitacionAPI,
    'capacitacion'
)
router_capitalhumano.register(
    r'capacitacion_bypage',
    CapacitacionByPageAPI,
    'capacitacion_bypage'
)
router_capitalhumano.register(
    r'documentopersonal',
    DocumentoPersonalAPI,
    'documentopersonal'
)
router_capitalhumano.register(
    r'documentocapacitacion',
    DocumentoCapacitacionAPI,
    'documentocapacitacion'
)
# --------------------PERFILES--------------------
router_capitalhumano.register(
    r'perfilpuestoacargo_bypage',
    PerfilPuestosCargoByPageAPI,
    'perfilpuestoacargo_bypage'
)
router_capitalhumano.register(
    r'perfilpuestoacargo',
    PerfilPuestosCargoAPI,
    'perfilpuestosacargo'
)
router_capitalhumano.register(
    r'perfilpuestosdocumento',
    PerfilPuestosDocumentoAPI,
    'perfilpuestosdocumento'
)
router_capitalhumano.register(
    r'perfilpuestosdoc_bypage',
    PerfilPuestosDocumentoByPageAPI,
    'perfilpuestosdoc_bypage'
)

router_capitalhumano.register(
    r'perfilcompetencias',
    PerfilCompetenciasAPI,
    'perfilcompetencias'
)

router_capitalhumano.register(
    r'perfilcompetencias_bypage',
    PerfilCompetenciasByPageAPI,
    'perfilcompetencias_bypage'
)

router_capitalhumano.register(
    r'perfilindicadores',
    PerfilIndicadoresAPI,
    'perfilindicadores'
)

router_capitalhumano.register(
    r'perfilindicadores_bypage',
    PerfilIndicadoresByPageAPI,
    'perfilindicadores_bypage'
)
