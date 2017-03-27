// $('#lineasModal').on('show.bs.modal', function (event) {
//   var button = $(event.relatedTarget) // Button that triggered the modal
//   // Extract info from data-* attributes
//   // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
//   // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
//   var modal = $(this)
//   // modal.find('.modal-title').text('New message to ' + recipient)
//   modal.find('.modal-body input').val(recipient)
// })



/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:
var url_viaticocabecera = window.location.origin + "/api/viaticocabecera/"

// OBJS
var toolbar = null
var grid = null
var tarjeta_resultados = null

/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {

    tarjeta_resultados = new Tarjeta_resultados()

})

/*-----------------------------------------------*\
            OBJETO: ToolBar
\*-----------------------------------------------*/

function Tarjeta_resultados(){

    this.toolbar = new ToolBar()
    this.grid = new Grid()
}




/*-----------------------------------------------*\
            OBJETO: ToolBar
\*-----------------------------------------------*/

function ToolBar() {

    //this.$boton_resultados = $('#boton_resultados')

    //this.init()
}
ToolBar.prototype.init = function () {

    //this.$boton_resultados.on("click", this, this.click_BotonResultados)
}
ToolBar.prototype.click_BotonResultados = function (e) {

    //e.preventDefault()

    //grid.buscar()
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

                url: url_viaticocabecera,
                type: "GET",
                dataType: "json",
            },
            // parameterMap: function (data, action) {
            //     if (action === "read") {

            //         return targeta_filtros.get_Filtros(data.page, data.pageSize)
            //     }
            // }
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
        empleado : { type: "string" },
        fecha_partida : { type: "date"},
        fecha_regreso : { type: "date"},
        unidad_negocio : { type: "string" },
        ciudad_destino : { type: "string" },
        proposito_viaje : { type: "string" },
        requiere_vehiculo : { type: "string" },
        no_vehiculo : { type: "string" },
        nombre_empresa : { type: "string" },
        rfc : { type: "string" },
        direccion : { type: "string" },
        grupo : { type: "string" },
        autorizador : { type: "string" },
        estado_solicitud : { type: "string" },
    }
}
Grid.prototype.get_Configuracion = function () {

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
        // dataBound: this.apply_Estilos
    }
}
Grid.prototype.get_Columnas = function () {

    return [
        { field: "empleado", title: "Empleado", width:"100px" },
        { field: "fecha_partida", title: "Fecha Partida", width:"100px", format: "{0:MM/dd/yyyy}" },
        { field: "fecha_regreso", title: "Fecha Regreso", width:"100px", format: "{0:MM/dd/yyyy}" },
        { field: "unidad_negocio", title: "Unidad Negocio", width:"100px" },
        { field: "ciudad_destino", title: "Ciudad Destino", width:"100px" },
        { field: "proposito_viaje", title: "Proposito Viaje", width:"100px" },
        { field: "requiere_vehiculo", title: "Requiere Vehiculo", width:"100px" },
        { field: "no_vehiculo", title: "No Vehículo", width:"100px" },
        { field: "nombre_empresa", title: "Nombre Empresa", width:"100px" },
        { field: "rfc", title: "RFC", width:"100px" },
        { field: "direccion", title: "Dirección", width:"100px" },
        { field: "grupo", title: "Grupo", width:"100px" },
        { field: "autorizador", title: "Autorizador", width:"100px" },
        { field: "estado_solicitud", title: "Estado Solicitud", width:"100px" },
    ]
}
Grid.prototype.mostrar = function () {

    var obj = this

    $.ajax({
        url: url_viaticocabecera,
        method: "GET",
        success: function (response) {
            obj.$id.append(obj.contenido)

            var tabla_body = $("#tabla_body")

            $(response).each(function (indice, elemento) {
                
                var fila =  "<tr> " +
                        "    <td> id </td> " +
                        "    <td> empleado </td> " +
                        "    <td> fecha_partida </td> " +
                        "    <td> fecha_regreso </td> " +
                        "    <td> unidad_negocio </td> " +
                        "    <td> ciudad_destino </td> " +
                        "    <td> proposito_viaje </td> " +
                        "    <td> requiere_vehiculo </td> " +
                        "    <td> no_vehiculo </td> " +
                        "    <td> nombre_empresa </td> " +
                        "    <td> rfc </td> " +
                        "    <td> direccion </td> " +
                        "</tr> " 

                fila = fila.replace("id", elemento.pk)
                fila = fila.replace("empleado", elemento.empleado)
                fila = fila.replace("fecha_partida", elemento.fecha_partida)
                fila = fila.replace("fecha_regreso", elemento.fecha_regreso)
                fila = fila.replace("unidad_negocio", elemento.unidad_negocio)
                fila = fila.replace("ciudad_destino", elemento.ciudad_destino)
                fila = fila.replace("proposito_viaje", elemento.proposito_viaje)
                fila = fila.replace("nombre_empresa", elemento.nombre_empresa)

                tabla_body.append(fila)
                
            })
        },
        error: function (response) {
            alert(response)
        }
    })

}
Grid.prototype.buscar = function() {
    this.kfuente_datos.page(1)
}
