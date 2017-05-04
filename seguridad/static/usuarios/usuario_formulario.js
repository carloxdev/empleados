/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:
var url_empleado_simple= window.location.origin + "/api/empleadosvistasimple/"
var url_profile_datos = window.location.origin + "/api/profile/"
var url_usuarios_view = window.location.origin + "/api/usuariosvista/"


// OBJS
var tarjeta= null

//
var num_empleado = null

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
    this.$clave_rh.on("change", this, this.validar_Clave)
    this.$clave_rh.on("change", this, this.llenar_Usuario)
    this.$clave_rh.on("change", this, this.llenar_Clavejde)
}
TarjetaUsuario.prototype.validar_Clave = function (e) {

    // Consultar el PROFILE API con el numero del empleado.
    num_empleado = e.data.$clave_rh.val()
    var url_profile = url_profile_datos + "?clave_rh="  + num_empleado

    $.ajax({
        url: url_profile,
        method: "GET",
        success: function (response) {
            //alert(JSON.stringify(response))
            if (response.length == 0){
                //escoger_Usuario()
             }else{
                alert('La clave de empleado seleccionada ya esta asociada a un usuario.')
             }
        },
        error: function (response) {
            alert("Ocurrio error al consultar")
        }

    })
}
TarjetaUsuario.prototype.llenar_Usuario = function (e) {

    // Consultar el VIEW EMPLEADOS API con el numero del empleado.
    num_empleado = e.data.$clave_rh.val()
    var url = url_empleado_simple + "?pers_empleado_numero=" + num_empleado

    $.ajax({
        url: url,
        method: "GET",
        success: function (response) { 

            e.data.$first_name.val((response[0].pers_primer_nombre +" "+ response[0].pers_segundo_nombre).split(" -")[0])
            e.data.$last_name.val(response[0].pers_apellido_paterno +" "+ response[0].pers_apellido_materno)
            e.data.$email.val(response[0].pers_email)
            e.data.$fecha_nacimiento.val((response[0].pers_fecha_nacimiento).split(" ")[0])
            e.data.$username.val(num_empleado)
        },
        error: function (response) {
            // alertify.error("Ocurrio error al consultar")
            alert("Ocurrio error al consultar")
        }

    })
}
TarjetaUsuario.prototype.llenar_Clavejde = function (e) {

    // Consultar el VIEW USUARIOS API con el numero del empleado.
    num_empleado = e.data.$clave_rh.val()
    var url_usuarios_jde = url_usuarios_view + "?dir="  + num_empleado

    $.ajax({
        url: url_usuarios_jde,
        method: "GET",
        success: function (response) {
            //alert(JSON.stringify(response))
            if (response.length == 0){
             }else{
                e.data.$clave_jde.val(response[0].clave)
             }
        },
        error: function (response) {
            alert("Ocurrio error al consultar")
        }

    })
}