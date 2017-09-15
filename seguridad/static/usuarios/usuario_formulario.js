/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:
var url_empleado_simple= window.location.origin + "/api-ebs/viewempleadossimple/"
var url_profile = window.location.origin + "/api-seguridad/profile/"
var url_viewusuarios = window.location.origin + "/api-jde/viewusuarios/"


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

    this.$foto = $('#id_foto')
    this.$foto_preview = $('#img_preview')

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
    this.$foto.on("change",this, this.set_PreviewImagen)
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
                //Limpiar formulario
                tarjeta.limpiar_Formulario()
             }
             else {
                tarjeta.buscar_EmpleadoEBS(num_empleado)
                tarjeta.buscar_EmpleadoJDE(num_empleado)
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

            if (response.length != 0) {
                tarjeta.llenar_Formulario(response)
            }
            else {
                alert('No existe el numero de empleado especificado.')
            }

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
TarjetaUsuario.prototype.buscar_EmpleadoJDE = function (_clave) {

    // Consultar el VIEW USUARIOS API con el numero del empleado.
    num_empleado = _clave
    var url = url_viewusuarios + "?dir="  + num_empleado
    var datos = this.$clave_jde
    $.ajax({
        url: url,
        method: "GET",
        success: function (response) {
            //alert(JSON.stringify(response))
            if (response.length != 0){
                datos.val(response[0].clave)
             }else{
                //this.$clave_jde.val("None")
             }
        },
        error: function (response) {
            alert("Ocurrio error al consultar")
        }

    })
}
TarjetaUsuario.prototype.set_PreviewImagen = function (e) {

    if (this.files && this.files[0]) {

        var reader = new FileReader()

        reader.onload = function (e) {
            tarjeta.$foto_preview.attr('src', e.target.result)
        }

        reader.readAsDataURL(this.files[0])

    }
}
TarjetaUsuario.prototype.limpiar_Formulario = function () {

    this.$first_name.val("")
    this.$last_name.val("")
    this.$email.val("")
    this.$fecha_nacimiento.val("")
    this.$username.val("")
    this.$contrasena.val("")

}
