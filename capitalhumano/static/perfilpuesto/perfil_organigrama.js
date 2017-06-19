/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// OBJS
var organigrama = null


/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {
    
    organigrama = new Organigrama()
})

/*-----------------------------------------------*\
            OBJETO: ORGANIGRAMA
\*-----------------------------------------------*/

function Organigrama(){
  this.init_Components()
}
Organigrama.prototype.init_Components = function(){
  this.crear_Diagrama()
}
Organigrama.prototype.crear_Diagrama = function(){

  $('#content-data').orgchart({
    'data' : this.get_Data(),
    'depth': 4,
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
{ "nombre":"HERNANDEZ PALMEROS MARIANO",
  "foto":"' images/decoradores/no-image-user.jpg '",
  "puesto":"01.38.DIRECTOR GENERAL",
  "num_empleado": "200817",
  "compania":"SISTEMAS INTEGRALES DE COMPRESION",
  "departamento": "DIRECCION GENERAL",
  "centro_costos": "200817",
  "ubicacion":"OFICINA VERACRUZ",
  "className":"nivel-1",
  "children":[
    { "nombre":"AGUILAR PIZARRO VICTOR",
      "foto":"' images/decoradores/no-image-user.jpg '",
      "puesto":"01.36.DIRECTOR DE PLANEACION, ADMINISTRACION Y FINANZAS",
      "num_empleado": "200924",
      "compania":"SISTEMAS INTEGRALES DE COMPRESION",
      "departamento": "DIRECCION GENERAL",
      "centro_costos": "C01ADMYF",
      "ubicacion":"OFICINA VERACRUZ",
      "className":"niveles",
      "children":[
        { "nombre":"VILLEGAS RASCON CLAUDIA ANGELICA",
          "foto":"' images/decoradores/no-image-user.jpg '",
          "puesto":"54.192.COORDINADOR DE TECNOLOGIA DE INFORMACION",
          "num_empleado": "200006",
          "compania":"SISTEMAS INTEGRALES DE COMPRESION",
          "departamento": "TECNOLOGIA DE INFORMACION",
          "centro_costos": "C01TI",
          "ubicacion":"OFICINA VERACRUZ",
          "className":"niveles",
          "children":[
            { "nombre":"JIMENEZ HERRERA ZAIRA",
              "foto":"' images/decoradores/no-image-user.jpg '",
              "puesto":"54.15.AUXILIAR ADMINISTRATIVO",
              "num_empleado": "200185",
              "compania":"SISTEMAS INTEGRALES DE COMPRESION",
              "departamento": "TECNOLOGIA DE INFORMACION",
              "centro_costos": "C01TI",
              "ubicacion":"OFICINA VERACRUZ",
              "className":"staff-level",
            },
            { "nombre":"AVENDAÑO CRUZ LUIS ALBERTO",
              "foto":"' images/decoradores/no-image-user.jpg '",
              "puesto":"54.138.JEFE DE SOPORTE DE INFRAESTRUCTURA",
              "num_empleado": "200971",
              "compania":"SISTEMAS INTEGRALES DE COMPRESION",
              "departamento": "TECNOLOGIA DE INFORMACION",
              "centro_costos": "C01TI",
              "ubicacion":"OFICINA VERACRUZ",
              "className":"niveles",
              "children":[
                  { "nombre":"MARTINEZ GUTIERREZ EDWIN","puesto":"TECNICO ESPECIALISTA",
                    "foto":"' images/decoradores/no-image-user.jpg '",
                    "puesto":"54.61.SOPORTE DE INFRAESTRUCTURA SENIOR",
                    "num_empleado": "200181",
                    "compania":"SISTEMAS INTEGRALES DE COMPRESION",
                    "departamento": "TECNOLOGIA DE INFORMACION",
                    "centro_costos": "C01TI",
                    "ubicacion":"OFICINA VERACRUZ",
                    "className":"niveles",
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
              "className":"niveles",
              "children":[
                { "nombre":"ARIAS ZACARIAS ZACHARIEL",
                  "foto":"' images/decoradores/no-image-user.jpg '",
                  "puesto":"54.09.ANALISTA PROGRAMADOR JR",
                  "num_empleado": "202054",
                  "compania":"SISTEMAS INTEGRALES DE COMPRESION",
                  "departamento": "TECNOLOGIA DE INFORMACION",
                  "centro_costos": "C01TI",
                  "ubicacion":"OFICINA VERACRUZ",
                  "className":"niveles",
                },
                { "nombre":"CASTRO CASTILLO JANET","puesto":"ANALISTA",
                  "foto":"' images/decoradores/no-image-user.jpg '",
                  "puesto":"54.09.ANALISTA PROGRAMADOR JR",
                  "num_empleado": "201289",
                  "compania":"SISTEMAS INTEGRALES DE COMPRESION",
                  "departamento": "TECNOLOGIA DE INFORMACION",
                  "centro_costos": "C01TI",
                  "ubicacion":"OFICINA VERACRUZ",
                  "className":"niveles",
                },
                { "nombre":"CRUZ GOXCON MIGUEL ANGEL",
                  "foto":"' images/decoradores/no-image-user.jpg '",
                  "puesto":"54.10.ANALISTA PROGRAMADOR SENIOR",
                  "num_empleado": "200721",
                  "compania":"SISTEMAS INTEGRALES DE COMPRESION",
                  "departamento": "TECNOLOGIA DE INFORMACION",
                  "centro_costos": "C01TI",
                  "ubicacion":"OFICINA VERACRUZ",
                  "className":"niveles",
                },
                { "nombre":"CORDOVA QUIROZ NADIA",
                  "foto":"' images/decoradores/no-image-user.jpg '",
                  "puesto":"54.09.ANALISTA PROGRAMADOR JR",
                  "num_empleado": "202070",
                  "compania":"SISTEMAS INTEGRALES DE COMPRESION",
                  "departamento": "TECNOLOGIA DE INFORMACION",
                  "centro_costos": "C01TI",
                  "ubicacion":"OFICINA VERACRUZ",
                  "className":"niveles",
                },
                { "nombre":"MARTINEZ JIMENEZ CARLOS ANDRES",
                  "foto":"' images/decoradores/no-image-user.jpg '",
                  "puesto":"54.09.ANALISTA PROGRAMADOR JR",
                  "num_empleado": "200836",
                  "compania":"SISTEMAS INTEGRALES DE COMPRESION",
                  "departamento": "TECNOLOGIA DE INFORMACION",
                  "centro_costos": "C01TI",
                  "ubicacion":"OFICINA VERACRUZ",
                  "className":"niveles",
                }
                ],
            }
          ],
        }
      ]
    }
  ]
}


  return datasource
}