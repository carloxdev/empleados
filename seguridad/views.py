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


class UsuarioLista(View):

    def __init__(self):
        self.template_name = 'usuarios/usuario_lista.html'

    def get(self, request):
        form_buscar = UserFormFilter()
        contexto = {'form': form_buscar}
        return render(request, self.template_name, contexto)


class UsuarioNuevo(CreateView):
    model = User
    second_model = Profile
    form_class = UserForm
    second_form_class = UsuarioForm
    template_name = 'usuarios/usuario_nuevo.html'
    success_url = reverse_lazy('seguridad:usuario_lista')

    def get_context_data(self, **kwargs):
        context = super(UsuarioNuevo, self).get_context_data(**kwargs)
        if 'form' not in context:
            context['form'] = self.form_class(self.request.GET)
        if 'form2' not in context:
            context['form2'] = self.second_form_class(self.request.GET)
        return context

    def post(self, request, *args, **kwargs):
        self.object = self.get_object
        form = self.form_class(request.POST)
        form2 = self.second_form_class(request.POST, request.FILES)
        if form.is_valid() and form2.is_valid():
            usuario = User.objects.create_user(
                username=form.cleaned_data.get('username'),
                password=form.cleaned_data.get('password')
            )
            usuario.first_name = form.cleaned_data.get('first_name')
            usuario.last_name = form.cleaned_data.get('last_name')
            usuario.email = form.cleaned_data.get('email')
            usuario.is_active = True
            usuario.is_staff = form.cleaned_data.get('is_staff')
            usuario.save()
            usuario.profile.fecha_nacimiento = form2.cleaned_data.get(
                'fecha_nacimiento')
            usuario.profile.clave_rh = form2.cleaned_data.get('clave_rh')
            usuario.profile.clave_jde = form2.cleaned_data.get('clave_jde')
            usuario.profile.foto = form2.cleaned_data.get('foto')
            usuario.profile.save()

            return redirect(reverse('seguridad:usuario_lista'))
        else:
            return self.render_to_response(self.get_context_data(form=form, form2=form2))


# class UsuarioEditar(UpdateView):
#     model = User
#     second_model = Profile
#     form_class = UserForm
#     second_form_class = UsuarioForm
#     template_name = 'usuarios/usuario_editar.html'
#     success_url = reverse_lazy('seguridad:usuario_lista')

#     def get_context_data(self, **kwargs):
#         context = super(UsuarioEditar, self).get_context_data(**kwargs)
#         pk = self.kwargs.get('pk', 0)
#         usuario = self.model.objects.get(id=pk)
#         profile = self.second_model.objects.get(id=usuario.id)
#         if 'form' not in context:
#             context['form'] = self.form_class()
#         if 'form2' not in context:
#             context['form2'] = self.second_form_class(instance=profile)
#         context['id'] = pk
#         return context

#     def post(self, request, *args, **kwargs):
#         self.object = self.get_object
#         id_usuario = kwargs['pk']
#         usuario = self.model.objects.get(id=id_usuario)
#         profile = self.second_model.objects.get(usuario=id_usuario)
#         form = self.form_class(request.POST, instance=usuario)
#         form2 = self.second_form_class(request.POST, instance=profile)
#         if form.is_valid() and form2.is_valid():
#             usuario = form.save()
#             profile = form2.save()
#             return HttpResponseRedirect(self.get_success_url())
#         else:
#             return HttpResponseRedirect(self.get_success_url())

class UsuarioEditar(View):

    def __init__(self):
        self.template_name = 'usuarios/usuario_editar.html'

    def get(self, request, pk):
        usuario_id = get_object_or_404(User, pk=pk)
        form_usuario = UserEditarForm(
            initial={
                'username': usuario_id.username,
                'first_name': usuario_id.first_name,
                'last_name': usuario_id.last_name,
                'email': usuario_id.email,
                'is_active': usuario_id.is_active
            }
        )

        form_perfil = UsuarioForm(instance=usuario_id.profile)

        contexto = {
            'form': form_usuario,
            'form2': form_perfil,
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
            usuario.is_staff = False

            if form_usuario.cleaned_data.get('password'):
                usuario.password = make_password(
                    form_usuario.cleaned_data.get('password'))

            usuario.save()
            usuario.profile = form_perfil.save()

            return redirect(reverse('seguridad:usuario_lista'))

        contexto = {
            'form': form_usuario,
            'form2': form_perfil,
        }
        return render(request, self.template_name, contexto)

# -------------- SEGURIDAD API REST -------------- #


class UserAPI(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ProfileAPI(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = ProfileFilter


class UserByPageAPI(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('username', 'is_active')
    pagination_class = GenericPagination


class ProfileByPageAPI(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = ProfileFilter
    pagination_class = GenericPagination
