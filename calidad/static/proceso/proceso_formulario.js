/*-----------------------------------------------*\
         GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:
var url_subproceso = window.location.origin + "/api-calidad/subproceso/"
var url_responsable = window.location.origin + "/api-calidad/responsable/"

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
Formulario.prototype.set_Subproceso = function () {

   $.ajax({

       url: url_subproceso,
       method: "GET",
       context: this,
       data: {

         "proceso_id" : this.$id_proceso.val()
       },
       success: function (_response) {

          var data = []
          for (var i = 0; i < _response.length; i++) {
            data.push({id:_response[i].pk, text:_response[i].subproceso })
          }

          this.$id_subproceso.select2('destroy').empty().select2({data:data})
       },
       error: function (_response) {

          alertify.error("Ocurrio error al cargar datos")
       }
    })
}
Formulario.prototype.set_RepresentanteSubproceso = function (e) {

   $.ajax({

       url: url_responsable,
       method: "GET",
       context: this,
       data: {

         "proceso_id" : this.$id_proceso.val()
       },
       success: function (_response) {

          var data = []
          for (var i = 0; i < _response.length; i++) {
            data.push({id:_response[i].pk, text:_response[i].numero_empleado + " : " + _response[i].nombre_completo })
          }

          this.$id_rep_subproceso.select2('destroy').empty().select2({data:data})
       },
       error: function (_response) {

          alertify.error("Ocurrio error al cargar datos")
       }
    })
}
