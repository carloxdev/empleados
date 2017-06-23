from django.conf.urls import url

# from .views import IncidenciaDocumentoNuevo
# from .views import IncidenciaDocumentoLista
# from .views import IncidenciaDocumentoEditar
# from .views import IncidenciaDocumentoArchivo
# from .views import IncidenciaResolucionNuevo
# from .views import IncidenciaGraficas

# CALIDAD - AUDITORIAS
from .views import CalidadDashboard

# CALIDAD - AUDITORIAS
from .views import AuditoriaLista
from .views import GeneralFormulario
from .views import EquipoAuditorFormulario
from .views import ProcesoLista
from .views import RequisitoLista
from .views import RequisitoFormulario
from .views import HallazgoLista
from .views import EvidenciaFormulario
from .views import PlanAccionLista
from .views import SeguimientoPlanAccionFormulario

# CALIDAD - PROGRAMA
from .views import ProgramaLista

# CALIDAD - CONFIGURACION
from .views import ConfiguracionRequisitoLista
from .views import ConfiguracionProcesoLista
from .views import ConfiguracionRolLista
from .views import ConfiguracionAuditorInternoFormulario
from .views import ConfiguracionSitioLista
from .views import ConfiguracionContratoLista
from .views import ConfiguracionMetodologiaLista
from .views import ConfiguracionTipoHallazgoLista
from .views import ConfiguracionFormatoLista


urlpatterns = [
    # url(r'^incidencias/$', IncidenciaDocumentoLista.as_view(), name="incidencia_lista"),
    # url(r'^incidencias/nuevo/$', IncidenciaDocumentoNuevo.as_view(), name="incidencia_nuevo"),
    # url(r'^incidencias/(?P<pk>\d+)/editar/$', IncidenciaDocumentoEditar.as_view(), name="incidencia_editar"),
    # url(
    #     r'^incidencias/(?P<incidencia_id>\d+)/archivos/$',
    #     IncidenciaDocumentoArchivo.as_view(),
    #     name='incidencia_archivo'
    # ),
    # url( 
    #     r'^incidencias/(?P<incidencia_id>\d+)/seguimiento/$',
    #     IncidenciaResolucionNuevo.as_view(),
    #     name='incidencia_seguimiento'
    # ),
    # url(
    #     r'^incidencias/graficas/$',
    #     IncidenciaGraficas.as_view(),
    #     name='incidencia_grafica'
    # ),

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
        r'^auditorias/nuevo/generales/$',
        GeneralFormulario.as_view(),
        name="general_formulario"
    ),
    url(
        r'^auditorias/nuevo/equipo_auditor/$',
        EquipoAuditorFormulario.as_view(),
        name="equipo_auditor_formulario"
    ),
    url(
        r'^auditorias/nuevo/procesos/$',
        ProcesoLista.as_view(),
        name="proceso_lista"
    ),
    url(
        r'^auditorias/nuevo/procesos/nuevo/requisitos/nuevo/$',
        RequisitoFormulario.as_view(),
        name="requisito_formulario"
    ),
    url(
        r'^auditorias/nuevo/procesos/nuevo/requisitos/$',
        RequisitoLista.as_view(),
        name="requisito_lista"
    ),
    url(
        r'^auditorias/nuevo/hallazgos/$',
        HallazgoLista.as_view(),
        name="hallazgo_lista"
    ),
    url(
        r'^auditorias/nuevo/hallazgos/evidencia/s$',
        EvidenciaFormulario.as_view(),
        name="evidencia_formulario"
    ),
    url(
        r'^auditorias/nuevo/hallazgos/planes_accion/$',
        PlanAccionLista.as_view(),
        name="plan_accion_lista"
    ),
    url(
        r'^auditorias/nuevo/hallazgos/planes_accion/seguimientos/$',
        SeguimientoPlanAccionFormulario.as_view(),
        name="seguimiento_plan_accion_formulario"
    ),

    # ----------------- CALIDAD - PROGRAMA ----------------- #

    url(
        r'^programa/$',
        ProgramaLista.as_view(),
        name="programa_lista"
    ),

    # ----------------- CALIDAD - CONFIGURACION ----------------- #

    url(
        r'^configuracion/requisitos/$',
        ConfiguracionRequisitoLista.as_view(),
        name="configuracion_requisito_lista"
    ),
    url(
        r'^configuracion/procesos/$',
        ConfiguracionProcesoLista.as_view(),
        name="configuracion_proceso_lista"
    ),
    url(
        r'^configuracion/roles/$',
        ConfiguracionRolLista.as_view(),
        name="configuracion_rol_lista"
    ),
    url(
        r'^configuracion/auditores_internos/$',
        ConfiguracionAuditorInternoFormulario.as_view(),
        name="configuracion_auditor_interno_formulario"
    ),
    url(
        r'^configuracion/sitios/$',
        ConfiguracionSitioLista.as_view(),
        name="configuracion_sitio_lista"
    ),
    url(
        r'^configuracion/contratos/$',
        ConfiguracionContratoLista.as_view(),
        name="configuracion_contrato_lista"
    ),
    url(
        r'^configuracion/metodologias/$',
        ConfiguracionMetodologiaLista.as_view(),
        name="configuracion_metodologia_lista"
    ),
    url(
        r'^configuracion/tipos_hallazgo/$',
        ConfiguracionTipoHallazgoLista.as_view(),
        name="configuracion_tipo_hallazgo_lista"
    ),
    url(
        r'^configuracion/formatos/$',
        ConfiguracionFormatoLista.as_view(),
        name="configuracion_formato_lista"
    ),
]
