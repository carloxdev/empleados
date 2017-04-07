/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:
var url_viaticocabecera = window.location.origin + "/api/viaticocabecera_bypage/"
var url_viaticocabeceraeditar = window.location.origin + "/viaticos/editar/"

// OBJS
var toolbar = null
var grid = null
var tarjeta_resultados = null
var popup_filtros = null

/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {
    
    popup_filtros = new PopupFiltros()
    tarjeta_resultados = new TarjetaResultados()
})



/*-----------------------------------------------*\
            OBJETO: Popup filtro
\*-----------------------------------------------*/

function PopupFiltros() {
    
    this.$empleado = $('#id_empleado')
    this.$fecha_partida_inicio = $('#id_fecha_partida_inicio')
    this.$fecha_partida_fin = $('#id_fecha_partida_fin')
    this.$fecha_regreso_inicio = $('#id_fecha_regreso_inicio')
    this.$fecha_regreso_fin = $('#id_fecha_regreso_fin')
    this.$unidad_negocio = $('#id_unidad_negocio')
    this.$ciudad_destino = $('#id_ciudad_destino')
    this.$autorizador = $('#id_autorizador')
    this.$cajita = $('#cajita')

    this.$boton_buscar =  $('#boton_buscar')
    this.$boton_limpiar =  $('#boton_limpiar')

    this.init()
}
PopupFiltros.prototype.init = function () {
    
    this.$boton_buscar.on("click", this, this.click_BotonBuscar)
    this.$boton_limpiar.on("click", this, this.click_BotonLimpiar)
    this.$cajita.datetimepicker(
        {
            autoclose: true,
            minView: 2,
            maxView: 2,
        }
    )

    this.$fecha_partida_inicio.datetimepicker(
        {
            autoclose: true,
        }
    )

    this.$fecha_partida_fin.datetimepicker(
            {
                autoclose: true,
            }
        )
    this.$fecha_regreso_inicio.datetimepicker(
            {
                autoclose: true,
            }
        )
    this.$fecha_regreso_fin.datetimepicker(
            {
                autoclose: true,
            }
        )
}
PopupFiltros.prototype.get_Filtros = function (_page) {
    
    return {
        page: _page,

        empleado: this.$empleado.val(),
        fecha_partida_inicio: this.$fecha_partida_inicio.val(),
        fecha_partida_fin: this.$fecha_partida_fin.val(),
        fecha_regreso_inicio: this.$fecha_regreso_inicio.val(),
        fecha_regreso_fin: this.$fecha_regreso_fin.val(),
        unidad_negocio: this.$unidad_negocio.val(),
        ciudad_destino: this.$ciudad_destino.val(),
        autorizador: this.$autorizador.val(),
    }
}
PopupFiltros.prototype.click_BotonBuscar = function (e) {
    
    e.preventDefault()
    
    tarjeta_resultados.grid.buscar()
}
PopupFiltros.prototype.click_BotonLimpiar = function (e) {
    
    e.preventDefault()

    e.data.$empleado.val("")
    e.data.$fecha_partida_inicio.val("")
    e.data.$fecha_partida_fin.val("")
    e.data.$fecha_regreso_inicio.val("")
    e.data.$fecha_regreso_fin.val("")
    e.data.$unidad_negocio.val("")
    e.data.$ciudad_destino.val("")
    e.data.$autorizador.val("")
}

/*-----------------------------------------------*\
            OBJETO: Tarjeta resultados
\*-----------------------------------------------*/

function TarjetaResultados(){
    
    this.toolbar = new ToolBar()
    this.grid = new Grid()
}

/*-----------------------------------------------*\
            OBJETO: ToolBar
\*-----------------------------------------------*/

function ToolBar() {
    return null;
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

                url: url_viaticocabecera,
                type: "GET",
                dataType: "json",
            },
            parameterMap: function (data, action) {
                if (action === "read"){
                    return popup_filtros.get_Filtros(data.page)
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
        empleado : { type: "string" },
        fecha_partida : { type: "date"},
        fecha_regreso : { type: "date"},
        unidad_negocio : { type: "string" },
        ciudad_destino : { type: "string" },
        proposito_viaje : { type: "string" },
        requiere_vehiculo : { type: "string" },
        no_vehiculo : { type: "string" },
        nombre_empresa : { type: "string" },
        rfc : { type: "string" },
        direccion : { type: "string" },
        grupo : { type: "string" },
        autorizador : { type: "string" },
        status : { type: "string" },
        fecha_autorizacion : { type: "date" },
        created_date : { type: "date" },
        updated_date : { type: "date" },
    }
}
Grid.prototype.get_Configuracion = function () {

    return {
        dataSource: this.kfuente_datos,
        columnMenu: false,
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
        // dataBound: this.apply_Estilos
    }
}
Grid.prototype.get_Columnas = function () {

    return [    
        { field: "pk", title: "Numero", width:"70px" },
        { field: "empleado", title: "Empleado", width:"300px" },
        { field: "status", title: "Estado Solicitud", width:"100px" },
        { field: "fecha_partida", title: "Fecha Partida", width:"100px", format: "{0:dd-MM-yyyy}" },
        { field: "fecha_regreso", title: "Fecha Regreso", width:"100px", format: "{0:dd-MM-yyyy}" },
        { field: "unidad_negocio", title: "Unidad Negocio", width:"150px" },
        { field: "ciudad_destino", title: "Ciudad Destino", width:"200px" },
        { field: "proposito_viaje", title: "Proposito Viaje", width:"200px", hidden:true },
        { field: "requiere_vehiculo", title: "Requiere Vehiculo", width:"120px" },
        { field: "no_vehiculo", title: "No Vehículo", width:"100px" },
        { field: "nombre_empresa", title: "Nombre Empresa", width:"150px" },
        { field: "rfc", title: "RFC", width:"100px" },
        { field: "direccion", title: "Dirección", width:"200px" },
        { field: "grupo", title: "Grupo", width:"200px" },
        { field: "autorizador", title: "Autorizador", width:"200px" },
        { field: "fecha_autorizacion", title: "Fecha autorizacion", width:"100px", format: "{0:dd-MM-yyyy}" },
        { field: "created_date", title: "Fecha creación", width:"100px", format: "{0:dd-MM-yyyy}" },
        { field: "updated_date", title: "Fecha actualización", width:"100px", format: "{0:dd-MM-yyyy}" },
        {
           command: [ 
                {
                   text: " ",
                   click: this.click_BotonEditar,
                   className: "fa fa-pencil nova-k-btn-editar",
                },   
                             
            ],           
           title: " ",
           width: "95px",
        },        
    ]
}
Grid.prototype.click_BotonEditar = function (e) {
    
    var fila = this.dataItem($(e.currentTarget).closest('tr'))
    window.location.href = url_viaticocabeceraeditar + fila.pk;
}
Grid.prototype.set_Icons = function (e) {

    e.sender.tbody.find(".k-button.fa.fa-pencil").each(function(idx, element){
        $(element).removeClass("fa fa-pencil").find("span").addClass("fa fa-pencil")
    })   
}
Grid.prototype.buscar = function() {
    
    this.kfuente_datos.page(1)
}
