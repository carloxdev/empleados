/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

var url_recibos_bypage = null
var url_archivo =  null

//OBJS
var tarjeta_filtro = null
var grid = null
var toolbar = null
var tarjeta_resultados = null


/*------------------------------------------------*\  
            LOAD
\*-----------------------------------------------*/

$(document).ready(function(){
    tarjeta_filtro = new TarjetaFiltro()
    tarjeta_resultados = new TarjetaResultados()

    // Asigna eventos a teclas
    $(document).keypress(function (e) {
            // Tecla Enter
            if (e.which == 13) {
                tarjeta_resultados.grid.buscar()
                tarjeta_filtro.hidden_Modal()
            }
    })      
})

/*-----------------------------------------------*\
            OBJETO: Tarjeta resultados
\*-----------------------------------------------*/

function TarjetaResultados(){
    this.grid = new Grid()
}

/*-----------------------------------------------*\
            OBJETO: TARJETA FILTRO EMPLEADO
\*-----------------------------------------------*/


function TarjetaFiltro(){

    this.$modal = $('#modal_filtro')
    this.$numero_empleado = $('#numero_empleado')

    this.$boton_buscar = $('#boton_buscar')
    this.$boton_limpiar = $('#boton_limpiar_filtro')

    this.init_Components()
    this.init_Events()
}
TarjetaFiltro.prototype.init_Components = function () {

}
TarjetaFiltro.prototype.init_Events = function () {
    
    this.$boton_buscar.on("click", this, this.click_BotonBuscar)
    this.$boton_limpiar.on("click", this, this.click_BotonLimpiar)
}
TarjetaFiltro.prototype.click_BotonBuscar = function (e) {

        e.preventDefault()
        tarjeta_resultados.grid.buscar()
        tarjeta_filtro.hidden_Modal()
}
TarjetaFiltro.prototype.click_BotonLimpiar = function (e) {
        
        e.preventDefault()

}
TarjetaFiltro.prototype.get_Values = function (_page) {
    return {
        page: _page,
        relacion_solicitud__numero_empleado: this.$numero_empleado.val(),
   }
}
TarjetaFiltro.prototype.hidden_Modal = function () {

   this.$modal.modal('hide')
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

        // Definicion del pais, formato modena, etc..
        kendo.culture("es-MX")

        // Se inicializa la fuente da datos (datasource)
        this.kfuente_datos = new kendo.data.DataSource(this.get_DataSourceConfig())
        
        // Se inicializa y configura el grid:
        this.kgrid = this.$id.kendoGrid(this.get_Configuracion())
}
Grid.prototype.get_DataSourceConfig = function () {

        return {

                serverPaging: true,
                pageSize: 10,
                transport: {
                        read: {

                            url: url_recibos_bypage,
                            type: "GET",
                            dataType: "json",
                        },
                        parameterMap: function (data, action) {
                            if (action === "read"){
                                    return tarjeta_filtro.get_Values(data.page)
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
                        alertify.error("Status: " + e.status + "; Error message: " + e.errorThrown)
                },
        }    
}
Grid.prototype.get_Campos = function () {

    return {
        pk: { type: "integer" },
        archivo : { type: "string" },
        fecha_pago : { type: "date"},
    }
}
Grid.prototype.get_Configuracion = function () {

        return {
                autoBind: false,
                dataSource: this.kfuente_datos,
                columnMenu: true,
                groupable: false,
                sortable: false,
                editable: false,
                resizable: true,
                selectable: true,
                columns: this.get_Columnas(),
                scrollable: true,
                pageable: true,
                noRecords: {
                        template: "<div class='nova-grid-empy'> No se encontraron registros </div>"
                },
        }
}
Grid.prototype.get_Columnas = function () {

    return [
        { field: "archivo", 
            title: "Archivo", 
            width:"65px" ,
            template: '<a class="btn btn-default nova-url" href="#=archivo#" target="_blank" id="documento"><i class="icon icon-left icon mdi mdi-archive icon-black"></i></a>'
        },
        { field: "pk", title: "Id", width:"70px"},
        { field: "fecha_pago", title: "Fecha de pago", width:"150px", format: "{0:dd/MM/yyyy}" },

    ]
}
Grid.prototype.buscar = function() {

    this.kfuente_datos.page(1)
}