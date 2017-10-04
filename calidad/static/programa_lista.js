/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:
//var url_empleados_bypage = window.location.origin + "/api-ebs/viewempleadosfull_bypage/"

// OBJS
var tarjeta_filtros = null
var tarjeta_resultados = null
var toolbar = null
var grid = null


/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {
    
    tarjeta_filtros = new TarjetaFiltros()
    tarjeta_resultados = new TarjetaResultados()
})

/*-----------------------------------------------*\
            OBJETO: Tarjeta filtros
\*-----------------------------------------------*/
function TarjetaFiltros() {

    this.$id_proceso = $("#id_proceso")
    this.$id_area = $("#id_area")
    this.$id_fecha_real = $("#id_fecha_real")
    this.$id_fecha_programada = $("#id_fecha_programada")
    this.$id_fecha_seguimiento = $("#id_fecha_seguimiento")
    this.$boton_buscar = $('#boton_buscar')
    this.$boton_limpiar = $('#boton_limpiar')
    this.init_Components()
    this.init_Events()
}
TarjetaFiltros.prototype.init_Components = function () {

    this.$id_proceso.select2(appnova.get_ConfigSelect2())
    this.$id_area.select2(appnova.get_ConfigSelect2())
    this.$id_fecha_real.daterangepicker(this.get_ConfDateRangePicker())
    this.$id_fecha_programada.daterangepicker(this.get_ConfDateRangePicker())
    this.$id_fecha_seguimiento.daterangepicker(this.get_ConfDateRangePicker())
}
TarjetaFiltros.prototype.get_ConfDateRangePicker = function () {

    return {
        locale: {
            format: 'YYYY-MM-DD',
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
        startDate: '2017-01-01'
    }    
}
TarjetaFiltros.prototype.init_Events = function () {

    this.$boton_buscar.on("click", this, this.click_BotonBuscar)
    this.$boton_limpiar.on("click", this, this.click_BotonLimpiar)
}
TarjetaFiltros.prototype.click_BotonColapsible = function (e){

    if ($("#boton_colapsible").hasClass('mdi-caret-down-circle')){

        $("#boton_colapsible").removeClass('mdi-caret-down-circle').addClass('mdi-caret-up-circle')
    }
    else if($("#boton_colapsible").hasClass('mdi-caret-up-circle')){

        $("#boton_colapsible").removeClass('mdi-caret-up-circle').addClass('mdi-caret-down-circle')
    }
}
TarjetaFiltros.prototype.get_Values = function (_page, _pageSize) {

    return {
    }
}
TarjetaFiltros.prototype.get_FiltrosExcel = function () {
        
    return {        
    }
}
TarjetaFiltros.prototype.click_BotonBuscar = function (e) {
    
    e.preventDefault()
    tarjeta_resultados.grid.buscar()
}
TarjetaFiltros.prototype.click_BotonLimpiar = function (e) {
    
    e.preventDefault()
}

/*-----------------------------------------------*\
            OBJETO: Tarjeta resultados
\*-----------------------------------------------*/

function TarjetaResultados(){
    
    this.toolbar = new ToolBar()
    //this.grid = new Grid()
}

/*-----------------------------------------------*\
            OBJETO: ToolBar
\*-----------------------------------------------*/

function ToolBar() {

    this.$boton_excel = $('#boton_excel')
    this.init()
}
ToolBar.prototype.init = function () {

    //this.$boton_excel.on("click", this, this.click_BotonExportar)
}
ToolBar.prototype.Inicializar_CeldasExcel = function (e) {

    if (tarjeta_resultados.grid.get_Columnas != null)
    {
        if (tarjeta_resultados.grid.get_Columnas.length != 1) {
            tarjeta_resultados.grid.get_Columnas.length = 0;
        }
    }

    this.kRows = [{
        cells: this.get_Celdas()
    }];
}
ToolBar.prototype.click_BotonExportar = function (e) {
    
    tarjeta_resultados.grid.leer_Datos()
    e.data.Inicializar_CeldasExcel()

    tarjeta_resultados.grid.kfuente_datos_excel.fetch(function () {

        var data = this.data();
        
        for (var i = 0; i < data.length; i++) {

            e.data.kRows.push({
                cells: e.data.get_Registros_Excel(data[i])
            })
        }
        var workbook = new kendo.ooxml.Workbook({
            sheets: [
                {
                    columns: e.data.get_Columnas_Excel_Ancho(),
                    title: "Empleados",
                    rows: e.data.kRows
                }
            ]
        });
        kendo.saveAs({
            dataURI: workbook.toDataURL(),
            fileName: "ListadoEmpleados.xlsx",
        });
    });
}
ToolBar.prototype.get_Celdas = function () {
    
    var celdas = []
    var columnas = tarjeta_resultados.grid.get_Columnas()

    for (var i=0; i < columnas.length; i++) {
        campo = columnas[i].title
        celdas.push({ value: campo })
    }
    return celdas
}
ToolBar.prototype.get_Registros_Excel = function (data) {
    
    var registros = []
    var columnas = tarjeta_resultados.grid.get_Columnas()

    for (var i=0; i < columnas.length; i++) {
        campo = columnas[i].field
        registros.push({ value: data[campo] })
    }
    return registros
}
ToolBar.prototype.get_Columnas_Excel_Ancho = function () {
    
    var columnas_excel = []

    for (var i=0; i < tarjeta_resultados.grid.get_Columnas().length; i++) {
        columnas_excel.push({ autoWidth: true })
    }
    return columnas_excel
}
/*-----------------------------------------------*\
            OBJETO: Grid
\*-----------------------------------------------*/

function Grid() {

    this.$id = $("#grid_resultados")
    this.kfuente_datos = null
    this.kfuente_datos_excel = null

    this.kgrid = null
    this.init()
}
Grid.prototype.init = function () {

    kendo.culture("es-MX")
    this.kfuente_datos = new kendo.data.DataSource(this.get_DataSourceConfig())
    this.kfuente_datos_excel = new kendo.data.DataSource(this.get_FuenteDatosExcel())
    this.kgrid = this.$id.kendoGrid(this.get_Configuracion())
}
Grid.prototype.get_DataSourceConfig = function (e) {

    return {

        serverPaging: true,
        pageSize: 10,
        transport: {
            read: {

                url: url_empleados_bypage,
                type: "GET",
                dataType: "json",
            },
            parameterMap: function (data, action) {
                if (action === "read"){
                    return tarjeta_filtros.get_Values(data.page, data.pageSize)
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
Grid.prototype.get_FuenteDatosExcel = function (e) {

    return {

        serverPaging: true,
        pageSize: 10,
        transport: {
            read: {

                url: url_empleados,
                type: "GET",
                dataType: "json",
            },
            parameterMap: function (data, action) {
                if (action === "read"){
                    return tarjeta_filtros.get_FiltrosExcel()
                }
            }
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
Grid.prototype.get_Campos = function () {

    return {
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
            template: "<div class='nova-grid-empy'> No se encontrarón registros </div>"
        },
        dataBound: this.set_Icons,
    }
}
Grid.prototype.get_Columnas = function () {

    return {}
}
Grid.prototype.buscar = function() {
    
    this.kfuente_datos.page(1)
}
Grid.prototype.leer_Datos = function() {
    
    this.kfuente_datos_excel.read()
}