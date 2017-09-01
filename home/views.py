from django.shortcuts import render

# Create your views here.
from django.views.generic.base import View

# Django Login
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required


@method_decorator(login_required, name='dispatch')
class Inicio(View):

    def get(self, request):

        return render(request, 'inicio.html', {})
