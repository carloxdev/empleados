/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:
var url_usuario_bypage = window.location.origin + "/api/usuario_bypage/"
var url_usuario_editar_bypage = window.location + "/editar/"

// OBJS
var grid = null
var toolbar = null
var tarjeta_resultados = null

/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {
	//toolbar = new Toolbar()
    tarjeta_resultados = new TarjetaResultados()
})

/*-----------------------------------------------*\
            OBJETO: Popup filtro
\*-----------------------------------------------*/

function PopupFiltros() {
    this.$primer_nombre = $('#id_primer_nombre')
	this.$segundo_nombre = $('#id_segundo_nombre')
	this.$apellido_paterno = $('#id_apellido_paterno')
	this.$apellido_materno = $('#id_apellido_materno')
	this.$genero = $('#id_genero')
	this.$numero = $('#id_numero')
	this.$tipo = $('#id_tipo')
	this.$puesto = $('#id_puesto')
	this.$organizacion = $('#id_organizacion')
	this.$fecha_inicio_contratacion = $('#id_fecha_inicio_contratacion')
	this.$fecha_fin_contratacion = $('#id_fecha_fin_contratacion')
	this.$compania = $('#id_compania')
	this.$zona = $('#id_zona')
	this.$centro_costos = $('#id_centro_costos')
	this.$nomina = $('#id_nomina')
    this.$boton_buscar =  $('#boton_buscar')
    this.$boton_limpiar =  $('#boton_limpiar')
    this.init()
}
PopupFiltros.prototype.init = function () {
    
    this.$boton_buscar.on("click", this, this.click_BotonBuscar)
    this.$boton_limpiar.on("click", this, this.click_BotonLimpiar)
}
PopupFiltros.prototype.get_Filtros = function (_page) {
    
    return {
        page: _page,

        primer_nombre: this.$primer_nombre.val(),
        segundo_nombre: this.$segundo_nombre.val(),
        apellido_paterno: this.$apellido_paterno.val(),
        apellido_materno: this.$apellido_materno.val(),
        genero: this.$genero.val(),
        numero: this.$numero.val(),
        tipo: this.$tipo.val(),
        puesto: this.$puesto.val(),
        organizacion: this.$organizacion.val(),
        fecha_inicio_contratacion: this.$fecha_inicio_contratacion.val(),
        fecha_fin_contratacion: this.$fecha_fin_contratacion.val(),
        compania: this.$compania.val(),
        zona: this.$zona.val(),
        centro_costos: this.$centro_costos.val(),
        nomina: this.$nomina.val(),
    }
}
PopupFiltros.prototype.click_BotonBuscar = function (e) {
    
    e.preventDefault()
    tarjeta_resultados.grid.buscar()
}


/*-----------------------------------------------*\
            OBJETO: Tarjeta resultados
\*-----------------------------------------------*/

function TarjetaResultados(){
   // this.toolbar = new Toolbar()
    this.grid = new Grid()
}

/*


function ToolBar() {

    this.$boton_restablecer =  $('#boton_restablecer')
    this.init()
}
ToolBar.prototype.init = function () {

    this.$boton_restablecer.on("click", this, this.click_BotonRestablecer)
}
ToolBar.prototype.click_BotonRestablecer = function (e) {
    
    e.preventDefault()
    popup_filtros.$formulario_filtro[0].reset()
    tarjeta_resultados.grid.buscar()
}
*/

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
            //parameterMap: function (data, action) {
            //    if (action === "read"){
                	//return popup_filtros.get_Filtros(data.page)
            //    }
            //}
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
    window.location.href = url_usuario_editar_bypage + fila.pk
}
/*Grid.prototype.buscar = function() {
    
    this.kfuente_datos.page(1)
}
*/