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
from .views import ContrasenaReset
from .views import UsuarioLista
from .views import UsuarioNuevo
from .views import UsuarioEditar
from .views import UsuarioEditarContrasena
from .views import UsuarioPerfil
from .views import UsuarioPerfilContrasena

# Formularios:
from .forms import UserContrasenaNuevaForm

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
        r'^contrasena_reset/$',
        ContrasenaReset.as_view(),
        name='contrasena_reset'
    ),
    # Pantalla de restablecimiento de contrasena.
    url(
        r'^reset/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        auth_views.password_reset_confirm,
        {'template_name': 'registration/contrasena_reset_confirmar.html',
         'set_password_form': UserContrasenaNuevaForm},
        name='password_reset_confirm'
    ),
    # Mensaje 'success' de contrasena cambiada.
    url(
        r'^reset/done/$',
        auth_views.password_reset_complete,
        {'template_name': 'registration/contrasena_reset_completado.html'},
        name='password_reset_complete'
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
        r'^usuarios/(?P<pk>\d+)/editar/$',
        UsuarioEditar.as_view(),
        name="usuario_editar"
    ),
    url(
        r'^usuarios/(?P<pk>\d+)/editar/contrasena/$',
        UsuarioEditarContrasena.as_view(),
        name="usuario_editar_contrasena"
    ),
    url(
        r'^usuarios/(?P<pk>\d+)/perfil/$',
        UsuarioPerfil.as_view(),
        name="usuario_perfil"
    ),
    url(
        r'^usuarios/(?P<pk>\d+)/perfil/contrasena/$',
        UsuarioPerfilContrasena.as_view(),
        name="usuario_perfil_contrasena"
    ),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
