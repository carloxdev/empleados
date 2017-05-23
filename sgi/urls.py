from django.conf.urls import url

from .views import IncidenciaDocumentoNuevo
from .views import IncidenciaDocumentoLista
from .views import IncidenciaDocumentoEditar
from .views import IncidenciaDocumentoArchivo
from .views import IncidenciaResolucionNuevo
from .views import IncidenciaGraficas

# CALIDAD - AUDITORIAS
from .views import AuditoriaLista
from .views import AuditoriaNuevo
from .views import EquipoAuditorLista
from .views import ProcesoLista
from .views import RequisitoLista
from .views import HallazgoLista

# CALIDAD - PROGRAMA
from .views import ProgramaLista

# CALIDAD - CONFIGURACION
from .views import ConfiguracionNormasDetallesRequisitos
from .views import ConfiguracionProceso
from .views import ConfiguracionResponsable
from .views import ConfiguracionAprobador
from .views import ConfiguracionAuditorInterno
from .views import ConfiguracionSitio

urlpatterns = [
    url(r'^incidencias/$', IncidenciaDocumentoLista.as_view(), name="incidencia_lista"),
    url(r'^incidencias/nuevo/$', IncidenciaDocumentoNuevo.as_view(), name="incidencia_nuevo"),
    url(r'^incidencias/(?P<pk>\d+)/editar/$', IncidenciaDocumentoEditar.as_view(), name="incidencia_editar"),
    url(
        r'^incidencias/(?P<incidencia_id>\d+)/archivos/$',
        IncidenciaDocumentoArchivo.as_view(),
        name='incidencia_archivo'
    ),
    url( 
        r'^incidencias/(?P<incidencia_id>\d+)/seguimiento/$',
        IncidenciaResolucionNuevo.as_view(),
        name='incidencia_seguimiento'
    ),
    url(
        r'^incidencias/graficas/$',
        IncidenciaGraficas.as_view(),
        name='incidencia_grafica'
    ),

    # ----------------- CALIDAD - AUDITORIAS ----------------- #

    url(r'^auditorias/$', AuditoriaLista.as_view(), name="auditoria_lista"),
    url(r'^auditorias/nuevo/$', AuditoriaNuevo.as_view(), name="auditoria_nuevo"),
    url(
        r'^auditorias/nuevo/equipo_auditor/$',
        EquipoAuditorLista.as_view(),
        name="equipo_auditor_lista"
    ),
    url(r'^auditorias/nuevo/procesos/$', ProcesoLista.as_view(), name="proceso_lista"),
    url(
        r'^auditorias/nuevo/procesos/nuevo/requisitos/$',
        RequisitoLista.as_view(),
        name="requisito_lista"
    ),
    url(
        r'^auditorias/nuevo/procesos/nuevo/requisitos/nuevo/hallazgos/$',
        HallazgoLista.as_view(),
        name="hallazgo_lista"
    ),
    url(r'^programa/$', ProgramaLista.as_view(), name="programa_lista"),
    url(
        r'^configuracion/normas_detalles_requitos/$',
        ConfiguracionNormasDetallesRequisitos.as_view(),
        name="configuracion"
    ),
    url(r'^configuracion/procesos/$', ConfiguracionProceso.as_view(), name="configuracion_proceso"),
    url(r'^configuracion/responsables/$', ConfiguracionResponsable.as_view(), name="configuracion_responsable"),
    url(r'^configuracion/aprobadores/$', ConfiguracionAprobador.as_view(), name="configuracion_aprobador"),
    url(
        r'^configuracion/auditores_internos/$',
        ConfiguracionAuditorInterno.as_view(),
        name="configuracion_auditor_interno"
    ),
    url(r'^configuracion/sitios/$', ConfiguracionSitio.as_view(), name="configuracion_sitio"),
]
