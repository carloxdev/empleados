from django.conf.urls import url

from .views import Inicio
from editorial.views import PostPublicados

app_name = "home"

urlpatterns = [
    url(r'^inicio/$', PostPublicados.as_view(), name="inicio"),
]
