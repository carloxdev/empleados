/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/


var appnova = null


/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {
    
    appnova = new NovaSitio()
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
NovaSitio.prototype.get_ConfWysi = function () {
    return {
        toolbar: {
            "font-styles": true,
            "emphasis": true,
            "lists": true,
            "html": false,
            "link": false,
            "image": false,
            "color": false,
            "blockquote": false,
        }
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