/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:
var url_usuario = window.location.origin + "/api/usuario/"
var url_usuario_lista = window.location.origin + "/usuarios/"

// OBJS
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
	this.$password = $('#id_password')
	this.$username = $('#id_username')
	this.$first_name = $('#id_first_name')
	this.$last_name = $('#id_last_name')
	this.$email = $('#id_email')

	this.$usuario = $('#id_usuario')
	this.$clave_rh = $('#id_clave_rh')
	this.$clave_jde = $('#id_clave_jde')
	this.$fecha_nacimiento = $('#id_fecha_nacimiento')
	this.$foto = $('#id_foto')
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
            	password : e.data.$password.val(),
				username : e.data.$username.val(),
				first_name : e.data.$first_name.val(),
				last_name : e.data.$last_name.val(),
				email : e.data.$email.val(),

				usuario : e.data.$usuario.val(),
				clave_rh : e.data.$clave_rh.val(),
				clave_jde : e.data.$clave_jde.val(),
				fecha_nacimiento : e.data.$fecha_nacimiento.val(),
				foto : e.data.$foto.val(),
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
/*Usuario.prototype.click_BotonGuardarEdicion = function (e){
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
}*/
