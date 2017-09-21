/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:
var url_profile_bypage = window.location.origin + "/api-seguridad/profile_bypage/"
var url_profile_excel = window.location.origin + "/api-seguridad/profile/"
var url_profile_editar_bypage = window.location

// OBJS
var grid = null
var filtros = null
var tarjeta_resultados = null
var toolbar = null

/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {

    filtros = new PopupFiltros()
    tarjeta_resultados = new TargetaResultados()

    // Asigna eventos a teclas
    $(document).keypress(function (e) {
        if (e.which == 13) {

            if (filtros.$id.hasClass('in')) {
                filtros.apply_Filters()
            }
        }
    })  
    $(document).keydown(function (e) {  
        if (e.which == 27){
            filtros.$id.modal('hide')
        }
    })

    //alertify.confirm('Confirm Message')
})


/*-----------------------------------------------*\
            OBJETO: Targeta Filtros
\*-----------------------------------------------*/

function PopupFiltros () {

    this.$id = $('#tarjeta_filtros')

    this.$usuario__username = $('#id_usuario')
    this.$usuario__first_name = $('#id_usuario__first_name')
    this.$usuario__last_name = $('#id_usuario__last_name')
    this.$clave_rh = $('#id_clave_rh')
    this.$usuario__email = $('#id_usuario__email')

    this.$created_date_mayorque = $('#id_created_date_mayorque_group')
    this.$created_date_menorque = $('#id_created_date_menorque_group')

    this.$boton_buscar = $('#boton_buscar')
    this.$boton_limpiar = $('#boton_limpiar')

    this.init_Components()
    this.init_Events()

}
PopupFiltros.prototype.init_Components = function () {
    
    this.$created_date_mayorque.datepicker({format: 'dd/mm/yyyy', autoclose: true})
    this.$created_date_menorque.datepicker({format: 'dd/mm/yyyy', autoclose: true})
}
PopupFiltros.prototype.init_Events = function () {

    this.$boton_buscar.on("click", this, this.click_BotonBuscar)
    this.$boton_limpiar.on("click", this, this.click_BotonLimpiar)
}
PopupFiltros.prototype.get_FechaMayorQue = function (e) {

    fecha = this.$created_date_mayorque.datepicker("getDate")
    fecha_conformato = moment(fecha).format('YYYY-MM-DD')

    if (fecha_conformato == "Invalid date") {
        return ""
    }
    else {
        return fecha_conformato
    }
}
PopupFiltros.prototype.get_FechaMenorQue = function (e) {

    fecha = this.$created_date_menorque.datepicker("getDate")
    fecha_conformato = moment(fecha).format('YYYY-MM-DD')

    if (fecha_conformato == "Invalid date") {
        return ""
    }
    else {
        return fecha_conformato
    }
}
PopupFiltros.prototype.click_BotonBuscar = function (e) {
    e.preventDefault()
    tarjeta_resultados.grid.buscar()
}
PopupFiltros.prototype.click_BotonLimpiar = function (e) {
    
    e.preventDefault()

    e.data.$usuario__username.val("")
    e.data.$usuario__first_name.val("")
    e.data.$usuario__last_name.val("")
    e.data.$clave_rh.val("")
    e.data.$usuario__email.val("")
    e.data.$created_date_mayorque.datepicker("clearDates")
    e.data.$created_date_menorque.datepicker("clearDates") 
}
PopupFiltros.prototype.get_Values = function (_page) {

    return {
        page: _page,
        usuario__username: this.$usuario__username.val(),
        usuario__first_name: this.$usuario__first_name.val(),
        usuario__last_name: this.$usuario__last_name.val(),
        clave_rh: this.$clave_rh.val(),
        usuario__email: this.$usuario__email.val(),
        usuario__date_joined_mayorque: this.get_FechaMayorQue(),
        usuario__date_joined_menorque: this.get_FechaMenorQue(),
    }
}
PopupFiltros.prototype.get_NoFiltrosAplicados = function () {

    cantidad = 0

    if (this.$usuario__username.val() != "") {
        cantidad += 1
    }
    if (this.$usuario__first_name.val() != "") {
        cantidad += 1   
    }
    if (this.$usuario__last_name.val() != "" ) {
        cantidad += 1
    }
    if (this.$clave_rh.val() !=  "") {
        cantidad += 1
    }
    if (this.$usuario__email.val()  != "" ) {
        cantidad += 1
    }
    if (this.get_FechaMayorQue() != "") {
        cantidad += 1
    }
    if (this.get_FechaMenorQue() != "") {
        cantidad += 1
    }

    return cantidad
}
PopupFiltros.prototype.apply_Filters = function () {

    tarjeta_resultados.grid.buscar()

    no_filtros = this.get_NoFiltrosAplicados()
    
    this.$id.modal('hide')
}
PopupFiltros.prototype.click_BotonBuscar = function (e) {
    
    e.preventDefault()
    e.data.apply_Filters()
}
PopupFiltros.prototype.get_FiltrosExcel = function () {

    return {
        usuario__first_name: this.$usuario__first_name.val(), 
        usuario__last_name: this.$usuario__last_name.val(),
        usuario__email: this.$usuario__email.val(),
        clave_rh: this.$clave_rh.val(),
        usuario__date_joined_mayorque: this.get_FechaMayorQue(),
        usuario__date_joined_menorque: this.get_FechaMenorQue(),
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
        pageSize: 10,
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
Grid.prototype.get_Columnas = function () {

    return [  
        { field: "pk", 
          title: "Cuenta", 
          width:"100px" ,
          template: '<a class="btn btn-default nova-url" href="#=url_profile_editar_bypage + pk #/editar/">#=cuenta#</a>',
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

    this.$boton_filtros = $('#boton_filtros')
    this.$boton_exportar = $("#boton_exportar")

    this.init_Events()
}
Toolbar.prototype.init_Events = function (e) {

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