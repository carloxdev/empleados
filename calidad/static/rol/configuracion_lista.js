/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:api-
var url_api_rol = window.location.origin + "/api-calidad/rol/"
var url_compania = window.location.origin + "/api-calidad/compania/"
var url_rol = window.location.origin + "/configuracion/roles/"

// OBJS
var popup_rol = null
var popup_filtro = null
var popup_compania = null
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
   
   popup_rol = new PopupRol()
   popup_filtro = new PopupFiltro()
   this.$id_boton_nuevo_rol = $('#id_boton_nuevo_rol')
   this.$id_boton_filtros = $('#id_boton_filtros')
   this.init_Events()
}
ToolBar.prototype.init_Events = function () {

  this.$id_boton_nuevo_rol.on("click", this, this.click_BotonNuevoRol)
}
ToolBar.prototype.click_BotonNuevoRol = function (e) {

  popup_rol.mostrar(0, "nuevo")
}

/*-----------------------------------------------*\
            OBJETO: grid
\*-----------------------------------------------*/

function Grid() {

   popup_compania = new PopupCompania()
   this.$id = $('#id_grid_personal_rol')
   this.init_Events()
}
Grid.prototype.init_Events = function () {

   this.$id.on("click", '.clickable-row', this.click_FilaGrid)
   this.$id.on('click', '[data-event=\'agregarCompania\']', this.click_AgregarCompania)
   this.$id.on('click', '[data-event=\'editarRol\']', this.click_EditarRol)
   this.$id.on('click', '[data-event=\'eliminarRol\']', this.click_EliminarRol)
}
Grid.prototype.click_AgregarCompania = function (e) {

   e.preventDefault()
   pk = this.getAttribute("data-id")
   popup_compania.mostrar(pk)
}
Grid.prototype.click_EditarRol = function (e){

   e.preventDefault()
   pk = this.getAttribute("data-id")
   popup_rol.mostrar( pk, "editar")
}
Grid.prototype.click_EliminarRol = function (e) {

   e.preventDefault()
   pk = this.getAttribute("data-id")
   url = url_api_rol + pk + "/"
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

               window.location.href = url_rol
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
            OBJETO: popup rol
\*-----------------------------------------------*/

function PopupRol(){

   this.$id = $('#id_tarjeta_rol')
   this.$id_compania = $('#id_compania')
   this.$id_empleado = $('#id_empleado')
   this.$id_rol = $('#id_rol')
   this.$id_boton_guardar = $('#id_boton_guardar_rol')
   this.$id_titulo = $('#id_popup_rol_titulo')
   this.$id_formulario = $('#id_formulario_rol')
   this.$accion
   this.init_Components()
   this.init_Events()
}
PopupRol.prototype.init_Components = function () {

   this.$id_compania.select2(appnova.get_ConfigSelect2())
   this.$id_empleado.select2(appnova.get_ConfigSelect2())
   this.$id_rol.select2(appnova.get_ConfigSelect2())
}
PopupRol.prototype.init_Events = function () {

   this.$id_boton_guardar.on("click", this, this.click_BotonGuardar)
   this.$id.on('hidden.bs.modal', this, this.hidden_Modal)
}
PopupRol.prototype.click_BotonGuardar = function (e) {

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
PopupRol.prototype.mostrar = function (_id, _accion) {

   this.$id.modal('show').attr("data-primaryKey", _id)
   this.$accion = _accion

   if (_accion == "nuevo") {

      this.$id_titulo.text('Nuevo Rol')
   }
   else if (_accion == "editar") {

      this.$id_titulo.text('Editar Rol')
      this.set_Data(_id)
   }
}
PopupRol.prototype.set_Data = function (_pk) {
   
      $.ajax({

         url: url_api_rol + _pk +"/",
         method: "GET",
         context: this,
         success: function (_response) {
            
            this.$id_empleado.val(_response.numero_empleado + ":" + _response.nombre_completo).trigger("change").select2("enable",false)
            this.$id_rol.val(_response.rol).trigger("change")
         },
         error: function (_response) {

            alertify.error("Ocurrio error al cargar datos")
         }
      })
}
PopupRol.prototype.validar = function () {

   var bandera = true

   if ( this.$id_empleado.val() == "") {

      this.$id_empleado.data('select2').$selection.addClass("nova-has-error")
      bandera = false
   }

   if ( this.$id_rol.val() == "") {

      this.$id_rol.data('select2').$selection.addClass("nova-has-error")
      bandera = false
   }

   if ( !bandera ){
      this.$id_formulario.find('.modal-body').prepend('<span id="id_mensaje_error">Completa los campos marcados en rojo.</span>')
   }

   return bandera
}
PopupRol.prototype.hidden_Modal = function (e) {

   e.data.clear_Estilos(e)
   e.data.clear_Formulario(e)
}
PopupRol.prototype.clear_Estilos = function (e) {

   e.data.$id_empleado.data('select2').$selection.removeClass("nova-has-error")
   e.data.$id_rol.data('select2').$selection.removeClass("nova-has-error")
   e.data.$id_formulario.find('#id_mensaje_error').remove()
}
PopupRol.prototype.clear_Formulario = function (e) {

   e.data.$id_empleado.val("").trigger("change").removeAttr("disabled")
   e.data.$id_rol.val("").trigger("change")
}
PopupRol.prototype.crear = function (e) {
   
   var texto = e.data.$id_empleado.val().split(':')
   var numero_empleado = texto[0]
   var nombre_completo = texto[1]
   var rol = e.data.$id_rol.val()

   $.ajax({

      url: url_api_rol,
      method: "POST",
      headers: { "X-CSRFToken": appnova.galletita },
      data: {
         "numero_empleado": numero_empleado,
         "nombre_completo" : nombre_completo,
         "rol" : rol,
      },
      success: function (_response) {

         e.data.$id.modal('hide')
         window.location.href = url_rol
      },
      error: function (_response) {

         alertify.error("Ocurrio error al insertar rol")
      }
   })
}
PopupRol.prototype.editar = function (e, _pk) {
   
   var texto = e.data.$id_empleado.val().split(':')
   var numero_empleado = texto[0]
   var nombre_completo = texto[1]
   var rol = e.data.$id_rol.val()

   $.ajax({

      url: url_api_rol + _pk + "/",
      method: "PUT",
      headers: { "X-CSRFToken": appnova.galletita },
      data: {
         
         "numero_empleado": numero_empleado,
         "nombre_completo" : nombre_completo,
         "rol" : rol,
      },
      success: function (_response) {

         e.data.$id.modal('hide')
         window.location.href = url_rol
      },
      error: function (_response) {

         alertify.error("Ocurrio error al modificar rol")
      }
   })
}

/*-----------------------------------------------*\
            OBJETO: popup filtro
\*-----------------------------------------------*/

function PopupFiltro(){

   this.$id = $('#id_tarjeta_filtros')
   this.$id_empleado_filtro = $('#id_empleado_filtro')
   this.$id_rol_filtro = $('#id_rol_filtro')
   this.$id_boton_buscar = $('#id_boton_buscar')
   this.$id_boton_limpiar = $('#id_boton_limpiar')
   this.$id_tbody = $('#id_tbody_roles')
   this.init_Components()
   this.init_Events()
}
PopupFiltro.prototype.init_Components = function () {

   this.$id_empleado_filtro.select2(appnova.get_ConfigSelect2())
   this.$id_rol_filtro.select2(appnova.get_ConfigSelect2())
}
PopupFiltro.prototype.init_Events = function () {

   this.$id_boton_buscar.on("click", this, this.click_BotonBuscar)
   this.$id_boton_limpiar.on("click", this, this.click_BotonLimpiar)
}
PopupFiltro.prototype.click_BotonBuscar = function (e) {

   e.data.$id_tbody.empty()
   e.data.buscar()
}
PopupFiltro.prototype.click_BotonLimpiar = function (e) {

   e.data.$id_empleado_filtro.val("").trigger("change")
   e.data.$id_rol_filtro.val("").trigger("change")
}
PopupFiltro.prototype.buscar = function () {

   var texto = this.$id_empleado_filtro.val().split(':')
   var numero_empleado = texto[0]
   var rol = this.$id_rol_filtro.val()

   $.ajax({

      url: url_api_rol,
      dataType: "json",
      method: "GET",
      context: this,
      data:{

         numero_empleado: numero_empleado,
         rol: rol,
      },
      success: function (_response) {
         if (_response.length) {
            for (var i = 0; i < _response.length; i++) {

               this.$id_tbody.append(  '<tr class="clickable-row">' +
                                          '<td>' +
                                             '<a class="btn nova-btn btn-default nova-btn-delete" data-id="' + _response[i].pk + '" data-event="eliminarRol">' +
                                                '<i class="icon icon-left icon mdi mdi-delete nova-white"></i>' +
                                             '</a>' +
                                          '</td>' +
                                          '<td class="nova-aling-center">' +
                                             '<a class="btn btn-default" data-toggle="modal" data-id="' + _response[i].pk + '" data-event="agregarCompania">' +
                                                '<i class="icon icon-left icon mdi mdi-plus nova-black"></i>' +
                                             '</a>' +
                                          '</td>' +
                                          '<td>' +
                                             _response[i].numero_empleado +
                                          '</td>' +
                                          '<td>' +
                                             '<a class="btn btn-default nova-url" data-event="editarRol" data-id="' + _response[i].pk + '">' + _response[i].nombre_completo + '</a>' +
                                          '</td>' +
                                          '<td>' + _response[i].rol + '</td>' +
                                       '</tr>')
            }
         }
         else {

            this.$id_tbody.append(  '<tr class="clickable-row">' +
                                       '<td colspan="5" class="nova-aling-center nova-sin-resultados">No se encontraron resultados.</td>' +
                                    '</tr>')
         }
      },
      error: function (_response) {

         alertify.error("Ocurrio error al cargar datos")
      }
   })
}

/*-----------------------------------------------*\
            OBJETO: popup compania
\*-----------------------------------------------*/

function PopupCompania() {

   this.$id = $('#id_tarjeta_compania')
   this.$id_compania = $('#id_compania')
   this.$id_formulario = $('#id_formulario_compania')
   this.$id_boton_aceptar = $('#id_boton_aceptar')
   this.$id_tbody = $('#id_tbody_compania')
   this.$id_boton_agregar = $('#id_boton_agregar')
   this.$id_grid = $('#id_grid_compania')
   this.init_Components()
   this.init_Events()
}
PopupCompania.prototype.init_Components = function () {

   this.$id_compania.select2(appnova.get_ConfigSelect2())
}
PopupCompania.prototype.init_Events = function () {

   this.$id.on('hidden.bs.modal', this, this.hidden_Modal)
   this.$id_boton_agregar.on('click', this, this.click_GuardarSeleccion)
   this.$id_grid.on("click", '[data-event=\'eliminarCompania\']', this.click_EliminarSeleccion)
}
PopupCompania.prototype.click_GuardarSeleccion = function (e) {

   var pk = e.data.$id.attr("data-primarykey")
   e.data.guardar_Seleccion(pk)
}
PopupCompania.prototype.guardar_Seleccion = function (_pk) {
   
   var texto = this.$id_compania.val().split(':')
   var compania_codigo = texto[0]
   var compania = texto[1]

   $.ajax({

      url: url_compania,
      method: "POST",
      headers: { "X-CSRFToken": appnova.galletita },
      context: this,
      data: {

         "compania_codigo" : compania_codigo,
         "compania" : compania,
         "personal_rol" : url_api_rol + _pk + "/",
      },
      success: function (_response) {

         alertify.success("Se ha agredado correctamente")
         this.$id_tbody.empty()
         popup_compania.cargarSeleccionados()
      },
      error: function( jqXHR) {
         alertify.warning(jqXHR.responseJSON.non_field_errors[0])
      }
   })  
}
PopupCompania.prototype.click_EliminarSeleccion = function (e) {

   var url = url_compania + e.currentTarget.getAttribute("id") + "/"
   popup_compania.eliminar_Seleccion(url)
}
PopupCompania.prototype.eliminar_Seleccion = function (_url) {

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
               popup_compania.$id_tbody.empty()
               popup_compania.cargarSeleccionados()
            },
            error: function () {

               alertify.error("Ocurrió un error al eliminar")
            }
         })
      }, 
      null
   )
}
PopupCompania.prototype.mostrar = function (_id) {

   this.$id.modal("show").attr("data-primaryKey", _id)
   this.cargarSeleccionados()
}
PopupCompania.prototype.cargarSeleccionados = function () {

   var pk_rol = this.$id.attr("data-primaryKey")

   $.ajax({

      url: url_compania,
      dataType: "json",
      method: "GET",
      context: this,
      data: {

         rol_id: pk_rol,
      },
      success: function (_response) {

         if (_response.length) {

            for (var i = 0; i < _response.length; i++) {

               this.$id_tbody.append(  '<tr class="clickable-row">' +
                                          '<td> ' +
                                             '<a data-event="eliminarCompania" class="btn nova-btn btn-default nova-btn-delete" id="'+_response[i].pk+'">' +
                                                '<i class="icon icon-left icon mdi mdi-delete nova-white"></i>' +
                                             '</a>' +
                                          '</td>' +
                                          '<td>'+ _response[i].compania_codigo +'</td>' +
                                          '<td>'+ _response[i].compania +'</td>' +
                                       '</tr>')
            }
         }
         else {

            this.$id_tbody.append(  '<tr class="clickable-row">' +
                                       '<td colspan="3" class="nova-aling-center nova-sin-resultados">Sin compañia asignadas.</td>' +
                                    '</tr>')
         }
      },
      error: function (_response) {

         alertify.error("Ocurrio error al cargar datos")
      }
   })
}
PopupCompania.prototype.hidden_Modal = function (e) {

   var id = e.data.$id.attr("data-primaryKey")
   e.data.$id_tbody.empty()
}