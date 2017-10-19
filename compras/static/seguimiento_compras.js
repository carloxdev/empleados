/*-----------------------------------------------*\
         GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:
var url_seguimiento_bypage = window.location.origin + "/api-jde/viewscompras_bypage/"
var url_seguimiento = window.location.origin + "/api-jde/viewscompras/"
var url_seguimiento_compania = window.location.origin + "/api-jde/viewcompanias/"
var url_seguimiento_sucursal = window.location.origin + "/api-jde/viewunidades/"
var url_compraseguimeinto_autorizadores = window.location.origin + "/api-jde/viewautorizaciones/"
var url_compraseguimiento_recepciones = window.location.origin + "/api-jde/viewrecepciones/"

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
   // $(document).keypress(function (e) {
   //
   //    // Tecla Enter
   //    if (e.which == 13) {
   //
   //       e.preventDefault()
   //
   //       if (tarjeta_filtros.$id.hasClass('in')) {
   //           tarjeta_filtros.apply_Filters()
   //       }
   //
   //    }
   //    // Tecla ESC
   // })
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
   this.$id_requisicion_canceladas = $('#id_requisicion_canceladas')
   this.$id_cotizacion = $("#id_cotizacion")
   this.$id_cotizacion_tipo = $("#id_cotizacion_tipo")
   this.$id_cotizacion_originador = $("#id_cotizacion_originador")
   this.$id_cotizacion_canceladas = $("#id_cotizacion_canceladas")
   this.$id_oc = $("#id_oc")
   this.$id_oc_tipo = $("#id_oc_tipo")
   this.$id_oc_originador = $("#id_oc_originador")
   this.$id_oc_canceladas = $("#id_oc_canceladas")
   this.$id_proveedor = $("#id_proveedor")
   this.$id_item = $("#id_item")
   this.$id_recepcion = $("#id_recepcion")
   this.$id_requisicion_desde = $('#id_requisicion_desde_group')
   this.$id_requisicion_hasta = $('#id_requisicion_hasta_group')
   this.$id_oc_desde = $('#id_oc_desde_group')
   this.$id_oc_hasta = $('#id_oc_hasta_group')
   this.$boton_buscar = $('#boton_buscar')
   this.$boton_limpiar = $('#boton_limpiar')
   this.$boton_cancelar = $('#boton_cancelar')
   this.$campos_usados = []
   this.init_Responsive()
   this.init_Components()
   this.init_Events()
}
TarjetaFiltros.prototype.init_Responsive = function () {

   if (window.matchMedia('(max-width: 768px)').matches) {
      this.$boton_cancelar.addClass('btn-xs')
      this.$boton_limpiar.addClass('btn-xs')
      this.$boton_buscar.removeClass('btn-lg')
   }
}
TarjetaFiltros.prototype.init_Components = function () {

   this.$id_compania.select2(appnova.get_ConfigSelect2())
   this.$id_sucursal.select2(appnova.get_ConfigSelect2())
   this.$id_requisicion_tipo.select2(appnova.get_ConfigSelect2())
   this.$id_requisicion_originador.select2(appnova.get_ConfigSelect2())
   this.$id_requisicion_desde.datepicker(appnova.get_ConfDatePicker())
   this.$id_requisicion_hasta.datepicker(appnova.get_ConfDatePicker())
   this.$id_requisicion_canceladas.select2(appnova.get_ConfigSelect2()).val('-980').trigger("change")
   this.$id_oc_desde.datepicker(appnova.get_ConfDatePicker())
   this.$id_oc_hasta.datepicker(appnova.get_ConfDatePicker())
   this.$id_cotizacion_tipo.select2(appnova.get_ConfigSelect2())
   this.$id_cotizacion_originador.select2(appnova.get_ConfigSelect2())
   this.$id_cotizacion_canceladas.select2(appnova.get_ConfigSelect2()).val('-980').trigger("change")
   this.$id_oc_tipo.select2(appnova.get_ConfigSelect2())
   this.$id_oc_originador.select2(appnova.get_ConfigSelect2())
   this.$id_oc_canceladas.select2(appnova.get_ConfigSelect2()).val('-980').trigger("change")
   this.$id_recepcion.select2(appnova.get_ConfigSelect2())
}
TarjetaFiltros.prototype.init_Events = function () {

   this.$boton_buscar.on('click', this, this.click_BotonBuscar)
   this.$boton_limpiar.on('click', this, this.click_BotonLimpiar)
   this.$id.on("hide.bs.modal", this, this.hide_Modal)
   this.$id_requisicion.on("keydown", this, this.keydown_ValidarNegativos)
   this.$id_cotizacion.on("keydown", this, this.keydown_ValidarNegativos)
   this.$id_oc.on("keydown", this, this.keydown_ValidarNegativos)
   this.$id_requisicion_desde.on("hide", this, this.hide_DatePicker)
   this.$id_requisicion_hasta.on("hide", this, this.hide_DatePicker)
   this.$id_oc_desde.on("hide", this, this.hide_DatePicker)
   this.$id_oc_hasta.on("hide", this, this.hide_DatePicker)
}
TarjetaFiltros.prototype.hide_DatePicker = function (e) {

   e.stopPropagation();
}
TarjetaFiltros.prototype.keydown_ValidarNegativos = function (e) {

   if(!((e.keyCode > 95 && e.keyCode < 106) || (e.keyCode > 47 && e.keyCode < 58) || e.keyCode == 8)) {

      return false
   }
}
TarjetaFiltros.prototype.hide_Modal = function (e) {

   e.data.$id_requisicion_desde.data('datepicker').hide()
   e.data.$id_requisicion_hasta.data('datepicker').hide()
   e.data.$id_oc_desde.data('datepicker').hide()
   e.data.$id_oc_hasta.data('datepicker').hide()

   if (e.data.$campos_usados.length) {

      e.data.limpiar_CampoNoAplicado()
   }
}
TarjetaFiltros.prototype.limpiar_CampoNoAplicado = function () {

   var campos = [
      'id_compania', 'id_sucursal', 'id_comprador', 'id_requisicion', 'id_requisicion_tipo',
      'id_requisicion_originador', 'id_requisicion_canceladas', 'id_cotizacion', 'id_cotizacion_tipo',
      'id_cotizacion_originador', 'id_cotizacion_canceladas', 'id_oc', 'id_oc_tipo', 'id_oc_originador',
      'id_oc_canceladas', 'id_proveedor', 'id_item', 'id_recepcion', 'id_requisicion_desde_group',
      'id_requisicion_hasta_group', 'id_oc_desde_group', 'id_oc_hasta_group'
   ]

   var resultados

   tarjeta_filtros.$campos_usados.forEach(function(_campo) {

      resultados = campos.filter(

         function(_elem) {

            return _elem != _campo
         }
      )
      campos = resultados
   })

   resultados.forEach(function(_campo) {

      if (_campo == "id_compania") {

         tarjeta_filtros.$id_compania.data('select2').val(0)
      }
      if (_campo == "id_sucursal") {

         tarjeta_filtros.$id_sucursal.data('select2').val(0)
      }
      if (_campo == "id_comprador") {

         tarjeta_filtros.$id_comprador.val("")
      }
      if (_campo == "id_requisicion") {

         tarjeta_filtros.$id_requisicion.val("")
      }
      if (_campo == "id_requisicion_tipo") {

         tarjeta_filtros.$id_requisicion_tipo.data('select2').val(0)
      }
      if (_campo == "id_requisicion_originador") {

         tarjeta_filtros.$id_requisicion_originador.data('select2').val(0)
      }
      if (_campo == "id_requisicion_canceladas") {

         tarjeta_filtros.$id_requisicion_canceladas.val('-980').trigger("change")
      }
      if (_campo == "id_cotizacion") {

         tarjeta_filtros.$id_cotizacion.val("")
      }
      if (_campo == "id_cotizacion_tipo") {

         tarjeta_filtros.$id_cotizacion_tipo.data('select2').val(0)
      }
      if (_campo == "id_cotizacion_originador") {

         tarjeta_filtros.$id_cotizacion_originador.data('select2').val(0)
      }
      if (_campo == "id_cotizacion_canceladas") {

         tarjeta_filtros.$id_cotizacion_canceladas.val('-980').trigger("change")
      }
      if (_campo == "id_oc") {

         tarjeta_filtros.$id_oc.val("")
      }
      if (_campo == "id_oc_tipo") {

         tarjeta_filtros.$id_oc_tipo.data('select2').val(0)
      }
      if (_campo == "id_oc_originador") {

         tarjeta_filtros.$id_oc_originador.data('select2').val(0)
      }
      if (_campo == "id_oc_canceladas") {

         tarjeta_filtros.$id_oc_canceladas.val('-980').trigger("change")
      }
      if (_campo == "id_proveedor") {

         tarjeta_filtros.$id_proveedor.val("")
      }
      if (_campo == "id_item") {

         tarjeta_filtros.$id_item.val("")
      }
      if (_campo == "id_recepcion") {

         tarjeta_filtros.$id_recepcion.data('select2').val(0)
      }
      if (_campo == "id_requisicion_desde_group") {

         tarjeta_filtros.$id_requisicion_desde.datepicker("clearDates")
      }
      if (_campo == "id_requisicion_hasta_group") {

         tarjeta_filtros.$id_requisicion_hasta.datepicker("clearDates")
      }
      if (_campo == "id_oc_desde_group") {

         tarjeta_filtros.$id_oc_desde.datepicker("clearDates")
      }
      if (_campo == "id_oc_hasta_group") {

         tarjeta_filtros.$id_oc_hasta.datepicker("clearDates")
      }
   })
}
TarjetaFiltros.prototype.get_FechaMayorQue = function (element) {

    fecha = $(element).datepicker("getDate")
    fecha_conformato = moment(fecha).format('YYYY-MM-DD')

    if (fecha_conformato == "Invalid date") {
        return ""
    }
    else {
        return fecha_conformato
    }
}
TarjetaFiltros.prototype.get_FechaMenorQue = function (element) {

    fecha = $(element).datepicker("getDate")
    fecha_conformato = moment(fecha).format('YYYY-MM-DD')

    if (fecha_conformato == "Invalid date") {
        return ""
    }
    else {
        return fecha_conformato
    }
}
TarjetaFiltros.prototype.get_Values = function (_page, _pageSize) {

   return {
    //   page: _page,
    //   pageSize: _pageSize,

      req_compania: this.$id_compania.val(),
      req_un: this.$id_sucursal.val(),
      req_comprador_desc: this.$id_comprador.val(),
      req: this.$id_requisicion.val(),
      req_tipo: this.$id_requisicion_tipo.val(),
      req_generador: this.$id_requisicion_originador.val(),
      req_estado_last: this.$id_requisicion_canceladas.val(),
      cot: this.$id_cotizacion.val(),
      cot_tipo: this.$id_cotizacion_tipo.val(),
      cot_generador: this.$id_cotizacion_originador.val(),
      cot_estado_last: this.$id_cotizacion_canceladas.val(),
      ord: this.$id_oc.val(),
      ord_tipo: this.$id_oc_tipo.val(),
      ord_generador: this.$id_oc_originador.val(),
      ord_estado_last: this.$id_oc_canceladas.val(),
      req_fecha_creacion_desde: this.get_FechaMayorQue("#id_requisicion_desde_group"),
      req_fecha_creacion_hasta: this.get_FechaMenorQue("#id_requisicion_hasta_group"),
      ord_fecha_creacion_desde: this.get_FechaMayorQue("#id_oc_desde_group"),
      ord_fecha_creacion_hasta: this.get_FechaMenorQue("#id_oc_hasta_group"),
      ord_proveedor_desc: this.$id_proveedor.val(),
      req_item_desc: this.$id_item.val(),
      ord_recepcion: this.$id_recepcion.val()
   }
}
TarjetaFiltros.prototype.click_BotonBuscar = function (e) {

   e.data.apply_Filters()
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
   e.data.$id_requisicion_canceladas.data('select2').val('-980').trigger("change")
   e.data.$id_cotizacion.val("")
   e.data.$id_cotizacion_tipo.data('select2').val(0)
   e.data.$id_cotizacion_originador.data('select2').val(0)
   e.data.$id_cotizacion_canceladas.data('select2').val('-980').trigger("change")
   e.data.$id_oc.val("")
   e.data.$id_oc_tipo.data('select2').val(0)
   e.data.$id_oc_originador.data('select2').val(0)
   e.data.$id_oc_canceladas.data('select2').val('-980').trigger("change")
   e.data.$id_proveedor.val("")
   e.data.$id_item.val("")
   e.data.$id_recepcion.data('select2').val(0)
   e.data.$id_requisicion_desde.datepicker("clearDates")
   e.data.$id_requisicion_hasta.datepicker("clearDates")
   e.data.$id_oc_desde.datepicker("clearDates")
   e.data.$id_oc_hasta.datepicker("clearDates")

}
TarjetaFiltros.prototype.get_NoFiltrosAplicados = function () {

   cantidad = 0
   filtros = []

   if (this.$id_compania.val() != "") {
      cantidad += 1
      filtros.push('id_compania')
   }
   if (this.$id_sucursal.val() != "") {
      cantidad += 1
      filtros.push('id_sucursal')
   }
   if (this.$id_comprador.val() != "") {
      cantidad += 1
      filtros.push('id_comprador')
   }
   if (this.$id_requisicion.val() != "") {
      cantidad += 1
      filtros.push('id_requisicion')
   }
   if (this.$id_requisicion_tipo.val() != "") {
      cantidad += 1
      filtros.push('id_requisicion_tipo')
   }
   if (this.$id_requisicion_originador.val() != "") {
      cantidad += 1
      filtros.push('id_requisicion_originador')
   }
   if (this.$id_requisicion_canceladas.val() != "-980") {
      cantidad += 1
      filtros.push('id_requisicion_canceladas')
   }
   if (this.$id_cotizacion.val() != "") {
      cantidad += 1
      filtros.push('id_cotizacion')
   }
   if (this.$id_cotizacion_tipo.val() != "") {
      cantidad += 1
      filtros.push('id_cotizacion_tipo')
   }
   if (this.$id_cotizacion_originador.val() != "") {
      cantidad += 1
      filtros.push('id_cotizacion_originador')
   }
   if (this.$id_cotizacion_canceladas.val() != "-980") {
      cantidad += 1
      filtros.push('id_cotizacion_canceladas')
   }
   if (this.$id_oc.val() != "") {
      cantidad += 1
      filtros.push('id_oc')
   }
   if (this.$id_oc_tipo.val() != "") {
      cantidad += 1
      filtros.push('id_oc_tipo')
   }
   if (this.$id_oc_originador.val() != "") {
      cantidad += 1
      filtros.push('id_oc_originador')
   }
   if (this.$id_oc_canceladas.val() != "-980") {
      cantidad += 1
      filtros.push('id_oc_canceladas')
   }
   if (this.$id_proveedor.val() != "") {
      cantidad += 1
      filtros.push('id_proveedor')
   }
   if (this.$id_item.val() != "") {
      cantidad += 1
      filtros.push('id_item')
   }
   if (this.$id_recepcion.val() != "") {
      cantidad += 1
      filtros.push('id_recepcion')
   }
   if (this.get_FechaMayorQue("#id_requisicion_desde_group") != "") {
      cantidad += 1
      filtros.push('id_requisicion_desde_group')
   }
   if (this.get_FechaMenorQue("#id_requisicion_hasta_group") != "") {
      cantidad += 1
      filtros.push('id_requisicion_hasta_group')
   }
   if (this.get_FechaMayorQue("#id_oc_desde_group") != "") {
      cantidad += 1
      filtros.push('id_oc_desde_group')
   }
   if (this.get_FechaMenorQue("#id_oc_hasta_group") != "") {
      cantidad += 1
      filtros.push('id_oc_hasta_group')
   }

   return [cantidad, filtros]
}
TarjetaFiltros.prototype.apply_Filters = function () {

   tarjeta_resultados.grid.buscar()
   var [no_filtros, filtros] = [ 0, []]

   [no_filtros, filtros] = this.get_NoFiltrosAplicados()

   this.$campos_usados = filtros

   if (no_filtros != 0) {

      tarjeta_resultados.toolbar.change_BotonFiltros(no_filtros)
   }
   else {

      tarjeta_resultados.toolbar.restart_BotonFiltros()
   }
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
   this.init_Events()
}
ToolBar.prototype.init_Events = function () {

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

      if ((tarjeta_resultados.grid.$id.data("kendoGrid").dataSource.total() <= 65535) && (tarjeta_resultados.grid.$id.data("kendoGrid").dataSource.total() >= 1)) {

         tarjeta_filtros.$formulario.submit()
      }
      else if(tarjeta_resultados.grid.$id.data("kendoGrid").dataSource.total() == 0) {

         alertify.warning("No hay registros a exportar.")
      }
      else {

         alertify.warning("Demasiados datos, ingresa un rango en la fecha de requisición.")
      }
   }
   else {

      alertify.warning("Debe seleccionar filtros")
   }
}
ToolBar.prototype.get_Formato_Columnas = function () {

   var columnas = tarjeta_resultados.grid.get_Columnas()
   var columnas_formateadas = []

   $.each(columnas, function (_index) {
      $.each(this, function (_name) {
         if (_name === 'field'){
            columnas_formateadas.push(columnas[_index])
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
   this.init_Components()
   this.init_Events()
}
Grid.prototype.init_Components = function () {

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
      pageSize: 200,
      transport: {
         read: {

            url: url_seguimiento_bypage,
            type: "GET",
            dataType: "json",
         },
         parameterMap: function (_data, _action) {
            if (_action === "read"){

               return tarjeta_filtros.get_Values(_data.page, _data.pageSize)
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
      ord_pu_ex : { type: "number" },
      ord_total_ex : { type: "number" },
      ord_impuesto : { type: "string" },
      ord_recepcion : { type: "string" }
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
         width: "60px"
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
      { field: "req_glclass", title: "GL Class", width:"75px", attributes: { "class": "nova-grid-column-yellow", } },
      { field: "req_glclass_desc", title: "GL Class Descripción", width:"300px", attributes: { "class": "nova-grid-column-yellow", } },
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
      { field: "ord_pu_ex", title: "Costo Unitario USD", format: "{0:c}", width:"150px", attributes: { "class": "nova-grid-column-blue", } },
      { field: "ord_total_ex", title: "Total de linea USD", format: "{0:c}", width:"150px", attributes: { "class": "nova-grid-column-blue", } },
      { field: "ord_impuesto", title: "Impuesto", width:"100px", attributes: { "class": "nova-grid-column-blue", } },
      { field: "ord_recepcion", title: "Recepción",width:"120px", attributes: { "class": "nova-grid-column-blue", } },
      // { field: "cotejo", title: "Cotejo", width:"100px", attributes: { "class": "nova-grid-column-yellow", } },
   ]
}
Grid.prototype.click_BotonAcciones = function (e) {

   e.preventDefault()
   var fila = this.dataItem($(e.currentTarget).closest('tr'))
   $(e.currentTarget).closest('tr').addClass('k-state-selected').siblings().removeClass('k-state-selected')
   tarjeta_resultados.grid.$id.select(fila)
   tarjeta_acciones.mostrar(fila)
}
Grid.prototype.set_Icons = function (e) {

   e.sender.tbody.find(".k-button.btn.nova-btn.btn-default").each(function(idx, _element){
      $(_element).removeClass('k-button k-button-icontext').find("span").remove()
      $(_element).append('<i class="icon icon mdi mdi-settings nova-black"></i>')
   })
}
Grid.prototype.buscar = function() {

   this.kfuente_datos.page(1)
   tarjeta_resultados.toolbar.$boton_exportar.removeAttr('disabled')
}

/*-----------------------------------------------*\
         OBJETO: popup detalles
\*-----------------------------------------------*/

function PopupDetalles() {

   this.$id = $('#id_tarjeta_detalles')
   this.$id_titulo = $('#id_titulo_detalles')
   this.$boton_ok =  $('#boton_ok_detalle')
   this.init_Responsive()
   this.init_Events()
}
PopupDetalles.prototype.init_Responsive = function () {

   if (window.matchMedia('(max-width: 768px)').matches) {

      this.$boton_ok.removeClass('btn-lg')
   }
}
PopupDetalles.prototype.init_Events = function () {

   this.$id.on("hidden.bs.modal", this, this.hidden_Modal)
   this.$id.on("shown.bs.modal", this, this.shown_Modal)
}
PopupDetalles.prototype.mostrar = function (e) {

   this.$id.modal('show')
}
PopupDetalles.prototype.hidden_Modal = function (e) {

   $("#tabla_detalles").html('')
}
PopupDetalles.prototype.shown_Modal = function (e) {

   $("body").addClass("modal-open")
   $("html").addClass("be-modal-open")
}
PopupDetalles.prototype.construir_Tabla = function (_id_contenedor, _data, _campos, _columnas_nombre, _titulo){

   var head = ''
   var rows = ''
   if (_data.length) {

      for ( fila = _data.length-1; fila >= 0; fila-- ) {

         var cols = ''
         for ( columna = 0; columna < _campos.length; columna++ ) {

            if (_campos[columna] == 'pu_mx' || _campos[columna] == 'monto_recib_mx') {

               cols += '<td>$ '+_data[fila][_campos[columna]]+'</td>'
            }
            else if (_campos[columna] == 'autorizacion_fecha' || _campos[columna] == 'fecha_tran' || _campos[columna] == 'fecha_update' || _campos[columna] == 'fecha_lm' || _campos[columna] == 'fecha_creacion') {

               if (_campos[columna] == 'autorizacion_fecha' && _data[fila]["estado"].includes("N")) {

                  cols += '<td></td>'
               }
               else {

                  var fecha_data = _data[fila][_campos[columna]].split('-')
                  cols += '<td>'+ fecha_data[2] + '-' + fecha_data[1] + '-' + fecha_data[0] +'</td>'
               }
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
      '<table class="table table-bordered table-hover nova-table-popup-gradient">'+
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
         oc_compania:_fila.req_compania
      },
      success: function(_data) {
         tarjeta_detalles.construir_Tabla(
            '#tabla_detalles',
            _data,
            [  'ruta',
               'autorizador_desc',
               'autorizacion_fecha',
            ],
            [  'Ruta de aprovación',
               'Responsable',
               'Fecha autorización',
            ],
            'Detalles de Autorizaciones'

         )
         tarjeta_acciones.hide()
      },
      failure: function(_data) {
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
         oc_compania:_fila.req_compania,
         oc_linea:_fila.ord_linea,
         tran_tipo:'1',
      },
      success: function(_data) {
         tarjeta_detalles.construir_Tabla(
            '#tabla_detalles',
            _data,
            [  'doc_tipo',
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
            [  'Tipo recepción',
               'Documento',
               'Tipo',
               'Fecha recepción',
               'Fecha transacción',
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
      failure: function(_data) {
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
         oc_compania:_fila.req_compania,
         oc_linea:_fila.ord_linea,
         tran_tipo:'2',
      },
      success: function(_data) {
         tarjeta_detalles.construir_Tabla(
            '#tabla_detalles',
            _data,
            [  'tran_compania',
               'doc_tipo',
               'doc',
               'doc_linea',
               'fecha_creacion',
               'fecha_lm',
               'doc_factura',
               'monto_recib_mx',
               'monto_recib_ex',
               'tasa',
               'impuesto',
               'moneda',
               'batch',
               'batch_tipo',
               'fecha_update',
            ],
            [  'Compañia cotejo',
               'Tipo cotejo',
               'Número cotejo',
               'Linea cotejo',
               'Fecha cotejo',
               'Fecha LM',
               'Factura',
               'Monto MX',
               'Monto USD',
               'Tasa',
               'Tipo impuesto',
               'Moneda',
               'Cotejo batch',
               'Batch tipo',
               'Batch fecha',
            ],
            'Detalles de Cotejo'
         )
         tarjeta_acciones.hide()
      },
      failure: function(_data) {
         alert.error('Error al recuperar datos.')
      }
   })
}
