/* -------------------- GLOBAL VARIABLES -------------------- */

// URLS:
var url_viaticocabecera_bypage = window.location.origin + "/api-finanzas/viaticocabecera_bypage/"
var url_viaticocabecera_editar = ""

// OBJS
var tarjeta_filtros = null
var tarjeta_resultados = null

// $.fn.modal.Constructor.prototype.enforceFocus = function () {}


/* -------------------- LOAD -------------------- */

$(document).ready(function () {

    // Inicializar URLS:
    url_viaticocabecera_editar = window.location.origin.toString() + $('#url_viaticocabecera_editar').val()

    // Inicializando Objetos
    tarjeta_filtros = new PopupFiltros()
    tarjeta_resultados = new TarjetaResultados()

    // Asigna eventos a teclas
    $(document).keypress(function (e) {

        // Tecla Enter
        if (e.which == 13) {

            if (tarjeta_filtros.$id.hasClass('in')) {
                tarjeta_filtros.apply_Filters()
            }

        }
    })
})


/* -------------------- OBJETO: Popup Filtros -------------------- */

function PopupFiltros() {

    this.$id = $('#tarjeta_filtros')

    this.$proposito_viaje = $('#id_proposito_viaje')
    this.$empleado = $('#id_empleado')
    this.$unidad_negocio = $('#id_unidad_negocio')
    this.$ciudad_destino = $('#id_ciudad_destino')
    this.$autorizador = $('#id_autorizador')

    this.$created_date_mayorque = $('#id_created_date_mayorque_group')
    this.$created_date_menorque = $('#id_created_date_menorque_group')

    this.$boton_buscar = $('#boton_buscar')
    this.$boton_limpiar = $('#boton_limpiar')

    this.init()
    this.set_Events()

}
PopupFiltros.prototype.init = function () {

    this.$empleado.select2()
    this.$unidad_negocio.select2()
    this.$autorizador.select2()
    this.$created_date_mayorque.datepicker({format: 'dd/mm/yyyy', autoclose: true})
    this.$created_date_menorque.datepicker({format: 'dd/mm/yyyy', autoclose: true})
}
PopupFiltros.prototype.set_Events = function () {
    // this.$id.on("shown.bs.modal", this, this.end_Show)

    this.$boton_buscar.on("click", this, this.click_BotonBuscar)
    this.$boton_limpiar.on("click", this, this.click_BotonLimpiar)
}
// PopupFiltros.prototype.end_Show = function (e) {
//     e.data.$proposito_viaje.focus()
// }
PopupFiltros.prototype.get_FechaMayorQue = function (e) {

    fecha = this.$created_date_mayorque.datepicker("getDate")
    fecha_conformato = moment(fecha).format('YYYY-MM-DD')

    if (fecha_conformato == "Invalid date") {
        return ""
    }
    else {
        return fecha_conformato
    }
}
PopupFiltros.prototype.get_FechaMenorQue = function (e) {

    fecha = this.$created_date_menorque.datepicker("getDate")
    fecha_conformato = moment(fecha).format('YYYY-MM-DD')

    if (fecha_conformato == "Invalid date") {
        return ""
    }
    else {
        return fecha_conformato
    }
}
PopupFiltros.prototype.get_Values = function (_page) {

    return {
        page: _page,

        proposito_viaje: this.$proposito_viaje.val(),
        empleado_clave: this.$empleado.val(),
        unidad_negocio_clave: this.$unidad_negocio.val(),
        ciudad_destino: this.$ciudad_destino.val(),
        autorizador_clave: this.$autorizador.val(),
        created_date_mayorque: this.get_FechaMayorQue(),
        created_date_menorque: this.get_FechaMenorQue(),
    }
}
PopupFiltros.prototype.get_NoFiltrosAplicados = function () {

    cantidad = 0

    if (this.$proposito_viaje.val() != "") {
        cantidad += 1
    }
    if (this.$empleado.val() != "") {
        cantidad += 1
    }
    if (this.$unidad_negocio.val() != "" ) {
        cantidad += 1
    }
    if (this.$ciudad_destino.val() !=  "") {
        cantidad += 1
    }
    if (this.$autorizador.val()  != "" ) {
        cantidad += 1
    }
    if (this.get_FechaMayorQue() != "") {
        cantidad += 1
    }
    if (this.get_FechaMenorQue() != "") {
        cantidad += 1
    }

    return cantidad
}
PopupFiltros.prototype.apply_Filters = function () {

    tarjeta_resultados.grid.buscar()

    no_filtros = this.get_NoFiltrosAplicados()

    if (no_filtros != 0) {
        tarjeta_resultados.toolbar.change_BotonFiltros(no_filtros)
    }
    else {
        tarjeta_resultados.toolbar.restart_BotonFiltros()
    }

    this.$id.modal('hide')
}
PopupFiltros.prototype.click_BotonBuscar = function (e) {

    e.preventDefault()
    e.data.apply_Filters()
}
PopupFiltros.prototype.click_BotonLimpiar = function (e) {

    e.preventDefault()

    e.data.$proposito_viaje.val("")
    e.data.$empleado.val("").trigger("change")
    e.data.$unidad_negocio.val("").trigger("change")
    e.data.$ciudad_destino.val("")
    e.data.$autorizador.val("").trigger("change")
    e.data.$created_date_mayorque.datepicker("clearDates")
    e.data.$created_date_menorque.datepicker("clearDates")
}


/* -------------------- OBJETO: Tarjeta Resultados -------------------- */

function TarjetaResultados(){

    this.toolbar = new ToolBar()
    this.grid = new Grid()
}


/* -------------------- OBJETO: ToolBar -------------------- */

function ToolBar() {
    this.$boton_filtros = $('#boton_filtros')
}
ToolBar.prototype.change_BotonFiltros = function (_no_filtros) {

    html = "<i class='icon icon-left mdi mdi-search nova-white'></i>Filtros <span class='badge nova-border-bottom'>no_filtros</span>".replace("no_filtros", _no_filtros)

    this.$boton_filtros.html(html)
}
ToolBar.prototype.restart_BotonFiltros = function () {
    this.$boton_filtros.html("<i class='icon icon-left mdi mdi-search nova-white'></i>Filtros")
}


/* -------------------- OBJETO: FuenteDatos -------------------- */

function FuenteDatos() {
    this.kinstancia = null
    this.init()
}
FuenteDatos.prototype.init = function() {
    this.kinstancia = new kendo.data.DataSource(this.get_Configuracion())
}
FuenteDatos.prototype.get_Configuracion = function() {
    return {

        serverPaging: true,
        pageSize: 10,
        transport: {
            read: {
                url: url_viaticocabecera_bypage,
                type: "GET",
                dataType: "json",
            },
            parameterMap: function (data, action) {
                if (action === "read"){
                    return tarjeta_filtros.get_Values(data.page)
                }
            }
        },
        schema: {
            data: "results",
            total: "count",
            model: {
                fields: this.get_Campos()
            }
        },
        error: function (e) {
            alertify.error("Status: " + e.status + "; Error message: " + e.errorThrown)
        },
    }
}
FuenteDatos.prototype.get_Campos = function() {
    return {
        empleado_clave : { type: "number" },
        empleado_descripcion : { type: "string" },
        fecha_partida : { type: "date"},
        fecha_regreso : { type: "date"},
        unidad_negocio_clave : { type: "string" },
        unidad_negocio_descripcion : { type: "string" },
        ciudad_destino : { type: "string" },
        proposito_viaje : { type: "string" },
        empresa : { type: "string" },
        rfc : { type: "string" },
        direccion : { type: "string" },
        grupo : { type: "string" },
        autorizador_clave : { type: "number" },
        autorizador_descripcion : { type: "string" },
        status : { type: "string"},
        approved_by: { type: "string"},
        approved_date : { type: "date" },
        created_by: { type: "string"},
        created_date : { type: "date" },
        updated_by: { type: "string"},
        updated_date : { type: "date"},
        importe_total : { type: "decimal" },
    }
}


/* -------------------- OBJETO: Grid -------------------- */

function Grid() {

    this.$id = $("#grid_resultados")
    this.fuente_datos = null
    this.kinstancia = null
    this.init()
}
Grid.prototype.init = function () {

    // Definicion del pais, formato modena, etc..
    kendo.culture("es-MX")

    // Se inicializa la fuente da datos (datasource)
    fdatos = new FuenteDatos()
    this.fuente_datos = fdatos.kinstancia

    // Se inicializa y configura el grid:
    this.kinstancia = this.$id.kendoGrid(this.get_Configuracion())
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
        scrollable: true,
        pageable: true,
        columns: this.get_Columnas(),
        noRecords: {
            template: "<div class='nova-grid-empy'> No se encontraron registros </div>"
        },
        dataBound: this.set_Icons,
    }
}
Grid.prototype.get_Columnas = function () {
    return [
        {
            field: "pk",
            title: "Numero",
            width: "90px",
            template: '<a class="btn btn-default nova-url" href="#=Grid.prototype.get_EditUrl(pk)#">#="VIA-" + pk#</a>',
        },
        {
            field: "empleado_descripcion",
            title: "Empleado",
            width:"300px"
        },
        { field: "proposito_viaje", title: "Proposito", width:"200px" },
        { field: "ciudad_destino", title: "Ciudad Destino", width:"200px" },
        { field: "fecha_partida", title: "Fecha Partida", width:"135px", format: "{0:dd/MM/yyyy}" },
        { field: "fecha_regreso", title: "Fecha Regreso", width:"135px", format: "{0:dd/MM/yyyy}" },
        { field: "unidad_negocio_clave", title: "Unidad Negocio", width:"150px" },
        { field: "status", title: "Estado", width:"120px" },
        { field: "autorizador_descripcion", title: "Autorizador", width:"300px" },
        { field: "fecha_autorizacion", title: "Fecha autorizacion", width:"135px", format: "{0:dd/MM/yyyy}" },
        // { field: "nombre_empresa", title: "Nombre Empresa", width:"150px" },
        { field: "created_date", title: "Fecha creación", width:"120px", format: "{0:dd/MM/yyyy}" },
        { field: "updated_date", title: "Fecha actualización", width:"150px", format: "{0:dd/MM/yyyy}" },
        // { field: "importe_total", title: "Importe total", width:"100px" },
    ]
}
// Grid.prototype.click_BotonEditar = function (e) {
//
//     var fila = this.dataItem($(e.currentTarget).closest('tr'))
//     window.location.href = url_viaticocabecera_editar + fila.pk;
// }
Grid.prototype.set_Icons = function (e) {

    e.sender.tbody.find(".k-button.fa.fa-pencil").each(function(idx, element){
        $(element).removeClass("fa fa-pencil").find("span").addClass("fa fa-pencil")
    })
}
Grid.prototype.get_EditUrl = function(_pk) {
  return url_viaticocabecera_editar.replace('/0/', '/' + _pk + '/')
}
Grid.prototype.buscar = function() {
    this.fuente_datos.page(1)
}
