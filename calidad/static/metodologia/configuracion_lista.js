/*-----------------------------------------------*\
         GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:
var url_metodologia_bypage = window.location.origin + "/api-calidad/metodologia_bypage/"

// OBJS
var tarjeta_resultados = null
var popup_metodologia = null

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
   
   popup_metodologia = new PopupMetodologia()
   this.$id_boton_nuevo = $('#id_boton_nuevo')
   this.init_Events()
}
ToolBar.prototype.init_Events = function () {
   
   this.$id_boton_nuevo.on("click", this, this.click_BotonNuevo)
}
ToolBar.prototype.click_BotonNuevo = function (e) {

   popup_metodologia.mostrar("nuevo")
}

/*-----------------------------------------------*\
         OBJETO: popup nuevo
\*-----------------------------------------------*/

function PopupMetodologia() {
   
   this.$id = $('#id_tarjeta_metodologia')
   this.$id_boton_guardar = $('#id_boton_guardar_metodologia')
   this.$id_metodologia = $('#id_metodologia')
   this.$id_formulario = $('#id_formulario_metodologia')
   this.init_Events()
}
PopupMetodologia.prototype.init_Events = function () {

   this.$id_boton_guardar.on('click', this, this.click_BotonGuardar)
   this.$id.on('hidden.bs.modal', this, this.hidden_Modal)
   this.$id.on('shown.bs.modal', this, this.shown_Modal)
}
PopupMetodologia.prototype.mostrar = function (_accion) {

   this.$id.modal("show")
   this.$accion = _accion
}
PopupMetodologia.prototype.validar = function () {

   var bandera = true

   if ( appnova.validar_EspaciosSaltos(this.$id_metodologia.val()) == "") {

      this.$id_metodologia.addClass("nova-has-error")
      bandera = false
   }

   if ( !bandera ){

      this.$id_formulario.prepend('<span id="id_mensaje_error">Completa los campos marcados en rojo.</span>')
   }

   return bandera
}
PopupMetodologia.prototype.hidden_Modal = function (e) {

   e.data.clear_Estilos(e)
   e.data.clear_Formulario(e)
}
PopupMetodologia.prototype.shown_Modal = function (e) {

   e.data.$id_metodologia.focus()
}
PopupMetodologia.prototype.clear_Estilos = function (e) {

   e.data.$id_metodologia.removeClass("nova-has-error")
   e.data.$id_formulario.find('#id_mensaje_error').remove()
}
PopupMetodologia.prototype.clear_Formulario = function (e) {

   e.data.$id_metodologia.val("")
   e.data.$id_formulario.get(0).reset() //Limpia los campos seleccionados por medio de la cache del navegador
   e.data.$id_boton_guardar.removeAttr("disabled")
}
PopupMetodologia.prototype.click_BotonGuardar = function (e) {

   if (e.data.$accion == "nuevo") {

      e.data.clear_Estilos(e)
      e.data.crear(e)
   }
}
PopupMetodologia.prototype.crear = function (e) {

   if (e.data.validar()) {
         
      $.ajax({
         url: url_metodologia_bypage,
         method: "POST",
         headers: { "X-CSRFToken": appnova.galletita },
         data: {
            "metodologia" : e.data.$id_metodologia.val(),
         },
         success: function (_response) {

            e.data.$id_boton_guardar.attr("disabled" ,"disabled")
            e.data.$id.modal('hide')
            tarjeta_resultados.grid.buscar()
         },
         error: function (_response) {

            alertify.error("Ocurrio error al insertar metodologia")
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
 
            url: url_metodologia_bypage,
            type: "GET",
            dataType: "json",
         }

      },
      change: function (e) {

         if (e.action == "itemchange" ) {
            
            var pk = e.items[0].pk
            var metodologia = e.items[0].metodologia
            
            if ( !(appnova.validar_EspaciosSaltos(metodologia) == "") ) {
               tarjeta_resultados.grid.update_Metodologia(pk, metodologia)
            }
         }
      },
      schema: {

         data: "results",
         total: "count",
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
Grid.prototype.update_Metodologia = function (_pk, _metodologia) {

   data = {
      'metodologia': _metodologia 
   }

   $.ajax({

      url: url_metodologia_bypage + _pk +"/",
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

      metodologia: { type:"string", editable:true },
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
      {  field: "metodologia", title: "Metodologia", width: "45%"
      }
   ]
}
Grid.prototype.click_BotonEliminar = function (_id) {

   var url = url_metodologia_bypage + _id + "/"
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