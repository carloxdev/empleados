/*-----------------------------------------------*\
               GLOBAL VARIABLES
\*-----------------------------------------------*/

var url_organigrama = window.location.origin + "/api-ebs/vieworganigrama/"
var url_datos_org = window.location.origin + "/organigrama/json-org/"
var url_datos_emp = window.location.origin + "/organigrama/json-emp/"

//OBJS
var organigrama = null
var tarjeta_filtros = null
var organizacion = 0

/*-----------------------------------------------*\
               LOAD
\*-----------------------------------------------*/

$(document).ready(function(){
   organigrama = new Organigrama()
   tarjeta_filtros = new TarjetaFiltros()
})

/*-----------------------------------------------*\
               OBJETO: TARJETA FILTROS
\*-----------------------------------------------*/


function TarjetaFiltros(){

   this.$organizaciones = $('#id_organizaciones')
   this.$empresas = $('#id_empresas')

   this.init_Components()
   this.init_Events()
}
TarjetaFiltros.prototype.init_Components = function () {
   this.$organizaciones.select2(this.get_ConfSelect2())
   this.$empresas.select2(this.get_ConfSelect2())
}
TarjetaFiltros.prototype.init_Events = function () {
   this.$organizaciones.on("change", this, organigrama.empleados_Organizacion)
   this.$empresas.on("change", this, organigrama.empleados_Empresa)
}
TarjetaFiltros.prototype.get_ConfSelect2 = function () {
   return {
      width: '100%'
   }
}
/*-----------------------------------------------*\
               OBJETO: ORGANIGRAMA
\*-----------------------------------------------*/


function Organigrama(){
}
Organigrama.prototype.empleados_Organizacion = function(e){
  organizacion = e.data.$organizaciones.val()
  $('#content-data').empty()

  var url = url_datos_org + organizacion + "/"

   $.ajax({
            url: url_organigrama,
            data: {
              asig_organizacion_clave:organizacion
            },
            dataType: "json",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            context: this,
            success: function (response) {
              cont = 0
              for (var i = 0; i < response.length; i++) {
                cont+=1
              }

              if (cont == 0){
                organigrama.mostrar_Mensaje(cont)
              }
              else{
                organigrama.mostrar_Mensaje(cont)
                organigrama.crear_Diagrama(url)
              }
              
            },
            error: function (response) {

                         alert("Ocurrio error al consultar ")
                  }

    })
}
Organigrama.prototype.empleados_Empresa = function(e){
  empresa = e.data.$empresas.val()
  $('#content-data').empty()

  var url = url_datos_emp + empresa + "/"

   $.ajax({
            url: url_organigrama,
            data: {
              grup_compania_jde:empresa
            },
            dataType: "json",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            context: this,
            success: function (response) {
              cont = 0
              for (var i = 0; i < response.length; i++) {
                cont+=1
              }

              if (cont == 0){
                organigrama.mostrar_Mensaje(cont)

              }
              else{
                organigrama.mostrar_Mensaje(cont)
                organigrama.crear_Diagrama(url)

              }
             
            },
            error: function (response) {

                         alert("Ocurrio error al consultar ")
                  }

    })
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

var datasource2 =
{ "nombre":"VILLEGAS RASCON CLAUDIA ANGELICA",
  "foto":"' images/decoradores/no-image-user.jpg '",
  "puesto":"54.192.COORDINADOR DE TECNOLOGIA DE INFORMACION",
  "num_empleado": "200006",
  "compania":"SISTEMAS INTEGRALES DE COMPRESION",
  "departamento": "TECNOLOGIA DE INFORMACION",
  "centro_costos": "C01TI",
  "ubicacion":"OFICINA VERACRUZ",
  "children":[
    { "nombre":"JIMENEZ HERRERA ZAIRA",
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
          { "nombre":"MARTINEZ GUTIERREZ EDWIN","puesto":"TECNICO ESPECIALISTA",
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
        { "nombre":"CASTRO CASTILLO JANET","puesto":"ANALISTA",
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
Organigrama.prototype.mostrar_Mensaje = function (_total){

   if(_total == 0){
      document.getElementById('container-mensaje').innerHTML='La organización/empresa no cuenta con empleados'
      $('#contenedor').hide()

   }else{
      document.getElementById('container-mensaje').innerHTML=' '
      $('#contenedor').show()
   }
}

// Organigrama.prototype.buscar_Empleados = function (){
//   _organizacion = '130'
//    var url = url_datos + _organizacion + "/"

//    $.ajax({
//             url: url,
//             data: {},
//             dataType: "json",
//             type: "GET",
//             contentType: "application/json; charset=utf-8",
//             context: this,
//             success: function (response) {

//               console.log(JSON.stringify(response))
//               organigrama.crear_Diagrama(response)
//             },
//             error: function (response) {

//                          alert("Ocurrio error al consultar")
//                   }

//     })
// }
