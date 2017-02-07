from django.shortcuts import render

# Create your views here.
from django.views.generic.base import View


class Inicio(View):

    def get(self, request):

        return render(request, 'inicio.html', {})
