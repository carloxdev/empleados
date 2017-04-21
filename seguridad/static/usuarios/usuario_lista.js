/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:
var url_profile_bypage = window.location.origin + "/api/profile_bypage/"
var url_profile_editar_bypage = window.location + "/editar/"

// OBJS
var grid = null
var tarjeta_resultados = null

/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {
	//toolbar = new Toolbar()
    tarjeta_resultados = new TarjetaResultados()
})


/*-----------------------------------------------*\
            OBJETO: Tarjeta resultados
\*-----------------------------------------------*/

function TarjetaResultados(){
   // this.toolbar = new Toolbar()
    this.grid = new Grid()
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
        pageSize: 5,
        transport: {
            read: {

                url: url_profile_bypage,
                type: "GET",
                dataType: "json",
            },
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
        pk : { type: "int" },
        username : { type: "string" },
        first_name : { type: "string"},
        last_name : { type: "string" },
        email : { type: "string" },
        is_active : { type: "boolean" },
        clave_rh : { type: "string" },
        clave_jde : { type: "string" },
        foto : { type: "file" },
        fecha_nacimiento : { type: "date" },
        ultima_sesion : { type: "date" },
    }
}
Grid.prototype.get_Configuracion = function () {

    return {
        dataSource: this.kfuente_datos,
        columnMenu: true,
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
Grid.prototype.get_Columnas = function () {

    return [   
        { field: "pk",
          title: "Id",
          width:"80px",
          template: '<a class="btn btn-default" href="#=url_profile_editar_bypage + pk#">#=pk#</a>',
         }, 
        { field: "usuario", title: "Usuario", width:"150px" },
        { field: "first_name", title: "Primer nombre", width:"200px" },
        { field: "last_name", title: "Apellidos", width:"200px" },
        { field: "email", title: "Email", width:"200px" },
        { field: "is_active", title: "Estado", width:"100px" },
        { field: "clave_rh", title: "Clave rh", width:"100px" },
        { field: "clave_jde", title: "Clave jde", width:"100px" },
        { field: "foto", title: "Foto", width:"100px" },
        { field: "fecha_nacimiento", title: "Fecha de nacimiento", width:"150px", format: "{0:dd-MM-yyyy}" },
        { field: "ultima_sesion", title: "Ultima sesion", width:"150px", format: "{0:dd-MM-yyyy}" },
    ]
}
Grid.prototype.click_BotonEditar = function (e) {
    
    var fila = this.dataItem($(e.currentTarget).closest('tr'))
    window.location.href = url_usuario_editar_bypage + fila.pk
}