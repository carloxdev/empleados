/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:
var url_view_usuarios = window.location.origin + "/api-jde/viewusuarios/"

// OBJS
var targeta = null


/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {

   targeta = new TargetaWizzard()
})



/*-----------------------------------------------*\
            OBJETO: Tarjeta filtros
\*-----------------------------------------------*/

function TargetaWizzard() {

   this.$id = $('#targeta_wizard')

   this.$clave_rh = $('#id_clave_rh')
   this.$email = $('#id_email')
   this.$clave_jde = $('#id_clave_jde')
   this.$rfc = $('#id_rfc')

   this.$btn_registrar = $('#btn_registrar')

   this.$foto = $('#id_foto')
   this.$foto_preview = $('#img_preview')

   this.init_Components()
   this.set_Events()
}
TargetaWizzard.prototype.init_Components = function () {

   this.$clave_rh.select2()
}
TargetaWizzard.prototype.set_Events = function () {

   this.$clave_rh.on("change", this, this.obtener_ClaveJDE)
   this.$foto.on("change",this, this.set_PreviewImagen)
}
TargetaWizzard.prototype.obtener_ClaveJDE = function (_e) {

    _e.data.$email.val("")
    _e.data.$clave_jde.val("")
    _e.data.$rfc.val("")

    var valor = this.value

    if (valor != "") {
        var url = url_view_usuarios + "?dir=" + valor

        $.ajax({
            url: url,
            method: "GET",
            success: function (_response) {

                if (_response.length != 0) {

                    if(_response.length === 1) {
                        _e.data.$clave_jde.val(_response[0].clave)
                    }
                }
                else {
                    _e.data.$btn_registrar.attr('disabled', 'disabled')
                }

                _e.data.$btn_registrar.removeAttr('disabled')
            },
            error: function (_response) {
                _e.data.$btn_registrar.attr('disabled', 'disabled')
                alertify.error("Ocurrio error al obtener la clave de JDE del Empleado")
            }

        })
    }
}
TargetaWizzard.prototype.set_PreviewImagen = function (e) {

    if (this.files && this.files[0]) {

        var reader = new FileReader()

        reader.onload = function (e) {
            targeta.$foto_preview.attr('src', e.target.result)
        }

        reader.readAsDataURL(this.files[0])

    }
}
