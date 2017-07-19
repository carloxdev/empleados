# -*- coding: utf-8 -*-
# Librerias Python:
import json

# Librerias Django
from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator

# Modelos
from .models import Criterio
from .models import Requisito
from .models import Proceso
from .models import Subproceso
from .models import Responsable
from .models import Usuario
from .models import CompaniaAccion


class CriterioSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Criterio
        fields = (
            'pk',
            'criterio',
            'clasificacion',
            'create_by',
            'create_date',
            'update_by',
            'update_date',
        )


class RequisitoSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Requisito
        fields = (
            'pk',
            'requisito',
            'criterio',
            'create_by',
            'create_date',
            'update_by',
            'update_date',
        )


class RequisitoSerilizado(object):
    def __init__(self):
        self.lista = []

    def get_Json(self, _daddies):

        self.lista = []

        for daddy in _daddies:

            nodo = {}
            estado = {}
            estado["expanded"] = False

            nodo["textBlack"] = daddy.criterio + (' - ') + daddy.clasificacion
            nodo["state"] = estado
            nodo["buttonTags"] = [
                {"id": str(daddy.id)},
            ]
            hijos = Requisito.objects.filter(criterio=daddy)

            if len(hijos):
                lista_hijos = []

                for hijo in hijos:

                    nodoHijo = {}
                    nodoHijo["text"] = hijo.requisito
                    nodoHijo["buttonTagsHijo"] = [
                        {"id": str(hijo.id), "id_padre": str(daddy.id)},
                    ]

                    lista_hijos.append(nodoHijo)

                nodo["nodes"] = lista_hijos

            self.lista.append(nodo)

        lista_json = json.dumps(self.lista)

        return lista_json


class ProcesoSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Proceso
        fields = (
            'pk',
            'proceso',
            'create_by',
            'create_date',
            'update_by',
            'update_date',
        )


class SubprocesoSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Subproceso
        fields = (
            'pk',
            'subproceso',
            'proceso',
            'create_by',
            'create_date',
            'update_by',
            'update_date',
        )


class SubprocesoSerilizado(object):
    def __init__(self):
        self.lista = []

    def get_Json(self, _daddies):

        self.lista = []

        for daddy in _daddies:

            nodo = {}
            estado = {}
            estado["expanded"] = False

            nodo["textBlack"] = daddy.proceso
            nodo["state"] = estado
            nodo["buttonTagsAccion"] = [
                {"id": str(daddy.id)},
            ]
            hijos = Subproceso.objects.filter(proceso=daddy)

            if len(hijos):
                lista_hijos = []

                for hijo in hijos:

                    nodoHijo = {}
                    nodoHijo["text"] = hijo.subproceso
                    nodoHijo["buttonTagsHijo"] = [
                        {"id": str(hijo.id), "id_padre": str(daddy.id)},
                    ]

                    lista_hijos.append(nodoHijo)

                nodo["nodes"] = lista_hijos

            self.lista.append(nodo)

        lista_json = json.dumps(self.lista)

        return lista_json


class ResponsableSerializer(serializers.HyperlinkedModelSerializer):

    proceso_id = serializers.SerializerMethodField()

    class Meta:
        model = Responsable
        fields = (
            'pk',
            'nombre_completo',
            'numero_empleado',
            'proceso',
            'proceso_id',
            'create_by',
            'create_date',
            'update_by',
            'update_date',
        )

        validators = [
            UniqueTogetherValidator(
                queryset=Responsable.objects.all(),
                fields=('numero_empleado', 'proceso'),
                message="Este empleado ya está incluido"
            )
        ]

    def get_proceso_id(self, obj):

        try:
            return obj.proceso.id
        except:
            return ""


class UsuarioSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Usuario
        fields = (
            'pk',
            'nombre_completo',
            'numero_empleado',
            'rol',
            'create_by',
            'create_date',
            'update_by',
            'update_date',
        )


class CompaniaAccionSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = CompaniaAccion
        fields = (
            'pk',
            'compania_codigo',
            'compania',
            'usuario',
            'create_by',
            'create_date',
            'update_by',
            'update_date',
        )
