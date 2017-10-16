
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
            return ""


    @classmethod
    def set_FechaConFormato(self, _fecha):

        try:
            return _fecha.strftime("%d/%m/%Y")
        except Exception as e:
            return ""


    @classmethod
    def get_Usuario(self, _pk):
        return Profile.objects.get(pk = _pk)


    @classmethod
    def get_Coma(self, _texto1, _texto2):
        if len(_texto2):
            return _texto1 + ','

        return _texto1


    @classmethod
    def get_FormatoDataList(self, _datos, _opcion, _no_data):

        lista = ""

        for index, dato in enumerate(_datos):
            if index == 0:
                lista += "<ul>"

            if _opcion == "criterios":
                lista += "<li>" + dato.criterio  + ".</li>"

            elif _opcion == "auditores" or _opcion == "auditores_colaboradores":
                lista += "<li>" + dato.nombre_completo  + ".</li>"

            elif _opcion == "contratos":
                lista += "<li>" + dato.proyecto_desc  + ".</li>"

            elif _opcion == "auditor_lider":
                lista += "<li>" + dato + ".</li>"

            if index == len(_datos)-1:
                lista += "</ul>"

        if not len(lista):
            lista=_no_data

        return lista


    @classmethod
    def get_Punto(self, _texto):

        if len(_texto):

            if _texto[-1:] == '.':
                return _texto
            else:
                return _texto + '.'

        return _texto
