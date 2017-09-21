/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/
var url_login = "http://www.smartcfdi.com/rest-auth/login/"
var url_nominas = "http://www.smartcfdi.com/api-facturas/comprobanteempleadoex_bypage/"
//OBJS
var tarjeta_filtro = null
var grid = null
var tarjeta_resultados = null
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
    this.grid = new Grid()
}

/*-----------------------------------------------*\
            OBJETO: TARJETA FILTRO EMPLEADO
\*-----------------------------------------------*/


function TarjetaFiltro(){

    this.$rfc = $('#rfc')
}
TarjetaFiltro.prototype.get_Values = function (_page) {
    texto = this.$rfc.val().split("-")
    rfc_empleado = ''
    for (var i = 0; i < texto.length; i++) {
        rfc_empleado += texto[i]
    }
    return {
        page: _page,
        receptor_rfc: rfc_empleado,
   }
}

/*-----------------------------------------------*\
            OBJETO: Grid
\*-----------------------------------------------*/

function Grid() {

    this.$id = $("#grid_resultados")
    this.kfuente_datos = null
    this.kgrid = null
    this.$width_actions = "40px"
    this.init_Responsive()
    this.autenticarse()
}
Grid.prototype.init_Responsive = function () {

   if (window.matchMedia('(max-width: 768px)').matches) {
      this.$width_actions = "60px"
   }
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
        archivo_xml : { type: "string" },
        fecha : { type: "date"},
        receptor_rfc: { type: "string" },
        receptor_nombre: { type: "string"},
    }
}
Grid.prototype.get_Configuracion = function () {

        return {
                autoBind: true,
                dataSource: this.kfuente_datos,
                columnMenu: false,
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
        {   title: "",
            width: this.$width_actions,
            template: '<a class="btn btn-default nova-url nova-button-grid" href="#=archivo_pdf#" download><i class="icon icon-left icon fa fa-file-pdf-o icon-black"></i></a>' +
                      '<a class="btn btn-default nova-url nova-button-grid" href="#=archivo_xml#" download="NominaXML/#=fecha#"><i class="icon icon-left icon fa fa-file-code-o icon-black"></i></a>'
        },
        { field: "fecha", title: "Fecha de pago", width:"70px", format: "{0:dd/MM/yyyy}" },
        { field: "receptor_rfc", title: "RFC", width:"100px"},
        { field: "receptor_nombre", title: "Receptor", width:"150px"},

    ]
}
Grid.prototype.buscar = function() {

    this.kfuente_datos.page(1)
}
