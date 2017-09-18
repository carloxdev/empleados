/*-----------------------------------------------*\
         GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:
var url_hallazgo_proceso = window.location.origin + "/api-calidad/hallazgoproceso/"
var url_analisis_hallazgo = window.location.origin + "/api-calidad/analisishallazgo/"
var url_profile = window.location.origin + "/api-seguridad/profile/"
var url_archivo = window.location.origin + "/api-home/archivo/"
// var url_analisis = window.location.origin + "/api-calidad/analisishallazgo/"
var url_metodologia = window.location.origin + "/api-calidad/metodologia/"
var url_evidencia_hallazgo = window.location.origin + "/api-calidad/evidenciahallazgo/"

// OBJS
var menu = null
var tarjeta_detalle_hallazgo = null
var tarjeta_analisis = null
var tarjeta_plan_accion = null
var popup_analisis = null
var popup_actividad = null
var popup_acciones = null
var popup_evaluacion_plan = null
var popup_seguimiento_plan = null
var tarjeta_evidencia = null
var popup_evidencia = null

/*-----------------------------------------------*\
         LOAD
\*-----------------------------------------------*/

$(document).ready(function () {

   menu = new Menu()
   tarjeta_detalle_hallazgo = new TarjetaDetalleHallazgo()
   tarjeta_analisis = new TarjetaAnalisis()
   tarjeta_plan_accion = new TarjetaPlanAccion()
   tarjeta_evidencia = new TarjetaEvidencia()
})

/*-----------------------------------------------*\
         OBJETO: Menu
\*-----------------------------------------------*/

function Menu() {

   this.$elemento_lista = $('#id_lista>a[href*=\\#]')
   this.$ventana = $(window)
   this.$topPosition = $('.nova-slider-menu').offset().top - 60
   this.$menu_flotante = $('.nova-slider-menu')
   this.init_Events()
}
Menu.prototype.init_Events = function () {

   this.$elemento_lista.on("click", this, this.click_ElementoLista)
   this.$ventana.on("scroll", this, this.scroll_Ventana)
   this.$ventana.on("resize", this, this.resize_Ventana)
   this.$lista_acciones = $("#lista_acciones")
}
Menu.prototype.click_ElementoLista = function () {

   $(this).addClass('active').siblings().removeClass('active')

   if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {

      var $target = $(this.hash)

      $target = $target.length && $target || $('[name=' + this.hash.slice(1) +']')

      if ($target.length) {
         var targetOffset = $target.offset().top
         $('html,body').animate({scrollTop: targetOffset-60}, 1000)
         return false
      }
   }
}
Menu.prototype.scroll_Ventana = function (e) {

   var menu_flotante_ancho = $('.nova-slider').outerWidth()
   e.data.$lista_acciones.css("width", menu_flotante_ancho)

   if (window.matchMedia('(min-width: 992px)').matches) {
      if ((e.data.$ventana.scrollTop() > e.data.$topPosition) ) {
         e.data.$menu_flotante.addClass('sticky')
      }
      else {
         e.data.$menu_flotante.removeClass('sticky')
      }
   }
   else {
      e.data.$menu_flotante.removeClass('sticky')
   }
}
Menu.prototype.resize_Ventana = function (e) {

   var menu_flotante_ancho = $('.nova-slider').outerWidth()
   e.data.$lista_acciones.css("width", menu_flotante_ancho)

   if (window.matchMedia('(max-width: 992px)').matches) {
      e.data.$menu_flotante.addClass('nova-slider-menu-fixed')
   }
   else {
      e.data.$menu_flotante.removeClass('nova-slider-menu-fixed')
   }
}

/*-----------------------------------------------*\
         OBJETO: TarjetaDetalleHallazgo
\*-----------------------------------------------*/

function TarjetaDetalleHallazgo(){

   this.$id_titulo = $('#id_titulo')
   this.$id_requisito_referencia = $('#id_requisito_referencia')
   this.$id_descripciones = $('#id_descripciones')
   this.$id_tipo_hallazgo = $('#id_tipo_hallazgo')
   this.$id_observaciones = $('#id_observaciones')
   this.$id_actual_user = $('#id_actual_user')
   this.$id_pk_hal = $('#id_pk_hal')
   this.init_Components()
}
TarjetaDetalleHallazgo.prototype.init_Components = function () {

   this.$id_requisito_referencia.multiselect(this.get_ConfMultiSelect())
   this.$id_requisito_referencia.siblings("div.btn-group").find("ul.multiselect-container").addClass('nova-bootstrap-multiselect-width-ul')
   this.$id_descripciones.multiselect(this.get_ConfMultiSelect())
   this.$id_descripciones.siblings("div.btn-group").find("ul.multiselect-container").addClass('nova-bootstrap-multiselect-width-ul')
   this.$id_tipo_hallazgo.select2(appnova.get_ConfigSelect2())
}
TarjetaDetalleHallazgo.prototype.get_ConfMultiSelect = function () {

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

/*-----------------------------------------------*\
         OBJETO: Tarjeta Analisis
\*-----------------------------------------------*/

function TarjetaAnalisis() {

   this.toolbar = new ToolBarAnalisis()
   this.grid = new GridAnalisis()
}

/*-----------------------------------------------*\
         OBJETO: ToolBar Analisis
\*-----------------------------------------------*/

function ToolBarAnalisis() {

   popup_analisis = new PopupAnalisis()
   this.$boton_nuevo = $('#id_boton_analisis')
   this.init_Events()
}
ToolBarAnalisis.prototype.init_Events = function () {

   this.$boton_nuevo.on("click", this, this.click_BotonNuevo)
}
ToolBarAnalisis.prototype.click_BotonNuevo = function (e) {

   popup_analisis.mostrar( 0, "nuevo" )
}

/*-----------------------------------------------*\
         OBJETO: Grid Analisis
\*-----------------------------------------------*/

function GridAnalisis() {

   this.$id = $('#id_grid_analisis_causa')
   this.$id_tbody = $('#id_tbody_analisis')
   this.init_Events()
   this.load_Data()
}
GridAnalisis.prototype.init_Events = function () {

   this.$id.on("click", '.clickable-row', this.click_FilaGrid)
   this.$id.on("click", '[data-event=\'editarAnalisis\']', this.click_EditarAnalisis)
   this.$id.on("click", '[data-event=\'eliminarAnalisis\']', this.click_EliminarAnalisis)
}
GridAnalisis.prototype.click_FilaGrid = function () {

   $(this).addClass('nova-active-row').siblings().removeClass('nova-active-row')
}
GridAnalisis.prototype.click_EditarAnalisis = function (e) {

   e.preventDefault()
   pk = this.getAttribute("data-id")
   popup_analisis.mostrar( pk, "editar")
}
GridAnalisis.prototype.click_EliminarAnalisis = function (e) {

   e.preventDefault()
   pk = this.getAttribute("data-id")
   tarjeta_analisis.grid.eliminar(pk)
}
GridAnalisis.prototype.load_Data = function () {

   $.ajax({

      url: url_analisis_hallazgo,
      method: "GET",
      context: this,
      data: {

         hallazgo_id: tarjeta_detalle_hallazgo.$id_pk_hal.val(),
      },
      success: function (_response) {

         this.refresh_Data(_response)
     },
     error: function (_response) {

        alertify.error("Ocurrio error al cargar datos")
     }
  })
}
GridAnalisis.prototype.refresh_Data = function (_response) {

   this.$id_tbody.text()
   var datos = ''
   if (_response.length) {

      for (var i = 0; i < _response.length; i++) {

          datos += '<tr class="clickable-row">' +
                      '<td>' +
                         '<button class="btn nova-btn btn-default nova-btn-delete" data-id="' + _response[i].pk + '" data-event="eliminarAnalisis">' +
                            '<i class="icon icon-left icon mdi mdi-delete nova-white"></i>' +
                         '</button>' +
                      '</td>' +
                      '<td>' +
                         '<button class="btn btn-default nova-url" data-event="editarAnalisis" data-id="' + _response[i].pk + '">' + _response[i].titulo + '</button>' +
                      '</td>' +
                      '<td>' +
                         _response[i].metodologia_nombre +
                      '</td>' +
                      '<td>' +
                         _response[i].causa +
                      '</td>' +
                   '</tr>'
      }
   }
   else {

      datos +=  '<tr class="clickable-row">' +
                   '<td colspan="4" class="nova-aling-center nova-sin-resultados">No se encontraron resultados.</td>' +
                '</tr>'
   }
   this.$id_tbody.html(datos)
}
GridAnalisis.prototype.eliminar = function (_pk) {

   alertify.confirm(

      'Eliminar Registro',
      '¿Desea Eliminar este registro?',
      function (e) {

         $.ajax({
            url: url_analisis_hallazgo + _pk + '/',
            method: "DELETE",
            headers: { "X-CSRFToken": appnova.galletita },
            success: function () {
               tarjeta_analisis.grid.load_Data()
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
         OBJETO: Popup Analisis
\*-----------------------------------------------*/

function PopupAnalisis() {

   this.$id = $('#id_tarjeta_analisis')
   this.$id_mensaje_error = $('#id_mensaje_error_analisis')
   this.$id_popup_titulo = $('#id_popup_titulo_analisis')
   this.$id_titulo = $('#id_titulo_analisis')
   this.$id_metodologia = $('#id_metodologia')
   this.$id_causas = $('#id_causas')
   this.$id_archivo = $('#id_archivo_analisis')
   this.$id_boton_guardar = $('#id_boton_guardar_analisis')
   this.$accion
   this.$pk_analisis
   this.$ocultar = false
   this.init_Components()
   this.init_Events()
}
PopupAnalisis.prototype.init_Components = function () {

   this.$id_metodologia.select2(appnova.get_ConfigSelect2())
   this.$id_archivo.fileinput(this.get_ConfigFileInput(false, [], []))
}
PopupAnalisis.prototype.init_Events = function () {

   this.$id_boton_guardar.on("click", this, this.click_BotonGuardar)
   this.$id_archivo.on("filebatchuploadcomplete", this, this.uploadcomplete_Filebatch)
   this.$id_archivo.on('filezoomhidden', this, this.hidden_FileZoom)
   this.$id.on("hidden.bs.modal", this, this.hidden_Modal)
}
PopupAnalisis.prototype.get_ConfigFileInput = function (_show_upload_button, _initial_preview, _initial_preview_config ) {

   return {

          uploadUrl: url_archivo,
          ajaxSettings: {  headers: { "X-CSRFToken": appnova.galletita }  },
          ajaxDeleteSettings: {  method: "DELETE", headers: { "X-CSRFToken": appnova.galletita }  },
          allowedFileExtensions: ['jpg', 'jpeg', 'png', 'bmp', 'txt', 'pdf'],
          allowedPreviewMimeTypes: ['jpg', 'jpeg', 'png', 'bmp', 'txt', 'pdf'],
          uploadAsync: true,
          maxFileCount: 15,
          showRemove: false,
          showClose: false,
          maxFileSize: 2048,
          showUpload: _show_upload_button,
          showCaption: false,
          showBrowse: false,
          browseOnZoneClick: true,
          fileActionSettings: {
             showUpload: false,
          },
          uploadExtraData: function(previewId, index) {
             if (popup_analisis.$id_archivo.fileinput('getFileStack').length > 0) {

                return {

                   archivo: popup_analisis.$id_archivo.fileinput('getFileStack')[index],
                   tipo_archivo: "cal",
                   content_object: url_analisis_hallazgo + popup_analisis.$pk_analisis + "/",
                   created_by: url_profile + tarjeta_detalle_hallazgo.$id_actual_user.val() + "/",
                }
             }
          },
          overwriteInitial: false,
          initialPreviewAsData: true,
          initialPreview: _initial_preview,
          initialPreviewConfig: _initial_preview_config,
          language:"es",
     }
}
PopupAnalisis.prototype.click_BotonGuardar = function (e) {

   e.data.$ocultar = true
   e.data.guardar_Analisis(e)
}
PopupAnalisis.prototype.uploadcomplete_Filebatch = function (e, files) {

   if(e.data.$ocultar) {

      e.data.$id.modal('hide')
      tarjeta_analisis.grid.load_Data()
      e.data.$ocultar = false
   }
}
PopupAnalisis.prototype.hidden_FileZoom = function (e) {

   $(document.body).addClass('modal-open')
}
PopupAnalisis.prototype.hidden_Modal = function (e) {

   e.data.clear_Estilos(e)
   e.data.clear_Formulario(e)
}
PopupAnalisis.prototype.guardar_Analisis = function (e) {

   if (e.data.$accion == "nuevo") {

      e.data.clear_Estilos(e)
      e.data.crear(e)
   }
   else if (e.data.$accion == "editar") {

      pk = e.data.$id.attr("data-primaryKey")
      e.data.editar(e, pk)
   }
}
PopupAnalisis.prototype.clear_Estilos = function (e) {

   e.data.$id_titulo.removeClass("nova-has-error")
   e.data.$id_metodologia.data('select2').$selection.removeClass("nova-has-error")
   e.data.$id_causas.removeClass("nova-has-error")
   e.data.$id_mensaje_error.html('')
}
PopupAnalisis.prototype.clear_Formulario = function (e) {

   e.data.$id_titulo.val("")
   e.data.$id_metodologia.val("").trigger("change")
   e.data.$id_causas.val("")
   e.data.$id_archivo.fileinput('destroy')
   e.data.$id_archivo.fileinput(this.get_ConfigFileInput(false, [], [] ))
}
PopupAnalisis.prototype.mostrar = function (_pk, _accion) {

   this.$id.modal('show').attr("data-primaryKey", _pk)
   this.$accion = _accion

   if (_accion == "nuevo") {

      this.$id_popup_titulo.text('Nuevo Analisis de Causas')
   }
   else if (_accion == "editar") {

      this.$id_popup_titulo.text('Editar Analisis de Causas')
      this.set_Data(_pk)
      this.$pk_analisis = _pk
   }
}
PopupAnalisis.prototype.validar = function () {

   var bandera = true

   if ( appnova.validar_EspaciosSaltos(this.$id_titulo.val()) == "" ) {

      this.$id_titulo.addClass("nova-has-error")
      bandera = false
   }
   if ( this.$id_metodologia.val() == "" ) {

      this.$id_metodologia.data('select2').$selection.addClass("nova-has-error")
      bandera = false
   }
   if ( appnova.validar_EspaciosSaltos(this.$id_causas.val()) == "" ) {

      this.$id_causas.addClass("nova-has-error")
      bandera = false
   }

   if ( !bandera ){

      this.$id_mensaje_error.html('Completa los campos marcados en rojo.')
   }

   return bandera
}
PopupAnalisis.prototype.crear = function (e) {

   if (e.data.validar()) {

      $.ajax({
         url: url_analisis_hallazgo,
         method: "POST",
         headers: { "X-CSRFToken": appnova.galletita },
         data: {

            "titulo": e.data.$id_titulo.val(),
            "metodologia": url_metodologia + e.data.$id_metodologia.val() + "/",
            "causa": e.data.$id_causas.val(),
            "hallazgo": url_hallazgo_proceso + tarjeta_detalle_hallazgo.$id_pk_hal.val() + "/",
            "create_by": url_profile + tarjeta_detalle_hallazgo.$id_actual_user.val() + "/",
         },
         success: function (_response) {

            if (e.data.$id_archivo.fileinput('getFileStack').length > 0) {

               e.data.$pk_analisis = _response.pk
               e.data.$id_archivo.fileinput('upload')
            }
            else {
               e.data.$id.modal('hide')
               tarjeta_analisis.grid.load_Data()
               e.data.$ocultar = false
            }
         },
         error: function (_response) {

            alertify.error("Ocurrio error al insertar analisis")
         }
      })
   }
}
PopupAnalisis.prototype.editar = function (e, _pk) {

   if (e.data.validar()) {

      $.ajax({
         url: url_analisis_hallazgo + _pk + "/",
         method: "PUT",
         headers: { "X-CSRFToken": appnova.galletita },
         data: {

            "titulo": e.data.$id_titulo.val(),
            "metodologia": url_metodologia + e.data.$id_metodologia.val() + "/",
            "causa": e.data.$id_causas.val(),
            "hallazgo": url_hallazgo_proceso + tarjeta_detalle_hallazgo.$id_pk_hal.val() + "/",
            "update_by": url_profile + tarjeta_detalle_hallazgo.$id_actual_user.val() + "/",
         },
         success: function (_response) {

            if (e.data.$id_archivo.fileinput('getFileStack').length > 0) {

               e.data.$pk_analisis = _response.pk
               e.data.$id_archivo.fileinput('upload')
            }
            else {

               e.data.$id.modal('hide')
               tarjeta_analisis.grid.load_Data()
               e.data.$ocultar = false
            }
         },
         error: function (_response) {

            alertify.error("Ocurrio error al insertar analisis")
         }
      })
   }
}
PopupAnalisis.prototype.set_Data = function (_pk) {

   $.ajax({

      url: url_analisis_hallazgo + _pk +"/",
      method: "GET",
      context: this,
      success: function (_response) {

         this.$id_titulo.val(_response.titulo)
         this.$id_metodologia.val(_response.metodologia_id).trigger("change")
         this.$id_causas.val(_response.causa)
         this.cargar_Archivos(_response)
      },
      error: function (_response) {

         alertify.error("Ocurrio error al cargar datos")
      }
   })
}
PopupAnalisis.prototype.cargar_Archivos = function (_response) {

   var initial_preview = []
   var initial_preview_config = []

   for (var i = 0; i < _response.relacion_archivo.length; i++) {

      initial_preview.push(_response.relacion_archivo[i]["archivo"])
      var url_archivo_response = _response.relacion_archivo[i]["archivo"].split('/')
      var nombre_archivo = url_archivo_response[url_archivo_response.length-1]
      var extension_archivo = nombre_archivo.split('.')
      var extension = extension_archivo[extension_archivo.length-1]

      if (extension == "pdf") {

         initial_preview_config.push(
            {  type: extension, caption: nombre_archivo, url: _response.relacion_archivo[i]["pk"] }
         )
      }
      else if (extension == "txt" || extension == "docx") {

         initial_preview_config.push(
            {  type: "text", caption: nombre_archivo, url: _response.relacion_archivo[i]["pk"] }
         )
      }
      else if (extension == "jpg" || extension == "jpeg" || extension == "png" || extension == "bmp") {

         initial_preview_config.push(
            {  caption: nombre_archivo, url: _response.relacion_archivo[i]["pk"] }
         )
      }
   }
   this.$id_archivo.fileinput('destroy')
   this.$id_archivo.fileinput(this.get_ConfigFileInput(true, initial_preview, initial_preview_config))
}

/*-----------------------------------------------*\
         OBJETO: Tarjeta Plan Accion
\*-----------------------------------------------*/

function TarjetaPlanAccion() {

   this.toolbar_plan_accion = new ToolBarPlanAccion()
   this.grid_plan_accion = new GridPlanAccion()
}

/*-----------------------------------------------*\
         OBJETO: ToolBar Plan Accion
\*-----------------------------------------------*/

function ToolBarPlanAccion() {

   popup_actividad = new PopupActividad()
}

/*-----------------------------------------------*\
         OBJETO: Grid Plan Accion
\*-----------------------------------------------*/

function GridPlanAccion() {

   popup_acciones = new PopupAcciones()
  //  popup_editarA = new PopupEditarA()
   this.$id_grid_plan_accion = $('#id_grid_plan_accion')
   this.init_Events()
}
GridPlanAccion.prototype.init_Events = function () {

   this.$id_grid_plan_accion.on("click", '.clickable-row', this.click_FilaGrid)
}
GridPlanAccion.prototype.click_FilaGrid = function () {

   $(this).addClass('nova-active-row').siblings().removeClass('nova-active-row')
}

/*-----------------------------------------------*\
         OBJETO: Popup Actividad
\*-----------------------------------------------*/

function PopupActividad() {

   this.$id_actividad = $('#id_actividad')
   this.$id_responsable = $('#id_responsable')
   this.$id_fecha_programada = $('#id_fecha_programada')
   this.$id_fecha_programada_group = $('#id_fecha_programada_group')
   this.init_Components()
}
PopupActividad.prototype.init_Components = function () {

   this.$id_responsable.select2(appnova.get_ConfigSelect2())
   this.$id_fecha_programada.mask(
      "9999-99-99",
      {
         placeholder:"aaaa/mm/dd"
      }
   )
   this.$id_fecha_programada_group.datetimepicker(this.get_DateTimePickerConfig())
}
PopupActividad.prototype.get_DateTimePickerConfig = function () {
   return {
      autoclose: true,
      orientation: "bottom left",
      minViewMode: 2,
      format: "yyyy-mm-dd",
   }
}

/*-----------------------------------------------*\
         OBJETO: popup acciones
\*-----------------------------------------------*/

function PopupAcciones () {

   popup_seguimiento_plan = new PopupSeguimientoPlan()
   popup_evaluacion_plan = new PopupEvaluacionPlan()
   this.$id_tarjeta_acciones = $('#id_tarjeta_acciones')
   this.$id_boton_evaluacion_eficacia = $('#id_boton_evaluacion_eficacia')
   this.$id_boton_seguimiento_plan = $('#id_boton_seguimiento_plan')
   this.init_Events()
}
PopupAcciones.prototype.init_Events = function () {

   this.$id_boton_seguimiento_plan.on("click", this, this.click_BotonSeguimientoPlan )
   this.$id_boton_evaluacion_eficacia.on("click", this, this.click_BotonEvaluacion)
}
PopupAcciones.prototype.click_BotonSeguimientoPlan = function (e) {

   e.preventDefault()
   popup_seguimiento_plan.$id.on('shown.bs.modal', function(){
      $("body").addClass("modal-open")
      $("html").addClass("be-modal-open")
   })
   e.data.$id_tarjeta_acciones.modal('hide')
}
PopupAcciones.prototype.click_BotonEvaluacion = function (e) {

   e.preventDefault()
   popup_evaluacion_plan.$id.on('shown.bs.modal', function(){
      $("body").addClass("modal-open")
      $("html").addClass("be-modal-open")
   })
   e.data.$id_tarjeta_acciones.modal('hide')
}

/*-----------------------------------------------*\
         OBJETO: popup seguimiento plan
\*-----------------------------------------------*/

function PopupSeguimientoPlan () {

   this.$id = $('#id_tarjeta_seguimiento_plan')
   this.$id_resultado_seguimiento = $('#id_resultado_seguimiento')
   this.$id_fecha_seguimiento_group = $('#id_fecha_seguimiento_group')
   this.$id_fecha_seguimiento = $('#id_fecha_seguimiento')
   this.$id_archivo = $('#id_archivo_seguimiento_plan')
   this.init_Components()
}
PopupSeguimientoPlan.prototype.init_Components = function () {

   this.$id_fecha_seguimiento.mask(
      "9999-99-99",
      {
         placeholder:"aaaa/mm/dd"
      }
   )
   this.$id_fecha_seguimiento_group.datetimepicker(this.get_DateTimePickerConfig())
   this.$id_archivo.fileinput(this.get_ConfigFileInput())
}
PopupSeguimientoPlan.prototype.get_DateTimePickerConfig = function () {

  return {
      autoclose: true,
      orientation: "bottom left",
      minViewMode: 2,
      format: "yyyy-mm-dd",
   }
}
PopupSeguimientoPlan.prototype.get_ConfigFileInput = function () {
   return {
          uploadUrl: "una/url/donde/se/subira/",
          uploadAsync: false,
          minFileCount: 2,
          maxFileCount: 5,
          overwriteInitial: false,
          language:"es",
          initialPreview: [
             "/static/images/referenciavisual/documento.jpg",
             "/static/images/referenciavisual/1.jpg",
          ],
          initialPreviewAsData: true,
          initialPreviewFileType: 'image',
          initialPreviewConfig: [
            {  caption: "Documento.jpg", size: 827000, url: "/file-upload-batch/2", key: 1  },
            {  caption: "1.jpg", size: 827000, url: "/file-upload-batch/2", key: 2  },
          ],
          purifyHtml: true,
     }
}

/*-----------------------------------------------*\
         OBJETO: popup evaluacion plan
\*-----------------------------------------------*/

function PopupEvaluacionPlan () {

   this.$id = $('#id_tarjeta_evaluacion')
   this.$id_resultado = $('#id_resultado_plan_eval')
   this.$id_resultado_evaluacion = $('#id_resultado_evaluacion_plan_eval')
   this.$id_fecha_evaluacion = $('#id_fecha_evaluacion_plan_eval')
   this.$id_fecha_evaluacion_group = $('#id_fecha_evaluacion_group')
   this.$id_criterio_decision = $('#id_criterio_decision_plan_eval')
   this.$id_archivo = $('#id_archivo_plan_eval')
   this.init_Components()
}
PopupEvaluacionPlan.prototype.init_Components = function () {

   this.$id_fecha_evaluacion.mask(
      "9999-99-99",
      {
         placeholder:"aaaa/mm/dd"
      }
   )
   this.$id_fecha_evaluacion_group.datetimepicker(this.get_DateTimePickerConfig())
   this.$id_archivo.fileinput(this.get_ConfigFileInput())
}
PopupEvaluacionPlan.prototype.get_ConfigFileInput = function () {

   return {

          uploadUrl: "una/url/donde/se/subira/",
          uploadAsync: false,
          minFileCount: 2,
          maxFileCount: 5,
          overwriteInitial: false,
          language:"es",
          initialPreview: [
             "/static/images/referenciavisual/documento.jpg",
             "/static/images/referenciavisual/1.jpg",
             "/static/images/referenciavisual/2.jpg",
             "/static/images/referenciavisual/3.jpg",
          ],
          initialPreviewAsData: true,
          initialPreviewFileType: 'image',
          initialPreviewConfig: [
            {  caption: "Documento.jpg", size: 827000, url: "/file-upload-batch/2", key: 1  },
            {  caption: "1.jpg", size: 827000, url: "/file-upload-batch/2", key: 2  },
            {  caption: "2.jpg", size: 827000, url: "/file-upload-batch/2", key: 3  },
            {  caption: "3.jpg", size: 827000, url: "/file-upload-batch/2", key: 4  },
          ],
          purifyHtml: true,
     }
}
PopupEvaluacionPlan.prototype.get_DateTimePickerConfig = function () {
   return {
      autoclose: true,
      orientation: "bottom left",
      minViewMode: 2,
      format: "yyyy-mm-dd",
   }
}

/*-----------------------------------------------*\
            OBJETO: popup editarA
\*-----------------------------------------------*/

// function PopupEditarA() {
//
//     this.$id_evidencia = $('#id_evidencia')
//     this.$id_plan_observaciones = $('#id_plan_observaciones')
//     this.init_Components()
// }
// PopupEditarA.prototype.init_Components = function () {
//
// }

/*-----------------------------------------------*\
         OBJETO: Tarjeta Evidencia
\*-----------------------------------------------*/

function TarjetaEvidencia() {

   this.toolbar = new ToolBarEvidencia()
   this.grid = new GridEvidencia()
}

/*-----------------------------------------------*\
         OBJETO: ToolBar Evidencia
\*-----------------------------------------------*/

function ToolBarEvidencia() {

   popup_evidencia = new PopupEvidencia()
   this.$boton_nuevo = $('#id_boton_evidencia')
   this.init_Events()
}
ToolBarEvidencia.prototype.init_Events = function () {

   this.$boton_nuevo.on("click", this, this.click_BotonNuevo)
}
ToolBarEvidencia.prototype.click_BotonNuevo = function (e) {

   popup_evidencia.mostrar( 0, "nuevo" )
}

/*-----------------------------------------------*\
         OBJETO: Grid Evidencia
\*-----------------------------------------------*/

function GridEvidencia() {

   this.$id = $('#id_grid_evidencia')
   this.$id_tbody = $('#id_tbody_evidencia')
   this.init_Events()
   this.load_Data()
}
GridEvidencia.prototype.init_Events = function () {

   this.$id.on("click", '.clickable-row', this.click_FilaGrid)
   this.$id.on("click", '[data-event=\'editarEvidencia\']', this.click_EditarEvidencia)
   this.$id.on("click", '[data-event=\'eliminarEvidencia\']', this.click_EliminarEvidencia)
}
GridEvidencia.prototype.click_FilaGrid = function () {

   $(this).addClass('nova-active-row').siblings().removeClass('nova-active-row')
}
GridEvidencia.prototype.click_EditarEvidencia = function (e) {

   e.preventDefault()
   pk = this.getAttribute("data-id")
   popup_evidencia.mostrar( pk, "editar")
}
GridEvidencia.prototype.click_EliminarEvidencia = function (e) {

   e.preventDefault()
   pk = this.getAttribute("data-id")
   tarjeta_evidencia.grid.eliminar(pk)
}
GridEvidencia.prototype.load_Data = function () {

   $.ajax({

      url: url_evidencia_hallazgo,
      method: "GET",
      context: this,
      data: {

         hallazgo_id: tarjeta_detalle_hallazgo.$id_pk_hal.val(),
      },
      success: function (_response) {

         this.refresh_Data(_response)
     },
     error: function (_response) {

        alertify.error("Ocurrio error al cargar datos")
     }
  })
}
GridEvidencia.prototype.refresh_Data = function (_response) {

   this.$id_tbody.text()
   var datos = ''
   if (_response.length) {

      for (var i = 0; i < _response.length; i++) {

          datos += '<tr class="clickable-row">'+
                      '<td>' +
                         '<button class="btn nova-btn nova-btn-delete" data-id="' + _response[i].pk + '" data-event="eliminarEvidencia">' +
                            '<i class="icon icon-left icon mdi mdi-delete nova-white"></i>' +
                         '</button>' +
                      '</td>' +
                      '<td>' +
                         '<a href="#id_tarjeta_evidencia" class="btn btn-default nova-url" data-event="editarEvidencia" data-id="'+ _response[i].pk +'">' + _response[i].titulo + '</a>' +
                      '</td>' +
                      '<td>' +  _response[i].observacion + '</td>' +
                   '</tr>'
      }
   }
   else {

      datos +=  '<tr class="clickable-row">' +
                   '<td colspan="3" class="nova-aling-center nova-sin-resultados">No se encontraron resultados.</td>' +
                '</tr>'
   }
   this.$id_tbody.html(datos)
}
GridEvidencia.prototype.eliminar = function (_pk) {

   alertify.confirm(

      'Eliminar Registro',
      '¿Desea Eliminar este registro?',
      function (e) {

         $.ajax({
            url: url_evidencia_hallazgo + _pk + '/',
            method: "DELETE",
            headers: { "X-CSRFToken": appnova.galletita },
            success: function () {
               tarjeta_evidencia.grid.load_Data()
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
         OBJETO: popup evidencia
\*-----------------------------------------------*/

function PopupEvidencia () {

   this.$id = $('#id_tarjeta_evidencia')
   this.$id_mensaje_error = $('#id_mensaje_error_evidencia')
   this.$id_popup_titulo = $('#id_popup_titulo_evidencia')

   this.$id_titulo = $('#id_titulo_evidencia')
   this.$id_observacion = $('#id_observacion_evidencia')
   this.$id_archivo = $('#id_archivo_evidencia')

   this.$id_boton_guardar = $('#id_boton_guardar_evidencia')
   this.$accion
   this.$pk_evidencia
   this.$ocultar = false
   this.init_Components()
   this.init_Events()
}
PopupEvidencia.prototype.init_Components = function () {

   this.$id_archivo.fileinput(this.get_ConfigFileInput(false, [], []))
}
PopupEvidencia.prototype.init_Events = function () {

   this.$id_boton_guardar.on("click", this, this.click_BotonGuardar)
   this.$id_archivo.on("filebatchuploadcomplete", this, this.uploadcomplete_Filebatch)
   this.$id_archivo.on('filezoomhidden', this, this.hidden_FileZoom)
   this.$id.on("hidden.bs.modal", this, this.hidden_Modal)
}
PopupEvidencia.prototype.get_ConfigFileInput = function (_show_upload_button, _initial_preview, _initial_preview_config ) {

   return {

          uploadUrl: url_archivo,
          ajaxSettings: {  headers: { "X-CSRFToken": appnova.galletita }  },
          ajaxDeleteSettings: {  method: "DELETE", headers: { "X-CSRFToken": appnova.galletita }  },
          allowedFileExtensions: ['jpg', 'jpeg', 'png', 'bmp', 'txt', 'pdf'],
          allowedPreviewMimeTypes: ['jpg', 'jpeg', 'png', 'bmp', 'txt', 'pdf'],
          uploadAsync: true,
          maxFileCount: 15,
          showRemove: false,
          showClose: false,
          maxFileSize: 2048,
          showUpload: _show_upload_button,
          showCaption: false,
          showBrowse: false,
          browseOnZoneClick: true,
          fileActionSettings: {
             showUpload: false,
          },
          uploadExtraData: function(previewId, index) {
             if (popup_evidencia.$id_archivo.fileinput('getFileStack').length > 0) {

                return {

                   archivo: popup_evidencia.$id_archivo.fileinput('getFileStack')[index],
                   tipo_archivo: "cal",
                   content_object: url_evidencia_hallazgo + popup_evidencia.$pk_evidencia + "/",
                   created_by: url_profile + tarjeta_detalle_hallazgo.$id_actual_user.val() + "/",
                }
             }
          },
          overwriteInitial: false,
          initialPreviewAsData: true,
          initialPreview: _initial_preview,
          initialPreviewConfig: _initial_preview_config,
          language:"es",
     }
}
PopupEvidencia.prototype.click_BotonGuardar = function (e) {

   e.data.$ocultar = true
   e.data.guardar_Evidencia(e)
}
PopupEvidencia.prototype.uploadcomplete_Filebatch = function (e, files) {

   if(e.data.$ocultar) {

      e.data.$id.modal('hide')
      tarjeta_evidencia.grid.load_Data()
      e.data.$ocultar = false
   }
}
PopupEvidencia.prototype.hidden_FileZoom = function (e) {

   $(document.body).addClass('modal-open')
}
PopupEvidencia.prototype.hidden_Modal = function (e) {

   e.data.clear_Estilos(e)
   e.data.clear_Formulario(e)
}
PopupEvidencia.prototype.guardar_Evidencia = function (e) {

   if (e.data.$accion == "nuevo") {

      e.data.clear_Estilos(e)
      e.data.crear(e)
   }
   else if (e.data.$accion == "editar") {

      pk = e.data.$id.attr("data-primaryKey")
      e.data.editar(e, pk)
   }
}
PopupEvidencia.prototype.clear_Estilos = function (e) {

   e.data.$id_titulo.removeClass("nova-has-error")
   e.data.$id_observacion.removeClass("nova-has-error")
   e.data.$id_mensaje_error.html('')
}
PopupEvidencia.prototype.clear_Formulario = function (e) {

   e.data.$id_titulo.val("")
   e.data.$id_observacion.val("")
   e.data.$id_archivo.fileinput('destroy')
   e.data.$id_archivo.fileinput(this.get_ConfigFileInput(false, [], [] ))
}
PopupEvidencia.prototype.mostrar = function (_pk, _accion) {

   this.$id.modal('show').attr("data-primaryKey", _pk)
   this.$accion = _accion

   if (_accion == "nuevo") {

      this.$id_popup_titulo.text('Nueva Evidencia')
   }
   else if (_accion == "editar") {

      this.$id_popup_titulo.text('Editar Evidencia')
      this.set_Data(_pk)
      this.$pk_evidencia = _pk
   }
}
PopupEvidencia.prototype.validar = function () {

   var bandera = true

   if ( appnova.validar_EspaciosSaltos(this.$id_titulo.val()) == "" ) {

      this.$id_titulo.addClass("nova-has-error")
      bandera = false
   }
   if ( appnova.validar_EspaciosSaltos(this.$id_observacion.val()) == "" ) {

      this.$id_observacion.addClass("nova-has-error")
      bandera = false
   }

   if ( !bandera ){

      this.$id_mensaje_error.html('Completa los campos marcados en rojo.')
   }

   return bandera
}
PopupEvidencia.prototype.crear = function (e) {

   if (e.data.validar()) {

      $.ajax({
         url: url_evidencia_hallazgo,
         method: "POST",
         headers: { "X-CSRFToken": appnova.galletita },
         data: {

            "titulo": e.data.$id_titulo.val(),
            "observacion": e.data.$id_observacion.val(),
            "hallazgo": url_hallazgo_proceso + tarjeta_detalle_hallazgo.$id_pk_hal.val() + "/",
            "create_by": url_profile + tarjeta_detalle_hallazgo.$id_actual_user.val() + "/",
         },
         success: function (_response) {

            if (e.data.$id_archivo.fileinput('getFileStack').length > 0) {

               e.data.$pk_evidencia = _response.pk
               e.data.$id_archivo.fileinput('upload')
            }
            else {
               e.data.$id.modal('hide')
               tarjeta_evidencia.grid.load_Data()
               e.data.$ocultar = false
            }
         },
         error: function (_response) {

            alertify.error("Ocurrio error al insertar evidencia")
            console.log(_response.responseText);
         }
      })
   }
}
PopupEvidencia.prototype.editar = function (e, _pk) {

   if (e.data.validar()) {

      $.ajax({
         url: url_evidencia_hallazgo + _pk + "/",
         method: "PUT",
         headers: { "X-CSRFToken": appnova.galletita },
         data: {

            "titulo": e.data.$id_titulo.val(),
            "observacion": e.data.$id_observacion.val(),
            "hallazgo": url_hallazgo_proceso + tarjeta_detalle_hallazgo.$id_pk_hal.val() + "/",
            "update_by": url_profile + tarjeta_detalle_hallazgo.$id_actual_user.val() + "/",
         },
         success: function (_response) {

            if (e.data.$id_archivo.fileinput('getFileStack').length > 0) {

               e.data.$pk_evidencia = _response.pk
               e.data.$id_archivo.fileinput('upload')
            }
            else {

               e.data.$id.modal('hide')
               tarjeta_evidencia.grid.load_Data()
               e.data.$ocultar = false
            }
         },
         error: function (_response) {

            alertify.error("Ocurrio error al insertar evidencia")
         }
      })
   }
}
PopupEvidencia.prototype.set_Data = function (_pk) {

   $.ajax({

      url: url_evidencia_hallazgo + _pk +"/",
      method: "GET",
      context: this,
      success: function (_response) {

         this.$id_titulo.val(_response.titulo)
         this.$id_observacion.val(_response.observacion)
         this.cargar_Archivos(_response)
      },
      error: function (_response) {

         alertify.error("Ocurrio error al cargar datos")
      }
   })
}
PopupEvidencia.prototype.cargar_Archivos = function (_response) {

   var initial_preview = []
   var initial_preview_config = []

   for (var i = 0; i < _response.relacion_archivo.length; i++) {

      initial_preview.push(_response.relacion_archivo[i]["archivo"])
      var url_archivo_response = _response.relacion_archivo[i]["archivo"].split('/')
      var nombre_archivo = url_archivo_response[url_archivo_response.length-1]
      var extension_archivo = nombre_archivo.split('.')
      var extension = extension_archivo[extension_archivo.length-1]

      if (extension == "pdf") {

         initial_preview_config.push(
            {  type: extension, caption: nombre_archivo, url: _response.relacion_archivo[i]["pk"] }
         )
      }
      else if (extension == "txt" || extension == "docx") {

         initial_preview_config.push(
            {  type: "text", caption: nombre_archivo, url: _response.relacion_archivo[i]["pk"] }
         )
      }
      else if (extension == "jpg" || extension == "jpeg" || extension == "png" || extension == "bmp") {

         initial_preview_config.push(
            {  caption: nombre_archivo, url: _response.relacion_archivo[i]["pk"] }
         )
      }
   }
   this.$id_archivo.fileinput('destroy')
   this.$id_archivo.fileinput(this.get_ConfigFileInput(true, initial_preview, initial_preview_config))
}
