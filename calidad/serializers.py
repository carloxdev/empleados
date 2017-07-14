# -*- coding: utf-8 -*-
# Librerias Python:
import json

# Librerias Django
from rest_framework import serializers

# Modelos
from .models import Criterio
from .models import Requisito


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


class SubprocesoSerializer(serializers.HyperlinkedModelSerializer):

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


class SubprocesoSerilizado(object):
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
