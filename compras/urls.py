from django.conf.urls import url

from .views import Seguimiento


urlpatterns = [
    url(r'^seguimiento$', Seguimiento.as_view(), name="seguimiento"),
]
