from django.conf.urls import url
from django.conf import settings

# Views
from .views import Login
from .views import UsuarioLista
from .views import UsuarioNuevo
from .views import UsuarioEditar
from .views import UsuarioDetallesPerfil
from .views import UsuarioEditarPerfil

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
    url(r'^usuarios/nuevo$', UsuarioNuevo.as_view(), name="usuario_nuevo"),
    url(r'^usuarios/editar/(?P<pk>\d+)/$', UsuarioEditar.as_view(), name="usuario_editar"),
    url(r'^usuarios/perfil/detalles$', UsuarioDetallesPerfil.as_view(), name="perfil_detalles"),
    url(r'^usuarios/perfil/editar$', UsuarioEditarPerfil.as_view(), name="usuario_editar_perfil"),
]
