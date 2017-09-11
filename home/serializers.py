# Librerias Django
from rest_framework import serializers

# GenerisForeignKey
from generic_relations.relations import GenericRelatedField

# Modelos
from .models import Archivo

# Otros Modelos
from capitalhumano.models import DocumentoPersonal
from capitalhumano.models import DocumentoCapacitacion
from administracion.models import Solicitud
from calidad.models import AnalisisHallazgo


class ArchivoSerializers(serializers.HyperlinkedModelSerializer):
    content_object = GenericRelatedField({
        DocumentoPersonal: serializers.HyperlinkedRelatedField(
            queryset=DocumentoPersonal.objects.all(),
            view_name='documentopersonal-detail',
        ),
        DocumentoCapacitacion: serializers.HyperlinkedRelatedField(
            queryset=DocumentoCapacitacion.objects.all(),
            view_name='documentocapacitacion-detail',
        ),
        Solicitud: serializers.HyperlinkedRelatedField(
            queryset=Solicitud.objects.all(),
            view_name='solicitud-detail',
        ),
        AnalisisHallazgo: serializers.HyperlinkedRelatedField(
            queryset=AnalisisHallazgo.objects.all(),
            view_name='analisishallazgo-detail'
        )

    })

    class Meta:
        model = Archivo
        fields = (
            'pk',
            'tipo_archivo',
            'archivo',
            'content_object',
            'created_by',
        )
