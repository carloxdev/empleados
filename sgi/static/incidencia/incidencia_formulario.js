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

    this.$fecha = $('#id_fecha')
    this.$zona = $('#id_zona')
    this.$empleado = $('#id_empleado_id') 

    this.init_Components()
    this.init_Events()
}
TargetaIncidencia.prototype.init_Components = function () {


    this.$empleado.select2()
    
    
    //this.$fecha.inputmask("yyyy-mm-dd", {"placeholder": "yyyy-mm-dd"})
    this.$fecha.datepicker(
        {
            autoclose: true,
            language: 'es',
            todayHighlight: true,
            clearBtn: true,
            startDate: '2017-01-01',
        }
    )
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
                e.data.$zona.val(4) 
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




