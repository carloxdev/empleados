/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:api-
//var url_empleados_bypage = window.location.origin + "/api-ebs/viewempleadosfull_bypage/"

// OBJS
var popup_hallazgo = null
var popup_filtros = null
var popup_analisis = null
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

function TarjetaResultados() {

    popup_hallazgo = new PopupHallazgo()
    popup_filtros = new PopupFiltros()
    popup_analisis = new PopupAnalisis()
    popup_acciones = new PopupAcciones()
}

/*-----------------------------------------------*\
            OBJETO: popup nuevo
\*-----------------------------------------------*/

function PopupHallazgo(){

    this.$id_subproceso = $('#id_subproceso')
    this.$id_clasificacion_hallazgo = $('#id_clasificacion_hallazgo')
    this.$id_requisito_referencia = $('#id_requisito_referencia')
    this.$id_requisito_adicional = $('#id_requisito_adicional')
    this.$id_tipo_hallazgo = $('#id_tipo_hallazgo')
    this.init_Components()
}
PopupHallazgo.prototype.init_Components = function () {

    this.$id_subproceso.select2(appnova.get_ConfigSelect2())
    this.$id_clasificacion_hallazgo.select2(appnova.get_ConfigSelect2())
    this.$id_requisito_referencia.multiselect(this.get_ConfMultiSelect())
    this.$id_requisito_adicional.select2(appnova.get_ConfigSelect2())
    this.$id_tipo_hallazgo.select2(appnova.get_ConfigSelect2())
}
PopupHallazgo.prototype.get_ConfMultiSelect = function () {

    return{
        enableFiltering: true,
        buttonWidth: '100%',
        numberDisplayed: 2,
        maxHeight: 150,
        nonSelectedText: "Sin Selección",
        allSelectedText: "Todo Seleccionado",
        nSelectedText: "Seleccionados",
        filterPlaceholder: "Buscar",
    }
}

/*-----------------------------------------------*\
            OBJETO: popup filtros
\*-----------------------------------------------*/

function PopupFiltros(){

    this.$id_proceso = $('#id_proceso')
    this.$id_zona = $('#id_zona')
    this.$id_contrato = $('#id_contrato')
    this.$id_hallazgo = $('#id_hallazgo')
    this.$id_estado = $('#id_estado')
    this.$id_tipo_hallazgo_filtro = $('#id_tipo_hallazgo_filtro')
    this.$id_boton_buscar = $('#id_boton_buscar')
    this.$id_boton_limpiar = $('#d_boton_limpiar')
    this.init_Components()
    this.init_Events()
}
PopupFiltros.prototype.init_Components = function () {

    this.$id_proceso.select2(appnova.get_ConfigSelect2())
    this.$id_zona.select2(appnova.get_ConfigSelect2())
    this.$id_contrato.select2(appnova.get_ConfigSelect2())
    this.$id_estado.select2(appnova.get_ConfigSelect2())
    this.$id_tipo_hallazgo_filtro.select2(appnova.get_ConfigSelect2())
}
PopupFiltros.prototype.init_Events = function () {

    this.$id_boton_buscar.on("click", this, this.click_BotonBuscar)
    this.$id_boton_limpiar.on("click", this, this.click_BotonLimpiar)
}

/*-----------------------------------------------*\
            OBJETO: popup acciones
\*-----------------------------------------------*/

function PopupAcciones() {

    this.$id_tarjeta_acciones = $('#id_tarjeta_acciones')
    this.$id_boton_evidencias = $('#id_boton_evidencias')
    this.$id_boton_analisis_causas = $('#id_boton_analisis_causas')
    this.$id_boton_plan_accion = $('#id_boton_plan_accion')
    this.$id_boton_cerrar_hallazgo = $('#id_boton_cerrar_hallazgo')
    this.$id_boton_no_conformidad = $('#id_boton_no_conformidad')
    this.init_Events()
}
PopupAcciones.prototype.init_Events = function () {

    this.$id_boton_analisis_causas.on("click", this, this.ocultar)
}
PopupAcciones.prototype.ocultar = function (e) {

    e.preventDefault()
    e.data.$id_tarjeta_acciones.modal('hide')
}

/*-----------------------------------------------*\
            OBJETO: popup analisis
\*-----------------------------------------------*/

function PopupAnalisis() {

    this.$id_metodologia = $('#id_metodologia')
    this.$id_causas = $('#id_causas')
    this.init_Components()
}
PopupAnalisis.prototype.init_Components = function () {

    this.$id_metodologia.select2(appnova.get_ConfigSelect2())
    this.$id_causas.wysihtml5(appnova.get_ConfWysi())
}