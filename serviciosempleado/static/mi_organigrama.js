/*/*-----------------------------------------------*\
               GLOBAL VARIABLES
\*-----------------------------------------------*/

var url_datos_org = window.location.origin + "/perfil/organigrama/json-org/"

//OBJS
var organigrama = null

/*-----------------------------------------------*\
               LOAD
\*-----------------------------------------------*/

$(document).ready(function(){
   organigrama = new Organigrama()
})

/*-----------------------------------------------*\
               OBJETO: ORGANIGRAMA
\*-----------------------------------------------*/


function Organigrama(){

  this.$organizacion = $('#id_organizacion')
  this.$numero_empleado = $('#id_empleado')
  this.$contenedor = $('#content-data')
  this.obtener_Datos()

}
Organigrama.prototype.obtener_Datos = function (){

  organizacion = this.$organizacion.val()
  numero_empleado = this.$numero_empleado.val()
  if(organizacion != undefined){
    this.crear_Url(organizacion, numero_empleado)
  }
}
Organigrama.prototype.crear_Url = function(_organizacion, _numero_empleado){

  var url = url_datos_org + _organizacion + "/" + _numero_empleado + "/"
  this.crear_Diagrama(url)

}
Organigrama.prototype.crear_Diagrama = function(_url){

   this.$contenedor.orgchart({
    'data' : _url,
    // 'depth': 3,
    // 'collapsed': true,
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
        organigrama.$contenedor.addClass("nova-contenido-borde")
      }
  })
}
