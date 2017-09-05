
# Third's Libraries
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework import status


# Own's Libraries
from .models import ViaticoCabecera
from .models import ViaticoLinea

from .serializers import ViaticoCabeceraSerializer
from .serializers import ViaticoLineaSerializer

from .filters import ViaticoCabeceraFilter
from .filters import ViaticoLineaFilter

from .pagination import GenericPagination


class ViaticoCabeceraAPI(viewsets.ModelViewSet):
    queryset = ViaticoCabecera.objects.all()
    serializer_class = ViaticoCabeceraSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = ViaticoCabeceraFilter
    permission_classes = (IsAuthenticated,)


class ViaticoCabeceraByPageAPI(viewsets.ModelViewSet):
    queryset = ViaticoCabecera.objects.all()
    serializer_class = ViaticoCabeceraSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = ViaticoCabeceraFilter
    pagination_class = GenericPagination
    permission_classes = (IsAuthenticated,)


class ViaticoLineaAPI(viewsets.ModelViewSet):
    queryset = ViaticoLinea.objects.all()
    serializer_class = ViaticoLineaSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = ViaticoLineaFilter
    permission_classes = (IsAuthenticated,)

    def create(self, _request):
        _request.data['created_by'] = _request.user.pk
        _request.data['updated_by'] = _request.user.pk
        serialized = self.serializer_class(data=_request.data)
        if serialized.is_valid():
            serialized.save()
            return Response(status=status.HTTP_202_ACCEPTED)
        else:
            return Response(serialized.errors, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, _request, *args, **kwargs):
        instance = self.queryset.get(pk=kwargs.get('pk'))
        _request.data['updated_by'] = _request.user.pk
        serialized = self.serializer_class(instance, data=_request.data, partial=True)
        serialized.is_valid(raise_exception=True)
        serialized.save()
        return Response(status=status.HTTP_202_ACCEPTED)
