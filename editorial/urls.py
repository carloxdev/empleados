# Django's Libraries
from django.conf.urls import url

# Own's Libraries
from .views import PostPublicados
from .views import PostAdministracion
from .views import PostConsultar
from .views import PostNuevo
from .views import PostEditar

urlpatterns = [
    # url(r'^inicio/$', PostPublicados.as_view(), name="post_publicados"),
    url(r'^post/$', PostAdministracion.as_view(), name="post_administracion"),
    url(r'^post/(?P<pk>\d+)/$', PostConsultar.as_view(), name="post_consultar"),
    url(r'^post/nuevo/$', PostNuevo.as_view(), name="post_nuevo"),
    url(r'^post/(?P<pk>\d+)/editar/$', PostEditar.as_view(), name="post_editar"),
]
