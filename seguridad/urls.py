from django.conf.urls import url
from django.conf import settings
from django.conf.urls.static import static

# Views
from .views import Login
from .views import UsuarioLista
from .views import UsuarioNuevo
from .views import UsuarioRegistro
from .views import UsuarioEditar
from .views import UsuarioPerfil
from .views import UsuarioCambiarContrasenaAdmin
from .views import UsuarioCambiarContrasenaPerfil

# Autentificacion
from django.contrib.auth import views as auth_views

# Forms correo
from .forms import UserContrasenaNuevaForm
from .forms import ClaveEmpleadoForm
from .forms import EmailForm

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
        UsuarioCambiarContrasenaAdmin.as_view(),
        name="usuario_cambiar_contrasena"
    ),
    url(
        r'^usuarios/(?P<pk>\d+)/perfil/$',
        UsuarioPerfil.as_view(),
        name="usuario_perfil"
    ),
    url(
        r'^usuarios/(?P<pk>\d+)/perfil/contrasena/$',
        UsuarioCambiarContrasenaPerfil.as_view(),
        name="usuario_cambiar_contrasena_perfil"
    ),
    url(
        r'^registro/$',
        UsuarioRegistro.as_view(),
        name="usuario_registro"
    ),

    # ------------------ Reset contrasena clave de empleado ------ #

    url(
        r'^reset/clave/$',
        auth_views.password_reset,
        {'template_name': 'registration/contrasena_reset_clave.html',
         'email_template_name': 'registration/contrasena_reset_email.html',
         'subject_template_name': 'registration/email_subject.txt',
         'password_reset_form': ClaveEmpleadoForm,
         'post_reset_redirect': 'seguridad:password_reset_done'},
        name="password_reset_clave"
    ),

    # ------------------ Reset contrasena email ------------------ #
    url(
        r'^reset/email/$',
        auth_views.password_reset,
        {'template_name': 'registration/contrasena_reset_form.html',
         'email_template_name': 'registration/contrasena_reset_email.html',
         'subject_template_name': 'registration/email_subject.txt',
         'password_reset_form': EmailForm,
         'post_reset_redirect': 'seguridad:password_reset_done'},
        name='password_reset'
    ),
    url(
        r'^reset/password_reset/done/$',
        auth_views.password_reset_done,
        {'template_name': 'registration/contrasena_reset_done.html'},
        name="password_reset_done"
    ),
    url(
        r'^reset/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        auth_views.password_reset_confirm,
        {'template_name': 'registration/contrasena_reset_confirmar.html',
         'set_password_form': UserContrasenaNuevaForm},
        name='password_reset_confirm'
    ),
    url(
        r'^reset/done/$',
        auth_views.password_reset_complete,
        {'template_name': 'registration/contrasena_reset_completado.html'},
        name='password_reset_complete'
    ),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
