/*-----------------------------------------------*\
         GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:
var url_subproceso = window.location.origin + "/api-calidad/subproceso/"
var url_responsable = window.location.origin + "/api-calidad/responsable/"

// OBJS
var popup_proceso = null
var popup_acciones = null
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

function TarjetaResultados(){


   this.toolbar = new ToolBar()
   this.grid = new Grid()
}

/*-----------------------------------------------*\
         OBJETO: ToolBar
\*-----------------------------------------------*/

function ToolBar() {

   popup_proceso = new PopupProceso()
}

/*-----------------------------------------------*\
         OBJETO: Grid
\*-----------------------------------------------*/

function Grid() {

   popup_acciones = new PopupAcciones()
   this.$id = $('#id_grid_proceso')
   this.$pk
   this.$pk_pro
   this.init_Events()
}
Grid.prototype.init_Events = function () {

   this.$id.on("click", '.clickable-row', this.click_FilaGrid)
   this.$id.on("click", '[data-event=\'acciones\']', this.click_BotonAcciones )
}
Grid.prototype.click_FilaGrid = function (e) {

   $(this).addClass('nova-active-row').siblings().removeClass('nova-active-row')
}
Grid.prototype.click_BotonAcciones = function (e) {

   tarjeta_resultados.grid.$pk = $(this).attr("data-id")
   tarjeta_resultados.grid.$pk_pro = $(this).attr("data-id-pro")
}

/*-----------------------------------------------*\
         OBJETO: Popup proceso
\*-----------------------------------------------*/

function PopupProceso() {

   this.$id = $('#id_tarjeta_proceso')
   this.$id_proceso = $('#id_proceso')
   this.$id_subproceso = $('#id_subproceso')
   this.$id_rep_subproceso = $('#id_rep_subproceso')
   this.$id_fecha_programada_ini = $('#id_fecha_programada_ini_group')
   this.$id_fecha_programada_fin = $('#id_fecha_programada_fin_group')
   this.$id_auditor = $('#id_auditor')
   this.$id_sitio = $('#id_sitio')
   this.$id_subproceso_existe = $('#id_subproceso_existe')
   this.$bandera = true

   this.init_Components()
   this.init_Events()
   this.init_ErrorEvents()
}
PopupProceso.prototype.init_Components = function () {

   this.$id_proceso.select2(appnova.get_ConfigSelect2())
   this.$id_subproceso.select2(appnova.get_ConfigSelect2())
   this.$id_rep_subproceso.select2(appnova.get_ConfigSelect2())
   this.$id_fecha_programada_ini.datepicker(appnova.get_ConfDatePicker())
   this.$id_fecha_programada_fin.datepicker(appnova.get_ConfDatePicker())
   this.$id_auditor.select2(appnova.get_ConfigSelect2())
   this.$id_sitio.select2(appnova.get_ConfigSelect2())

}
PopupProceso.prototype.init_Events = function () {

   this.$id_proceso.on("change", this, this.change_SelectProceso)
   this.$id.on("hidden.bs.modal", this, this.hidden_Modal)
   this.$id.on("show.bs.modal", this, this.show_Modal)
}
PopupProceso.prototype.init_ErrorEvents = function () {

   if (this.$id_subproceso_existe.val()) {
      alertify.warning(this.$id_subproceso_existe.val())
   }
}
PopupProceso.prototype.change_SelectProceso = function (e) {

   if (e.data.$bandera) {

      e.data.set_Subproceso(e)
      e.data.set_RepresentanteSubproceso(e)
   }
}
PopupProceso.prototype.set_Subproceso = function (e) {

   $.ajax({

       url: url_subproceso,
       method: "GET",
       context: this,
       data: {

         "proceso_id" : e.data.$id_proceso.val()
       },
       success: function (_response) {

          var data = []
          for (var i = 0; i < _response.length; i++) {
            data.push({id:_response[i].pk, text:_response[i].subproceso })
          }

          this.$id_subproceso.select2('destroy').empty().select2({data:data})
       },
       error: function (_response) {

          alertify.error("Ocurrio error al cargar datos")
       }
    })
}
PopupProceso.prototype.set_RepresentanteSubproceso = function (e) {

   $.ajax({

       url: url_responsable,
       method: "GET",
       context: this,
       data: {

         "proceso_id" : e.data.$id_proceso.val()
       },
       success: function (_response) {

          var data = []
          for (var i = 0; i < _response.length; i++) {
            data.push({id:_response[i].pk, text:_response[i].numero_empleado + " : " + _response[i].nombre_completo })
          }

          this.$id_rep_subproceso.select2('destroy').empty().select2({data:data})
       },
       error: function (_response) {

          alertify.error("Ocurrio error al cargar datos")
       }
    })
}
PopupProceso.prototype.hidden_Modal = function (e) {

   e.data.$bandera = false
   e.data.$id_proceso.data('select2').val(0)
   e.data.$id_subproceso.data('select2').val(0)
   e.data.$id_rep_subproceso.data('select2').val(0)
   e.data.$id_fecha_programada_ini.val("")
   e.data.$id_fecha_programada_fin.val("")
   e.data.$id_auditor.data('select2').val(0)
   e.data.$id_sitio.data('select2').val(0)
}
PopupProceso.prototype.show_Modal = function (e) {

   e.data.$bandera = true;
}

/*-----------------------------------------------*\
         OBJETO: Popup acciones
\*-----------------------------------------------*/

function PopupAcciones () {

   this.$id = $('#id_tarjeta_acciones')
   this.$id_boton_check_list = $('#id_boton_check_list')
   this.$id_boton_reporta_auditoria = $('#id_boton_reporta_auditoria')
   this.$id_boton_editar = $('#id_boton_editar')
   this.init_Events()
}
PopupAcciones.prototype.init_Events = function () {

   this.$id_boton_check_list.on("click", this, this.click_BotonCheckList)
   this.$id_boton_reporta_auditoria.on("click", this, this.click_BotonReporteAuditoria)
}
PopupAcciones.prototype.click_BotonCheckList = function (e) {

   window.open(window.location.origin + "/auditorias/" + tarjeta_resultados.grid.$pk + "/procesos/" + tarjeta_resultados.grid.$pk_pro + "/check_list/")
}
PopupAcciones.prototype.click_BotonReporteAuditoria = function (e) {

   e.preventDeafult()
}
