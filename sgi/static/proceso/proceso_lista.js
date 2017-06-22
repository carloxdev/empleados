/*-----------------------------------------------*\
         GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:api-
//var url_requisitos = window.location.origin + "/auditorias/nuevo/procesos/nuevo/requisitos/"

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
         OBJETO: Tarjeta nuevo
\*-----------------------------------------------*/
function TarjetaResultados(){
   
   popup_nuevo = new PopupNuevo()
}
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
   this.$id_boton_modal_guardar = $('#id_boton_modal_guardar')

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
   
   this.$id_boton_modal_guardar.on("click", this, this.click_BotonGuardar)
}
