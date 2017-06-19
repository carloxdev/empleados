/*-----------------------------------------------*\
         GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:
//var url_seguimiento_bypage = window.location.origin + "/api-jde/viewscompras_bypage/"

// OBJS
var tarjeta_resultados = null
var popup_nuevo = null
var popup_acciones = null
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

function TarjetaResultados(){
   
   this.toolbar = new ToolBar()
   this.grid = new Grid()
}

/*-----------------------------------------------*\
         OBJETO: ToolBar
\*-----------------------------------------------*/

function ToolBar() {
   
   this.$id_boton_nuevo = $('#id_boton_nuevo')
   this.init_Events()
}
ToolBar.prototype.init_Events = function () {
   this.$id_boton_nuevo.on("click", this, this.click_BotonNuevo)
}
toolbar.prototype.click_BotonNuevo = function (e) {

   e.data.preventDefault()
}

/*-----------------------------------------------*\
         OBJETO: Grid
\*-----------------------------------------------*/

function Grid() {

   popup_nuevo = new PopupNuevo()
   popup_acciones = new PopupAcciones()
}

/*-----------------------------------------------*\
         OBJETO: popup nuevo
\*-----------------------------------------------*/

function PopupNuevo() {
   
   this.$id_sitio = $('#id_sitio')
   this.$id_boton_guardar_sitio = $('#id_boton_guardar_sitio')
}

/*-----------------------------------------------*\
         OBJETO: popup acciones
\*-----------------------------------------------*/

function PopupAcciones() {

   this.$id_tarjeta_acciones = $('#id_tarjeta_acciones')
   this.$id_boton_eliminar_sitio = $('#id_boton_eliminar_sitio')
   this.init_Events()
}
PopupAcciones.prototype.init_Events = function (e) {

   e.data.$id_tarjeta_acciones.modal('hide')
}