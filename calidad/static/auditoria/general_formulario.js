/*-----------------------------------------------*\
         GLOBAL VARIABLES
\*-----------------------------------------------*/

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

   this.$id_fecha_programada_ini = $('#id_fecha_programada_ini_input')
   this.$id_fecha_programada_fin = $('#id_fecha_programada_fin_input')

   this.$id_objetivo = $("#id_objetivo")
   this.$id_alcance_auditoria = $("#id_alcance_auditoria")
   this.$id_recursos_necesarios = $("#id_recursos_necesarios")

   this.init_Components()
}
Formulario.prototype.init_Components = function () {

   this.$id_tipo_auditoria.select2(appnova.get_ConfigSelect2())
   this.$id_compania.select2(appnova.get_ConfigSelect2())
   this.$id_contratos.select2(appnova.get_ConfigSelect2())
   this.$id_criterios.select2(appnova.get_ConfigSelect2())
   this.$id_fecha_programada_ini.datepicker(appnova.get_ConfDatePicker())
   this.$id_fecha_programada_fin.datepicker(appnova.get_ConfDatePicker())
}
