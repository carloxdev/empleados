/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

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
    this.$email = $('#id_email')

    this.init_Components()
}
TarjetaUsuario.prototype.init_Components = function () {
    
    this.$email.select2(this.get_ConfSelect2())
}
TarjetaUsuario.prototype.get_ConfSelect2 = function () {
    return {
        width: '100%'
    }
}

