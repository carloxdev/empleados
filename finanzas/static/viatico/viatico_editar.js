/* -------------------- GLOBAL VARIABLES -------------------- */

// URLS:
var url_viaticolineas = window.location.origin + "/api-finanzas/viaticolinea/"
var url_viaticocabecera = window.location.origin + "/api-finanzas/viaticocabecera/"

// OBJS:
var cabecera = null
var lineas = null
var popup_linea = null
var tarjeta_finalizar = null


/* -------------------- LOAD -------------------- */

$(document).ready(function () {

    cabecera = new Cabecera()
    lineas = new Lineas()

    popup_linea = new PopupLinea()
    tarjeta_finalizar = new TarjetaFinalizar()

    // Asigna eventos a teclas
    $(document).keypress(function (e) {

        // Tecla Enter
        if (e.which == 13) {

            if (popup_linea.$id.hasClass('in')) {
                popup_linea.click_BotonGuardar()
            }

        }
    })
})

/* -------------------- OBJETO: Cabecera -------------------- */

function Cabecera() {

    this.$record_pk = $('#cabecera_pk')
    this.$empleado_clave = $('#id_empleado_clave')
    this.$empleado_descripcion = $('#id_empleado_descripcion')
    this.$un_clave = $('#id_un_clave')
    this.$un_descripcion = $('#id_un_descripcion')
    this.$fecha_partida = $('#id_fecha_partida')
    this.$fecha_partida_input = $('#id_fecha_partida_input')
    this.$fecha_regreso = $('#id_fecha_regreso')
    this.$fecha_regreso_input = $('#id_fecha_regreso_input')

    this.$ciudad_destino = $('#id_ciudad_destino')
    this.$proposito_viaje = $('#id_proposito_viaje')

    this.$importe_total = $('#importe_total')

    this.init()
    this.set_Events()
}
Cabecera.prototype.init = function () {

    this.$empleado_clave.select2()
    this.$un_clave.select2()
    this.$fecha_partida_input.datepicker(appnova.get_ConfDatePicker())
    this.$fecha_regreso_input.datepicker(appnova.get_ConfDatePicker())
}
Cabecera.prototype.set_Events = function () {

    this.$empleado_clave.on("change", this, this.seleccionar_ComboBoxEmpleado)
    this.$un_clave.on("change", this, this.seleccionar_ComboBoxUnidadNegocio)

}
Cabecera.prototype.seleccionar_ComboBoxEmpleado = function(e) {

    var value_select = e.data.$empleado_clave.find(":selected").text()

    e.data.$empleado_descripcion.val(
        Miner.get_TextFromSelectOption(value_select)
    )
}
Cabecera.prototype.seleccionar_ComboBoxUnidadNegocio = function(e) {

    var value_select = e.data.$un_clave.find(":selected").text()

    e.data.$un_descripcion.val(
        Miner.get_TextFromSelectOption(value_select)
    )
}


/* -------------------- OBJETO: Lineas -------------------- */

function Lineas() {

    this.toolbar = new Toolbar()
    this.grid = new Grid()
}


/* -------------------- OBJETO: Toolbar -------------------- */

function Toolbar() {

    this.$boton_nuevo = $('#boton_nuevo')
    this.$boton_exportar = $('#boton_exportar')

    this.set_Events()
}
Toolbar.prototype.set_Events = function() {

    this.$boton_nuevo.on("click", this, this.click_BotonNuevo)
}
Toolbar.prototype.click_BotonNuevo = function() {

    popup_linea.open_ForNew()
}

/* -------------------- OBJETO: FuenteDatos -------------------- */

function FuenteDatos() {
    this.instancia = null
    this.init()
}
FuenteDatos.prototype.init = function() {
    this.instancia = new kendo.data.DataSource(this.get_Configuracion())
}
FuenteDatos.prototype.get_Configuracion = function () {

    return {

        serverPaging: true,
        transport: {
            read: {
                url: url_viaticolineas,
                type: "GET",
                dataType: "json",
            },
            parameterMap: function (data, action) {
                if (action === "read") {
                    return {
                        cabecera: cabecera.$record_pk.text()
                    }
                }
            }
        },
        schema: {
            model: {
                fields: this.get_Campos()
            }
        },
        error: function (e) {
            alertify.error("Status: " + e.status + "; Error message: " + e.errorThrown)
        },
    }
}
FuenteDatos.prototype.get_Campos = function () {

    return {
        pk : { type: "number" },
        slug : { type: "string" },
        concepto_clave : { type: "string" },
        concepto_descripcion : { type: "string" },
        observaciones : { type: "string" },
        importe : { type: "decimal" },
    }
}


/* -------------------- OBJETO: Grid -------------------- */

function Grid() {

    this.$id = $("#grid_lineas")
    this.fuente_datos = null
    this.instancia = null
    this.init()
    this.set_Events()
}
Grid.prototype.init = function () {

    // Definicion del pais, formato modena, etc..
    kendo.culture("es-MX")

    // Se inicializa la fuente da datos (datasource)
    fdatos = new FuenteDatos()
    this.fuente_datos = fdatos.instancia

    // Se inicializa y configura el grid:
    this.instancia = this.$id.kendoGrid(this.get_Configuracion())
}
Grid.prototype.set_Events = function () {

    this.instancia.data("kendoGrid").tbody.on("click", "[data-event='editar']", this.click_BotonEditar)
}
Grid.prototype.get_Configuracion = function () {

    return {
        dataSource: this.fuente_datos,
        columnMenu: false,
        groupable: false,
        sortable: false,
        editable: false,
        resizable: true,
        selectable: true,
        columns: this.get_Columnas(),
        scrollable: true,
        pageable: false,
        noRecords: {
            template: "<div class='nova-grid-empy'> Sin Lineas/Gastos </div>"
        },
        dataBound: this.onDataBound,
    }
}
Grid.prototype.get_Columnas = function () {
    return [

        {   template: '<a class="btn nova-btn btn-default nova-btn-delete" id="#=pk#" data-event="eliminar"> <i class="icon icon-left icon mdi mdi-delete nova-white"></i></a>',
            width: '75px',
        },
        {
            field: "slug",
            title: "#",
            width: "55px",
        },
        {
            field: "concepto_clave",
            title: "Concepto Clave",
            width:"180px"
        },
        {
            field: "concepto_descripcion",
            title: "Concepto Descripción",
            width:"180px"
        },
        { field: "observaciones", title: "observaciones", width:"300px" },
        {
            field: "importe",
            title: "Importe",
            format: '{0:n2}',
            attributes:{ style:"text-align:right;" },
            headerAttributes:{ style:"text-align:right;" }
        },
    ]
}
Grid.prototype.click_BotonEditar = function (e) {

    e.preventDefault()
    row = $(e.currentTarget).closest('tr')
    fila = lineas.grid.instancia.data("kendoGrid").dataItem(row)

   //  popup_linea.open_ForEdit(fila.pk.toString(), fila.slug.toString())
}
Grid.prototype.onDataBound = function (e) {

   e.sender.tbody.find("[data-event='eliminar']").each(function(idx, element){

      $(this).on("click", function(){

         lineas.grid.click_BotonEliminar(this.id)
      })
   })

   lineas.grid.validar_Estado()
}
Grid.prototype.click_BotonEliminar = function (_id) {

   var url = url_viaticolineas + _id + "/"
   lineas.grid.eliminar(url)
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
               popup_linea.actualizar_ImporteTotal()
               lineas.grid.buscar()
            },
            error: function () {

               alertify.error("Ocurrió un error al eliminar")
            }
         })
      },
      null
   )
}
Grid.prototype.validar_Estado = function () {

   $.ajax({
      url: url_viaticocabecera + cabecera.$record_pk.text() + "/",
      method: "GET",
      success: function (_response) {

         if (_response.status == "fin") {

            tarjeta_finalizar.disabled_Buttons()
         }
      },
      error: function (_response) {
         alertify.error("Ocurrio error al consultar")
      }
   })
}
Grid.prototype.buscar = function() {
    this.fuente_datos.read()
}


/* -------------------- OBJETO: Popup Linea -------------------- */

function PopupLinea() {

    this.mode = ""
    this.record_pk = ""
    this.$record_slug = $('#linea_slug')
    this.$title = $('#linea_title')

    this.$id = $('#popup_linea')
    this.$formulario = null
    this.$formulario = $('#formulario_linea')
    this.$concepto = $('#id_concepto')
    this.$observaciones = $('#id_observaciones')
    this.$importe = $('#id_importe')
    this.$importe_dia_contendor = $('#importe_dia_contendor')
    this.$importe_dia = $('#importe_dia')

    this.$boton_guardar = $('#boton_guardar')

    this.init()
    this.set_Events()
}
PopupLinea.prototype.init = function () {

    this.$id.modal({
        backdrop: 'static',
        keyboard: false,
        show: false
    })
    this.$importe.val("")
    // this.$formulario =  $('#formulario_linea').parsley()
    this.$formulario.parsley({ excluded: "#id_concepto" })
    this.$concepto.select2(appnova.get_ConfigSelect2())
}
PopupLinea.prototype.set_Events = function () {

    this.$id.on("shown.bs.modal", this, this.render)
    this.$formulario.parsley().on('form:submit', this.click_BotonGuardar)
    this.$concepto.on("change", this, this.change_SelectConcepto)
}
PopupLinea.prototype.get_Fields = function () {

    return {
        "cabecera" : cabecera.$record_pk.text(),
        "concepto_clave" : this.$concepto.val(),
        "concepto_descripcion" : $('option:selected', this.$concepto).attr('data-status'),
        "observaciones" : this.$observaciones.val(),
        "importe" : this.$importe.val()
    }
}
PopupLinea.prototype.clear_Fields = function () {

    this.$concepto.val("").trigger('change')
    this.$observaciones.val("")
    this.$importe.val("")
}
PopupLinea.prototype.fill_Fields = function (_values) {

    this.$concepto.val(_values.concepto_clave).trigger('change')
    this.$observaciones.val(_values.observaciones)
    this.$importe.val(_values.importe)
}
PopupLinea.prototype.open_ForNew = function () {

    this.mode = "POST"

    this.$formulario.parsley().reset()
    this.clear_Fields()
    this.$title.html("Nuevo Gasto")
    this.$id.modal('show')
}
PopupLinea.prototype.open_ForEdit = function (_pk, _slug) {

    this.mode = "PATCH"
    this.record_pk = _pk

    this.$formulario.parsley().reset()
    this.clear_Fields()
    this.$record_slug.text(_slug)
    this.$title.html("Editar Gasto: " + this.$record_slug.html())

    this_obj = this

    $.ajax({
        url: url_viaticolineas,
        method: "GET",
        data: {
            "id": this_obj.record_pk,
        },
        success: function (response) {

            if (response.length != 0) {
                if(response.length === 1 ) {
                    this_obj.fill_Fields(response[0])
                    this_obj.$id.modal('show')
                }
                else {
                    alertify.error("Se encontraron varios registros")
                }
            }
            else {
                alertify.error("No se encontro el registro")
            }
        },
        error: function (response) {
            alertify.error("Ocurrio error al consultar")
        }
    })
}
PopupLinea.prototype.render = function (e) {

    e.data.$concepto.focus()
}
PopupLinea.prototype.click_BotonGuardar = function (e) {

    event.preventDefault()

    this_obj = popup_linea

    if (this_obj.$formulario.parsley().isValid()) {
        if (this_obj.mode === "PATCH") {

            url = url_viaticolineas + this_obj.record_pk + "/"
        }
        else { // Post

            url = url_viaticolineas
        }

        this_obj = this_obj
        $.ajax({

            url: url,
            data: JSON.stringify(this_obj.get_Fields()),
            method: this_obj.mode,
            headers: { "X-CSRFToken": appnova.galletita },
            contentType: "application/json; charset=utf-8",

            success: function (_response) {

                this_obj.$id.modal('hide')
                alertify.success("Se guardo exitosamente")
                lineas.grid.buscar()
                popup_linea.actualizar_ImporteTotal()

                return false
            },
            error: function (_response) {

               if (_response.responseJSON["importe"]) {

                  alertify.warning("El importe total para esta linea es muy alto.")
               }
               else {
                  alertify.error("Ocurrio un error al guardar")
               }

               return false
            }
        })
    }

    return false
}
PopupLinea.prototype.change_SelectConcepto = function (e) {

   e.data.set_Importe()
}
PopupLinea.prototype.set_Importe = function () {

   var limite = $('option:selected', this.$concepto).attr('data-text')

   if (limite == '0') {

      this.$importe.prop("readonly", false)
      this.$importe.val(0)
      this.$importe_dia_contendor.addClass('hidden')
      this.$importe_dia.html('')
   }
   else if (parseInt(limite) > 0){

      this.$importe_dia_contendor.removeClass('hidden')
      this.$importe_dia.html(limite)
      this.$importe.prop("readonly", true)

      var fecha_partida = this.fecha_ConFormato(cabecera.$fecha_partida.val())
      var fecha_regreso = this.fecha_ConFormato(cabecera.$fecha_regreso.val())
      var diferencia = fecha_regreso.getTime() - fecha_partida.getTime()
      var dias = Math.round(diferencia/1000/60/60/24) + 1

      var total_importe = dias * parseInt(limite)

      this.$importe.val(total_importe)
   }
   if (this.$concepto.val() == '') {

      this.$importe_dia_contendor.addClass('hidden')
      this.$importe_dia.html('')
   }
}
PopupLinea.prototype.fecha_ConFormato = function (_fecha) {

   var fecha = _fecha.split('/')

   return new Date(fecha[1]+"/"+fecha[0]+"/"+fecha[2])
}
PopupLinea.prototype.actualizar_ImporteTotal = function () {

   $.ajax({
      url: url_viaticocabecera + cabecera.$record_pk.text() + "/",
      method: "GET",
      success: function (_response) {

         cabecera.$importe_total.html(_response.importe_total)
      },
      error: function (_response) {
         alertify.error("Ocurrio error al consultar")
      }
   })
}

function TarjetaFinalizar () {

   this.$boton_finalizar_captura = $('#boton_finalizar_captura')
   this.init_Events()
}
TarjetaFinalizar.prototype.init_Events = function () {

   this.$boton_finalizar_captura.on("click", this, this.click_BotonFinalizar)
}
TarjetaFinalizar.prototype.click_BotonFinalizar = function (e) {

   e.data.disabled_Buttons()
}
TarjetaFinalizar.prototype.disabled_Buttons = function () {

   this.$boton_finalizar_captura.prop('disabled', true)

   lineas.grid.$id.find("[data-event='eliminar']").each(function(idx, element){

      $(this).attr('disabled','true')
   })
}
