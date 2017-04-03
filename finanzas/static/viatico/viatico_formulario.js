/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:
//var url_viaticolinea = window.location.origin + "/api/viaticolineapaginado/"
var url_viaticolinea = window.location.origin + "/api/viaticolineapaginado/"
//var url_viaticocabecera = window.location.origin + "/api/viaticocabecera/52/"

// OBJS
var grid = null
var tarjeta_resultados = null
var ventana_linea = null


/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {
    ventana_linea = new VentanaLinea()
    tarjeta_resultados = new TarjetaResultados()
})

/*-----------------------------------------------*\
            OBJETO: Tarjeta resultados
\*-----------------------------------------------*/

function TarjetaResultados(){
    this.grid = new Grid()

}

/*-----------------------------------------------*\
            OBJETO: Ventana linea
\*-----------------------------------------------*/

function VentanaLinea() {
    this.$cabecera = $('#id_cabecera')
    alert(this.$cabecera.val()=='')
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
    alert('Cierro el modal')
}

VentanaLinea.prototype.guardar = function () {
        
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
        autoBind: false,
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
        dataBound: this.set_Icons,
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
                        
                },
                error: function () {
                        
                    alert("Ocurrió un error al eliminar")
                }
            })
    //    }   , 
    //    null
    //)  
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
