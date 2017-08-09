# Librerias Python:
import sys
import json

# API Rest:
from rest_framework import serializers

# Modelos
from ebs.models import VIEW_EMPLEADOS_FULL
from .models import ViaticoCabecera
from .models import ViaticoLinea


class VIEW_ORGANIGRAMA_ORG_SERIALIZADO(object):

    def get_Descendencia(self, _daddies, _hijos, _nodo_jefe_nombre_completo):

        lista_descendencia = []

        for hijo in _hijos:

            nodo = {}
            hijos = []

            for persona in _daddies:
                if persona.jefe_nombre_completo == hijo.pers_nombre_completo:
                    hijos.append(persona)

                self.get_Estructura(nodo, hijo)

            if len(hijos):
                self.get_ColorNivel(nodo, hijo)
                nodo["children"] = self.get_Descendencia(_daddies, hijos, nodo)
            else:
                if hijo.tipo == 'STAFF':
                    nodo["staff"] = 'STAFF'
                    nodo["className"] = 'staff-level'
                else:
                    self.get_ColorNivel(nodo, hijo)

            lista_descendencia.append(nodo)

        return lista_descendencia

    def get_Json(self, _daddies):

        sys.setrecursionlimit(1500)

        hijos = []
        nodo = {}
        padre = self.get_Padre(_daddies)

        for dato in padre:
            for persona in _daddies:
                if persona.jefe_nombre_completo == dato.pers_nombre_completo:
                    hijos.append(persona)

        if len(hijos):
            for dato in padre:
                self.get_Estructura(nodo, dato)
                if dato.pers_empleado_numero == '200817':
                    nodo["className"] = 'nivel-1'
                else:
                    nodo["className"] = 'niveles'
            nodo["children"] = self.get_Descendencia(_daddies, hijos, nodo)
        else:
            self.get_Estructura(nodo, padre)
            self.get_ColorNivel(nodo, padre)

        lista_json = json.dumps(nodo)

        return lista_json

    def get_Estructura(self, _nodo, _datos):
        _nodo["nombre"] = "%s" % (_datos.pers_nombre_completo)
        _nodo["num_empleado"] = "%s" % (_datos.pers_empleado_numero)
        _nodo["compania"] = "%s" % (_datos.grup_compania_jde)
        _nodo["departamento"] = "%s" % (_datos.asig_organizacion_desc)
        _nodo["puesto"] = "%s" % (_datos.asig_puesto_desc)
        _nodo["centro_costos"] = "%s" % (_datos.grup_fase_jde)
        _nodo["ubicacion"] = "%s" % (_datos.asig_ubicacion_desc)

    def get_ColorNivel(self, _nodo, _dato):
        if _dato.nivel_estructura == 1:
            _nodo["className"] = 'nivel-1'
        elif (_dato.nivel_estructura == 2) or \
                (_dato.nivel_estructura == 3) or \
                (_dato.nivel_estructura == 4) or \
                (_dato.nivel_estructura == 5) or \
                (_dato.nivel_estructura == 6):
            _nodo["className"] = 'niveles'

    def get_Padre(self, _daddies):

        nivel = 6
        personaMenorNivel = []
        personasMismoNivel = []
        personasSinJefe = []
        padre = []

        for personaNivel in _daddies:
            if personaNivel.nivel_estructura < nivel:
                nivel = personaNivel.nivel_estructura
                personaMenorNivel = personaNivel

        for persona in _daddies:
            if persona.nivel_estructura == personaMenorNivel.nivel_estructura:
                personasMismoNivel.append(persona)

        personasSinJefe = personasMismoNivel

        for personaMismo in personasMismoNivel:
            for todo in _daddies:
                if personaMismo.jefe_nombre_completo == todo.pers_nombre_completo:
                    personasSinJefe.remove(personaMismo)

        for dato in personasSinJefe:

            padre = VIEW_EMPLEADOS_FULL.objects.using('ebs_p').filter(
                pers_clave=dato.asig_jefe_directo_clave)

        return padre


class ViaticoCabeceraSerializer(serializers.HyperlinkedModelSerializer):

    status = serializers.SerializerMethodField()
    empresa = serializers.SerializerMethodField()
    created_by = serializers.SerializerMethodField()
    approved_by = serializers.SerializerMethodField()
    updated_by = serializers.SerializerMethodField()

    class Meta:
        model = ViaticoCabecera
        fields = (
            'url',
            'pk',
            'empleado_clave',
            'empleado_descripcion',
            'fecha_partida',
            'fecha_regreso',
            'unidad_negocio_clave',
            'unidad_negocio_descripcion',
            'ciudad_destino',
            'proposito_viaje',
            'empresa',
            'rfc',
            'direccion',
            'grupo',
            'autorizador_clave',
            'autorizador_descripcion',
            'status',
            'importe_total',
            'approved_by',
            'approved_date',
            'created_by',
            'created_date',
            'updated_by',
            'updated_date',
        )

    def get_status(self, obj):

        try:
            return obj.get_status_display()

        except Exception as e:
            print str(e)
            return ""

    def get_empresa(self, obj):

        try:
            return obj.empresa.clave

        except Exception as e:
            print str(e)
            return ""

    def get_created_by(self, obj):

        try:
            return obj.created_by.usuario.username
        except Exception as e:
            print str(e)
            return ""

    def get_approved_by(self, obj):

        try:
            return obj.approved_by.usuario.username
        except Exception as e:
            print str(e)

    def get_updated_by(self, obj):

        try:
            return obj.updated_by.usuario.username
        except Exception as e:
            print str(e)
            return ""


class ViaticoLineaSerializer(serializers.ModelSerializer):

    class Meta:
        model = ViaticoLinea
        fields = (
            'url',
            'pk',
            'cabecera',
            'concepto',
            'observaciones',
            'importe',
            'created_date',
            'created_by',
            'updated_date',
            'updated_by',
        )

