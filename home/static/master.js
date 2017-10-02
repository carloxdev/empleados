/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/


var appnova = null


/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

window.paceOptions = {
    // Disable the 'elements' source
    elements: false,
    // Only show the progress on regular and ajax-y page navigation,
    // not every request
    restartOnRequestAfter: true,
    ajax: {
      trackMethods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH']
    }
}

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
NovaSitio.prototype.validar_EspaciosSaltos = function (_string)
{
    return _string.replace(/^\s+|\s+$/g,'');
}
