# -*- coding: utf-8 -*-

# Django Generic Views
from django.views.generic.base import View

# Django shortcuts
from django.shortcuts import render
from django.shortcuts import redirect
from django.core.urlresolvers import reverse
from django.shortcuts import get_object_or_404

# Django Seguridad
from django.contrib.auth import authenticate
from django.contrib.auth import login
from django.utils.decorators import method_decorator
from django.core.exceptions import PermissionDenied
from django.contrib.auth.decorators import permission_required

# Django autorizacion
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password

# Modelos
from .models import Profile

# Otros Modelo
from django.contrib.auth.models import User
from ebs.models import VIEW_EMPLEADOS_SIMPLE

# Librerias de Terceros:
# Django API Rest
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend

# Serializadores:
from .serializers import UserSerializer
from .serializers import ProfileSerializer
from ebs.serializers import VIEW_EMPLEADOS_SIMPLE_Serializer

# Filters:
from .filters import ProfileFilter

# Paginacion
from .pagination import GenericPagination

# Modelos:
from .models import User
from .models import Profile

# Formularios:
from .forms import UserForm
from .forms import UsuarioForm
from .forms import UserFormFilter
from .forms import UserEditarForm
from .forms import UserEditarPerfilForm
from .forms import ConfirmarForm
from .forms import UserContrasenaForm
from .forms import UserContrasenaActualForm


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

# -------------- ADMINISTTRADOR VIEWS -------------- #


class UsuarioLista(View):

    def __init__(self):
        self.template_name = 'usuarios/usuario_lista.html'

    def get(self, request):
        form_buscar = UserFormFilter()
        contexto = {'form': form_buscar}
        return render(request, self.template_name, contexto)


class UsuarioNuevo(View):

    def __init__(self):
        self.template_name = 'usuarios/usuario_nuevo.html'

    def obtener_UrlImagen(self, _imagen):
        imagen = ''
        if _imagen:
            imagen = _imagen.url

        return imagen

    def get(self, request):
        form_usuario = UserForm()
        form_perfil = UsuarioForm()
        form_confirmar = ConfirmarForm()

        contexto = {
            'form': form_usuario,
            'form2': form_perfil,
            'form_pass': form_confirmar,
        }
        return render(request, self.template_name, contexto)

    def post(self, request):

        form_usuario = UserForm(request.POST)
        form_perfil = UsuarioForm(request.POST, request.FILES)
        form_pass = ConfirmarForm(request.POST)

        mensaje = True #Bandera confirmar contraseña
        mensaje_clave = False #Bandera ya existe usuario con la clave_rh

        if form_usuario.is_valid() and form_perfil.is_valid() and form_pass.is_valid():

            datos_formulario = form_usuario.cleaned_data
            dato_confirmar = form_pass.cleaned_data
            datos_perfil = form_perfil.cleaned_data

            valor = datos_perfil.get('clave_rh')
            clave = Profile.objects.filter(clave_rh = valor)

            if valor and clave:
                mensaje_clave = True
            else:
                if datos_formulario.get('password') == dato_confirmar.get('confirmar'):
                    usuario = User.objects.create_user(
                        username=datos_formulario.get('username'),
                        password=datos_formulario.get('password')
                    )

                    usuario.first_name = datos_formulario.get('first_name')
                    usuario.last_name = datos_formulario.get('last_name')
                    usuario.email = datos_formulario.get('email')
                    usuario.is_active = datos_formulario.get('is_active')
                    usuario.is_staff = datos_formulario.get('is_staff')
                    usuario.is_superuser = datos_formulario.get('is_superuser')

                    usuario.save()

                    datos_perfil = form_perfil.cleaned_data

                    usuario.profile.clave_rh = datos_perfil.get('clave_rh')
                    usuario.profile.clave_jde = datos_perfil.get('clave_jde')
                    usuario.profile.fecha_nacimiento = datos_perfil.get(
                        'fecha_nacimiento')
                    usuario.profile.foto = datos_perfil.get('foto')

                    usuario.profile.save()

                    return redirect(reverse('seguridad:usuario_lista'))
                else:
                    mensaje = False

        contexto = {
            'form': form_usuario,
            'form2': form_perfil,
            'form_pass': form_pass,
            'msj': mensaje,
            'msj_clave': mensaje_clave,
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
                'first_name': usuario_id.first_name,
                'last_name': usuario_id.last_name,
                'email': usuario_id.email,
                'is_active': usuario_id.is_active,
                'is_staff': usuario_id.is_staff,
                'is_superuser': usuario_id.is_superuser
            }
        )

        form_perfil = UsuarioForm(instance=usuario_id.profile)

        user = usuario_id

        contexto = {
            'form': form_usuario,
            'form2': form_perfil,
            'foto': self.obtener_UrlImagen(usuario_id.profile.foto),
            'user': user,
        }
        return render(request, self.template_name, contexto)

    def post(self, request, pk):
        usuario = get_object_or_404(User, pk=pk)

        form_usuario = UserEditarForm(request.POST, instance=usuario)

        form_perfil = UsuarioForm(
            request.POST, request.FILES, instance=usuario.profile)

        if form_usuario.is_valid() and form_perfil.is_valid():

            datos_formulario = form_usuario.cleaned_data

            usuario.first_name = datos_formulario.get('first_name')
            usuario.last_name = datos_formulario.get('last_name')
            usuario.email = datos_formulario.get('email')
            usuario.is_active = datos_formulario.get('is_active')
            usuario.is_staff = datos_formulario.get('is_staff')
            usuario.is_superuser = datos_formulario.get('is_superuser')
            
            usuario.save()
            usuario.profile = form_perfil.save()

            return redirect(reverse('seguridad:usuario_lista'))

        contexto = {
            'form': form_usuario,
            'form2': form_perfil,
            'foto': self.obtener_UrlImagen(usuario.profile.foto),
        }
        return render(request, self.template_name, contexto)


class UsuarioCambiarContrasena(View):

    def __init__(self):
        self.template_name = 'usuarios/usuario_contraseña.html'

    def get(self, request, pk):
        usuario_id = get_object_or_404(User, pk=pk)
        form_contrasena = UserContrasenaForm()
        form_confirmar = ConfirmarForm()

        user = usuario_id

        contexto = {
            'form_nuevo': form_contrasena,
            'form_pass': form_confirmar,
            'user': user,
        }
        return render(request, self.template_name, contexto)

    def post(self, request, pk):
        mensaje = True #Bandera para confirmacion de contraseña
        usuario = get_object_or_404(User, pk=pk)

        form_contrasena = UserContrasenaForm(request.POST)
        form_confirmar = ConfirmarForm(request.POST)

        if form_contrasena.is_valid() and form_confirmar.is_valid():
            dato_contrasena = form_contrasena.cleaned_data
            dato_confirmar = form_confirmar.cleaned_data
            if dato_contrasena.get('contrasena_nueva') == dato_confirmar.get('confirmar'):
                usuario.password = make_password(
                    dato_contrasena.get('contrasena_nueva'))
                usuario.save()
                return redirect(reverse('seguridad:usuario_lista'))
        else:
            mensaje = False

        contexto = {
            'form_nuevo': form_contrasena,
            'form_pass': form_confirmar,
            'msj': mensaje,
        }
        return render(request, self.template_name, contexto)


# -------------- USUARIO VIEWS -------------- #


class UsuarioEditarPerfil(View):

    def __init__(self):
        self.template_name = 'usuarios/usuario_editar_perfil.html'

    def obtener_UrlImagen(self, _imagen):
        imagen = ''
        if _imagen:
            imagen = _imagen.url

        return imagen

    def get(self, request):
        usuario_id = get_object_or_404(User, pk=request.user.id)
        form_usuario = UserEditarPerfilForm(
            initial={
                'first_name': usuario_id.first_name,
                'last_name': usuario_id.last_name,
                'email': usuario_id.email,
            }
        )

        form_perfil = UsuarioForm(instance=usuario_id.profile)

        contexto = {
            'form': form_usuario,
            'form2': form_perfil,
            'foto': self.obtener_UrlImagen(usuario_id.profile.foto),
        }
        return render(request, self.template_name, contexto)

    def post(self, request, pk):
        usuario = get_object_or_404(User, pk=pk)

        form_usuario = UserEditarPerfilForm(request.POST, instance=usuario)
        form_perfil = UsuarioForm(
            request.POST, request.FILES, instance=usuario.profile)

        if form_usuario.is_valid() and form_perfil.is_valid():

            datos_formulario = form_usuario.cleaned_data

            usuario.first_name = datos_formulario.get('first_name')
            usuario.last_name = datos_formulario.get('last_name')
            usuario.email = datos_formulario.get('email')

            usuario.save()
            usuario.profile = form_perfil.save()

            return redirect(reverse('seguridad:usuario_detalles_mi_perfil'))

        contexto = {
            'form': form_usuario,
            'form2': form_perfil,
            'foto': self.obtener_UrlImagen(usuario.profile.foto),
        }
        return render(request, self.template_name, contexto)


class UsuarioCambiarContrasenaPerfil(View):

    def __init__(self):
        self.template_name = 'usuarios/usuario_contraseña.html'

    def get(self, request, pk):
        usuario_id = get_object_or_404(User, pk=pk)
        form_contrasena_actual = UserContrasenaActualForm()
        form_contrasena_nueva = UserContrasenaForm()
        form_confirmar = ConfirmarForm()

        contexto = {
            'form_actual': form_contrasena_actual,
            'form_nuevo': form_contrasena_nueva,
            'form_pass': form_confirmar,
        }
        return render(request, self.template_name, contexto)

    def post(self, request, pk):
        mensaje = True #Bandera para confirmacion de contraseña
        validacion = True #Bandera para contraseña actual
        usuario = get_object_or_404(User, pk=pk)

        form_contrasena_actual = UserContrasenaActualForm(request.POST)
        form_contrasena_nueva = UserContrasenaForm(request.POST)
        form_confirmar = ConfirmarForm(request.POST)

        if form_contrasena_actual.is_valid() and form_contrasena_nueva.is_valid() and form_confirmar.is_valid():
            dato_contrasena_actual = form_contrasena_actual.cleaned_data
            dato_contrasena_nueva = form_contrasena_nueva.cleaned_data
            dato_confirmar = form_confirmar.cleaned_data

            if usuario.check_password(dato_contrasena_actual.get('contrasena_actual')) == True:
                if dato_contrasena_nueva.get('contrasena_nueva') == dato_confirmar.get('confirmar'):
                    usuario.password = make_password(dato_contrasena_nueva.get('contrasena_nueva'))
                    usuario.save()
                    return redirect(reverse('seguridad:logout'))
            else:
                validacion = False
        else:
            mensaje = False

        contexto = {
            'form_actual': form_contrasena_actual,
            'form_nuevo': form_contrasena_nueva,
            'form_pass': form_confirmar,
            'validacion': validacion,
            'msj': mensaje,
        }
        return render(request, self.template_name, contexto)


# -------------- SEGURIDAD API REST -------------- #

class UserAPI(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserByPageAPI(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('username', 'is_active')
    pagination_class = GenericPagination


class ProfileAPI(viewsets.ModelViewSet):
    queryset = Profile.objects.all().order_by('-usuario__date_joined')
    serializer_class = ProfileSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = ProfileFilter


class ProfileByPageAPI(viewsets.ModelViewSet):
    queryset = Profile.objects.all().order_by('-usuario__date_joined')
    serializer_class = ProfileSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = ProfileFilter
    pagination_class = GenericPagination


class ProfileExcelAPI(viewsets.ModelViewSet):
    queryset = Profile.objects.all().order_by('-usuario__date_joined')
    serializer_class = ProfileSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = ProfileFilter