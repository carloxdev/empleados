
# Librerias Django
from rest_framework import serializers
from django.core.files.storage import default_storage
import os

# Librerias Python:
import sys
import json

# Modelos
from .models import PerfilPuestoDocumento

from .models import TipoDocumento
from .models import DocumentoPersonal
from .models import DocumentoCapacitacion
from .models import Curso
from .models import PerfilPuestosCargo
from .models import PerfilCompetencias
from .models import PerfilIndicadores
from .models import EvaluacionPlantillas


# Otros Modelos
from ebs.models import VIEW_EMPLEADOS_FULL
from jde.models import VIEW_PROVEEDORES
from ebs.models import VIEW_ORGANIGRAMA


class PerfilPuestosCargoSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = PerfilPuestosCargo
        fields = (
            'pk',
            'id_puesto',
            'id_puesto_cargo',
            'descripcion',
            'created_by',
            'created_date',
            'updated_by',
            'updated_date',
        )


class PerfilPuestoDocumentoSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = PerfilPuestoDocumento
        fields = (
            'pk',
            'empleado_puesto_desc',
            'asig_puesto_clave',
            'reporta',
            'objetivo',
            'funciones',
            'responsabilidades',
            'reporte',
            'posicion',
            'edad_minima',
            'edad_maxima',
            'nivel_estudio',
            'estado_civil',
            'genero',
            'cambio_residencia',
            'disponibilidad_viajar',
            'requerimentos',
            'areas_experiencia_id',
            'proposito',
            'puesto_acargo_id',
        )

# ----------Serializers para insertar registros------------------


class DocumentoPersonalSerializers(serializers.HyperlinkedModelSerializer):
    tipo_documento = serializers.PrimaryKeyRelatedField(
        queryset=TipoDocumento.objects.all())

    class Meta:
        model = DocumentoPersonal
        fields = (
            'pk',
            'numero_empleado',
            'tipo_documento',
            'vigencia_inicio',
            'vigencia_fin',
            'created_by',
            'created_date',
            'organizacion',
            'nombre_completo',
        )


class DocumentoCapacitacionSerializers(serializers.HyperlinkedModelSerializer):
    curso = serializers.PrimaryKeyRelatedField(
        queryset=Curso.objects.all())

    class Meta:
        model = DocumentoCapacitacion
        fields = (
            'pk',
            'numero_empleado',
            'curso',
            'proveedor',
            'modalidad',
            'lugar',
            'costo',
            'moneda',
            'departamento',
            'fecha_inicio',
            'fecha_fin',
            'duracion',
            'observaciones',
            'agrupador',
            'area',
            'created_by',
            'organizacion',
            'nombre_completo',
        )

# ---------- FIN Serializers para insertar registros------------------

# ----------Serializers de consulta------------------


class TipoDocumentoSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = TipoDocumento
        fields = (
            'pk',
            'tipo_documento',
            'agrupador',
            'created_by',
            'created_date',
        )


class PersonalSerializer(serializers.HyperlinkedModelSerializer):
    relacion = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='archivo-detail'
    )
    tipo_documento = serializers.SerializerMethodField()
    vigencia_inicio = serializers.SerializerMethodField()
    vigencia_fin = serializers.SerializerMethodField()
    created_by = serializers.SerializerMethodField()
    organizacion = serializers.SerializerMethodField()
    nombre_completo = serializers.SerializerMethodField()

    class Meta:
        model = DocumentoPersonal
        fields = (
            'pk',
            'numero_empleado',
            'tipo_documento',
            'vigencia_inicio',
            'vigencia_fin',
            'relacion',
            'created_by',
            'created_date',
            'organizacion',
            'nombre_completo',
        )

    def get_tipo_documento(self, obj):
        try:
            return obj.tipo_documento.tipo_documento
        except Exception as e:
            return " "

    def get_vigencia_inicio(self, obj):
        try:
            if obj.vigencia_inicio is None:
                return '---'
            else:
                return obj.vigencia_inicio.strftime('%d/%m/%Y')
        except Exception as e:
            return " "

    def get_vigencia_fin(self, obj):
        try:
            if obj.vigencia_fin is None:
                return '---'
            else:
                return obj.vigencia_fin.strftime('%d/%m/%Y')
        except Exception as e:
            return " "

    def get_created_by(self, obj):
        try:
            return obj.created_by.usuario.get_full_name()
        except Exception as e:
            return " "

    def get_organizacion(self, obj):
        try:
            return obj.organizacion
        except Exception as e:
            return " "

    def get_nombre_completo(self, obj):
        try:
            return obj.nombre_completo
        except Exception as e:
            return " "


class CapacitacionSerializer(serializers.HyperlinkedModelSerializer):
    relacion = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='archivo-detail'
    )
    agrupador = serializers.SerializerMethodField()
    area = serializers.SerializerMethodField()
    curso = serializers.SerializerMethodField()
    proveedor = serializers.SerializerMethodField()
    modalidad = serializers.SerializerMethodField()
    moneda = serializers.SerializerMethodField()
    fecha_inicio = serializers.SerializerMethodField()
    fecha_fin = serializers.SerializerMethodField()
    created_by = serializers.SerializerMethodField()

    class Meta:
        model = DocumentoCapacitacion
        fields = (
            'pk',
            'numero_empleado',
            'agrupador',
            'area',
            'curso',
            'proveedor',
            'modalidad',
            'lugar',
            'costo',
            'moneda',
            'departamento',
            'fecha_inicio',
            'fecha_fin',
            'duracion',
            'observaciones',
            'relacion',
            'created_by',
            'created_date',
            'fecha_vencimiento',
            'organizacion',
            'nombre_completo',
        )

    def get_agrupador(self, obj):
        try:
            agrupador = ''
            if obj.agrupador == 'per':
                agrupador = 'Personal'
            elif obj.agrupador == 'qhse':
                agrupador = 'QHSE'
            elif obj.agrupador == 'amo':
                agrupador = 'Amonestacion'
            elif obj.agrupador == 'adm':
                agrupador = 'Administracion'
            elif obj.agrupador == 'ope':
                agrupador = 'Operaciones'
            elif obj.agrupador == 'rec':
                agrupador = 'Reconocimiento'
            return agrupador
        except Exception as e:
            return " "

    def get_area(self, obj):
        try:
            area = ''
            if obj.area == 'ADMINISTRATIVA':
                area = 'Administrativa'
            elif obj.area == 'OPERATIVA':
                area = 'Operativa'
            return area
        except Exception as e:
            return " "

    def get_curso(self, obj):
        try:
            return obj.curso.nombre_curso
        except Exception as e:
            return " "

    def get_proveedor(self, obj):
        try:
            proveedor = VIEW_PROVEEDORES.objects.using(
                'jde_p').get(clave=obj.proveedor)
            return proveedor.descripcion
        except Exception as e:
            return " "

    def get_modalidad(self, obj):
        try:
            titulo = ''
            if obj.modalidad == 'pre':
                titulo = 'Presencial'
            elif obj.modalidad == 'vir':
                titulo = 'Virtual'
            elif obj.modalidad == 'prev':
                titulo = 'Previo'
            return titulo
        except Exception as e:
            return " "

    def get_moneda(self, obj):
        try:
            moneda = ''
            if obj.moneda == 'mxn':
                moneda = 'Moneda nacional'
            elif obj.moneda == 'usd':
                moneda = 'Dolares'
            elif obj.moneda == 'eur':
                moneda = 'Euros'
            return moneda
        except Exception as e:
            return " "

    def get_created_by(self, obj):
        try:
            return obj.created_by.usuario.get_full_name()
        except Exception as e:
            return " "

    def get_fecha_inicio(self, obj):
        try:
            return obj.fecha_inicio.strftime('%d/%m/%Y')
        except Exception as e:
            return " "

    def get_fecha_fin(self, obj):
        try:
            return obj.fecha_fin.strftime('%d/%m/%Y')
        except Exception as e:
            return " "

    def get_fecha_vencimiento(self, obj):
        try:
            if obj.fecha_vencimiento == 'Indefinido':
                return 'Indefinido'
            else:
                return obj.fecha_vencimiento
        except Exception as e:
            return " "

    def get_organizacion(self, obj):
        try:
            return obj.organizacion
        except Exception as e:
            return " "

    def get_nombre_completo(self, obj):
        try:
            return obj.nombre_completo
        except Exception as e:
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

            if len(hijos):
                self.get_Estructura(nodo, hijo)
                nodo["children"] = self.get_Descendencia(_daddies, hijos, nodo)
            else:
                self.get_Estructura(nodo, hijo)

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
            nodo["children"] = self.get_Descendencia(_daddies, hijos, nodo)
        else:
            self.get_Estructura(nodo, padre)

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
        self.get_ColorNivel(_nodo, _datos)
        self.buscar_Foto(_nodo, _datos)

    def buscar_Foto(self, _nodo, _datos):
        persona = VIEW_EMPLEADOS_FULL.objects.using('ebs_p').get(
            pers_empleado_numero=_datos.pers_empleado_numero)
        ruta = os.path.join('capitalhumano', 'fotos', "%s.jpg" %
                            (persona.nombre_foto))
        ruta2 = os.path.join('capitalhumano', 'fotos', "%s.JPG" %
                             (persona.nombre_foto))
        if default_storage.exists(ruta):
            _nodo["foto"] = '/media/' + ruta
        elif default_storage.exists(ruta2):
            _nodo["foto"] = '/media/' + ruta2
        else:
            _nodo["foto"] = '/static/images/decoradores/no-image-user.jpg '

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


class VIEW_ORGANIGRAMA_EMP_SERIALIZADO(object):

    def get_Descendencia(self, _daddies, _daddies_full, _hijos, _nodo_jefe_nombre_completo):

        lista_descendencia = []

        for hijo in _hijos:

            nodo = {}
            hijos = []

            for persona in _daddies:
                if persona.jefe_nombre_completo == hijo.pers_nombre_completo:
                    hijos.append(persona)

            if len(hijos):
                self.get_Estructura(nodo, hijo, _daddies_full)
                nodo["children"] = self.get_Descendencia(
                    _daddies, _daddies_full, hijos, nodo)
            else:
                self.get_Estructura(nodo, hijo, _daddies_full)

            lista_descendencia.append(nodo)

        return lista_descendencia

    def get_Json(self, _daddies, _daddies_full):

        sys.setrecursionlimit(1500)

        hijos = []
        nodo = {}
        padre = self.get_NivelPadre(_daddies)

        for persona in _daddies:
            if persona.jefe_nombre_completo == padre.pers_nombre_completo:
                hijos.append(persona)

        if len(hijos):
            self.get_Estructura(nodo, padre, _daddies_full)
            nodo["children"] = self.get_Descendencia(
                _daddies, _daddies_full, hijos, nodo)
        else:
            self.get_Estructura(nodo, padre, _daddies_full)

        lista_json = json.dumps(nodo)

        return lista_json

    def get_Estructura(self, _nodo, _datos, _daddies_full):
        _nodo["nombre"] = "%s" % (_datos.pers_nombre_completo)
        _nodo["num_empleado"] = "%s" % (_datos.pers_empleado_numero)
        _nodo["compania"] = "%s" % (_datos.grup_compania_jde)
        _nodo["departamento"] = "%s" % (_datos.asig_organizacion_desc)
        _nodo["puesto"] = "%s" % (_datos.asig_puesto_desc)
        _nodo["centro_costos"] = "%s" % (_datos.grup_fase_jde)
        _nodo["ubicacion"] = "%s" % (_datos.asig_ubicacion_desc)
        self.get_ColorNivel(_nodo, _datos)
        self.buscar_Foto(_nodo, _datos, _daddies_full)

    def buscar_Foto(self, _nodo, _datos, _daddies_full):
        persona = _daddies_full.get(
            pers_empleado_numero=_datos.pers_empleado_numero)
        ruta = os.path.join('capitalhumano', 'fotos', "%s.jpg" %
                            (persona.nombre_foto),)
        ruta2 = os.path.join('capitalhumano', 'fotos', "%s.JPG" %
                             (persona.nombre_foto))
        if default_storage.exists(ruta):
            _nodo["foto"] = '/media/' + ruta
        elif default_storage.exists(ruta2):
            _nodo["foto"] = '/media/' + ruta2
        else:
            _nodo["foto"] = '/static/images/decoradores/no-image-user.jpg '

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


class PerfilCompetenciaSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = PerfilCompetencias
        fields = (
            'pk',
            'tipo_competencia',
            'id_puesto',
            'descripcion',
            'porcentaje',
            'created_by',
            'created_date',
            'updated_by',
            'updated_date',
        )

class EvaluacionPlantillasSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = EvaluacionPlantillas
        fields = (
            'pk',
            'descripcion',
            'vigencia',
            'created_by',
            'created_date',
            'updated_by',
            'updated_date',
        )

class PerfilIndicadorSerializer(serializers.HyperlinkedModelSerializer):

    plantilla = serializers.SerializerMethodField()

    class Meta:
        model = PerfilIndicadores
        fields = (
            'pk',
            'plantilla',
            'cvepuesto',
            'departamento',
            'puesto',
            'objetivo',
            'unidad_medida',
            'descripcion_kpi',
            'porcentaje',
            'meta_minima',
            'meta_satisfactoria',
            'meta_excelente',
            'created_by',
            'created_date',
            'updated_by',
            'updated_date',
        )    

    def get_plantilla(self, obj):
        try:
            return obj.plantilla.descripcion
        except Exception as e:
            return " "          
