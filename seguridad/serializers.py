
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
    cuenta = serializers.SerializerMethodField()
    first_name = serializers.SerializerMethodField()
    last_name = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()
    is_active = serializers.SerializerMethodField()
    last_login = serializers.SerializerMethodField()
    date_joined = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = (
            'pk',
            'cuenta',
            'first_name',
            'last_name',
            'email',
            'is_active',
            'last_login',
            'date_joined',
            'clave_rh',
            'clave_jde',
            'foto',
            'fecha_nacimiento',
        )

    def get_pk(self, obj):
        try:
            return obj.usuario.pk
        except Exception as e:
            print str(e)
            return " "
        

    def get_cuenta(self, obj):
        try:
            return obj.usuario.username
        except Exception as e:
            print str(e)
            return " "

    def get_first_name(self, obj):
        try:
            return obj.usuario.first_name
        except Exception as e:
            print str(e)
            return " "
        
    def get_last_name(self, obj):
        try:
            return obj.usuario.last_name
        except Exception as e:
            print str(e)
            return " "
        

    def get_email(self, obj):
        try:
            return obj.usuario.email
        except Exception as e:
            print str(e)
            return " "
    
    def get_last_login(self,obj):
        try:
            return obj.usuario.last_login
        except Exception as e:
            print str(e)
            return " "

    def get_date_joined(self,obj):
        try:
            return obj.usuario.date_joined
        except Exception as e:
            print str(e)
            return " "


    def get_is_active(self, obj):
        try:
            if obj.usuario.is_active == True:
                estado = 'Activo'
                return estado
            else:
                estado = 'Inactivo'
                return estado
        except Exception as e:
            print str(e)
            return " "
        
