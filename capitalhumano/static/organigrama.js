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
var empresa = ''

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
   this.$contenedor = $('#content-data')

   this.init_Components()
   this.init_Events()
}
TarjetaFiltros.prototype.init_Components = function () {
   this.$organizaciones.select2(appnova.get_ConfigSelect2())
   this.$empresas.select2(appnova.get_ConfigSelect2())
}
TarjetaFiltros.prototype.init_Events = function () {
   this.$organizaciones.on("change", this, organigrama.empleados_Organizacion)
   this.$empresas.on("change", this, organigrama.empleados_Empresa)
}


/*-----------------------------------------------*\
               OBJETO: ORGANIGRAMA
\*-----------------------------------------------*/


function Organigrama(){
}
Organigrama.prototype.empleados_Organizacion = function(e){
  organizacion = e.data.$organizaciones.val()
  tarjeta_filtros.$contenedor.removeClass("nova-contenido-borde")

  if(organizacion != ''){
    tarjeta_filtros.$contenedor.empty()

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
            // console.log(JSON.stringify(response))
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

               alertify.error("Ocurrio error al consultar ")
        }
    })
  }
  else{
    tarjeta_filtros.$contenedor.empty()
    organigrama.mostrar_Mensaje(1)
  }
}
Organigrama.prototype.empleados_Empresa = function(e){
  empresa = e.data.$empresas.val()
  tarjeta_filtros.$contenedor.removeClass("nova-contenido-borde")

  if(empresa != ''){

    tarjeta_filtros.$contenedor.empty()
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

                if (response.length == 0){
                  organigrama.mostrar_Mensaje(0)

                }
                else{
                  organigrama.mostrar_Mensaje(1)
                  organigrama.crear_Diagrama(url)

                }
              },
              error: function (response) {

                alertify.error("Ocurrio error al consultar ")
            }

      })
  }
  else{
    tarjeta_filtros.$contenedor.empty()
    organigrama.mostrar_Mensaje(1)
  }
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
    'initCompleted': function($chart) {
        tarjeta_filtros.$contenedor.addClass("nova-contenido-borde")
      }
  })
}

Organigrama.prototype.mostrar_Mensaje = function (_total){

   if (_total == 0) {

      tarjeta_filtros.$contenedor.html('<h3>La organización/empresa no cuenta con empleados</h3>').addClass("nova-contenido-borde")
   }
   else {

      tarjeta_filtros.$contenedor.html('')
   }
}
