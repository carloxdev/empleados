/*-----------------------------------------------*\
         GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:api-
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
   this.$id_boton_nuevo_requisito = $('#id_boton_nuevo_requisito')
   this.init_Events()
}
ToolBar.prototype.init_Events = function () {

   this.$id_boton_nuevo_requisito.on("click", this, this.click_BotonNuevo)
}
ToolBar.prototype.click_BotonNuevo = function (e) {

   popup_requisito.mostrar(0, "nuevo")
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
   this.$id.on('click', '[data-event=\'editarRequisito\']', this.click_EditarRequisito)
   this.$id.on('click', '[data-event=\'eliminarRequisito\']', this.click_EliminarRequisito)
}
Grid.prototype.click_FilaGrid = function (e) {

   $(this).addClass('nova-active-row').siblings().removeClass('nova-active-row')
}
Grid.prototype.click_EditarRequisito = function (e) {

   pk = this.getAttribute("data-primaryKey")
   popup_requisito.mostrar( pk, "editar")
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
   this.$id_criterio = $('#id_criterio')
   this.$id_requisito = $('#id_requisito')
   this.$id_actual_user = $('#id_actual_user')
   this.$id_boton_guardar = $('#id_boton_guardar')
   this.$id_titulo = $('#id_popup_requisito_titulo')
   this.$accion
   this.$pk_requisito
   this.$pk_pro = $('#id_pk_pro')
   this.$id_requisito_existe = $('#id_requisito_existe')

   this.init_Components()
   this.init_Events()
   this.init_ErrorEvents()
}
PopupRequisito.prototype.init_Components = function () {

   this.$id_criterio.select2(appnova.get_ConfigSelect2())
   this.$id_requisito.select2(appnova.get_ConfigSelect2())
}
PopupRequisito.prototype.init_Events = function () {

   this.$id_criterio.on("change", this, this.change_SelectCriterio)
   this.$id_boton_guardar.on("click", this, this.click_BotonGuardar)
   this.$id.on("shown.bs.modal", this, this.shown_Modal)
   this.$id.on("hide.bs.modal", this, this.hide_Modal)
}
PopupRequisito.prototype.init_ErrorEvents = function () {

   if (this.$id_requisito_existe.val()) {
      alertify.warning(this.$id_requisito_existe.val())
   }
}
PopupRequisito.prototype.change_SelectCriterio = function (e) {

   e.data.set_Requisitos(e)
}
PopupRequisito.prototype.set_Requisitos = function (e) {

   $.ajax({

       url: url_requisitos,
       method: "GET",
       context: this,
       data: {

         "criterio_id" : e.data.$id_criterio.val()
       },
       success: function (_response) {

          var data = []
          for (var i = 0; i < _response.length; i++) {
            data.push({id:_response[i].pk, text:_response[i].requisito })
          }

          this.$id_requisito.select2('destroy').empty().select2({data:data})
          this.$id_requisito.val(this.$pk_requisito).trigger("change")
       },
       error: function (_response) {

          alertify.error("Ocurrio error al cargar datos")
       }
    })
}
PopupRequisito.prototype.shown_Modal = function (e) {

   e.data.$id_criterio.focus()
}
PopupRequisito.prototype.hide_Modal = function (e) {

   e.data.$pk_requisito = undefined
   e.data.$id_criterio.val("0").trigger("change")
   e.data.$id_requisito.select2('destroy').empty().select2({data:[{}]})
   e.data.$id_requisito.val("").trigger("change")
}
PopupRequisito.prototype.mostrar = function (_pk, _accion) {

   this.$id.modal("show").attr("data-primaryKey", _pk)
   this.$accion = _accion

   if (_accion == "nuevo") {

      this.$id_titulo.text('Nuevo Requisito')
   }
   else if (_accion == "editar") {

      this.$id_titulo.text('Editar Requisito')
      this.set_Data(_pk)
   }
}
PopupRequisito.prototype.set_Data = function (_pk) {

   $.ajax({

      url: url_requisitos_proceso + _pk +"/",
      method: "GET",
      context: this,
      success: function (_response) {

         this.$pk_requisito = _response.requisito_id
         this.$id_criterio.val(_response.criterio_id).trigger("change")
      },
      error: function (_response) {

         alertify.error("Ocurrio error al cargar datos")
      }
   })
}
PopupRequisito.prototype.click_BotonGuardar = function (e) {


   if (e.data.$accion == "editar") {

      e.preventDefault()
      var pk = e.data.$id.attr("data-primarykey")
      e.data.editar(pk)
   }
}
PopupRequisito.prototype.editar = function (_pk) {

   $.ajax({

      url: url_requisitos_proceso + _pk + "/",
      method: "PUT",
      context: this,
      headers: { "X-CSRFToken": appnova.galletita },
      data: {
         "proceso_auditoria": url_proceso_auditoria + this.$pk_pro.val() + "/",
         "requisito": url_requisitos + this.$id_requisito.val() + "/",
         "update_by": url_profile + this.$id_actual_user.val() + "/",
      },
      success: function (_response) {

         this.$id.modal('hide')
         window.location.href = window.location.href
      },
      error: function (_response) {
         if (_response.responseJSON.non_field_errors.length) {
            alertify.warning("Este requisito ya existe para el proceso.")
         }
         else {
            alertify.error("Ocurrio error al modificar Requisito")
         }
      }
   })
}
