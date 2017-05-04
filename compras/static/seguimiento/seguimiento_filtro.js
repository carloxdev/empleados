/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:
var url_seguimiento_bypage = window.location.origin + "/api/viewscompras_bypage/"
var url_seguimiento_compania = window.location.origin + "/api/viewcompanias/"
var url_seguimiento_sucursal = window.location.origin + "/api/viewunidades/"
var url_compraseguimeinto_autorizadores = window.location.origin + "/api/viewautorizaciones/"
var url_compraseguimiento_recepciones = window.location.origin + "/api/viewrecepciones/"

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

    kendo.culture("es-MX")
    this.kfuente_datos = new kendo.data.DataSource(this.get_DataSourceConfig())
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

        req_generador_desc : { type: "string" }, 
        req_estado_last_desc : { type: "string" },
        req_comprador : { type: "number" },
        req_udm_desc : { type: "string" },
        cot_compania : { type: "string" },
        cot_estado_last_desc : { type: "string" },
        ord_compania : { type: "string" },
        ord_tipo_desc : { type: "string" },
        ord_generador_desc : { type: "string" },
        ord_estado_last_desc : { type: "string" },
        ord_udm : { type: "string" },
        ord_udm_desc : { type: "string" },
        ord_cantidad_recib : { type: "string" },
        ord_cantidad_xrecib : { type: "string" },
        ord_recepcion : { type: "string" },
        ord_pu_ex : { type: "string" },
        ord_total_ex : { type: "string" },
        ord_monto_recib_ex : { type: "string" },
        ord_monto_xrecib_ex : { type: "string" },
        ord_moneda_desc : { type: "string" },
        ord_tasa : { type: "string" },
        ord_monto_recib_mx : { type: "string" },
        ord_monto_xrecib_mx : { type: "string" },
        ord_impuesto_desc : { type: "string" },
        ord_impuesto_flag : { type: "string" },
        ord_descuento : { type: "number" },
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
                   className: "mdi mdi-search"
                },              
            ],           
           title: "Autorizadores",
           width: "120px"
        },
        { field: "req_comprador_desc", title: "Comprador", width:"150px"},
        { field: "req_item_numero", title: "No. item", width:"120px"},
        { field: "req_item_desc", title: "Descripción del item", width:"200px"},
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
        { field: "ord_proveedor_desc", title: "Proveedor descripcion", width:"150px"},
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
                   className: "mdi mdi-search"
                },              
            ],           
           title: "Recepción",
           width: "120px"
        },
        { command: [ 
                {
                   text: "Cotejo",
                   click: this.click_BotonDetallesCotejo,
                   className: "mdi mdi-search"
                },              
            ],           
           title: "Cotejo",
           width: "120px"
        },

        { field: "req_generador_desc", title: "Requisición generador desc", width:"150px"},
        { field: "req_estado_last_desc", title: "Requisición estado last desc", width:"150px"},
        { field: "req_comprador", title: "Requisición comprador", width:"150px"},
        { field: "req_udm_desc", title: "Requisición udm desc", width:"150px"},
        { field: "cot_compania", title: "Cot compañia", width:"150px"},
        { field: "cot_estado_last_desc", title: "Cot estado last desc", width:"150px"},
        { field: "ord_compania", title: "Ord compañia", width:"150px"},
        { field: "ord_tipo_desc", title: "Ord tipo desc", width:"150px"},
        { field: "ord_generador_desc", title: "Ord generador desc", width:"150px"},
        { field: "ord_estado_last_desc", title: "Ord estado last desc", width:"150px"},
        { field: "ord_udm", title: "Ord udm", width:"150px"},
        { field: "ord_udm_desc", title: "Ord udm desc", width:"150px"},
        { field: "ord_cantidad_recib", title: "Ord cantidad recibida", width:"150px"},
        { field: "ord_cantidad_xrecib", title: "Ord cantidad xrecibida", width:"150px"},
        { field: "ord_recepcion", title: "Ord recepcion", width:"150px"},
        { field: "ord_pu_ex", title: "Ord pu ex", width:"150px"},
        { field: "ord_total_ex", title: "Ord total ex", width:"150px"},
        { field: "ord_monto_recib_ex", title: "Ord monto recibido ex", width:"150px"},
        { field: "ord_monto_xrecib_ex", title: "Ord monto xrecibido ext", width:"150px"},
        { field: "ord_moneda_desc", title: "Ord moneda desc", width:"150px"},
        { field: "ord_tasa", title: "Ord tasa", width:"150px"},
        { field: "ord_monto_recib_mx", title: "Ord monto recibido mx", width:"150px"},
        { field: "ord_monto_xrecib_mx", title: "Ord monto xrecibido mx", width:"150px"},
        { field: "ord_impuesto_desc", title: "Ord impuesto desc", width:"150px"},
        { field: "ord_impuesto_flag", title: "Ord impuesto flag", width:"150px"},
        { field: "ord_descuento", title: "Ord descuento", width:"150px"},
        { field: "ord_termino_pago", title: "Ord termino pago", width:"150px"},
        { field: "ord_termino_pago_desc", title: "Ord termino pago desc", width:"150px"},
        { field: "ord_updated_by", title: "Ord update by", width:"150px"},
        { field: "ord_updated_by_desc", title: "Ord update by desc", width:"150px"},
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
                ['orden',
                  'ruta',
                  'estado',
                  'un',
                  'oc_compania',
                  'oc_tipo',
                  'oc',
                  'oc_sufix',
                  'autorizador',
                  'autorizador_desc',
                  'autorizacion_fecha',
                  'autorizacion_hora',
                  'lista_estados'])
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
                [   'fecha_lm', 'cantidad_recib', 'udm_recib', 'pu_ex', 'monto_recib_ex', 'moneda', 'tasa', 'pu_mx', 'monto_recib_mx',
                    'impuesto', 'impuesto_flag', 'batch', 'batch_tipo', 'activo', 'ubicacion', 'lote', 'contenedor', 'observaciones',
                    'updater', 'updater_desc', 'fecha_update', 'oc_compania', 'oc_tipo', 'oc', 'oc_linea', 'oc_linea_tipo', 'oc_sufix',
                    'tran_compania', 'tran_un', 'tran_tipo', 'tran_tipo_desc', 'tran_linea', 'doc_compania', 'doc_tipo', 'doc',
                    'doc_linea', 'doc_je_linea', 'doc_factura', 'proveedor', 'item', 'item_numero', 'item_descripcion', 'item_glclass',
                    'originador', 'originador_desc', 'fecha_creacion', 'fecha_tran'])
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
                [   'fecha_lm', 'cantidad_recib', 'udm_recib', 'pu_ex', 'monto_recib_ex', 'moneda', 'tasa', 'pu_mx', 'monto_recib_mx',
                    'impuesto', 'impuesto_flag', 'batch', 'batch_tipo', 'activo', 'ubicacion', 'lote', 'contenedor', 'observaciones',
                    'updater', 'updater_desc', 'fecha_update', 'oc_compania', 'oc_tipo', 'oc', 'oc_linea', 'oc_linea_tipo', 'oc_sufix',
                    'tran_compania', 'tran_un', 'tran_tipo', 'tran_tipo_desc', 'tran_linea', 'doc_compania', 'doc_tipo', 'doc',
                    'doc_linea', 'doc_je_linea', 'doc_factura', 'proveedor', 'item', 'item_numero', 'item_descripcion', 'item_glclass',
                    'originador', 'originador_desc', 'fecha_creacion', 'fecha_tran'])
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
PopupDetalles.prototype.construir_Tabla = function (id_contenedor, data, columnas){

    var head = ''
    var rows = ''
    for(fila = 0; fila<data.length; fila++)
    {   var cols = ''
        for(columna = 0; columna<columnas.length; columna++)
        {  cols += '<td>'+data[fila][columnas[columna]]+'</td>'
        }
        rows += '<tr>'+cols+'</tr>'
    }
    for(columna = 0; columna<columnas.length; columna++)
    {  head += '<th>'+columnas[columna]+'</th>'

    }
    $(id_contenedor).html(
        '<table class="table table-bordered table-responsive">'+
            '<thead>'+head+'</thead>'+
            '<tbody>'+rows+'</tbody>'+
        '</table>'
    );
}