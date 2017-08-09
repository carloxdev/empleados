/*-----------------------------------------------*\
         GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:
var url_proceso = window.location.origin + "/api-calidad/proceso/"
var url_subproceso = window.location.origin + "/api-calidad/subproceso/"
var url_responsable = window.location.origin + "/api-calidad/responsable/"
var url_arbol = window.location.origin + "/configuracion/subprocesos/json/"

// OBJS
var tarjeta_resultados = null
var popup_proceso = null
var popup_subproceso = null
var popup_responsable = null

// VARIABLE
var nodoSeleccionado

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
   this.$id_boton_nuevo_proceso = $('#id_boton_nuevo_proceso')
   this.$id_boton_importar = $('#id_boton_importar')
   this.init_Events()
}
ToolBar.prototype.init_Events = function () {

   this.$id_boton_nuevo_proceso.on("click", this, this.click_BotonNuevo)
}
ToolBar.prototype.click_BotonNuevo = function (e) {

   popup_proceso.mostrar(0, "nuevo")
}

/*-----------------------------------------------*\
         OBJETO: Tarjeta proceso
\*-----------------------------------------------*/

function PopupProceso() {
   
   this.$id = $('#id_tarjeta_proceso')
   this.$id_proceso = $('#id_proceso')
   this.$id_formulario = $('#id_formulario_proceso')
   this.$id_boton_guardar = $('#id_boton_guardar_proceso')
   this.$accion
   this.$id_titulo = $('#id_popup_proceso_titulo')
   this.init_Events()
}
PopupProceso.prototype.init_Events = function () {

   this.$id_boton_guardar.on('click', this, this.click_BotonGuardar)
   this.$id.on('hidden.bs.modal', this, this.hidden_Modal)
   this.$id.on('shown.bs.modal', this, this.shown_Modal)
}
PopupProceso.prototype.mostrar = function (_id, _accion) {

   this.$id.modal("show").attr("data-primaryKey", _id)
   this.$accion = _accion

   if (_accion == "nuevo") {

      this.$id_titulo.text('Nuevo Proceso')
   }
   else if (_accion == "editar") {

      this.$id_titulo.text('Editar Proceso')
   }
}
PopupProceso.prototype.set_Data = function (_pk) {
   
   $.ajax({

      url: url_proceso + _pk +"/",
      method: "GET",
      context: this,
      success: function (_response) {
         
         this.$id_proceso.val(_response.proceso)
      },
      error: function (_response) {

         alertify.error("Ocurrio error al cargar datos")
      }
   })
}
PopupProceso.prototype.validar = function () {

   var bandera = true

   if ( appnova.validar_EspaciosSaltos(this.$id_proceso.val()) == "") {
      this.$id_proceso.addClass("nova-has-error")
      bandera = false
   }

   if ( !bandera ){
      this.$id_formulario.prepend('<span id="id_mensaje_error">Completa los campos marcados en rojo.</span>')
   }

   return bandera
}
PopupProceso.prototype.hidden_Modal = function (e) {

   e.data.clear_Estilos(e)
   e.data.clear_Formulario(e)
}
PopupProceso.prototype.shown_Modal = function (e) {

   e.data.$id_proceso.focus()
}
PopupProceso.prototype.clear_Estilos = function (e) {

   e.data.$id_proceso.removeClass("nova-has-error")
   e.data.$id_formulario.find('#id_mensaje_error').remove()
}
PopupProceso.prototype.clear_Formulario = function (e) {

   e.data.$id_proceso.val("")
   e.data.$id_formulario.get(0).reset() //Limpia los campos seleccionados por medio de la cache del navegador
   e.data.$id_boton_guardar.removeAttr("disabled")
}
PopupProceso.prototype.click_BotonGuardar = function (e) {

   if (e.data.$accion == "nuevo") {

      e.data.clear_Estilos(e)
      e.data.crear(e)
   }
   else if (e.data.$accion == "editar") {

      var pk = e.data.$id.attr("data-primarykey").slice(3)
      e.data.editar(e, pk)
   }
}
PopupProceso.prototype.crear = function (e) {

   if (e.data.validar()) {
         
      $.ajax({
         url: url_proceso,
         method: "POST",
         headers: { "X-CSRFToken": appnova.galletita },
         data: {
            "proceso" : e.data.$id_proceso.val(),
         },
         success: function (_response) {

            e.data.$id_boton_guardar.attr("disabled" ,"disabled")
            e.data.$id.modal('hide')
            tarjeta_resultados.arbol.init_Components()
         },
         error: function (_response) {

            alertify.error("Ocurrio error al insertar Proceso")
         }
      })
   }
}
PopupProceso.prototype.editar = function (e, _pk) {

   if (e.data.validar()) {
      $.ajax({
         url: url_proceso + _pk + "/",
         method: "PUT",
         headers: { "X-CSRFToken": appnova.galletita },
         data: {
            "proceso" : e.data.$id_proceso.val(),
         },
         success: function (_response) {

            e.data.$id.modal('hide')
            tarjeta_resultados.arbol.init_Components()
         },
         error: function (_response) {

            alertify.error("Ocurrio error al modificar Proceso")
         }
      })
   }
}

/*-----------------------------------------------*\
         OBJETO: Arbol
\*-----------------------------------------------*/

function Arbol() {

   popup_subproceso = new PopupSubproceso()
   popup_responsable = new PopupResponsable()

   this.$id = $("#id_arbol")
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

   this.$id.on('click', '[data-event=\'accion\']', this.click_Accion)
   this.$id.on('click', '[data-event=\'agregar\']', this.click_Agregar)
   this.$id.on('click', '[data-event=\'editar\']', this.click_Editar)
   this.$id.on('click', '[data-event=\'eliminar\']', this.click_Eliminar)   
}
Arbol.prototype.click_Accion = function (e) {

   nodoSeleccionado = this.parentElement.parentElement.getAttribute("data-nodeid")
   popup_responsable.mostrar(e.currentTarget.id, "nuevo")
}
Arbol.prototype.click_Agregar = function (e) {

   nodoSeleccionado = this.parentElement.parentElement.getAttribute("data-nodeid")
   popup_subproceso.mostrar(e.currentTarget.id, "nuevo")
}
Arbol.prototype.click_Editar = function (e) {

   if (e.currentTarget.id.slice(0,2) == 'fe') {
      
      var pk = e.currentTarget.id
      popup_proceso.set_Data(pk.slice(3))
      popup_proceso.mostrar(pk, "editar")
   }
   else if (e.currentTarget.id.slice(0,2) == 'ce') {
      
      var nodoHijo = this.parentElement.parentElement.getAttribute("data-nodeid")
      nodoSeleccionado = tarjeta_resultados.arbol.$id.treeview('getParent', parseInt(nodoHijo)).nodeId

      var pk = e.currentTarget.id
      popup_subproceso.set_Data(pk.slice(3))
      popup_subproceso.mostrar(pk, "editar", e.currentTarget.getAttribute("id_padre"))
   }
}
Arbol.prototype.click_Eliminar = function (e) {

   var pk = e.currentTarget.id

   if (e.currentTarget.id.slice(0,2) == 'fd') {

      var url = url_proceso + pk.slice(3) + "/"
      tarjeta_resultados.arbol.eliminar_proceso(url)
   }
   else if (e.currentTarget.id.slice(0,2) == 'cd') {

      var nodoHijo = this.parentElement.parentElement.getAttribute("data-nodeid")
      nodoSeleccionado = tarjeta_resultados.arbol.$id.treeview('getParent', parseInt(nodoHijo)).nodeId

      var url = url_subproceso + pk.slice(3) + "/"
      tarjeta_resultados.arbol.eliminar_subproceso(url)
   }
}
Arbol.prototype.eliminar_proceso = function (_url) {
   
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
Arbol.prototype.eliminar_subproceso = function (_url) {

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

/*-----------------------------------------------*\
         OBJETO: Tarjeta responsable
\*-----------------------------------------------*/

function PopupResponsable() {
   
   this.$id = $('#id_tarjeta_responsable')
   this.$id_responsable = $('#id_responsable')
   this.$id_formulario = $('#id_formulario_responsable')
   this.$id_boton_aceptar = $('#id_boton_aceptar')
   this.$id_tbody = $('#id_tbody_responsables')
   this.$id_boton_agregar = $('#id_boton_agregar')
   this.$accion
   this.$id_grid = $('#id_grid_responsable')

   this.init_Components()
   this.init_Events()
}
PopupResponsable.prototype.init_Components = function () {

   this.$id_responsable.select2(appnova.get_ConfigSelect2())
}
PopupResponsable.prototype.init_Events = function () {

   this.$id.on('hidden.bs.modal', this, this.hidden_Modal)
   this.$id_boton_agregar.on('click', this, this.click_GuardarSeleccion)
   this.$id_grid.on("click", '[data-event=\'eliminarResponsable\']', this.click_EliminarSeleccion)
}
PopupResponsable.prototype.click_GuardarSeleccion = function (e) {

   var pk = e.data.$id.attr("data-primarykey").slice(3)
   e.data.guardar_Seleccion(pk)
}
PopupResponsable.prototype.guardar_Seleccion = function (_pk) {
   
   var numero_empleado = this.$id_responsable.val()
   var texto = this.$id_responsable.find(':selected').text()
   var nombre_completo = texto.split(' : ')[1]

   $.ajax({
      url: url_responsable,
      method: "POST",
      headers: { "X-CSRFToken": appnova.galletita },
      context: this,
      data: {
         
         "numero_empleado" : numero_empleado,
         "nombre_completo" : nombre_completo,
         "proceso" : url_proceso + _pk + "/",
      },
      success: function (_response) {

         alertify.success("Se ha agredado correctamente")
         this.$id_tbody.empty()
         popup_responsable.cargarSeleccionados()
      },
      error: function( jqXHR) {
         alertify.warning(jqXHR.responseJSON.non_field_errors[0])
      }
   })  
}
PopupResponsable.prototype.click_EliminarSeleccion = function (e) {

   var url = url_responsable + e.currentTarget.getAttribute("id") + "/"
   popup_responsable.eliminar_Seleccion(url)
}
PopupResponsable.prototype.eliminar_Seleccion = function (_url) {

   alertify.confirm(
      'Eliminar Registro',
      '¿Desea Eliminar este registro?',
      function (e) {

         $.ajax({
            url: _url,
            method: "DELETE",
            headers: { "X-CSRFToken": appnova.galletita },
            success: function () {

               alertify.success("Se eliminó registro correctamente")
               popup_responsable.$id_tbody.empty()
               popup_responsable.cargarSeleccionados()
            },
            error: function () {

               alertify.error("Ocurrió un error al eliminar")
            }
         })
      }, 
      null
   )
}
PopupResponsable.prototype.mostrar = function (_id, _accion) {

   this.$id.modal("show").attr("data-primaryKey", _id)
   this.$accion = _accion
   this.cargarSeleccionados()
}
PopupResponsable.prototype.cargarSeleccionados = function () {

   var pk_proceso = this.$id.attr("data-primaryKey").slice(3)

   $.ajax({
      url: url_responsable,
      dataType: "json",
      method: "GET",
      context:this,
      data:{
         proceso_id: pk_proceso,
      },
      success: function (_response) {
         if (_response.length) {
            for (var i = 0; i < _response.length; i++) {
               this.$id_tbody.append(  '<tr class="clickable-row">' +
                                          '<td> ' +
                                             '<a data-event="eliminarResponsable" class="btn nova-btn btn-default nova-btn-delete" id="'+_response[i].pk+'">' +
                                                '<i class="icon icon-left icon mdi mdi-delete nova-white"></i>' +
                                             '</a>' +
                                          '</td>' +
                                          '<td>'+ _response[i].numero_empleado +'</td>' +
                                          '<td>'+ _response[i].nombre_completo +'</td>' +
                                       '</tr>')
            }
         }
         else {
            this.$id_tbody.append(  '<tr class="clickable-row">' +
                                       '<td colspan="3" class="nova-aling-center nova-sin-resultados">Sin empleados asignados.</td>' +
                                    '</tr>')
         }
      },
      error: function (_response) {

         alertify.error("Ocurrio error al cargar datos")
      }
   })
}
PopupResponsable.prototype.hidden_Modal = function (e) {

   var id = e.data.$id.attr("data-primaryKey")
   e.data.$id_tbody.empty()
}

/*-----------------------------------------------*\
         OBJETO: Popup Subproceso
\*-----------------------------------------------*/

function PopupSubproceso() {

   this.$id = $('#id_tarjeta_subproceso')
   this.$id_boton_guardar = $('#id_boton_guardar_subproceso')
   this.$id_formulario = $('#id_formulario_subproceso')
   this.$id_subproceso = $('#id_subproceso')
   this.$id_titulo = $('#id_popup_subproceso_titulo')
   this.$accion
   this.init_Events()
}
PopupSubproceso.prototype.init_Events = function () {

   this.$id_boton_guardar.on("click", this, this.click_BotonGuardar)
   this.$id.on('hidden.bs.modal', this, this.hidden_Modal)
   this.$id.on('shown.bs.modal', this, this.shown_Modal)
}
PopupSubproceso.prototype.click_BotonGuardar = function (e) {
   
   e.data.clear_Estilos(e)

   var pk = e.data.$id.attr("data-primarykey").slice(3)

   if (e.data.$accion == "nuevo") {

      e.data.crear(e, pk)
   }
   else if (e.data.$accion == "editar") {

      var pk_proceso = e.data.$id.attr("data-primarykeyParent")
      e.data.editar(e, pk, pk_proceso)
   }
}
PopupSubproceso.prototype.crear = function (e, _pk) {

   if (e.data.validar()) {
      $.ajax({
         url: url_subproceso,
         method: "POST",
         headers: { "X-CSRFToken": appnova.galletita },
         data: {
            "subproceso" : e.data.$id_subproceso.val(),
            "proceso": url_proceso + _pk + "/"
         },
         success: function (_response) {

            e.data.$id_boton_guardar.attr("disabled" ,"disabled")
            e.data.$id.modal('hide')
            tarjeta_resultados.arbol.cargar_Datos(true)
         },
         error: function (_response) {

            alertify.error("Ocurrio error al insertar Subproceso")
         }
      })
   }
}
PopupSubproceso.prototype.editar = function (e, _pk, _pk_proceso) {
   
   if (e.data.validar()) {
      $.ajax({
         url: url_subproceso + _pk + "/",
         method: "PUT",
         headers: { "X-CSRFToken": appnova.galletita },
         data: {
            "subproceso" : e.data.$id_subproceso.val(),
            "proceso": url_proceso + _pk_proceso + "/"
         },
         success: function (_response) {

            e.data.$id.modal('hide')
            tarjeta_resultados.arbol.cargar_Datos(true)
         },
         error: function (_response) {

            alertify.error("Ocurrio error al modificar Subproceso")
         }
      })
   }
}
PopupSubproceso.prototype.validar = function () {
   
   var bandera = true

   if ( appnova.validar_EspaciosSaltos(this.$id_subproceso.val()) == "") {

      this.$id_subproceso.addClass("nova-has-error")
      bandera = false
   }

   if ( !bandera ) {

      this.$id_formulario.prepend('<span id="id_mensaje_error">Completa los campos marcados en rojo.</span>')
   }

   return bandera
}
PopupSubproceso.prototype.mostrar = function (_id, _accion, _id_padre) {

   this.$id.modal("show").attr({"data-primaryKey": _id, "data-primarykeyParent": _id_padre})
   this.$accion = _accion

   if (_accion == "nuevo") {

      this.$id_titulo.text('Nuevo Subproceso')
   }
   else {
    
      this.$id_titulo.text('Editar Subproceso')
   }

}
PopupSubproceso.prototype.set_Data = function (_pk) {

   $.ajax({
      url: url_subproceso + _pk +"/",
      method: "GET",
      context: this,
      success: function (_response) {
         
         this.$id_subproceso.val(_response.subproceso)
      },
      error: function (_response) {

         alertify.error("Ocurrio error al cargar datos")
      }
   })
}
PopupSubproceso.prototype.hidden_Modal = function (e) {

   e.data.clear_Estilos(e)
   e.data.clear_Formulario(e)
}
PopupSubproceso.prototype.shown_Modal = function (e) {

   e.data.$id_subproceso.focus()
}
PopupSubproceso.prototype.clear_Estilos = function (e) {

   e.data.$id_subproceso.removeClass("nova-has-error")
   e.data.$id_formulario.find('#id_mensaje_error').remove()
}
PopupSubproceso.prototype.clear_Formulario = function (e) {

   e.data.$id_subproceso.val("")
   e.data.$id_formulario.get(0).reset()
   e.data.$id_boton_guardar.removeAttr("disabled")
}
