/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:api-
//var url_empleados_bypage = window.location.origin + "/api-ebs/viewempleadosfull_bypage/"

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
   
   this.toolbar = new ToolBar()
   this.grid = new Grid()
}

/*-----------------------------------------------*\
            OBJETO: toolbar
\*-----------------------------------------------*/

function ToolBar() {
   
   popup_usuario = new PopupUsuario()
   popup_filtro = new PopupFiltro()
   this.$id_boton_nuevo_usuario = $('#id_boton_nuevo_usuario')
   this.$id_boton_filtros = $('#id_boton_filtros')
}

/*-----------------------------------------------*\
            OBJETO: grid
\*-----------------------------------------------*/

function Grid() {

   popup_compania = new PopupCompania()
   this.$id_grid_usuario = $('#id_grid_usuario')
   this.init_Events()
}
Grid.prototype.init_Events = function () {

   this.$id_grid_usuario.on("click", '.clickable-row', this.click_FilaGrid)
}
Grid.prototype.click_FilaGrid = function (e) {

   $(this).addClass('nova-active-row').siblings().removeClass('nova-active-row')
}

/*-----------------------------------------------*\
            OBJETO: popup rol
\*-----------------------------------------------*/

function PopupUsuario(){

   this.$id_compania = $('#id_compania')
   this.$id_empleado = $('#id_empleado')
   this.$id_rol = $('#id_rol')
   this.$id_boton_guardar = $('#id_boton_guardar')
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
}
PopupUsuario.prototype.click_BotonGuardar = function (e) {

   e.preventDefault()
}

/*-----------------------------------------------*\
            OBJETO: popup filtro
\*-----------------------------------------------*/

function PopupFiltro(){

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