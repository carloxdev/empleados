/*-----------------------------------------------*\
         GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:
var url_hallazgo = window.location.origin + "/api-calidad/hallazgoproceso/"
var url_profile = window.location.origin + "/api-seguridad/profile/"

// OBJS
var popup_hallazgo = null
var popup_filtros = null
var popup_acciones = null
var tarjeta_resultados = null

/*-----------------------------------------------*\
         LOAD
\*-----------------------------------------------*/

$(document).ready(function () {

   tarjeta_resultados = new TarjetaResultados()
   popup_filtros.apply_Filters()
})

/*-----------------------------------------------*\
         OBJETO: Tarjeta resultados
\*-----------------------------------------------*/

function TarjetaResultados() {

   this.toolbar = new ToolBar()
   this.grid = new Grid()
}

/*-----------------------------------------------*\
         OBJETO: Toolbar
\*-----------------------------------------------*/

function ToolBar() {

   popup_hallazgo = new PopupHallazgo()
   popup_filtros = new PopupFiltros()
   this.$id_boton_nuevo = $('#id_boton_nuevo')
   this.$boton_filtros = $('#id_boton_filtros')
   this.init_Events()
}
ToolBar.prototype.init_Events = function () {

   this.$id_boton_nuevo.on("click", this, this.click_BotonNuevo)
}
ToolBar.prototype.click_BotonNuevo = function (e) {

    popup_hallazgo.mostrar(0, "nuevo")
}
ToolBar.prototype.change_BotonFiltros = function (_no_filtros) {

   html = "<i class='icon icon-left mdi mdi-search nova-white'></i> Filtros <span class='badge nova-border-bottom'>no_filtros</span>".replace("no_filtros", _no_filtros)

   this.$boton_filtros.html(html)
}
ToolBar.prototype.restart_BotonFiltros = function () {

   this.$boton_filtros.html("<i class='icon icon-left mdi mdi-search nova-white'></i> Filtros")
}

/*-----------------------------------------------*\
         OBJETO: Grid
\*-----------------------------------------------*/

function Grid() {

   popup_acciones = new PopupAcciones()
   this.$id_grid_hallazgo = $('#id_grid_hallazgo')
   this.init_Events()
}
Grid.prototype.init_Events = function () {

   this.$id_grid_hallazgo.on("click", '.clickable-row', this.click_FilaGrid)
   this.$id_grid_hallazgo.on("click", '[data-event=\'acciones\']', this.click_BotonAcciones )
   this.$id_grid_hallazgo.on("click", '[data-event=\'cerrar\']', this.click_BotonCerrar )
}
Grid.prototype.click_FilaGrid = function (e) {

   $(this).addClass('nova-active-row').siblings().removeClass('nova-active-row')
}
Grid.prototype.click_BotonAcciones = function (e) {

   pk = this.getAttribute("data-primaryKey")
   popup_acciones.mostrar(pk)
}
Grid.prototype.click_BotonCerrar = function (e) {

   pk = this.getAttribute("data-primaryKey")
   tarjeta_resultados.grid.get_Data(pk)
}
Grid.prototype.get_Data = function (_pk) {

   $.ajax({

      url: url_hallazgo + _pk +"/",
      method: "GET",
      context: this,
      success: function (_response) {

         this.cerrar_hallazgo(_pk, _response)
      },
      error: function (_response) {

         alertify.error("Ocurrio error al cargar datos")
      }
   })
}
Grid.prototype.cerrar_hallazgo = function (_pk, _response) {

   $.ajax({
      url: url_hallazgo + _pk + "/",
      method: "PUT",
      headers: { "X-CSRFToken": appnova.galletita },
      data: {

         "titulo": _response.titulo,
         "proceso": _response.proceso,
         "estado": _response.estado,
         "tipo_hallazgo": _response.tipo_hallazgo,
         "observacion": _response.observacion,
         "cerrado": "Si",
         "update_by": url_profile + appnova.$user + "/",
      },
      success: function (_response) {

         //Recargar
         alertify.success("Hallazgo cerrado con éxito.")
      },
      error: function (_response) {

         alertify.error("Ocurrio error al cerrar hallazgo")
      }
   })
}

/*-----------------------------------------------*\
         OBJETO: PopupHallazgo
\*-----------------------------------------------*/

function PopupHallazgo(){

   this.$id = $('#id_tarjeta_hallazgo')
   this.$id_titulo = $('#id_titulo')
   this.$id_subproceso = $('#id_subproceso')
   this.$id_requisito_referencia = $('#id_requisito_referencia')
   this.$id_descripciones = $('#id_descripciones')
   this.$id_tipo_hallazgo = $('#id_tipo_hallazgo')
   this.$id_observaciones = $('#id_observaciones')
   this.$id_titulo = $('#id_popup_hallazgo_titulo')
   this.$accion
   this.init_Components()
}
PopupHallazgo.prototype.init_Components = function () {

   this.$id_subproceso.select2(appnova.get_ConfigSelect2())
   this.$id_requisito_referencia.multiselect(this.get_ConfMultiSelect())
   this.$id_requisito_referencia.siblings("div.btn-group").find("ul.multiselect-container").addClass('nova-bootstrap-multiselect-width-ul')
   this.$id_descripciones.multiselect(this.get_ConfMultiSelect())
   this.$id_descripciones.siblings("div.btn-group").find("ul.multiselect-container").addClass('nova-bootstrap-multiselect-width-ul')
   this.$id_tipo_hallazgo.select2(appnova.get_ConfigSelect2())
}
PopupHallazgo.prototype.get_ConfMultiSelect = function () {

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
PopupHallazgo.prototype.mostrar = function (_pk, _accion) {

   this.$id.modal("show").attr("data-primaryKey", _pk)
   this.$accion = _accion

   if (_accion == "nuevo") {

      this.$id_titulo.text('Nuevo Hallazgo')
   }
   else if (_accion == "editar") {

      this.$id_titulo.text('Editar Hallazgo')
      this.set_Data(_pk)
   }
}

/*-----------------------------------------------*\
         OBJETO: popup filtros
\*-----------------------------------------------*/

function PopupFiltros() {

   this.$id = $('#id_tarjeta_filtros')
   this.$id_titulo_filter = $('#id_titulo_filter')
   this.$id_tipo_hallazgo_filter = $('#id_tipo_hallazgo_filter')
   this.$id_estado_filter = $('#id_estado_filter')
   this.$id_cerrado_filter = $("input[name='cerrado']")

   this.$id_boton_buscar = $('#id_boton_buscar')
   this.$id_boton_limpiar = $('#id_boton_limpiar')
   this.init_Components()
   this.init_Events()
}
PopupFiltros.prototype.init_Components = function () {

   this.$id_tipo_hallazgo_filter.select2(appnova.get_ConfigSelect2())
   this.$id_estado_filter.select2(appnova.get_ConfigSelect2())
}
PopupFiltros.prototype.init_Events = function () {

   this.$id_boton_buscar.on("click", this, this.click_BotonBuscar)
   this.$id_boton_limpiar.on("click", this, this.click_BotonLimpiar)
}
PopupFiltros.prototype.click_BotonBuscar = function (e) {

   e.data.$id.modal('hide')
}
PopupFiltros.prototype.click_BotonLimpiar = function (e) {

   e.data.$id_titulo_filter.val("")
   e.data.$id_tipo_hallazgo_filter.data('select2').val(0)
   e.data.$id_estado_filter.data('select2').val(0)
   e.data.$id_cerrado_filter.prop('checked', false)
}
PopupFiltros.prototype.apply_Filters = function () {

   var no_filtros = 0

   no_filtros = this.get_NoFiltrosAplicados()

   if (no_filtros != 0) {

        tarjeta_resultados.toolbar.change_BotonFiltros(no_filtros)
   }
   else {

        tarjeta_resultados.toolbar.restart_BotonFiltros()
   }

   this.$id.modal('hide')
}
PopupFiltros.prototype.get_NoFiltrosAplicados = function () {

   cantidad = 0

   if (this.$id_titulo_filter.val() != "") {
      cantidad += 1
   }
   if (this.$id_tipo_hallazgo_filter.val() != "") {
      cantidad += 1
   }
   if (this.$id_estado_filter.val() != "") {
      cantidad += 1
   }
   if ($("input[name='cerrado']:checked").val() != undefined) {
      cantidad += 1
   }

   return cantidad
}

/*-----------------------------------------------*\
         OBJETO: popup acciones
\*-----------------------------------------------*/

function PopupAcciones() {

   this.$id = $('#id_tarjeta_acciones')
   this.$id_boton_no_conformidad = $('#id_boton_no_conformidad')
   this.$id_boton_eliminar = $('#id_boton_eliminar')
   this.init_Events()
}
PopupAcciones.prototype.init_Events = function () {

   this.$id_boton_no_conformidad.on("click", this, this.click_BotonReporteNoConformidad)
   this.$id_boton_eliminar.on("click", this, this.click_BotonEliminar)
}
PopupAcciones.prototype.click_BotonReporteNoConformidad = function (e) {

   e.preventDefault()
   e.data.$id.modal('hide')
}
PopupAcciones.prototype.mostrar = function ( _pk ) {

   this.$id.modal('show').attr("data-primaryKey", _pk)
}
PopupAcciones.prototype.click_BotonEliminar = function (e) {

   pk = e.data.$id.attr("data-primaryKey")
   e.data.eliminar_Hallazgo(pk)
}
PopupAcciones.prototype.eliminar_Hallazgo = function (_pk) {

  alertify.confirm(
     'Eliminar Registro',
     '¿Desea Eliminar este registro?',
     function (e) {

        $.ajax({
           url: url_hallazgo +_pk + "/",
           method: "DELETE",
           headers: { "X-CSRFToken": appnova.galletita },
           success: function () {

              window.location.href = window.location.href
           },
           error: function () {

              alertify.error("Ocurrió un error al eliminar")
           }
        })
     },
     null
  )
}
