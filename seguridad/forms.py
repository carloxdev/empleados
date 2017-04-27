# -*- coding: utf-8 -*-
# Django:
from django.forms import ModelForm
from django import forms

from django.forms import TextInput
from django.forms import FileInput
from django.forms import CharField
from django.forms import DateInput
from django.forms import PasswordInput

from .models import User
from .models import Profile


class UserFormFilter(forms.Form):
    usuario = CharField(label="Nombre de usuario:")
    usuario__first_name = CharField(label="Nombre:")
    usuario__last_name = CharField(label="Apellidos:")
    usuario__email = CharField(label="Email:")
    clave_rh = CharField(label="Clave RH:")
    usuario__date_joined_mayorque = CharField(label="Fecha de creación mayor a:")
    usuario__date_joined_menorque = CharField(label="Fecha de creación menor a:")


class UserForm(ModelForm):

    def __init__(self, *args, **kwargs):
        super(UserForm, self).__init__(*args, **kwargs)
        self.fields['is_active'].initial = True

    class Meta:
        model = User

        fields = ['password',
                  'username',
                  'first_name',
                  'last_name',
                  'email',
                  'is_active',
                  'is_staff',
                  'last_login',
                  ]

        labels = {'password': 'Contraseña',
                  'username': 'Nombre de usuario',
                  'first_name': 'Nombre',
                  'last_name': 'Apellidos',
                  'email': 'Email',
                  'is_active': 'Estado',
                  'is_staff': 'Administrador',
                  'last_login': 'Ultima sesion',
                  }

        widgets = {'password': PasswordInput(attrs={'class': 'form-control input-xs'}),
                   'username': TextInput(attrs={'class': 'form-control input-xs'}),
                   'first_name': TextInput(attrs={'class': 'form-control input-xs'}),
                   'last_name': TextInput(attrs={'class': 'form-control input-xs'}),
                   'email': TextInput(attrs={'class': 'form-control input-xs'}),
                   }


class UsuarioForm(ModelForm):

    class Meta:
        model = Profile

        fields = ['clave_rh',
                  'clave_jde',
                  'fecha_nacimiento',
                  'foto',
                  ]

        labels = {'clave_rh': 'Clave rh',
                  'clave_jde': 'Clave jde',
                  'fecha_nacimiento': 'Fecha de nacimiento',
                  'foto': 'Foto',
                  }

        widgets = {'clave_rh': TextInput(attrs={'class': 'form-control input-xs'}),
                   'clave_jde': TextInput(attrs={'class': 'form-control input-xs'}),
                   'fecha_nacimiento': DateInput(attrs={'class': 'form-control input-xs', 'data-date-format': 'yyyy-mm-dd'}),
                   'foto': FileInput(attrs={'class': 'dropzone dz-clickable dz-started'}),
                   }


class UserEditarForm(ModelForm):

    def __init__(self, *args, **kwargs):
        super(UserEditarForm, self).__init__(*args, **kwargs)
        self.fields['password'].required = False

    class Meta:
        model = User

        fields = ['password',
                  'first_name',
                  'last_name',
                  'email',
                  'is_active',
                  'is_staff',
                  ]

        labels = {'password': 'Contraseña',
                  'first_name': 'Nombre',
                  'last_name': 'Apellidos',
                  'email': 'Email',
                  'is_active': 'Activo',
                  'is_staff': 'Administrador'
                  }

        widgets = {'password': PasswordInput(attrs={'class': 'form-control input-xs'}),
                   'first_name': TextInput(attrs={'class': 'form-control input-xs'}),
                   'last_name': TextInput(attrs={'class': 'form-control input-xs'}),
                   'email': TextInput(attrs={'class': 'form-control input-xs'}),
                   }


class UserEditarPerfilForm(ModelForm):

    def __init__(self, *args, **kwargs):
        super(UserEditarPerfilForm, self).__init__(*args, **kwargs)
        self.fields['password'].required = False

    class Meta:
        model = User

        fields = ['password',
                  'first_name',
                  'last_name',
                  'email',
                  ]

        labels = {'password': 'Contraseña',
                  'first_name': 'Nombre',
                  'last_name': 'Apellidos',
                  'email': 'Email',
                  }

        widgets = {'password': PasswordInput(attrs={'class': 'form-control input-xs'}),
                   'first_name': TextInput(attrs={'class': 'form-control input-xs'}),
                   'last_name': TextInput(attrs={'class': 'form-control input-xs'}),
                   'email': TextInput(attrs={'class': 'form-control input-xs'}),
                   }


class ConfirmarForm(forms.Form):
    confirmar = CharField(label="Confirmar contraseña:",
                          widget=forms.PasswordInput(
                              attrs={'class': 'form-control input-xs'})
                          )

class ConfirmarEditarForm(forms.Form):
    confirmar = CharField(label="Confirmar contraseña:",
                          required=False,
                          widget=forms.PasswordInput(
                              attrs={'class': 'form-control input-xs'})
                          )
