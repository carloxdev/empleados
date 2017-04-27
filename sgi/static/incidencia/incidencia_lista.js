// Ecmascript 5

/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:
var url_incidenciadocumento = window.location.origin + "/api/incidenciadocumento/"
var url_incidenciadocumento_bypage = window.location.origin + "/api/incidenciadocumento_bypage/"
var url_viaticocabecera_editar = window.location.origin + "/viaticos/editar/"

// OBJS
var filtros = null
var resultados = null

/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {

    filtros = new TargetaFiltros()
    resultados = new TargetaResultados()
})

/*-----------------------------------------------*\
            OBJETO: Targeta Filtros
\*-----------------------------------------------*/

function TargetaFiltros () {

    this.$id = $('#tarjeta_filtros')
    this.$numero = $('#id_numero')
    this.$tipo = $('#id_tipo')
    this.$fecha_mayorque = $('#id_fecha_mayorque')
    this.$fecha_menorque = $('#id_fecha_menorque')
    this.$es_registrable = $('#id_es_registrable')
    this.$empleado_zona = $('#id_empleado_zona')

    this.$boton_buscar = $('#boton_buscar')

    this.init_Components()
    this.init_Events()

}
TargetaFiltros.prototype.init_Components = function () {

    // Estilos, Liberias
    this.$fecha_mayorque.datepicker()
    this.$fecha_menorque.datepicker()
}
TargetaFiltros.prototype.init_Events = function () {

    // Asosciar Eventos
    this.$boton_buscar.on("click", this, this.click_BotonBuscar)
}
TargetaFiltros.prototype.click_BotonBuscar = function (e) {

    e.preventDefault()

    resultados.grid.buscar()
     e.data.$id.modal('hide')
}
TargetaFiltros.prototype.get_Values = function (_page) {

    return {
        page: _page,
        id: this.$numero.val(),
        tipo: this.$tipo.val(),
        fecha_mayorque: this.$fecha_mayorque.val(),
        fecha_menorque: this.$fecha_menorque.val(),
        es_registrable: this.$es_registrable.val(),
        empleado_zona: this.$empleado_zona.val(),

    }

}



/*-----------------------------------------------*\
            OBJETO: Targeta Resultados
\*-----------------------------------------------*/

function TargetaResultados () {

    this.toolbar = new Toolbar()
    this.grid = new Grid()
}

/*-----------------------------------------------*\
            OBJETO: Toolbar
\*-----------------------------------------------*/

function Toolbar() {

    this.$boton_excel = $('#boton_excel')
}

/*-----------------------------------------------*\
            OBJETO: Grid
\*-----------------------------------------------*/

function Grid() {

    this.$id = $('#grid_resultados')
    this.kfuente_datos = null
    this.kgrid = null

    this.init_Components()

}
Grid.prototype.init_Components = function () {

    // Definicion del pais, formato modena, etc..
    kendo.culture("es-MX")

    // Se inicializa la fuente da datos (datasource)
    this.kfuente_datos = new kendo.data.DataSource(this.get_DataSourceConfig())

    // Se inicializa y configura el grid:
    this.kgrid = this.$id.kendoGrid(this.get_Configuracion())    
}
Grid.prototype.get_DataSourceConfig = function () {

    return {

        serverPaging: true,
        pageSize: 10,
        transport: {
            read: {

                url: url_incidenciadocumento_bypage,
                type: "GET",
                dataType: "json",
            },
            parameterMap: function (data, action) {
                if (action === "read"){
                    return filtros.get_Values(data.page)
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
Grid.prototype.get_Campos = function () {

    return {
        pk : { type: "number" },
        tipo : { type: "string" },
        es_registrable : { type: "string" },
        fecha : { type: "string" },
        empleado_id : { type: "number" },
        empleado_nombre : { type: "string" },
        empleado_zona : { type: "string" },
        empleado_proyecto : { type: "string" },
        empleado_proyecto_desc : { type: "string" },
        empleado_puesto : { type: "number" },
        empleado_puesto_desc : { type: "string" },
        empleado_un : { type: "string" },
        empleado_organizacion : { type: "string" },
        area_id : { type: "number" },
        area_descripcion : { type: "string" },
        lugar : { type: "string" },
        dias_incapcidad : { type: "number" },
        centro_atencion : { type: "string" },
        tiene_acr : { type: "string" },
        status : { type: "string" },
    }
}
Grid.prototype.get_Configuracion = function () {

    return {
        dataSource: this.kfuente_datos,
        columnMenu: true,
        groupable: false,
        sortable: false,
        editable: false,
        resizable: true,
        selectable: true,
        columns: this.get_Columnas(),
        scrollable: true,
        pageable: true,
        noRecords: {
            template: "<div class='grid-empy'> No se encontraron registros </div>"
        },
        // dataBound: this.set_Icons,
    }    
}
Grid.prototype.get_Columnas = function () {

    return [
        { 
            field: "pk", 
            title: "Numero", 
            width:"200px",
            template: '<a class="nova-url" href="#=url_viaticocabecera_editar + pk#">#=pk#</a>',
        },
        { field: "tipo", title: "tipo", width:"200px" },
        { field: "es_registrable", title: "es_registrable", width:"200px" },
        { field: "fecha", title: "fecha", width:"200px" },
        { field: "empleado_id", title: "empleado_id", width:"200px" },
        { field: "empleado_nombre", title: "empleado_nombre", width:"200px" },
        { field: "empleado_zona", title: "empleado_zona", width:"200px" },
        { field: "empleado_proyecto", title: "empleado_proyecto", width:"200px" },
        { field: "empleado_proyecto_desc", title: "empleado_proyecto_desc", width:"200px" },
        { field: "empleado_puesto", title: "empleado_puesto", width:"200px" },
        { field: "empleado_puesto_desc", title: "empleado_puesto_desc", width:"200px" },
        { field: "empleado_un", title: "empleado_un", width:"200px" },
        { field: "empleado_organizacion", title: "empleado_organizacion", width:"200px" },
        { field: "area_id", title: "area_id", width:"200px" },
        { field: "area_descripcion", title: "area_descripcion", width:"200px" },
        { field: "lugar", title: "lugar", width:"200px" },
        { field: "dias_incapcidad", title: "dias_incapcidad", width:"200px" },
        { field: "centro_atencion", title: "centro_atencion", width:"200px" },
        { field: "tiene_acr", title: "tiene_acr", width:"200px" },
        { field: "status", title: "status", width:"200px" },
    ]
}
Grid.prototype.buscar = function() {
    
    this.kfuente_datos.page(1)
}