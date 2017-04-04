
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

    usuario = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = (
            'usuario',
            'clave_rh',
            'clave_jde',
            'foto',
        )

    def get_usuario(self, obj):

        try:
            return obj.usuario.username
        except Exception as e:
            return str(e)
