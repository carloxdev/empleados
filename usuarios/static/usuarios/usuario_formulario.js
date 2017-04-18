/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:
var url_usuario = window.location.origin + "/api/usuario/"
var url_usuario_lista = window.location.origin + "/usuarios/lista"

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
    this.$boton_guardar_edicion = $('#id_boton_guardar_edicion')
	this.init()
}
Usuario.prototype.init = function () {
	this.$boton_guardar.on("click",this,this.click_BotonGuardar)
    this.$boton_guardar_edicion.on("click",this,this.click_BotonGuardarEdicion)
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
            	alert("Se ha guardado nuevo usuario")
                window.location.href = url_usuario_lista
                alert(url_usuario_lista)
            },
            error: function (response) {
                console.log(e)
            }
        })
}
Usuario.prototype.click_BotonGuardarEdicion = function (e){
    if (e.data.validar()) {
    
        $.ajax({
                url: url_usuario,
                headers: { "X-CSRFToken": $.cookie('csrftoken') },
                method: "PUT",
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
                    alert("Se han guardado los cambios")
                    window.location.href = url_usuario_lista
                    alert(url_usuario_lista)
                },
                error: function (response) {
                    console.log(e)
                }
            })
    }
}
