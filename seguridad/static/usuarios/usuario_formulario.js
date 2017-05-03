/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:
var url_empleado_simple= window.location.origin + "/api/empleadosvistasimple/"

// OBJS
var tarjeta= null

/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {

    tarjeta = new TarjetaUsuario()
})

// Asigna eventos a teclas
$(document).keypress(function (e) {

    // Tecla Enter
    if (e.which == 13) {
    }
})

/*-----------------------------------------------*\
            OBJETO: Tarjeta filtros
\*-----------------------------------------------*/

function TarjetaUsuario() {

    this.$clave_rh = $('#id_clave_rh')
    this.$username = $('#id_username')
    this.$first_name = $('#id_first_name')
    this.$last_name = $('#id_last_name')
    this.$email = $('#id_email')
    this.$fecha_nacimiento = $('#id_fecha_nacimiento')

    this.init_Components()
    this.init_Events()
}
TarjetaUsuario.prototype.init_Components = function () {
    
    this.$clave_rh.select2(this.get_ConfSelect2())
}
TarjetaUsuario.prototype.get_ConfSelect2 = function () {
    return {
        width: '100%'
    }
}
TarjetaUsuario.prototype.init_Events = function () {
    this.$clave_rh.on("change", this, this.escoger_Usuario)
}
TarjetaUsuario.prototype.escoger_Usuario = function (e) {

    // Consultar el API con el numero del empleado.
    var num_empleado = e.data.$clave_rh.val()
    var url = url_empleado_simple + "?pers_empleado_numero=" + num_empleado

    $.ajax({
        url: url,
        method: "GET",
        success: function (response) {
            
            e.data.$first_name.val(response[0].pers_primer_nombre +" "+ response[0].pers_segundo_nombre)
            e.data.$last_name.val(response[0].pers_apellido_paterno +" "+ response[0].pers_apellido_materno)
            e.data.$email.val(response[0].pers_email)
            e.data.$fecha_nacimiento.val(response[0].pers_fecha_nacimiento)
            e.data.$username.val(num_empleado)
        },
        error: function (response) {
            // alertify.error("Ocurrio error al consultar")
            alert("Ocurrio error al consultar")
        }

    })
}