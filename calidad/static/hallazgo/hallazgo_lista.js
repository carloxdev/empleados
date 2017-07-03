/*-----------------------------------------------*\
         GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:api-
//var url_empleados_bypage = window.location.origin + "/api-ebs/viewempleadosfull_bypage/"

// OBJS
var popup_hallazgo = null
var popup_filtros = null
var popup_acciones = null
var toolbar = null
var grid = null
var tarjeta_resultados = null

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

   toolbar = new ToolBar()
   grid = new Grid()
}

/*-----------------------------------------------*\
         OBJETO: Toolbar
\*-----------------------------------------------*/

function ToolBar() {

   popup_hallazgo = new PopupHallazgo()
   popup_filtros = new PopupFiltros()
}

/*-----------------------------------------------*\
         OBJETO: Grid
\*-----------------------------------------------*/

function Grid() {

   popup_acciones = new PopupAcciones()
   this.$id_grid_hallazgo = $('#id_grid_hallazgo')
   this.init_Events()
}
Grid.prototype.init_Events = function () {

   this.$id_grid_hallazgo.on("click", '.clickable-row', this.click_FilaGrid)
}
Grid.prototype.click_FilaGrid = function (e) {

   $(this).addClass('nova-active-row').siblings().removeClass('nova-active-row')
}

/*-----------------------------------------------*\
         OBJETO: PopupHallazgo
\*-----------------------------------------------*/

function PopupHallazgo(){

   this.$id_subproceso = $('#id_subproceso')
   this.$id_clasificacion_requisito = $('#id_clasificacion_requisito')
   this.$id_requisito_referencia = $('#id_requisito_referencia')
   this.$id_requisito_adicional = $('#id_requisito_adicional')
   this.$id_tipo_hallazgo = $('#id_tipo_hallazgo')
   this.init_Components()
}
PopupHallazgo.prototype.init_Components = function () {

   this.$id_subproceso.select2(appnova.get_ConfigSelect2())
   this.$id_clasificacion_requisito.select2(appnova.get_ConfigSelect2())
   this.$id_requisito_referencia.multiselect(this.get_ConfMultiSelect())
   this.$id_requisito_adicional.select2(appnova.get_ConfigSelect2())
   this.$id_tipo_hallazgo.select2(appnova.get_ConfigSelect2())
}
PopupHallazgo.prototype.get_ConfMultiSelect = function () {

   return{
      enableFiltering: true,
      buttonWidth: '100%',
      numberDisplayed: 2,
      maxHeight: 150,
      nonSelectedText: "Sin Selección",
      allSelectedText: "Todo Seleccionado",
      nSelectedText: "Seleccionados",
      filterPlaceholder: "Buscar",
   }
}

/*-----------------------------------------------*\
         OBJETO: popup filtros
\*-----------------------------------------------*/

function PopupFiltros(){

   this.$id_proceso = $('#id_proceso')
   this.$id_zona = $('#id_zona')
   this.$id_contrato = $('#id_contrato')
   this.$id_hallazgo = $('#id_hallazgo')
   this.$id_estado = $('#id_estado')
   this.$id_tipo_hallazgo_filtro = $('#id_tipo_hallazgo_filtro')
   this.$id_boton_buscar = $('#id_boton_buscar')
   this.$id_boton_limpiar = $('#d_boton_limpiar')
   this.init_Components()
   this.init_Events()
}
PopupFiltros.prototype.init_Components = function () {

   this.$id_proceso.select2(appnova.get_ConfigSelect2())
   this.$id_zona.select2(appnova.get_ConfigSelect2())
   this.$id_contrato.select2(appnova.get_ConfigSelect2())
   this.$id_estado.select2(appnova.get_ConfigSelect2())
   this.$id_tipo_hallazgo_filtro.select2(appnova.get_ConfigSelect2())
}
PopupFiltros.prototype.init_Events = function () {

   this.$id_boton_buscar.on("click", this, this.click_BotonBuscar)
   this.$id_boton_limpiar.on("click", this, this.click_BotonLimpiar)
}

/*-----------------------------------------------*\
         OBJETO: popup acciones
\*-----------------------------------------------*/

function PopupAcciones() {

   this.$id_tarjeta_acciones = $('#id_tarjeta_acciones')
   // this.$id_boton_cerrar_hallazgo = $('#id_boton_cerrar_hallazgo')
   this.$id_boton_no_conformidad = $('#id_boton_no_conformidad')
   this.init_Events()
}
PopupAcciones.prototype.init_Events = function () {

   this.$id_boton_no_conformidad.on("click", this, this.click_BotonReporteNoConformidad)
}
PopupAcciones.prototype.click_BotonReporteNoConformidad = function (e) {

   e.preventDefault()
   e.data.$id_tarjeta_acciones.modal('hide')
}