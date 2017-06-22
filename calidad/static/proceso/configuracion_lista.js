/*-----------------------------------------------*\
         GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:
//var url_seguimiento_bypage = window.location.origin + "/api-jde/viewscompras_bypage/"

// OBJS
var tarjeta_resultados = null
var popup_proceso = null
var popup_subproceso = null
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
   this.arbol = new Arbol()
}

/*-----------------------------------------------*\
         OBJETO: ToolBar
\*-----------------------------------------------*/

function ToolBar() {

   popup_proceso = new PopupProceso()
   this.init()
}
ToolBar.prototype.init = function () {

}

/*-----------------------------------------------*\
         OBJETO: Tarjeta proceso
\*-----------------------------------------------*/

function PopupProceso() {
   
   this.$id_proceso = $('#id_proceso')
   this.$id_responsable = $('#id_responsable')

   this.init_Components()
}
PopupProceso.prototype.init_Components = function () {

   this.$id_responsable.multiSelect(this.get_ConfMultiselect())
}
PopupProceso.prototype.get_ConfMultiselect = function () {
      
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

/*-----------------------------------------------*\
         OBJETO: Arbol
\*-----------------------------------------------*/

function Arbol() {

   popup_subproceso = new PopupSubproceso()

   this.$id_arbol_criterios_requisitos = $("#id_arbol_criterios_requisitos")
   this.init_Components()
}
Arbol.prototype.init_Components = function () {

   this.$id_arbol_criterios_requisitos.treeview(
      {  data: this.get_Arbol(),
         showTags: true,
      }
   )
}
Arbol.prototype.get_Arbol = function () {

   return [
      {  text: "Tecnologías de información",
         state: {
               expanded: false,
         },
         tags: [
            '<a href="#eliminar" data-toggle="modal" id="boton_nuevo"><i class="icon mdi mdi-delete nova-black nova-icon-lista"></i></a>',
            '<a href="#id_tarjeta_nuevo_proceso" data-toggle="modal" id="boton_nuevo"><i class="icon mdi mdi-edit nova-black nova-icon-lista"></i></a>',
            '<a href="#id_tarjeta_nuevo_subproceso" data-toggle="modal" id="boton_nuevo"><i class="icon mdi mdi-plus-circle nova-black nova-icon-lista"></i></a>',

         ],
         nodes: [
            {  text: "Infraestructura",
               tags: [
                  '<a href="#eliminar" data-toggle="modal" id="boton_nuevo"><i class="icon mdi mdi-delete nova-black nova-icon-lista"></i></a>',
                  '<a href="#id_tarjeta_nuevo_subproceso" data-toggle="modal" id="boton_nuevo"><i class="icon mdi mdi-edit nova-black nova-icon-lista"></i></a>',
               ]
            },
         ]
      },
      {  text: "Licitaciones",
         state: {
                  expanded: false,
         },
         tags: [
            '<a href="#eliminar" data-toggle="modal" id="boton_nuevo"><i class="icon mdi mdi-delete nova-black nova-icon-lista"></i></a>',
            '<a href="#id_tarjeta_nuevo_proceso" data-toggle="modal" id="boton_nuevo"><i class="icon mdi mdi-edit nova-black nova-icon-lista"></i></a>',
            '<a href="#id_tarjeta_nuevo_subproceso" data-toggle="modal" id="boton_nuevo"><i class="icon mdi mdi-plus-circle nova-black nova-icon-lista"></i></a>',

         ],
         nodes: [
            {  text: "Licitaciones",
               tags: [
                     '<a href="#eliminar" data-toggle="modal" id="boton_nuevo"><i class="icon mdi mdi-delete nova-black nova-icon-lista"></i></a>',
                     '<a href="#id_tarjeta_nuevo_subproceso" data-toggle="modal" id="boton_nuevo"><i class="icon mdi mdi-edit nova-black nova-icon-lista"></i></a>',
                  ]
            },
         ]
      },
   ]
}

/*-----------------------------------------------*\
         OBJETO: Popup Subproceso
\*-----------------------------------------------*/

function PopupSubproceso() {

   this.$id_boton_guardar_nuevo_requisito = $('#id_boton_guardar_nuevo_requisito')
}
