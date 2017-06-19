/*-----------------------------------------------*\
         GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:
//var url_seguimiento_bypage = window.location.origin + "/api-jde/viewscompras_bypage/"

// OBJS
var tarjeta_resultados = null
var popup_filtros = null
var popup_norma_requisito = null
var popup_requisito = null
var popup_accion_norma = null
var popup_accion_requisito = null
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

   popup_filtros = new PopupFiltros()
   popup_norma_requisito = new PopupNormaRequisito()
   this.init()
}
ToolBar.prototype.init = function () {

}

/*-----------------------------------------------*\
         OBJETO: Tarjeta filtros
\*-----------------------------------------------*/

function PopupFiltros() {
   
   this.$id_requisito_filtro = $('#id_requisito_filtro')
   this.$boton_buscar = $('#boton_buscar')
   this.$boton_limpiar = $('#boton_limpiar')

   this.init_Events()
}
PopupFiltros.prototype.init_Events = function () {

   this.$boton_buscar.on("click", this, this.click_BotonBuscar)
   this.$boton_limpiar.on("click", this, this.click_BotonLimpiar)
}

/*-----------------------------------------------*\
         OBJETO: Tarjeta norma requisitos
\*-----------------------------------------------*/

function PopupNormaRequisito() {
   
   this.$id_tipo_proceso_soporte = $('#id_tipo_proceso_soporte')
   this.$id_requisito = $('#id_requisito')

   this.init_Components()
}
PopupNormaRequisito.prototype.init_Components = function () {

   this.$id_tipo_proceso_soporte.select2(appnova.get_ConfigSelect2())
   this.$id_requisito.select2(this.get_ConfSelectTag2())
}
PopupNormaRequisito.prototype.get_ConfSelectTag2 = function () {

   return {
      tags: true,
      width: '100%'
   }
}

/*-----------------------------------------------*\
         OBJETO: Arbol
\*-----------------------------------------------*/

function Arbol() {

   popup_requisito = new PopupRequisito()
   popup_accion_norma = new PopupAccionNorma()
   popup_accion_requisito = new PopupAccionRequisito()

   this.$id_arbol_criterios_requisitos = $("#id_arbol_criterios_requisitos")
   this.init_Components()
}
Arbol.prototype.init_Components = function () {

   this.$id_arbol_criterios_requisitos.nestable()
}



function Grid() {

   popup_requisito = new PopupRequisito()
   popup_accion_norma = new PopupAccionNorma()
   popup_accion_requisito = new PopupAccionRequisito()

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
                  {  id_cat_proceso_soporte: "C-PROS-01", proceso: "ISO 9001:2008"},
                  {  id_cat_proceso_soporte: "C-PROS-02", proceso: "ISO 14001:2004"},
                  {  id_cat_proceso_soporte: "C-PROS-03", proceso: "OHSAS 18001:2007"}
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
         {  template: '<a href="\\#id_tarjeta_accion_norma" data-toggle="modal" class="btn nova-btn btn-default" id="boton_nuevo"> <i class="icon icon-left icon mdi mdi-settings nova-black"></i></a>',
            width: '38px'
         },
         {  field: "id_cat_proceso_soporte",
            title: "Folio",
            width:"108px",
            template: '<a class="btn btn-default nova-url" data-toggle="modal" href="\\#id_tarjeta_nueva_norma">#=id_cat_proceso_soporte#</a>'
         },
         {  field: "proceso", title: "Proceso de soporte", width:"63%"},
      ],
      editable: "inline",
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
                                    { id_cat_requisito: "C-REQ-01", area: "14.2.- Seguimiento de documentos de seguridad", id_cat_proceso_soporte: "C-PROS-01" },
                                    { id_cat_requisito: "C-REQ-02", area: "10.1.- Recarga de extintores", id_cat_proceso_soporte: "C-PROS-02" },
                                    { id_cat_requisito: "C-REQ-03", area: "9.5.- Inspeccion de seguridad para los equipos de mantenimiento", id_cat_proceso_soporte: "C-PROS-01" },
                                    { id_cat_requisito: "C-REQ-04", area: "1.3.- Campaña de vacunacion anual", id_cat_proceso_soporte: "C-PROS-03" }
                                 ],
                           
                           schema: {
                              total: function(response) {
                                 return $(response.data).length;
                              },
                           },
                           filter:  { field: "id_cat_proceso_soporte", operator: "eq", value: e.data.id_cat_proceso_soporte },

                        },
                        scrollable: false,
                        sortable: true,
                        pageable: true,
                        columns: [
                           {  template: '<a href="\\#id_tarjeta_accion_requisito" data-toggle="modal" class="btn nova-btn btn-default" id="boton_nuevo"> <i class="icon icon-left icon mdi mdi-settings nova-black"></i></a>',
                              width: '74px' 
                           },
                           {  field: "id_cat_requisito",
                              title:"Folio",
                              width: "110px",
                              template: '<a class="btn btn-default nova-url" data-toggle="modal" href="\\#id_tarjeta_nuevo_requisito">#=id_cat_requisito#</a>'
                           },
                           {  field: "area", title:"Requisito", width: "65%" },
                        ]
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

/*-----------------------------------------------*\
         OBJETO: Tarjeta requisito
\*-----------------------------------------------*/

function PopupRequisito() {
   
   this.$id_proceso_soporte = $('#id_proceso_soporte')
   this.$id_requisito_proceso_soporte = $('#id_requisito_proceso_soporte')
   this.init_Components()
}
PopupRequisito.prototype.init_Components = function () {

   this.$id_proceso_soporte.select2(appnova.get_ConfigSelect2())
}

/*-----------------------------------------------*\
         OBJETO: Tarjeta Accion norma
\*-----------------------------------------------*/

function PopupAccionNorma () {

   this.$id_tarjeta_accion_norma = $('#id_tarjeta_accion_norma')
   this.$id_boton_nuevo_accion_norma = $('#id_boton_nuevo_accion_norma')
   this.$id_boton_eliminar_norma = $('#id_boton_eliminar_norma')
   this.init_Events()
}
PopupAccionNorma.prototype.init_Events = function () {

   this.$id_boton_nuevo_accion_norma.on("click", this, this.click_BotonNuevoAccionesNorma)
   this.$id_boton_eliminar_norma.on("click", this, this.click_BotonEliminarNorma)
}
PopupAccionNorma.prototype.click_BotonNuevoAccionesNorma = function (e) {
   
   e.data.$id_tarjeta_accion_norma.modal('hide')
}

/*-----------------------------------------------*\
         OBJETO: Tarjeta accion requsito
\*-----------------------------------------------*/

function PopupAccionRequisito () {
   this.$id_boton_eliminar_requisito = $('#id_boton_eliminar_requisito')
   this.init_Events()
}
PopupAccionRequisito.prototype.init_Events = function () {

   this.$id_boton_eliminar_requisito.on("click", this, this.click_BotonEliminarRequisito)
   
}