/*-----------------------------------------------*\
         GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:
//var url_seguimiento_bypage = window.location.origin + "/api-jde/viewscompras_bypage/"

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
})

/*-----------------------------------------------*\
         OBJETO: Tarjeta filtros
\*-----------------------------------------------*/
function TarjetaFiltros() {

   this.$id_compania = $('#id_compania')
   this.$id_aprobador = $('#id_aprobador')

   this.$boton_buscar = $('#boton_buscar')
   this.$boton_limpiar = $('#boton_limpiar')
   this.init_Components()
   this.init_Events()
}
TarjetaFiltros.prototype.init_Components = function () {

   this.$id_compania.select2(appnova.get_ConfigSelect2())
   this.$id_aprobador.select2(appnova.get_ConfigSelect2())
}
TarjetaFiltros.prototype.init_Events = function () {

   this.$boton_buscar.on("click", this, this.click_BotonBuscar)
   this.$boton_limpiar.on("click", this, this.click_BotonLimpiar)
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

   this.init()
}
ToolBar.prototype.init = function () {

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
   this.kfuente_datos = new kendo.data.DataSource(
      {  serverPaging: true,
         pageZize: 10,
         data:
               [
                  {  contrato: "Compresor de gas pemex"},
                  {  contrato: "Licitacion 2015"},
                  {  contrato: "Licitacion 2016"},
                  {  contrato: "Licitacion 2018"}
               ],
         schema: {
            total: function(response) {
               return $(response.data).length;
            },
         }
      }
   )
   this.kgrid = this.$id.kendoGrid(this.get_Configuracion())
}
Grid.prototype.get_DataSourceConfig = function (e) {

   return 
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
      columns: [
         
         { field: "contrato", title: "Contrato", width:"60%"},
         { command: [ {name:"edit", text:{edit:"Editar", update:"Actualizar", cancel:"Cancelar"}}, {name:"destroy", text:"Eliminar"}]},
      ],
      scrollable: true,
      editable: "inline",
      pageable: true,
      noRecords: {
         template: "<div class='grid-empy'> No se encontraron registros </div>"
      },
      
   }
}
Grid.prototype.get_Columnas = function () {

   return 1
}
Grid.prototype.set_Icons = function (e) {

   e.sender.tbody.find(".k-button.mdi.mdi-search").each(function(idx, element){
      $(element).removeClass("mdi mdi-search").find("span").addClass("mdi mdi-search")
   })
}
Grid.prototype.buscar = function() {
   
   this.kfuente_datos.page(1)
}