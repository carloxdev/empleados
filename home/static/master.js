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
    this.$submodulo = $("#submodulo")

    this.set_ActivePage()
}
NovaSitio.prototype.set_ActivePage = function () {
    if (this.$submodulo.text() == "Solicitudes de Viaticos") 
    {
        this.activar_Opcion("solicitudes")
    }
}
NovaSitio.prototype.activar_Opcion = function (_option) {

    var $opcion = $("#" + _option)
    $opcion.addClass("active")
}