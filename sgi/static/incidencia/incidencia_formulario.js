/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:
var url_viaticolinea = window.location.origin + "/api/incidenciadocumento_bypage/"

// OBJS
var toolbar = null
var tarjeta_resultados = null


/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {

    filtros = new TargetaFiltros()
    resultados = new TargetaResultados()
})

/*-----------------------------------------------*\
            OBJETO: incidencia
\*-----------------------------------------------*/

function TargetaFiltros(){

    this.$boton_colapsible = $("#boton_colapsible")
    this.init()
}
ViaticoCabecera.prototype.init = function (e) {

    this.$boton_colapsible.on("click", this, this.click_BotonColapsible)
}
ViaticoCabecera.prototype.click_BotonColapsible = function (e){

    if ($("#boton_colapsible").hasClass('mdi-caret-down-circle')){

        $("#boton_colapsible").removeClass('mdi-caret-down-circle').addClass('mdi-caret-up-circle')
    }
    else if($("#boton_colapsible").hasClass('mdi-caret-up-circle')){

        $("#boton_colapsible").removeClass('mdi-caret-up-circle').addClass('mdi-caret-down-circle')
    }   
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
    var url = url_viaticolinea + fila.pk + "/"
    alertify.confirm(
        'Eliminar Registro',
        '¿Desea eliminar esta fila?',

        function () {
            $.ajax({
                url: url,
                headers: { "X-CSRFToken": $.cookie('csrftoken') },
                method: "DELETE",
                success: function () {
                    tarjeta_resultados.grid.kfuente_datos.remove(fila)
                },
                error: function () {
                    alert("Ocurrió un error al eliminar")
                }
            })
        }   , 
        null
    )  

}
Grid.prototype.set_Functions = function (e) {

    tarjeta_resultados.grid.set_Icons(e)
    tarjeta_resultados.grid.checar_Estado()
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
Grid.prototype.checar_Estado = function() {

    if ( this.kfuente_datos.total() > 0 ) {
        tarjeta_resultados.toolbar.$btn_finalizar_captura.removeAttr('disabled')

    }
    else if ( this.kfuente_datos.total() == 0 ) {
        tarjeta_resultados.toolbar.$btn_finalizar_captura.attr('disabled', 'disabled')

    }
}