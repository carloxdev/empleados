/*-----------------------------------------------*\
         GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:
//var url_empleados_bypage = window.location.origin + "/api-ebs/viewempleadosfull_bypage/"

// OBJS
var tarjeta_filtros = null
var tarjeta_resultados = null
var popup_acciones = null

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
         OBJETO: ToolBar
\*-----------------------------------------------*/

function ToolBar() {

   tarjeta_filtros = new TarjetaFiltros()
}

/*-----------------------------------------------*\
         OBJETO: Tarjeta filtros
\*-----------------------------------------------*/

function TarjetaFiltros() {

   this.$id_elaborador = $("#id_elaborador")
   this.$id_autorizador = $("#id_autorizador")
   this.$id_aprobador = $("#id_aprobador")
   this.$boton_colapsible = $("#boton_colapsible")
   this.$id_estado = $("#id_estado")
   this.$id_fecha_inicial_final_programada = $("#id_fecha_inicial_final_programada")
   this.$id_fecha_inicial_final_real = $("#id_fecha_inicial_final_real")
   this.$id_compania_auditada = $("#id_compania_auditada")
   this.$boton_buscar = $('#boton_buscar')
   this.$boton_limpiar = $('#boton_limpiar')
   this.init_Components()
   this.init_Events()
}
TarjetaFiltros.prototype.init_Components = function () {

   this.$id_elaborador.select2(appnova.get_ConfigSelect2())
   this.$id_autorizador.select2(appnova.get_ConfigSelect2())
   this.$id_aprobador.select2(appnova.get_ConfigSelect2())
   this.$id_estado.select2(appnova.get_ConfigSelect2())
   this.$id_compania_auditada.select2(appnova.get_ConfigSelect2())
   this.$id_fecha_inicial_final_programada.daterangepicker(this.get_ConfDateRangePicker())
   this.$id_fecha_inicial_final_real.daterangepicker(this.get_ConfDateRangePicker())
}
TarjetaFiltros.prototype.get_ConfDateRangePicker = function () {

   return {
      locale: {
         format: 'YYYY-MM-DD',
         applyLabel: "Aplicar",
         cancelLabel: "Cancelar",
         fromLabel: "Del",
         separator: " al ",
         toLabel: "Al",
         weekLabel: "S",
         daysOfWeek: [
            "Do",
            "Lu",
            "Ma",
            "Mi",
            "Ju",
            "Vi",
            "Sa"
         ],
         monthNames: [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre"
         ],
      },
      startDate: '2017-01-01'
   }
}
TarjetaFiltros.prototype.init_Events = function () {

   this.$boton_buscar.on("click", this, this.click_BotonBuscar)
   this.$boton_limpiar.on("click", this, this.click_BotonLimpiar)
}
TarjetaFiltros.prototype.get_Values = function (_page, _pageSize) {

   return {
   }
}
TarjetaFiltros.prototype.get_FiltrosExcel = function () {

   return {
   }
}
TarjetaFiltros.prototype.click_BotonBuscar = function (e) {

   e.preventDefault()
}
TarjetaFiltros.prototype.click_BotonLimpiar = function (e) {

   e.preventDefault()
}

/*-----------------------------------------------*\
         OBJETO: Grid Cambiar
\*-----------------------------------------------*/

function Grid() {

   popup_acciones = new PopupAcciones()
   this.$id = $('#id_grid_auditoria_lista')
   this.$pk
   this.init_Events()
}
Grid.prototype.init_Events = function () {

   this.$id.on("click", '.clickable-row', this.click_FilaGrid)
   this.$id.on("click", '[data-event=\'acciones\']', this.click_BotonAcciones )
}
Grid.prototype.click_FilaGrid = function (e) {

   $(this).addClass('nova-active-row').siblings().removeClass('nova-active-row')
}
Grid.prototype.click_BotonAcciones = function (e) {

   tarjeta_resultados.grid.$pk = $(this).attr("data-id")
}

/*-----------------------------------------------*\
         OBJETO: PopupAcciones
\*-----------------------------------------------*/

function PopupAcciones() {

   this.$id_boton_checklist = $('#id_boton_checklist')
   this.$id_boton_plan_auditoria = $('#id_boton_plan_auditoria')
   this.init_Events()
}
PopupAcciones.prototype.init_Events = function () {

   this.$id_boton_checklist.on("click", this, this.click_BotonCheckList)
   this.$id_boton_plan_auditoria.on("click", this, this.click_BotonPlanAuditoria)
}
PopupAcciones.prototype.click_BotonCheckList = function (e) {

   window.location.href = window.location.origin + "/auditorias/" + tarjeta_resultados.grid.$pk + "/procesos/"
}
PopupAcciones.prototype.click_BotonPlanAuditoria = function (e) {

   window.open(window.location.origin + "/auditorias/" + tarjeta_resultados.grid.$pk + "/plan_auditoria_preview/")
}
