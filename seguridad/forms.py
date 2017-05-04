# -*- coding: utf-8 -*-
# Django:
from django.forms import ModelForm
from django import forms

from django.forms import TextInput
from django.forms import FileInput
from django.forms import CharField
from django.forms import DateInput
from django.forms import Select
from django.forms import PasswordInput
from django.forms import ChoiceField

from .models import User
from .models import Profile
from ebs.models import VIEW_EMPLEADOS_SIMPLE


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
                  'is_superuser',
                  'last_login',
                  ]

        labels = {'password': 'Contraseña',
                  'username': 'Nombre de usuario',
                  'first_name': 'Nombre',
                  'last_name': 'Apellidos',
                  'email': 'Email',
                  'is_active': 'Activo',
                  'is_staff': 'Administrador',
                  'is_superuser': 'Acceso a todos los privilegios',
                  'last_login': 'Ultima sesion',
                  }

        widgets = {'password': PasswordInput(attrs={'class': 'form-control input-xs'}),
                   'username': TextInput(attrs={'class': 'form-control input-xs'}),

                   'first_name': TextInput(attrs={'class': 'form-control input-xs','readonly':'True'}),
                   'last_name': TextInput(attrs={'class': 'form-control input-xs','readonly':'True'}),
                   'email': TextInput(attrs={'class': 'form-control input-xs','readonly':'True'}),
                   } 


class UsuarioForm(ModelForm):
    clave_rh = ChoiceField(label="Clave de empleado:", widget=Select(attrs={'class': 'form-control input-xs'}))

    class Meta:
        model = Profile

        fields = ['clave_rh',
                  'clave_jde',
                  'fecha_nacimiento',
                  'foto',
                  ]

        labels = {'clave_rh': 'Clave de empleado',
                  'clave_jde': 'Clave jde',
                  'fecha_nacimiento': 'Fecha de nacimiento',
                  'foto': 'Foto',
                  }

        widgets = {
                   'clave_rh': TextInput(attrs={'class': 'form-control input-xs'}),
                   #'clave_jde': TextInput(attrs={'class': 'form-control input-xs'}),
                   'fecha_nacimiento': DateInput(attrs={'class': 'form-control input-xs', 'data-date-format': 'yyyy-mm-dd','readonly':'True'}),
                   'foto': FileInput(attrs={'class': 'dropzone dz-clickable dz-started'}),
                   }

    def __init__(self, *args, **kwargs):
        super(UsuarioForm, self).__init__(*args, **kwargs)
        self.fields['clave_rh'].choices = self.get_EmpleadosEbs()

    def get_EmpleadosEbs(self):

        valores = [('', '-------')]

        empleados = VIEW_EMPLEADOS_SIMPLE.objects.using('ebs_d').all()

        for empleado in empleados:

            descripcion = "%s - %s" % (
                empleado.pers_empleado_numero,
                empleado.pers_nombre_completo
            )

            valores.append(
                (
                    empleado.pers_empleado_numero,
                    descripcion,
                )
            )
        return valores


class UserEditarForm(ModelForm):

    class Meta:
        model = User

        fields = ['first_name',
                  'last_name',
                  'email',
                  'is_active',
                  'is_staff',
                  'is_superuser',
                  ]

        labels = {'first_name': 'Nombre',
                  'last_name': 'Apellidos',
                  'email': 'Email',
                  'is_active': 'Activo',
                  'is_staff': 'Administrador',
                  'is_superuser': 'Acceso a todos los privilegios',
                  }

        widgets = {'first_name': TextInput(attrs={'class': 'form-control input-xs','readonly':'True'}),
                   'last_name': TextInput(attrs={'class': 'form-control input-xs','readonly':'True'}),
                   'email': TextInput(attrs={'class': 'form-control input-xs'}),
                   }


class UserEditarPerfilForm(ModelForm):

    class Meta:
        model = User

        fields = ['first_name',
                  'last_name',
                  'email',
                  ]

        labels = {'first_name': 'Nombre',
                  'last_name': 'Apellidos',
                  'email': 'Email',
                  }

        widgets = {'first_name': TextInput(attrs={'class': 'form-control input-xs'}),
                   'last_name': TextInput(attrs={'class': 'form-control input-xs'}),
                   'email': TextInput(attrs={'class': 'form-control input-xs'}),
                   }


class UserContrasenaActualForm(forms.Form):

    contrasena_actual = CharField(label="Actual",
                                  widget=forms.PasswordInput(
                                      attrs={'class': 'form-control input-xs'}))


class UserContrasenaForm(forms.Form):

    contrasena_nueva = CharField(label="Nueva",
                                 widget=forms.PasswordInput(
                                     attrs={'class': 'form-control input-xs'}))


class ConfirmarForm(forms.Form):
    confirmar = CharField(label="Confirmación:",
                          widget=forms.PasswordInput(
                              attrs={'class': 'form-control input-xs'})
                          )
