# Librerias Python:
import sys
import json

# API Rest:
from rest_framework import serializers

# Modelos
from ebs.models import VIEW_EMPLEADOS_FULL


class VIEW_ORGANIGRAMA_ORG_SERIALIZADO(object):

    def get_Descendencia(self, _daddies, _hijos, _nodo_jefe_nombre_completo, _clave_rh):

        lista_descendencia = []

        for hijo in _hijos:

            nodo = {}
            hijos = []

            for persona in _daddies:
                if persona.jefe_nombre_completo == hijo.pers_nombre_completo:
                    hijos.append(persona)
                if _clave_rh == hijo.pers_empleado_numero:
                    self.get_EstructuraEmpleado(nodo, hijo)
                else:
                    self.get_Estructura(nodo, hijo)

            if len(hijos):
                self.get_ColorNivel(nodo, hijo, _clave_rh)
                nodo["children"] = self.get_Descendencia(
                    _daddies, hijos, nodo, _clave_rh)
            else:
                if hijo.tipo == 'STAFF':
                    nodo["staff"] = 'STAFF'
                    nodo["className"] = 'staff-level'
                else:
                    self.get_ColorNivel(nodo, hijo, _clave_rh)

            lista_descendencia.append(nodo)

        return lista_descendencia

    def get_Json(self, _daddies, _clave_rh):

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
            nodo["children"] = self.get_Descendencia(
                _daddies, hijos, nodo, _clave_rh)
        else:
            self.get_EstructuraEmpleado(nodo, padre)
            self.get_ColorNivel(nodo, padre, _clave_rh)

        lista_json = json.dumps(nodo)

        return lista_json

    def get_EstructuraEmpleado(self, _nodo, _datos):
        _nodo["nombre"] = "%s" % (_datos.pers_nombre_completo)
        _nodo["num_empleado"] = "%s" % (_datos.pers_empleado_numero)
        _nodo["compania"] = "%s" % (_datos.grup_compania_jde)
        _nodo["departamento"] = "%s" % (_datos.asig_organizacion_desc)
        _nodo["puesto"] = "%s" % (_datos.asig_puesto_desc)
        _nodo["centro_costos"] = "%s" % (_datos.grup_fase_jde)
        _nodo["ubicacion"] = "%s" % (_datos.asig_ubicacion_desc)

    def get_Estructura(self, _nodo, _datos):
        _nodo["puesto"] = "%s" % (_datos.asig_puesto_desc)
        _nodo["nombre"] = "None"

    def get_ColorNivel(self, _nodo, _dato, _clave_rh):
        if _dato.nivel_estructura == 1:
            _nodo["className"] = 'nivel-1'
        elif (_dato.nivel_estructura == 2) or \
                (_dato.nivel_estructura == 3) or \
                (_dato.nivel_estructura == 4) or \
                (_dato.nivel_estructura == 5) or \
                (_dato.nivel_estructura == 6):

            _nodo["className"] = "niveles"

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

            padre = VIEW_EMPLEADOS_FULL.objects.using('ebs_d').filter(
                pers_clave=dato.asig_jefe_directo_clave)

        return padre
