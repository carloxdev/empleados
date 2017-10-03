# -*- coding: utf-8 -*-

# Django's Libraries
from django.forms import ModelForm
from django import forms

# from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.forms import AdminPasswordChangeForm
from django.contrib.auth.forms import PasswordResetForm
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth.models import User

from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes

from django.forms import TextInput
from django.forms import FileInput

from django.forms import CharField
from django.forms import DateField
from django.forms import ChoiceField
from django.forms import FileField
from django.forms import BooleanField

from django.forms import HiddenInput
from django.forms import DateInput
from django.forms import PasswordInput
from django.forms import CheckboxInput
from django.forms import Select
from django.forms import ClearableFileInput

from django.forms import ValidationError

# Third-party Libraries
from dateutil import parser

# Own's Libraries
from ebs.business import EmpleadoBusiness


class UserRegistroForm(UserCreationForm):

    clave_rh = ChoiceField(
        label="Id Empleado",
        widget=Select(
            attrs={'class': 'form-control input-xs'}
        )
    )
    clave_jde = CharField(
        label="Clave de JDE",
        widget=HiddenInput()
    )
    foto = FileField(
        label="Foto",
        widget=ClearableFileInput(
            attrs={'class': 'dropzone dz-clickable dz-started'}
        ),
    )
    password1 = CharField(
        label="Contraseña",
        widget=PasswordInput(
            attrs={'class': 'form-control input-xs'}
        )
    )
    password2 = CharField(
        label="Confirmar Contraseña",
        widget=PasswordInput(
            attrs={'class': 'form-control input-xs'}
        )
    )
    rfc = CharField(
        label="RFC",
        widget=TextInput(
            attrs={'class': 'form-control input-xs'}
        )
    )
    fecha_nacimiento = DateField(
        widget=HiddenInput()
    )

    accept_terms = BooleanField(
        widget=CheckboxInput()
    )

    class Meta:
        model = User

        fields = [
            'username',
            'first_name',
            'last_name',
            'email',

            'clave_rh',
            'clave_jde',
            'foto',
            'password1',
            'password2',
            'rfc',
            'accept_terms'
        ]

        labels = {
            'username': 'Cuenta',
            'first_name': 'Nombre',
            'last_name': 'Apellidos',
            'email': 'Email',
        }

        widgets = {
            'username': HiddenInput(attrs={'class': 'form-control input-xs'}),
            'first_name': HiddenInput(attrs={'class': 'form-control input-xs', 'readonly': 'True'}),
            'last_name': HiddenInput(attrs={'class': 'form-control input-xs', 'readonly': 'True'}),
            'email': TextInput(attrs={'class': 'form-control input-xs', 'required': 'required'}),
        }

    def __init__(self, *args, **kwargs):
        super(UserRegistroForm, self).__init__(*args, **kwargs)
        self.fields['username'].required = False
        self.fields['first_name'].required = False
        self.fields['last_name'].required = False
        self.fields['email'].required = True
        self.fields['rfc'].required = True
        self.fields[
            'clave_rh'].choices = EmpleadoBusiness.get_SinUsuario_ForSelect()
        self.fields['clave_jde'].required = False
        self.fields['foto'].required = False
        self.fields['fecha_nacimiento'].required = False
        self.fields['accept_terms'].required = True

    def clean(self):
        cleaned_data = super(UserRegistroForm, self).clean()
        clave_rh = cleaned_data.get("clave_rh")
        rfc = cleaned_data.get("rfc")

        password1 = cleaned_data.get("password1")
        password2 = cleaned_data.get("password2")
        email = cleaned_data.get("email")
        accept_terms = cleaned_data.get("accept_terms")

        if clave_rh and rfc and email and password1 and password2 and accept_terms:

            try:

                datos = EmpleadoBusiness.get_ByNumero(clave_rh)
            except Exception as error:
                raise ValidationError(
                    str(error)
                )

            if datos.pers_empleado_numero:

                ebs_rfc = datos.pers_rfc.replace("-", "")
                rfc = rfc.replace("-", "").upper()

                if ebs_rfc != rfc:
                    raise ValidationError(
                        'No existe un usuario con el RFC proporcionado')

                username = datos.pers_empleado_numero
                first_name = "%s %s" % (
                    datos.pers_primer_nombre, datos.pers_segundo_nombre.replace("-", ""))
                last_name = "%s %s" % (
                    datos.pers_apellido_paterno, datos.pers_apellido_materno.replace("-", ""))

                self.cleaned_data["username"] = username
                self.cleaned_data["first_name"] = first_name
                self.cleaned_data["last_name"] = last_name

                fecha = parser.parse(datos.pers_fecha_nacimiento)
                self.cleaned_data["fecha_nacimiento"] = fecha.date()

                return self.cleaned_data

            else:
                raise ValidationError(
                    "El empleado no tiene un numero especificado"
                )


class UserFilterForm(forms.Form):
    usuario = CharField(
        label="Clave:",
        widget=TextInput(
            attrs={'class': 'form-control input-xs'}
        )
    )
    usuario__first_name = CharField(
        label="Nombre:",
        widget=TextInput(
            attrs={'class': 'form-control input-xs'}
        )
    )
    usuario__last_name = CharField(
        label="Apellidos:",
        widget=TextInput(
            attrs={'class': 'form-control input-xs'}
        )
    )
    usuario__email = CharField(
        label="Email:",
        widget=TextInput(
            attrs={'class': 'form-control input-xs'}
        )
    )
    clave_rh = CharField(
        label="Clave RH:",
        widget=TextInput(
            attrs={'class': 'form-control input-xs'}
        )
    )
    created_date_mayorque = CharField(
        widget=TextInput(
            attrs={'class': 'form-control input-xs', 'readonly': 'readonly'})
    )
    created_date_menorque = CharField(
        widget=TextInput(
            attrs={'class': 'form-control input-xs', 'readonly': 'readonly'})
    )


class UserNuevoForm(UserCreationForm):
    password1 = CharField(
        label="Contraseña",
        widget=PasswordInput(
            attrs={'class': 'form-control input-xs'}
        )
    )
    password2 = CharField(
        label="Confirmacion",
        widget=PasswordInput(
            attrs={'class': 'form-control input-xs'}
        )
    )
    clave_rh = ChoiceField(
        label="Clave de empleado:",
        widget=Select(
            attrs={'class': 'form-control input-xs'}
        )
    )
    clave_jde = CharField(
        label="Clave de jde:",
        widget=TextInput(
            attrs={'class': 'form-control input-xs'}
        )
    )
    fecha_nacimiento = CharField(
        label='Fecha de nacimiento',
        widget=DateInput(
            attrs={'class': 'form-control input-xs',
                   'data-date-format': 'yyyy-mm-dd', 'readonly': 'True'}
        ),
    )
    foto = CharField(
        label="Foto",
        widget=FileInput(
            attrs={'class': 'dropzone dz-clickable dz-started'}
        )
    )

    class Meta:
        model = User

        fields = [
            'username',
            'first_name',
            'last_name',
            'email',
            'is_active',
            'is_staff',
            'is_superuser',
            'password1',
            'password2',
            'clave_rh',
            'clave_jde',
            'fecha_nacimiento',
            'foto',
        ]

        labels = {
            'username': 'Nombre de usuario',
            'first_name': 'Nombre',
            'last_name': 'Apellidos',
            'email': 'Email',
            'is_active': 'Activo',
            'is_staff': 'Administrador',
            'is_superuser': 'Todos los privilegios',
            'password1': 'Contraseña',
            'password2': 'Confirmación',
            'clave_rh': 'Clave de empleado',
            'clave_jde': 'Clave jde',
            'fecha_nacimiento': 'Fecha de nacimiento',
            'foto': 'Foto',
        }

        widgets = {
            'username': TextInput(attrs={'class': 'form-control input-xs'}),
            'first_name': TextInput(attrs={'class': 'form-control input-xs', 'readonly': 'True'}),
            'last_name': TextInput(attrs={'class': 'form-control input-xs', 'readonly': 'True'}),
            'email': TextInput(attrs={'class': 'form-control input-xs', 'readonly': 'True'}),
        }

    def __init__(self, *args, **kwargs):
        super(UserNuevoForm, self).__init__(*args, **kwargs)
        self.fields['username'].widget.attrs.pop("autofocus", None)
        self.fields['first_name'].required = True
        self.fields['last_name'].required = True
        self.fields['clave_jde'].required = False
        self.fields['fecha_nacimiento'].required = True
        self.fields['foto'].required = False
        self.fields[
            'clave_rh'].choices = EmpleadoBusiness.get_Activos_ForSelect()


class UserEditarForm(ModelForm):
    clave_rh = CharField(
        label="Clave de empleado:",
        widget=TextInput(
            attrs={'class': 'form-control input-xs', 'readonly': 'True'}
        )
    )
    clave_jde = CharField(
        label="Clave de JDE:",
        widget=TextInput(
            attrs={'class': 'form-control input-xs', 'readonly': 'True'}
        )
    )
    fecha_nacimiento = CharField(
        label='Fecha de nacimiento',
        widget=DateInput(
            attrs={
                'class': 'form-control input-xs',
                'data-date-format': 'yyyy-mm-dd',
                'readonly': 'True'
            }
        ),
    )
    foto = FileField(
        label="Foto",
        widget=ClearableFileInput(
            attrs={'class': 'dropzone dz-clickable dz-started'}
        ),
    )

    class Meta:
        model = User

        fields = [
            'first_name',
            'last_name',
            'email',
            'is_active',
            'is_staff',
            'is_superuser',
            'clave_rh',
            'clave_jde',
            'fecha_nacimiento',
            'foto',
        ]

        labels = {
            'first_name': 'Nombre',
            'last_name': 'Apellidos',
            'email': 'Email',
            'is_active': 'Activo',
            'is_staff': 'Administrador',
            'is_superuser': 'Todos los privilegios',
            'clave_rh': 'Clave de empleado',
            'clave_jde': 'Clave de JDE',
            'fecha_nacimiento': 'Fecha de nacimiento',
            'foto': 'Foto',
        }

        widgets = {
            'first_name': TextInput(attrs={'class': 'form-control input-xs', 'readonly': 'True'}),
            'last_name': TextInput(attrs={'class': 'form-control input-xs', 'readonly': 'True'}),
            'email': TextInput(attrs={'class': 'form-control input-xs'}),
        }

    def __init__(self, *args, **kwargs):
        super(UserEditarForm, self).__init__(*args, **kwargs)
        self.fields['first_name'].required = True
        self.fields['last_name'].required = True
        self.fields['clave_jde'].required = False
        self.fields['fecha_nacimiento'].required = True
        self.fields['foto'].required = False


class UserPerfilForm(ModelForm):
    clave_rh = CharField(
        label="Clave de empleado:",
        widget=TextInput(
            attrs={'class': 'form-control input-xs', 'readonly': 'True'}
        )
    )
    clave_jde = CharField(
        label="Clave de JDE:",
        widget=TextInput(
            attrs={'class': 'form-control input-xs', 'readonly': 'True'}
        )
    )
    fecha_nacimiento = CharField(
        label='Fecha de nacimiento',
        widget=DateInput(
            attrs={'class': 'form-control input-xs',
                   'data-date-format': 'yyyy-mm-dd', 'readonly': 'True'}
        ),
    )
    foto = FileField(
        label="Foto",
        widget=ClearableFileInput(
            attrs={'class': 'dropzone dz-clickable dz-started'}
        ),
    )

    class Meta:
        model = User

        fields = [
            'first_name',
            'last_name',
            'email',
            'clave_rh',
            'clave_jde',
            'fecha_nacimiento',
            'foto',
        ]

        labels = {
            'first_name': 'Nombre',
            'last_name': 'Apellidos',
            'email': 'Email',
            'clave_rh': 'Clave de empleado',
            'clave_jde': 'Clave de JDE',
            'fecha_nacimiento': 'Fecha de nacimiento',
            'foto': 'Foto',
        }

        widgets = {
            'first_name': TextInput(attrs={'class': 'form-control input-xs', 'readonly': 'True'}),
            'last_name': TextInput(attrs={'class': 'form-control input-xs', 'readonly': 'True'}),
            'email': TextInput(attrs={'class': 'form-control input-xs'}),
        }

    def __init__(self, *args, **kwargs):
        super(UserPerfilForm, self).__init__(*args, **kwargs)
        self.fields['clave_jde'].required = False
        self.fields['fecha_nacimiento'].required = False
        self.fields['foto'].required = False


class UserContrasenaResetConfirmForm(AdminPasswordChangeForm):
    password1 = CharField(
        label='Nueva contraseña',
        widget=PasswordInput(
            attrs={'class': 'form-control input-xs'}
        )
    )
    password2 = CharField(
        label='Confirmar contraseña',
        widget=PasswordInput(
            attrs={'class': 'form-control input-xs'}
        )
    )

    class Meta:
        model = User
        fields = ('password1', 'password2', )


class UserContrasenaActualForm(forms.Form):

    contrasena_actual = CharField(
        label="Actual",
        widget=forms.PasswordInput(
            attrs={'class': 'form-control input-xs'}
        )
    )


class UserContrasenaResetForm(PasswordResetForm):

    email = CharField(
        label='',
        widget=forms.TextInput(
            attrs={'class': 'form-control input-xs'}
        )
    )

    def save(self,
             domain_override=None,
             subject_template_name='registration/password_reset_subject.txt',
             email_template_name='registration/password_reset_email.html',
             use_https=False,
             token_generator=default_token_generator,
             from_email=None,
             request=None,
             html_email_template_name=None,
             extra_email_context=None,
             usuarios=None):

        for usuario in usuarios:

            if not domain_override:
                current_site = get_current_site(request)
                site_name = current_site.name
                domain = current_site.domain
            else:
                site_name = domain = domain_override

            context = {
                'email': usuario.email,
                'domain': domain,
                'site_name': site_name,
                'uid': urlsafe_base64_encode(force_bytes(usuario.pk)),
                'user': usuario,
                'token': token_generator.make_token(usuario),
                'protocol': 'https' if use_https else 'http',
            }
            if extra_email_context is not None:
                context.update(extra_email_context)
            self.send_mail(
                subject_template_name,
                email_template_name,
                context,
                from_email,
                usuario.email,
                html_email_template_name=html_email_template_name,
            )
