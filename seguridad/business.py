
# Django's Libraries
from django.contrib.auth.models import User

# Own's Libraries
from .models import Profile


class UserBusiness(object):

    @classmethod
    def get_All(self):
        """ Funcion que devuelve a todos los usuarios,
            ordenados por cuenta
        """
        usuarios = User.objects.all().order_by('username')

        return usuarios

    @classmethod
    def get_All_ForSelect(self):

        valores = [('', '------')]

        usuarios = self.get_All()

        for usuario in usuarios:
            valores.append(
                (
                    usuario.username,
                    usuario.get_full_name()
                )
            )

        return valores

    @classmethod
    def get_RhClaves(self):
        """ Funcion que devuelve una lista con
            las claves de RH de los usuarios
        """

        rh_claves = []

        profiles = Profile.objects.values('clave_rh').exclude(
            clave_rh__isnull=True
        )

        for profile in profiles:
            rh_claves.append(profile['clave_rh'])

        return rh_claves
