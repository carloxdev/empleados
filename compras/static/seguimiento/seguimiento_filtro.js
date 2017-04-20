/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:
var url_seguimiento_bypage = window.location.origin + "/api/compraseguimiento_bypage/"
var url_seguimiento_sucursal = window.location.origin + "/api/compraseguimientosucursal/"

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
    this.$id_sucursal = $("#id_sucursal")
    this.$fecha_oc_desde_hasta = $("#fecha_oc_desde_hasta")
    this.$boton_colapsible = $("#boton_colapsible")
    this.$boton_buscar = $('#boton_buscar')
    this.$boton_limpiar = $('#boton_limpiar')
    this.init_Components()
    this.init_Events()
}
TarjetaFiltros.prototype.init_Components = function () {

    this.$fecha_oc_desde_hasta.daterangepicker(this.get_ConfDateRangePicker())
    this.$id_sucursal.select2(this.get_ConfSelect2())
    this.init_DataSourceIdSucursal()
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
TarjetaFiltros.prototype.get_ConfSelect2 = function () {
    return {
        width: '100%'
    }
}
TarjetaFiltros.prototype.init_DataSourceIdSucursal = function () {

    $.ajax({
    url: url_seguimiento_sucursal,
    dataType: "json",
    success: function( data ) {
        var objetos=[];  
        for (var i in data) {
            datos = data[i];

                objetos.push(datos.make);

                $('#id_sucursal').append($('<option>', {
                    value: datos.clave,
                    text: '( ' + datos.clave + ' )' + ' ' + datos.desc_corta
                }));
            }
        }
    });
}
TarjetaFiltros.prototype.init_Events = function () {

    this.$boton_colapsible.on("click", this, this.click_BotonColapsible)
    this.$id_sucursal.on("click", this, this.click_Select)
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
TarjetaFiltros.prototype.click_Select = function (e){

    
}
TarjetaFiltros.prototype.get_Values = function (_page) {
    
    return {
        page: _page,

        // empleado: this.$empleado.val(),
        // fecha_partida_inicio: this.$fecha_partida_inicio.val(),
        // fecha_partida_fin: this.$fecha_partida_fin.val(),
        // fecha_regreso_inicio: this.$fecha_regreso_inicio.val(),
        // fecha_regreso_fin: this.$fecha_regreso_fin.val(),
        // unidad_negocio: this.$unidad_negocio.val(),
        // ciudad_destino: this.$ciudad_destino.val(),
        // autorizador: this.$autorizador.val(),
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
    this.grid = new Grid()
}

/*-----------------------------------------------*\
            OBJETO: ToolBar
\*-----------------------------------------------*/

function ToolBar() {

    this.$boton_excel = $('#boton_excel')
    // this.$boton_restablecer =  $('#boton_restablecer')
    this.init()
}
ToolBar.prototype.init = function () {

    this.$boton_excel.on("click", this, this.click_BotonExportar)
}
ToolBar.prototype.click_BotonExportar = function (e) {
    
    e.preventDefault()
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

                url: url_seguimiento_bypage,
                type: "GET",
                dataType: "json",
            },
            //parameterMap: function (data, action) {
            //    if (action === "read"){
            //        return tarjeta_filtros.get_Values(data.page)
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
Grid.prototype.get_Campos = function () {

    return {
        req_compania : { type: "string" },
        req_compania_desc : { type: "string" },
        req_un : { type: "string" },
        req_un_desc : { type: "string" },
        req_un_proyecto : { type: "string" },
        req_un_proyecto_desc : { type: "string" },
        req_tipo : { type: "string" },
        req_tipo_desc : { type: "string" },
        req : { type: "int" },
        req_linea : { type: "int" },
        req_linea_tipo : { type: "string" },
        req_generador : { type: "string" },
        req_generador_desc : { type: "string" },
        req_fecha_creacion : { type: "date" },
        req_fecha_necesidad : { type: "date" },
        req_estado_last : { type: "string" },
        req_estado_last_desc : { type: "string" },
        req_estado_next : { type: "string" },
        req_item_numero : { type: "string" },
        req_item_desc : { type: "string" },
        req_comprador : { type: "int" },
        req_comprador_desc : { type: "string" },
        req_cantidad_solicitada : { type: "string" },
        req_udm : { type: "string" },
        req_udm_desc : { type: "string" },
        cot_compania : { type: "string" },
        cot_tipo : { type: "string" },
        cot : { type: "int" },
        cot_linea : { type: "int" },
        cot_generador : { type: "string" },
        cot_fecha_creacion : { type: "date" },
        cot_estado_last : { type: "string" },
        cot_estado_last_desc : { type: "string" },
        cot_estado_next : { type: "string" },
        ord_compania : { type: "string" },
        ord_tipo : { type: "string" },
        ord_tipo_desc : { type: "string" },
        ord : { type: "int" },
        ord_fecha_creacion : { type: "date" }, 
        ord_fecha_entrega : { type: "date" },
        ord_generador : { type: "string" },
        ord_generador_desc : { type: "string" },
        ord_linea : { type: "int" },
        ord_proveedor : { type: "int" },
        ord_proveedor_desc : { type: "string" },
        ord_estado_last : { type: "string" },
        ord_estado_last_desc : { type: "string" },
        ord_estado_next : { type: "string" },
        ord_cantidad_solic : { type: "int" },
        ord_udm : { type: "string" },
        ord_udm_desc : { type: "string" },
        ord_cantidad_recib : { type: "string" },
        ord_cantidad_xrecib : { type: "string" },
        ord_recepcion : { type: "string" },
        ord_pu_ex : { type: "string" },
        ord_total_ex : { type: "string" },
        ord_monto_recib_ex : { type: "string" },
        ord_monto_xrecib_ex : { type: "string" },
        ord_moneda : { type: "string" },
        ord_moneda_desc : { type: "string" },
        ord_tasa : { type: "string" },
        ord_pu_mx : { type: "string" },
        ord_total_mx : { type: "string" },
        ord_monto_recib_mx : { type: "string" },
        ord_monto_xrecib_mx : { type: "string" },
        ord_impuesto : { type: "string" },
        ord_impuesto_desc : { type: "string" },
        ord_impuesto_flag : { type: "string" },
        ord_descuento : { type: "int" },
        ord_termino_pago : { type: "string" },
        ord_termino_pago_desc : { type: "string" },
        ord_updated_by : { type: "string" },
        ord_updated_by_desc : { type: "string" },
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
        { field: "req_compania", title: "Requisión compañia", width:"150px"},
        { field: "req_compania_desc", title: "Requisión compañia desc", width:"150px"},
        { field: "req_un", title: "Requisión un", width:"150px"},
        { field: "req_un_desc", title: "Requisión un desc", width:"150px"},
        { field: "req_un_proyecto", title: "Requisión un proyecto", width:"150px"},
        { field: "req_un_proyecto_desc", title: "Requisión un proyecto desc", width:"150px"},
        { field: "req_tipo", title: "Requisión tipo", width:"150px"},
        { field: "req_tipo_desc", title: "Requisión tipo desc", width:"150px"},
        { field: "req", title: "Requisión", width:"150px"},
        { field: "req_linea", title: "Requisión linea", width:"150px"},
        { field: "req_linea_tipo", title: "Requisión linea tipo", width:"150px"},
        { field: "req_generador", title: "Requisión generador", width:"150px"},
        { field: "req_generador_desc", title: "Requisión generador desc", width:"150px"},
        { field: "req_fecha_creacion", title: "Requisión fecha creación", width:"150px", format: "{0:dd-MM-yyyy}"},
        { field: "req_fecha_necesidad", title: "Requisión fecha necesidad", width:"150px", format: "{0:dd-MM-yyyy}"},
        { field: "req_estado_last", title: "Requisión estado last", width:"150px"},
        { field: "req_estado_last_desc", title: "Requisión estado last desc", width:"150px"},
        { field: "req_estado_next", title: "Requisión estado next", width:"150px"},
        { field: "req_item_numero", title: "Requisión item numero", width:"150px"},
        { field: "req_item_desc", title: "Requisión item desc", width:"150px"},
        { field: "req_comprador", title: "Requisión comprador", width:"150px"},
        { field: "req_comprador_desc", title: "Requisión comprador desc", width:"150px"},
        { field: "req_cantidad_solicitada", title: "Requisión cantidad solicitada", width:"150px"},
        { field: "req_udm", title: "Requisión udm", width:"150px"},
        { field: "req_udm_desc", title: "Requisión udm desc", width:"150px"},
        { field: "cot_compania", title: "Cot compañia", width:"150px"},
        { field: "cot_tipo", title: "Cot tipo", width:"150px"},
        { field: "cot", title: "Cot", width:"150px"},
        { field: "cot_linea", title: "Cot linea", width:"150px"},
        { field: "cot_generador", title: "Cot generador", width:"150px"},
        { field: "cot_fecha_creacion", title: "Cot fecha creación", width:"150px", format: "{0:dd-MM-yyyy}"},
        { field: "cot_estado_last", title: "Cot estado last", width:"150px"},
        { field: "cot_estado_last_desc", title: "Cot estado last desc", width:"150px"},
        { field: "cot_estado_next", title: "Cot estado next", width:"150px"},
        { field: "ord_compania", title: "Ord compañia", width:"150px"},
        { field: "ord_tipo", title: "Ord tipo", width:"150px"},
        { field: "ord_tipo_desc", title: "Ord tipo desc", width:"150px"},
        { field: "ord", title: "ord", width:"150px"},
        { field: "ord_fecha_creacion", title: "Ord fecha creación", width:"150px", format: "{0:dd-MM-yyyy}"},
        { field: "ord_fecha_entrega", title: "Ord fecha entrega", width:"150px", format: "{0:dd-MM-yyyy}"},
        { field: "ord_generador", title: "Ord generador", width:"150px"},
        { field: "ord_generador_desc", title: "Ord generador desc", width:"150px"},
        { field: "ord_linea", title: "Ord linea", width:"150px"},
        { field: "ord_proveedor", title: "Ord proveedor", width:"150px"},
        { field: "ord_proveedor_desc", title: "Ord proveedor desc", width:"150px"},
        { field: "ord_estado_last", title: "Ord estado last", width:"150px"},
        { field: "ord_estado_last_desc", title: "Ord estado last desc", width:"150px"},
        { field: "ord_estado_next", title: "Ord estado next", width:"150px"},
        { field: "ord_cantidad_solic", title: "Ord cantidad solicitada", width:"150px"},
        { field: "ord_udm", title: "Ord udm", width:"150px"},
        { field: "ord_udm_desc", title: "Ord udm desc", width:"150px"},
        { field: "ord_cantidad_recib", title: "Ord cantidad recibida", width:"150px"},
        { field: "ord_cantidad_xrecib", title: "Ord cantidad xrecibida", width:"150px"},
        { field: "ord_recepcion", title: "Ord recepcion", width:"150px"},
        { field: "ord_pu_ex", title: "Ord pu ex", width:"150px"},
        { field: "ord_total_ex", title: "Ord total ex", width:"150px"},
        { field: "ord_monto_recib_ex", title: "Ord monto recibido ex", width:"150px"},
        { field: "ord_monto_xrecib_ex", title: "Ord monto xrecibido ext", width:"150px"},
        { field: "ord_moneda", title: "Ord moneda", width:"150px"},
        { field: "ord_moneda_desc", title: "Ord moneda desc", width:"150px"},
        { field: "ord_tasa", title: "Ord tasa", width:"150px"},
        { field: "ord_pu_mx", title: "Ord pu mx", width:"150px"},
        { field: "ord_total_mx", title: "Ord total mx", width:"150px"},
        { field: "ord_monto_recib_mx", title: "Ord monto recibido mx", width:"150px"},
        { field: "ord_monto_xrecib_mx", title: "Ord monto xrecibido mx", width:"150px"},
        { field: "ord_impuesto", title: "Ord impuesto", width:"150px"},
        { field: "ord_impuesto_desc", title: "Ord impuesto desc", width:"150px"},
        { field: "ord_impuesto_flag", title: "Ord impuesto flag", width:"150px"},
        { field: "ord_descuento", title: "Ord descuento", width:"150px"},
        { field: "ord_termino_pago", title: "Ord termino pago", width:"150px"},
        { field: "ord_termino_pago_desc", title: "Ord termino pago desc", width:"150px"},
        { field: "ord_updated_by", title: "Ord update by", width:"150px"},
        { field: "ord_updated_by_desc", title: "Ord update by desc", width:"150px"},
    ]
}
Grid.prototype.buscar = function() {
    
    this.kfuente_datos.page(1)
}