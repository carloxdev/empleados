/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:
var url_viaticolinea = window.location.origin + "/api/viaticolinea_bypage/"

// OBJS
var toolbar = null
var grid = null
var tarjeta_resultados = null
var ventana_linea = null
var viatico_cabecera = null

/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {

    viatico_cabecera = new ViaticoCabecera()
    ventana_linea = new VentanaLinea()
    tarjeta_resultados = new TarjetaResultados()
})

/*-----------------------------------------------*\
            OBJETO: viatico_cabecera
\*-----------------------------------------------*/

function ViaticoCabecera(){

    this.$boton_colapsible = $("#boton_colapsible")
    this.init()
}

ViaticoCabecera.prototype.init = function (e) {

    this.$boton_colapsible.on("click", this, this.click_BotonColapsible)
}

ViaticoCabecera.prototype.click_BotonColapsible = function (e){
    e.preventDefault()

}

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

    this.$btn_finalizar_captura = $("#btn_finalizar_captura")
    this.init()
}
ToolBar.prototype.init = function (e) {

    this.$btn_finalizar_captura.on("click", this, this.click_BotonFinalizarCaptura)   
}
ToolBar.prototype.click_BotonFinalizarCaptura = function (e) {
    
    e.preventDefault()
    
}

/*-----------------------------------------------*\
            OBJETO: Ventana linea
\*-----------------------------------------------*/

function VentanaLinea() {

    this.$cabecera = $('#id_cabecera')
    this.$concepto = $('#id_concepto')
    this.$observaciones = $('#id_observaciones')
    this.$importe = $('#id_importe')
    this.$boton_guardar =  $('#boton_guardar')
    this.$boton_cancelar =  $('#boton_cancelar')
    this.init()
}
VentanaLinea.prototype.init = function () {

    this.$boton_guardar.on("click", this, this.click_BotonGuardar)
    this.$boton_cancelar.on("click", this, this.click_BotonCancelar)   
}
VentanaLinea.prototype.click_BotonGuardar = function (e) {
    e.preventDefault()
    
    $.ajax({
            url: url_viaticolinea,
            headers: { "X-CSRFToken": $.cookie('csrftoken') },
            method: "POST",
            data: {
                
                cabecera : e.data.$cabecera.text(),
                concepto : e.data.$concepto.val(),
                observaciones : e.data.$observaciones.val(),
                importe : e.data.$importe.val(),
            },
            success: function (response) {
                tarjeta_resultados.grid.buscar()
                //tarjeta_resultados.grid.checar()
                //toolbar.btn_finalizar_captura.disabled = false
                //e.data.$id.modal('hide')
                //cuando se inserta la linea, recarga
                
            },
            //error: function (response) {

            //    alertify.error("Ocurrio error al insertar datos")
            //}
        })

}
VentanaLinea.prototype.click_BotonCancelar = function (e) {
    e.preventDefault()

}
VentanaLinea.prototype.get_Filtros = function (_page, _pageSize) {   
    return {
        page: _page,
        pageSize: _pageSize,
        cabecera: this.$cabecera.text(),

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
    this.kfuente_datos = new kendo.data.DataSource(this.get_FuenteDatosConfig())
    this.kGrid = this.$id.kendoGrid(this.get_Config())

}
Grid.prototype.ocultar_Botones = function () {
    var grid = this.kGrid.data("kendoGrid")
    grid.hideColumn(3)

}
Grid.prototype.get_Config = function () {
    return {
        dataSource: this.kfuente_datos,
        columnMenu: false,
        groupable: false,
        sortable: false,
        editable: false,
        resizable: true,
        selectable: true,
        scrollable: false,
        columns: this.get_Columnas(),
        scrollable: true,
        pageable: true,
        noRecords: {
            template: "<div class='grid-empy'> No se encontraron registros </div>"
        },  
        dataBound: this.set_Functions,
    }

}
Grid.prototype.get_Campos = function (e) {
    return {
        concepto: { type: "string" },
        observaciones: { type: "string" },
        importe: { type: "number" },
        
    }

}
Grid.prototype.get_Columnas = function (e) {
    return [
        { field: "concepto" , title: "Concepto"},
        { field: "observaciones" , title: "Observaciones" },
        { field: "importe", title: "Importe"},
        
        {
           command: [ 
                {
                   text: " Eliminar",
                   click: this.click_BotonEliminar,
                   className: "boton_eliminar fa fa-trash-o"
                },   
                             
            ],           
           title: " ",
           width: "120px"
        },
    ]

}
Grid.prototype.click_BotonEliminar = function (e) {
    var token = $("[name=csrfmiddlewaretoken]").val()
    var fila = this.dataItem($(e.currentTarget).closest('tr'))
    
    //alertify.confirm(
    //    'Eliminar Registro',
    //    '¿Desea eliminar esta fila?',

    //    function () {
            var url = url_viaticolinea + fila.pk + "/"

            $.ajax({
                url: url,
                headers: { "X-CSRFToken": $.cookie('csrftoken') },
                method: "DELETE",
                success: function () {
                    alert("Se eliminó registro correctamente")
                    tarjeta_resultados.grid.kfuente_datos.remove(fila)
                    //tarjeta_resultados.grid.checar()
                        
                },
                error: function () {
                        
                    alert("Ocurrió un error al eliminar")
                }
            })
    //    }   , 
    //    null
    //)  

}
Grid.prototype.set_Functions = function (e) {
    tarjeta_resultados.grid.set_Icons(e)
    tarjeta_resultados.grid.checar()

}
Grid.prototype.set_Icons = function (e) {
    e.sender.tbody.find(".k-button.fa.fa-trash-o").each(function(idx, element){
        $(element).removeClass("fa fa-trash-o").find("span").addClass("fa fa-trash-o")
    })

}
Grid.prototype.get_FuenteDatosConfig = function (e) {
    return {

        serverPaging: true,
        pageSize: 10,
        transport: {
            read: {

                url: url_viaticolinea,
                type: "GET",
                dataType: "json",

            },
            parameterMap: function (data, action) {
                if (action === "read") {

                    return ventana_linea.get_Filtros(data.page, data.pageSize)
                }
            }
        },
        schema: {
            data: "results",
            total: "count",
            model: {
                fields: this.get_Campos()
            }
        },
        error: function (e) {
            alert("Status: " + e.status + "; Error message: " + e.errorThrown)
        },
    }

}
Grid.prototype.buscar = function() {
    this.kfuente_datos.page(1)

}
Grid.prototype.checar = function() {
    if ( this.kfuente_datos.total() > 0 ) {
        document.getElementById('btn_finalizar_captura').removeAttribute('disabled')
        
    }
    else if ( this.kfuente_datos.total() == 0 ) {
        document.getElementById('btn_finalizar_captura').setAttribute('disabled', 'disabled')
        
    }

}