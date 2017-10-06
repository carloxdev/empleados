
# Python's Libraries
from datetime import datetime

# Django's Libraries
from django.shortcuts import get_object_or_404

# Own's Libraries

# Models
from administracion.models import Profile
# from django.template.loader import render_to_string
# from django.contrib.auth.models import User


class CalidadMethods(object):

    @classmethod
    def get_FechaConFormato(self, _fecha):

        try:
            fecha = _fecha.split("/")
            return fecha[2] + "-" + fecha[1] + "-" + fecha[0]
        except Exception as e:
            raise ValueError("Fecha invalida")
            return ""


    @classmethod
    def set_FechaConFormato(self, _fecha):

        try:
            return _fecha.strftime("%d/%m/%Y")
        except Exception as e:
            raise ValueError("Fecha invalida")
            return _fecha


    @classmethod
    def get_Usuario(self, _pk):
        return Profile.objects.get(pk = _pk)


    @classmethod
    def get_Coma(self, _texto1, _texto2):
        if len(_texto2):
            return _texto1 + ','

        return _texto1
