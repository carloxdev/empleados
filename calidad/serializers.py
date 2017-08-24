# -*- coding: utf-8 -*-
# Librerias Python:
import json

# Librerias Django
from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator
from rest_framework.validators import UniqueValidator

# Modelos
from .models import Criterio
from .models import Requisito
from .models import Proceso
from .models import Subproceso
from .models import Responsable
from .models import Rol
from .models import CompaniaAccion
from .models import Sitio
from .models import Metodologia
from .models import Falla
from .models import Formato
from .models import ProcesoAuditoria
from .models import RequisitoProceso

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

    criterio_id = serializers.SerializerMethodField()

    class Meta:
        model = Requisito
        fields = (
            'pk',
            'requisito',
            'criterio',
            'criterio_id',
            'create_by',
            'create_date',
            'update_by',
            'update_date',
        )

    def get_criterio_id(self, obj):
        try:
            return obj.criterio.id
        except:
            return ""


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


class RolSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Rol
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

        # validators = [
        #     UniqueValidator(
        #         queryset=personal_rol.objects.filter(rol="dos"),
        #         message="Este empleado"
        #     )
        # ]


class CompaniaAccionSerializer(serializers.HyperlinkedModelSerializer):

    personal_rol_id = serializers.SerializerMethodField()

    class Meta:
        model = CompaniaAccion
        fields = (
            'pk',
            'compania_codigo',
            'compania',
            'personal_rol',
            'personal_rol_id',
            'create_by',
            'create_date',
            'update_by',
            'update_date',
        )

        validators = [
            UniqueTogetherValidator(
                queryset=CompaniaAccion.objects.all(),
                fields=('compania_codigo', 'personal_rol'),
                message="Esta compañia ya está incluida"
            )
        ]

    def get_personal_rol_id(self, obj):

        try:
            return obj.personal_rol.id
        except:
            return ""


class SitioSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Sitio
        fields = (
            'pk',
            'sitio',
            'create_by',
            'create_date',
            'update_by',
            'update_date',
        )


class MetodologiaSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Metodologia
        fields = (
            'pk',
            'metodologia',
            'create_by',
            'create_date',
            'update_by',
            'update_date',
        )


class FallaSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Falla
        fields = (
            'pk',
            'codigo',
            'falla',
            'create_by',
            'create_date',
            'update_by',
            'update_date',
        )


class FormatoSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Formato
        fields = (
            'pk',
            'compania_codigo',
            'compania',
            'titulo',
            'no_revision',
            'vigencia_inicio',
            'codigo',
            'descripcion',
            'create_by',
            'create_date',
            'update_by',
            'update_date',
        )


class ProcesoAuditoriaSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProcesoAuditoria
        fields = (
            'auditoria',
            'proceso',
            'subproceso',
            'rep_subpro_nombre_completo',
            'rep_subpro_numero_empleado',
            'fecha_programada_inicial',
            'fecha_programada_final',
            'auditor_nombre_completo',
            'auditor_numero_empleado',
            'sitio',
            'create_by',
            'create_date',
            'update_by',
            'update_date',
        )


class RequisitoProcesoSerializer(serializers.HyperlinkedModelSerializer):

    requisito_id = serializers.SerializerMethodField()
    proceso_auditoria_id = serializers.SerializerMethodField()
    criterio_id = serializers.SerializerMethodField()

    class Meta:
        model = RequisitoProceso
        fields = (
            'pk',
            'proceso_auditoria',
            'proceso_auditoria_id',
            'requisito',
            'requisito_id',
            'criterio_id',
            'create_by',
            'create_date',
            'update_by',
            'update_date',
        )

    def get_proceso_auditoria_id(self, obj):
        try:
            return obj.proceso_auditoria.id
        except:
            return ""

    def get_requisito_id(self, obj):
        try:
            return obj.requisito.id
        except:
            return ""

    def get_criterio_id(self, obj):
        try:
            return obj.requisito.criterio_id
        except:
            return ""
