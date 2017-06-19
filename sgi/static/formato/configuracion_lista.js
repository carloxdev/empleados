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

   this.$id_revision = $('#id_revision')
   this.$id_vigencia_input = $('#id_vigencia_input')
   this.$id_vigencia = $('#id_vigencia')
   this.$id_codigo = $('#id_codigo')
   this.$id_descripcion = $('#id_descripcion')

   this.$boton_buscar = $('#boton_buscar')
   this.$boton_limpiar = $('#boton_limpiar')
   this.init_Components()
   this.init_Events()
}
TarjetaFiltros.prototype.init_Components = function () {

   this.$id_vigencia_input.datetimepicker(this.get_DateTimePickerConfig())
   this.$id_vigencia.mask(
        "9999-99-99",
        {
            placeholder:"aaaa/mm/dd"
        }
    )
   this.$id_descripcion.wysihtml5(this.get_ConfWysi())

}
TarjetaFiltros.prototype.get_ConfWysi = function () {
    return {
        toolbar: {
            "font-styles": true,
            "emphasis": true,
            "lists": true,
            "html": false,
            "link": false,
            "image": false,
            "color": false,
            "blockquote": false,
        }
    }
}
TarjetaFiltros.prototype.get_DateTimePickerConfig = function () {
    return {
        autoclose: true,
        orientation: "bottom left",
        minViewMode: 2,
        format: "yyyy-mm-dd",
    }
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
                  {  id_proceso: 1, revision: "01", vigencia: "01-03-2017", codigo: "FSGI-G-06-01", descripcion: "SGI - FORMATO PLAN DE AUDITORIA INTERNA"},
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
         { field: "revision", title: "No. de revision", width:"20%"},
         { field: "vigencia", title: "Vigencia a partir de", width:"20%"},
         { field: "codigo", title: "Codigo", width:"20%"},
         { field: "descripcion", title: "Descripcion", width:"20%"},
         { command:[
            {  name:"edit", text:{edit:"Editar", update:"Actualizar", cancel:"Cancelar"}}, 
            {  name:"destroy", text:"Eliminar"},
            {  name:"nuevo", text:"Nuevo", click: function(e){
                  e.preventDefault();
                  $('#tarjeta_nuevo_subproceso').modal('show')
               }
            }
         ]},
      ],
      editable: "inline",
      scrollable: true,
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