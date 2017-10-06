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

    // Asigna eventos a teclas
    $(document).keypress(function (e) {
        // Tecla Enter
        if (e.which == 13) {
            tarjeta_filtros.click_BotonBuscar(e)

        }
    })
})


/* -------------------- OBJETO: Popup Filtros -------------------- */

function PopupFiltros() {

    this.$id = $('#tarjeta_filtros')
    this.$anio = $('#id_anio')
    this.$proyecto = $('#id_proyecto')
    this.$centro_costos = $('#id_centro_costos')
    this.$compania = $('#id_compania')

    this.$boton_buscar = $('#boton_buscar')
    this.$boton_limpiar = $('#boton_limpiar')

    this.init()
    this.set_Events()
}
PopupFiltros.prototype.init = function () {

    this.$anio.select2(appnova.get_ConfigSelect2())
    this.$proyecto.select2(appnova.get_ConfigSelect2())
    this.$centro_costos.select2(appnova.get_ConfigSelect2())
    this.$compania.select2(appnova.get_ConfigSelect2())
}
PopupFiltros.prototype.set_Events = function () {

    this.$boton_buscar.on("click", this, this.click_BotonBuscar)
    this.$proyecto.on("change", this, this.click_BloquearCentroCosotos)
    this.$centro_costos.on("change", this, this.click_BloquearProyecto)
    this.$boton_limpiar.on("click", this, this.click_BotonLimpiar)
}
PopupFiltros.prototype.click_BotonBuscar = function (e) {

    e.preventDefault()

    tarjeta_resultados.grid.agrupar_Informacion()
    tarjeta_filtros.ocultar_Popup()
}
PopupFiltros.prototype.click_BloquearCentroCosotos = function (e){

    e.data.$centro_costos.attr("disabled", true);
}
PopupFiltros.prototype.click_BloquearProyecto = function (e){

    e.data.$proyecto.attr("disabled", true);
}
PopupFiltros.prototype.click_BotonLimpiar = function (e) {

    e.preventDefault()

    e.data.$anio.val("17").trigger("change")
    e.data.$proyecto.val("").trigger("change")
    e.data.$centro_costos.val("").trigger("change")
    e.data.$compania.val("").trigger("change")
    e.data.$proyecto.attr("disabled", false);
    e.data.$centro_costos.attr("disabled", false);
}
PopupFiltros.prototype.ocultar_Popup = function (){

    this.$id.modal('hide')
}


/* -------------------- OBJETO: Tarjeta Resultados -------------------- */

function TarjetaResultados(){
    this.grid = new Grid()
    // this.tarjeta_grafica = new Grafica()
}


/*-----------------------------------------------*\
         OBJETO: Grid
\*-----------------------------------------------*/

function Grid() {

   this.$id = $("#grid_resultados")
   this.kfuente_datos = null
   this.kgrid = null
   this.agrupar_Informacion()
   // this.init()
}
Grid.prototype.init = function (_resultado) {

   kendo.culture("es-MX")
   this.kfuente_datos = new kendo.data.DataSource(this.get_DataSourceConfig(_resultado))
   this.kgrid = this.$id.kendoGrid(this.get_Configuracion())
}
Grid.prototype.agrupar_Informacion = function (){
    var valor= ''
    var resultado
    if (tarjeta_filtros.$proyecto.val() != ''){
        valor = tarjeta_filtros.$proyecto.val()
    }
    else if(tarjeta_filtros.$centro_costos.val() != ''){
        valor = tarjeta_filtros.$centro_costos.val()
    }
    var promesa = $.ajax({
         url: url_viewflujoegresos,
         method: "GET",
         dataType: "json",
         data: {
            anio: tarjeta_filtros.$anio.val(),
            descripcion_un: valor,
            compania: tarjeta_filtros.$compania.val(),
         },
         success: function (response) {

           resultado = Enumerable.from(response)
                        .groupBy("$.cuenta_clase_desc", null,
                            function (key, g) {
                                var result = {
                                    cuenta_clase_desc: key,
                                    enero: g.sum("$.enero"),
                                    febrero: g.sum("$.febrero"),
                                    marzo: g.sum("$.marzo"),
                                    abril: g.sum("$.abril"),
                                    mayo: g.sum("$.mayo"),
                                    junio: g.sum("$.junio"),
                                    julio: g.sum("$.julio"),
                                    agosto: g.sum("$.agosto"),
                                    septiembre: g.sum("$.septiembre"),
                                    octubre: g.sum("$.octubre"),
                                    noviembre: g.sum("$.noviembre"),
                                    diciembre: g.sum("$.diciembre"),
                                    total: g.sum("$.total"),
                                }
                                return result;
                            })
                        .toArray()
         },
         error: function (response) {
            alertify("Ocurrio error al consultar")
         }
   })
    promesa.then(function(){
        if(resultado.length != 0){
            $('#container-flujo').removeClass('hide')
            tarjeta_resultados.grid.init(resultado)
            tarjeta_grafica = new Grafica(resultado)
        }else{
            $('#container-flujo').addClass('hide')
            tarjeta_resultados.grid.init(resultado)

        }
    })
}
Grid.prototype.get_DataSourceConfig = function (_resultado) {

    return {

        serverPaging: true,
        pageSize: 10,
        data: _resultado,
        schema: {
            // total: "count",
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
Grid.prototype.get_Configuracion = function () {

   return {
      // autoBind: false,
      dataSource: this.kfuente_datos,
      columnMenu: true,
      groupable: false,
      sortable: false,
      resizable: true,
      selectable: true,
      scrollable: false,
      columns: this.get_Columnas(),
      scrollable: true,
      editable: false,
      pageable: false,
      noRecords: {
         template: "<div class='nova-grid-empy'> No se encontrarón registros </div>"
      },
   }
}
Grid.prototype.get_Columnas = function () {

    return [
        {   field: "cuenta_clase_desc", title: "Descripción", width: "150px", template:"<strong>#=cuenta_clase_desc#</strong>" },
        {   field: "enero", title: "Enero", format: "{0:c}", width:"120px", },
        {   field: "febrero", title: "Febrero", format: "{0:c}", width:"120px" },
        {   field: "marzo", title: "Marzo", format: "{0:c}", width:"120px" },
        {   field: "abril", title: "Abril", format: "{0:c}", width:"120px" },
        {   field: "mayo", title: "Mayo", format: "{0:c}", width:"120px" },
        {   field: "junio", title: "Junio", format: "{0:c}", width:"120px" },
        {   field: "julio", title: "Julio", format: "{0:c}", width:"120px" },
        {   field: "agosto", title: "Agosto", format: "{0:c}", width:"120px" },
        {   field: "septiembre", title: "Septiembre", format: "{0:c}", width:"120px" },
        {   field: "octubre", title: "Octubre", format: "{0:c}", width:"120px" },
        {   field: "noviembre", title: "Noviembre", format: "{0:c}", width:"120px" },
        {   field: "diciembre", title: "Diciembre", format: "{0:c}", width:"120px" },
        {   field: "total", title: "Total", width:"150px", format: "{0:c}"},//,template:"<strong>$#=total#</strong>" },
        {   title: "CXP", width:"100px" },
    ]
}

/* -------------------- OBJETO: Grafica -------------------- */

function Grafica(_response){

    Highcharts.chart('container-flujo',this.get_IndicadorConfig(_response))
}
Grafica.prototype.get_IndicadorConfig = function (_response) {

   return {

      colors: ['#d73027', '#f46d43', '#fdae61', '#fee090', '#41b6c4', '#abd9e9', '#74add1', '#0B0B61', '#ffffcc','#a1dab4','#2c7fb8','#253494'],
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

