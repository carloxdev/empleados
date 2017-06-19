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
NovaSitio.prototype.set_AlertifyConfig = function() {

    alertify.set('notifier', 'position', 'top-right')
    alertify.set('notifier', 'delay', 10)   

    alertify.defaults.theme.ok = "btn btn-primary";
    alertify.defaults.theme.cancel = "btn btn-danger";
    alertify.defaults.theme.input = "form-control";

}
NovaSitio.prototype.get_ConfigSelect2 = function() {
    return {
        width: '100%'
    }
}