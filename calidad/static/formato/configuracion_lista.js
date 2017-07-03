/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:api-
//var url_empleados_bypage = window.location.origin + "/api-ebs/viewempleadosfull_bypage/"

// OBJS
var popup_formato = null
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
   
   this.$id_boton_nuevo_formato = $('#id_boton_nuevo_formato')
   popup_formato = new PopupFormato()
}

/*-----------------------------------------------*\
            OBJETO: grid
\*-----------------------------------------------*/

function Grid() {

   this.$id_grid_formato = $('#id_grid_formato')
   this.init_Events()
}
Grid.prototype.init_Events = function () {

   this.$id_grid_formato.on("click", '.clickable-row', this.click_FilaGrid)
}
Grid.prototype.click_FilaGrid = function (e) {

   $(this).addClass('nova-active-row').siblings().removeClass('nova-active-row')
}

/*-----------------------------------------------*\
            OBJETO: popup formato
\*-----------------------------------------------*/

function PopupFormato(){

   this.$id_revision = $('#id_revision')
   this.$id_vigencia_input = $('#id_vigencia_input')
   this.$id_vigencia = $('#id_vigencia')
   this.$id_codigo = $('#id_codigo')
   this.$id_descripcion = $('#id_descripcion')
   this.$id_boton_guardar = $('#id_boton_guardar')
   this.init_Components()
   this.init_Events()
}
PopupFormato.prototype.init_Components = function () {

   this.$id_vigencia_input.datetimepicker(this.get_DateTimePickerConfig())
   this.$id_vigencia.mask(
            "9999-99-99",
            {
                  placeholder:"aaaa/mm/dd"
            }
      )
   this.$id_descripcion.wysihtml5(appnova.get_ConfWysi())
}
PopupFormato.prototype.init_Events = function () {

   this.$id_boton_guardar.on("click", this, this.click_BotonGuardar)
}
PopupFormato.prototype.click_BotonGuardar = function (e) {

   e.data.preventDefault()
}
PopupFormato.prototype.get_DateTimePickerConfig = function () {
      
   return {
         autoclose: true,
         orientation: "bottom left",
         minViewMode: 2,
         format: "yyyy-mm-dd",
   }
}
