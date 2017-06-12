/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:api-
//var url_empleados_bypage = window.location.origin + "/api-ebs/viewempleadosfull_bypage/"

// OBJS
var formulario = null
var organigrama = null


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

    this.$id_objetivo = $("#id_objetivo")


    this.init_Components()
    this.init_Events()
}
Formulario.prototype.init_Components = function () {

    
    this.$id_objetivo.wysihtml5(this.get_ConfWysi())
    
    
}

Formulario.prototype.get_ConfWysi = function () {
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

Formulario.prototype.init_Events = function () {
    return {
    }
}
