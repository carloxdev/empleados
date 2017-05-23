# -*- coding: utf-8 -*-

# Librerias Python
import re

# Librerias Django

# Generic Views:
from django.views.generic.base import View

# Shortcuts:
from django.shortcuts import render
from django.shortcuts import redirect
from django.shortcuts import get_object_or_404
from django.core.urlresolvers import reverse
from django.contrib import messages

# Seguridad:
from django.contrib.auth import login
from django.contrib.auth import authenticate
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth.models import User
from django.contrib.auth.mixins import LoginRequiredMixin


# Librerias Propias

# Modelos:
from .models import Profile

# Formularios:
from .forms import UserFormFilter
from .forms import UserNuevoForm
from .forms import UserRegistroForm
from .forms import UserEditarForm
from .forms import UserEditarPerfilForm
from .forms import UserContrasenaActualForm
from .forms import UserContrasenaNuevaForm
from .forms import EmailForm


class Login(View):

    def __init__(self):
        self.template_name = 'login.html'

    def get(self, request):

        if request.user.is_authenticated():
            return redirect(
                reverse('home:inicio')
            )
        return render(request, self.template_name, {})

    def post(self, request):

        mensaje = ""

        usuario = request.POST.get('usuario')
        contrasena = request.POST.get('password')

        user_obj = authenticate(username=usuario, password=contrasena)

        if user_obj is not None:

            if user_obj.is_active:
                login(request, user_obj)
                return redirect(
                    reverse('home:inicio')
                )
            else:
                mensaje = "Cuenta desactivada"
        else:
            mensaje = "Cuenta usuario o contraseña no valida"

        contexto = {
            'mensaje': mensaje
        }

        return render(request, self.template_name, contexto)


class Registro(View):

    def __init__(self):
        self.template_name = 'registro.html'

    def get(self, request):

        form_usuario = UserRegistroForm()

        contexto = {
            'form': form_usuario,
        }
        return render(request, self.template_name, contexto)

    def post(self, request):

        form_usuario = UserRegistroForm(request.POST, request.FILES)

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
                usuario.is_active = True
                usuario.is_staff = False
                usuario.is_superuser = False
                usuario.save()

                usuario.profile.clave_rh = datos_formulario.get('clave_rh')
                usuario.profile.clave_jde = datos_formulario.get('clave_jde')
                usuario.profile.fecha_nacimiento = datos_formulario.get(
                    'fecha_nacimiento')
                usuario.profile.foto = datos_formulario.get('foto')
                usuario.profile.save()

                return redirect(reverse('home:inicio'))
            else:
                messages.error(
                    request, 'La clave de empleado ya se encuentra asociada a una cuenta')

        contexto = {
            'form': form_usuario,
        }
        return render(request, self.template_name, contexto)


class ResetContrasena(View):

    def __init__(self):
        self.template_name = 'registration/contrasena_reset_form.html'

    def get(self, request):
        form = EmailForm()

        contexto = {
            'form': form,
        }
        return render(request, self.template_name, contexto)

    def post(self, request):
        form = EmailForm(request.POST)
        dato = request.POST['email']

        # Filtrado por "Nombre de usuario"
        if User.objects.filter(username=dato).exists():
            usuario = User.objects.get(username=dato)
            request.POST._mutable = True
            request.POST['usuario_clave'] = usuario.username
            request.POST['email'] = usuario.email
            request.POST._mutable = False

            if form.is_valid():

                opts = {
                    'use_https': request.is_secure(),
                    'token_generator': default_token_generator,
                    'from_email': None,
                    'email_template_name': 'registration/contrasena_reset_email.html',
                    'subject_template_name': 'registration/email_subject.txt',
                    'request': request,
                    'html_email_template_name': None,
                }
                form.save(**opts)

                messages.success(
                    request, 'El correo a sido enviado exitosamente')

        # Filtrado por "Correo electronico"
        elif User.objects.filter(email=dato).exists():

            request.POST._mutable = True
            request.POST['usuario_clave'] = ""
            request.POST._mutable = False

            if form.is_valid():
                opts = {
                    'use_https': request.is_secure(),
                    'token_generator': default_token_generator,
                    'from_email': None,
                    'email_template_name': 'registration/contrasena_reset_email.html',
                    'subject_template_name': 'registration/email_subject.txt',
                    'request': request,
                    'html_email_template_name': None,
                }
                form.save(**opts)

            messages.success(
                request, 'El correo a sido enviado exitosamente')
        else:
            messages.error(
                request, 'El usuario/correo electronico no se encuentra aosciado a un usuario.')

        contexto = {
            'form': form,
        }
        return render(request, self.template_name, contexto)


class UsuarioLista(View):

    def __init__(self):
        self.template_name = 'usuarios/usuario_lista.html'

    def get(self, request):

        form_profile = UserFormFilter()

        contexto = {'form': form_profile}
        return render(request, self.template_name, contexto)


class UsuarioNuevo(View):

    def __init__(self):
        self.template_name = 'usuarios/usuario_nuevo.html'

    def get(self, request):

        form_usuario = UserNuevoForm()

        contexto = {
            'form': form_usuario,
        }
        return render(request, self.template_name, contexto)

    def post(self, request):

        form_usuario = UserNuevoForm(request.POST, request.FILES)

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
        return render(request, self.template_name, contexto)


class UsuarioEditar(View):

    def __init__(self):
        self.template_name = 'usuarios/usuario_editar.html'

    def obtener_UrlImagen(self, _imagen):
        imagen = ''
        if _imagen:
            imagen = _imagen.url

        return imagen

    def get(self, request, pk):
        usuario_id = get_object_or_404(User, pk=pk)
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
        }
        return render(request, self.template_name, contexto)

    def post(self, request, pk):
        usuario = get_object_or_404(User, pk=pk)
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
                usuario.profile.foto = datos_formulario.get('foto')

            usuario.profile.save()

            return redirect(reverse('seguridad:usuario_lista'))

        contexto = {
            'form': form_usuario,
            'foto': self.obtener_UrlImagen(usuario.profile.foto),
        }
        return render(request, self.template_name, contexto)


class UsuarioEditarContrasena(LoginRequiredMixin, View):

    def __init__(self):
        self.template_name = 'usuarios/usuario_editar_contrasena.html'

    def get(self, request, pk):
        usuario_id = get_object_or_404(User, pk=pk)
        form_contrasena = UserContrasenaNuevaForm(usuario_id)

        user = usuario_id

        contexto = {
            'form': form_contrasena,
            'user': user,
        }
        return render(request, self.template_name, contexto)

    def post(self, request, pk):
        usuario = get_object_or_404(User, pk=pk)

        form_contrasena = UserContrasenaNuevaForm(usuario, request.POST)

        if form_contrasena.is_valid():
            usuario = form_contrasena.save()
            if usuario.id == request.user.id:
                update_session_auth_hash(request, form_contrasena.user)
            return redirect(reverse('seguridad:usuario_lista'))

        contexto = {
            'form': form_contrasena,
        }
        return render(request, self.template_name, contexto)


class UsuarioPerfil(View):

    def __init__(self):
        self.template_name = 'usuarios/usuario_perfil.html'

    def obtener_UrlImagen(self, _imagen):
        imagen = ''
        if _imagen:
            imagen = _imagen.url

        return imagen

    def get(self, request, pk):
        usuario_id = get_object_or_404(User, pk=pk)
        form_usuario = UserEditarPerfilForm(
            initial={
                'first_name': usuario_id.first_name,
                'last_name': usuario_id.last_name,
                'email': usuario_id.email,
                'clave_rh': usuario_id.profile.clave_rh,
                'clave_jde': usuario_id.profile.clave_jde,
                'fecha_nacimiento': usuario_id.profile.fecha_nacimiento,
                'foto': usuario_id.profile.foto,
            }
        )
        contexto = {
            'form': form_usuario,
            'foto': self.obtener_UrlImagen(usuario_id.profile.foto),
        }
        return render(request, self.template_name, contexto)

    def post(self, request, pk):
        usuario = get_object_or_404(User, pk=pk)

        form_usuario = UserEditarPerfilForm(
            request.POST, request.FILES, instance=usuario)

        if form_usuario.is_valid():

            datos_formulario = form_usuario.cleaned_data

            usuario.first_name = datos_formulario.get('first_name')
            usuario.last_name = datos_formulario.get('last_name')
            usuario.email = datos_formulario.get('email')
            usuario.save()

            usuario.profile.clave_rh = datos_formulario.get('clave_rh')
            usuario.profile.clave_jde = datos_formulario.get('clave_jde')
            usuario.profile.fecha_nacimiento = usuario.profile.fecha_nacimiento

            if datos_formulario.get('foto') is not None:
                usuario.profile.foto = datos_formulario.get('foto')

            usuario.profile.save()

            return redirect(reverse('home:inicio'))

        contexto = {
            'form': form_usuario,
            'foto': self.obtener_UrlImagen(usuario.profile.foto),
        }
        return render(request, self.template_name, contexto)


class UsuarioPerfilContrasena(LoginRequiredMixin, View):

    def __init__(self):
        self.template_name = 'usuarios/usuario_perfil_contrasena.html'

    def get(self, request, pk):
        usuario_id = get_object_or_404(User, pk=pk)
        form_contrasena_actual = UserContrasenaActualForm()
        form_contrasena_nueva = UserContrasenaNuevaForm(usuario_id)

        user = usuario_id

        contexto = {
            'form': form_contrasena_actual,
            'form2': form_contrasena_nueva,
            'user': user,
        }
        return render(request, self.template_name, contexto)

    def post(self, request, pk):
        usuario = get_object_or_404(User, pk=pk)

        form_contrasena_actual = UserContrasenaActualForm(request.POST)
        form_contrasena_nueva = UserContrasenaNuevaForm(usuario, request.POST)

        if form_contrasena_actual.is_valid() and form_contrasena_nueva.is_valid():
            dato_contrasena_actual = form_contrasena_actual.cleaned_data

            if usuario.check_password(dato_contrasena_actual.get('contrasena_actual')) is True:
                usuario = form_contrasena_nueva.save()
                update_session_auth_hash(request, form_contrasena_nueva.user)
                return redirect(reverse('home:inicio'))
            else:
                messages.error(request, 'La contraseña actual es incorrecta')

        contexto = {
            'form': form_contrasena_actual,
            'form2': form_contrasena_nueva,
        }
        return render(request, self.template_name, contexto)
