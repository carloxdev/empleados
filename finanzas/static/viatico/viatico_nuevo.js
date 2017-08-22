/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// OBJS
var formulario = null

//  $("#date").mask("99/99/9999",{placeholder:"mm/dd/yyyy"});

/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {

    formulario = new Formulario()
    // mine = new Miner()
})

/*-----------------------------------------------*\
            OBJETO: viatico_cabecera
\*-----------------------------------------------*/

function Formulario() {

    this.$empleado_clave = $('#id_empleado_clave')
    this.$empleado_descripcion = $('#id_empleado_descripcion')
    this.$unidad_negocio_clave = $('#id_unidad_negocio_clave')
    this.$unidad_negocio_descripcion = $('#id_unidad_negocio_descripcion')
    this.$fecha_partida = $('#id_fecha_partida')
    this.$fecha_partida_input = $('#id_fecha_partida_input')
    this.$fecha_regreso = $('#id_fecha_regreso')
    this.$fecha_regreso_input = $('#id_fecha_regreso_input')

    this.$ciudad_destino = $('#id_ciudad_destino')
    this.$proposito_viaje = $('#id_proposito_viaje')

    this.init_Components()
    this.init_Events()
}
Formulario.prototype.init_Components = function () {

    this.$empleado_clave.select2()
    this.$unidad_negocio_clave.select2()

    this.$fecha_partida_input.datetimepicker(this.get_DateTimePickerConfig())
    this.$fecha_regreso_input.datetimepicker(this.get_DateTimePickerConfig())
}
Formulario.prototype.init_Events = function () {

    this.$empleado_clave.on("change", this, this.seleccionar_ComboBoxEmpleado)
    this.$unidad_negocio_clave.on("change", this, this.seleccionar_ComboBoxUnidadNegocio)

}
Formulario.prototype.get_DateTimePickerConfig = function () {
    return {
        autoclose: true,
        orientation: "bottom left",
        minView: 2,
        format: "yyyy-mm-dd",
    }
}
Formulario.prototype.seleccionar_ComboBoxEmpleado = function(e) {

    var value_select = e.data.$empleado_clave.find(":selected").text()

    e.data.$empleado_descripcion.val(
        Miner.get_TextFromSelectOption(value_select)
    )
}
Formulario.prototype.seleccionar_ComboBoxUnidadNegocio = function(e) {

    var value_select = e.data.$unidad_negocio_clave.find(":selected").text()

    e.data.$unidad_negocio_descripcion.val(
        Miner.get_TextFromSelectOption(value_select)
    )
}
