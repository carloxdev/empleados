/* -------------------- GLOBAL VARIABLES -------------------- */

// URLS:
var url_viaticocabecera = window.location.origin + "/api-finanzas/viaticolinea/"

// OBJS:
var cabecera = null
var lineas = null


/* -------------------- LOAD -------------------- */

$(document).ready(function () {

    cabecera = new Cabecera()
    lineas = new Lineas()
})


/* -------------------- OBJETO: Cabecera -------------------- */

function Cabecera() {

    this.$clave = $('#clave')
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

    this.init()
    this.set_Events()
}
Cabecera.prototype.init = function () {

    this.$empleado_clave.select2()
    this.$unidad_negocio_clave.select2()

    this.$fecha_partida_input.datepicker({format: 'dd/mm/yyyy', autoclose: true})
    this.$fecha_regreso_input.datepicker({format: 'dd/mm/yyyy', autoclose: true})
}
Cabecera.prototype.set_Events = function () {

    this.$empleado_clave.on("change", this, this.seleccionar_ComboBoxEmpleado)
    this.$unidad_negocio_clave.on("change", this, this.seleccionar_ComboBoxUnidadNegocio)

}
Cabecera.prototype.get_DateTimePickerConfig = function () {
    return {
        autoclose: true,
        orientation: "bottom left",
        minView: 2,
        format: "yyyy-mm-dd",
    }
}
Cabecera.prototype.seleccionar_ComboBoxEmpleado = function(e) {

    var value_select = e.data.$empleado_clave.find(":selected").text()

    e.data.$empleado_descripcion.val(
        Miner.get_TextFromSelectOption(value_select)
    )
}
Cabecera.prototype.seleccionar_ComboBoxUnidadNegocio = function(e) {

    var value_select = e.data.$unidad_negocio_clave.find(":selected").text()

    e.data.$unidad_negocio_descripcion.val(
        Miner.get_TextFromSelectOption(value_select)
    )
}


/* -------------------- OBJETO: Lineas -------------------- */

function Lineas() {

    this.toolbar = new Toolbar()
    this.grid = new Grid()
}


/* -------------------- OBJETO: Toolbar -------------------- */

function Toolbar() {

    this.$boton_nuevo = $('#boton_nuevo')
    this.$boton_exportar = $('#boton_exportar')
}


/* -------------------- OBJETO: FuenteDatos -------------------- */

function FuenteDatos() {
    this.instancia = null
    this.init()
}
FuenteDatos.prototype.init = function() {
    this.instancia = new kendo.data.DataSource(this.get_Configuracion())
}
FuenteDatos.prototype.get_Configuracion = function () {

    return {

        serverPaging: true,
        transport: {
            read: {
                url: url_viaticocabecera,
                type: "GET",
                dataType: "json",
            },
        },
        schema: {
            model: {
                fields: this.get_Campos()
            }
        },
        error: function (e) {
            alertify.error("Status: " + e.status + "; Error message: " + e.errorThrown)
        },
    }
}
FuenteDatos.prototype.get_Campos = function () {

    return {
        pk : { type: "number" },
        slug : { type: "string" },
        concepto : { type: "string" },
        observaciones : { type: "string" },
        importe : { type: "decimal" },
    }
}


/* -------------------- OBJETO: Grid -------------------- */

function Grid() {

    this.$id = $("#grid_lineas")
    this.fuente_datos = null
    this.instancia = null
    this.init()
}
Grid.prototype.init = function () {

    // Definicion del pais, formato modena, etc..
    kendo.culture("es-MX")

    // Se inicializa la fuente da datos (datasource)
    fdatos = new FuenteDatos()
    this.fuente_datos = fdatos.instancia

    // Se inicializa y configura el grid:
    this.instancia = this.$id.kendoGrid(this.get_Configuracion())
}
Grid.prototype.get_Configuracion = function () {

    return {
        dataSource: this.fuente_datos,
        columnMenu: false,
        groupable: false,
        sortable: false,
        editable: false,
        resizable: true,
        selectable: true,
        columns: this.get_Columnas(),
        scrollable: true,
        pageable: false,
        noRecords: {
            template: "<div class='nova-grid-empy'> Sin Lineas/Gastos </div>"
        },
        // dataBound: this.set_Icons,
    }
}
Grid.prototype.get_Columnas = function () {
    return [
        {
            field: "slug",
            title: "#",
            width: "35px",
            // template: '<a class="btn btn-default nova-url" href="#=Grid.prototype.get_EditUrl(pk)#">#="VIA-" + pk#</a>',
        },
        {
            field: "concepto",
            title: "Concepto",
            width:"180px"
        },
        { field: "observaciones", title: "observaciones", width:"300px" },
        { field: "importe", title: "Importe"},
    ]
}
// Grid.prototype.click_BotonEditar = function (e) {
//
//     var fila = this.dataItem($(e.currentTarget).closest('tr'))
//     window.location.href = url_viaticocabecera_editar + fila.pk;
// }
// Grid.prototype.set_Icons = function (e) {
//
//     e.sender.tbody.find(".k-button.fa.fa-pencil").each(function(idx, element){
//         $(element).removeClass("fa fa-pencil").find("span").addClass("fa fa-pencil")
//     })
// }
// Grid.prototype.get_EditUrl = function(_pk) {
//   return url_viaticocabecera_editar.replace('/0/', '/' + _pk + '/')
// }
Grid.prototype.buscar = function() {
    this.fuente_datos.read()
}
