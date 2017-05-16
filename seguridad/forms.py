# -*- coding: utf-8 -*-
# Django:
from django.forms import ModelForm
from django import forms

from django.contrib.auth import (
    authenticate, get_user_model, password_validation,
)

# Forms django
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.forms import AdminPasswordChangeForm
from django.contrib.auth.forms import PasswordResetForm

from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator


# Fields
from django.forms import TextInput
from django.forms import FileInput
from django.forms import CharField
from django.forms import DateInput
from django.forms import Select
from django.forms import PasswordInput
from django.forms import ChoiceField
from django.forms import ClearableFileInput
from django.forms import FileField

# Modelos
from django.contrib.auth.models import User
from ebs.models import VIEW_EMPLEADOS_SIMPLE

# ----------------- ADMINISTRADOR -------------------- #


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


# ----------------- USUARIO -------------------- #


class UserRegistroForm(UserCreationForm):
    clave_rh = ChoiceField(label="Clave de empleado:", widget=Select(
        attrs={'class': 'form-control input-xs'}))
    clave_jde = CharField(label="Clave de jde:", widget=TextInput(
        attrs={'class': 'form-control input-xs'}))
    fecha_nacimiento = CharField(label='Fecha de nacimiento', widget=DateInput(
        attrs={'class': 'form-control input-xs', 'data-date-format': 'yyyy-mm-dd', 'readonly': 'True'}),)
    foto = CharField(label="Foto", widget=FileInput(
        attrs={'class': 'dropzone dz-clickable dz-started'}),)
    password1 = CharField(label="Contraseña", widget=PasswordInput(
        attrs={'class': 'form-control input-xs'}),)
    password2 = CharField(label="Confirmar contraseña", widget=PasswordInput(
        attrs={'class': 'form-control input-xs'}),)

    class Meta:
        model = User

        fields = [  # User
                    'username',
                    'first_name',
                    'last_name',
                    'email',
                    # Profile
                    'clave_rh',
                    'clave_jde',
                    'fecha_nacimiento',
                    'foto',
                    'password1',
                    'password2',
        ]

        labels = {  # User
                    'username': 'Nombre de usuario',
                    'first_name': 'Nombre',
                    'last_name': 'Apellidos',
                    'email': 'Email',
                    # Profile
                    'clave_rh': 'Clave de empleado',
                    'clave_jde': 'Clave jde',
                    'fecha_nacimiento': 'Fecha de nacimiento',
                    'foto': 'Foto',
                    'password1': 'Contraseña',
                    'password2': 'Confirmar de contraseña',
        }

        widgets = {  # User
            'username': TextInput(attrs={'class': 'form-control input-xs'}),
            'first_name': TextInput(attrs={'class': 'form-control input-xs', 'readonly': 'True'}),
            'last_name': TextInput(attrs={'class': 'form-control input-xs', 'readonly': 'True'}),
            'email': TextInput(attrs={'class': 'form-control input-xs', 'readonly': 'True'}),
        }

    def __init__(self, *args, **kwargs):
        super(UserRegistroForm, self).__init__(*args, **kwargs)
        self.fields['username'].widget.attrs.pop("autofocus", None)
        self.fields['fecha_nacimiento'].required = False
        self.fields['clave_jde'].required = False
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
    password1 = CharField(label='Nueva contraseña',
                          widget=PasswordInput(
                              attrs={'class': 'form-control input-xs'}))
    password2 = CharField(label='Confirmar contraseña',
                          widget=PasswordInput(
                              attrs={'class': 'form-control input-xs'}))

    class Meta:
        model = User

        fields = ('password1', 'password2', )


class UserContrasenaActualForm(forms.Form):

    contrasena_actual = CharField(label="Actual",
                                  widget=forms.PasswordInput(
                                      attrs={'class': 'form-control input-xs'}))


class EmailForm(PasswordResetForm):

    email = CharField(label='',
                      widget=forms.TextInput(
                          attrs={'class': 'form-control input-xs'}))

    # Nombre de usuario
    def get_user_clave(self, email, cuenta):
        active_users = get_user_model()._default_manager.filter(
            email__iexact=email,
            username__iexact=cuenta,
            is_active=True
        )
        return (u for u in active_users if u.has_usable_password())

    # Email
    def get_users_email(self, email):
        active_users = get_user_model()._default_manager.filter(
            email__iexact=email,
            is_active=True
        )
        return (u for u in active_users if u.has_usable_password())

    def save(self, domain_override=None,
             subject_template_name='registration/password_reset_subject.txt',
             email_template_name='registration/password_reset_email.html',
             use_https=False,
             token_generator=default_token_generator,
             from_email=None,
             request=None,
             html_email_template_name=None,
             extra_email_context=None):

        if request.POST['usuario_clave']:
            cuenta = request.POST['usuario_clave']
            email = self.cleaned_data["email"]
            for user in self.get_user_clave(email, cuenta):
                if not domain_override:
                    current_site = get_current_site(request)
                    site_name = current_site.name
                    domain = current_site.domain
                else:
                    site_name = domain = domain_override
                context = {
                    'email': user.email,
                    'domain': domain,
                    'site_name': site_name,
                    'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                    'user': user,
                    'token': token_generator.make_token(user),
                    'protocol': 'https' if use_https else 'http',
                }
                if extra_email_context is not None:
                    context.update(extra_email_context)
                self.send_mail(
                    subject_template_name, email_template_name, context, from_email,
                    user.email, html_email_template_name=html_email_template_name,
                )
        elif request.POST['email']:
            email = request.POST['email']
            for user in self.get_users_email(email):
                if not domain_override:
                    current_site = get_current_site(request)
                    site_name = current_site.name
                    domain = current_site.domain
                else:
                    site_name = domain = domain_override
                context = {
                    'email': user.email,
                    'domain': domain,
                    'site_name': site_name,
                    'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                    'user': user,
                    'token': token_generator.make_token(user),
                    'protocol': 'https' if use_https else 'http',
                }
                if extra_email_context is not None:
                    context.update(extra_email_context)
                self.send_mail(
                    subject_template_name, email_template_name, context, from_email,
                    user.email, html_email_template_name=html_email_template_name,
                )
