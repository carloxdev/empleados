/*-----------------------------------------------*\
         GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:
//var url_seguimiento_bypage = window.location.origin + "/api-jde/viewscompras_bypage/"

// OBJS
var tarjeta_filtros = null
var tarjeta_resultados = null
var tarjeta_detalles = null
var toolbar = null
var grid = null


/*-----------------------------------------------*\
         LOAD
\*-----------------------------------------------*/

$(document).ready(function () {
   
   tarjeta_filtros = new TarjetaFiltros()
   tarjeta_resultados = new TarjetaResultados()
})

/*-----------------------------------------------*\
         OBJETO: Tarjeta filtros
\*-----------------------------------------------*/
function TarjetaFiltros() {

   this.$id_compania = $('#id_compania')
   this.$id_empleado = $('#id_empleado')
   this.$id_rol = $('#id_rol')

   this.$id_compania_filtro = $('#id_compania_filtro')
   this.$id_empleado_filtro = $('#id_empleado_filtro')
   this.$id_rol_filtro = $('#id_rol_filtro')

   this.$boton_buscar = $('#boton_buscar')
   this.$boton_limpiar = $('#boton_limpiar')
   this.init_Components()
   this.init_Events()
}
TarjetaFiltros.prototype.init_Components = function () {
   
   this.$id_compania.select2(appnova.get_ConfigSelect2())
   this.$id_empleado.select2(appnova.get_ConfigSelect2())
   this.$id_rol.select2(appnova.get_ConfigSelect2())

   this.$id_compania_filtro.select2(appnova.get_ConfigSelect2())
   this.$id_rol_filtro.select2(appnova.get_ConfigSelect2())
}
TarjetaFiltros.prototype.init_Events = function () {

   this.$boton_buscar.on("click", this, this.click_BotonBuscar)
   this.$boton_limpiar.on("click", this, this.click_BotonLimpiar)
}






/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:api-
//var url_empleados_bypage = window.location.origin + "/api-ebs/viewempleadosfull_bypage/"

// OBJS
var popup_rol = null
var popup_filtro = null
var popup_acciones = null
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

function TarjetaResultados() {
   
   this.toolbar = new ToolBar()
   this.grid = new Grid()
}

/*-----------------------------------------------*\
            OBJETO: toolbar
\*-----------------------------------------------*/

function ToolBar() {
   
   this.$id_boton_nuevo_formato = $('#id_boton_nuevo_formato')
   this.$id_boton_filtros = $('#id_boton_filtros')
   popup_rol = new PopupRol()
   popup_filtro = new PopupFiltro()
}

/*-----------------------------------------------*\
            OBJETO: grid
\*-----------------------------------------------*/

function Grid() {

   popup_acciones = new PopupAcciones()
}

/*-----------------------------------------------*\
            OBJETO: popup rol
\*-----------------------------------------------*/

function PopupRol(){

   this.$id_compania = $('#id_compania')
   this.$id_empleado = $('#id_empleado')
   this.$id_rol = $('#id_rol')
   this.$id_boton_guardar = $('#id_boton_guardar')
   this.init_Components()
   this.init_Events()
}
PopupRol.prototype.init_Components = function () {

   this.$id_compania.select2(appnova.get_ConfigSelect2())
   this.$id_empleado.select2(appnova.get_ConfigSelect2())
   this.$id_rol.select2(appnova.get_ConfigSelect2())
}
PopupRol.prototype.init_Events = function () {

   this.$id_boton_guardar.on("click", this, this.click_BotonGuardar)
}
PopupRol.prototype.click_BotonGuardar = function (e) {

   e.data.preventDefault()
}

/*-----------------------------------------------*\
            OBJETO: popup formato
\*-----------------------------------------------*/

function PopupFiltro(){

   this.$id_compania_filtro = $('#id_compania_filtro')
   this.$id_empleado_filtro = $('#id_empleado_filtro')
   this.$id_rol_filtro = $('#id_rol_filtro')
   this.$id_boton_buscar = $('#id_boton_buscar')
   this.$id_boton_limpiar = $('#id_boton_limpiar')
   this.init_Components()
   this.init_Events()
}
PopupFiltro.prototype.init_Components = function () {

   this.$id_compania_filtro.select2(appnova.get_ConfigSelect2())
   this.$id_rol_filtro.select2(appnova.get_ConfigSelect2())
}
PopupFiltro.prototype.init_Events = function () {

   this.$id_boton_buscar.on("click", this, this.click_BotonBuscar)
   this.$id_boton_limpiar.on("click", this, this.click_BotonLimpiar)
}
PopupFiltro.prototype.click_BotonBuscar = function (e) {

   e.data.preventDefault()
}
PopupFiltro.prototype.click_BotonLimpiar = function (e) {

   e.data.preventDefault()
}

/*-----------------------------------------------*\
            OBJETO: popup acciones
\*-----------------------------------------------*/

function PopupAcciones() {

   this.$id_tarjeta_acciones = $('#id_tarjeta_acciones')
   this.$id_boton_editar = $('#id_boton_editar')
   this.$id_boton_eliminar = $('#id_boton_eliminar')
   this.init_Events()
}
PopupAcciones.prototype.init_Events = function () {

   this.$id_boton_editar.on("click", this, this.ocultar)
}
PopupAcciones.prototype.ocultar = function (e) {

   e.preventDefault()
   e.data.$id_tarjeta_acciones.modal('hide')
}