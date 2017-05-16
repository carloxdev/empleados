/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/


var nova_sitio = null
var galletita = ""


/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {
    
    nova_sitio = new NovaSitio()
})




/*-----------------------------------------------*\
            OBJETO: NovaSitio
\*-----------------------------------------------*/

function NovaSitio() {

    this.galletita = $.cookie('csrftoken')
    this.$menu = $("#menu")

    this.set_ActivePage()
}
NovaSitio.prototype.set_ActivePage = function () {

    opcion = this.$menu.data("opcion")

    this.activar_Opcion(opcion)
}
NovaSitio.prototype.activar_Opcion = function (_option) {

    var $opcion = $("#" + _option)
    $opcion.addClass("active")
}