/*-----------------------------------------------*\
         GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:api-
//var url_requisitos = window.location.origin + "/auditorias/nuevo/procesos/nuevo/requisitos/"

// OBJS
var popup_nuevo = null
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

function TarjetaResultados(){
   
   
   this.toolbar = new ToolBar()
   this.grid = new Grid()
}

/*-----------------------------------------------*\
         OBJETO: ToolBar
\*-----------------------------------------------*/

function ToolBar() {
   
   popup_nuevo = new PopupNuevo()
}

/*-----------------------------------------------*\
         OBJETO: Grid
\*-----------------------------------------------*/

function Grid() {

   popup_acciones = new PopupAcciones()
   this.$id_grid_proceso = $('#id_grid_proceso')
   this.init_Events()
}
Grid.prototype.init_Events = function () {

   this.$id_grid_proceso.on("click", '.clickable-row', this.click_FilaGrid)
}
Grid.prototype.click_FilaGrid = function (e) {

   $(this).addClass('nova-active-row').siblings().removeClass('nova-active-row')
}

/*-----------------------------------------------*\
         OBJETO: Popup nuevo
\*-----------------------------------------------*/

function PopupNuevo() {

   this.$id_proceso = $('#id_proceso')
   this.$id_subproceso = $('#id_subproceso')
   this.$id_representante_subproceso = $('#id_representante_subproceso')
   this.$id_fecha_planificada_desde = $('#id_fecha_planificada_desde')
   this.$id_fecha_planificada_desde_input = $('#id_fecha_planificada_desde_input')
   this.$id_fecha_planificada_hasta = $('#id_fecha_planificada_hasta')
   this.$id_fecha_planificada_hasta_input = $('#id_fecha_planificada_hasta_input')
   this.$id_auditor = $('#id_auditor')
   this.$id_sitio = $('#id_sitio')
   this.$id_boton_guardar = $('#id_boton_guardar')

   this.init_Components()
   this.init_Events()
}
PopupNuevo.prototype.init_Components = function () {

   this.$id_proceso.select2(appnova.get_ConfigSelect2())
   this.$id_subproceso.select2(appnova.get_ConfigSelect2())
   this.$id_representante_subproceso.select2(appnova.get_ConfigSelect2())
   this.$id_fecha_planificada_desde.mask(
      "9999-99-99",
      {
         placeholder:"aaaa/mm/dd"
      }
   )
   this.$id_fecha_planificada_desde_input.datetimepicker(this.get_DateTimePickerConfig())

   this.$id_fecha_planificada_hasta.mask(
      "9999-99-99",
      {
         placeholder:"aaaa/mm/dd"
      }
   )
   this.$id_fecha_planificada_hasta_input.datetimepicker(this.get_DateTimePickerConfig())
   this.$id_auditor.select2(appnova.get_ConfigSelect2())
   this.$id_sitio.select2(appnova.get_ConfigSelect2())
   
}
PopupNuevo.prototype.get_DateTimePickerConfig = function () {
   
   return {
      autoclose: true,
      orientation: "bottom left",
      minViewMode: 2,
      format: "yyyy-mm-dd",
   }
}
PopupNuevo.prototype.init_Events = function () {
   
   this.$id_boton_guardar.on("click", this, this.click_BotonGuardar)
}
PopupNuevo.prototype.click_BotonGuardar = function (e) {

   this.preventDeafult()
}

/*-----------------------------------------------*\
         OBJETO: Popup acciones
\*-----------------------------------------------*/

function PopupAcciones () {
   
   this.$id_tarjeta_acciones = $('#id_tarjeta_acciones')
   this.$id_boton_check_list = $('#id_boton_check_list')
   this.$id_boton_reporta_auditoria = $('#id_boton_reporta_auditoria')
   this.$id_boton_editar = $('#id_boton_editar')
   this.init_Events()
}
PopupAcciones.prototype.init_Events = function () {
   
   this.$id_boton_check_list.on("click", this, this.click_BotonCheckList)
   this.$id_boton_reporta_auditoria.on("click", this, this.click_BotonReporteAuditoria)
}
PopupAcciones.prototype.click_BotonCheckList = function (e) {

   e.preventDeafult()
}
PopupAcciones.prototype.click_BotonReporteAuditoria = function (e) {

   e.preventDeafult()
}