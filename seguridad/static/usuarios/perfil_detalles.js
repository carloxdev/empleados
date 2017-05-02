/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// OBJS
var formulario = null


/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {

    formulario = new TargetaFormulario() 
})


/*-----------------------------------------------*\
            OBJETO: Targeta Filtros
\*-----------------------------------------------*/

function TargetaFormulario() {

    this.$imagen = $('#id_imagen')
    this.$imagen_preview = $('#img_preview')
 //   this.$control_imagen = $('#imagen-clear_id')

    this.init()
}
TargetaFormulario.prototype.init = function () { 
    
    this.$imagen.on("change",this, this.set_PreviewImagen)
}
TargetaFormulario.prototype.set_PreviewImagen = function (e) {

    if (this.files && this.files[0]) {
        
        var reader = new FileReader()

        reader.onload = function (e) {
            formulario.$imagen_preview.attr('src', e.target.result)
        }

        reader.readAsDataURL(this.files[0])

    }
}

