/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:api-
//var url_empleados_bypage = window.location.origin + "/api-ebs/viewempleadosfull_bypage/"

// OBJS
var tarjeta_formulario = null
var tarjeta_resultados = null
var toolbar = null
var grid = null


/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {
    
    tarjeta_formulario = new TarjetaFormulario()
    tarjeta_resultados = new TarjetaResultados()
})

/*-----------------------------------------------*\
            OBJETO: Tarjeta filtros
\*-----------------------------------------------*/

function TarjetaFormulario() {

    
    this.$id_observacion = $('#id_observacion')
    this.$id_recursos = $('#id_recursos')
    this.$id_boton_guardar = $('#id_boton_guardar')
    this.init_Components()
    this.init_Events()
}
TarjetaFormulario.prototype.init_Components = function () {

    this.$id_observacion.wysihtml5(appnova.get_ConfWysi())
    this.$id_recursos.each(function(){
        var $input   = $( this ),
            $label   = $input.next( 'label' ),
            labelVal = $label.html();

        $input.on( 'change', function( e )
        {
            var fileName = '';

            if( this.files && this.files.length > 1 )
              fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length )
            else if( e.target.value )
              fileName = e.target.value.split( '\\' ).pop()

            if( fileName )
              $label.find( 'span' ).html( fileName )
            else
              $label.html( labelVal )
        })
        }
        )
}
TarjetaFormulario.prototype.init_Events = function () {

    this.$id_boton_guardar.on("click", this, this.click_BotonGuardar)
}
TarjetaFormulario.prototype.click_BotonGuardar = function (e) {

    e.preventDefault()
}

/*-----------------------------------------------*\
            OBJETO: Tarjeta resultados
\*-----------------------------------------------*/

function TarjetaResultados () {
    
    
}
