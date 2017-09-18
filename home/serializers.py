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
from calidad.models import PlanAccionHallazgo
from calidad.models import SeguimientoPlanAccion
from calidad.models import EvidenciaHallazgo


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
        ),
        PlanAccionHallazgo: serializers.HyperlinkedRelatedField(
            queryset=PlanAccionHallazgo.objects.all(),
            view_name='planaccionhallazgo-detail'
        ),
        SeguimientoPlanAccion: serializers.HyperlinkedRelatedField(
            queryset=SeguimientoPlanAccion.objects.all(),
            view_name='seguimientoplanaccion-detail'
        ),
        EvidenciaHallazgo: serializers.HyperlinkedRelatedField(
            queryset=EvidenciaHallazgo.objects.all(),
            view_name='evidenciahallazgo-detail'
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
            'created_date',
        )
