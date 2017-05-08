# -*- coding: utf-8 -*-
# Django:
from django.forms import ModelForm
from django import forms

#Forms django
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.forms import AdminPasswordChangeForm
from django.contrib.auth.forms import PasswordChangeForm

#Fields
from django.forms import TextInput
from django.forms import FileInput
from django.forms import CharField
from django.forms import DateInput
from django.forms import Select
from django.forms import PasswordInput
from django.forms import ChoiceField
from django.forms import ClearableFileInput
from django.forms import FileField

#Modelos
from django.contrib.auth.models import User
from .models import Profile
from ebs.models import VIEW_EMPLEADOS_SIMPLE


class UserFormFilter(forms.Form):
    usuario = CharField(label="Nombre de usuario:")
    usuario__first_name = CharField(label="Nombre:")
    usuario__last_name = CharField(label="Apellidos:")
    usuario__email = CharField(label="Email:")
    clave_rh = CharField(label="Clave RH:")
    usuario__date_joined_mayorque = CharField(
        label="Fecha de creación mayor a:")
    usuario__date_joined_menorque = CharField(
        label="Fecha de creación menor a:")


class UserNuevoForm(UserCreationForm):
    clave_rh = ChoiceField(label="Clave de empleado:", widget=Select(
        attrs={'class': 'form-control input-xs'}))
    clave_jde = CharField(label="Clave de jde:", widget=TextInput(
        attrs={'class': 'form-control input-xs'}))
    fecha_nacimiento = CharField(label='Fecha de nacimiento', widget=DateInput(
        attrs={'class': 'form-control input-xs', 'data-date-format': 'yyyy-mm-dd', 'readonly': 'True'}),)
    foto = CharField(label="Foto", widget=FileInput(
        attrs={'class': 'dropzone dz-clickable dz-started'}),)

    class Meta:
        model = User

        fields = [  # User
                    'username',
                    'first_name',
                    'last_name',
                    'email',
                    'is_active',
                    'is_staff',
                    'is_superuser',
                    # Profile
                    'clave_rh',
                    'clave_jde',
                    'fecha_nacimiento',
                    'foto',
        ]

        labels = {  # User
                    'username': 'Nombre de usuario',
                    'first_name': 'Nombre',
                    'last_name': 'Apellidos',
                    'email': 'Email',
                    'is_active': 'Activo',
                    'is_staff': 'Administrador',
                    'is_superuser': 'Todos los privilegios',
                    # Profile
                    'clave_rh': 'Clave de empleado',
                    'clave_jde': 'Clave jde',
                    'fecha_nacimiento': 'Fecha de nacimiento',
                    'foto': 'Foto',
        }

        widgets = {  # User
            'username': TextInput(attrs={'class': 'form-control input-xs'}),
            'first_name': TextInput(attrs={'class': 'form-control input-xs', 'readonly': 'True'}),
            'last_name': TextInput(attrs={'class': 'form-control input-xs', 'readonly': 'True'}),
            'email': TextInput(attrs={'class': 'form-control input-xs', 'readonly': 'True'}),
            # Profile
            'clave_rh': TextInput(attrs={'class': 'form-control input-xs'}),
        }

    def __init__(self, *args, **kwargs):
        super(UserNuevoForm, self).__init__(*args, **kwargs)
        self.fields['username'].widget.attrs.pop("autofocus", None)
        self.fields['clave_jde'].required = False
        self.fields['fecha_nacimiento'].required = False
        self.fields['foto'].required = False
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
    clave_rh = CharField(label="Clave de empleado:", widget=TextInput(
        attrs={'class': 'form-control input-xs', 'readonly': 'True'}))
    clave_jde = CharField(label="Clave de JDE:", widget=TextInput(
        attrs={'class': 'form-control input-xs', 'readonly': 'True'}))
    fecha_nacimiento = CharField(label='Fecha de nacimiento', widget=DateInput(
        attrs={'class': 'form-control input-xs', 'data-date-format': 'yyyy-mm-dd', 'readonly': 'True'}),)
    foto = FileField(label="Foto", widget=ClearableFileInput(
        attrs={'class': 'dropzone dz-clickable dz-started'}),)

    class Meta:
        model = User

        fields = [  # User
            'first_name',
            'last_name',
            'email',
            'is_active',
            'is_staff',
            'is_superuser',
            # Profile
            'clave_rh',
            'clave_jde',
            'fecha_nacimiento',
            'foto',
        ]

        labels = {'first_name': 'Nombre',
                  'last_name': 'Apellidos',
                  'email': 'Email',
                  'is_active': 'Activo',
                  'is_staff': 'Administrador',
                  'is_superuser': 'Todos los privilegios',
                  # Profile
                  'clave_rh': 'Clave de empleado',
                  'clave_jde': 'Clave de JDE',
                  'fecha_nacimiento': 'Fecha de nacimiento',
                  'foto': 'Foto',

                  }

        widgets = {'first_name': TextInput(attrs={'class': 'form-control input-xs', 'readonly': 'True'}),
                   'last_name': TextInput(attrs={'class': 'form-control input-xs', 'readonly': 'True'}),
                   'email': TextInput(attrs={'class': 'form-control input-xs'}),
                   }

    def __init__(self, *args, **kwargs):
        super(UserEditarForm, self).__init__(*args, **kwargs)
        self.fields['clave_jde'].required = False
        self.fields['fecha_nacimiento'].required = False
        self.fields['foto'].required = False


class UserEditarPerfilForm(ModelForm):
    clave_rh = CharField(label="Clave de empleado:", widget=TextInput(
        attrs={'class': 'form-control input-xs', 'readonly': 'True'}))
    clave_jde = CharField(label="Clave de JDE:", widget=TextInput(
        attrs={'class': 'form-control input-xs', 'readonly': 'True'}))
    fecha_nacimiento = CharField(label='Fecha de nacimiento', widget=DateInput(
        attrs={'class': 'form-control input-xs', 'data-date-format': 'yyyy-mm-dd', 'readonly': 'True'}),)
    foto = FileField(label="Foto", widget=ClearableFileInput(
        attrs={'class': 'dropzone dz-clickable dz-started'}),)

    class Meta:
        model = User

        fields = [  # User
                    'first_name',
                    'last_name',
                    'email',
                    # Profile
                    'clave_rh',
                    'clave_jde',
                    'fecha_nacimiento',
                    'foto',
                    ]

        labels = {'first_name': 'Nombre',
                  'last_name': 'Apellidos',
                  'email': 'Email',
                  # Profile
                  'clave_rh': 'Clave de empleado',
                  'clave_jde': 'Clave de JDE',
                  'fecha_nacimiento': 'Fecha de nacimiento',
                  'foto': 'Foto',
                  }

        widgets = {'first_name': TextInput(attrs={'class': 'form-control input-xs', 'readonly': 'True'}),
                   'last_name': TextInput(attrs={'class': 'form-control input-xs', 'readonly': 'True'}),
                   'email': TextInput(attrs={'class': 'form-control input-xs'}),
                   }

    def __init__(self, *args, **kwargs):
        super(UserEditarPerfilForm, self).__init__(*args, **kwargs)
        self.fields['clave_jde'].required = False
        self.fields['fecha_nacimiento'].required = False
        self.fields['foto'].required = False


class UserContrasenaNuevaForm(AdminPasswordChangeForm):
    password1 = CharField(label='Nueva contraseña', widget=PasswordInput(
        attrs={'class': 'form-control input-xs'}))
    password2 = CharField(label='Confirmar contraseña', widget=PasswordInput(
        attrs={'class': 'form-control input-xs'}))

    class Meta:
        model = User

        fields = ('password1', 'password2', )

class UserContrasenaNuevaPerfilForm(PasswordChangeForm):
    old_password = CharField(label='Contraseña actual', widget=PasswordInput(
        attrs={'class': 'form-control input-xs'}))
    password1 = CharField(label='Nueva contraseña', widget=PasswordInput(
        attrs={'class': 'form-control input-xs'}))
    password2 = CharField(label='Confirmar contraseña', widget=PasswordInput(
        attrs={'class': 'form-control input-xs'}))

    class Meta:
        model = User

        fields = ('old_password','password1', 'password2',)


class UserContrasenaActualForm(forms.Form):

    contrasena_actual = CharField(label="Actual",
                                  widget=forms.PasswordInput(
                                      attrs={'class': 'form-control input-xs'}))


# class UserContrasenaForm(forms.Form):

#     contrasena_nueva = CharField(label="Nueva",
#                                  widget=forms.PasswordInput(
#                                      attrs={'class': 'form-control input-xs'}))
#     confirmar = CharField(label="Confirmación:",
#                           widget=forms.PasswordInput(
#                               attrs={'class': 'form-control input-xs'})
#                           )
