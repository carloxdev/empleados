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
var tarjeta_acciones = null

/*-----------------------------------------------*\
         LOAD
\*-----------------------------------------------*/

$(document).ready(function () {
   
   
   tarjeta_resultados = new TarjetaResultados()
   tarjeta_filtros = new TarjetaFiltros()

   // Asigna eventos a teclas
   $(document).keypress(function (e) {

      // Tecla Enter
      if (e.which == 13) {

         e.preventDefault()

         if (tarjeta_filtros.$id.hasClass('in')) {
             tarjeta_filtros.apply_Filters()
         }

      }
      // Tecla ESC
   })
   window.paceOptions = {
  // Disable the 'elements' source
  elements: false,

  // Only show the progress on regular and ajax-y page navigation,
  // not every request
  restartOnRequestAfter: false
}
})

/*-----------------------------------------------*\
         OBJETO: Tarjeta filtros
\*-----------------------------------------------*/
function TarjetaFiltros() {

   this.$id = $("#id_tarjeta_filtros")
   this.$formulario = $("#id_formulario_filtro")
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
   this.$boton_buscar = $('#boton_buscar')
   this.$boton_limpiar = $('#boton_limpiar')
   this.$campos_iguales = true
   this.init_Components()
   this.init_Events()
}
TarjetaFiltros.prototype.init_Components = function () {

   this.$fecha_req_desde_hasta.daterangepicker(this.get_ConfDateRangePicker())
   this.$fecha_ord_desde_hasta.daterangepicker(this.get_ConfDateRangePicker())
   this.$id_compania.select2(appnova.get_ConfigSelect2())
   this.$id_sucursal.select2(appnova.get_ConfigSelect2())
   this.$id_requisicion_tipo.select2(appnova.get_ConfigSelect2())
   this.$id_requisicion_originador.select2(appnova.get_ConfigSelect2())
   this.$id_cotizacion_tipo.select2(appnova.get_ConfigSelect2())
   this.$id_cotizacion_originador.select2(appnova.get_ConfigSelect2())
   this.$id_oc_tipo.select2(appnova.get_ConfigSelect2())
   this.$id_oc_originador.select2(appnova.get_ConfigSelect2())
   this.$id_recepcion.select2(appnova.get_ConfigSelect2())

}
TarjetaFiltros.prototype.get_ConfDateRangePicker = function () {

   return {
      autoUpdateInput: false,
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
      
      "dateLimit": {

         "months": 6
      },
   }    
}
TarjetaFiltros.prototype.init_Events = function () {

   this.$boton_buscar.on('click', this, this.click_BotonBuscar)
   this.$boton_limpiar.on('click', this, this.click_BotonLimpiar)
   this.$id.on("hidden.bs.modal", this, this.hidden_Modal)
   this.$id_requisicion.on("keydown", this, this.keydown_ValidarNegativos)
   this.$id_cotizacion.on("keydown", this, this.keydown_ValidarNegativos)
   this.$id_oc.on("keydown", this, this.keydown_ValidarNegativos)
   this.$fecha_req_desde_hasta.on("apply.daterangepicker", this, this.aplicar_Rango)
   this.$fecha_req_desde_hasta.siblings('[data-event=\'calendario\']').on("click", this, this.click_MostrarPicker)
   this.$fecha_req_desde_hasta.siblings('[data-event=\'limpiar\']').on("click", this, this.click_LimpiarCampo)
   this.$fecha_ord_desde_hasta.on("apply.daterangepicker", this, this.aplicar_Rango)
   this.$fecha_ord_desde_hasta.siblings('[data-event=\'calendario\']').on("click", this, this.click_MostrarPicker)
   this.$fecha_ord_desde_hasta.siblings('[data-event=\'limpiar\']').on("click", this, this.click_LimpiarCampo)
   this.$id_compania.on("change", this, this.cambio_Estado)
   this.$id_sucursal.on("change", this, this.cambio_Estado)
   this.$id_comprador.on("change", this, this.cambio_Estado)
   this.$id_requisicion.on("change", this, this.cambio_Estado)
   this.$id_requisicion_tipo.on("change", this, this.cambio_Estado)
   this.$id_requisicion_originador.on("change", this, this.cambio_Estado)
   this.$id_requisicion_canceladas.on("change", this, this.cambio_Estado)
   this.$id_cotizacion.on("change", this, this.cambio_Estado)
   this.$id_cotizacion_tipo.on("change", this, this.cambio_Estado)
   this.$id_cotizacion_originador.on("change", this, this.cambio_Estado)
   this.$id_cotizacion_canceladas.on("change", this, this.cambio_Estado)
   this.$id_oc.on("change", this, this.cambio_Estado)
   this.$id_oc_tipo.on("change", this, this.cambio_Estado)
   this.$id_oc_originador.on("change", this, this.cambio_Estado)
   this.$id_oc_canceladas.on("change", this, this.cambio_Estado)
   this.$id_proveedor.on("change", this, this.cambio_Estado)
   this.$id_item.on("change", this, this.cambio_Estado)
   this.$id_recepcion.on("change", this, this.cambio_Estado)
   this.$fecha_req_desde_hasta.on("change", this, this.cambio_Estado)
   this.$fecha_ord_desde_hasta.on("change", this, this.cambio_Estado)
}
TarjetaFiltros.prototype.keydown_ValidarNegativos = function (e) {

   if(!((e.keyCode > 95 && e.keyCode < 106) || (e.keyCode > 47 && e.keyCode < 58) || e.keyCode == 8)) {

      return false
   }
}
TarjetaFiltros.prototype.cambio_Estado = function (e) {

   e.data.$campos_iguales = false
}
TarjetaFiltros.prototype.aplicar_Rango = function (e, picker) {

   // if (this.validar_RangoMeses) {

      $(this).val(picker.startDate.format('YYYY-MM-DD') + ' al ' + picker.endDate.format('YYYY-MM-DD'))
   // }
   // else {

   //    alertify.warning("Selecciona un rango no mayor a 6 meses")
   // }
}
// TarjetaFiltros.prototype.validar_RangoMeses = function (e) {

//    var bandera = true

//    if 

//    return bandera

// }
TarjetaFiltros.prototype.click_MostrarPicker = function (e) {

   $(this).siblings('input').data('daterangepicker').show()
}
TarjetaFiltros.prototype.click_LimpiarCampo = function (e) {

   $(this).siblings('input').val("")
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
   
   e.data.apply_Filters()
   e.data.$campos_iguales = true
   e.data.$id.modal('hide')
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
   e.data.$fecha_req_desde_hasta.val("")
   e.data.$fecha_ord_desde_hasta.val("")
}
TarjetaFiltros.prototype.hidden_Modal = function (e) {

   // tarjeta_resultados.grid.buscar()
}
TarjetaFiltros.prototype.get_NoFiltrosAplicados = function () {

   cantidad = 0

   if (this.$id_compania.val() != "") {
      cantidad += 1
   }
   if (this.$id_sucursal.val() != "") {
      cantidad += 1
   }
   if (this.$id_comprador.val() != "") {
      cantidad += 1
   }
   if (this.$id_requisicion.val() != "") {
      cantidad += 1
   }
   if (this.$id_requisicion_tipo.val() != "") {
      cantidad += 1
   }
   if (this.$id_requisicion_originador.val() != "") {
      cantidad += 1
   }
   if ($("input[name='requisicion_canceladas']:checked").val() != "") {
      cantidad += 1
   }
   if (this.$id_cotizacion.val() != "") {
      cantidad += 1
   }
   if (this.$id_cotizacion_tipo.val() != "") {
      cantidad += 1
   }
   if (this.$id_cotizacion_originador.val() != "") {
      cantidad += 1
   }
   if ($("input[name='cotizacion_canceladas']:checked").val() != "") {
      cantidad += 1
   }
   if (this.$id_oc.val() != "") {
      cantidad += 1
   }
   if (this.$id_oc_tipo.val() != "") {
      cantidad += 1
   }
   if (this.$id_oc_originador.val() != "") {
      cantidad += 1
   }
   if ($("input[name='oc_canceladas']:checked").val() != "") {
      cantidad += 1
   }
   if (this.$id_proveedor.val() != "") {
      cantidad += 1
   }
   if (this.$id_item.val() != "") {
      cantidad += 1
   }
   if (this.$id_recepcion.val() != "") {
      cantidad += 1
   }
   if (this.$fecha_req_desde_hasta.val() != "") {
      cantidad += 1
   }
   if (this.$fecha_ord_desde_hasta.val() != "") {
      cantidad += 1
   }

   return cantidad
}
TarjetaFiltros.prototype.apply_Filters = function () {

   tarjeta_resultados.grid.buscar()

   no_filtros = this.get_NoFiltrosAplicados()

   if (no_filtros != 0) {
        tarjeta_resultados.toolbar.change_BotonFiltros(no_filtros)
   }   else {
        tarjeta_resultados.toolbar.restart_BotonFiltros()
   }
    
   this.$id.modal('hide')
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

   this.$boton_exportar = $('#id_boton_exportar')
   this.$boton_filtros = $('#id_boton_filtro')
   this.init()
}
ToolBar.prototype.init = function () {

   this.$boton_exportar.on("click", this, this.click_BotonExportar)
}
ToolBar.prototype.change_BotonFiltros = function (_no_filtros) {
       
   html = "<i class='icon icon-left mdi mdi-search nova-white'></i> Filtros <span class='badge nova-border-bottom'>no_filtros</span>".replace("no_filtros", _no_filtros)

   this.$boton_filtros.html(html)
}
ToolBar.prototype.restart_BotonFiltros = function () {
    
   this.$boton_filtros.html("<i class='icon icon-left mdi mdi-search nova-white'></i> Filtros")   
}
ToolBar.prototype.click_BotonExportar = function (e) {
   
   if (tarjeta_filtros.get_NoFiltrosAplicados() != 0) {

      if (tarjeta_filtros.$campos_iguales) {

         if ((tarjeta_resultados.grid.$id.data("kendoGrid").dataSource.total() <= 65535) && (tarjeta_resultados.grid.$id.data("kendoGrid").dataSource.total() >= 1)) {            
            
            //Pace.restart()url: window.location.origin + '/seguimiento_compras/'
            var data = tarjeta_filtros.$formulario.submit()
            var algo = 1
            // $.ajax({
            //    url: 'http://127.0.0.1:8000/seguimiento_compras/',
            //    method: "POST",
            //    headers: { "X-CSRFToken": appnova.galletita },
            //    success: function (response) {

            //       alertify.success('listo')
            //    },
            //    error: function(response){
            //       alertify.error("Ocurrio error al exportar")
            //    }                    
            // })
            

                  // $.ajax({
                  //      type:"POST",
                  //      headers: { "X-CSRFToken": appnova.galletita },
                  //      data: $("#id_formulario_filtro").serialize(),
                  //      url:"http://127.0.0.1:8000/seguimiento_compras/",
                  //      success: function(){
                  //           alertify.success('listo')
                  //      },
                  //      error: function (_response) {
                  //          alertify.error('nads')
                  //      }
                  // });
                  // return false; //<---- move it here
            
         }
         else if(tarjeta_resultados.grid.$id.data("kendoGrid").dataSource.total() == 0) {
            
            alertify.warning("No hay registros a exportar.")
         }
         else {
            
            alertify.warning("Demasiados datos, ingresa un rango de fecha de requisicion menor.")
         }
      }
      else {

         alertify.warning("Filtros sin aplicar, los datos no se reflejarán en el Excel")
      }
   }
   else {

      alertify.warning("Debe seleccionar filtros")
   }
      
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

/*-----------------------------------------------*\
         OBJETO: Grid
\*-----------------------------------------------*/

function Grid() {

   tarjeta_acciones = new PopupAcciones()
   this.$id = $("#grid_resultados")
   this.kfuente_datos = null
   this.kgrid = null
   this.init()
   this.init_Events()
}
Grid.prototype.init = function () {

   kendo.culture("es-MX")
   this.kfuente_datos = new kendo.data.DataSource(this.get_DataSourceConfig())
   this.kgrid = this.$id.kendoGrid(this.get_Configuracion())
}
Grid.prototype.init_Events = function () {

   this.$id.on( "click", 'tr', this.click_FilaGrid )
}
Grid.prototype.click_FilaGrid = function (e) {

   $(e.currentTarget).find('td').addClass('k-state-selected')
   $(e.currentTarget).siblings().find('td').removeClass('k-state-selected')
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
         alertify.error("Status: " + e.status + " Error message: " + e.errorThrown)
      },
   }    
}
Grid.prototype.get_Campos = function () {

   return {
      req_compania : { type: "string" },
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
      ord_pu_mx : { type: "number" },
      ord_total_mx : { type: "number" },
      ord_impuesto : { type: "string" },
   }
}
Grid.prototype.get_Configuracion = function () {

   return {
      autoBind: false,
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
         template: "<div class='nova-grid-empy'> No se encontraron registros </div>"
      },
      dataBound: this.set_Icons,
   }
}
Grid.prototype.get_Columnas = function () {

   return [
      { command: [ 
            {  text: " ",
               click: this.click_BotonAcciones,
               className: "btn nova-btn btn-default"
            },
         ],
         width: "76px"
      },
      { field: "req_compania", title: "Compañia", width:"100px", attributes: { "class": "nova-grid-column-yellow", } },
      { field: "req_un", title: "Sucursal", width:"130px", attributes: { "class": "nova-grid-column-yellow", } },
      { field: "req", title: "Requisición", width:"120px", attributes: { "class": "nova-grid-column-yellow", } },
      { field: "req_tipo", title: "Tipo", width:"75px", attributes: { "class": "nova-grid-column-yellow", } },
      { field: "req_generador", title: "Originador", width:"150px", attributes: { "class": "nova-grid-column-yellow", } },
      { field: "req_fecha_creacion", title: "Fecha creación", width:"120px", format: "{0:dd-MM-yyyy}", attributes: { "class": "nova-grid-column-yellow", } },
      { field: "req_fecha_necesidad", title: "Fecha necesidad", width:"120px", format: "{0:dd-MM-yyyy}", attributes: { "class": "nova-grid-column-yellow", } },
      { field: "req_linea", title: "Linea", width:"75px", attributes: { "class": "nova-grid-column-yellow", } },
      { field: "req_linea_tipo", title: "Tipo linea", width:"75px", attributes: { "class": "nova-grid-column-yellow", } },
      { field: "req_estado_last", title: "Último estatus", width:"120px", attributes: { "class": "nova-grid-column-yellow", } },
      { field: "req_estado_next", title: "Siguiente estatus", width:"120px", attributes: { "class": "nova-grid-column-yellow", } },
      { field: "req_comprador_desc", title: "Comprador", width:"300px", attributes: { "class": "nova-grid-column-yellow", } },
      { field: "req_item_numero", title: "No. item", width:"120px", attributes: { "class": "nova-grid-column-yellow", } },
      { field: "req_item_desc", title: "Descripción del item", width:"500px", attributes: { "class": "nova-grid-column-yellow", } },
      { field: "req_cantidad_solicitada", title: "Cantidad solicitada", width:"120px", attributes: { "class": "nova-grid-column-yellow", } },
      { field: "req_udm", title: "UDM", width:"75px", attributes: { "class": "nova-grid-column-yellow", } },
      { field: "cot", title: "Cotización", width:"120px", attributes: { "class": "nova-grid-column-purple", } },
      { field: "cot_tipo", title: "Tipo", width:"75px", attributes: { "class": "nova-grid-column-purple", } },
      { field: "cot_fecha_creacion", title: "Fecha creación", width:"120px", format: "{0:dd-MM-yyyy}", attributes: { "class": "nova-grid-column-purple", } },
      { field: "cot_generador", title: "Originador", width:"150px", attributes: { "class": "nova-grid-column-purple", } },
      { field: "cot_linea", title: "Linea", width:"75px", attributes: { "class": "nova-grid-column-purple", } },
      { field: "cot_estado_last", title: "Último estado", width:"120px", attributes: { "class": "nova-grid-column-purple", } },
      { field: "cot_estado_next", title: "Siguiente estado", width:"120px", attributes: { "class": "nova-grid-column-purple", } },
      { field: "ord", title: "OC", width:"75px", attributes: { "class": "nova-grid-column-blue", } },
      { field: "ord_tipo", title: "Tipo", width:"75px", attributes: { "class": "nova-grid-column-blue", } },
      { field: "ord_fecha_creacion", title: "Fecha creación", width:"120px", format: "{0:dd-MM-yyyy}", attributes: { "class": "nova-grid-column-blue", } },
      { field: "ord_fecha_entrega", title: "Fecha entrega", width:"120px", format: "{0:dd-MM-yyyy}", attributes: { "class": "nova-grid-column-blue", } },
      { field: "ord_generador", title: "Originador", width:"150px", attributes: { "class": "nova-grid-column-blue", } },
      { field: "ord_linea", title: "Linea", width:"75px", attributes: { "class": "nova-grid-column-blue", } },
      { field: "ord_proveedor", title: "Proveedor codigo", width:"120px", attributes: { "class": "nova-grid-column-blue", } },
      { field: "ord_proveedor_desc", title: "Proveedor descripcion", width:"350px", attributes: { "class": "nova-grid-column-blue", } },
      { field: "ord_estado_last", title: "Último estado", width:"120px", attributes: { "class": "nova-grid-column-blue", } },
      { field: "ord_estado_next", title: "Siguiente estado", width:"120px", attributes: { "class": "nova-grid-column-blue", } },
      { field: "ord_cantidad_solic", title: "Cantidad", width:"75px", attributes: { "class": "nova-grid-column-blue", } },
      { field: "ord_moneda", title: "Moneda", width:"75px" , attributes: { "class": "nova-grid-column-blue", } },
      { field: "ord_pu_mx", title: "Costo Unitario MXP", format: "{0:c}", width:"150px", attributes: { "class": "nova-grid-column-blue", } },
      { field: "ord_total_mx", title: "Total de linea MXP", format: "{0:c}", width:"150px", attributes: { "class": "nova-grid-column-blue", } },
      { field: "ord_impuesto", title: "Impuesto", width:"100px", attributes: { "class": "nova-grid-column-blue", } },
   ]
}
Grid.prototype.click_BotonAcciones = function (e) {

   e.preventDefault()
   var fila = this.dataItem($(e.currentTarget).closest('tr').addClass('k-state-selected').siblings().removeClass('k-state-selected'))
   tarjeta_resultados.grid.$id.select(fila)
   tarjeta_acciones.mostrar(fila)
}
Grid.prototype.set_Icons = function (e) {

   e.sender.tbody.find(".k-button.btn.nova-btn.btn-default").each(function(idx, element){
      $(element).removeClass('k-button k-button-icontext').find("span").remove()
      $(element).append('<i class="icon icon mdi mdi-settings nova-black"></i>')
   })
}
Grid.prototype.buscar = function() {
   
   this.kfuente_datos.page(1)
}

/*-----------------------------------------------*\
         OBJETO: popup detalles
\*-----------------------------------------------*/

function PopupDetalles() {
   
   this.$id = $('#id_tarjeta_detalles')
   this.$id_titulo = $('#id_titulo_detalles')
   this.init_Events()
}
PopupDetalles.prototype.init_Events = function () {

   this.$id.on("hidden.bs.modal", this, this.hide)
}
PopupDetalles.prototype.mostrar = function (e) {

   this.$id.modal('show')
}
PopupDetalles.prototype.hide = function (e) {

   $("#tabla_detalles").html('')
}
PopupDetalles.prototype.construir_Tabla = function (_id_contenedor, _data, _campos, _columnas_nombre, _titulo){

   var head = ''
   var rows = ''
   if (_data.length) {

      for ( fila = 0; fila < _data.length; fila++ ) {

         var cols = ''
         for ( columna = 0; columna < _campos.length; columna++ ) {

            if ([_campos[columna]] == 'pu_mx' || [_campos[columna]] == 'monto_recib_mx') {
               
               cols += '<td>$ '+_data[fila][_campos[columna]]+'</td>'
            }
            else {

               cols += '<td>'+_data[fila][_campos[columna]]+'</td>'
            }
         }
         rows += '<tr>'+cols+'</tr>'
      }
   }
   else {

      rows += '<tr> <td class="nova-grid-empy" colspan="'+ _columnas_nombre.length +'"> No se encontraron registros </td> </tr>'
   }
   for ( columna = 0; columna < _columnas_nombre.length; columna++ ) {

      head += '<th>'+_columnas_nombre[columna]+'</th>'

   }
   $(_id_contenedor).html(
      '<table class="table table-bordered table-hover table-curved">'+
         '<thead>'+head+'</thead>'+
         '<tbody>'+rows+'</tbody>'+
      '</table>'
   )

   this.mostrar()
   this.$id_titulo.text(_titulo)
}

/*-----------------------------------------------*\
         OBJETO: Popup Acciones
\*-----------------------------------------------*/

function PopupAcciones() {

   tarjeta_detalles = new PopupDetalles()
   this.$id = $("#id_tarjeta_acciones")
   this.$boton_autorizadores = $('#id_boton_autorizadores')
   this.$boton_recepciones = $('#id_boton_recepciones')
   this.$boton_cotejo = $('#id_boton_cotejo')
   this.$fila
   this.init_Events()
}
PopupAcciones.prototype.init_Events = function () {

   this.$boton_autorizadores.on("click", this, this.click_botonAutorizaciones )
   this.$boton_recepciones.on("click", this, this.click_botonRecepciones )
   this.$boton_cotejo.on("click", this, this.click_botonCotejo )
}
PopupAcciones.prototype.mostrar = function (_fila) {

   this.$fila = _fila
   this.$id.modal('show')
}
PopupAcciones.prototype.hide = function () {

   this.$id.modal('hide')
}
PopupAcciones.prototype.click_botonAutorizaciones = function (e) {

   var fila = e.data.$fila
   e.data.filtrar_Autorizaciones(fila)
}
PopupAcciones.prototype.click_botonRecepciones = function (e) {

   var fila = e.data.$fila
   e.data.filtrar_Recepciones(fila)
}
PopupAcciones.prototype.click_botonCotejo = function (e) {

   var fila = e.data.$fila
   e.data.filtrar_Cotejo(fila)
}
PopupAcciones.prototype.filtrar_Autorizaciones = function (_fila) {
   
   $.ajax({
      url: url_compraseguimeinto_autorizadores,
      method: "GET",
      dataType: "json",
      data: {
         oc:_fila.ord,
         oc_tipo:_fila.ord_tipo,
         oc_compania:_fila.ord_compania
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
            ],
            'Detalles de Autorizaciones'

         )
         tarjeta_acciones.hide()
      },
      failure: function(data) { 
         alert.error('Error al recuperar datos.')
      }
   })
       
}
PopupAcciones.prototype.filtrar_Recepciones = function (_fila) {
   
   $.ajax({
      url: url_compraseguimiento_recepciones,
      method: "GET",
      dataType: "json",
      data: {
         oc:_fila.ord,
         oc_tipo:_fila.ord_tipo,
         oc_compania:_fila.ord_compania,
         oc_linea:_fila.ord_linea,
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
            ],
            'Detalles de Compras'
         )
         tarjeta_acciones.hide()
      },
      failure: function(data) { 
         alertify.error('Error al recuperar datos.')
      }
   })
}
PopupAcciones.prototype.filtrar_Cotejo = function (_fila) {
   
   $.ajax({
      url: url_compraseguimiento_recepciones,
      method: "GET",
      dataType: "json",
      data: {
         oc:_fila.ord,
         oc_tipo:_fila.ord_tipo,
         oc_compania:_fila.ord_compania,
         oc_linea:_fila.ord_linea,
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
            [  'Compañia cotejo',
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
            ],
            'Detalles de Cotejo'
         )
         tarjeta_acciones.hide()
      },
      failure: function(data) { 
         alert.error('Error al recuperar datos.')
      }
   })
}