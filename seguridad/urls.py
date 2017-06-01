# -*- coding: utf-8 -*-

# Librerias Django
from django.conf.urls import url
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views

# Librerias Propias

# Views:
from .views import Login
from .views import Registro
from .views import RegistroExito
from .views import ContrasenaReset
from .views import ContrasenaResetConfirm
from .views import ContrasenaResetComplete
from .views import UsuarioLista
from .views import UsuarioNuevo
from .views import UsuarioEditar
from .views import UsuarioEditarContrasena
from .views import UsuarioPerfil
from .views import UsuarioPerfilContrasena


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
    url(
        r'^registro/$',
        Registro.as_view(),
        name="usuario_registro"
    ),
    url(
        r'^registro/exito/(?P<_pk>\d+)/$',
        RegistroExito.as_view(),
        name="usuario_registro_exito"
    ),
    url(
        r'^contrasena_reset/$',
        ContrasenaReset.as_view(),
        name='contrasena_reset'
    ),
    # Pantalla de restablecimiento de contrasena.
    url(
        r'^reset/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        ContrasenaResetConfirm.as_view(),
        name='contrasena_reset_confirm'
    ),
    # Mensaje 'success' de contrasena cambiada.
    url(
        r'^reset/done/$',
        ContrasenaResetComplete.as_view(),
        name='contrasena_reset_complete'
    ),
    url(
        r'^usuarios/$',
        UsuarioLista.as_view(),
        name="usuario_lista"
    ),
    url(
        r'^usuarios/nuevo/$',
        UsuarioNuevo.as_view(),
        name="usuario_nuevo"
    ),
    url(
        r'^usuarios/(?P<_pk>\d+)/editar/$',
        UsuarioEditar.as_view(),
        name="usuario_editar"
    ),
    url(
        r'^usuarios/(?P<_pk>\d+)/editar/contrasena/$',
        UsuarioEditarContrasena.as_view(),
        name="usuario_editar_contrasena"
    ),
    url(
        r'^usuarios/(?P<_pk>\d+)/perfil/$',
        UsuarioPerfil.as_view(),
        name="usuario_perfil"
    ),
    url(
        r'^usuarios/(?P<_pk>\d+)/perfil/contrasena/$',
        UsuarioPerfilContrasena.as_view(),
        name="usuario_perfil_contrasena"
    ),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
