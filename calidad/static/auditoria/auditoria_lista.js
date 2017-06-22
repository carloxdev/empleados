/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:api-
//var url_empleados_bypage = window.location.origin + "/api-ebs/viewempleadosfull_bypage/"

// OBJS
var tarjeta_filtros = null

/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {
    
    tarjeta_filtros = new TarjetaFiltros()
    //tarjeta_resultados = new TarjetaResultados()
})

/*-----------------------------------------------*\
            OBJETO: Tarjeta filtros
\*-----------------------------------------------*/
function TarjetaFiltros() {

    this.$id_elaborador = $("#id_elaborador")
    this.$id_autorizador = $("#id_autorizador")
    this.$id_aprobador = $("#id_aprobador")
    this.$boton_colapsible = $("#boton_colapsible")
    this.$id_estado = $("#id_estado")
    this.$id_fecha_inicial_final_programada = $("#id_fecha_inicial_final_programada")
    this.$id_fecha_inicial_final_real = $("#id_fecha_inicial_final_real")
    this.$id_compania_auditada = $("#id_compania_auditada")
    this.$boton_buscar = $('#boton_buscar')
    this.$boton_limpiar = $('#boton_limpiar')
    this.init_Components()
    this.init_Events()
}
TarjetaFiltros.prototype.init_Components = function () {
    this.$id_elaborador.select2(appnova.get_ConfigSelect2())
    this.$id_autorizador.select2(appnova.get_ConfigSelect2())
    this.$id_aprobador.select2(appnova.get_ConfigSelect2())
    this.$id_estado.select2(appnova.get_ConfigSelect2())
    this.$id_compania_auditada.select2(appnova.get_ConfigSelect2())
    this.$id_fecha_inicial_final_programada.daterangepicker(this.get_ConfDateRangePicker())
    this.$id_fecha_inicial_final_real.daterangepicker(this.get_ConfDateRangePicker())
}
TarjetaFiltros.prototype.get_ConfDateRangePicker = function () {

    return {
        locale: {
            format: 'YYYY-MM-DD',
            applyLabel: "Aplicar",
            cancelLabel: "Cancelar",
            fromLabel: "Del",
            separator: " al ",
            toLabel: "Al",            
            weekLabel: "S",
            daysOfWeek: [
                "Do",
                "Lu",
                "Ma",
                "Mi",
                "Ju",
                "Vi",
                "Sa"
            ],
            monthNames: [
                "Enero",
                "Febrero",
                "Marzo",
                "Abril",
                "Mayo",
                "Junio",
                "Julio",
                "Agosto",
                "Septiembre",
                "Octubre",
                "Noviembre",
                "Diciembre"
            ],          
        },
        startDate: '2017-01-01'
    }    
}
TarjetaFiltros.prototype.init_Events = function () {

    this.$boton_colapsible.on("click", this, this.click_BotonColapsible)
    this.$boton_buscar.on("click", this, this.click_BotonBuscar)
    this.$boton_limpiar.on("click", this, this.click_BotonLimpiar)
}
TarjetaFiltros.prototype.click_BotonColapsible = function (e){

    if ($("#boton_colapsible").hasClass('mdi-caret-down-circle')){

        $("#boton_colapsible").removeClass('mdi-caret-down-circle').addClass('mdi-caret-up-circle')
    }
    else if($("#boton_colapsible").hasClass('mdi-caret-up-circle')){

        $("#boton_colapsible").removeClass('mdi-caret-up-circle').addClass('mdi-caret-down-circle')
    }
}
TarjetaFiltros.prototype.get_Values = function (_page, _pageSize) {

    return {
    }
}
TarjetaFiltros.prototype.get_FiltrosExcel = function () {
        
    return {        
    }
}
TarjetaFiltros.prototype.click_BotonBuscar = function (e) {
    
    e.preventDefault()
}
TarjetaFiltros.prototype.click_BotonLimpiar = function (e) {
    
    e.preventDefault()
}
