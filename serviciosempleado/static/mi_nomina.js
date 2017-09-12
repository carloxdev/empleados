/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

var url_recibos_bypage = null
var url_archivo =  null
var url_login = "http://www.smartcfdi.com/rest-auth/login/"
var url_nominas = "http://www.smartcfdi.com/api-facturas/comprobanteempleadoex_bypage/"
//OBJS
var tarjeta_filtro = null
var grid = null
var toolbar = null
var tarjeta_resultados = null
// var autenticacion = null
var token


/*------------------------------------------------*\  
            LOAD
\*-----------------------------------------------*/

$(document).ready(function(){
    tarjeta_filtro = new TarjetaFiltro()
    tarjeta_resultados = new TarjetaResultados()     
})


/*-----------------------------------------------*\
            OBJETO: Tarjeta resultados
\*-----------------------------------------------*/

function TarjetaResultados(){
    // this.autenticacion = new Autenticacion()
    this.grid = new Grid()
}

function Autenticacion (){
    this.autenticarse()
}
Autenticacion.prototype.autenticarse = function (){
    var USERNAME = "Nominas"
    var PASSWORD = "Payr0lll"

    $.ajax({
        type: "POST",
        url: url_login,
        data: {
                'username' : USERNAME,
                'password' : PASSWORD,
         },
        success: function (_response){
            token = _response.key
            grid = new Grid()
            tarjeta_resultados.autenticacion.consultar_Nominas(token)
        },
        error: function (_response) {
            alertify.error("Autenticacion invalida")
        }
    })
}
Autenticacion.prototype.consultar_Nominas = function (_token){
    $.ajax({
        type: "GET",
        url: url_nominas,
        dataType: 'json',
        headers: {
            "Authorization": "Token " + _token
        },
        success: function (_response){
            console.log(JSON.stringify(_response))
        },
        error: function (_response) {
            alertify.error("Ocurrio algun error")
        }
    })
}
/*-----------------------------------------------*\
            OBJETO: TARJETA FILTRO EMPLEADO
\*-----------------------------------------------*/


function TarjetaFiltro(){

    this.$numero_empleado = $('#numero_empleado')
}
TarjetaFiltro.prototype.get_Values = function (_page) {
    return {
        page: _page,
        numEmpleado: this.$numero_empleado.val(),
   }
}

/*-----------------------------------------------*\
            OBJETO: Grid
\*-----------------------------------------------*/

function Grid() {

    this.$id = $("#grid_resultados")
    this.kfuente_datos = null
    this.kgrid = null
    this.autenticarse()
}
Grid.prototype.autenticarse = function (){
    var USERNAME = "Nominas"
    var PASSWORD = "Payr0lll"

    $.ajax({
            type: "POST",
            url: url_login,
            data: {
                    'username' : USERNAME,
                    'password' : PASSWORD,
             },
            success: function (_response){
                token = _response.key
                tarjeta_resultados.grid.init()
            },
            error: function (_response) {
                alertify.error("Autenticacion invalida")
            }
        })
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

                        url: url_nominas,
                        type: "GET",
                        dataType: "json",
                        beforeSend: function (request){
                            request.setRequestHeader("Authorization","Token " + token);
                          }
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
        folio: { type: "string" },
        archivo_pdf : { type: "string" },
        fecha : { type: "date"},
        emisor_nombre: { type: "string"},
        numDiasPagados: { type: "string"},
    }
}
Grid.prototype.get_Configuracion = function () {

        return {
                autoBind: true,
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
        {   title: " ",
            width:"20px" ,
            template: '<a class="btn btn-default nova-url" href="#=archivo_pdf#" target="_blank"><i class="icon icon-left icon mdi mdi-archive icon-black"></i></a>'
        },
        { field: "folio", title: "Folio", width:"50px"},
        { field: "fecha", title: "Fecha de pago", width:"70px", format: "{0:dd/MM/yyyy}" },
        { field: "numDiasPagados", title: "Dias pagados", width:"50px"},
        { field: "emisor_nombre", title: "Emisor", width:"150px"},

    ]
}
Grid.prototype.buscar = function() {

    this.kfuente_datos.page(1)
}