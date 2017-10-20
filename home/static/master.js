/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/


var appnova = null


/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

// window.paceOptions = {
//     // Disable the 'elements' source
//     elements: false,
//     // Only show the progress on regular and ajax-y page navigation,
//     // not every request
//     restartOnRequestAfter: false,
//     ajax: {
//       trackMethods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH']
//     }
// }

$(document).ready(function () {

    appnova = new NovaSitio()

    // FastClick.attach(document.body)
})

/*-----------------------------------------------*\
            OBJETO: NovaSitio
\*-----------------------------------------------*/

function NovaSitio() {

    this.galletita = $.cookie('csrftoken')
    this.$menu = $("#menu")
    this.$user = $('#request_user').text()

    this.set_ActivePage()
    this.set_AlertifyConfig()
}
NovaSitio.prototype.set_ActivePage = function () {

    opcion = this.$menu.data("opcion")

    this.activar_Opcion(opcion)
}
NovaSitio.prototype.activar_Opcion = function (_option) {

    var $opcion = $("#" + _option)
    $opcion.addClass("active")
}
NovaSitio.prototype.set_AlertifyConfig = function () {

    alertify.set('notifier', 'position', 'top-right')
    alertify.set('notifier', 'delay', 10)

    alertify.defaults.theme.ok = "btn btn-primary";
    alertify.defaults.theme.cancel = "btn btn-danger";
    alertify.defaults.theme.input = "form-control";

}
NovaSitio.prototype.get_ConfigSelect2 = function () {
    return {
        width: '100%'
    }
}
NovaSitio.prototype.get_ConfDateRangePicker = function () {

    return {
        locale: {
            // format: 'YYYY-MM-DD',
            format: 'DD-MM-YYYY',
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
        // startDate: '2017-01-01'
        startDate: '01-01-2017'
    }
}
NovaSitio.prototype.get_ConfDatePicker = function () {

   return {

      format: 'dd/mm/yyyy',
      autoclose: true,
      language: 'es'
   }
}

NovaSitio.prototype.get_ConfDateTimePicker = function () {

   return {

      format: 'dd/mm/yyyy 00:00:00.000000',
      autoclose: true,
      language: 'es'
   }
}

NovaSitio.prototype.validar_EspaciosSaltos = function (_string)
{
    return _string.replace(/^\s+|\s+$/g,'');
}
NovaSitio.prototype.get_FechaConFormato = function (element) {

    fecha = $(element).datepicker("getDate")
    fecha_conformato = moment(fecha).format('YYYY-MM-DD')

    if (fecha_conformato == "Invalid date") {
        return ""
    }
    else {
        return fecha_conformato
    }
}
NovaSitio.prototype.set_FechaConFormato = function (element, date) {

   try {
      fecha = date.split("-")
      $(element).datepicker("update", fecha[2] + "/" + fecha[1] +"/"+ fecha[0])

   } catch (e) {
      $(element).datepicker("clearDates")
   }
}
NovaSitio.prototype.get_FechaDisplay = function (date) {

   try {

      fecha = date.split("-")
      return fecha[2] + "/" + fecha[1] +"/"+ fecha[0]
   } catch (e) {

      return date
   }
}
