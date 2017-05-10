from django.conf.urls import url
from django.conf import settings
from django.conf.urls.static import static

# Views
from .views import Login
from .views import UsuarioLista
from .views import UsuarioNuevo
from .views import UsuarioRegistro
from .views import UsuarioEditar
from .views import UsuarioEditarPerfil
from .views import UsuarioCambiarContrasenaAdmin
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
    url(r'^usuarios/$', UsuarioLista.as_view(), name="usuario_lista"),
    url(r'^usuarios/nuevo/$', UsuarioNuevo.as_view(), name="usuario_nuevo"),
    url(r'^usuarios/(?P<pk>\d+)/editar/$', UsuarioEditar.as_view(), name="usuario_editar"),
    url(r'^usuarios/(?P<pk>\d+)/editar/contrasena/$',
        UsuarioCambiarContrasenaAdmin.as_view(), name="usuario_cambiar_contrasena"),
    url(r'^usuarios/(?P<pk>\d+)/perfil/$', UsuarioEditarPerfil.as_view(), name="usuario_editar_perfil"),
    url(r'^usuarios/(?P<pk>\d+)/perfil/contrasena/$',
        UsuarioCambiarContrasenaPerfil.as_view(), name="usuario_cambiar_contrasena_perfil"),
    url(r'^registro/$', UsuarioRegistro.as_view(), name="usuario_registro")
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
