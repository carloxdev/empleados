/*-----------------------------------------------*\
         GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:api-
//var url_empleados_bypage = window.location.origin + "/api-ebs/viewempleadosfull_bypage/"

// OBJS
var popup_hallazgo = null
var popup_filtros = null
var popup_acciones = null
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

   this.toolbar = new ToolBar()
   this.grid = new Grid()
}

/*-----------------------------------------------*\
         OBJETO: Toolbar
\*-----------------------------------------------*/

function ToolBar() {

   popup_hallazgo = new PopupHallazgo()
   popup_filtros = new PopupFiltros()
   this.$id_boton_nuevo = $('#id_boton_nuevo')
   this.init_Events()
}
ToolBar.prototype.init_Events = function () {

   this.$id_boton_nuevo.on("click", this, this.click_BotonNuevo)
}
ToolBar.prototype.click_BotonNuevo = function (e) {

    popup_hallazgo.mostrar(0, "nuevo")
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

   this.$id = $('#id_tarjeta_hallazgo')
   this.$id_titulo = $('#id_titulo')
   this.$id_subproceso = $('#id_subproceso')
   this.$id_requisito_referencia = $('#id_requisito_referencia')
   this.$id_descripciones = $('#id_descripciones')
   this.$id_tipo_hallazgo = $('#id_tipo_hallazgo')
   this.$id_observaciones = $('#id_observaciones')
   this.$id_titulo = $('#id_popup_hallazgo_titulo')
   this.$accion
   this.init_Components()
}
PopupHallazgo.prototype.init_Components = function () {

   this.$id_subproceso.select2(appnova.get_ConfigSelect2())
   this.$id_requisito_referencia.multiselect(this.get_ConfMultiSelect())
   this.$id_requisito_referencia.siblings("div.btn-group").find("ul.multiselect-container").addClass('nova-bootstrap-multiselect-width-ul')
   this.$id_descripciones.multiselect(this.get_ConfMultiSelect())
   this.$id_descripciones.siblings("div.btn-group").find("ul.multiselect-container").addClass('nova-bootstrap-multiselect-width-ul')
   this.$id_tipo_hallazgo.select2(appnova.get_ConfigSelect2())
}
PopupHallazgo.prototype.get_ConfMultiSelect = function () {

   return {

      enableFiltering: true,
      buttonWidth: '100%',
      numberDisplayed: 2,
      maxHeight: 150,
      nonSelectedText: "Sin Selección",
      allSelectedText: "Todo Seleccionado",
      nSelectedText: "Seleccionados",
      filterPlaceholder: "Buscar",
      disableIfEmpty: true,
   }
}
PopupHallazgo.prototype.mostrar = function (_pk, _accion) {

   this.$id.modal("show").attr("data-primaryKey", _pk)
   this.$accion = _accion

   if (_accion == "nuevo") {

      this.$id_titulo.text('Nuevo Hallazgo')
   }
   else if (_accion == "editar") {

      this.$id_titulo.text('Editar Hallazgo')
      this.set_Data(_pk)
   }
}

/*-----------------------------------------------*\
         OBJETO: popup filtros
\*-----------------------------------------------*/

function PopupFiltros(){

   this.$id = $('#id_tarjeta_filtros')
   this.$id_titulo_filter = $('#id_titulo_filter')
   this.$id_subproceso_filter = $('#id_subproceso_filter')
   this.$id_sitio_filter = $('#id_sitio_filter')
   this.$id_cerrado_filter = $('#id_cerrado')
   this.$id_tipo_hallazgo_filter = $('#id_tipo_hallazgo_filter')

   this.$id_boton_buscar = $('#id_boton_buscar')
   this.$id_boton_limpiar = $('#d_boton_limpiar')
   this.init_Components()
   this.init_Events()
}
PopupFiltros.prototype.init_Components = function () {

   this.$id_subproceso_filter.select2(appnova.get_ConfigSelect2())
   this.$id_sitio_filter.select2(appnova.get_ConfigSelect2())
   this.$id_cerrado_filter.select2(appnova.get_ConfigSelect2())
   this.$id_tipo_hallazgo_filter.select2(appnova.get_ConfigSelect2())
}
PopupFiltros.prototype.init_Events = function () {

   this.$id_boton_buscar.on("click", this, this.click_BotonBuscar)
   this.$id_boton_limpiar.on("click", this, this.click_BotonLimpiar)
}

/*-----------------------------------------------*\
         OBJETO: popup acciones
\*-----------------------------------------------*/

function PopupAcciones() {

   this.$id = $('#id_tarjeta_acciones')
   this.$id_boton_no_conformidad = $('#id_boton_no_conformidad')
   this.init_Events()
}
PopupAcciones.prototype.init_Events = function () {

   this.$id_boton_no_conformidad.on("click", this, this.click_BotonReporteNoConformidad)
}
PopupAcciones.prototype.click_BotonReporteNoConformidad = function (e) {

   e.preventDefault()
   e.data.$id.modal('hide')
}
