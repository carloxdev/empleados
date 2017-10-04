/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:
var url_empleado_full = window.location.origin + "/api-ebs/viewempleadosfull/"


// OBJS
var targeta = null


/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {

    targeta = new TargetaIncidencia()
})


/*-----------------------------------------------*\
            OBJETO: incidencia
\*-----------------------------------------------*/


function TargetaIncidencia(){

    this.$tipo = $('#id_tipo')
    this.$es_registrable = $('#id_es_registrable')
    this.$fecha = $('#id_fecha')
    this.$empleado = $('#id_empleado_id')
    this.$zona = $('#id_zona')
    this.$lugar = $('#id_lugar')
    this.$dias_incapcidad = $('#id_dias_incapcidad')
    this.$centro_atencion = $('#id_centro_atencion')
    this.$tiene_acr = $('#id_tiene_acr')
    this.$tipo = $('#id_tipo')

    this.init_Components()
    this.init_Events()
}
TargetaIncidencia.prototype.init_Components = function () {

   this.$tipo.select2(appnova.get_ConfigSelect2())
   //this.$fecha.datepicker(appnova.get_ConfDatePicker())
   this.$fecha.datepicker(appnova.get_ConfDateTimePicker())
   this.$empleado.select2(appnova.get_ConfigSelect2())
   this.$zona.select2(appnova.get_ConfigSelect2())
   this.$centro_atencion.select2(appnova.get_ConfigSelect2())
}
TargetaIncidencia.prototype.init_Events = function () {

    this.$empleado.on("change", this, this.escoger_Zona)
}
TargetaIncidencia.prototype.escoger_Zona = function (e) {

    // Consultar el API con el numero del empleado.
    var num_empleado = e.data.$empleado.val()

    var url = url_empleado_full + "?pers_empleado_numero=" + num_empleado

    $.ajax({
        url: url,
        method: "GET",
        success: function (response) {

            // Validar cuando no obtenga regitros

            if (response[0].asig_ubicacion_desc == 'OFICINA VILLAHERMOSA JUJO' ||
                    response[0].asig_ubicacion_desc == 'OFICINA VILLAHERMOSA CEDROS' ||
                    response[0].asig_ubicacion_desc == 'OFICINA VILLAHERMOSA MANGOS') {

                // alert("VILLAHERMOSA")
                e.data.$zona.val(1)
            }

            else if (response[0].asig_ubicacion_desc == 'OFICINA POZA RICA'){
                // alert("POZA RICA")
                e.data.$zona.val(2)
            }
            else if (response[0].asig_ubicacion_desc == 'OFICINA REYNOSA'){
                // alert("REYNOSA")
                e.data.$zona.val(3)
            }
            else if (response[0].asig_ubicacion_desc == 'OFICINA VERACRUZ' ||
                    response[0].asig_ubicacion_desc == 'OFICINA NARANJOS'){
                // alert("VERACRUZ")
                    if (response[0].grup_proyecto_code_jde == '133') {
                        e.data.$zona.val(6)
                    }
                    else {
                        e.data.$zona.val(4)
                    }
            }
            else {
                // alert("NARANJOS")
                e.data.$zona.val(5)
            }


        },
        error: function (response) {
             alertify.error("Ocurrio error al consultar")
            //alert("Ocurrio error al consultar")
        }

    })
}

TargetaIncidencia.prototype.get_DateTimePickerConfig = function () {
    return {
        autoclose: true,
        orientation: "bottom left",
        minViewMode: 2,
        format: "yyyy-mm-dd 00:00:00.000000",
    }
}
