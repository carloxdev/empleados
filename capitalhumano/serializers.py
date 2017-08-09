
# Librerias Django
from rest_framework import serializers

# Librerias Python:
import sys
import json

# Modelos
from .models import PerfilPuestoDocumento
from .models import DocumentoPersonal
from ebs.models import VIEW_EMPLEADOS_FULL


class PerfilPuestoDocumentoSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = PerfilPuestoDocumento
        fields = (
            'pk',
            'empleado_puesto_desc',
            'reporta',
            'proposito',
            'funciones',
            'responsabilidades',
            'reporte',
            'edad_minima',
            'edad_maxima',
            'nivel_estudio',
            'estado_civil',
            'genero',
            'cambio_residencia',
            'disponibilidad_viajar',
            'requerimentos',
        )


class PersonalSerializer(serializers.HyperlinkedModelSerializer):
    pk_archivo = serializers.SerializerMethodField()
    nombre_archivo = serializers.SerializerMethodField()
    archivo = serializers.SerializerMethodField()
    tipo = serializers.SerializerMethodField()
    created_by = serializers.SerializerMethodField()

    class Meta:
        model = DocumentoPersonal
        fields = (
            'numero_empleado',
            'agrupador',
            'fecha',
            'vigencia_inicio',
            'vigencia_fin',
            'pk_archivo',
            'nombre_archivo',
            'tipo',
            'archivo',
            'created_by',
            'created_date',
        )

    def get_pk_archivo(self, obj):
        try:
            return obj.archivo.pk
        except Exception as e:
            print str(e)
            return " "

    def get_nombre_archivo(self, obj):
        try:
            return obj.archivo.nombre_documento
        except Exception as e:
            print str(e)
            return " "

    def get_created_by(self, obj):
        try:
            return obj.created_by.usuario.get_full_name()
        except Exception as e:
            print str(e)
            return " "

    def get_tipo(self, obj):
        try:
            return obj.tipo.tipo_documento
        except Exception as e:
            print str(e)
            return " "

    def get_archivo(self, obj):
        try:
            return str(obj.archivo.archivo)
        except Exception as e:
            print str(e)
            return " "


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


class VIEW_ORGANIGRAMA_EMP_SERIALIZADO(object):

    def get_Descendencia(self, _daddies, _hijos, _nodo_jefe_nombre_completo):

        lista_descendencia = []

        for hijo in _hijos:

            nodo = {}
            hijos = []

            for persona in _daddies:
                if persona.jefe_nombre_completo == hijo.pers_nombre_completo:
                    hijos.append(persona)

                self.get_Estructura(nodo, hijo)
                self.get_ColorNivel(nodo, hijo)

            if len(hijos):
                self.get_ColorNivel(nodo, hijo)
                nodo["children"] = self.get_Descendencia(_daddies, hijos, nodo)
            else:
                if hijo.tipo == 'STAFF':
                    nodo["staff"] = 'STAFF'
                    nodo["className"] = 'staff-level'

            lista_descendencia.append(nodo)

        return lista_descendencia

    def get_Json(self, _daddies):

        sys.setrecursionlimit(1500)

        hijos = []
        nodo = {}
        padre = self.get_NivelPadre(_daddies)

        for persona in _daddies:
            if persona.jefe_nombre_completo == padre.pers_nombre_completo:
                hijos.append(persona)
                # print 'jefe'+persona.pers_nombre_completo.encode('utf-8')

        if len(hijos):
            self.get_Estructura(nodo, padre)
            self.get_ColorNivel(nodo, padre)
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
        _nodo["foto"] = "' images/decoradores/no-image-user.jpg '"

    def get_ColorNivel(self, _nodo, _dato):
        if _dato.nivel_estructura == 1:
            _nodo["className"] = 'nivel-1'
        elif (_dato.nivel_estructura == 2) or \
                (_dato.nivel_estructura == 3) or \
                (_dato.nivel_estructura == 4) or \
                (_dato.nivel_estructura == 5) or \
                (_dato.nivel_estructura == 6):
            _nodo["className"] = 'niveles'

    def get_NivelPadre(self, _daddies):
        nivel = 6
        padre = _daddies[0]
        cont = 0

        for persona in _daddies:
            if persona.nivel_estructura < nivel:
                nivel = persona.nivel_estructura

        for posicion in _daddies:
            if posicion.nivel_estructura == nivel:
                padre = _daddies[cont]
            cont += 1

        return padre
