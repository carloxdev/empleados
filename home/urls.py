from django.conf.urls import url

from .views import Inicio

urlpatterns = [
    url(r'^$', Inicio.as_view(), name="inicio"),
]
