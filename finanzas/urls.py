from django.conf.urls import url
from django.conf import settings
from django.conf.urls.static import static

# VISTAS
from .views import AnticipoLista

urlpatterns = [
    # Anticipos
    url(r'^anticipos/$', AnticipoLista.as_view(), name="anticipo_lista"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
