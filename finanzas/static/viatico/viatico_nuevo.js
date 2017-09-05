/* -------------------- GLOBAL VARIABLES -------------------- */

// OBJS
var formulario = null


/* -------------------- LOAD -------------------- */

$(document).ready(function () {

    formulario = new Formulario()
    // mine = new Miner()
})


/* -------------------- OBJETO: Cabecera -------------------- */

function Formulario() {

    this.$empleado_clave = $('#id_empleado_clave')
    this.$empleado_descripcion = $('#id_empleado_descripcion')
    this.$unidad_negocio_clave = $('#id_unidad_negocio_clave')
    this.$unidad_negocio_descripcion = $('#id_unidad_negocio_descripcion')

    this.$fecha_partida_input = $('#id_fecha_partida_input')
    this.$fecha_regreso_input = $('#id_fecha_regreso_input')

    this.$ciudad_destino = $('#id_ciudad_destino')
    this.$proposito_viaje = $('#id_proposito_viaje')

    this.init_Components()
    this.init_Events()
}
Formulario.prototype.init_Components = function () {

    this.$empleado_clave.select2()
    this.$unidad_negocio_clave.select2()

    this.$fecha_partida_input.datepicker({format: 'dd/mm/yyyy', autoclose: true})
    this.$fecha_regreso_input.datepicker({format: 'dd/mm/yyyy', autoclose: true})
}
Formulario.prototype.init_Events = function () {

    this.$empleado_clave.on("change", this, this.seleccionar_ComboBoxEmpleado)
    this.$unidad_negocio_clave.on("change", this, this.seleccionar_ComboBoxUnidadNegocio)
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
