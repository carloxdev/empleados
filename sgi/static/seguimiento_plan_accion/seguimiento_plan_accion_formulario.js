/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:api-
//var url_empleados_bypage = window.location.origin + "/api-ebs/viewempleadosfull_bypage/"

// OBJS
var formulario = null
var tarjeta_resultados = null
var toolbar = null
var grid = null

/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {
    
    formulario = new Formulario()
    tarjeta_resultados = new TarjetaResultados()
})

/*-----------------------------------------------*\
            OBJETO: formulario
\*-----------------------------------------------*/

function Formulario() {

    this.$id_resultado_seguimiento = $('#id_resultado_seguimiento')
    this.$id_fecha_seguimiento_input = $('#id_fecha_seguimiento_input')
    this.$id_fecha_seguimiento = $('#id_fecha_seguimiento')
    this.$id_imagen = $('#id_imagen')
    
    this.$id_boton_guardar = $('#id_boton_guardar')
    this.init_Components()
    this.init_Events()
}
Formulario.prototype.init_Components = function () {

    this.$id_resultado_seguimiento.wysihtml5(appnova.get_ConfWysi())
    this.$id_fecha_seguimiento_input.datetimepicker(this.get_DateTimePickerConfig())
    this.$id_fecha_seguimiento.mask(
        "9999-99-99",
        {
            placeholder:"aaaa/mm/dd"
        }
    )
    this.$id_imagen.each(function(){
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
Formulario.prototype.init_Events = function () {
    
    this.$id_boton_guardar.on("click", this, this.click_BotonGuardar)
}
Formulario.prototype.click_BotonGuardar = function (e) {

    e.preventDefault()
}
Formulario.prototype.get_DateTimePickerConfig = function () {
    return {
        autoclose: true,
        orientation: "bottom left",
        minViewMode: 2,
        format: "yyyy-mm-dd",
    }
}
Formulario.prototype.get_ConfDateRangePicker = function () {

    return {
        locale: {
            format: 'YYYY-MM-DD',
            applyLabel: "Aplicar",
            cancelLabel: "Cancelar",
            fromLabel: "Del",
            separator: " al ",
            toLabel: "Al",            
            weekLabel: "S",
            daysOfWeek: [
                "Do",
                "Lu",
                "Ma",
                "Mi",
                "Ju",
                "Vi",
                "Sa"
            ],
            monthNames: [
                "Enero",
                "Febrero",
                "Marzo",
                "Abril",
                "Mayo",
                "Junio",
                "Julio",
                "Agosto",
                "Septiembre",
                "Octubre",
                "Noviembre",
                "Diciembre"
            ],          
        },
        startDate: '2017-01-01'
    }    
}

/*-----------------------------------------------*\
            OBJETO: Tarjeta resultados
\*-----------------------------------------------*/

function TarjetaResultados(){
    
}