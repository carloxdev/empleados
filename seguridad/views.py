# -*- coding: utf-8 -*-

# Django Generic Views
from django.views.generic.base import View
from django.views.generic import TemplateView
from django.views.generic import CreateView
from django.views.generic import UpdateView

# Django shortcuts
from django.shortcuts import render
from django.shortcuts import redirect
from django.core.urlresolvers import reverse
from django.core.urlresolvers import reverse_lazy
from django.http import HttpResponseRedirect

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

# Paginacion
from .pagination import GenericPagination

# Modelos:
from .models import User
from .models import Profile

# Formularios:
from .forms import UserForm
from .forms import UsuarioForm


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

class UsuarioLista(View):
    def __init__(self):
        self.model = User()
        self.second_model = Profile()
        self.template_name = 'usuarios/usuario_lista.html'

    def get(self, request):
        form = UserForm()
        second_form = UsuarioForm()
        contexto = { 'form': form }
        return render(request, self.template_name, contexto)

    def post(self, request):
        return render(request, self.template_name, {})

class UsuarioNuevo(CreateView):
    model = User
    second_model = Profile
    form_class = UserForm
    second_form_class = UsuarioForm
    template_name = 'usuarios/usuario_nuevo.html'
    success_url = reverse_lazy('seguridad:usuario_lista')

    def get_context_data(self,**kwargs):
        context = super(UsuarioNuevo,self).get_context_data(**kwargs)
        if 'form' not in context:
            context['form'] = self.form_class(self.request.GET)
        if 'form2' not in context:
            context['form2'] = self.second_form_class(self.request.GET)
        return context

    def post(self,request,*args,**kwargs):
        self.object = self.get_object
        form = self.form_class(request.POST)
        form2 = self.second_form_class(request.POST, request.FILES)
        if form.is_valid() and form2.is_valid():
            usuario = User.objects.create_user(
                username = form.cleaned_data.get('username'),
                password = form.cleaned_data.get('password')
                )
            usuario.first_name = form.cleaned_data.get('first_name')
            usuario.last_name = form.cleaned_data.get('last_name')
            usuario.email = form.cleaned_data.get('email')
            usuario.is_active = form.cleaned_data.get('is_active')
            usuario.is_staff = form.cleaned_data.get('is_staff')
            usuario.save()
            usuario.profile.fecha_nacimiento = form2.cleaned_data.get('fecha_nacimiento')
            usuario.profile.clave_rh = form2.cleaned_data.get('clave_rh')
            usuario.profile.clave_jde = form2.cleaned_data.get('clave_jde')
            usuario.profile.foto = form2.cleaned_data.get('foto')
            usuario.profile.save()

            return redirect(reverse('seguridad:usuario_lista'))
        else:
            return self.render_to_response(self.get_context_data(form=form,form2=form2))

class UsuarioEditar(UpdateView):
    model = User
    second_model = Profile
    form_class = UserForm
    second_form_class = UsuarioForm
    template_name = 'usuarios/usuario_editar.html'
    success_url = reverse_lazy('seguridad:usuario_lista')

    def get_context_data(self,**kwargs):
        context = super(UsuarioEditar,self).get_context_data(**kwargs)
        pk = self.kwargs.get('pk',0)
        usuario = self.model.objects.get(id=pk)
        profile = self.second_model.objects.get(id=usuario.id)
        if 'form' not in context:
            context['form'] = self.form_class()
        if 'form2' not in context:
            context['form2'] = self.second_form_class(instance = profile)
        context['id'] = pk
        return context

    def post(self,request,*args,**kwargs):
        self.object = self.get_object
        id_usuario = kwargs['pk']
        usuario = self.model.objects.get(id=id_usuario)
        profile = self.second_model.objects.get(id=profile.id_usuario)
        form = self.form_class(request.POST, instance=profile)
        form2 = self.second_form_class(request.POST,instance=usuario)
        if form.is_valid() and form2.is_valid():
            form.save()
            form2.save()
            return HttpResponseRedirect(self.get_success_url())
        else:
            return HttpResponseRedirect(self.get_success_url())



# -------------- SEGURIDAD API REST -------------- #

class UserAPI(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ProfileAPI(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

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
    pagination_class = GenericPagination
