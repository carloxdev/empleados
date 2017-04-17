/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:
var url_usuario = window.location.origin + "/api/usuario/"

// OBJS
var toolbar = null
var grid = null
var usuario = null

/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {

    usuario = new Usuario()
})

/*-----------------------------------------------*\
            OBJETO: usuario
\*-----------------------------------------------*/
function Usuario(){
	alert(url_usuario)
	this.$primer_nombre = $('#id_primer_nombre')
	this.$segundo_nombre = $('#id_segundo_nombre')
	this.$apellido_paterno = $('#id_apellido_paterno')
	this.$apellido_materno = $('#id_apellido_materno')
	this.$genero = $('#id_genero')
	this.$numero = $('#id_numero')
	this.$tipo = $('#id_tipo')
	this.$puesto = $('#id_puesto')
	this.$organizacion = $('#id_organizacion')
	this.$fecha_inicio_contratacion = $('#id_fecha_inicio_contratacion')
	this.$fecha_fin_contratacion = $('#id_fecha_fin_contratacion')
	this.$compania = $('#id_compania')
	this.$zona = $('#id_zona')
	this.$centro_costos = $('#id_centro_costos')
	this.$nomina = $('#id_nomina')
	this.$boton_guardar = $('#id_boton_guardar')
	this.init()
}
Usuario.prototype.init = function () {
	this.$boton_guardar.on("click",this,this.click_BotonGuardar)
}
Usuario.prototype.click_BotonGuardar = function (e) {
	e.preventDefault()

	$.ajax({
            url: url_usuario,
            headers: { "X-CSRFToken": $.cookie('csrftoken') },
            method: "POST",
            data: {  
            	primer_nombre : e.data.$primer_nombre.val(),
				segundo_nombre : e.data.$segundo_nombre.val(),
				apellido_paterno : e.data.$apellido_paterno.val(),
				apellido_materno : e.data.$apellido_materno.val(),
				genero : e.data.$genero.val(),
				numero : e.data.$numero.val(),
				tipo : e.data.$tipo.val(),
				puesto : e.data.$puesto.val(),
				organizacion : e.data.$organizacion.val(),
				fecha_inicio_contratacion : e.data.$fecha_inicio_contratacion.val(),
				fecha_fin_contratacion : e.data.$fecha_fin_contratacion.val(),
				compania : e.data.$compania.val(),
				zona : e.data.$zona.val(),
				centro_costos : e.data.$centro_costos.val(),
				nomina : e.data.$nomina.val(), 
            },
            success: function (response) {
            	alert("Insertado")
                //tarjeta_resultados.grid.buscar()
                //tarjeta_resultados.grid.checar()
                //toolbar.btn_finalizar_captura.disabled = false
                //e.data.$id.modal('hide')
                //cuando se inserta la linea, recarga
                
            },
            error: function (response) {

                //alertify.error("Ocurrio error al insertar datos")
                console.log(e)
            }
        })
}
/*Grid.prototype.limpiar_Formulario = function (e) {
    
    e.preventDefault()
    e.data.$pk.val("")
    e.data.$primer_nombre.val("")
    e.data.$segundo_nombre.val("")
    e.data.$apellido_paterno.val("")
    e.data.$apellido_materno.val("")
    e.data.$genero.val("")
    e.data.$numero.val("")
    e.data.$tipo.val("")
    e.data.$puesto.val("")
    e.data.$organizacion.val("")
    e.data.$fecha_inicio_contratacion.val("")
    e.data.$fecha_fin_contratacion.val("")
    e.data.$compania.val("")
    e.data.$zona.val("")
    e.data.$centro_costos.val("")
    e.data.$nomina.val("")

}*/
