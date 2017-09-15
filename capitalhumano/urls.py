from django.conf.urls import url

# Static
from django.conf import settings
from django.conf.urls.static import static

# Views
from .views import EmpleadoLista
from .views import Dashboard
from .views import Organigrama
from .views import OrganigramaOrgAPI
from .views import OrganigramaEmpAPI
from .views import PerfilPuesto
from .views import PerfilPuestoNuevo
from .views import PerfilPuestoConfiguraciones
from .views import EmpleadoExpediente
from .views import ExpedientesGeneral
from .views import ExpedientesGrado
from .views import ExpedientesDocPersonal
from .views import ExpedientesDocCapacitacion
from .views import Solicitudes

urlpatterns = [
    url(
        r'^dashboard/$',
        Dashboard.as_view(),
        name="empleado_dashboard"
    ),
    url(
        r'^organigrama/$',
        Organigrama.as_view(),
        name="empleado_organigrama"
    ),
    url(
        r'^empleados/$',
        EmpleadoLista.as_view(),
        name="empleado_lista"
    ),
    url(
        r'^organigrama/json-org/(?P<pk>\d+)/$',
        OrganigramaOrgAPI.as_view(),
        name='organigrama_json_org'
    ),
    url(
        r'^organigrama/json-emp/(?P<pk>[\w\s*]+)/$',
        OrganigramaEmpAPI.as_view(),
        name='organigrama_json_emp'
    ),
    url(
        r'^expedientes/general$',
        ExpedientesGeneral.as_view(),
        name='empleado_expedientes_general'
    ),
    url(
        r'^expedientes/solicitudes$',
        Solicitudes.as_view(),
        name='empleado_solicitud'
    ),
    url(
        r'^expedientes/grado$',
        ExpedientesGrado.as_view(),
        name='empleado_expedientes_grado'
    ),
    url(
        r'^expedientes/docpersonal$',
        ExpedientesDocPersonal.as_view(),
        name='empleado_expedientes_docpersonal'
    ),
    url(
        r'^expedientes/doccapacitacion$',
        ExpedientesDocCapacitacion.as_view(),
        name='empleado_expedientes_doccapacitacion'
    ),
    url(
        r'^expedientes/(?P<_numero_empleado>\d+)/expediente/$',
        EmpleadoExpediente.as_view(),
        name='empleado_expediente'
    ),

    # ------------------

    url(
        r'^perfilpuesto/$',
        PerfilPuesto.as_view(),
        name="perfil_lista"
    ),
    url(
        r'^perfilpuesto/nuevo/$',
        PerfilPuestoNuevo.as_view(),
        name="perfil_nuevo"
    ),
    url(
        r'^perfilpuesto/configuraciones/$',
        PerfilPuestoConfiguraciones.as_view(),
        name="perfil_configuracion"
    ),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
