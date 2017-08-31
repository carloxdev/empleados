from django.conf.urls import url

from .views import Inicio
from .views import Error

app_name = "home"

urlpatterns = [
    url(r'^inicio/$', Inicio.as_view(), name="inicio"),
    url(r'^error/$', Error.as_view(), name='error.index'),
]
