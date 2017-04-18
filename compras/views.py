# -*- coding: utf-8 -*-
# Django Atajos:
from django.shortcuts import render

# Django Urls:


# Librerias de Django
from django.views.generic.base import View

# Librerias Python

# Librerias de Terceros:
# API Rest:

# Modelos:

# Formularios

# Serializadores:

# Filtros:

# Paginacion

# -------------- COMPRAS -------------- #

class Seguimiento(View):
     def get(self, request):

        return render(request, 'compra/seguimiento.html', {})

# -------------- COMPRAS - API REST -------------- #

