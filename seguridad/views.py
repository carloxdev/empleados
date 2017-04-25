# -*- coding: utf-8 -*-

# Django Generic Views
from django.views.generic.base import View
from django.views.generic import TemplateView
from django.views.generic import CreateView
from django.views.generic import UpdateView
from django.views.generic import DetailView

# Django shortcuts
from django.shortcuts import render
from django.shortcuts import redirect
from django.core.urlresolvers import reverse
from django.core.urlresolvers import reverse_lazy
from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404

# Django Seguridad
from django.contrib.auth import authenticate
from django.contrib.auth import login

# Django autorizacion
from django.contrib.auth.hashers import make_password

# Modelos
from .models import Profile

# Otros Modelo
from django.contrib.auth.models import User

# Librerias de Terceros:
# Django API Rest
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend

# Serializadores:
from .serializers import UserSerializer
from .serializers import ProfileSerializer

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
#from .forms import ConfirmarForm


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

# --------------  PROFILE VIEWS -------------- #


class UsuarioDetalles(DetailView):
    model = User
    second_model = Profile
    template_name = 'usuarios/usuario_detalles.html'

    def get_context_data(self, **kwargs):
        context = super(UsuarioDetalles, self).get_context_data(**kwargs)
        pk = self.kwargs.get('pk', 0)
        usuario = self.model.objects.get(id=pk)
        profile = self.second_model.objects.get(id=usuario.id)
        context = {'usuario': usuario, 'profile': profile}
        return context


class UsuarioDetallesPerfil(View):

    def __init__(self):
        self.template_name = 'usuarios/usuario_perfil.html'

    def get(self, request):
        usuario = User.objects.get(id=request.user.id)
        perfil = Profile.objects.get(id=usuario.profile.id)
        contexto = {'usuario': usuario, 'profile': perfil}
        return render(request, self.template_name, contexto)


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
        #form_confirmar = ConfirmarForm()

        contexto = {
            'form': form_usuario,
            'form2': form_perfil,
        }
        return render(request, self.template_name, contexto)

    def post(self, request):
        form_usuario = UserForm(request.POST)
        form_perfil = UsuarioForm(request.POST, request.FILES)

        if form_usuario.is_valid() and form_perfil.is_valid():

            datos_formulario = form_usuario.cleaned_data

            usuario = User.objects.create_user(
                username=datos_formulario.get('username'),
                password=datos_formulario.get('password')
            )
            usuario.first_name = datos_formulario.get('first_name')
            usuario.last_name = datos_formulario.get('last_name')
            usuario.email = datos_formulario.get('email')
            usuario.is_active = datos_formulario.get('is_active')
            usuario.is_staff = datos_formulario.get('is_staff')

            if datos_formulario.get('is_staff'):
                usuario.is_superuser = True
            else:
                usuario.is_superuser = False

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
            contexto = {
                'form': form_usuario,
                'form2': form_perfil,
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

        form_usuario = UserEditarForm(request.POST, instance=usuario)

        form_perfil = UsuarioForm(
            request.POST, request.FILES, instance=usuario.profile)

        if form_usuario.is_valid() and form_perfil.is_valid():
            usuario.username = form_usuario.cleaned_data.get('username')
            usuario.first_name = form_usuario.cleaned_data.get('first_name')
            usuario.last_name = form_usuario.cleaned_data.get('last_name')
            usuario.email = form_usuario.cleaned_data.get('email')
            usuario.is_active = form_usuario.cleaned_data.get('is_active')
            usuario.is_staff = form_usuario.cleaned_data.get('is_staff')

            if form_usuario.cleaned_data.get('is_staff'):
                usuario.is_superuser = True
            else:
                usuario.is_superuser = False

            if form_usuario.cleaned_data.get('password'):
                usuario.password = make_password(form_usuario.cleaned_data.get('password'))

            usuario.save()
            usuario.profile = form_perfil.save()

            return redirect(reverse('seguridad:usuario_lista'))

        contexto = {
            'form': form_usuario,
            'form2': form_perfil,
            'foto': self.obtener_UrlImagen(usuario.profile.foto),
        }
        return render(request, self.template_name, contexto)


class UsuarioEditarPerfil(View):

    def __init__(self):
        self.template_name = 'usuarios/usuario_editar_perfil.html'

    def obtener_UrlImagen(self, _imagen):
        imagen = ''
        if _imagen:
            imagen = _imagen.url

        return imagen

    def get(self, request, pk):
        usuario_id = get_object_or_404(User, pk=pk)
        form_usuario = UserEditarPerfilForm(
            initial={
                'username': usuario_id.username,
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
            usuario.username = form_usuario.cleaned_data.get('username')
            usuario.first_name = form_usuario.cleaned_data.get('first_name')
            usuario.last_name = form_usuario.cleaned_data.get('last_name')
            usuario.email = form_usuario.cleaned_data.get('email')

            if form_usuario.cleaned_data.get('password'):
                usuario.password = make_password(
                    form_usuario.cleaned_data.get('password'))

            usuario.save()
            usuario.profile = form_perfil.save()

            return redirect(reverse('seguridad:usuario_lista'))

        contexto = {
            'form': form_usuario,
            'form2': form_perfil,
            'foto': self.obtener_UrlImagen(usuario.profile.foto),
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
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = ProfileFilter


class ProfileByPageAPI(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = ProfileFilter
    pagination_class = GenericPagination
