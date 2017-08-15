/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:api-
//var url_empleados_bypage = window.location.origin + "/api-ebs/viewempleadosfull_bypage/"

// OBJS
var formulario = null


/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {

    formulario = new Formulario()
})

/*-----------------------------------------------*\
            OBJETO: formulario
\*-----------------------------------------------*/
function Formulario() {

    this.$id_auditores_designados = $("#id_auditores_designados")
    this.$id_auditores_colaboradores = $("#id_auditores_colaboradores")
    this.$id_boton_guardar = $("#id_boton_guardar")
    this.init_Components()
    this.init_Events()
}
Formulario.prototype.init_Components = function () {

    this.$id_auditores_designados.select2(appnova.get_ConfigSelect2())
    this.$id_auditores_colaboradores.select2(appnova.get_ConfigSelect2())
}
Formulario.prototype.init_Events = function () {

    this.$id_boton_guardar.on('click', this, this.click_BotonGuardar)
}
Formulario.prototype.click_BotonGuardar = function (e) {

}
