
# Librerias Django
from rest_framework import serializers

# Modelos:
from .models import Profile

# Otros Modelos:
from django.contrib.auth.models import User


class UserSerializer(serializers.HyperlinkedModelSerializer):

    full_name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = (
            'pk',
            'url',
            'username',
            'first_name',
            'last_name',
            'full_name',
            'email',
            'is_active',
        )

    def get_full_name(self, obj):

        try:
            return obj.get_full_name()

        except Exception as e:
            return str(e)


class ProfileSerializer(serializers.HyperlinkedModelSerializer):
    pk = serializers.SerializerMethodField()
    usuario = serializers.SerializerMethodField()
    first_name =serializers.SerializerMethodField()
    last_name =serializers.SerializerMethodField()
    email =serializers.SerializerMethodField()
    is_active =serializers.SerializerMethodField()


    class Meta:
        model = Profile
        fields = (
            'pk',
            'usuario',
            'first_name',
            'last_name',
            'email',
            'is_active',
            'clave_rh',
            'clave_jde',
            'foto',
            'fecha_nacimiento',
            'ultima_sesion'

        )

    def get_pk(self, obj):
         return obj.usuario.pk

    def get_usuario(self, obj):
         return obj.usuario.username

    def get_first_name(self, obj):
        return obj.usuario.first_name

    def get_last_name(self, obj):
        return obj.usuario.last_name

    def get_email(self, obj):
        return obj.usuario.email

    def get_is_active(self, obj):
        return obj.usuario.is_active