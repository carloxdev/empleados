/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:
var url_empleado_simple= window.location.origin + "/api/empleadosvistasimple/"
var url_profile = window.location.origin + "/api/profile/"
var url_usuariosvista = window.location.origin + "/api/usuariosvista/"


// OBJS
var tarjeta= null

//
var num_empleado


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
    this.$clave_jde = $('#id_clave_jde')
    this.$contrasena = $('#id_password')
    this.$confirmar = $('#id_confirmar')

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
    this.$clave_rh.on("change", this, this.buscar_EmpleadoProfile)
}
TarjetaUsuario.prototype.buscar_EmpleadoProfile = function (e) {

    // Consultar el PROFILE API en SEGURIDAD con el numero del empleado.
    num_empleado = e.data.$clave_rh.val()
    var url = url_profile + "?clave_rh="  + num_empleado

    $.ajax({
        url: url,
        method: "GET",
        success: function (response) {

            if (response.length != 0) {
                alert('La clave de empleado seleccionada ya esta asociada a un usuario.')
<<<<<<< HEAD
                //this.$username.disabled = true

                //Limpiar formulario
=======
>>>>>>> origin/master
                tarjeta.limpiar_Formulario()
             }
             else {
                tarjeta.buscar_EmpleadoEBS(num_empleado)
             }
        },
        error: function (response) {
            alert("Ocurrio error al consultar")
        }

    })
}
TarjetaUsuario.prototype.buscar_EmpleadoEBS = function (_clave) {

    // Consultar el VIEW EMPLEADOS API  en EBS con el numero del empleado.
    num_empleado = _clave
    var url = url_empleado_simple + "?pers_empleado_numero=" + num_empleado

    $.ajax({
        url: url,
        method: "GET",
        success: function (response) { 

<<<<<<< HEAD
            if (response.length != 0) {
                tarjeta.llenar_Formulario(response)
            }
            else {
                alert('No existe el numero de empleado especificado.')
            }
=======
<<<<<<< HEAD

            // llenar_Formulario()
            

            e.data.$first_name.val((response[0].pers_primer_nombre +" "+ response[0].pers_segundo_nombre).split(" -")[0])
            e.data.$last_name.val(response[0].pers_apellido_paterno +" "+ response[0].pers_apellido_materno)
            e.data.$email.val(response[0].pers_email)
            e.data.$fecha_nacimiento.val((response[0].pers_fecha_nacimiento).split(" ")[0])
            e.data.$username.val(num_empleado)
=======
            //Llenar formulario
            tarjeta.llenar_Formulario()

>>>>>>> origin/master
>>>>>>> origin/master
        },
        error: function (response) {
            alert("Ocurrio error al consultar")
        }

    })
}
TarjetaUsuario.prototype.llenar_Formulario = function (_response) {

    this.$first_name.val((_response[0].pers_primer_nombre +" "+ _response[0].pers_segundo_nombre).split(" -")[0])
    this.$last_name.val(_response[0].pers_apellido_paterno +" "+ _response[0].pers_apellido_materno)
    this.$email.val(_response[0].pers_email)
    this.$fecha_nacimiento.val((_response[0].pers_fecha_nacimiento).split(" ")[0])
    this.$username.val(num_empleado)

}
TarjetaUsuario.prototype.limpiar_Formulario = function () {

    this.$first_name.val("")
    this.$last_name.val("")
    this.$email.val("")
    this.$fecha_nacimiento.val("")
    this.$username.val("")
    this.$contrasena.val("")

}
