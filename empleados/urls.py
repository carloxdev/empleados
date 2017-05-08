from django.conf.urls import url

from .views import Empleados


urlpatterns = [
    url(r'^capital-humano/empleados/$', Empleados.as_view(), name="empleados_filtros"),
]
