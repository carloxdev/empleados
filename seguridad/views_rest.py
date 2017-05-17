# Librerias de Terceros:
# Django API Rest
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend

# Serializadores:
from .serializers import UserSerializer
from .serializers import ProfileSerializer

# Filters:
from .filters import ProfileFilter

# Modelos:
from .models import User
from .models import Profile

# Paginacion
from .pagination import GenericPagination


class UserAPI(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserByPageAPI(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('username', 'is_active')
    pagination_class = GenericPagination


class ProfileAPI(viewsets.ModelViewSet):
    queryset = Profile.objects.all().order_by('-usuario__date_joined')
    serializer_class = ProfileSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = ProfileFilter


class ProfileByPageAPI(viewsets.ModelViewSet):
    queryset = Profile.objects.all().order_by('-usuario__date_joined')
    serializer_class = ProfileSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = ProfileFilter
    pagination_class = GenericPagination
