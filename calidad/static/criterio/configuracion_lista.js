/*-----------------------------------------------*\
         GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:
var url_criterio = window.location.origin + "/api-calidad/criterio/"
var url_requisito = window.location.origin + "/api-calidad/requisito/"
var url_arbol = window.location.origin + "/configuracion/requisitos/json/"
var nodoSeleccionado

// OBJS
var tarjeta_resultados = null
var popup_filtros = null
var popup_criterio = null
var popup_requisito = null

/*-----------------------------------------------*\
         LOAD
\*-----------------------------------------------*/

$(document).ready(function () {
   
   popup_filtros = new PopupFiltros()
   tarjeta_resultados = new TarjetaResultados()

   // Asigna eventos a teclas
   $(document).keypress(function (e) {

      // Tecla Enter
      if (e.which == 13) {

         e.preventDefault()

         if (popup_filtros.$id.hasClass('in')) {
             popup_filtros.apply_Filters()
         }

      }
      // Tecla ESC
   })
   
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

   popup_criterio = new PopupCriterio()
   this.$id_boton_nuevo_criterio = $('#id_boton_nuevo_criterio')
   this.$id_boton_filtro = $('#id_boton_filtro')
   this.init_Events()
}
ToolBar.prototype.init_Events = function () {

   this.$id_boton_nuevo_criterio.on("click", this, this.click_BotonNuevo)
}
ToolBar.prototype.click_BotonNuevo = function (e) {

   popup_criterio.mostrar(0, "nuevo")
}
ToolBar.prototype.change_BotonFiltros = function (_no_filtros) {

    html = "<i class='icon icon-left mdi mdi-search nova-white'></i> Filtros <span class='badge nova-border-bottom'>no_filtros</span>".replace("no_filtros", _no_filtros)

    this.$id_boton_filtro.html(html)
}
ToolBar.prototype.restart_BotonFiltros = function () {
    
    this.$id_boton_filtro.html("<i class='icon icon-left mdi mdi-search nova-white'></i> Filtros")   
}

/*-----------------------------------------------*\
         OBJETO: Tarjeta filtros
\*-----------------------------------------------*/

function PopupFiltros() {
   
   this.$id = $('#id_tarjeta_filtros')
   this.$id_requisito = $('#id_requisito_filtro')
   this.$id_filtro = $('#id_formulario_filtro')
   this.$id_boton_buscar = $('#id_boton_buscar')
   this.$id_boton_limpiar = $('#id_boton_limpiar')

   this.init_Events()
}
PopupFiltros.prototype.init_Events = function () {

   this.$id.on('shown.bs.modal', this, this.shown_Modal)
   this.$id_boton_buscar.on("click", this, this.click_BotonBuscar)
   this.$id_boton_limpiar.on("click", this, this.click_BotonLimpiar)
}
PopupFiltros.prototype.click_BotonBuscar = function (e) {

   e.preventDefault()
   e.data.apply_Filters()
}
PopupFiltros.prototype.click_BotonLimpiar = function (e) {

   e.data.$id_requisito.val("")
   tarjeta_resultados.arbol.limpiar()
}
PopupFiltros.prototype.get_NoFiltrosAplicados = function () {

    cantidad = 0

    if (this.$id_requisito.val() != "") {
        cantidad += 1
    }

    return cantidad
}
PopupFiltros.prototype.apply_Filters = function () {


   var criterio = this.$id_requisito.val()
   tarjeta_resultados.arbol.buscar(criterio)

   no_filtros = this.get_NoFiltrosAplicados()

   if (no_filtros != 0) {
        tarjeta_resultados.toolbar.change_BotonFiltros(no_filtros)
   }
   else {
        tarjeta_resultados.toolbar.restart_BotonFiltros()
   }
    
   this.$id.modal('hide')
}
PopupFiltros.prototype.shown_Modal = function (e) {

   e.data.$id_requisito.focus()
}

/*-----------------------------------------------*\
         OBJETO: Tarjeta criterio
\*-----------------------------------------------*/

function PopupCriterio() {
   
   this.$id = $('#id_tarjeta_criterio')
   this.$id_formulario = $('#id_formulario_criterio')
   this.$id_clasificacion_criterio = $('#id_clasificacion_criterio')
   this.$id_criterio = $('#id_criterio')
   this.$id_boton_guardar = $('#id_boton_guardar_criterio')
   this.$accion
   this.$id_titulo = $('#id_popup_criterio_titulo')

   this.init_Components()
   this.init_Events()
}
PopupCriterio.prototype.init_Components = function () {

   this.$id_clasificacion_criterio.select2(appnova.get_ConfigSelect2())
}
PopupCriterio.prototype.init_Events = function () {

   this.$id_boton_guardar.on('click', this, this.click_BotonGuardar)
   this.$id.on('hidden.bs.modal', this, this.hidden_Modal)
}
PopupCriterio.prototype.mostrar = function (_id, _accion) {

   this.$id.modal("show").attr("data-primaryKey", _id)
   this.$accion = _accion

   if (_accion == "nuevo") {

      this.$id_titulo.text('Nuevo Criterio de Auditoria')
   }
   else {

      this.$id_titulo.text('Editar Criterio de Auditoria')
   }
}
PopupCriterio.prototype.set_Data = function (_pk) {
   
      $.ajax({

         url: url_criterio + _pk +"/",
         method: "GET",
         context: this,
         success: function (_response) {
            
            this.$id_clasificacion_criterio.val(_response.clasificacion).trigger("change")
            this.$id_criterio.val(_response.criterio)
         },
         error: function (_response) {

            alertify.error("Ocurrio error al cargar datos")
         }
      })
}
PopupCriterio.prototype.validar = function () {

   var bandera = true

   if ( this.$id_clasificacion_criterio.val() == "") {

      this.$id_clasificacion_criterio.data('select2').$selection.addClass("nova-has-error");
      bandera = false
   }

   if ( appnova.validar_EspaciosSaltos(this.$id_criterio.val()) == "") {
      
      this.$id_criterio.addClass("nova-has-error")
      bandera = false
   }

   if ( !bandera ){
      this.$id_formulario.prepend('<span id="id_mensaje_error">Completa los campos marcados en rojo.</span>')
   }

   return bandera
}
PopupCriterio.prototype.hidden_Modal = function (e) {

   e.data.clear_Estilos(e)
   e.data.clear_Formulario(e)
}
PopupCriterio.prototype.clear_Estilos = function (e) {

   e.data.$id_clasificacion_criterio.data('select2').$selection.removeClass("nova-has-error");
   e.data.$id_criterio.removeClass("nova-has-error")
   e.data.$id_formulario.find('#id_mensaje_error').remove()
}
PopupCriterio.prototype.clear_Formulario = function (e) {

   e.data.$id_clasificacion_criterio.data('select2').val(0)
   e.data.$id_criterio.val("")
   e.data.$id_formulario.get(0).reset()
   e.data.$id_boton_guardar.removeAttr("disabled")
}
PopupCriterio.prototype.click_BotonGuardar = function (e) {

   e.data.clear_Estilos(e)

   if (e.data.$accion == "nuevo") {

      e.data.crear(e)
   }
   else if (e.data.$accion == "editar") {

      var pk = e.data.$id.attr("data-primarykey").slice(3)
      e.data.editar(e, pk)
   }

}
PopupCriterio.prototype.crear = function (e) {

   if (e.data.validar()) {
      $.ajax({
         url: url_criterio,
         method: "POST",
         headers: { "X-CSRFToken": appnova.galletita },
         data: {

            "clasificacion" : e.data.$id_clasificacion_criterio.val(),
            "criterio" : e.data.$id_criterio.val(),
         },
         success: function (_response) {

            e.data.$id_boton_guardar.attr("disabled" ,"disabled")
            e.data.$id.modal('hide')
            tarjeta_resultados.arbol.init_Components()
         },
         error: function (_response) {

            alertify.error("Ocurrio error al insertar Criterio")
         }
      })
   }
}
PopupCriterio.prototype.editar = function (e, _pk) {

   if (e.data.validar()) {
      $.ajax({
         url: url_criterio + _pk + "/",
         method: "PUT",
         headers: { "X-CSRFToken": appnova.galletita },
         data: {
            "clasificacion" : e.data.$id_clasificacion_criterio.val(),
            "criterio" : e.data.$id_criterio.val(),
         },
         success: function (_response) {

            e.data.$id.modal('hide')
            tarjeta_resultados.arbol.init_Components()
         },
         error: function (_response) {

            alertify.error("Ocurrio error al modificar Criterio")
         }
      })
   }
}

/*-----------------------------------------------*\
         OBJETO: Arbol
\*-----------------------------------------------*/

function Arbol() {

   popup_requisito = new PopupRequisito()
   this.$id = $('#id_arbol_criterios_requisitos')
   this.init_Components()
}
Arbol.prototype.init_Components = function () {
   
   this.cargar_Datos(false)
}
Arbol.prototype.cargar_Datos = function (_expandir) {

   $.ajax({
      url: url_arbol,
      dataType: "json",
      method: "GET",
      contentType: "application/json; charset=utf-8",
      context: this,
      success: function (_response) {
         
         this.$id.treeview(
            {  data: _response,
               showTags: true,
            }
         )
         if (_expandir) {

            this.$id.treeview('expandNode',[parseInt(nodoSeleccionado)])
         }
         this.init_Events()
      },
      error: function (_response) {

         alertify.error("Ocurrio error al cargar datos")
      }
   })
}
Arbol.prototype.init_Events = function () {

   this.$id.on('click', '[data-event=\'agregar\']', this.click_Agregar)
   this.$id.on('click', '[data-event=\'editar\']', this.click_Editar)
   this.$id.on('click', '[data-event=\'eliminar\']', this.click_Eliminar)   
}
Arbol.prototype.click_Agregar = function (e) {

   nodoSeleccionado = this.parentElement.parentElement.getAttribute("data-nodeid")
   popup_requisito.mostrar(e.currentTarget.id, "nuevo")
}
Arbol.prototype.click_Editar = function (e) {

   if (e.currentTarget.id.slice(0,2) == 'fe') {
      
      var pk = e.currentTarget.id
      popup_criterio.set_Data(pk.slice(3))
      popup_criterio.mostrar(pk, "editar")
   }
   else if (e.currentTarget.id.slice(0,2) == 'ce') {
      
      var nodoHijo = this.parentElement.parentElement.getAttribute("data-nodeid")
      nodoSeleccionado = tarjeta_resultados.arbol.$id.treeview('getParent', parseInt(nodoHijo)).nodeId

      var pk = e.currentTarget.id
      popup_requisito.set_Data(pk.slice(3))
      popup_requisito.mostrar(pk, "editar", e.currentTarget.getAttribute("id_padre"))
   }
}
Arbol.prototype.click_Eliminar = function (e) {

   var pk = e.currentTarget.id

   if (e.currentTarget.id.slice(0,2) == 'fd') {

      var url = url_criterio + pk.slice(3) + "/"
      tarjeta_resultados.arbol.eliminar_criterio(url)
   }
   else if (e.currentTarget.id.slice(0,2) == 'cd') {

      var nodoHijo = this.parentElement.parentElement.getAttribute("data-nodeid")
      nodoSeleccionado = tarjeta_resultados.arbol.$id.treeview('getParent', parseInt(nodoHijo)).nodeId

      var url = url_requisito + pk.slice(3) + "/"
      tarjeta_resultados.arbol.eliminar_requisito(url)
   }
}
Arbol.prototype.eliminar_criterio = function (_url) {
   
   alertify.confirm(
      'Eliminar Registro',
      '¿Desea Eliminar este registro?. Si es eliminado, se perderan los registros relacionados',
      function () {

         var url = _url

         $.ajax({
            url: url,
            method: "DELETE",
            headers: { "X-CSRFToken": appnova.galletita },
            success: function () {

               alertify.success("Se eliminó registro correctamente")
                    
               tarjeta_resultados.arbol.init_Components()
            },
            error: function () {
            
            alertify.error("Ocurrió un error al eliminar")
            }
         })
      }, 
      null
   )    
}
Arbol.prototype.eliminar_requisito = function (_url) {

   alertify.confirm(
      'Eliminar Registro',
      '¿Desea Eliminar este registro?',
      function () {

         var url = _url

         $.ajax({
            url: url,
            method: "DELETE",
            headers: { "X-CSRFToken": appnova.galletita },
            success: function () {

               alertify.success("Se eliminó registro correctamente")
                    
               tarjeta_resultados.arbol.cargar_Datos(true)
            },
            error: function () {
            
            alertify.error("Ocurrió un error al eliminar")
            }
         })
      }, 
      null
   )    
}
Arbol.prototype.buscar = function (_criterio) {

   this.$id.treeview('search', [ _criterio, {
     ignoreCase: true,
     exactMatch: false,
     revealResults: true
   }])
}
Arbol.prototype.limpiar = function () {

   this.$id.treeview('clearSearch');
}

/*-----------------------------------------------*\
         OBJETO: Popup Requisito
\*-----------------------------------------------*/

function PopupRequisito() {

   this.$id = $('#id_tarjeta_requisito')
   this.$id_formulario = $('#id_formulario_requisito')
   this.$id_requisito = $('#id_requisito')
   this.$id_boton_guardar = $('#id_boton_guardar_requisito')
   this.$accion
   this.$id_titulo = $('#id_popup_requisito_titulo')
   this.init_Events()
}
PopupRequisito.prototype.init_Events = function () {

   this.$id_boton_guardar.on("click", this, this.click_BotonGuardar)
   this.$id.on('hidden.bs.modal', this, this.hidden_Modal)
   this.$id.on('shown.bs.modal', this, this.shown_Modal)
}
PopupRequisito.prototype.click_BotonGuardar = function (e) {
   
   e.data.clear_Estilos(e)

   var pk = e.data.$id.attr("data-primarykey").slice(3)

   if (e.data.$accion == "nuevo") {

      e.data.crear(e, pk)
   }
   else if (e.data.$accion == "editar") {

      var pk_criterio = e.data.$id.attr("data-primarykeyParent")
      e.data.editar(e, pk, pk_criterio)
   }
}
PopupRequisito.prototype.crear = function (e, _pk) {

   if (e.data.validar()) {
      $.ajax({
         url: url_requisito,
         method: "POST",
         headers: { "X-CSRFToken": appnova.galletita },
         data: {

            "requisito" : e.data.$id_requisito.val(),
            "criterio": url_criterio + _pk + "/"
         },
         success: function (_response) {

            e.data.$id_boton_guardar.attr("disabled" ,"disabled")
            e.data.$id.modal('hide')
            tarjeta_resultados.arbol.cargar_Datos(true)
         },
         error: function (_response) {

            alertify.error("Ocurrio error al insertar Requisito")
         }
      })
   }
}
PopupRequisito.prototype.editar = function (e, _pk, _pk_criterio) {
   
   if (e.data.validar()) {
      $.ajax({

         url: url_requisito + _pk + "/",
         method: "PUT",
         headers: { "X-CSRFToken": appnova.galletita },
         data: {

            "requisito" : e.data.$id_requisito.val(),
            "criterio": url_criterio + _pk_criterio + "/"
         },
         success: function (_response) {

            e.data.$id.modal('hide')
            tarjeta_resultados.arbol.cargar_Datos(true)
         },
         error: function (_response) {

            alertify.error("Ocurrio error al modificar Requisito")
         }
      })
   }
}
PopupRequisito.prototype.validar = function () {
   
   var bandera = true

   if ( appnova.validar_EspaciosSaltos(this.$id_requisito.val()) == "") {

      this.$id_requisito.addClass("nova-has-error")
      bandera = false
   }

   if ( !bandera ){

      this.$id_formulario.prepend('<span id="id_mensaje_error">Completa los campos marcados en rojo.</span>')
   }

   return bandera
}
PopupRequisito.prototype.mostrar = function (_id, _accion, _id_padre) {

   this.$id.modal("show").attr({"data-primaryKey": _id, "data-primarykeyParent": _id_padre})
   this.$accion = _accion

   if (_accion == "nuevo") {

      this.$id_titulo.text('Nuevo Requisito')
   }
   else {

      this.$id_titulo.text('Editar Requisito')
   }
}
PopupRequisito.prototype.set_Data = function (_pk) {

   $.ajax({

      url: url_requisito + _pk +"/",
      method: "GET",
      context: this,
      success: function (_response) {
         
         this.$id_requisito.val(_response.requisito)
      },
      error: function (_response) {

         alertify.error("Ocurrio error al cargar datos")
      }
   })
}
PopupRequisito.prototype.hidden_Modal = function (e) {

   e.data.clear_Estilos(e)
   e.data.clear_Formulario(e)
}
PopupRequisito.prototype.shown_Modal = function (e) {

   e.data.$id_requisito.focus()
}
PopupRequisito.prototype.clear_Estilos = function (e) {

   e.data.$id_requisito.removeClass("nova-has-error")
   e.data.$id_formulario.find('#id_mensaje_error').remove()
}
PopupRequisito.prototype.clear_Formulario = function (e) {

   e.data.$id_requisito.val("")
   e.data.$id_formulario.get(0).reset()
   e.data.$id_boton_guardar.removeAttr("disabled")
}