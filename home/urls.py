from django.conf.urls import url

from .views import Inicio

app_name = "home"

urlpatterns = [
    url(r'^inicio/$', Inicio.as_view(), name="inicio"),
]
