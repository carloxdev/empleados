# -*- coding: utf-8 -*-
from django.conf.urls import url
#from . import views
from .views import UsuarioBusqueda
from .views import UsuarioFormulario
from .views import UsuarioLista
from .views import UsuarioEditar



urlpatterns = [
    url(r'^usuarios$', UsuarioBusqueda.as_view(), name="usuario_busqueda"),
    url(r'^usuarios/lista$', UsuarioLista.as_view(), name="usuario_lista"),
    url(r'^usuarios/nuevo/$', UsuarioFormulario.as_view(), name="usuario_nuevo"),
    url(r'^usuarios/lista/editar/(?P<pk>\d+)/$', UsuarioEditar.as_view(), name="usuario_editar"),
]
