# -*- coding: utf-8 -*-

# Python's Libraries
import re

# Django's Libraries
from django.views.generic.base import View

from django.shortcuts import render
from django.shortcuts import redirect
from django.shortcuts import get_object_or_404
from django.db import transaction

from django.core.urlresolvers import reverse
from django.core.mail import EmailMultiAlternatives

from django.contrib import messages
from django.urls import reverse_lazy
from django.template.loader import render_to_string

from django.contrib.auth import login
from django.contrib.auth import authenticate
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth.models import User
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.views import PasswordResetConfirmView
from django.contrib.auth.views import PasswordResetCompleteView

# Own's Libraries
from .models import Profile

from .forms import UserFilterForm
from .forms import UserNuevoForm
from .forms import UserRegistroForm
from .forms import UserEditarForm
from .forms import UserPerfilForm
from .forms import UserContrasenaActualForm
from .forms import UserContrasenaResetForm
from .forms import UserContrasenaResetConfirmForm
from .forms import UserGroupForm

from finanzas.business import ViaticoBusiness


class Login(View):

    template_name = 'login.html'

    def get(self, _request):

        if _request.user.is_authenticated():
            return redirect(
                reverse('home:inicio')
            )
        return render(_request, self.template_name, {})

    def post(self, _request):

        mensaje = ""

        usuario = _request.POST.get('usuario')
        contrasena = _request.POST.get('password')

        user_obj = authenticate(username=usuario, password=contrasena)

        if user_obj is not None:

            if user_obj.is_active:
                login(_request, user_obj)
                return redirect(
                    reverse('home:inicio')
                )
            else:
                mensaje = "Cuenta desactivada"
        else:
            mensaje = "Cuenta o contraseña no valida"

        contexto = {
            'mensaje': mensaje
        }

        return render(_request, self.template_name, contexto)


class Registro(View):

    template_name = 'registro.html'

    def get(self, _request):

        form_usuario = UserRegistroForm()

        contexto = {
            'form': form_usuario,
        }
        return render(_request, self.template_name, contexto)

    def post(self, _request):

        form_usuario = UserRegistroForm(_request.POST, _request.FILES)

        if form_usuario.is_valid():

            datos_formulario = form_usuario.cleaned_data

            usuario = User.objects.create_user(
                username=datos_formulario.get('username'),
                password=datos_formulario.get('password1')
            )

            usuario.first_name = datos_formulario.get('first_name')
            usuario.last_name = datos_formulario.get('last_name')
            usuario.email = datos_formulario.get('email')
            usuario.is_active = True
            usuario.is_staff = False
            usuario.is_superuser = False
            usuario.save()

            usuario.refresh_from_db()
            usuario.profile.clave_rh = datos_formulario.get('clave_rh')
            usuario.profile.clave_jde = datos_formulario.get('clave_jde')
            usuario.profile.fecha_nacimiento = datos_formulario.get(
                'fecha_nacimiento')
            usuario.profile.foto = datos_formulario.get('foto')
            usuario.save()

            contexto = {
                'first_name': usuario.first_name,
                'no_empleado': usuario.username
            }

            html_content = render_to_string("registro_email.html", contexto)
            text_content = render_to_string("registro_email.txt", contexto)

            subject = "Registro exitoso APPS - Nuvoil"
            from_email = "ti.nuvoil@gmail.com"
            to = usuario.email
            msg = EmailMultiAlternatives(
                subject, text_content, from_email, [to])
            msg.attach_alternative(html_content, "text/html")
            msg.send()

            return redirect(reverse('seguridad:usuario_registro_exito', kwargs={'_pk': usuario.pk}))

        contexto = {
            'form': form_usuario,
        }
        return render(_request, self.template_name, contexto)


class Perfil(View):

    template_name = 'perfil.html'

    def obtener_UrlImagen(self, _imagen):
        imagen = ''
        if _imagen:
            imagen = _imagen.url

        return imagen

    def get(self, _request, _username):
        usuario = get_object_or_404(User, username=_username)
        form_usuario = UserPerfilForm(
            initial={
                'first_name': usuario.first_name,
                'last_name': usuario.last_name,
                'email': usuario.email,
                'clave_rh': usuario.profile.clave_rh,
                'clave_jde': usuario.profile.clave_jde,
                'fecha_nacimiento': usuario.profile.fecha_nacimiento,
                'foto': usuario.profile.foto,
            },
            instance=usuario
        )
        contexto = {
            'form': form_usuario,
            'foto': self.obtener_UrlImagen(usuario.profile.foto),
        }
        return render(_request, self.template_name, contexto)

    @transaction.atomic
    def post(self, _request, _username):
        usuario = get_object_or_404(User, username=_username)

        form_usuario = UserPerfilForm(
            _request.POST, _request.FILES, instance=usuario)

        if form_usuario.is_valid():

            datos_formulario = form_usuario.cleaned_data

            usuario.first_name = datos_formulario.get('first_name')
            usuario.last_name = datos_formulario.get('last_name')
            usuario.email = datos_formulario.get('email')
            usuario.save()

            usuario.refresh_from_db()
            usuario.profile.clave_rh = datos_formulario.get('clave_rh')
            usuario.profile.clave_jde = datos_formulario.get('clave_jde')
            usuario.profile.fecha_nacimiento = usuario.profile.fecha_nacimiento

            if datos_formulario.get('foto') is not None:
                usuario.profile.foto.delete()
                usuario.profile.foto = datos_formulario.get('foto')

            usuario.profile.save()

            return redirect(reverse('seguridad:perfil', kwargs={'_pk': usuario.pk}))

        contexto = {
            'form': form_usuario,
            'foto': self.obtener_UrlImagen(usuario.profile.foto),
        }
        return render(_request, self.template_name, contexto)


class RegistroExito(View):

    template_name = 'registro_exito.html'

    def get(self, _request, _pk):

        usuario = User.objects.get(pk=_pk)

        contexto = {
            'record': usuario
        }

        return render(_request, self.template_name, contexto)


class ContrasenaReset(View):

    template_name = 'contrasena_reset.html'

    def get_OpcionesForReset(self, request, usuarios):
        opts = {
            'use_https': request.is_secure(),
            'token_generator': default_token_generator,
            'from_email': None,
            'email_template_name': 'contrasena_reset_email.html',
            'subject_template_name': 'contrasena_reset_subject.txt',
            'request': request,
            'html_email_template_name': None,
            'usuarios': usuarios,
        }

        return opts

    def get(self, _request):
        form = UserContrasenaResetForm()

        contexto = {
            'form': form,
        }
        return render(_request, self.template_name, contexto)

    def post(self, _request):
        form = UserContrasenaResetForm(_request.POST)

        if form.is_valid():

            dato = _request.POST['email']

            if not re.match(r"[^@]+@[^@]+\.[^@]+", dato):

                # Consulta la cuenta:
                usuarios = User.objects.filter(
                    username=dato,
                    is_active=True
                )

                if len(usuarios) > 0:
                    _request.POST._mutable = True
                    _request.POST['cuenta'] = usuarios[0].username
                    _request.POST._mutable = False

                    form.save(**self.get_OpcionesForReset(_request, usuarios))
                    messages.success(
                        _request,
                        'Se envio un link al correo %s con el cual podra cambiar su contraseña' % (
                            usuarios[0].email.encode('utf-8')
                        )
                    )

                else:
                    messages.error(
                        _request,
                        'El usuario/correo electronico no se encuentra aosciado a un usuario activo.'
                    )

            else:

                # Consultar correo:
                usuarios = User.objects.filter(
                    email=dato,
                    is_active=True
                )

                if len(usuarios) > 0:

                    form.save(**self.get_OpcionesForReset(_request, usuarios))

                    messages.success(
                        _request,
                        'Se envio un link al correo %s con el cual podra cambiar su contraseña' % (
                            dato.encode('utf-8')
                        )
                    )

                else:
                    messages.error(
                        _request,
                        'El usuario/correo electronico no se encuentra aosciado a un usuario activo.'
                    )

        contexto = {
            'form': form,
        }
        return render(_request, self.template_name, contexto)


class ContrasenaResetConfirm(PasswordResetConfirmView):
    form_class = UserContrasenaResetConfirmForm
    template_name = 'contrasena_reset_confirm.html'
    email_template_name = 'contrasena_reset_email.html'
    success_url = reverse_lazy('seguridad:contrasena_reset_complete')


class ContrasenaResetComplete(PasswordResetCompleteView):
    template_name = 'contrasena_reset_complete.html'


class UsuarioLista(View):

    def __init__(self):
        self.template_name = 'usuario/usuario_lista.html'

    def get(self, _request):

        form_profile = UserFilterForm()

        contexto = {'form': form_profile}
        return render(_request, self.template_name, contexto)


class UsuarioNuevo(View):

    def __init__(self):
        self.template_name = 'usuario/usuario_nuevo.html'

    def get(self, _request):

        form_usuario = UserNuevoForm()

        contexto = {
            'form': form_usuario,
        }
        return render(_request, self.template_name, contexto)

    def post(self, _request):

        form_usuario = UserNuevoForm(_request.POST, _request.FILES)

        if form_usuario.is_valid():

            datos_formulario = form_usuario.cleaned_data

            valor = datos_formulario.get('clave_rh')
            clave = Profile.objects.filter(clave_rh=valor)

            if not(valor and clave):

                usuario = User.objects.create_user(
                    username=datos_formulario.get('username'),
                    password=datos_formulario.get('password1')
                )

                usuario.first_name = datos_formulario.get('first_name')
                usuario.last_name = datos_formulario.get('last_name')
                usuario.email = datos_formulario.get('email')
                usuario.is_active = datos_formulario.get('is_active')
                usuario.is_staff = datos_formulario.get('is_staff')
                usuario.is_superuser = datos_formulario.get('is_superuser')
                usuario.save()

                usuario.profile.clave_rh = datos_formulario.get('clave_rh')
                usuario.profile.clave_jde = datos_formulario.get('clave_jde')
                usuario.profile.fecha_nacimiento = datos_formulario.get(
                    'fecha_nacimiento')
                usuario.profile.foto = datos_formulario.get('foto')
                usuario.profile.save()

                return redirect(reverse('seguridad:usuario_lista'))

        contexto = {
            'form': form_usuario,
        }
        return render(_request, self.template_name, contexto)


class UsuarioEditar(View):

    def __init__(self):
        self.template_name = 'usuario/usuario_editar.html'

    def obtener_UrlImagen(self, _imagen):
        imagen = ''
        if _imagen:
            imagen = _imagen.url
        return imagen

    def get(self, request, _pk):
        usuario_id = get_object_or_404(User, pk=_pk)
        form_usuario = UserEditarForm(
            initial={
                'username': usuario_id.username,
                'first_name': usuario_id.first_name,
                'last_name': usuario_id.last_name,
                'email': usuario_id.email,
                'is_active': usuario_id.is_active,
                'is_staff': usuario_id.is_staff,
                'is_superuser': usuario_id.is_superuser,
                'clave_rh': usuario_id.profile.clave_rh,
                'clave_jde': usuario_id.profile.clave_jde,
                'fecha_nacimiento': usuario_id.profile.fecha_nacimiento,
                'foto': usuario_id.profile.foto
            }
        )

        contexto = {
            'form': form_usuario,
            'foto': self.obtener_UrlImagen(usuario_id.profile.foto),
            'usuario': usuario_id,
        }
        return render(request, self.template_name, contexto)

    def post(self, request, _pk):
        usuario = get_object_or_404(User, pk=_pk)
        form_usuario = UserEditarForm(
            request.POST, request.FILES, instance=usuario)

        if form_usuario.is_valid():

            datos_formulario = form_usuario.cleaned_data

            usuario.first_name = datos_formulario.get('first_name')
            usuario.last_name = datos_formulario.get('last_name')
            usuario.email = datos_formulario.get('email')
            usuario.is_active = datos_formulario.get('is_active')
            usuario.is_staff = datos_formulario.get('is_staff')
            usuario.is_superuser = datos_formulario.get('is_superuser')
            usuario.save()

            usuario.profile.clave_rh = datos_formulario.get('clave_rh')
            usuario.profile.clave_jde = datos_formulario.get('clave_jde')
            usuario.profile.fecha_nacimiento = usuario.profile.fecha_nacimiento

            if datos_formulario.get('foto') is not None:
                usuario.profile.foto.delete()
                usuario.profile.foto = datos_formulario.get('foto')

            usuario.profile.save()

            return redirect(reverse('seguridad:usuario_lista'))

        contexto = {
            'form': form_usuario,
            'foto': self.obtener_UrlImagen(usuario.profile.foto),
            'usuario': usuario,
        }
        return render(request, self.template_name, contexto)


class UsuarioEditarContrasena(LoginRequiredMixin, View):

    template_name = 'usuario/usuario_editar_contrasena.html'

    def get(self, _request, _pk):
        usuario_id = get_object_or_404(User, pk=_pk)
        form_contrasena = UserContrasenaResetConfirmForm(usuario_id)

        contexto = {
            'form': form_contrasena,
            'usuario': usuario_id,
        }
        return render(_request, self.template_name, contexto)

    def post(self, _request, _pk):
        usuario = get_object_or_404(User, pk=_pk)

        form_contrasena = UserContrasenaResetConfirmForm(
            usuario, _request.POST)

        if form_contrasena.is_valid():
            usuario = form_contrasena.save()
            if usuario.id == _request.user.id:
                update_session_auth_hash(_request, form_contrasena.user)
            return redirect(reverse('seguridad:usuario_lista'))

        contexto = {
            'form': form_contrasena,
            'usuario': usuario,
        }
        return render(_request, self.template_name, contexto)


class UsuarioPerfil(View):

    template_name = 'usuario/usuario_perfil.html'

    def obtener_UrlImagen(self, _imagen):
        imagen = ''
        if _imagen:
            imagen = _imagen.url

        return imagen

    def get(self, _request, _pk):
        usuario = get_object_or_404(User, pk=_pk)
        form_usuario = UserPerfilForm(
            initial={
                'first_name': usuario.first_name,
                'last_name': usuario.last_name,
                'email': usuario.email,
                'clave_rh': usuario.profile.clave_rh,
                'clave_jde': usuario.profile.clave_jde,
                'fecha_nacimiento': usuario.profile.fecha_nacimiento,
                'foto': usuario.profile.foto,
            }
        )
        contexto = {
            'form': form_usuario,
            'foto': self.obtener_UrlImagen(usuario.profile.foto),
        }
        return render(_request, self.template_name, contexto)

    def post(self, _request, _pk):
        usuario = get_object_or_404(User, pk=_pk)

        form_usuario = UserPerfilForm(
            _request.POST, _request.FILES, instance=usuario)

        if form_usuario.is_valid():

            datos_formulario = form_usuario.cleaned_data

            usuario.first_name = datos_formulario.get('first_name')
            usuario.last_name = datos_formulario.get('last_name')
            usuario.email = datos_formulario.get('email')
            usuario.save()

            usuario.refresh_from_db()
            usuario.profile.clave_rh = datos_formulario.get('clave_rh')
            usuario.profile.clave_jde = datos_formulario.get('clave_jde')
            usuario.profile.fecha_nacimiento = usuario.profile.fecha_nacimiento

            if datos_formulario.get('foto') is not None:
                usuario.profile.foto.delete()
                usuario.profile.foto = datos_formulario.get('foto')

            usuario.profile.save()

            return redirect(reverse('seguridad:usuario_perfil', kwargs={'_pk': usuario.pk}))

        contexto = {
            'form': form_usuario,
            'foto': self.obtener_UrlImagen(usuario.profile.foto),
        }
        return render(_request, self.template_name, contexto)


class UsuarioPerfilContrasena(LoginRequiredMixin, View):

    template_name = 'usuario/usuario_perfil_contrasena.html'

    def get(self, _request, _pk):
        usuario_id = get_object_or_404(User, pk=_pk)
        form_contrasena_actual = UserContrasenaActualForm()
        form_contrasena_nueva = UserContrasenaResetConfirmForm(usuario_id)

        contexto = {
            'form': form_contrasena_actual,
            'form2': form_contrasena_nueva,
        }
        return render(_request, self.template_name, contexto)

    def post(self, _request, _pk):
        usuario = get_object_or_404(User, pk=_pk)

        form_contrasena_actual = UserContrasenaActualForm(_request.POST)
        form_contrasena_nueva = UserContrasenaResetConfirmForm(
            usuario, _request.POST)

        if form_contrasena_actual.is_valid() and form_contrasena_nueva.is_valid():
            dato_contrasena_actual = form_contrasena_actual.cleaned_data

            if usuario.check_password(dato_contrasena_actual.get('contrasena_actual')) is True:
                usuario = form_contrasena_nueva.save()
                update_session_auth_hash(_request, form_contrasena_nueva.user)
                return redirect(reverse('home:inicio'))
            else:
                messages.error(_request, 'La contraseña actual es incorrecta')

        contexto = {
            'form': form_contrasena_actual,
            'form2': form_contrasena_nueva,
        }
        return render(_request, self.template_name, contexto)


class AutorizacionLista(View):
    template_name = "autorizacion/lista.html"

    def get(self, _request):

        viaticos = ViaticoBusiness.get_ByAutorizar(_request.user.username)

        contexto = {
            'viaticos': viaticos
        }

        return render(_request, self.template_name, contexto)


class AutorizacionAprobar(View):
    template_name = "autorizacion/aprobar.html"

    def get(self, _request, _type, _pk):

        if _type == "viatico":
            documento = ViaticoBusiness.get_ViaticoCabecera(_pk)

        contexto = {
            'documento': documento
        }

        return render(_request, self.template_name, contexto)

    def post(self, _request, _type, _pk):

        if _type == "viatico":
            documento = ViaticoBusiness.get_ViaticoCabecera(_pk)

            try:
                ViaticoBusiness.autorizar(documento, _request.user)

                ViaticoBusiness.send_Mail_ToAprove(
                    "APPS: Viatico V-%s APROBADO de %s (%s)" % (
                        documento.id,
                        documento.empleado_descripcion,
                        documento.empleado_clave,
                    ),
                    "Se te informa que se ha APROBADO el viatico V-%s de %s (%s). Monto del viatico: %s pesos." % (
                        documento.id,
                        documento.empleado_descripcion,
                        documento.empleado_clave,
                        documento.importe_total,
                    ),
                    documento,
                    _request.user
                )

                return redirect(reverse('seguridad:autorizacion_lista'))

            except Exception as e:
                messages.error(_request, str(e))

        contexto = {
            'documento': documento
        }

        return render(_request, self.template_name, contexto)


class AutorizacionCancelar(View):
    template_name = "autorizacion/cancelar.html"

    def get(self, _request, _type, _pk):

        if _type == "viatico":
            documento = ViaticoBusiness.get_ViaticoCabecera(_pk)

        contexto = {
            'documento': documento
        }

        return render(_request, self.template_name, contexto)

    def post(self, _request, _type, _pk):

        if _type == "viatico":
            documento = ViaticoBusiness.get_ViaticoCabecera(_pk)

            try:
                ViaticoBusiness.cancelar(documento, _request.user)

                ViaticoBusiness.send_Mail_ToAprove(
                    "APPS: Viatico V-%s de %s (%s) fue CANCELADO" % (
                        documento.id,
                        documento.empleado_descripcion,
                        documento.empleado_clave,
                    ),
                    "Se te informa que se ha CANCELADO el viatico V-%s de %s (%s). Monto del viatico: %s pesos." % (
                        documento.id,
                        documento.empleado_descripcion,
                        documento.empleado_clave,
                        documento.importe_total,
                    ),
                    documento,
                    _request.user
                )

                return redirect(reverse('seguridad:autorizacion_lista'))

            except Exception as e:
                messages.error(_request, str(e))

        contexto = {
            'documento': documento
        }

        return render(_request, self.template_name, contexto)


class AutorizacionDone(View):
    template_name = "autorizacion/done.html"

    def get(self, _request):
        return render(_request, self.template_name, {})


class UsuarioGrupos(View):
    template_name = "usuario/usuario_grupos.html"
    # group = ['security', ]

    def get(self, _request, _pk):

        usuario = get_object_or_404(User, pk=_pk)
        form = UserGroupForm(instance=usuario)

        context = {
            'form': form
        }

        return render(_request, self.template_name, context)

    def post(self, _request, _pk):

        usuario = get_object_or_404(User, pk=_pk)

        form = UserGroupForm(
            data=_request.POST,
            instance=usuario)
        if form.is_valid():
            form.save()
            messages.success(_request, "Se actualizaron los grupos del usuario")

        context = {
            'form': form
        }
        return render(_request, self.template_name, context)
