/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:
//var url_usuario = window.location.origin + "/api/usuario/"
//var url_usuario_lista = window.location.origin + "/usuarios/"

// OBJS
var tarjeta_filtros = null

/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {

    tarjeta_filtros = new TarjetaFiltros()
})

// Asigna eventos a teclas
$(document).keypress(function (e) {

    // Tecla Enter
    if (e.which == 13) {

       // modal.buscar()
    }
})

/*-----------------------------------------------*\
            OBJETO: Tarjeta filtros
\*-----------------------------------------------*/

function TarjetaFiltros() {

    this.$id_clave_rh = $('#id_clave_rh')
    this.init_Components()
    this.init_Events()
}
TarjetaFiltros.prototype.init_Components = function () {
    
    this.$id_clave_rh.select2(this.get_ConfSelect2())
}
TarjetaFiltros.prototype.get_ConfSelect2 = function () {
    return {
        width: '100%'
    }
}
TarjetaFiltros.prototype.init_Events = function () {

    this.$id_clave_rh.on("onchange", this, this.change_Clave_rh)
}
TarjetaFiltros.prototype.get_Values = function (_page, _pageSize) {
    
    return {
        page: _page,
        pageSize: _pageSize,

        req_compania: this.$id_compania.val(),
        req_un: this.$id_sucursal.val(),
        req_comprador_desc: this.$id_comprador.val(),
        req: this.$id_requisicion.val(),
        req_tipo: this.$id_requisicion_tipo.val(),
        req_generador_desc: this.$id_requisicion_originador.val(),
        req_estado_last: $("input[name='requisicion_canceladas']:checked").val(),
        cot: this.$id_cotizacion.val(),
        cot_tipo: this.$id_cotizacion_tipo.val(),
        cot_estado_last: $("input[name='cotizacion_canceladas']:checked").val(),
        ord: this.$id_oc.val(),
        ord_tipo: this.$id_oc_tipo.val(),
        ord_estado_last: $("input[name='oc_canceladas']:checked").val(),
        req_fecha_creacion_desde: this.$fecha_req_desde_hasta.val().split(" al ")[0],
        req_fecha_creacion_hasta: this.$fecha_req_desde_hasta.val().split(" al ")[1],
        ord_proveedor_desc: this.$id_proveedor.val(),
        req_item_desc: this.$id_item.val(),
        ord_recepcion: this.$id_recepcion.val()
    }
}
TarjetaFiltros.prototype.change_Clave_rh = function (e) {
    
    e.preventDefault()
    //Evento de busqueda :)

}