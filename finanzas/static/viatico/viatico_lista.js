/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:
var url_viaticocabecera_bypage = window.location.origin + "/api/viaticocabecera_bypage/"
var url_viaticocabecera_editar = window.location.origin + "/viaticos/editar/"

// OBJS
var tarjeta_filtros = null
var tarjeta_resultados = null


/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {
    
    tarjeta_filtros = new PopupFiltros()
    tarjeta_resultados = new TarjetaResultados()
})

/*-----------------------------------------------*\
            OBJETO: Popup filtro
\*-----------------------------------------------*/

function PopupFiltros() {

    this.$id = $('#tarjeta_filtros')

    this.$empleado = $('#id_empleado')
    this.$unidad_negocio = $('#id_unidad_negocio')
    this.$ciudad_destino = $('#id_ciudad_destino')
    this.$autorizador = $('#id_autorizador') 
    this.$fecha_creacion = $('#fecha_creacion')

    this.$boton_buscar = $('#boton_buscar')
    this.$boton_limpiar = $('#boton_limpiar')

    this.filtros_aplicados = false

    this.init_Components()
    this.init_Events()
}
PopupFiltros.prototype.init_Components = function () {

    this.$fecha_creacion.daterangepicker(this.get_ConfDateRangePicker())    

}
PopupFiltros.prototype.init_Events = function () {

    this.$id.on("hidden.bs.modal", this, this.hide)
    this.$id.on("show.bs.modal", this, this.show)

    this.$boton_buscar.on("click", this, this.click_BotonBuscar)
    this.$boton_limpiar.on("click", this, this.click_BotonLimpiar)
}
PopupFiltros.prototype.show = function (e) {

    e.data.$empleado.select2()
    e.data.$unidad_negocio.select2()
    e.data.$autorizador.select2()
    
}
PopupFiltros.prototype.hide = function (e) {
    e.data.$fecha_creacion.data('daterangepicker').hide()

    if (e.data.filtros_aplicados == false) {
        tarjeta_resultados.toolbar.restart_BotonFiltros()
    }
}
PopupFiltros.prototype.get_ConfiguracionCalendario = function(){
    
    return {
        language: 'es',
        autoclose: true,
        minView: 2,
        format: 'yyyy-mm-dd'
    }
}
PopupFiltros.prototype.get_ConfDateRangePicker = function () {

    return {
        locale: {
            // format: 'YYYY-MM-DD',
            format: 'DD-MM-YYYY',
            applyLabel: "Aplicar",
            cancelLabel: "Cancelar",
            fromLabel: "Del",
            separator: " al ",
            toLabel: "Al",            
            weekLabel: "S",
            daysOfWeek: [
                "Do",
                "Lu",
                "Ma",
                "Mi",
                "Ju",
                "Vi",
                "Sa"
            ],
            monthNames: [
                "Enero",
                "Febrero",
                "Marzo",
                "Abril",
                "Mayo",
                "Junio",
                "Julio",
                "Agosto",
                "Septiembre",
                "Octubre",
                "Noviembre",
                "Diciembre"
            ],          
        },
        // startDate: '2017-01-01'
        startDate: '01-01-2017'
    }    
}
PopupFiltros.prototype.get_Values = function (_page) {
    
    return {
        page: _page,

        empleado: this.$empleado.val(),
        unidad_negocio: this.$unidad_negocio.val(),
        ciudad_destino: this.$ciudad_destino.val(),
        autorizador: this.$autorizador.val(),
        created_date_mayorque: this.$fecha_creacion.data('daterangepicker').startDate.format('YYYY-MM-DD'),
        created_date_menorque: this.$fecha_creacion.data('daterangepicker').endDate.format('YYYY-MM-DD'),

        // fecha_partida_inicio: this.$fecha_partida_inicio.val(),
        // fecha_partida_fin: this.$fecha_partida_fin.val(),
        // fecha_regreso_inicio: this.$fecha_regreso_inicio.val(),
        // fecha_regreso_fin: this.$fecha_regreso_fin.val(),
    }
}
PopupFiltros.prototype.click_BotonBuscar = function (e) {
    
    e.preventDefault()
    tarjeta_resultados.grid.buscar()
    tarjeta_resultados.toolbar.change_BotonFiltros()
    e.data.filtros_aplicados = true
    e.data.$id.modal('hide')
}
PopupFiltros.prototype.click_BotonLimpiar = function (e) {
    
    e.preventDefault()
    // e.data.$empleado.val("")
    // e.data.$fecha_creacion.data('daterangepicker').setStartDate('2017-01-01')
    // e.data.$fecha_creacion.data('daterangepicker').setEndDate(
    //     moment().format('YYYY-MM-dd')
    // )
    e.data.$fecha_creacion.data('daterangepicker').setStartDate('01-01-2017')
    e.data.$fecha_creacion.data('daterangepicker').setEndDate(
        moment().format('DD-MM-YYYY')
    )    
    e.data.filtros_aplicados = false
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

    this.$boton_filtros = $('#boton_filtros')
    // this.$boton_restablecer =  $('#boton_restablecer')
    this.init_Events()
}
ToolBar.prototype.init_Events = function () {

    // this.$boton_restablecer.on("click", this, this.click_BotonRestablecer)
}
ToolBar.prototype.change_BotonFiltros = function () {

    this.$boton_filtros.html("<i class='icon icon-left mdi mdi-search nova-white'></i>Ver Filtros")
}
ToolBar.prototype.restart_BotonFiltros = function () {
    this.$boton_filtros.html("<i class='icon icon-left mdi mdi-search nova-white'></i>Filtros")   
}
ToolBar.prototype.click_BotonRestablecer = function (e) {
    
    e.preventDefault()
    tarjeta_filtros.$formulario_filtro[0].reset()
    tarjeta_resultados.grid.buscar()
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
Grid.prototype.get_Campos = function () {

    return {
        empleado : { type: "string" },
        fecha_partida : { type: "date"},
        fecha_regreso : { type: "date"},
        unidad_negocio : { type: "string" },
        ciudad_destino : { type: "string" },
        proposito_viaje : { type: "string" },
        nombre_empresa : { type: "string" },
        rfc : { type: "string" },
        direccion : { type: "string" },
        grupo : { type: "string" },
        autorizador : { type: "string" },
        status : { type: "string" },
        fecha_autorizacion : { type: "date" },
        created_date : { type: "date" },
        updated_date : { type: "date" },
        importe_total : { type: "decimal" },
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
Grid.prototype.get_Columnas = function () {

    return [    
        { 
            field: "pk",
            title: "Numero",
            width: "85px",
            template: '<a class="nova-url" href="#=url_viaticocabecera_editar + pk#">#="VIA-" + pk#</a>',
        },
        { field: "empleado", title: "Empleado", width:"300px" },
        { field: "status", title: "Estado Solicitud", width:"120px" },
        { field: "fecha_partida", title: "Fecha Partida", width:"135px", format: "{0:dd-MM-yyyy}" },
        { field: "fecha_regreso", title: "Fecha Regreso", width:"135px", format: "{0:dd-MM-yyyy}" },
        { field: "fecha_autorizacion", title: "Fecha autorizacion", width:"135px", format: "{0:dd-MM-yyyy}" },
        { field: "autorizador", title: "Autorizador", width:"300px" },
        { field: "nombre_empresa", title: "Nombre Empresa", width:"150px" },
        { field: "unidad_negocio", title: "Unidad Negocio", width:"150px" },
        { field: "ciudad_destino", title: "Ciudad Destino", width:"200px" },
        { field: "created_date", title: "Fecha creación", width:"120px", format: "{0:dd-MM-yyyy}" },
        { field: "updated_date", title: "Fecha actualización", width:"100px", format: "{0:dd-MM-yyyy}" },
        { field: "importe_total", title: "Importe total", width:"100px" },
    ]
}
Grid.prototype.click_BotonEditar = function (e) {
    
    var fila = this.dataItem($(e.currentTarget).closest('tr'))
    window.location.href = url_viaticocabecera_editar + fila.pk;
}
Grid.prototype.set_Icons = function (e) {

    e.sender.tbody.find(".k-button.fa.fa-pencil").each(function(idx, element){
        $(element).removeClass("fa fa-pencil").find("span").addClass("fa fa-pencil")
    })   
}
Grid.prototype.buscar = function() {
    
    this.kfuente_datos.page(1)
}