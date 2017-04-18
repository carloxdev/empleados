/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:
var url_usuario_bypage = window.location.origin + "/api/usuario_bypage/"
var url_usuario_editar_bypage = window.location + "/editar/"

// OBJS
var grid = null
var tarjeta_resultados = null

/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {
    tarjeta_resultados = new TarjetaResultados()
})

/*-----------------------------------------------*\
            OBJETO: Tarjeta resultados
\*-----------------------------------------------*/

function TarjetaResultados(){
    
    this.grid = new Grid()
}

/*-----------------------------------------------*\
            OBJETO: Grid
\*-----------------------------------------------*/

function Grid() {

    this.$id = $("#grid_resultados")
    this.kfuente_datos = null
    this.kgrid = null
    this.init()
}
Grid.prototype.init = function () {

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

                url: url_usuario_bypage,
                type: "GET",
                dataType: "json",
            },
            parameterMap: function (data, action) {
                if (action === "read"){
                	//return popup_filtros.get_Filtros(data.page)
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
Grid.prototype.get_Campos = function (e) {

    return {
        primer_nombre : { type: "string" },
        segundo_nombre : { type: "string"},
        apellido_paterno : { type: "string"},
        apellido_materno : { type: "string" },
        genero : { type: "string" },
        numero : { type: "int" },
        tipo : { type: "string" },
        puesto : { type: "string" },
        organizacion : { type: "string" },
        fecha_inicio_contratacion : { type: "date" },
        fecha_fin_contratacion : { type: "date" },
        compania : { type: "string" },
        zona : { type: "string" },
        centro_costos : { type: "string" },
        nomina : { type: "string" },
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
        scrollable: false,
        columns: this.get_Columnas(),
        scrollable: true,
        pageable: true,
        noRecords: {
            template: "<div class='grid-empy'> No se encontraron registros </div>"
        },
        dataBound: this.set_Icons,
    }
}
Grid.prototype.get_Columnas = function (e) {

    return [    
        { 
        	field: "pk",
        	title: "Id",
        	width: "85px",
        	template: '<a class="btn btn-default" href="#=url_usuario_editar_bypage + pk#">#=pk#</a>',
        },
        { field: "primer_nombre", title: "Primer nombre", width:"200px" },
        { field: "segundo_nombre", title: "Segundo nombre", width:"200px" },
        { field: "apellido_paterno", title: "Apellido paterno", width:"200px" },
        { field: "apellido_materno", title: "Apellido materno", width:"200px" },
        { field: "genero", title: "Genero", width:"100px" },
        { field: "numero", title: "Numero", width:"100px" },
        { field: "tipo", title: "Tipo", width:"100px" },
        { field: "puesto", title: "Puesto", width:"150px" },
        { field: "organizacion", title: "Organizacion", width:"200px" },
        { field: "fecha_inicio_contratacion", title: "Fecha de contratacion", width:"100px", format: "{0:dd-MM-yyyy}" },
        { field: "fecha_fin_contratacion", title: "Fecha fin del contrato", width:"100px", format: "{0:dd-MM-yyyy}" },
        { field: "compania", title: "Compañia", width:"100px" },
        { field: "zona", title: "Zona", width:"100px" },
        { field: "centro_costos", title: "Centro de costos", width:"100px" },
        { field: "nomina", title: "Nomina", width:"100px" },
    ]
}
Grid.prototype.click_BotonEditar = function (e) {
    
    var fila = this.dataItem($(e.currentTarget).closest('tr'))
    window.location.href = url_usuario_editar_bypage + fila.pk;
}
