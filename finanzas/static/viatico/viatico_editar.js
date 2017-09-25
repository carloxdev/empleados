/* -------------------- GLOBAL VARIABLES -------------------- */

// URLS:
var url_viaticolineas = window.location.origin + "/api-finanzas/viaticolinea/"

// OBJS:
var cabecera = null
var lineas = null
var popup_linea = null


/* -------------------- LOAD -------------------- */

$(document).ready(function () {

    cabecera = new Cabecera()
    lineas = new Lineas()

    popup_linea = new PopupLinea()

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

    this.$boton_nuevo.on("click", this, this.click_BotonEditar)
}
Toolbar.prototype.click_BotonEditar = function() {

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
        concepto : { type: "string" },
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
    this.instancia.data("kendoGrid").tbody.on("click", ".btn-default", this.click_BotonEditar)
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
        dataBound: this.set_Columnas,
    }
}
Grid.prototype.get_Columnas = function () {
    return [
        {
            field: "slug",
            title: "#",
            width: "55px",
            template: '<button class="btn btn-default">#=slug#</button>',
        },
        {
            field: "concepto",
            title: "Concepto",
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

    popup_linea.open_ForEdit(fila.pk.toString(), fila.slug.toString())
}
Grid.prototype.set_Columnas = function (e) {

    // e.sender.tbody.find(".k-button.fa.fa-pencil").each(function(idx, element){
    //     $(element).removeClass("fa fa-pencil").find("span").addClass("fa fa-pencil")
    // })
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
    this.$formulario.parsley()
    this.$concepto.select2(appnova.get_ConfigSelect2())
}
PopupLinea.prototype.set_Events = function () {

    this.$id.on("shown.bs.modal", this, this.render)
    // this.$boton_guardar.on("click", this, this.click_BotonGuardar)

    this.$formulario.parsley().on('form:submit', this.click_BotonGuardar)
    this.$concepto.on("change", this, this.change_SelectConcepto)
}
PopupLinea.prototype.get_Fields = function () {

    return {
        "cabecera" : cabecera.$record_pk.text(),
        "concepto" : this.$concepto.val(),
        "observaciones" : this.$observaciones.val(),
        "importe" : this.calcular_ImporteTotal()
    }
}
PopupLinea.prototype.clear_Fields = function () {

    this.$concepto.val("").trigger('change')
    this.$observaciones.val("")
    this.$importe.val("")
}
PopupLinea.prototype.fill_Fields = function (_values) {

    this.$concepto.val(_values.concepto).trigger('change')
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

                return false
            },
            error: function (_response) {

               alertify.error("Ocurrio un error al guardar")
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
   }
   else {

      this.$importe.prop("readonly", true)
      this.$importe.val(parseInt(limite))
   }
}
PopupLinea.prototype.calcular_ImporteTotal = function () {

   var fecha_partida = this.fecha_ConFormato(cabecera.$fecha_partida.val())
   var fecha_regreso = this.fecha_ConFormato(cabecera.$fecha_regreso.val())
   var diferencia = fecha_regreso.getTime() - fecha_partida.getTime()
   var dias = Math.round(diferencia/1000/60/60/24) + 1

   var importe = this.$importe.val()

   return  dias * importe
}
PopupLinea.prototype.fecha_ConFormato = function (_fecha) {

   var fecha = _fecha.split('/')

   return new Date(fecha[1]+"/"+fecha[0]+"/"+fecha[2])
}
