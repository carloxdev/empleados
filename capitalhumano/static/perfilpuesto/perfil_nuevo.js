/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:api-
//var url_empleados_bypage = window.location.origin + "/api-ebs/viewempleadosfull_bypage/"

// OBJS
var formulario = null
var organigrama = null


/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {
    
    formulario = new Formulario()
    organigrama = new Organigrama()
})

/*-----------------------------------------------*\
            OBJETO: auditoria_general
\*-----------------------------------------------*/
function Formulario() {

    this.$id_objetivo = $("#id_objetivo")


    this.init_Components()
    this.init_Events()
}
Formulario.prototype.init_Components = function () {

    
    this.$id_objetivo.wysihtml5(this.get_ConfWysi())
    
    
}

Formulario.prototype.get_ConfWysi = function () {
    return {
        toolbar: {
            "font-styles": true,
            "emphasis": true,
            "lists": true,
            "html": false,
            "link": false,
            "image": false,
            "color": false,
            "blockquote": false,
        }
    }
}

Formulario.prototype.init_Events = function () {
    return {
    }
}

function Organigrama(){
}
Organigrama.prototype.crear_Diagrama = function(_url){

  $('#content-data').orgchart({
    'data' : _url,
    'depth': 3,
    'nodeTitle': 'puesto',
    'nodeFoto':'foto',
    'nodeNombre': 'nombre',
    'nodeNumEmpleado':'num_empleado',
    'nodeCompania':'compania',
    'nodeDepartamento':'departamento',
    'nodeCentroCostos': 'centro_costos',
    'nodeUbicacion': 'ubicacion',
    'nodeStaff': 'staff',
    'toggleSiblingsResp': true,
  })
}
Organigrama.prototype.get_Data = function(){

var datasource =
{ "nombre":"VILLEGAS RASCON CLAUDIA ANGELICA",
  "foto":"' images/decoradores/no-image-user.jpg '",
  "puesto":"54.192.COORDINADOR DE TECNOLOGIA DE INFORMACION",
  "num_empleado": "200006",
  "compania":"SISTEMAS INTEGRALES DE COMPRESION",
  "departamento": "TECNOLOGIA DE INFORMACION",
  "centro_costos": "C01TI",
  "ubicacion":"OFICINA VERACRUZ",
  "children":[
    { "nombre":"JIMENEZ HERRERA ZAIRA"
      "foto":"' images/decoradores/no-image-user.jpg '",
      "puesto":"54.15.AUXILIAR ADMINISTRATIVO",
      "num_empleado": "200185",
      "compania":"SISTEMAS INTEGRALES DE COMPRESION",
      "departamento": "TECNOLOGIA DE INFORMACION",
      "centro_costos": "C01TI",
      "ubicacion":"OFICINA VERACRUZ",
    },
    { "nombre":"AVENDAÑO CRUZ LUIS ALBERTO",
      "foto":"' images/decoradores/no-image-user.jpg '",
      "puesto":"54.138.JEFE DE SOPORTE DE INFRAESTRUCTURA",
      "num_empleado": "200971",
      "compania":"SISTEMAS INTEGRALES DE COMPRESION",
      "departamento": "TECNOLOGIA DE INFORMACION",
      "centro_costos": "C01TI",
      "ubicacion":"OFICINA VERACRUZ",
      "children":[
          { "nombre":"MARTINEZ GUTIERREZ EDWIN","puesto":"TECNICO ESPECIALISTA"
            "foto":"' images/decoradores/no-image-user.jpg '",
            "puesto":"54.61.SOPORTE DE INFRAESTRUCTURA SENIOR",
            "num_empleado": "200181",
            "compania":"SISTEMAS INTEGRALES DE COMPRESION",
            "departamento": "TECNOLOGIA DE INFORMACION",
            "centro_costos": "C01TI",
            "ubicacion":"OFICINA VERACRUZ",
          }
        ],
    },
    { "nombre":"MARTINEZ HERNANDEZ JORGE JESUS",
      "foto":"' images/decoradores/no-image-user.jpg '",
      "puesto":"54.139.JEFE DE APLICACIONES TI",
      "num_empleado": "200200",
      "compania":"SISTEMAS INTEGRALES DE COMPRESION",
      "departamento": "TECNOLOGIA DE INFORMACION",
      "centro_costos": "C01TI",
      "ubicacion":"OFICINA VERACRUZ",
      "children":[
        { "nombre":"ARIAS ZACARIAS ZACHARIEL",
          "foto":"' images/decoradores/no-image-user.jpg '",
          "puesto":"54.09.ANALISTA PROGRAMADOR JR",
          "num_empleado": "202054",
          "compania":"SISTEMAS INTEGRALES DE COMPRESION",
          "departamento": "TECNOLOGIA DE INFORMACION",
          "centro_costos": "C01TI",
          "ubicacion":"OFICINA VERACRUZ",
        },
        { "nombre":"CASTRO CASTILLO JANET","puesto":"ANALISTA"
          "foto":"' images/decoradores/no-image-user.jpg '",
          "puesto":"54.09.ANALISTA PROGRAMADOR JR",
          "num_empleado": "201289",
          "compania":"SISTEMAS INTEGRALES DE COMPRESION",
          "departamento": "TECNOLOGIA DE INFORMACION",
          "centro_costos": "C01TI",
          "ubicacion":"OFICINA VERACRUZ",
        },
        { "nombre":"CRUZ GOXCON MIGUEL ANGEL",
          "foto":"' images/decoradores/no-image-user.jpg '",
          "puesto":"54.10.ANALISTA PROGRAMADOR SENIOR",
          "num_empleado": "200721",
          "compania":"SISTEMAS INTEGRALES DE COMPRESION",
          "departamento": "TECNOLOGIA DE INFORMACION",
          "centro_costos": "C01TI",
          "ubicacion":"OFICINA VERACRUZ",
        },
        { "nombre":"CORDOVA QUIROZ NADIA",
          "foto":"' images/decoradores/no-image-user.jpg '",
          "puesto":"54.09.ANALISTA PROGRAMADOR JR",
          "num_empleado": "202070",
          "compania":"SISTEMAS INTEGRALES DE COMPRESION",
          "departamento": "TECNOLOGIA DE INFORMACION",
          "centro_costos": "C01TI",
          "ubicacion":"OFICINA VERACRUZ",
        },
        { "nombre":"MARTINEZ JIMENEZ CARLOS ANDRES",
          "foto":"' images/decoradores/no-image-user.jpg '",
          "puesto":"54.09.ANALISTA PROGRAMADOR JR",
          "num_empleado": "200836",
          "compania":"SISTEMAS INTEGRALES DE COMPRESION",
          "departamento": "TECNOLOGIA DE INFORMACION",
          "centro_costos": "C01TI",
          "ubicacion":"OFICINA VERACRUZ",
        }
        ],
    }
  ],
}
  return datasource
}