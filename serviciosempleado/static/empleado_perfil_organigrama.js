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
  org = this.$organizacion.val()
  this.crear_Url(org)
}
Organigrama.prototype.crear_Url = function(_organizacion){
  var url = url_datos_org + _organizacion + "/"
  this.crear_Diagrama(url)
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