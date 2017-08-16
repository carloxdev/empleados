/*-----------------------------------------------*\
         GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:api-
//var url_empleados_bypage = window.location.origin + "/api-ebs/viewempleadosfull_bypage/"

// OBJS
var formulario = null

/*-----------------------------------------------*\
         LOAD
\*-----------------------------------------------*/

$(document).ready(function () {

   formulario = new Formulario()
})

/*-----------------------------------------------*\
         OBJETO: formulario
\*-----------------------------------------------*/
function Formulario() {

   this.$id_tipo_auditoria = $("#id_tipo_de_auditoria")
   this.$id_compania = $("#id_compania")
   this.$id_contratos = $("#id_contratos")
   this.$id_criterios = $("#id_criterios")

   this.$id_fecha_programada_ini = $('#id_fecha_programada_ini')
   this.$id_fecha_programada_ini_group = $('#id_fecha_programada_ini_group')
   this.$id_fecha_programada_fin = $('#id_fecha_programada_fin')
   this.$id_fecha_programada_fin_group = $('#id_fecha_programada_fin_group')

   this.$id_objetivo = $("#id_objetivo")
   this.$id_alcance_auditoria = $("#id_alcance_auditoria")
   this.$id_recursos_necesarios = $("#id_recursos_necesarios")

   this.$id_boton_guardar = $('#id_boton_guardar')

   this.init_Components()
   this.init_Events()
}
Formulario.prototype.init_Components = function () {

   this.$id_tipo_auditoria.select2(appnova.get_ConfigSelect2())
   this.$id_compania.select2(appnova.get_ConfigSelect2())
   this.$id_contratos.select2(appnova.get_ConfigSelect2())
   this.$id_criterios.select2(appnova.get_ConfigSelect2())

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

}
Formulario.prototype.get_DateTimePickerConfig = function () {
   return {
      autoclose: true,
      orientation: "bottom left",
      minViewMode: 2,
      format: "yyyy-mm-dd",
   }
}
Formulario.prototype.init_Events = function () {

   this.$id_boton_guardar.on("click", this, this.click_BotonGuardar)
}
Formulario.prototype.click_BotonGuardar = function (e) {

  //  e.preventDefault()

}
