# -*- coding: utf-8 -*-


# Django Generic Views
from django.shortcuts import render
from django.shortcuts import redirect
from django.core.urlresolvers import reverse

# Django Seguridad
from django.views.generic.base import View
from django.contrib.auth import authenticate
from django.contrib.auth import login

# Modelos
from .models import Profile

# Otros Modelos
from django.contrib.auth.models import User

# Django API Rest
from rest_framework import viewsets

# Serializadores:
from .serializers import UserSerializer
from .serializers import ProfileSerializer


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


class UserAPI(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ProfileAPI(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
