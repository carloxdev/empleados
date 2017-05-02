from django.conf.urls import url
from django.conf import settings
from django.conf.urls.static import static

# Views
from .views import Login
from .views import UsuarioLista
from .views import UsuarioNuevo
from .views import UsuarioEditar
from .views import UsuarioListaPerfil
from .views import UsuarioDetallesMiPerfil
from .views import UsuarioDetallesPerfil
from .views import UsuarioEditarPerfil
from .views import UsuarioCambiarContrasena
from .views import UsuarioCambiarContrasenaPerfil

# Autentificacion
from django.contrib.auth import views as auth_views


app_name = "seguridad"

urlpatterns = [

    url(
        r'^$',
        Login.as_view(),
        name='login'
    ),
    url(
        r'^logout/$',
        auth_views.logout,
        {'next_page': settings.LOGIN_URL},
        name='logout'
    ),
    url(r'^usuarios$', UsuarioLista.as_view(), name="usuario_lista"),
    url(r'^usuarios/nuevo/$', UsuarioNuevo.as_view(), name="usuario_nuevo"),
    url(r'^usuarios/editar/(?P<pk>\d+)/$', UsuarioEditar.as_view(), name="usuario_editar"),
    url(r'^usuarios/contrasena/(?P<pk>\d+)/$', UsuarioCambiarContrasena.as_view(), name="usuario_cambiar_contrasena"),
    url(r'^usuarios/perfil/lista/$', UsuarioListaPerfil.as_view(), name="usuario_lista_perfil"),
    url(r'^usuarios/perfil/lista/detalles/(?P<pk>\d+)/$', UsuarioDetallesPerfil.as_view(), name="usuario_lista_perfil"),
    url(r'^usuarios/perfil/detalles/$', UsuarioDetallesMiPerfil.as_view(), name="usuario_detalles_mi_perfil"),
    url(r'^usuarios/perfil/editar/(?P<pk>\d+)/$', UsuarioEditarPerfil.as_view(), name="usuario_editar_perfil"),
    url(r'^usuarios/perfil/contrasena/(?P<pk>\d+)/$', UsuarioCambiarContrasenaPerfil.as_view(), name="usuario_cambiar_contrasena_perfil"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
