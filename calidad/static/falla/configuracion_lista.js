/*-----------------------------------------------*\
         GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:
//var url_seguimiento_bypage = window.location.origin + "/api-jde/viewscompras_bypage/"

// OBJS
var tarjeta_resultados = null
var popup_tipo_falla = null
var toolbar = null
var grid = null

/*-----------------------------------------------*\
         LOAD
\*-----------------------------------------------*/

$(document).ready(function () {
   
   tarjeta_resultados = new TarjetaResultados()
})

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
   
   popup_tipo_falla = new PopupTipofalla()
   this.$id_boton_nuevo = $('#id_boton_nuevo')
   this.init_Events()
}
ToolBar.prototype.init_Events = function () {
   
   this.$id_boton_nuevo.on("click", this, this.click_BotonNuevo)
}
ToolBar.prototype.click_BotonNuevo = function (e) {

   e.preventDefault()
}

/*-----------------------------------------------*\
         OBJETO: popup nuevo
\*-----------------------------------------------*/

function PopupTipofalla() {
   
   this.$id_tipo_falla = $('#id_tipo_falla')
   this.$id_boton_guardar_sitio = $('#id_boton_guardar_sitio')
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
                  {  tipo_falla: "Impacto en el suelo", codigo: "IMPS"},
                  {  tipo_falla: "Fuga de gas", codigo: "FGAS"},
               ],
         schema: {
            total: function(response) {
               return $(response.data).length
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
         
         {  template: '<a class="btn nova-btn btn-default nova-btn-delete"> <i class="icon icon-left icon mdi mdi-delete nova-white"></i></a>',
            width: '45px'
         },
         {  field: "codigo", title: "Codigo", width:"30%"
         },
         {  field: "tipo_falla", title: "Descripción", width:"40%"
         },
         
      ],
      scrollable: true,
      editable: true,
      pageable: true,
      noRecords: {
         template: "<div class='grid-empy'> No se encontrarón registros </div>"
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