# Librerias APi Rest:
from rest_framework import routers

from .view_rest import PersonalAPI
from .view_rest import PersonalByPageAPI
from capitalhumano.view_rest import DocumentoCapacitacionAPI
from capitalhumano.view_rest import PerfilPuestosCargoAPI
from capitalhumano.view_rest import PerfilPuestosCargoByPageAPI
from capitalhumano.view_rest import PerfilPuestosDocumentoAPI
from capitalhumano.view_rest import PerfilPuestosDocumentoByPageAPI
from capitalhumano.view_rest import PerfilCompetenciasAPI
from capitalhumano.view_rest import PerfilCompetenciasByPageAPI


router_capitalhumano = routers.DefaultRouter()

# --------------------DOCUMENTOS--------------------
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
