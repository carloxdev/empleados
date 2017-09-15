
// OBJS
var tarjeta= null

/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {

    tarjeta = new TarjetaFoto()
})


/*-----------------------------------------------*\
            OBJETO: Tarjeta filtros
\*-----------------------------------------------*/

function TarjetaFoto() {

    this.$foto = $('#id_foto')
    this.$foto_preview = $('#img_preview')

    this.init_Events()
}
TarjetaFoto.prototype.init_Events = function () {
	this.$foto.on("load",this, this.inicializar_Foto)
    this.$foto.on("change",this, this.set_PreviewImagen)
}
TarjetaFoto.prototype.inicializar_Foto = function (e) {
	alert('algo')
	if (this.files && this.files[0]) {
		alert('algo2')
        var reader = new FileReader()

        reader.onload = function (e) {
            tarjeta.$foto_preview.attr('src', e.target.result)
        }

        reader.readAsDataURL(this.files[0])
    } 
}
TarjetaFoto.prototype.set_PreviewImagen = function (e) {

    if (this.files && this.files[0]) {

        var reader = new FileReader()

        reader.onload = function (e) {
            tarjeta.$foto_preview.attr('src', e.target.result)
        }

        reader.readAsDataURL(this.files[0])

    }
}