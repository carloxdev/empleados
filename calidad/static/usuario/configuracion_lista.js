/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:api-
//var url_empleados_bypage = window.location.origin + "/api-ebs/viewempleadosfull_bypage/"
var url_usuario = window.location.origin + "/api-calidad/usuario/"

// OBJS
var popup_usuario = null
var popup_filtro = null
var popup_compania = null
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

function TarjetaResultados() {
   
   this.$toolbar = new ToolBar()
   this.$grid = new Grid()
}

/*-----------------------------------------------*\
            OBJETO: toolbar
\*-----------------------------------------------*/

function ToolBar() {
   
   popup_usuario = new PopupUsuario()
   popup_filtro = new PopupFiltro()
   this.$id_boton_nuevo_usuario = $('#id_boton_nuevo_usuario')
   this.$id_boton_filtros = $('#id_boton_filtros')
   this.init_Events()
}
ToolBar.prototype.init_Events = function () {

  this.$id_boton_nuevo_usuario.on("click", this, this.click_BotonNuevoUsuario)
}
ToolBar.prototype.click_BotonNuevoUsuario = function (e) {

  popup_usuario.mostrar(0, "nuevo")
}

/*-----------------------------------------------*\
            OBJETO: grid
\*-----------------------------------------------*/

function Grid() {

   popup_compania = new PopupCompania()
   this.$id = $('#id_grid_usuario')
   this.init_Components()
}
Grid.prototype.init_Components = function () {

   // this.load_Data()
}
Grid.prototype.init_Events = function () {

   this.$id.on("click", '.clickable-row', this.click_FilaGrid)
}
Grid.prototype.load_Data = function () {

   $.ajax({
      url: url_usuario,
      dataType: "json",
      method: "GET",
      contentType: "application/json; charset=utf-8",
      context: this,
      success: function (_response) {
         
         this.crear_Registros(_response)
         this.init_Events()
      },
      error: function (_response) {

         alertify.error("Ocurrio error al cargar datos")
      }
   })
}
Grid.prototype.crear_Registros = function (_response) {

}
Grid.prototype.click_FilaGrid = function (e) {

   $(this).addClass('nova-active-row').siblings().removeClass('nova-active-row')
}

/*-----------------------------------------------*\
            OBJETO: popup usuario
\*-----------------------------------------------*/

function PopupUsuario(){

   this.$id = $('#id_tarjeta_usuario')
   this.$id_compania = $('#id_compania')
   this.$id_empleado = $('#id_empleado')
   this.$id_rol = $('#id_rol')
   this.$id_boton_guardar = $('#id_boton_guardar_usuario')
   this.$id_titulo = $('#id_popup_usuario_titulo')
   this.$id_formulario = $('#id_formulario_usuario')
   this.$accion
   this.init_Components()
   this.init_Events()
}
PopupUsuario.prototype.init_Components = function () {

   this.$id_compania.select2(appnova.get_ConfigSelect2())
   this.$id_empleado.select2(appnova.get_ConfigSelect2())
   this.$id_rol.select2(appnova.get_ConfigSelect2())
}
PopupUsuario.prototype.init_Events = function () {

   this.$id_boton_guardar.on("click", this, this.click_BotonGuardar)
   this.$id.on('hidden.bs.modal', this, this.hidden_Modal)
}
PopupUsuario.prototype.click_BotonGuardar = function (e) {

   e.preventDefault()
   e.data.clear_Estilos(e)

   if (e.data.$accion == "nuevo") {

      e.data.crear(e)
   }
   else if (e.data.$accion == "editar") {

      var pk = e.data.$id.attr("data-primarykey").slice(3)
      e.data.editar(e, pk)
   }
}
PopupUsuario.prototype.mostrar = function (_id, _accion) {

   this.$id.modal('show').attr("data-primaryKey", _id)
   this.$accion = _accion

   if (_accion == "nuevo") {

      this.$id_titulo.text('Nuevo Usuario')
   }
   else {

      this.$id_titulo.text('Editar Usuario')
   }
}
PopupUsuario.prototype.set_Data = function (_pk) {
   
      $.ajax({
      url: url_usuario + _pk +"/",
      method: "GET",
      context: this,
      success: function (_response) {
         
         this.$id_empleado.val(_response.pers_nombre_completo).trigger("change").select2('disable')
         this.$id_rol.val(_response.rol).trigger("change")
      },
      error: function (_response) {

         alertify.error("Ocurrio error al cargar datos")
      }
   })
}
PopupUsuario.prototype.validar = function () {

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
      this.$id_formulario.prepend('<span id="id_mensaje_error">Completa los campos marcados en rojo.</span>')
   }

   return bandera
}
PopupUsuario.prototype.hidden_Modal = function (e) {

   e.data.clear_Estilos(e)
   e.data.clear_Formulario(e)
}
PopupUsuario.prototype.clear_Estilos = function (e) {

   e.data.$id_empleado.data('select2').$selection.removeClass("nova-has-error")
   e.data.$id_rol.data('select2').$selection.removeClass("nova-has-error")
   e.data.$id_formulario.find('#id_mensaje_error').remove()
}
PopupUsuario.prototype.clear_Formulario = function (e) {

   e.data.$id_empleado.data('select2').val(0)
   e.data.$id_rol.data('select2').val(0)
   e.data.$id_formulario.get(0).reset()
}
PopupUsuario.prototype.click_BotonGuardar = function (e) {

   e.data.clear_Estilos(e)

   if (e.data.$accion == "nuevo") {

      e.data.crear(e)
   }
   else if (e.data.$accion == "editar") {

      var pk = e.data.$id.attr("data-primarykey").slice(3)
      e.data.editar(e, pk)
   }

}
PopupUsuario.prototype.crear = function (e) {

   if (e.data.validar()) {
      $.ajax({
         url: url_usuario,
         method: "POST",
         headers: { "X-CSRFToken": appnova.galletita },
         data: {
            "numero_empleado": e.data.$id_empleado.val(),
            "empleado" : e.data.$id_empleado.find('option:selected').text(),
            "rol" : e.data.$id_rol.val(),
         },
         success: function (_response) {

            e.data.$id.modal('hide')
            //GRID RECARGAR
         },
         error: function (_response) {

            alertify.error("Ocurrio error al insertar Usuario")
         }
      })
   }
}
PopupUsuario.prototype.editar = function (e, _pk) {

   if (e.data.validar()) {
      $.ajax({
         url: url_usuario + _pk + "/",
         method: "PUT",
         headers: { "X-CSRFToken": appnova.galletita },
         data: {
            "rol" : e.data.$id_rol.val(),
         },
         success: function (_response) {

            e.data.$id.modal('hide')
            arbol.init_Components()
         },
         error: function (_response) {

            alertify.error("Ocurrio error al modificar Usuario")
         }
      })
   }
}

/*-----------------------------------------------*\
            OBJETO: popup filtro
\*-----------------------------------------------*/

function PopupFiltro(){

   this.$id = $('#id_tarjeta_filtros')
   this.$id_compania_filtro = $('#id_compania_filtro')
   this.$id_empleado_filtro = $('#id_empleado_filtro')
   this.$id_rol_filtro = $('#id_rol_filtro')
   this.$id_boton_buscar = $('#id_boton_buscar')
   this.$id_boton_limpiar = $('#id_boton_limpiar')
   this.init_Components()
   this.init_Events()
}
PopupFiltro.prototype.init_Components = function () {

   this.$id_compania_filtro.select2(appnova.get_ConfigSelect2())
   this.$id_rol_filtro.select2(appnova.get_ConfigSelect2())
}
PopupFiltro.prototype.init_Events = function () {

   this.$id_boton_buscar.on("click", this, this.click_BotonBuscar)
   this.$id_boton_limpiar.on("click", this, this.click_BotonLimpiar)
}
PopupFiltro.prototype.click_BotonBuscar = function (e) {

   e.data.preventDefault()
}
PopupFiltro.prototype.click_BotonLimpiar = function (e) {

   e.data.preventDefault()
}

/*-----------------------------------------------*\
            OBJETO: popup compania
\*-----------------------------------------------*/

function PopupCompania() {

   this.$id = $('#id_tarjeta_compania')
   this.$id_responsable = $('#id_responsable')
   this.$id_tarjeta_compania = $('#id_tarjeta_compania')
   this.init_Components()
   this.init_Events()
}
PopupCompania.prototype.init_Components = function () {

   this.$id_responsable.multiSelect(this.get_ConfMultiselect())
}
PopupCompania.prototype.init_Events = function () {

   
}
PopupCompania.prototype.get_ConfMultiselect = function () {
    
    return {
        selectableHeader: "<input type='text' class='form-control search-input' autocomplete='off' placeholder='Búscar compañia'>",
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
PopupCompania.prototype.ocultar = function (e) {

   // e.preventDefault()
   // e.data.$id_tarjeta_acciones.modal('hide')
}