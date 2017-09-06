# -*- coding: utf-8 -*-

from datetime import date
from datetime import timedelta

# Django API REST
from rest_framework import filters
from django_filters import CharFilter

# Modelos:
from .models import PerfilPuestoDocumento
from .models import Archivo

from ebs.models import VIEW_EMPLEADOS_FULL
from .models import DocumentoPersonal
from .models import DocumentoCapacitacion

from .models import PerfilPuestosCargo
from .models import PerfilCompetencias



class PerfilPuestoDocumentoFilter(filters.FilterSet):

    empleado_puesto_desc = CharFilter(
        name="empleado_puesto_desc",
        lookup_expr="icontains"
    )

    class Meta:
        model = PerfilPuestoDocumento
        fields = [
            'id',
            'empleado_puesto_desc',
            'asig_puesto_clave',
        ]

class PerfilpuestosCargoFilter(filters.FilterSet):

    id_puesto = CharFilter(
        name="id_puesto",
        lookup_expr="icontains"
    )

    class Meta:
        model = PerfilPuestosCargo
        fields = [
            'id_puesto',
        ]

class PerfilCompetenciaFilter(filters.FilterSet):

    # tipo_competentencia = CharFilter(
    #     name="tipo_competencia",
    #     lookup_expr="icontains"
    # )

    id_puesto = CharFilter(
        name="id_puesto",
        lookup_expr="contains")

    class Meta:
        model = PerfilCompetencias
        fields = [
            'id_puesto',
        ]        

        


class DocumentoPersonalFilter(filters.FilterSet):

    numero_empleado = CharFilter(
        name="numero_empleado",
        lookup_expr="contains")

    tipo_documento = CharFilter(
        name="tipo_documento",
        method="filter_documento")

    numero_empleado_organizacion = CharFilter(
        name="numero_empleado_organizacion",
        method="filter_organizacion")

    agrupador = CharFilter(
        name="agrupador",
        lookup_expr="contains")

    class Meta:
        model = DocumentoPersonal
        fields = [
            'numero_empleado',
            'tipo_documento',
            'numero_empleado_organizacion',
            'agrupador',
        ]

    def filter_documento(self, queryset, name, value):

        if not value:
            return ' '
        else:
            documento = queryset.filter(
                tipo_documento=value)
            return documento

    def filter_organizacion(self, queryset, name, value):

        if not value:
            return ' '
        else:
            organizacion = VIEW_EMPLEADOS_FULL.objects.using(
                'ebs_p').filter(asig_organizacion_clave=value)
            empleados = queryset.all()
            incluir = []

            for dato in empleados:
                if organizacion.filter(pers_empleado_numero=dato.content_object.numero_empleado):
                    incluir.append(dato.id)

            return empleados.filter(id__in=incluir)

            # for dato in organizacion:
            #     if empleados.filter(numero_empleado=dato.pers_empleado_numero):
            #         incluir.append(dato.pers_empleado_numero)

            # return empleados.filters(numero_empleado__in=incluir)


class DocumentoCapacitacionFilter(filters.FilterSet):

    numero_empleado = CharFilter(
        name="numero_empleado",
        lookup_expr="contains")

    tipo_documento = CharFilter(
        name="tipo_documento",
        method="filter_documento")

    numero_empleado_organizacion = CharFilter(
        name="numero_empleado_organizacion",
        method="filter_organizacion")

    proveedor = CharFilter(
        name="proveedor",
        method="filter_proveedor")

    class Meta:
        model = DocumentoCapacitacion
        fields = [
            'numero_empleado',
            'tipo_documento',
            'numero_empleado_organizacion',
            'proveedor',
        ]

    def filter_documento(self, queryset, name, value):

        if not value:
            return ' '
        else:
            documento = queryset.filter(
                tipo_documento=value)
            return documento

    def filter_proveedor(self, queryset, name, value):

        if not value:
            return ' '
        else:
            proveedor = queryset.filter(
                proveedor=value)
            return proveedor

    def filter_organizacion(self, queryset, name, value):

        if not value:
            return ' '
        else:
            organizacion = VIEW_EMPLEADOS_FULL.objects.using(
                'ebs_p').filter(asig_organizacion_clave=value)
            empleados = queryset.all()
            incluir = []

            for dato in empleados:
                if organizacion.filter(pers_empleado_numero=dato.content_object.numero_empleado):
                    incluir.append(dato.id)

            return empleados.filter(id__in=incluir)


class ArchivoPersonalFilter(filters.FilterSet):

    relacion_personal__numero_empleado = CharFilter(
        name="relacion_personal__numero_empleado",
        lookup_expr="contains")

    relacion_personal__tipo_documento = CharFilter(
        name="relacion_personal__tipo_documento",
        method="filter_documento")

    relacion_personal__agrupador = CharFilter(
        name="relacion_personal__agrupador",
        method="filter_agrupador")

    relacion_personal__tipo_documento_organizacion = CharFilter(
        name="relacion_personal__tipo_documento_organizacion",
        method="filter_organizacion")

    relacion_personal__vigencia_inicio = CharFilter(
        name='relacion_personal__vigencia_inicio',
        method="filter_vigencia_inicio"
    )

    relacion_personal__vigencia_fin = CharFilter(
        name='relacion_personal__vigencia_fin',
        method="filter_vigencia_fin"
    )

    class Meta:
        model = Archivo
        fields = [
            'relacion_personal__numero_empleado',
            'relacion_personal__tipo_documento',
            'relacion_personal__agrupador',
            'relacion_personal__tipo_documento_organizacion',
            'relacion_personal__vigencia_inicio',
            'relacion_personal__vigencia_fin',
        ]

    def filter_documento(self, queryset, name, value):

        if not value:
            return ' '
        else:

            documento = queryset.filter(
                relacion_personal__tipo_documento=value)
            return documento

    def filter_agrupador(self, queryset, name, value):

        if not value:
            return ' '
        else:
            documento = queryset.filter(
                relacion_personal__agrupador=value)
            return documento

    def filter_organizacion(self, queryset, name, value):

        if not value:
            return ' '
        else:
            organizacion = VIEW_EMPLEADOS_FULL.objects.using(
                'ebs_p').filter(asig_organizacion_clave=value)
            empleados = queryset.all()
            incluir = []

            for dato in organizacion:
                if empleados.filter(relacion_personal__numero_empleado=dato.pers_empleado_numero):
                    incluir.append(dato.pers_empleado_numero)

            return empleados.filter(relacion_personal__numero_empleado__in=incluir)

    def filter_vigencia_inicio(self, queryset, name, value):

        if not value:
            return queryset
        else:
            consulta = queryset.filter(
                relacion_personal__vigencia_inicio__gte=value)
            return consulta

    def filter_vigencia_fin(self, queryset, name, value):

        if not value:
            return queryset
        else:
            consulta = queryset.filter(
                relacion_personal__vigencia_fin__lte=value)
            return consulta


class ArchivoCapacitacionFilter(filters.FilterSet):

    relacion_capacitacion__numero_empleado = CharFilter(
        name="relacion_capacitacion__numero_empleado",
        lookup_expr="contains")

    relacion_capacitacion__curso = CharFilter(
        name="relacion_capacitacion__curso",
        method="filter_curso")

    relacion_capacitacion__agrupador = CharFilter(
        name="relacion_capacitacion__agrupador",
        method="filter_agrupador")

    relacion_capacitacion__area = CharFilter(
        name="relacion_capacitacion__area",
        method="filter_area")

    relacion_capacitacion__proveedor = CharFilter(
        name="relacion_capacitacion__proveedor",
        method="filter_proveedor")

    relacion_capacitacion__curso_organizacion = CharFilter(
        name="relacion_capacitacion__curso_organizacion",
        method="filter_organizacion")

    relacion_capacitacion__curso_estatus = CharFilter(
        name="relacion_capacitacion__curso_estatus",
        method="filter_estatus")

    class Meta:
        model = Archivo
        fields = [
            'relacion_capacitacion__numero_empleado',
            'relacion_capacitacion__curso',
            'relacion_capacitacion__agrupador',
            'relacion_capacitacion__area',
            'relacion_capacitacion__proveedor',
            'relacion_capacitacion__curso_organizacion',
            'relacion_capacitacion__curso_estatus'
        ]

    def filter_curso(self, queryset, name, value):

        if not value:
            return ' '
        else:

            curso = queryset.filter(relacion_capacitacion__curso=value)
            return curso

    def filter_agrupador(self, queryset, name, value):

        if not value:
            return ' '
        else:
            documento = queryset.filter(relacion_capacitacion__agrupador=value)
            return documento

    def filter_area(self, queryset, name, value):

        if not value:
            return ' '
        else:
            documento = queryset.filter(relacion_capacitacion__area=value)
            return documento

    def filter_organizacion(self, queryset, name, value):

        if not value:
            return ' '
        else:
            organizacion = VIEW_EMPLEADOS_FULL.objects.using(
                'ebs_p').filter(asig_organizacion_clave=value)
            empleados = queryset.all()
            incluir = []

            for dato in organizacion:
                if empleados.filter(relacion_capacitacion__numero_empleado=dato.pers_empleado_numero):
                    incluir.append(dato.pers_empleado_numero)

            return empleados.filter(relacion_capacitacion__numero_empleado__in=incluir)

    def filter_estatus(self, queryset, name, value):

        if not value:
            return ''
        else:
            empleados = queryset.all()
            fecha_actual = date.today()
            incluir = []
            fecha_por_vencer = fecha_actual + timedelta(days=90)

            if value == 'ven':
                for dato in empleados:
                    if dato.content_object.fecha_vencimiento != "Indefinido":
                        if dato.content_object.fecha_vencimiento < fecha_actual:
                            incluir.append(dato.id)
            elif value == 'por':
                for dato in empleados:
                    if dato.content_object.fecha_vencimiento != "Indefinido":
                        if (dato.content_object.fecha_vencimiento > fecha_actual) and \
                                (dato.content_object.fecha_vencimiento <= fecha_por_vencer):
                            incluir.append(dato.id)

            return empleados.filter(id__in=incluir)

    def filter_proveedor(self, queryset, name, value):

        if not value:
            return ' '
        else:
            proveedor = queryset.filter(
                relacion_capacitacion__proveedor=value)
            return proveedor


class ArchivoFilter(filters.FilterSet):

    pk = CharFilter(
        name="pk",
        lookup_expr="icontains")

    class Meta:
        model = Archivo
        fields = [
            'pk',
        ]
