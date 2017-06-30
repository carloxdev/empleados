/*-----------------------------------------------*\
         GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:api-
//var url_empleados_bypage = window.location.origin + "/api-ebs/viewempleadosfull_bypage/"

// OBJS
var popup_nuevo = null
var tarjeta_resultados = null
var toolbar = null
var grid = null


/*-----------------------------------------------*\
         LOAD
\*-----------------------------------------------*/

$(document).ready(function () {
   
   tarjeta_resultados = new TarjetaResultados()
})

/*-----------------------------------------------*\
         OBJETO: Tarjeta resultados
\*-----------------------------------------------*/
function TarjetaResultados () {
   
   toolbar = new ToolBar()
   grid = new Grid()
}

/*-----------------------------------------------*\
         OBJETO: ToolBar
\*-----------------------------------------------*/

function ToolBar () {

   popup_nuevo = new PopupNuevo()
}

/*-----------------------------------------------*\
         OBJETO: Grid
\*-----------------------------------------------*/

function Grid () {

   this.$id_grid_requisito = $('#id_grid_requisito')
   this.init_Events()
}
Grid.prototype.init_Events = function () {

   this.$id_grid_requisito.on("click", '.clickable-row', this.click_FilaGrid)
}
Grid.prototype.click_FilaGrid = function (e) {

   $(this).addClass('nova-active-row').siblings().removeClass('nova-active-row')
}

/*-----------------------------------------------*\
         OBJETO: popup nuevo
\*-----------------------------------------------*/

function PopupNuevo() {

   this.$id_tarjeta_nuevo_requisito = $('#id_tarjeta_nuevo_requisito')
   this.$id_clasificacion_hallazgo = $("#id_clasificacion_hallazgo")
   this.$id_norma = $("#id_norma")
   this.$id_requisito = $('#id_requisito')
   this.$id_boton_guardar = $('#id_boton_guardar')
   
   this.init_Components()
   this.init_Events()
}
PopupNuevo.prototype.init_Components = function () {

   this.$id_clasificacion_hallazgo.select2(appnova.get_ConfigSelect2())
   this.$id_norma.select2(appnova.get_ConfigSelect2())
   this.$id_requisito.select2(appnova.get_ConfigSelect2())
}
PopupNuevo.prototype.init_Events = function () {

   this.$id_boton_guardar.on("click", this, this.click_BotonGuardar)
}
PopupNuevo.prototype.click_BotonGuardar = function (e) {
   
   e.preventDefault()
}