# -*- coding: utf-8 -*-

# Django's Libraries
from django.forms import ModelForm
from django.forms import TextInput
from django.forms import Textarea
from django.forms import Select

# Own's Libraries
from .models import Post


class PostForm(ModelForm):

    class Meta:
        model = Post
        fields = '__all__'
        exclude = [
            'created_by',
            'updated_by',
        ]
        widgets = {
            'titulo': TextInput(attrs={'class': 'form-control input-xs'}),
            'contenido': Textarea(attrs={'class': 'form-control input-xs', 'rows': '8'}),
            'status': Select(attrs={'class': 'form-control'}),
        }
