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
    this.$un_clave = $('#id_un_clave')
    this.$un_descripcion = $('#id_un_descripcion')

    this.$fecha_partida_input = $('#id_fecha_partida_input')
    this.$fecha_regreso_input = $('#id_fecha_regreso_input')

    this.$ciudad_destino = $('#id_ciudad_destino')
    this.$proposito_viaje = $('#id_proposito_viaje')

    this.init_Components()
    this.init_Events()
}
Formulario.prototype.init_Components = function () {

    this.$empleado_clave.select2()
    this.$un_clave.select2()

    this.$fecha_partida_input.datepicker(appnova.get_ConfDatePicker())
    this.$fecha_regreso_input.datepicker(appnova.get_ConfDatePicker())
}
Formulario.prototype.init_Events = function () {

    this.$empleado_clave.on("change", this, this.seleccionar_ComboBoxEmpleado)
    this.$un_clave.on("change", this, this.seleccionar_ComboBoxUnidadNegocio)
}
Formulario.prototype.seleccionar_ComboBoxEmpleado = function(e) {

    var value_select = e.data.$empleado_clave.find(":selected").text()

    e.data.$empleado_descripcion.val(
        Miner.get_TextFromSelectOption(value_select)
    )
}
Formulario.prototype.seleccionar_ComboBoxUnidadNegocio = function(e) {

    var value_select = e.data.$un_clave.find(":selected").text()

    e.data.$un_descripcion.val(
        Miner.get_TextFromSelectOption(value_select)
    )
}
