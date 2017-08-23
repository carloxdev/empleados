/*-----------------------------------------------*\
         GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:api-
//var url_requisitos = window.location.origin + "/auditorias/nuevo/procesos/nuevo/requisitos/"

// OBJS
var formulario = null

/*-----------------------------------------------*\
         LOAD
\*-----------------------------------------------*/

$(document).ready(function () {

   formulario = new Formulario()
})

/*-----------------------------------------------*\
         OBJETO: Formulario
\*-----------------------------------------------*/

function Formulario() {

   this.$id_proceso = $('#id_proceso')
   this.$id_subproceso = $('#id_subproceso')
   this.$id_rep_subproceso = $('#id_rep_subproceso')
   this.$id_fecha_programada_ini = $('#id_fecha_programada_ini')
   this.$id_fecha_programada_ini_group = $('#id_fecha_programada_ini_group')
   this.$id_fecha_programada_fin = $('#id_fecha_programada_fin')
   this.$id_fecha_programada_fin_group = $('#id_fecha_programada_fin_group')
   this.$id_auditor = $('#id_auditor')
   this.$id_sitio = $('#id_sitio')
   this.$id_boton_guardar = $('#id_boton_guardar')

   this.init_Components()
   this.init_Events()
}
Formulario.prototype.init_Components = function () {

   this.$id_proceso.select2(appnova.get_ConfigSelect2())
   this.$id_subproceso.select2(appnova.get_ConfigSelect2())
   this.$id_rep_subproceso.select2(appnova.get_ConfigSelect2())
   this.$id_fecha_programada_ini.mask(
      "9999-99-99",
      {
         placeholder:"aaaa/mm/dd"
      }
   )
   this.$id_fecha_programada_ini_group.datetimepicker(this.get_DateTimePickerConfig())

   this.$id_fecha_programada_fin.mask(
      "9999-99-99",
      {
         placeholder:"aaaa/mm/dd"
      }
   )
   this.$id_fecha_programada_fin_group.datetimepicker(this.get_DateTimePickerConfig())
   this.$id_auditor.select2(appnova.get_ConfigSelect2())
   this.$id_sitio.select2(appnova.get_ConfigSelect2())
}
Formulario.prototype.get_DateTimePickerConfig = function () {

   return {
      autoclose: true,
      pickerPosition: "bottom-left",
      minViewMode: 2,
      format: "yyyy-mm-dd",
   }
}
Formulario.prototype.init_Events = function () {


}
