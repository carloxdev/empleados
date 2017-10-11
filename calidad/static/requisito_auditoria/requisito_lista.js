/*-----------------------------------------------*\
         GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:
var url_requisitos = window.location.origin + "/api-calidad/requisito/"
var url_requisitos_proceso = window.location.origin + "/api-calidad/requisitoproceso/"
var url_profile = window.location.origin + "/api-seguridad/profile/"
var url_proceso_auditoria =  window.location.origin + "/api-calidad/procesoauditoria/"

// OBJS
var popup_requisito = null
var tarjeta_resultados = null
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
function TarjetaResultados () {

   this.toolbar = new ToolBar()
   this.grid = new Grid()
}

/*-----------------------------------------------*\
         OBJETO: ToolBar
\*-----------------------------------------------*/

function ToolBar () {

   popup_requisito = new PopupRequisito()
   this.$id_boton_requisito = $('#id_boton_requisito')
   this.init_Events()
}
ToolBar.prototype.init_Events = function () {

   this.$id_boton_requisito.on("click", this, this.click_BotonRequisito)
}
ToolBar.prototype.click_BotonRequisito = function (e) {

   popup_requisito.mostrar()
}

/*-----------------------------------------------*\
         OBJETO: Grid
\*-----------------------------------------------*/

function Grid () {

   this.$id = $('#id_grid_requisito')
   this.init_Events()
}
Grid.prototype.init_Events = function () {

   this.$id.on("click", '.clickable-row', this.click_FilaGrid)
   this.$id.on('click', '[data-event=\'eliminarRequisito\']', this.click_EliminarRequisito)
}
Grid.prototype.click_FilaGrid = function (e) {

   $(this).addClass('nova-active-row').siblings().removeClass('nova-active-row')
}
Grid.prototype.click_EliminarRequisito = function (e) {

   pk = this.getAttribute("data-primaryKey")
   url = url_requisitos_proceso + pk + "/"
   tarjeta_resultados.grid.eliminar_Seleccion(url)
}
Grid.prototype.eliminar_Seleccion = function (_url) {

   alertify.confirm(
      'Eliminar Registro',
      '¿Desea Eliminar este registro?',
      function (e) {

         $.ajax({
            url: _url,
            method: "DELETE",
            headers: { "X-CSRFToken": appnova.galletita },
            success: function () {

               window.location.href = window.location.href
               alertify.success("Se eliminó registro correctamente")
            },
            error: function () {

               alertify.error("Ocurrió un error al eliminar")
            }
         })
      },
      null
   )
}

/*-----------------------------------------------*\
         OBJETO: popup nuevo
\*-----------------------------------------------*/

function PopupRequisito() {

   this.$id = $('#id_tarjeta_requisito')
   this.$id_requisito = $('#id_requisito')
   this.$pk_pro = $('#id_pk_pro')
   this.$id_requisito_existe = $('#id_requisito_existe')

   this.init_Components()
   this.init_Events()
   this.init_ErrorEvents()
}
PopupRequisito.prototype.init_Components = function () {

   this.$id_requisito.multiselect(this.get_ConfMultiSelect())
   this.$id_requisito.siblings("div.btn-group").find("ul.multiselect-container").addClass('nova-bootstrap-multiselect-width-ul')
   this.get_Requisitos()
}
PopupRequisito.prototype.get_ConfMultiSelect = function () {

   return {

      enableFiltering: true,
      buttonWidth: '100%',
      numberDisplayed: 2,
      maxHeight: 150,
      nonSelectedText: "Sin Selección",
      allSelectedText: "Todo Seleccionado",
      nSelectedText: "Seleccionados",
      filterPlaceholder: "Buscar",
      disableIfEmpty: true,
   }
}
PopupRequisito.prototype.get_Requisitos = function () {

   $.ajax({

      url: url_requisitos_proceso,
      method: "GET",
      context: this,
      data: {
         'proceso_auditoria_id': this.$pk_pro.val(),
      },
      success: function (_response) {

         if (_response) {

            requisito_selected=[]
            for (var i = 0; i < _response.length; i++) {
               requisito_selected.push(_response[i].requisito_id)
            }
            this.$id_requisito.multiselect('select', requisito_selected)
         }
      },
      error: function (_response) {

         alertify.error("Ocurrio error al cargar datos")
      }
   })
}

PopupRequisito.prototype.init_ErrorEvents = function () {

   if (this.$id_requisito_existe.val()) {
      alertify.warning(this.$id_requisito_existe.val())
   }
}
PopupRequisito.prototype.mostrar = function () {

   this.$id.modal("show")
}
