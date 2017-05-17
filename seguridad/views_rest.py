
# Librerias de Terceros

# Django API Rest
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend

# Librerias Propias:

# Modelos
from .models import User
from .models import Profile

# Serializadores
from .serializers import UserSerializer
from .serializers import ProfileSerializer

# Paginacion
from .pagination import GenericPagination

# Filtros:
from .filters import ProfileFilter


class UserAPI(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)


class UserByPageAPI(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('username', 'is_active')
    pagination_class = GenericPagination
    permission_classes = (IsAuthenticated,)


class ProfileAPI(viewsets.ModelViewSet):
    queryset = Profile.objects.all().order_by('-usuario__date_joined')
    serializer_class = ProfileSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = ProfileFilter
    permission_classes = (IsAuthenticated,)


class ProfileByPageAPI(viewsets.ModelViewSet):
    queryset = Profile.objects.all().order_by('-usuario__date_joined')
    serializer_class = ProfileSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = ProfileFilter
    pagination_class = GenericPagination
    permission_classes = (IsAuthenticated,)
