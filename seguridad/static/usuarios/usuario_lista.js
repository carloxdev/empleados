/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:
var url_profile_bypage = window.location.origin + "/api/profile_bypage/"
var url_profile_editar_bypage = window.location + "/editar/"
var url_profile_excel = window.location.origin + "/api/profileexcel/"

// OBJS
var grid = null
var filtros = null
var tarjeta_resultados = null
var toolbar = null

/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {
	//toolbar = new Toolbar()
    filtros = new TargetaFiltros()
    tarjeta_resultados = new TargetaResultados()
})


/*-----------------------------------------------*\
            OBJETO: Targeta Filtros
\*-----------------------------------------------*/

function TargetaFiltros () {

    this.$usuario__username = $('#id_usuario')
    this.$usuario__first_name = $('#id_usuario__first_name')
    this.$usuario__last_name = $('#id_usuario__last_name')
    this.$clave_rh = $('#id_clave_rh')
    this.$usuario__email = $('#id_usuario__email')
    this.$usuario__date_joined_mayorque = $('#id_usuario__date_joined_mayorque')
    this.$usuario__date_joined_menorque = $('#id_usuario__date_joined_menorque')

    this.$boton_buscar = $('#boton_buscar')

    this.init_Components()
    this.init_Events()

}
TargetaFiltros.prototype.init_Components = function () {
    // Estilos, Liberias
}
TargetaFiltros.prototype.init_Events = function () {
    // Asosciar Eventos
    this.$boton_buscar.on("click", this, this.click_BotonBuscar)
}
TargetaFiltros.prototype.click_BotonBuscar = function (e) {
    //alert(e.data.$usuario__first_name.val())
    e.preventDefault()
    tarjeta_resultados.grid.buscar()
}
TargetaFiltros.prototype.get_Values = function (_page) {

    return {
        page: _page,
        usuario__username: this.$usuario__username.val(),
        usuario__first_name: this.$usuario__first_name.val(),
        usuario__last_name: this.$usuario__last_name.val(),
        clave_rh: this.$clave_rh.val(),
        usuario__email: this.$usuario__email.val(),
        usuario__date_joined_mayorque: this.$usuario__date_joined_mayorque.val(),
        usuario__date_joined_menorque: this.$usuario__date_joined_menorque.val(),
    }
}
TargetaFiltros.prototype.get_FiltrosExcel = function () {

    return {
        usuario__first_name: this.$usuario__first_name.val(), 
        usuario__last_name: this.$usuario__last_name.val(),
        usuario__email: this.$usuario__email.val(),
        clave_rh: this.$clave_rh.val(),
        usuario__date_joined_mayorque: this.$usuario__date_joined_mayorque.val(),
        usuario__date_joined_menorque: this.$usuario__date_joined_menorque.val(),
    }
}

/*-----------------------------------------------*\
            OBJETO: Tarjeta resultados
\*-----------------------------------------------*/

function TargetaResultados(){
    this.toolbar = new Toolbar()
    this.grid = new Grid()
}

/*-----------------------------------------------*\
            OBJETO: Grid
\*-----------------------------------------------*/

function Grid() {

    this.$id = $("#grid_resultados")
    this.kfuente_datos = null
    this.kfuente_datos_excel = null

    this.kgrid = null
    this.init()
}
Grid.prototype.init = function () {

    // Definicion del pais, formato modena, etc..
    kendo.culture("es-MX")

    // Se inicializa la fuente da datos (datasource)
    this.kfuente_datos = new kendo.data.DataSource(this.get_DataSourceConfig())
    this.kfuente_datos_excel = new kendo.data.DataSource(this.get_FuenteDatosExcel())

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
            parameterMap: function (data, action) {
                if (action === "read"){
                    return filtros.get_Values(data.page)
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
        pk : { type: "string" },
        username : { type: "string" },
        first_name : { type: "string"},
        last_name : { type: "string" },
        email : { type: "string" },
        clave_rh : { type: "string" },
        clave_jde : { type: "string" },
        fecha_nacimiento : { type: "date" },
        is_active : { type: "string" },
        date_joined : { type: "date" },
        last_login : { type: "date" },
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
          title: "Cuenta", 
          width:"150px" ,
          template: '<a href="#=url_profile_editar_bypage + pk#">#=cuenta#</a>',
        },
        { field: "first_name", title: "Nombre", width:"200px" },
        { field: "last_name", title: "Apellidos", width:"200px" },
        { field: "email", title: "Email", width:"200px" },
        { field: "clave_rh", title: "Clave de empleado", width:"150px" },
        { field: "clave_jde", title: "Clave JDE", width:"100px" },
        { field: "fecha_nacimiento", title: "Fecha de nacimiento", width:"150px", format: "{0:dd-MM-yyyy}" },
        { field: "is_active",title: "Estado",width:"100px" },
        { field: "date_joined", title: "Fecha de creación", width:"150px", format: "{0:dd-MM-yyyy}" },
        { field: "last_login", title: "Ultima sesion", width:"150px", format: "{0:dd-MM-yyyy}" },
    ]
}
Grid.prototype.buscar = function() {
    this.kfuente_datos.page(1)
}
Grid.prototype.leer_Datos = function() {
    
    this.kfuente_datos_excel.read()
}
Grid.prototype.get_FuenteDatosExcel = function (e) {

    return {

        transport: {
            read: {

                url: url_profile_excel,
                type: "GET",
                dataType: "json",
            },
            parameterMap: function (data, action) {
                if (action === "read") {

                    return filtros.get_FiltrosExcel()
                }
            }
        },

        schema: {
            model: {
                fields: this.get_Campos()
            }
        },
        error: function (e) {
            alertify.error("Status: " + e.status + "; Error message: " + e.errorThrown)
        },
    }
}

/*-----------------------------------------------*\
            OBJETO: TOOLBAR
\*-----------------------------------------------*/

function Toolbar() {

    this.$boton_exportar = $("#boton_exportar")

    this.init()
}
Toolbar.prototype.init = function (e) {

    this.$boton_exportar.on("click", this, this.click_BotonExportar)
}
Toolbar.prototype.Inicializar_CeldasExcel = function (e) {

    if (tarjeta_resultados.grid.get_Columnas != null)
    {
        if (tarjeta_resultados.grid.get_Columnas.length != 1) {
            tarjeta_resultados.grid.get_Columnas.length = 0;
        }
    }

    this.kRows = [{
        cells: [
            { value: 'Id'},
            { value: 'Nombre' },
            { value: 'Apellidos' },
            { value: 'Email' },
            { value: 'Fecha de nacimiento' },
            { value: 'Clave de empleado' },
            { value: 'Clave JDE' },
            { value: 'Estado' },
            { value: 'Fecha de creación'},
        ]
    }];
}
Toolbar.prototype.click_BotonExportar = function (e) {

    tarjeta_resultados.grid.leer_Datos()
    e.data.Inicializar_CeldasExcel()

    tarjeta_resultados.grid.kfuente_datos_excel.fetch(function () {

        var data = this.data();
        for (var i = 0; i < data.length; i++) {

            e.data.kRows.push({
                cells: [
                    { value: data[i].pk },
                    { value: data[i].first_name },
                    { value: data[i].last_name },
                    { value: data[i].email },
                    { value: data[i].fecha_nacimiento },
                    { value: data[i].clave_rh },
                    { value: data[i].clave_jde },
                    { value: data[i].is_active },
                    { value: data[i].date_joined },
                ]
            })
        }
        var workbook = new kendo.ooxml.Workbook({
            sheets: [
                {
                    columns: [
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                    ],
                    title: "Usuarios registrados",
                    rows: e.data.kRows
                }
            ]
        });
        kendo.saveAs({
            dataURI: workbook.toDataURL(),
            fileName: "ListadoUsuarios.xlsx",
        });
    });
}