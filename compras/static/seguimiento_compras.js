/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:
var url_seguimiento_bypage = window.location.origin + "/api-jde/viewscompras_bypage/"
var url_seguimiento = window.location.origin + "/api-jde/viewscompras/"
var url_seguimiento_compania = window.location.origin + "/api-jde/viewcompanias/"
var url_seguimiento_sucursal = window.location.origin + "/api-jde/viewunidades/"
var url_compraseguimeinto_autorizadores = window.location.origin + "/api-jde/viewautorizaciones_bypage/"
var url_compraseguimiento_recepciones = window.location.origin + "/api-jde/viewrecepciones_bypage/"

// OBJS
var tarjeta_filtros = null
var tarjeta_resultados = null
var tarjeta_detalles = null
var toolbar = null
var grid = null


/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {
    
    tarjeta_filtros = new TarjetaFiltros()
    tarjeta_resultados = new TarjetaResultados()
    tarjeta_detalles = new PopupDetalles()
})

/*-----------------------------------------------*\
            OBJETO: Tarjeta filtros
\*-----------------------------------------------*/
function TarjetaFiltros() {

    this.$id_compania = $("#id_compania")
    this.$id_sucursal = $("#id_sucursal")
    this.$id_comprador = $("#id_comprador")
    this.$id_requisicion = $("#id_requisicion")
    this.$id_requisicion_tipo = $("#id_requisicion_tipo")
    this.$id_requisicion_originador = $("#id_requisicion_originador")
    this.$id_requisicion_canceladas = $('#id_requisicion_canceladas_0')
    this.$id_cotizacion = $("#id_cotizacion")
    this.$id_cotizacion_tipo = $("#id_cotizacion_tipo")
    this.$id_cotizacion_originador = $("#id_cotizacion_originador")
    this.$id_cotizacion_canceladas = $("#id_cotizacion_canceladas_0")
    this.$id_oc = $("#id_oc")
    this.$id_oc_tipo = $("#id_oc_tipo")
    this.$id_oc_originador = $("#id_oc_originador")
    this.$id_oc_canceladas = $("#id_oc_canceladas_0")
    this.$id_proveedor = $("#id_proveedor")
    this.$id_item = $("#id_item")
    this.$id_recepcion = $("#id_recepcion")
    this.$fecha_req_desde_hasta = $("#fecha_req_desde_hasta")
    this.$fecha_ord_desde_hasta = $("#fecha_ord_desde_hasta")
    this.$boton_colapsible = $("#boton_colapsible")
    this.$boton_buscar = $('#boton_buscar')
    this.$boton_limpiar = $('#boton_limpiar')
    this.init_Components()
    this.init_Events()
}
TarjetaFiltros.prototype.init_Components = function () {

    this.$fecha_req_desde_hasta.daterangepicker(this.get_ConfDateRangePicker())
    this.$fecha_ord_desde_hasta.daterangepicker(this.get_ConfDateRangePicker())
    this.$id_compania.select2(this.get_ConfSelect2())
    this.$id_sucursal.select2(this.get_ConfSelect2())
    this.$id_requisicion_tipo.select2(this.get_ConfSelect2())
    this.$id_requisicion_originador.select2(this.get_ConfSelect2())
    this.$id_cotizacion_tipo.select2(this.get_ConfSelect2())
    this.$id_cotizacion_originador.select2(this.get_ConfSelect2())
    this.$id_oc_tipo.select2(this.get_ConfSelect2())
    this.$id_oc_originador.select2(this.get_ConfSelect2())
    this.$id_recepcion.select2(this.get_ConfSelect2())

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
TarjetaFiltros.prototype.init_Events = function () {

    this.$boton_colapsible.on("click", this, this.click_BotonColapsible)
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
        page: _page,
        pageSize: _pageSize,

        req_compania: this.$id_compania.val(),
        req_un: this.$id_sucursal.val(),
        req_comprador_desc: this.$id_comprador.val(),
        req: this.$id_requisicion.val(),
        req_tipo: this.$id_requisicion_tipo.val(),
        req_generador: this.$id_requisicion_originador.val(),
        req_estado_last: $("input[name='requisicion_canceladas']:checked").val(),
        cot: this.$id_cotizacion.val(),
        cot_tipo: this.$id_cotizacion_tipo.val(),
        cot_generador: this.$id_cotizacion_originador.val(),
        cot_estado_last: $("input[name='cotizacion_canceladas']:checked").val(),
        ord: this.$id_oc.val(),
        ord_tipo: this.$id_oc_tipo.val(),
        ord_generador: this.$id_oc_originador.val(),
        ord_estado_last: $("input[name='oc_canceladas']:checked").val(),
        req_fecha_creacion_desde: this.$fecha_req_desde_hasta.val().split(" al ")[0],
        req_fecha_creacion_hasta: this.$fecha_req_desde_hasta.val().split(" al ")[1],
        ord_fecha_creacion_desde: this.$fecha_ord_desde_hasta.val().split(" al ")[0],
        ord_fecha_creacion_hasta: this.$fecha_ord_desde_hasta.val().split(" al ")[1],
        ord_proveedor_desc: this.$id_proveedor.val(),
        req_item_desc: this.$id_item.val(),
        ord_recepcion: this.$id_recepcion.val()
    }
}
TarjetaFiltros.prototype.get_FiltrosExcel = function () {
        
    return {
        req_compania: this.$id_compania.val(),
        req_un: this.$id_sucursal.val(),
        req_comprador_desc: this.$id_comprador.val(),
        req: this.$id_requisicion.val(),
        req_tipo: this.$id_requisicion_tipo.val(),
        req_generador: this.$id_requisicion_originador.val(),
        req_estado_last: $("input[name='requisicion_canceladas']:checked").val(),
        cot: this.$id_cotizacion.val(),
        cot_tipo: this.$id_cotizacion_tipo.val(),
        cot_generador: this.$id_cotizacion_originador.val(),
        cot_estado_last: $("input[name='cotizacion_canceladas']:checked").val(),
        ord: this.$id_oc.val(),
        ord_tipo: this.$id_oc_tipo.val(),
        ord_generador: this.$id_oc_originador.val(),
        ord_estado_last: $("input[name='oc_canceladas']:checked").val(),
        req_fecha_creacion_desde: this.$fecha_req_desde_hasta.val().split(" al ")[0],
        req_fecha_creacion_hasta: this.$fecha_req_desde_hasta.val().split(" al ")[1],
        ord_fecha_creacion_desde: this.$fecha_ord_desde_hasta.val().split(" al ")[0],
        ord_fecha_creacion_hasta: this.$fecha_ord_desde_hasta.val().split(" al ")[1],
        ord_proveedor_desc: this.$id_proveedor.val(),
        req_item_desc: this.$id_item.val(),
        ord_recepcion: this.$id_recepcion.val()
    }
}
TarjetaFiltros.prototype.click_BotonBuscar = function (e) {
    
    e.preventDefault()
    tarjeta_resultados.grid.buscar()
}
TarjetaFiltros.prototype.click_BotonLimpiar = function (e) {
    
    e.preventDefault()
    e.data.$id_compania.data('select2').val(0)
    e.data.$id_sucursal.data('select2').val(0)
    e.data.$id_comprador.val("")
    e.data.$id_requisicion.val("")
    e.data.$id_requisicion_tipo.data('select2').val(0)
    e.data.$id_requisicion_originador.data('select2').val(0)
    e.data.$id_requisicion_canceladas.prop('checked', true)
    e.data.$id_cotizacion.val("")
    e.data.$id_cotizacion_tipo.data('select2').val(0)
    e.data.$id_cotizacion_originador.data('select2').val(0)
    e.data.$id_cotizacion_canceladas.prop('checked', true)
    e.data.$id_oc.val("")
    e.data.$id_oc_tipo.data('select2').val(0)
    e.data.$id_oc_originador.data('select2').val(0)
    e.data.$id_oc_canceladas.prop('checked', true)
    e.data.$id_proveedor.val("")
    e.data.$id_item.val("")
    e.data.$id_recepcion.data('select2').val(0)
    e.data.$fecha_req_desde_hasta.data('daterangepicker').setStartDate('2017-01-01')
    e.data.$fecha_req_desde_hasta.data('daterangepicker').setEndDate(
        moment().format('YYYY-MM-DD')
    )
    e.data.$fecha_ord_desde_hasta.data('daterangepicker').setStartDate('2017-01-01')
    e.data.$fecha_ord_desde_hasta.data('daterangepicker').setEndDate(
        moment().format('YYYY-MM-DD')
    )
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
    this.init()
}
ToolBar.prototype.init = function () {

    this.$boton_excel.on("click", this, this.click_BotonExportar)
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
                        title: "Seguimientos",
                        rows: e.data.kRows
                    }
                ]
            });
            kendo.saveAs({
                dataURI: workbook.toDataURL(),
                fileName: "ListadoSeguimientos.xlsx",
            });
        });
}
ToolBar.prototype.get_Formato_Columnas = function () {
    
    var columnas = tarjeta_resultados.grid.get_Columnas()
    var columnas_formateadas = []

    $.each(columnas, function (index) {
        $.each(this, function (name) {
            if (name === 'field'){
                columnas_formateadas.push(columnas[index])
            }
        })
    })
    return columnas_formateadas
}
ToolBar.prototype.get_Celdas = function () {
    
    var celdas = []
    var columnas = this.get_Formato_Columnas()

    for (var i=0; i < columnas.length; i++) {
        campo = columnas[i].title
        celdas.push({ value: campo })
    }
    return celdas
}
ToolBar.prototype.get_Registros_Excel = function (data) {
    
    var registros = []
    var columnas = this.get_Formato_Columnas()

    for (var i=0; i < columnas.length; i++) {
        campo = columnas[i].field
        registros.push({ value: data[campo] })
    }
    return registros
}
ToolBar.prototype.get_Columnas_Excel_Ancho = function () {
    
    var columnas_excel = []
    var columnas = this.get_Formato_Columnas()

    for (var i=0; i < columnas.length; i++) {
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

                url: url_seguimiento_bypage,
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

                url: url_seguimiento,
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
        req_compania : { type: "number" },
        req_un : { type: "string" },
        req : { type: "number" },
        req_tipo : { type: "string" },
        req_generador : { type: "string" },
        req_fecha_creacion : { type: "date" },
        req_fecha_necesidad : { type: "date" },
        req_linea : { type: "number" },
        req_linea_tipo : { type: "string" },
        req_estado_last : { type: "string" },
        req_estado_next : { type: "string" },
        req_comprador_desc : { type: "string" },
        req_item_numero : { type: "string" },
        req_item_desc : { type: "string" },
        req_cantidad_solicitada : { type: "string" },
        req_udm : { type: "string" },
        cot : { type: "number" },
        cot_tipo : { type: "string" },
        cot_fecha_creacion : { type: "date" },
        cot_generador : { type: "string" }, 
        cot_linea : { type: "number" },
        cot_estado_last : { type: "string" },
        cot_estado_next : { type: "string" },
        ord : { type: "number" },
        ord_tipo : { type: "string" },
        ord_fecha_creacion : { type: "date" }, 
        ord_fecha_entrega : { type: "date" },
        ord_generador : { type: "string" },
        ord_linea : { type: "number" },
        ord_proveedor : { type: "number" },
        ord_proveedor_desc : { type: "string" },
        ord_estado_last : { type: "string" },
        ord_estado_next : { type: "string" },
        ord_cantidad_solic : { type: "number" },
        ord_moneda : { type: "string" },
        ord_pu_mx : { type: "string" },
        ord_total_mx : { type: "string" },
        ord_impuesto : { type: "string" },
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
        { field: "req_compania", title: "Compañia", width:"100px"},
        { field: "req_un", title: "Sucursal", width:"130px"},
        { field: "req", title: "Requisición", width:"120px"},
        { field: "req_tipo", title: "Tipo", width:"75px"},
        { field: "req_generador", title: "Originador", width:"150px"},
        { field: "req_fecha_creacion", title: "Fecha creación", width:"120px", format: "{0:dd-MM-yyyy}"},
        { field: "req_fecha_necesidad", title: "Fecha necesidad", width:"120px", format: "{0:dd-MM-yyyy}"},
        { field: "req_linea", title: "Linea", width:"75px"},
        { field: "req_linea_tipo", title: "Tipo linea", width:"75px"},
        { field: "req_estado_last", title: "Último estatus", width:"120px"},
        { field: "req_estado_next", title: "Siguiente estatus", width:"120px"},
        { command: [ 
                {
                   text: "Autorizadores",
                   click: this.click_BotonDetallesAutorizaciones,
                },              
            ],           
           title: "Autorizadores",
           width: "120px"
        },
        { field: "req_comprador_desc", title: "Comprador", width:"300px"},
        { field: "req_item_numero", title: "No. item", width:"120px"},
        { field: "req_item_desc", title: "Descripción del item", width:"500px"},
        { field: "req_cantidad_solicitada", title: "Cantidad solicitada", width:"120px"},
        { field: "req_udm", title: "UDM", width:"75px"},
        { field: "cot", title: "Cotización", width:"120px"},
        { field: "cot_tipo", title: "Tipo", width:"75px"},
        { field: "cot_fecha_creacion", title: "Fecha creación", width:"120px", format: "{0:dd-MM-yyyy}"},
        { field: "cot_generador", title: "Originador", width:"150px"},
        { field: "cot_linea", title: "Linea", width:"75px"},
        { field: "cot_estado_last", title: "Último estado", width:"120px"},
        { field: "cot_estado_next", title: "Siguiente estado", width:"120px"},
        { field: "ord", title: "OC", width:"75px"},
        { field: "ord_tipo", title: "Tipo", width:"75px"},
        { field: "ord_fecha_creacion", title: "Fecha creación", width:"120px", format: "{0:dd-MM-yyyy}"},
        { field: "ord_fecha_entrega", title: "Fecha entrega", width:"120px", format: "{0:dd-MM-yyyy}"},
        { field: "ord_generador", title: "Originador", width:"150px"},
        { field: "ord_linea", title: "Linea", width:"75px"},
        { field: "ord_proveedor", title: "Proveedor codigo", width:"120px"},
        { field: "ord_proveedor_desc", title: "Proveedor descripcion", width:"350px"},
        { field: "ord_estado_last", title: "Último estado", width:"120px"},
        { field: "ord_estado_next", title: "Siguiente estado", width:"120px"},
        { field: "ord_cantidad_solic", title: "Cantidad", width:"75px"},
        { field: "ord_moneda", title: "Moneda", width:"75px"},
        { field: "ord_pu_mx", title: "Costo Unitario MXP", width:"150px"},
        { field: "ord_total_mx", title: "Total de linea MXP", width:"150px"},
        { field: "ord_impuesto", title: "Impuesto", width:"100px"},
        { command: [ 
                {
                   text: "Recepciones",
                   click: this.click_BotonDetallesRecepciones,
                },              
            ],           
           title: "Recepción",
           width: "120px"
        },
        { command: [ 
                {
                   text: "Cotejo",
                   click: this.click_BotonDetallesCotejo,
                },              
            ],           
           title: "Cotejo",
           width: "120px"
        },
    ]
}
Grid.prototype.click_BotonDetallesAutorizaciones = function (e) {
    
    e.preventDefault()
    var fila = this.dataItem($(e.currentTarget).closest('tr'))
    tarjeta_resultados.grid.filtrar_Autorizaciones(fila)
    tarjeta_detalles.$popup_filtros.modal('show')
}
Grid.prototype.filtrar_Autorizaciones = function (fila) {
    
    $.ajax({
        url: url_compraseguimeinto_autorizadores,
        method: "GET",
        dataType: "json",
        data: {
            oc:fila.ord,
            oc_tipo:fila.ord_tipo,
            oc_compania:fila.ord_compania
        },
        success: function(data) {
            tarjeta_detalles.construir_Tabla(
                '#tabla_detalles',
                data.results,
                [   'ruta',
                    'autorizador_desc',
                    'autorizacion_fecha',
                ],
                [   'Ruta de aprovación',
                    'Responsable',
                    'Fecha autorización',
                ]
            )
        },
        failure: function(data) { 
            alert('Error al recuperar datos.');
        }
    });
         
}
Grid.prototype.click_BotonDetallesRecepciones = function (e){
    
    e.preventDefault()
    var fila = this.dataItem($(e.currentTarget).closest('tr'))
    tarjeta_resultados.grid.filtrar_Recepciones(fila)
    tarjeta_detalles.$popup_filtros.modal('show')
}
Grid.prototype.filtrar_Recepciones = function (fila) {
    
    $.ajax({
        url: url_compraseguimiento_recepciones,
        method: "GET",
        dataType: "json",
        data: {
            oc:fila.ord,
            oc_tipo:fila.ord_tipo,
            oc_compania:fila.ord_compania,
            oc_linea:fila.ord_linea,
            tran_tipo:'1',
        },
        success: function(data) {
            tarjeta_detalles.construir_Tabla(
                '#tabla_detalles',
                data.results,
                [   'doc_tipo', 
                    'doc',
                    'oc_tipo',
                    'fecha_tran',
                    'fecha_update',
                    'fecha_lm', 
                    'cantidad_recib',
                    'pu_mx',
                    'monto_recib_mx',
                    'batch',
                    'batch_tipo',
                    'fecha_creacion',
                ],
                [   'Tipo recepción', 
                    'Documento',
                    'Tipo',
                    'Fecha transacción',
                    'Fecha recepción',
                    'Fecha LM', 
                    'Cantidad recibida',
                    'Costo unitario',
                    'Monto',
                    'Batch',
                    'Tipo',
                    'Fecha',
                ]
            )
        },
        failure: function(data) { 
            alert('Error al recuperar datos.');
        }
    });
}
Grid.prototype.click_BotonDetallesCotejo = function (e){
    
    e.preventDefault()
    var fila = this.dataItem($(e.currentTarget).closest('tr'))
    tarjeta_resultados.grid.filtrar_Cotejo(fila)
    tarjeta_detalles.$popup_filtros.modal('show')
}
Grid.prototype.filtrar_Cotejo = function (fila) {
    
    $.ajax({
        url: url_compraseguimiento_recepciones,
        method: "GET",
        dataType: "json",
        data: {
            oc:fila.ord,
            oc_tipo:fila.ord_tipo,
            oc_compania:fila.ord_compania,
            oc_linea:fila.ord_linea,
            tran_tipo:'2',
        },
        success: function(data) {
            tarjeta_detalles.construir_Tabla(
                '#tabla_detalles',
                data.results,
                [   'tran_compania',
                    'doc_tipo',
                    'doc',
                    'doc_linea',
                    'fecha_creacion',
                    'fecha_lm',
                    'doc_factura',
                    'pu_mx',
                    'impuesto',
                    'moneda',
                    'batch',
                    'batch_tipo',
                    'fecha_update',
                    'monto_recib_mx',
                ],
                [   'Compañia cotejo',
                    'Tipo cotejo',
                    'Número cotejo',
                    'Linea cotejo',
                    'Fecha cotejo',
                    'Fecha LM',
                    'Factura',
                    'Monto sin impuesto',
                    'Tipo impuesto',
                    'Moneda',
                    'Cotejo batch',
                    'Batch tipo',
                    'Batch fecha',
                    'Monto',
                ]
            )
        },
        failure: function(data) { 
            alert('Error al recuperar datos.');
        }
    });
}
Grid.prototype.set_Icons = function (e) {

    e.sender.tbody.find(".k-button.mdi.mdi-search").each(function(idx, element){
        $(element).removeClass("mdi mdi-search").find("span").addClass("mdi mdi-search")
    })
}
Grid.prototype.buscar = function() {
    
    this.kfuente_datos.page(1)
}
Grid.prototype.leer_Datos = function() {
    
    this.kfuente_datos_excel.read()
}
function PopupDetalles() {
    
    this.$popup_filtros = $("#popup_filtros")
    this.init_Events()
}
PopupDetalles.prototype.init_Events = function () {

    this.$popup_filtros.on("hidden.bs.modal", this, this.hide)
}
PopupDetalles.prototype.hide = function (e) {
    $("#tabla_detalles").html('');
}
PopupDetalles.prototype.construir_Tabla = function (id_contenedor, data, campos, columnas_nombre){

    var head = ''
    var rows = ''
    for(fila = 0; fila<data.length; fila++)
    {   var cols = ''
        for(columna = 0; columna<campos.length; columna++)
        {  cols += '<td>'+data[fila][campos[columna]]+'</td>'
        }
        rows += '<tr>'+cols+'</tr>'
    }
    for(columna = 0; columna<columnas_nombre.length; columna++)
    {  head += '<th>'+columnas_nombre[columna]+'</th>'

    }
    $(id_contenedor).html(
        '<table class="table table-bordered table-responsive">'+
            '<thead>'+head+'</thead>'+
            '<tbody>'+rows+'</tbody>'+
        '</table>'
    );
}