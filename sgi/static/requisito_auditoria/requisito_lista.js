/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:api-
//var url_empleados_bypage = window.location.origin + "/api-ebs/viewempleadosfull_bypage/"

// OBJS
var popup_nuevo = null
var popup_acciones = null
var tarjeta_resultados = null
var toolbar = null
var grid = null


/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {
    
    tarjeta_resultados = new TarjetaResultados()
})

/*-----------------------------------------------*\
            OBJETO: Tarjeta resultados
\*-----------------------------------------------*/
function TarjetaResultados () {
    
    popup_nuevo = new PopupNuevo()
    popup_acciones = new PopupAcciones()
}

/*-----------------------------------------------*\
            OBJETO: popup nuevo
\*-----------------------------------------------*/
function PopupNuevo() {

    this.$id_clasificacion_hallazgo = $("#id_clasificacion_hallazgo")
    this.$id_norma = $("#id_norma")
    this.$id_requisito = $('#id_requisito')
    this.$id_boton_modal_guardar = $('#id_boton_modal_guardar')
    
    this.init_Components()
    this.init_Events()
}
PopupNuevo.prototype.init_Components = function () {

    this.$id_clasificacion_hallazgo.select2(appnova.get_ConfigSelect2())
    this.$id_norma.select2(appnova.get_ConfigSelect2())
    this.$id_requisito.select2(appnova.get_ConfigSelect2())
}
PopupNuevo.prototype.init_Events = function () {

    this.$id_boton_modal_guardar.on("click", this, this.click_BotonBuscar)
}
PopupNuevo.prototype.click_BotonBuscar = function (e) {
    
    e.preventDefault()
}

/*-----------------------------------------------*\
            OBJETO: popup acciones
\*-----------------------------------------------*/

function PopupAcciones () {

}