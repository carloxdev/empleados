/*-----------------------------------------------*\
         GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:
var url_sitio = window.location.origin + "/api-calidad/sitio/"

// OBJS
var tarjeta_resultados = null
var popup_sitio = null

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
   this.grid = new Grid()
}

/*-----------------------------------------------*\
         OBJETO: ToolBar
\*-----------------------------------------------*/

function ToolBar() {
   
   popup_sitio = new PopupSitio()
   this.$id_boton_nuevo = $('#id_boton_nuevo')
   this.init_Events()
}
ToolBar.prototype.init_Events = function () {
   
   this.$id_boton_nuevo.on("click", this, this.click_BotonNuevo)
}
ToolBar.prototype.click_BotonNuevo = function (e) {

   popup_sitio.mostrar("nuevo")
}

/*-----------------------------------------------*\
         OBJETO: popup nuevo
\*-----------------------------------------------*/

function PopupSitio() {
   
   this.$id = $('#id_tarjeta_sitio')
   this.$id_boton_guardar = $('#id_boton_guardar_sitio')
   this.$id_sitio = $('#id_sitio')
   this.$id_formulario = $('#id_formulario_sitio')
   this.init_Events()
}
PopupSitio.prototype.init_Events = function () {

   this.$id_boton_guardar.on('click', this, this.click_BotonGuardar)
   this.$id.on('hidden.bs.modal', this, this.hidden_Modal)
}
PopupSitio.prototype.mostrar = function (_accion) {

   this.$id.modal("show")
   this.$accion = _accion
}
PopupSitio.prototype.validar = function () {

   var bandera = true

   if ( this.$id_sitio.val() == "") {
      this.$id_sitio.addClass("nova-has-error")
      bandera = false
   }

   if ( !bandera ){
      this.$id_formulario.prepend('<span id="id_mensaje_error">Completa los campos marcados en rojo.</span>')
   }

   return bandera
}
PopupSitio.prototype.hidden_Modal = function (e) {

   e.data.clear_Estilos(e)
   e.data.clear_Formulario(e)
}
PopupSitio.prototype.clear_Estilos = function (e) {

   e.data.$id_sitio.removeClass("nova-has-error")
   e.data.$id_formulario.find('#id_mensaje_error').remove()
}
PopupSitio.prototype.clear_Formulario = function (e) {

   e.data.$id_sitio.val("")
   e.data.$id_formulario.get(0).reset() //Limpia los campos seleccionados por medio de la cache del navegador
}
PopupSitio.prototype.click_BotonGuardar = function (e) {

   if (e.data.$accion == "nuevo") {

      e.data.clear_Estilos(e)
      e.data.crear(e)
   }
}
PopupSitio.prototype.crear = function (e) {

   if (e.data.validar()) {
         
      $.ajax({
         url: url_sitio,
         method: "POST",
         headers: { "X-CSRFToken": appnova.galletita },
         data: {
            "sitio" : e.data.$id_sitio.val(),
         },
         success: function (_response) {

            e.data.$id.modal('hide')
            tarjeta_resultados.grid.buscar()
   
         },
         error: function (_response) {

            alertify.error("Ocurrio error al insertar Sitio")
         }
      })
   }
}

/*-----------------------------------------------*\
         OBJETO: Grid
\*-----------------------------------------------*/

function Grid() {

   this.$id = $("#grid_resultados")
   this.kfuente_datos = null
   this.kgrid = null
   this.init()
}
Grid.prototype.init = function () {

   kendo.culture("es-MX")
   this.kfuente_datos = new kendo.data.DataSource(this.get_DataSourceConfig())
   this.kgrid = this.$id.kendoGrid(this.get_Configuracion())
}
Grid.prototype.get_DataSourceConfig = function (e) {

   return {

      serverPaging: true,
      pageSize: 10,
      transport: {
         read: {
 
            url: url_sitio,
            type: "GET",
            dataType: "json",
         }
      },
      change: function (e) {

         if (e.action == "itemchange" ) {
             var pk = e.items[0].pk
             var sitio = e.items[0].sitio
             tarjeta_resultados.grid.update_Sitio(pk, sitio)
         }
      },
      schema: {

          model: {
               id: "pk",
               fields: this.get_Campos()
          }
      },
      error: function (e) {
         alertify.error("Status: " + e.status + "; Error message: " + e.errorThrown)
      },
   }    
}
Grid.prototype.update_Sitio = function (_pk, _sitio) {

   data = {
      'sitio': _sitio 
   }

   $.ajax({

      url: url_sitio + _pk +"/",
      data : JSON.stringify(data),
      type: "PUT",
      headers: { "X-CSRFToken": appnova.galletita },
      contentType: "application/json; charset=utf-8",

      success: function (_response) {
         tarjeta_resultados.grid.buscar()
         alertify.success("Registro modificado con exito.")
      },
      error: function (_response) {
         alertify.error("Ocurrio un error al modificar")
      }
   })
}
Grid.prototype.get_Campos = function () {

   return {

      sitio: { type:"string", editable:true },
   }
}
Grid.prototype.get_Configuracion = function () {

   return {
      dataSource: this.kfuente_datos,
      columnMenu: true,
      groupable: false,
      sortable: false,
      resizable: true,
      selectable: true,
      scrollable: false,
      columns: this.get_Columnas(),
      scrollable: true,
      editable: true,
      pageable: true,
      dataBound: this.onDataBound,
      noRecords: {
         template: "<div class='nova-grid-empy'> No se encontrarón registros </div>"
      },
   }
}
Grid.prototype.onDataBound = function (e) {

   e.sender.tbody.find("[data-event='eliminar']").each(function(idx, element){
        
      $(this).on("click", function(){

         tarjeta_resultados.grid.click_BotonEliminar(this.id)
      })
   })
}
Grid.prototype.get_Columnas = function () {

   return  [
      {  template: '<a class="btn nova-btn btn-default nova-btn-delete" id="#=id#" data-event="eliminar"> <i class="icon icon-left icon mdi mdi-delete nova-white"></i></a>',
         width: '75px',
      },
      {  field: "sitio", title: "Sitio", width: "45%"
      }
   ]
}
Grid.prototype.click_BotonEliminar = function (_id) {

   var url = url_sitio + _id + "/"
   tarjeta_resultados.grid.eliminar(url)
}
Grid.prototype.eliminar = function (_url) {
   
   alertify.confirm(
      'Eliminar Registro',
      '¿Desea Eliminar este registro?.',
      function () {

         var url = _url

         $.ajax({
            url: url,
            method: "DELETE",
            headers: { "X-CSRFToken": appnova.galletita },
            success: function () {

               alertify.success("Se eliminó registro correctamente")
                    
               tarjeta_resultados.grid.buscar()
            },
            error: function () {
            
            alertify.error("Ocurrió un error al eliminar")
            }
         })
      }, 
      null
   )    
}
Grid.prototype.buscar = function() {
   
   this.kfuente_datos.page(1)
}