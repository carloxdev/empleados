/*-----------------------------------------------*\
             GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:
//var url_seguimiento_bypage = window.location.origin + "/api-jde/viewscompras_bypage/"

// OBJS
var formulario = null
var tarjeta_resultados = null
var tarjeta_detalles = null
var toolbar = null
var grid = null


/*-----------------------------------------------*\
             LOAD
\*-----------------------------------------------*/

$(document).ready(function () {
    
    formulario = new Formulario()
    tarjeta_resultados = new TarjetaResultados()
})

/*-----------------------------------------------*\
             OBJETO: Tarjeta filtros
\*-----------------------------------------------*/
function Formulario() {

    this.$id_proceso_select = $('#id_proceso_select')
    this.$id_subproceso = $('#id_subproceso')
    this.$id_responsable = $('#id_responsable')
    this.$boton_buscar = $('#boton_buscar')
    this.$boton_limpiar = $('#boton_limpiar')
    this.init_Components()
    this.init_Events()
}
Formulario.prototype.init_Components = function () {

    this.$id_proceso_select.select2(this.get_ConfSelect2Tag())
    this.$id_subproceso.select2(this.get_ConfSelect2Tag())
    this.$id_responsable.multiSelect(this.get_ConfMultiselect())
}
Formulario.prototype.get_ConfSelect2Tag = function () {

    return {
         tags: true,
         width: '100%'
    }
}
Formulario.prototype.get_ConfMultiselect = function () {
      
      return {
            selectableHeader: "<input type='text' class='form-control search-input' autocomplete='off' placeholder='Búscar en EBS'>",
            selectionHeader: "<input type='text' class='form-control search-input' autocomplete='off' placeholder='Búscar'>",
            afterInit: function(ms){
                  var that = this,
                        $selectableSearch = that.$selectableUl.prev(),
                        $selectionSearch = that.$selectionUl.prev(),
                        selectableSearchString = '#'+that.$container.attr('id')+' .ms-elem-selectable:not(.ms-selected)',
                        selectionSearchString = '#'+that.$container.attr('id')+' .ms-elem-selection.ms-selected'

                  that.qs1 = $selectableSearch.quicksearch(selectableSearchString)
                  .on('keydown', function(e){
                        if (e.which === 40){
                              that.$selectableUl.focus()
                              return false
                        }
                  })

                  that.qs2 = $selectionSearch.quicksearch(selectionSearchString)
                  .on('keydown', function(e){
                        if (e.which == 40){
                              that.$selectionUl.focus()
                              return false
                        }
                  })
            },
            afterSelect: function(){
                  this.qs1.cache()
                  this.qs2.cache()
               },
            afterDeselect: function(){
                  this.qs1.cache()
                  this.qs2.cache()
               }
      }
}
Formulario.prototype.init_Events = function () {

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
                           {  id_proceso: 1, proceso: "Tecnologias de la informacion"},
                           {  id_proceso: 2, proceso: "Licitaciones"}
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
             {  field: "proceso", title: "Procesos", width:"73%"},
             {  command: [ 
                  {  name:"edit", text:{edit:"Editar"}, click: function(e){
                      e.preventDefault();
                           $('#tarjeta_nuevo_proceso').modal('show')
                      }
                  },
                  {  name:"destroy", text:"Eliminar"  },
                  {  name:"nuevo", text:"Nuevo",  click: function(e){
                      e.preventDefault();
                           $('#tarjeta_nuevo_subproceso').modal('show')
                      }}
                  ]},
         ],
         scrollable: true,
         pageable: true,
         noRecords: {
             template: "<div class='grid-empy'> No se encontraron registros </div>"
         },
         detailInit: detailInit,
         
    }
    function detailInit(e) {
                              $("<div/>").appendTo(e.detailCell).kendoGrid({
                                    dataSource: { 
                                        serverPaging: true,
                                        pageZize: 10,
                                        data: [
                                                      { id_area: 1, area: "Infraestructura", id_proceso: 1 },
                                                      { id_area: 2, area: "Licitaciones", id_proceso: 2 }
                                                 ],
                                        
                                        schema: {
                                             total: function(response) {
                                                 return $(response.data).length;
                                             },
                                        },
                                        filter:  { field: "id_proceso", operator: "eq", value: e.data.id_proceso },

                                    },
                                    scrollable: false,
                                    sortable: true,
                                    pageable: true,
                                    columns: [
                                        {  field: "area", title:"Subprocesos", width: "75%" },
                                        {  command:[
                                             {  name:"edit", text:{edit:"Editar", update:"Actualizar", cancel:"Cancelar"}  },
                                             {  name:"destroy", text:"Eliminar"  },
                                             ]
                                        },
                                    ],
                                    editable: "inline",
                              });
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