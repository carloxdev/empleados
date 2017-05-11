/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// OBJS
var formulario = null

/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {

    formulario = new Formulario()
})

/*-----------------------------------------------*\
            OBJETO: viatico_cabecera
\*-----------------------------------------------*/

function Formulario() {

    this.$empleado_clave = $('#id_empleado_clave')
    this.$unidad_negocio_clave = $('#id_unidad_negocio_clave')
    this.$fecha_partida = $('#id_fecha_partida')
    this.$fecha_regreso = $('#id_fecha_regreso')
    
    this.$ciudad_destino = $('#id_ciudad_destino')
    this.$proposito_viaje = $('#id_proposito_viaje')

    this.init_Components()
    this.init_Events()
}
Formulario.prototype.init_Components = function () {


    this.$empleado_clave.select2()
    this.$unidad_negocio_clave.select2()
    
    this.$fecha_partida.datetimepicker()
    this.$fecha_regreso.datetimepicker({
        useCurrent: false
    })
}
Formulario.prototype.init_Events = function () {


    this.$fecha_partida.on("dp.change", this, this.seleccion_FechaPartida)
    this.$fecha_regreso.on("dp.change", this, this.seleccion_FechaRegreso)
}
Formulario.prototype.seleccion_FechaPartida = function (e) {
    e.data.$fecha_regreso.data("DateTimePicker").minDate(e.date)
}
Formulario.prototype.seleccion_FechaRegreso = function (e) {
    e.data.$fecha_partida.data("DateTimePicker").maxDate(e.date)   
}

