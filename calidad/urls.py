from django.conf.urls import url

# CALIDAD - AUDITORIAS
from .views import CalidadDashboard

# CALIDAD - AUDITORIAS
from .views import AuditoriaLista
from .views import GeneralFormularioCreate
from .views import GeneralFormularioUpdate
from .views import AuditorFormularioUpdate
from .views import ProcesoLista
from .views import RequisitoLista
from .views import ProcesoFormularioUpdate
from .views import HallazgoLista
from .views import HallazgoDetalle
# from .views import EvidenciaFormulario
# from .views import PlanAccionLista
# from .views import SeguimientoPlanAccionFormulario

# CALIDAD - PROGRAMA
from .views import ProgramaLista

# CALIDAD - CONFIGURACION
from .views import ConfiguracionCriterioLista
from .views import ConfiguracionRequisitoAPI
from .views import ConfiguracionSubprocesoAPI
from .views import ConfiguracionProcesoLista
from .views import ConfiguracionRolLista
# from .views import ConfiguracionRolNuevo
# from .views import ConfiguracionRolEditar
from .views import ConfiguracionSitioLista
# from .views import ConfiguracionContratoLista
from .views import ConfiguracionMetodologiaLista
from .views import ConfiguracionTipoFallaLista
from .views import ConfiguracionFormatoLista

urlpatterns = [
    # ----------------- CALIDAD - DASHBOARD ----------------- #

    url(
        r'^calidad/$',
        CalidadDashboard.as_view(),
        name="calidad_dashboard"
    ),

    # ----------------- CALIDAD - AUDITORIAS ----------------- #

    url(
        r'^auditorias/$',
        AuditoriaLista.as_view(),
        name="auditoria_lista"
    ),
    url(
        r'^auditorias/nuevo/$',
        GeneralFormularioCreate.as_view(),
        name="general_formulario_create"
    ),
    url(
        r'^auditorias/(?P<pk>\d+)/editar/$',
        GeneralFormularioUpdate.as_view(),
        name="general_formulario_update"
    ),
    url(
        r'^auditorias/(?P<pk>\d+)/auditores/$',
        AuditorFormularioUpdate.as_view(),
        name="auditor_formulario_update"
    ),
    url(
        r'^auditorias/(?P<pk>\d+)/procesos/$',
        ProcesoLista.as_view(),
        name="proceso_lista"
    ),
    url(
        r'^auditorias/(?P<pk>\d+)/procesos/(?P<pk_pro>\d+)/editar/$',
        ProcesoFormularioUpdate.as_view(),
        name="proceso_formulario_update"
    ),
    url(
        r'^auditorias/(?P<pk>\d+)/procesos/(?P<pk_pro>\d+)/requisitos/$',
        RequisitoLista.as_view(),
        name="requisito_lista"
    ),
    url(
        r'^auditorias/(?P<pk>\d+)/procesos/(?P<pk_pro>\d+)/hallazgos/$',
        HallazgoLista.as_view(),
        name="hallazgo_lista"
    ),
    url(
        r'^auditorias/(?P<pk>\d+)/procesos/(?P<pk_pro>\d+)/(?P<pk_hal>\d+)/detalle/$',
        HallazgoDetalle.as_view(),
        name="hallazgo_detalle"
    ),
    # url(
    #     r'^auditorias/nuevo/hallazgos/evidencia/$',
    #     EvidenciaFormulario.as_view(),
    #     name="evidencia_formulario"
    # ),
    # url(
    #     r'^auditorias/nuevo/hallazgos/planes_accion/$',
    #     PlanAccionLista.as_view(),
    #     name="plan_accion_lista"
    # ),
    # url(
    #     r'^auditorias/nuevo/hallazgos/planes_accion/seguimientos/$',
    #     SeguimientoPlanAccionFormulario.as_view(),
    #     name="seguimiento_plan_accion_formulario"
    # ),

    # ----------------- CALIDAD - PROGRAMA ----------------- #

    url(
        r'^programa/$',
        ProgramaLista.as_view(),
        name="programa_lista"
    ),

    # ----------------- CALIDAD - CONFIGURACION ----------------- #

    url(
        r'^configuracion/criterios/$',
        ConfiguracionCriterioLista.as_view(),
        name="configuracion_criterio_lista"
    ),
    url(
        r'^configuracion/requisitos/json/$',
        ConfiguracionRequisitoAPI.as_view(),
        name='configuracion_requisito_api'
    ),
    url(
        r'^configuracion/procesos/$',
        ConfiguracionProcesoLista.as_view(),
        name="configuracion_proceso_lista"
    ),
    url(
        r'^configuracion/subprocesos/json/$',
        ConfiguracionSubprocesoAPI.as_view(),
        name='configuracion_subproceso_api'
    ),
    url(
        r'^configuracion/roles/$',
        ConfiguracionRolLista.as_view(),
        name="configuracion_rol_lista"
    ),
    # url(
    #     r'^configuracion/roles/nuevo/$',
    #     ConfiguracionRolNuevo.as_view(),
    #     name="configuracion_rol_nuevo"
    # ),
    # url(
    #     r'^configuracion/roles/editar/$',
    #     ConfiguracionRolLista.as_view(),
    #     name="configuracion_rol_editar"
    # ),
    url(
        r'^configuracion/sitios/$',
        ConfiguracionSitioLista.as_view(),
        name="configuracion_sitio_lista"
    ),
    url(
        r'^configuracion/metodologias/$',
        ConfiguracionMetodologiaLista.as_view(),
        name="configuracion_metodologia_lista"
    ),
    url(
        r'^configuracion/descripciones/$',
        ConfiguracionTipoFallaLista.as_view(),
        name="configuracion_tipo_falla_lista"
    ),
    url(
        r'^configuracion/formatos/$',
        ConfiguracionFormatoLista.as_view(),
        name="configuracion_formato_lista"
    ),
]
