/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

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
    this.init_Components()
}
Formulario.prototype.init_Components = function () {

    this.$id_auditores_designados.select2(appnova.get_ConfigSelect2())
    this.$id_auditores_colaboradores.select2(appnova.get_ConfigSelect2())
}
