/*-----------------------------------------------*\
         GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:
//var url_seguimiento_bypage = window.location.origin + "/api-jde/viewscompras_bypage/"

// OBJS
var tarjeta_resultados = null
var popup_filtros = null
var popup_criterio = null
var popup_requisito = null
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
   popup_criterio = new PopupCriterio()
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
         OBJETO: Tarjeta criterio
\*-----------------------------------------------*/

function PopupCriterio() {
   
   this.$id_tipo_criterio = $('#id_tipo_criterio')
   this.$id_criterio = $('#id_criterio')

   this.init_Components()
}
PopupCriterio.prototype.init_Components = function () {

   this.$id_tipo_criterio.select2(appnova.get_ConfigSelect2())
}

/*-----------------------------------------------*\
         OBJETO: Arbol
\*-----------------------------------------------*/

function Arbol() {

   popup_requisito = new PopupRequisito()

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
      {  text: "ISO 9001:2008",
         state: {
               expanded: false,
         },
         tags: [
            '<a href="#eliminar" data-toggle="modal" id="boton_nuevo"><i class="icon mdi mdi-delete nova-black nova-icon-lista"></i></a>',
            '<a href="#id_tarjeta_nuevo_criterio" data-toggle="modal" id="boton_nuevo"><i class="icon mdi mdi-edit nova-black nova-icon-lista"></i></a>',
            '<a href="#id_tarjeta_nuevo_requisito" data-toggle="modal" id="boton_nuevo"><i class="icon mdi mdi-plus-circle nova-black nova-icon-lista"></i></a>',

         ],
         nodes: [
            {  text: "14.2.- Seguimiento de documentos datos datos datos",
               tags: [
                  '<a href="#eliminar" data-toggle="modal" id="boton_nuevo"><i class="icon mdi mdi-delete nova-black nova-icon-lista"></i></a>',
                  '<a href="#id_tarjeta_nuevo_requisito" data-toggle="modal" id="boton_nuevo"><i class="icon mdi mdi-edit nova-black nova-icon-lista"></i></a>',
               ]
            },
            {  text: "10.1.- Recarga de extintores",
               tags: [
                  '<a href="#eliminar" data-toggle="modal" id="boton_nuevo"><i class="icon mdi mdi-delete nova-black nova-icon-lista"></i></a>',
                  '<a href="#id_tarjeta_nuevo_requisito" data-toggle="modal" id="boton_nuevo"><i class="icon mdi mdi-edit nova-black nova-icon-lista"></i></a>',
               ]
            },
            {  text: "9.5.- Inspeccion de seguridad",
               tags: [
                     '<a href="#eliminar" data-toggle="modal" id="boton_nuevo"><i class="icon mdi mdi-delete nova-black nova-icon-lista"></i></a>',
                     '<a href="#id_tarjeta_nuevo_requisito" data-toggle="modal" id="boton_nuevo"><i class="icon mdi mdi-edit nova-black nova-icon-lista"></i></a>',
                  ]
            }
         ]
      },
      {  text: "ISO 14001:2004",
         state: {
                  expanded: false,
         },
         tags: [
            '<a href="#eliminar" data-toggle="modal" id="boton_nuevo"><i class="icon mdi mdi-delete nova-black nova-icon-lista"></i></a>',
            '<a href="#id_tarjeta_nuevo_criterio" data-toggle="modal" id="boton_nuevo"><i class="icon mdi mdi-edit nova-black nova-icon-lista"></i></a>',
            '<a href="#id_tarjeta_nuevo_requisito" data-toggle="modal" id="boton_nuevo"><i class="icon mdi mdi-plus-circle nova-black nova-icon-lista"></i></a>',

         ],
         nodes: [
            {  text: "14.2.- Seguimiento de documentos",
               tags: [
                     '<a href="#eliminar" data-toggle="modal" id="boton_nuevo"><i class="icon mdi mdi-delete nova-black nova-icon-lista"></i></a>',
                     '<a href="#id_tarjeta_nuevo_requisito" data-toggle="modal" id="boton_nuevo"><i class="icon mdi mdi-edit nova-black nova-icon-lista"></i></a>',
                  ]
            },
            {  text: "10.1.- Recarga de extintores",
               tags: [
                     '<a href="#eliminar" data-toggle="modal" id="boton_nuevo"><i class="icon mdi mdi-delete nova-black nova-icon-lista"></i></a>',
                     '<a href="#id_tarjeta_nuevo_requisito" data-toggle="modal" id="boton_nuevo"><i class="icon mdi mdi-edit nova-black nova-icon-lista"></i></a>',
                  ]
            },
            {  text: "9.5.- Inspeccion de seguridad",
               tags: [
                     '<a href="#eliminar" data-toggle="modal" id="boton_nuevo"><i class="icon mdi mdi-delete nova-black nova-icon-lista"></i></a>',
                     '<a href="#id_tarjeta_nuevo_requisito" data-toggle="modal" id="boton_nuevo"><i class="icon mdi mdi-edit nova-black nova-icon-lista"></i></a>',
                  ]
            }
         ]
      },
      {  text: "OHSAS 18001:2007",
         state: {
                  expanded: false,
         },
         tags: [
            '<a href="#eliminar" data-toggle="modal" id="boton_nuevo"><i class="icon mdi mdi-delete nova-black nova-icon-lista"></i></a>',
            '<a href="#id_tarjeta_nuevo_criterio" data-toggle="modal" id="boton_nuevo"><i class="icon mdi mdi-edit nova-black nova-icon-lista"></i></a>',
            '<a href="#id_tarjeta_nuevo_requisito" data-toggle="modal" id="boton_nuevo"><i class="icon mdi mdi-plus-circle nova-black nova-icon-lista"></i></a>',

         ],
         nodes: [
            {  text: "14.2.- Seguimiento de documentos",
               tags: [
                     '<a href="#eliminar" data-toggle="modal" id="boton_nuevo"><i class="icon mdi mdi-delete nova-black nova-icon-lista"></i></a>',
                     '<a href="#id_tarjeta_nuevo_requisito" data-toggle="modal" id="boton_nuevo"><i class="icon mdi mdi-edit nova-black nova-icon-lista"></i></a>',
                  ]
            },
            {  text: "10.1.- Recarga de extintores",
               tags: [
                     '<a href="#eliminar" data-toggle="modal" id="boton_nuevo"><i class="icon mdi mdi-delete nova-black nova-icon-lista"></i></a>',
                     '<a href="#id_tarjeta_nuevo_requisito" data-toggle="modal" id="boton_nuevo"><i class="icon mdi mdi-edit nova-black nova-icon-lista"></i></a>',
                  ]
            },
            {  text: "9.5.- Inspeccion de seguridad",
               tags: [
                     '<a href="#eliminar" data-toggle="modal" id="boton_nuevo"><i class="icon mdi mdi-delete nova-black nova-icon-lista"></i></a>',
                     '<a href="#id_tarjeta_nuevo_requisito" data-toggle="modal" id="boton_nuevo"><i class="icon mdi mdi-edit nova-black nova-icon-lista"></i></a>',
                  ]
            }
         ]
      },

   ]
}

/*-----------------------------------------------*\
         OBJETO: Popup Requisito
\*-----------------------------------------------*/

function PopupRequisito() {

   this.$id_requisito = $('#id_requisito')
   this.$id_boton_guardar_nuevo_requisito = $('#id_boton_guardar_nuevo_requisito')
}