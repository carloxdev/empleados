# Librerias Python:
import sys
import json
from django.core.files.storage import default_storage
import os

# Modelos
from ebs.models import VIEW_EMPLEADOS_FULL
from ebs.models import VIEW_ORGANIGRAMA


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
                nodo["children"] = self.get_Descendencia(
                    _daddies, hijos, nodo, _clave_rh)

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
            nodo["children"] = self.get_Descendencia(
                _daddies, hijos, nodo, _clave_rh)
        else:
            self.get_EstructuraEmpleado(nodo, padre)

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
        self.get_ColorNivel(_nodo, _datos)
        self.get_Foto(_nodo, _datos)

    def get_Foto(self, _nodo, _datos):
        empleado = VIEW_EMPLEADOS_FULL.objects.using('ebs_p').get(
            pers_empleado_numero=_datos.pers_empleado_numero)
        ruta = os.path.join('capitalhumano', 'fotos', '%s' %
                            (empleado.nombre_foto))
        if default_storage.exists(ruta):
            _nodo["foto"] = '/media/' + ruta
        else:
            _nodo["foto"] = '/static/images/decoradores/no-image-user.jpg '

    def get_Estructura(self, _nodo, _datos):
        _nodo["puesto"] = "%s" % (_datos.asig_puesto_desc)
        _nodo["nombre"] = "None"
        self.get_ColorNivel(_nodo, _datos)

    def get_ColorNivel(self, _nodo, _dato):
        if (_dato.nivel_estructura == 1) or \
                (_dato.nivel_estructura == 2):
            _nodo["className"] = 'nova-nivel-1-2'
        elif (_dato.nivel_estructura == 3):
            _nodo["className"] = 'nova-nivel-3'
        elif (_dato.nivel_estructura == 4):
            _nodo["className"] = 'nova-nivel-4'
        elif (_dato.nivel_estructura == 5):
            _nodo["className"] = 'nova-nivel-5'
        elif (_dato.nivel_estructura == 6):
            if _dato.tipo == "STAFF":
                _nodo["staff"] = 'STAFF'
                _nodo["className"] = 'nova-nivel-staff'
            else:
                _nodo["className"] = 'nova-nivel-6'

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
            padre = VIEW_ORGANIGRAMA.objects.using('ebs_p').filter(
                pers_clave=dato.asig_jefe_directo_clave)

        return padre
