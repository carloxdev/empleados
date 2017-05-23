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

    this.$id_compania = $("#id_compania")
    this.$id_contratos = $("#id_contratos")
    this.$id_criterios = $("#id_criterios")

    this.$id_fecha_planificada_desde = $('#id_fecha_planificada_desde')
    this.$id_fecha_planificada_desde_input = $('#id_fecha_planificada_desde_input')
    this.$id_fecha_planificada_hasta = $('#id_fecha_planificada_hasta')
    this.$id_fecha_planificada_hasta_input = $('#id_fecha_planificada_hasta_input')

    this.$id_objetivo = $("#id_objetivo")
    this.$id_alcance_auditoria = $("#id_alcance_auditoria")
    this.$id_recursos_necesarios = $("#id_recursos_necesarios")

    this.init_Components()
    this.init_Events()
}
Formulario.prototype.init_Components = function () {

    this.$id_compania.select2(this.get_ConfSelect2())
    this.$id_contratos.select2(this.get_ConfSelect2())
    this.$id_criterios.select2(this.get_ConfSelect2())

    this.$id_fecha_planificada_desde.mask(
        "9999-99-99",
        {
            placeholder:"aaaa/mm/dd"
        }
    )
    this.$id_fecha_planificada_desde_input.datetimepicker(this.get_DateTimePickerConfig())

    this.$id_fecha_planificada_hasta.mask(
        "9999-99-99",
        {
            placeholder:"aaaa/mm/dd"
        }
    )
    this.$id_fecha_planificada_hasta_input.datetimepicker(this.get_DateTimePickerConfig())

    this.$id_objetivo.wysihtml5(this.get_ConfWysi())
    this.$id_alcance_auditoria.wysihtml5(this.get_ConfWysi())
    this.$id_recursos_necesarios.wysihtml5(this.get_ConfWysi())
    
}
Formulario.prototype.get_ConfSelect2 = function () {
    return {
        width: '100%'
    }
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
Formulario.prototype.get_DateTimePickerConfig = function () {
    return {
        autoclose: true,
        orientation: "bottom left",
        minViewMode: 2,
        format: "yyyy-mm-dd",
    }
}
Formulario.prototype.init_Events = function () {
    return {
    }
}
