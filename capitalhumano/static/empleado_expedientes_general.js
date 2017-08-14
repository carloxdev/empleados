/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

var url_empleados_full_bypage = window.location.origin + "/api-ebs/viewempleadosfull_bypage/"
var url_empleados_full_bypage_excel = window.location.origin + "/api-ebs/viewempleadosfull/"
var url_expediente = window.location.origin  + "/expedientes/"

//OBJS
var tarjeta_filtro = null
var grid = null
var toolbar = null
var tarjeta_resultados = null
var popup = null


/*------------------------------------------------*\  
            LOAD
\*-----------------------------------------------*/

$(document).ready(function(){
     tarjeta_filtro = new TarjetaFiltros()
     tarjeta_resultados = new TarjetaResultados()

     // Asigna eventos a teclas
        $(document).keypress(function (e) {
                // Tecla Enter
                if (e.which == 13) {
                    tarjeta_resultados.grid.buscar()
                    tarjeta_resultados.popup.hidden_Modal()
                }
        })    
})

/*-----------------------------------------------*\
            OBJETO: TARJETA FILTRO EMPLEADOS
\*-----------------------------------------------*/


function TarjetaFiltros(){

    this.$pers_primer_nombre = $('#id_pers_primer_nombre')
    this.$pers_segundo_nombre = $('#id_pers_segundo_nombre')
    this.$pers_apellido_paterno = $('#id_pers_apellido_paterno')
    this.$pers_apellido_materno = $('#id_pers_apellido_materno')
    this.$grup_fase_jde= $('#id_grup_fase_jde')
    this.$asig_organizacion_clave= $('#id_asig_organizacion_clave')
    this.$pers_empleado_numero= $('#id_pers_empleado_numero')
    this.$pers_tipo_codigo = $('#id_pers_tipo_codigo')

    this.$boton_buscar = $('#boton_buscar')
    this.$boton_limpiar = $('#boton_limpiar')

    this.init_Components()
    this.init_Events()
}
TarjetaFiltros.prototype.init_Components = function () {

    this.$asig_organizacion_clave.select2(appnova.get_ConfigSelect2())
    this.$pers_tipo_codigo.select2(appnova.get_ConfigSelect2())
}
TarjetaFiltros.prototype.init_Events = function () {

     this.$boton_buscar.on("click", this, this.click_BotonBuscar)
     this.$boton_limpiar.on("click", this, this.click_BotonLimpiar)
}
TarjetaFiltros.prototype.click_BotonBuscar = function (e) {

        e.preventDefault()

        if(tarjeta_filtro.validar_Campos() != 'True'){
            tarjeta_resultados.grid.buscar()
            tarjeta_resultados.popup.hidden_Modal()
        }
}
TarjetaFiltros.prototype.get_Values = function (_page) {
    
        return {
                page: _page,
                pers_primer_nombre: this.$pers_primer_nombre.val(),
                pers_segundo_nombre: this.$pers_segundo_nombre.val(),
                pers_apellido_paterno: this.$pers_apellido_paterno.val(),
                pers_apellido_materno: this.$pers_apellido_materno.val(),
                grup_fase_jde: this.$grup_fase_jde.val(),
                asig_organizacion_clave: this.$asig_organizacion_clave.val(),
                pers_tipo_codigo: this.$pers_tipo_codigo.val(),
                pers_empleado_numero: this.$pers_empleado_numero.val(),
     }
}
TarjetaFiltros.prototype.get_Values_Excel = function () {
    
        return {
                pers_primer_nombre: this.$pers_primer_nombre.val(),
                pers_segundo_nombre: this.$pers_segundo_nombre.val(),
                pers_apellido_paterno: this.$pers_apellido_paterno.val(),
                pers_apellido_materno: this.$pers_apellido_materno.val(),
                grup_fase_jde: this.$grup_fase_jde.val(),
                asig_organizacion_clave: this.$asig_organizacion_clave.val(),
                pers_tipo_codigo: this.$pers_tipo_codigo.val(),
                pers_empleado_numero: this.$pers_empleado_numero.val(),
     }
}
TarjetaFiltros.prototype.validar_Campos = function (){

        bandera = 'False'
        if ((this.$pers_primer_nombre.val() == '') &&
                (this.$pers_segundo_nombre.val() == '') &&
                (this.$pers_apellido_paterno.val() == '') &&
                (this.$pers_apellido_materno.val() == '') &&
                (this.$grup_fase_jde.val() == '') &&
                (this.$pers_empleado_numero.val() == '') &&
                (this.$asig_organizacion_clave.data('select2').val() == 0) &&
                (this.$pers_tipo_codigo.data('select2').val() == 0) 
            ){
            bandera = 'True'
        }
        return bandera
}
TarjetaFiltros.prototype.click_BotonLimpiar = function (e) {
        
        e.preventDefault()
        e.data.$pers_primer_nombre.val("")
        e.data.$pers_segundo_nombre.val("")
        e.data.$pers_apellido_paterno.val("")
        e.data.$pers_apellido_materno.val("")
        e.data.$grup_fase_jde.val("")
        e.data.$pers_empleado_numero.val("")
        e.data.$asig_organizacion_clave.data('select2').val(0)  
        e.data.$pers_tipo_codigo.data('select2').val(0)
}

/*-----------------------------------------------*\
            OBJETO: Tarjeta resultados
\*-----------------------------------------------*/

function TarjetaResultados(){
    this.grid = new Grid()
    this.popup = new Popup()
    this.toolbar = new Toolbar()
}

/*-----------------------------------------------*\
            OBJETO: Tarjeta resultados
\*-----------------------------------------------*/

function Toolbar(){

    this.$boton_exportar = $('#id_exportar')

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
        cells: this.get_Celdas()
    }]
}
Toolbar.prototype.click_BotonExportar = function (e) {

    if( tarjeta_filtro.validar_Campos() != 'True'){
        tarjeta_resultados.grid.leer_Datos()
        e.data.Inicializar_CeldasExcel()

        tarjeta_resultados.grid.kfuente_datos_excel.fetch(function () {

            var data = this.data();
            for (var i = 0; i < data.length; i++) {

                    e.data.kRows.push({
                        cells: e.data.get_Registros_Excel(data[i])
                    })
            }
            var workbook = new kendo.ooxml.Workbook({
                    sheets: [
                        {
                            columns: e.data.get_Columnas_Excel_Ancho(),
                            title: "ListaEmpleados",
                            rows: e.data.kRows
                        }
                    ]
                });
            kendo.saveAs({
                dataURI: workbook.toDataURL(),
                fileName: "ListaEmpleados.xlsx",
            });
        })
    }
}
Toolbar.prototype.get_Columnas_Excel_Ancho = function () {
    
    var columnas_excel = []
    var columnas = this.get_Formato_Columnas()

    for (var i=0; i < columnas.length; i++) {
        columnas_excel.push({ autoWidth: true })
    }
    return columnas_excel
}
Toolbar.prototype.get_Formato_Columnas = function () {
    
    var columnas = tarjeta_resultados.grid.get_Columnas()
    var columnas_formateadas = []

    $.each(columnas, function (index) {
        $.each(this, function (name) {
            if (name === 'field'){
                columnas_formateadas.push(columnas[index])
            }
        })
    })
    return columnas_formateadas
}
Toolbar.prototype.get_Celdas = function () {
    
    var celdas = []
    var columnas = this.get_Formato_Columnas()

    for (var i=0; i < columnas.length; i++) {
        campo = columnas[i].title
        celdas.push({ value: campo })
    }
    return celdas
}
Toolbar.prototype.get_Registros_Excel = function (data) {
    
    var registros = []
    var columnas = this.get_Formato_Columnas()

    for (var i=0; i < columnas.length; i++) {
        campo = columnas[i].field
        registros.push({ value: data[campo] })
    }
    return registros
}

/*-----------------------------------------------*\
            OBJETO: Tarjeta resultados
\*-----------------------------------------------*/

function Popup(){
    this.$modal = $('#modal_filtro')
}
Popup.prototype.hidden_Modal = function () {

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

                                url: url_empleados_full_bypage,
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
                pers_primer_nombre : { type: "string" },
                pers_segundo_nombre : { type: "string" },
                pers_apellido_paterno : { type: "string"},
                pers_apellido_materno : { type: "string" },
                grup_fase_jde : { type: "string" },
                asig_organizacion_clave : { type: "string" },
                pers_tipo_codigo : { type: "number" },
                pers_empleado_numero : { type: "string" },
                asig_fecha_inicio : { type: "string"},
                asig_grado_desc : { type: "string"},
                asig_ubicacion_desc : { type: "string"},
                asig_puesto_desc : { type: "string"},
                asig_trabajo_desc : { type: "string"},
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
                dataBound: this.set_Icons,
        }
}
Grid.prototype.get_Columnas = function () {

        return [  
                { field: "pers_empleado_numero", 
                    title: "No. de empleado", 
                    width:"150px" ,
                    template: '<a href="#=url_expediente + pers_empleado_numero #/expediente/">#=pers_empleado_numero#</a>',
                },
                { field: "pers_primer_nombre", title: "Primer nombre", width:"170px"},
                { field: "pers_segundo_nombre", title: "Segundo Nombre", width:"150px" },
                { field: "pers_apellido_paterno", title: "Apellido paterno", width:"200px" },
                { field: "pers_apellido_materno", title: "Apellido materno", width:"200px" },
                { field: "grup_fase_jde", title: "Centro de costos", width:"170px" },
                { field: "pers_tipo_desc", title: "Tipo empleado", width:"170px" },
                { field: "asig_organizacion_desc", title: "Organizacion", width:"200px" },
                { field: "asig_fecha_inicio", title: "Fecha inicio", width:"100px" },
                { field: "asig_grado_desc", title: "Categoria", width:"200px" },
                { field: "asig_puesto_desc", title: "Puesto", width:"200px" },
                { field: "asig_trabajo_desc", title: "Trabajo", width:"200px" },
                { field: "asig_ubicacion_desc", title: "Ubicacion", width:"200px" },

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

                url: url_empleados_full_bypage_excel,
                type: "GET",
                dataType: "json",
            },
            parameterMap: function (data, action) {
                if (action === "read") {

                    return tarjeta_filtro.get_Values_Excel()
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