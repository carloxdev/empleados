/*-----------------------------------------------*\
               GLOBAL VARIABLES
\*-----------------------------------------------*/

var url_organigrama = window.location.origin + "/api-ebs/vieworganigrama/"
var url_datos = window.location.origin + "/organigrama/json/"

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
   organigrama.crear_Diagrama()
         
})

/*-----------------------------------------------*\
               OBJETO: TARJETA FILTROS
\*-----------------------------------------------*/


function TarjetaFiltros(){

   this.$organizaciones = $('#id_organizaciones')
   this.$empresas = $('id_empresas')

   this.init_Components()
   this.init_Events()
}
TarjetaFiltros.prototype.init_Components = function () {
   this.$organizaciones.select2(this.get_ConfSelect2())
   this.$empresas.select2(this.get_ConfSelect2())
}
TarjetaFiltros.prototype.init_Events = function () {
   this.$organizaciones.on("change", this, organigrama.empleados_Organizacion)
   //this.$empresas.on("change", this, organigrama.buscar_Empleados)
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

              if (cont == 0)
                organigrama.mostrar_Mensaje(cont)
              else{
                organigrama.mostrar_Mensaje(cont)
                organigrama.buscar_Empleados(organizacion)
              }
              
            },
            error: function (response) {

                         alert("Ocurrio error al consultar ")
                  }

    })
}
Organigrama.prototype.buscar_Empleados = function (_organizacion){

   var url = url_datos + _organizacion + "/"

   $.ajax({
            url: url,
            data: {},
            dataType: "json",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            context: this,
            success: function (response) {

              console.log(JSON.stringify(response))
              //organigrama.crear_Diagrama(response)
            },
            error: function (response) {

                         alert("Ocurrio error al consultar")
                  }

    })
}
Organigrama.prototype.crear_Diagrama = function(){
  $('#content-data').orgchart({
    'data' : this.get_Data(),
    'depth': 2,
    'nodeTitle': 'title',
    'nodeContent': 'name',
    'toggleSiblingsResp': true,
    'zoom': false,
    'pan': true
  })
}
Organigrama.prototype.get_Data = function(){

var datasource2 =
{ "name":"VILLEGAS RASCON CLAUDIA ANGELICA  <br> COSA",
  "title":"COORDINADOR jajaj aja ja. aja ja jajaj ajaj ajaja. jajja",
  "children":[
    {"name":"JIMENEZ HERRERA ZAIRA","title":"AUXILIAR"},
    {"name":"AVENDAÑO CRUZ LUIS ALBERTO","title":"JEFE","collapsed": false,
      "children":[
        {"name":"MARTINEZ GUTIERREZ EDWIN","title":"TECNICO ESPECIALISTA"}
        ],
    },
    {"name":"MARTINEZ HERNANDEZ JORGE JESUS","title":"JEFE",
      "children":[
        {"name":"ARIAS ZACARIAS ZACHARIEL","title":"ANALISTA"},
        {"name":"CASTRO CASTILLO JANET","title":"ANALISTA"},
        {"name":"CRUZ GOXCON MIGUEL ANGEL","title":"TECNICO ESPECIALISTA"},
        {"name":"CORDOVA QUIROZ NADIA","title":"ANALISTA"},
        {"name":"MARTINEZ JIMENEZ CARLOS ANDRES","title":"ANALISTA"}
        ],
    }
  ],
}
  return datasource2
}
Organigrama.prototype.mostrar_Mensaje = function (_total){

   if(_total == 0){
      document.getElementById('container-mensaje').innerHTML='La organización no cuenta con empleados'
      $('#contenedor').hide()

   }else{
      document.getElementById('container-mensaje').innerHTML=' '
      $('#contenedor').show()
   }
}
