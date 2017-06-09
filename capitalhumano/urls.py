from django.conf.urls import url

# STATIC
from django.conf import settings
from django.conf.urls.static import static

# VISTAS
from .views import EmpleadoLista
from .views import EmpleadoDashboard
from .views import EmpleadoOrganigrama
from .views import EmpleadoOrganigramaOrgAPI
from .views import EmpleadoOrganigramaEmpAPI
from .views import PerfilPuesto
from .views import PerfilPuestoNuevo
from .views import PerfilPuestoNuevo2
from .views import PerfilPuestoConfiguraciones
from .views import PerfilPuestoCompetencias
from .views import PerfilPuestoCargos

urlpatterns = [
    url(
        r'^dashboard/$',
        EmpleadoDashboard.as_view(),
        name="empleado_dashboard"
    ),
    url(
        r'^organigrama/$',
        EmpleadoOrganigrama.as_view(),
        name="empleado_organigrama"
    ),
    url(
        r'^empleados/$',
        EmpleadoLista.as_view(),
        name="empleado_lista"
    ),
    url(
        r'^organigrama/json-org/(?P<pk>\d+)/$',
        EmpleadoOrganigramaOrgAPI.as_view(),
        name='organigrama_json_org'
    ),
    url(
        r'^organigrama/json-emp/(?P<pk>[\w\s*]+)/$',
        EmpleadoOrganigramaEmpAPI.as_view(),
        name='organigrama_json_emp'
    ),

    url(r'^perfilpuesto/$', PerfilPuesto.as_view(), name="perfil_lista"),
    url(r'^perfilpuesto/nuevo/$', PerfilPuestoNuevo.as_view(), name="perfil_nuevo"),
    url(r'^perfilpuesto/nuevo2/$',PerfilPuestoNuevo2.as_view(), name="perfil_nuevo2"),
    url(r'^perfilpuesto/configuraciones/$',
        PerfilPuestoConfiguraciones.as_view(), name="perfil_configuracion"),
    url(r'^perfilpuesto/competencia/$', PerfilPuestoCompetencias.as_view(), name="perfil_competencia"),
    url(r'^perfilpuesto/puestocargo/$', PerfilPuestoCargos.as_view(), name="perfil_cargo"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
