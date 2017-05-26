/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:
var url_empleado_simple = window.location.origin + "/api-ebs/viewempleadossimple/"
var url_view_usuarios = window.location.origin + "/api-jde/viewusuarios/"

// OBJS
var targeta = null


/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {

   targeta = new TargetaWizzard()
})



/*-----------------------------------------------*\
            OBJETO: Tarjeta filtros
\*-----------------------------------------------*/

function TargetaWizzard() {

   this.$id = $('#targeta_wizard')
   this.$clave_rh = $('#id_clave_rh')

   this.$username = $('#id_username')
   this.$first_name = $('#id_first_name')
   this.$last_name = $('#id_last_name')
   this.$email = $('#id_email')   
   this.$fecha_nacimiento = $('#id_fecha_nacimiento')

   this.$clave_jde = $('#id_clave_jde')

   this.$btn_registrar = $('#btn_registrar')

   this.init_Components()
   this.init_Events()
}
TargetaWizzard.prototype.init_Components = function () {
    
   this.$clave_rh.select2()
}
TargetaWizzard.prototype.init_Events = function () {

   this.$clave_rh.on("change", this, this.obtener_EmpleadoEbs)
}
TargetaWizzard.prototype.obtener_EmpleadoEbs = function (_e) {

   var valor = this.value

   if (valor != "") {
      var url = url_empleado_simple + "?pers_empleado_numero=" + valor

       $.ajax({
           url: url,
           method: "GET",
           success: function (response) { 

               if (response.length != 0) {
                  _e.data.fill_Campos(response)
                  _e.data.obtener_ClaveJDE(valor)
               }
               else {
                  _e.data.clear_Campos()
                  _e.data.$btn_registrar.attr('disabled', 'disabled')
                  alertify.warning('No existe el numero de empleado especificado.')
               }

           },
           error: function (response) {
               _e.data.clear_Campos()
               _e.data.$btn_registrar.attr('disabled', 'disabled')
               alertify.error("Ocurrio error al obtener informacion del Empleado")
           }

       })      
   }
   else {
      _e.data.clear_Campos()
      _e.data.$btn_registrar.attr('disabled', 'disabled')
   }
}
TargetaWizzard.prototype.fill_Campos = function (_data) {

   this.$first_name.val((_data[0].pers_primer_nombre +" "+ _data[0].pers_segundo_nombre).split(" -")[0])
   this.$last_name.val(_data[0].pers_apellido_paterno +" "+ _data[0].pers_apellido_materno)
   this.$fecha_nacimiento.val((_data[0].pers_fecha_nacimiento).split(" ")[0])
   this.$email.val(_data[0].pers_email)
    
}
TargetaWizzard.prototype.clear_Campos = function () {
   this.$first_name.val("")
   this.$last_name.val("")
   this.$fecha_nacimiento.val("")
   this.$email.val("")
   this.$clave_jde.val("")
}
TargetaWizzard.prototype.obtener_ClaveJDE = function (_value) {

   var url = url_view_usuarios + "?dir=" + _value

   $.ajax({
        url: url,
        method: "GET",
        success: function (response) { 

            if (response.length != 0) {            
               targeta.$clave_jde.val(response[0].clave)
            }
            else {
               targeta.$clave_jde.val("")
            }

            targeta.$btn_registrar.removeAttr('disabled')
        },
        error: function (response) {
            targeta.$clave_jde.val("")
            targeta.$btn_registrar.removeAttr('disabled')
            alertify.error("Ocurrio error al obtener la clave de JDE del Empleado")
        }

    })
}


