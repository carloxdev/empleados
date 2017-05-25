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
            OBJETO: auditoria_general
\*-----------------------------------------------*/
function Formulario() {

    this.$id_auditores = $("#id_auditores")
    this.$id_auditores_colaboradores = $("#id_auditores_colaboradores")

    this.init_Components()
    this.init_Events()
}
Formulario.prototype.init_Components = function () {

    this.$id_auditores.select2(this.get_ConfSelect2())
    this.$id_auditores_colaboradores.select2(this.get_ConfSelect2())
}
Formulario.prototype.get_ConfSelect2 = function () {
    return {
        width: '100%'
    }
}
Formulario.prototype.init_Events = function () {
    return {
    }
}
