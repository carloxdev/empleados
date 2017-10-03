/* -------------------- GLOBAL VARIABLES -------------------- */

// URLS:
var url_viewflujoegresos = window.location.origin + "/api-jde/viewflujoegresos/"
var url_viewflujoegresos_bypage = window.location.origin + "/api-jde/viewflujoegresos_bypage/"

// OBJS
var tarjeta_filtros = null
var tarjeta_resultados = null
var tarjeta_grafica = null

/* -------------------- LOAD -------------------- */

$(document).ready(function () {

    // Inicializando Objetos
    tarjeta_filtros = new PopupFiltros()
    tarjeta_resultados = new TarjetaResultados()
    // tarjeta_grafica = new Grafica()

    // Asigna eventos a teclas
    $(document).keypress(function (e) {
        // Tecla Enter
        if (e.which == 13) {

            if (tarjeta_filtros.$id.hasClass('in')) {
                tarjeta_filtros.click_BotonBuscar()
            }

        }
    })
})


/* -------------------- OBJETO: Popup Filtros -------------------- */

function PopupFiltros() {

    this.$id = $('#tarjeta_filtros')
    this.$anio = $('#id_anio')
    this.$proyecto = $('#id_proyecto')
    this.$centro_costos = $('#id_centro_costos')

    this.$boton_buscar = $('#boton_buscar')
    this.$boton_limpiar = $('#boton_limpiar')

    this.init()
    this.set_Events()

}
PopupFiltros.prototype.init = function () {

    this.$anio.select2(appnova.get_ConfigSelect2())
    this.$proyecto.select2(appnova.get_ConfigSelect2())
    this.$centro_costos.select2(appnova.get_ConfigSelect2())

}
PopupFiltros.prototype.set_Events = function () {

    this.$boton_buscar.on("click", this, this.click_BotonBuscar)
    this.$boton_limpiar.on("click", this, this.click_BotonLimpiar)
}
PopupFiltros.prototype.click_BotonBuscar = function (e) {

    e.preventDefault()

    tarjeta_resultados.grid.buscar()
    tarjeta_grafica = new Grafica()
    e.data.$id.modal('hide')
}
PopupFiltros.prototype.get_Values = function (_page) {
    valor= ''
    if (this.$proyecto.val() != ''){
        valor = this.$proyecto.val()
    }
    else if(this.$centro_costos.val() != ''){
        valor = this.$centro_costos.val()
    }

    return {
        page: _page,

        anio: this.$anio.val(),
        descripcion_un: valor,
    }
}
PopupFiltros.prototype.click_BotonLimpiar = function (e) {

    e.preventDefault()

    e.data.$anio.val("").trigger("change")
    e.data.$proyecto.val("").trigger("change")
    e.data.$centro_costos.val("").trigger("change")
}


/* -------------------- OBJETO: Tarjeta Resultados -------------------- */

function TarjetaResultados(){

    this.grid = new Grid()
    // this.tarjeta_grafica = new Grafica()
}

/* -------------------- OBJETO: FuenteDatos -------------------- */

function FuenteDatos() {
    this.kinstancia = null
    this.init()
}
FuenteDatos.prototype.init = function() {

    this.kinstancia = new kendo.data.DataSource(this.get_Configuracion())
}
FuenteDatos.prototype.get_Configuracion = function() {
    return {

        serverPaging: true,
        pageSize: 10,
        transport: {
            read: {
                url: url_viewflujoegresos_bypage,
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
FuenteDatos.prototype.get_Campos = function() {
    return {
        tipo_un : { type: "string" },
        descripcion_un : { type: "string" },
        cuenta_clase_desc : { type: "string" },
        enero : { type: "integer" },
        febrero : { type: "integer" },
        marzo : { type: "integer" },
        abril : { type: "integer" },
        mayo : { type: "integer" },
        junio : { type: "integer" },
        julio : { type: "integer" },
        agosto : { type: "integer" },
        septiembre : { type: "integer" },
        octubre : { type: "integer" },
        noviembre : { type: "integer" },
        diciembre : { type: "integer" },
        total : { type: "integer" },
    }
}


/* -------------------- OBJETO: Grid -------------------- */

function Grid() {

    this.$id = $("#grid_resultados")
    this.fuente_datos = null
    this.kinstancia = null
    this.init()
}
Grid.prototype.init = function () {

    // Definicion del pais, formato modena, etc..
    kendo.culture("es-MX")

    // Se inicializa la fuente da datos (datasource)
    fdatos = new FuenteDatos()
    this.fuente_datos = fdatos.kinstancia

    // Se inicializa y configura el grid:
    this.kinstancia = this.$id.kendoGrid(this.get_Configuracion())
}
Grid.prototype.get_Configuracion = function () {

    return {
        autoBind: false,
        dataSource: this.fuente_datos,
        columnMenu: false,
        groupable: false,
        sortable: false,
        editable: false,
        resizable: true,
        selectable: true,
        scrollable: true,
        pageable: true,
        columns: this.get_Columnas(),
        noRecords: {
            template: "<div class='nova-grid-empy'> No se encontraron registros </div>"
        },
        dataBound: this.set_Icons,
    }
}
Grid.prototype.get_Columnas = function () {
    return [
        {   field: "cuenta_clase_desc", title: "Descripción", width: "150px", template:"<strong>#=cuenta_clase_desc#</strong>" },
        {   field: "enero", title: "Enero", format: "{0:c}", width:"100px", },
        {   field: "febrero", title: "Febrero", format: "{0:c}", width:"100px" },
        {   field: "marzo", title: "Marzo", format: "{0:c}", width:"100px" },
        {   field: "abril", title: "Abril", format: "{0:c}", width:"100px" },
        {   field: "mayo", title: "Mayo", format: "{0:c}", width:"100px" },
        {   field: "junio", title: "Junio", format: "{0:c}", width:"100px" },
        {   field: "julio", title: "Julio", format: "{0:c}", width:"100px" },
        {   field: "agosto", title: "Agosto", format: "{0:c}", width:"100px" },
        {   field: "septiembre", title: "Septiembre", format: "{0:c}", width:"100px" },
        {   field: "octubre", title: "Octubre", format: "{0:c}", width:"100px" },
        {   field: "noviembre", title: "Noviembre", format: "{0:c}", width:"100px" },
        {   field: "diciembre", title: "Diciembre", format: "{0:c}", width:"100px" },
        {   field: "total", title: "Total", width:"100px", template:"<strong>$#=total#</strong>" },
        {   title: "CXP", width:"100px" },
    ]
}
Grid.prototype.buscar = function() {

    this.fuente_datos.page(1)
}


/* -------------------- OBJETO: Grafica -------------------- */

function Grafica(){
    this.obtener_Informacion()
}
Grafica.prototype.obtener_Informacion = function (){
    $.ajax({
         url: url_viewflujoegresos,
         method: "GET",
         dataType: "json",
         data: {
            anio: tarjeta_filtros.$anio.val(),
            descripcion_un: tarjeta_filtros.$proyecto.val()
         },
         success: function (response) {
            
            Highcharts.chart('container-flujo',tarjeta_grafica.get_IndicadorConfig(response))
         },
         error: function (response) {
            alertify("Ocurrio error al consultar")
         }
   })
}
Grafica.prototype.get_IndicadorConfig = function (_response) {

   return {
      chart: {
        type: 'column'
      },
      title: {
         text: 'Flujo de egresos'
      },
      xAxis: {
        categories: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
      },
      yAxis: {
        min: 0,
        title: {
            text: 'Monto'
        },
      },
      legend: {
        backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
        borderColor: '#CCC',
        borderWidth: 1,
        shadow: false
      },
      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      plotOptions: {
        column: {
            stacking: 'normal',
        }
      },
      series: this.get_DataConfig(_response)
   }
}
Grafica.prototype.get_DataConfig = function (_response) {

    var datos = []
    for (var i = 0; i < _response.length; i++) {
        datos.push(
              {  name: _response[i].cuenta_clase_desc,
                 data: [_response[i].enero,_response[i].febrero,_response[i].marzo,_response[i].abril,_response[i].mayo,_response[i].junio,_response[i].julio,_response[i].agosto,_response[i].septiembre,_response[i].octubre,_response[i].noviembre,_response[i].diciembre],
              }

           )  
    }
   return datos
}
