/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:
//var url_incidencia= window.location.origin + "/api/incidenciadocumento/"


// OBJS
var IncidenciaNuevo = null


/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {

    incidencianuevo = new IncidenciaNuevo()
})

/*-----------------------------------------------*\
            OBJETO: incidencia
\*-----------------------------------------------*/


function IncidenciaNuevo(){

    this.$fecha = $('#fecha')
    this.init()
}

IncidenciaNuevo.prototype.init = function () {
    this.$fecha.inputmask("yyyy-mm-dd", {"placeholder": "yyyy-mm-dd"})
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

