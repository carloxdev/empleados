/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:api-
//var url_empleados_bypage = window.location.origin + "/api-ebs/viewempleadosfull_bypage/"

// OBJS
var formulario = null
var organigrama = null
var select_componente = null


/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {
    
    formulario = new Formulario()
    select_componente = new Componente()
})

/*-----------------------------------------------*\
            OBJETO: Targeta filtros
\*-----------------------------------------------*/

function Componente(){
    this.$puesto = $('#id_puesto')
    this.$reportar = $('#id_reportar')
    this.$funciones = $('#funciones')
    
    this.init_Components()
}  
Componente.prototype.init_Components= function(){
    this.$puesto.select2(this.get_ConfSelect2())
    this.$reportar.select2(this.get_ConfSelect2())
}
Componente.prototype.get_ConfSelect2 = function () {
   return {
      width: '100%'
    }
}

/*-----------------------------------------------*\
            OBJETO: auditoria_general
\*-----------------------------------------------*/
function Formulario() {

    this.$id_objetivo = $("#id_objetivo")
    this.$funciones = $("#funciones")
    this.$id_objetivo2 = $("#id_objetivo2")
    this.$id_responsabilidades = $("#id_responsabilidades")
    this.$id_reporte = $("#id_reporte")
    this.$desc_puesto = $("#desc_puesto")

    this.init_Components()
    this.init_Events()
}
Formulario.prototype.init_Components = function () {
  
   this.$desc_puesto.select2()
    
    this.$id_objetivo.wysihtml5(this.get_ConfWysi())
    this.$funciones.wysihtml5(this.get_ConfWysi())
    this.$id_objetivo2.wysihtml5(this.get_ConfWysi())
    this.$id_responsabilidades.wysihtml5(this.get_ConfWysi())
    this.$id_reporte.wysihtml5(this.get_ConfWysi())
    
    
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
