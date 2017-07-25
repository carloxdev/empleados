/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:api-
var url_api_formato = window.location.origin + "/api-calidad/formato/"
var url_formato = window.location.origin + "/configuracion/formatos/"

// OBJS
var popup_formato = null
var tarjeta_resultados = null

/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {
      
   tarjeta_resultados = new TarjetaResultados()
})

/*-----------------------------------------------*\
            OBJETO: Tarjeta resultados
\*-----------------------------------------------*/

function TarjetaResultados() {
   
   this.toolbar = new ToolBar()
   this.grid = new Grid()
}

/*-----------------------------------------------*\
            OBJETO: toolbar
\*-----------------------------------------------*/

function ToolBar() {
   
   popup_formato = new PopupFormato()
   this.$id_boton_nuevo_formato = $('#id_boton_nuevo_formato')
   this.init_Events()
}
ToolBar.prototype.init_Events = function () {

   this.$id_boton_nuevo_formato.on("click", this, this.click_BotonNuevoFormato)
}
ToolBar.prototype.click_BotonNuevoFormato =  function (e) {

   popup_formato.mostrar(0, "nuevo")
}

/*-----------------------------------------------*\
            OBJETO: grid
\*-----------------------------------------------*/

function Grid() {

   this.$id = $('#id_grid_formato')
   this.init_Events()
}
Grid.prototype.init_Events = function () {

   this.$id.on("click", '.clickable-row', this.click_FilaGrid)
   this.$id.on('click', '[data-event=\'editarFormato\']', this.click_EditarFormato)
   this.$id.on('click', '[data-event=\'eliminarFormato\']', this.click_EliminarFormato)
}
Grid.prototype.click_EditarFormato = function (e){

   e.preventDefault()
   pk = this.getAttribute("data-id")
   popup_formato.mostrar( pk, "editar")
}
Grid.prototype.click_EliminarFormato = function (e) {

   e.preventDefault()
   pk = this.getAttribute("data-id")
   url = url_api_formato + pk + "/"
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

               window.location.href = url_formato
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
Grid.prototype.click_FilaGrid = function (e) {

   $(this).addClass('nova-active-row').siblings().removeClass('nova-active-row')
}

/*-----------------------------------------------*\
            OBJETO: popup formato
\*-----------------------------------------------*/

function PopupFormato(){

   this.$id = $('#id_tarjeta_formato')
   this.$id_compania = $('#id_compania')
   this.$id_no_revision = $('#id_no_revision')
   this.$id_titulo = $('#id_titulo')
   this.$id_vigencia_group = $('#id_vigencia_group')
   this.$id_vigencia = $('#id_vigencia')
   this.$id_codigo = $('#id_codigo')
   this.$id_descripcion = $('#id_descripcion')
   this.$id_boton_guardar = $('#id_boton_guardar')
   this.$id_popup_titulo = $('#id_popup_formato_titulo')
   this.$id_formulario = $('#id_formulario_formato')
   this.$accion
   this.init_Components()
   this.init_Events()
}
PopupFormato.prototype.init_Components = function () {

   this.$id_compania.select2(appnova.get_ConfigSelect2())
   this.$id_vigencia_group.datetimepicker(this.get_DateTimePickerConfig())
   this.$id_vigencia.mask(
            "9999-99-99",
            {
                  placeholder:"aaaa/mm/dd"
            }
         )
}
PopupFormato.prototype.get_DateTimePickerConfig = function () {
      
   return {

      autoclose: true,
      orientation: "bottom left",
      minViewMode: 2,
      format: "yyyy-mm-dd",
   }
}
PopupFormato.prototype.init_Events = function () {

   this.$id_boton_guardar.on("click", this, this.click_BotonGuardar)
   this.$id.on('hidden.bs.modal', this, this.hidden_Modal)
}
PopupFormato.prototype.click_BotonGuardar = function (e) {

   e.data.clear_Estilos(e)

   if (e.data.validar()) {

      if (e.data.$accion == "nuevo") {

         e.data.crear(e)
      }
      else if (e.data.$accion == "editar") {

         var pk = e.data.$id.attr("data-primarykey")
         e.data.editar(e, pk)
      }
   }
}
PopupFormato.prototype.mostrar = function (_id, _accion) {

   this.$id.modal('show').attr("data-primaryKey", _id)
   this.$accion = _accion

   if (_accion == "nuevo") {

      this.$id_popup_titulo.text('Nuevo Formato')
   }
   else if (_accion == "editar") {

      this.$id_popup_titulo.text('Editar Formato')
      this.set_Data(_id)
   }
}
PopupFormato.prototype.set_Data = function (_pk) {
   
      $.ajax({

         url: url_api_formato + _pk +"/",
         method: "GET",
         context: this,
         success: function (_response) {
            
            this.$id_compania.val(_response.compania_codigo + ":" + _response.compania).trigger("change")
            this.$id_titulo.val(_response.titulo)
            this.$id_no_revision.val(_response.no_revision)
            this.$id_vigencia.val(_response.vigencia_inicio)
            this.$id_codigo.val(_response.codigo)
            this.$id_descripcion.val(_response.descripcion)
         },
         error: function (_response) {

            alertify.error("Ocurrio error al cargar datos")
         }
      })
}
PopupFormato.prototype.validar = function () {

   var bandera = true

   if ( this.$id_compania.val() == "") {

      this.$id_compania.data('select2').$selection.addClass("nova-has-error")
      bandera = false
   }

   if ( appnova.validar_EspaciosSaltos(this.$id_titulo.val()) == "") {

      this.$id_titulo.addClass("nova-has-error")
      bandera = false
   }

   if ( this.$id_no_revision.val() == "") {

      this.$id_no_revision.addClass("nova-has-error")
      bandera = false
   }

   if ( this.$id_vigencia.val() == "") {

      this.$id_vigencia.addClass("nova-has-error")
      bandera = false
   }

   if ( appnova.validar_EspaciosSaltos(this.$id_codigo.val()) == "") {

      this.$id_codigo.addClass("nova-has-error")
      bandera = false
   }

   if ( appnova.validar_EspaciosSaltos(this.$id_descripcion.val()) == "") {

      this.$id_descripcion.addClass("nova-has-error")
      bandera = false
   }

   if ( !bandera ){
      this.$id_formulario.find('.modal-body').prepend('<span id="id_mensaje_error">Completa los campos marcados en rojo.</span>')
   }

   return bandera
}
PopupFormato.prototype.hidden_Modal = function (e) {

   e.data.clear_Estilos(e)
   e.data.clear_Formulario(e)
}
PopupFormato.prototype.clear_Estilos = function (e) {

   e.data.$id_compania.data('select2').$selection.removeClass("nova-has-error")
   e.data.$id_titulo.removeClass("nova-has-error")
   e.data.$id_no_revision.removeClass("nova-has-error")
   e.data.$id_vigencia.removeClass("nova-has-error")
   e.data.$id_codigo.removeClass("nova-has-error")
   e.data.$id_descripcion.removeClass("nova-has-error")
   e.data.$id_formulario.find('#id_mensaje_error').remove()
}
PopupFormato.prototype.clear_Formulario = function (e) {

   e.data.$id_compania.val("").trigger("change")
   e.data.$id_titulo.val("")
   e.data.$id_no_revision.val("")
   e.data.$id_vigencia.val("")
   e.data.$id_codigo.val("")
   e.data.$id_descripcion.val("")
}
PopupFormato.prototype.crear = function (e) {
   
   var texto = e.data.$id_compania.val().split(':')
   var compania_codigo = texto[0]
   var compania = texto[1]

   $.ajax({

      url: url_api_formato,
      method: "POST",
      headers: { "X-CSRFToken": appnova.galletita },
      data: {

         "compania_codigo": compania_codigo,
         "compania" : compania,
         "titulo": e.data.$id_titulo.val(),
         "no_revision": e.data.$id_no_revision.val(),
         "vigencia_inicio": e.data.$id_vigencia.val(),
         "codigo": e.data.$id_codigo.val(),
         "descripcion": e.data.$id_descripcion.val(),
      },
      success: function (_response) {

         e.data.$id.modal('hide')
         window.location.href = url_formato
      },
      error: function (_response) {

         alertify.error("Ocurrio error al insertar formato")
      }
   })
}
PopupFormato.prototype.editar = function (e, _pk) {
   
   var texto = e.data.$id_compania.val().split(':')
   var compania_codigo = texto[0]
   var compania = texto[1]

   $.ajax({

      url: url_api_formato + _pk + "/",
      method: "PUT",
      headers: { "X-CSRFToken": appnova.galletita },
      data: {
         
         "compania_codigo": compania_codigo,
         "compania" : compania,
         "titulo": e.data.$id_titulo.val(),
         "no_revision": e.data.$id_no_revision.val(),
         "vigencia_inicio": e.data.$id_vigencia.val(),
         "codigo": e.data.$id_codigo.val(),
         "descripcion": e.data.$id_descripcion.val(),
      },
      success: function (_response) {

         e.data.$id.modal('hide')
         window.location.href = url_formato
      },
      error: function (_response) {

         alertify.error("Ocurrio error al modificar formato")
      }
   })
}
