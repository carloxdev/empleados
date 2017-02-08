# Django:
from django.forms import ModelForm

from .models import ViaticoCabecera


class ViaticoCabeceraForm(ModelForm):

    class Meta:
        model = ViaticoCabecera
        fields = '__all__'
