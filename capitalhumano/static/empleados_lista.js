/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:api-ebs/viewempleadosfull/"
var url_empleados_bypage = window.location.origin + "/api-ebs/viewempleadosfull_bypage/"
var url_empleados = window.location.origin + "/api-ebs/viewempleadosfull/"

// OBJS
var tarjeta_filtros = null
var tarjeta_resultados = null
var toolbar = null
var grid = null


/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {
    
    tarjeta_filtros = new TarjetaFiltros()
    tarjeta_resultados = new TarjetaResultados()
})

/*-----------------------------------------------*\
            OBJETO: Tarjeta filtros
\*-----------------------------------------------*/
function TarjetaFiltros() {

    this.$id_pers_primer_nombre = $("#id_pers_primer_nombre")
    this.$id_pers_segundo_nombre = $("#id_pers_segundo_nombre")
    this.$id_pers_apellido_paterno = $("#id_pers_apellido_paterno")
    this.$id_pers_apellido_materno = $("#id_pers_apellido_materno")
    this.$id_pers_genero_clave = $("input[name='pers_genero_clave']")
    this.$id_pers_empleado_numero = $("#id_pers_empleado_numero")
    this.$id_pers_tipo_codigo = $('#id_pers_tipo_codigo')
    this.$id_asig_puesto_clave = $("#id_asig_puesto_clave")
    this.$id_asig_organizacion_clave = $("#id_asig_organizacion_clave")
    this.$id_grup_compania_jde = $('#id_grup_compania_jde')
    //this.$id_zona = $("#id_zona")
    this.$id_grup_fase_jde = $("#id_grup_fase_jde")
    this.$id_grup_nomina_jde = $("input[name='grup_nomina_jde']")
    this.$fecha_contratacion = $("#fecha_contratacion")
    this.$boton_colapsible = $("#boton_colapsible")
    this.$boton_buscar = $('#boton_buscar')
    this.$boton_limpiar = $('#boton_limpiar')
    this.init_Components()
    this.init_Events()
}
TarjetaFiltros.prototype.init_Components = function () {

    this.$fecha_contratacion.daterangepicker(this.get_ConfDateRangePicker())
    this.$id_pers_tipo_codigo.select2(this.get_ConfSelect2())
    this.$id_asig_puesto_clave.select2(this.get_ConfSelect2())
    this.$id_asig_organizacion_clave.select2(this.get_ConfSelect2())
    this.$id_grup_compania_jde.select2(this.get_ConfSelect2())
    this.$id_grup_fase_jde.select2(this.get_ConfSelect2())
}
TarjetaFiltros.prototype.get_ConfDateRangePicker = function () {

    return {
        locale: {
            format: 'YYYY-MM-DD',
            applyLabel: "Aplicar",
            cancelLabel: "Cancelar",
            fromLabel: "Del",
            separator: " al ",
            toLabel: "Al",            
            weekLabel: "S",
            daysOfWeek: [
                "Do",
                "Lu",
                "Ma",
                "Mi",
                "Ju",
                "Vi",
                "Sa"
            ],
            monthNames: [
                "Enero",
                "Febrero",
                "Marzo",
                "Abril",
                "Mayo",
                "Junio",
                "Julio",
                "Agosto",
                "Septiembre",
                "Octubre",
                "Noviembre",
                "Diciembre"
            ],          
        },
        startDate: '2017-01-01'
    }    
}
TarjetaFiltros.prototype.get_ConfSelect2 = function () {
    return {
        width: '100%'
    }
}
TarjetaFiltros.prototype.init_Events = function () {

    this.$boton_colapsible.on("click", this, this.click_BotonColapsible)
    this.$boton_buscar.on("click", this, this.click_BotonBuscar)
    this.$boton_limpiar.on("click", this, this.click_BotonLimpiar)
}
TarjetaFiltros.prototype.click_BotonColapsible = function (e){

    if ($("#boton_colapsible").hasClass('mdi-caret-down-circle')){

        $("#boton_colapsible").removeClass('mdi-caret-down-circle').addClass('mdi-caret-up-circle')
    }
    else if($("#boton_colapsible").hasClass('mdi-caret-up-circle')){

        $("#boton_colapsible").removeClass('mdi-caret-up-circle').addClass('mdi-caret-down-circle')
    }
}
TarjetaFiltros.prototype.get_Values = function (_page, _pageSize) {

    return {
        page: _page,
        pageSize: _pageSize,
        
        pers_primer_nombre: this.$id_pers_primer_nombre.val(),
        pers_segundo_nombre: this.$id_pers_segundo_nombre.val(),
        pers_apellido_paterno: this.$id_pers_apellido_paterno.val(),
        pers_apellido_materno: this.$id_pers_apellido_materno.val(),
        pers_genero_clave: $("input[name='pers_genero_clave']:checked").val(),
        pers_empleado_numero: this.$id_pers_empleado_numero.val(),
        pers_tipo_codigo: this.$id_pers_tipo_codigo.val(),
        asig_puesto_clave: this.$id_asig_puesto_clave.val(),
        asig_organizacion_clave: this.$id_asig_organizacion_clave.val(),
        pers_fecha_contratacion_desde: this.$fecha_contratacion.val().split(" al ")[0],
        pers_fecha_contratacion_hasta: this.$fecha_contratacion.val().split(" al ")[1],
        grup_compania_jde: this.$id_grup_compania_jde.val(),
        //zona: this.$id_zona.val(),
        grup_fase_jde: this.$id_grup_fase_jde.val(),
        grup_nomina_jde: $("input[name='grup_nomina_jde']:checked").val(),
    }
}
TarjetaFiltros.prototype.get_FiltrosExcel = function () {
        
    return {        
        pers_primer_nombre: this.$id_pers_primer_nombre.val(),
        pers_segundo_nombre: this.$id_pers_segundo_nombre.val(),
        pers_apellido_paterno: this.$id_pers_apellido_paterno.val(),
        pers_apellido_materno: this.$id_pers_apellido_materno.val(),
        pers_genero_clave: $("input[name='pers_genero_clave']:checked").val(),
        pers_empleado_numero: this.$id_pers_empleado_numero.val(),
        pers_tipo_codigo: this.$id_pers_tipo_codigo.val(),
        asig_puesto_clave: this.$id_asig_puesto_clave.val(),
        asig_organizacion_clave: this.$id_asig_organizacion_clave.val(),
        pers_fecha_contratacion_desde: this.$fecha_contratacion.val().split(" al ")[0],
        pers_fecha_contratacion_hasta: this.$fecha_contratacion.val().split(" al ")[1],
        grup_compania_jde: this.$id_grup_compania_jde.val(),
        //zona: this.$id_zona.val(),
        grup_fase_jde: this.$id_grup_fase_jde.val(),
        grup_nomina_jde: $("input[name='grup_nomina_jde']:checked").val(),
    }
}
TarjetaFiltros.prototype.click_BotonBuscar = function (e) {
    
    e.preventDefault()
    tarjeta_resultados.grid.buscar()
}
TarjetaFiltros.prototype.click_BotonLimpiar = function (e) {
    
    e.preventDefault()
    e.data.$id_pers_primer_nombre.val("")
    e.data.$id_pers_segundo_nombre.val("")
    e.data.$id_pers_apellido_paterno.val("")
    e.data.$id_pers_apellido_materno.val("")
    e.data.$id_pers_genero_clave.prop('checked', false)
    e.data.$id_pers_empleado_numero.val("")
    e.data.$id_pers_tipo_codigo.data('select2').val(0)
    e.data.$id_asig_puesto_clave.data('select2').val(0)
    e.data.$id_asig_organizacion_clave.data('select2').val(0)
    e.data.$fecha_contratacion.data('daterangepicker').setStartDate('2017-01-01')
    e.data.$fecha_contratacion.data('daterangepicker').setEndDate(
        moment().format('YYYY-MM-DD')
    )
    e.data.$id_grup_compania_jde.data('select2').val(0)
    //e.data.$id_zona.val("")
    e.data.$id_grup_fase_jde.data('select2').val(0)
    e.data.$id_grup_nomina_jde.prop('checked', false)
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

    this.$boton_excel = $('#boton_excel')
    this.init()
}
ToolBar.prototype.init = function () {

    this.$boton_excel.on("click", this, this.click_BotonExportar)
}
ToolBar.prototype.Inicializar_CeldasExcel = function (e) {

    if (tarjeta_resultados.grid.get_Columnas != null)
    {
        if (tarjeta_resultados.grid.get_Columnas.length != 1) {
            tarjeta_resultados.grid.get_Columnas.length = 0;
        }
    }

    this.kRows = [{
        cells: this.get_Celdas()
    }];
}
ToolBar.prototype.click_BotonExportar = function (e) {
    
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
                    title: "Empleados",
                    rows: e.data.kRows
                }
            ]
        });
        kendo.saveAs({
            dataURI: workbook.toDataURL(),
            fileName: "ListadoEmpleados.xlsx",
        });
    });
}
ToolBar.prototype.get_Celdas = function () {
    
    var celdas = []
    var columnas = tarjeta_resultados.grid.get_Columnas()

    for (var i=0; i < columnas.length; i++) {
        campo = columnas[i].title
        celdas.push({ value: campo })
    }
    return celdas
}
ToolBar.prototype.get_Registros_Excel = function (data) {
    
    var registros = []
    var columnas = tarjeta_resultados.grid.get_Columnas()

    for (var i=0; i < columnas.length; i++) {
        campo = columnas[i].field
        registros.push({ value: data[campo] })
    }
    return registros
}
ToolBar.prototype.get_Columnas_Excel_Ancho = function () {
    
    var columnas_excel = []

    for (var i=0; i < tarjeta_resultados.grid.get_Columnas().length; i++) {
        columnas_excel.push({ autoWidth: true })
    }
    return columnas_excel
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

    kendo.culture("es-MX")
    this.kfuente_datos = new kendo.data.DataSource(this.get_DataSourceConfig())
    this.kfuente_datos_excel = new kendo.data.DataSource(this.get_FuenteDatosExcel())
    this.kgrid = this.$id.kendoGrid(this.get_Configuracion())
}
Grid.prototype.get_DataSourceConfig = function (e) {

    return {

        serverPaging: true,
        pageSize: 10,
        transport: {
            read: {

                url: url_empleados_bypage,
                type: "GET",
                dataType: "json",
            },
            parameterMap: function (data, action) {
                if (action === "read"){
                    return tarjeta_filtros.get_Values(data.page, data.pageSize)
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
Grid.prototype.get_FuenteDatosExcel = function (e) {

    return {

        serverPaging: true,
        pageSize: 10,
        transport: {
            read: {

                url: url_empleados,
                type: "GET",
                dataType: "json",
            },
            parameterMap: function (data, action) {
                if (action === "read"){
                    return tarjeta_filtros.get_FiltrosExcel()
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
Grid.prototype.get_Campos = function () {

    return {
        pers_empleado_numero : { type: "string" },
        pers_tipo_desc : { type: "string" },
        pers_fecha_contratacion : { type: "date" },
        pers_primer_nombre : { type: "string" },
        pers_segundo_nombre : { type: "string" },
        pers_apellido_paterno : { type: "string" },
        pers_apellido_materno : { type: "string" },
        pers_titulo : { type: "string" },
        pers_genero_desc : { type: "string" },
        pers_curp : { type: "string" },
        pers_rfc : { type: "string" },
        pers_numero_imss : { type: "string" },
        pers_ife : { type: "string" },
        pers_fecha_nacimiento : { type: "date" },
        pers_ciudad_nacimiento : { type: "string" },
        pers_estado_nacimiento : { type: "string" },
        pers_pais_nacimiento_clave : { type: "string" },
        pers_estado_civil_desc : { type: "string" },
        pers_email : { type: "string" },
        asig_tipo_empleado : { type: "string" },

        asig_fecha_inicio : { type: "date" },
        asig_organizacion_desc : { type: "string" },
        asig_trabajo_desc : { type: "string" },
        asig_grado_desc : { type: "string" },
        asig_ubicacion_desc : { type: "string" },
        asig_puesto_desc : { type: "string" },
        asig_jefe_directo_desc : { type: "string" },
        asig_nomina_desc : { type: "string" },
        asig_estado_desc : { type: "string" },
        asig_salario_base_desc : { type: "string" },
        informacion_estatutaria_desc : { type: "string" },

        grup_nomina_jde : { type: "string" },
        grup_compania_jde : { type: "string" },
        grup_proyecto_code_jde : { type: "string" },
        grup_proyecto_jde : { type: "string" },
        grup_fase_code_jde : { type: "string" },
        grup_fase_jde : { type: "string" },
        grup_puesto_jde : { type: "string" },

        metodo_banco : { type: "string" },
        metodo_nombre : { type: "string" },
        metodo_tipo : { type: "string" },
        metodo_prioridad : { type: "string" },
        metodo_importe_saldo : { type: "number" },
        metodo_porcentaje : { type: "number" },
        metodo_pago : { type: "string" },
        metodo_sucursal : { type: "string" },
        metodo_cuenta : { type: "string" },
        metodo_clabe : { type: "string" },
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
        { field: "pers_empleado_numero", title: "Número", width: "100px" },
        { field: "pers_tipo_desc", title: "Tipo", width: "100px" },
        { field: "pers_fecha_contratacion", title: "Fecha contratación", width: "130px", format: "{0:dd-MM-yyyy}" },
        { field: "pers_primer_nombre", title: "Primer nombre", width: "120px" },
        { field: "pers_segundo_nombre", title: "Segundo nombre", width: "120px" },
        { field: "pers_apellido_paterno", title: "Apellido paterno", width: "120px" },
        { field: "pers_apellido_materno", title: "Apellido materno", width: "120px" },
        { field: "pers_titulo", title: "Título", width: "100px" },
        { field: "pers_genero_desc", title: "Género", width: "100px" },
        { field: "pers_curp", title: "CURP", width: "160px" },
        { field: "pers_rfc", title: "RFC", width: "150px" },
        { field: "pers_numero_imss", title: "IMSS", width: "120px" },
        { field: "pers_ife", title: "IFE", width: "110px" },
        { field: "pers_fecha_nacimiento", title: "Fecha de nacimiento", width: "140px", format: "{0:dd-MM-yyyy}" },
        { field: "pers_ciudad_nacimiento", title: "Ciudad de nacimiento", width: "140px" },
        { field: "pers_estado_nacimiento", title: "Estado de nacimiento", width: "140px" },
        { field: "pers_pais_nacimiento_clave", title: "País de nacimiento", width: "140px" },
        { field: "pers_estado_civil_desc", title: "Estado civil", width: "100px" },
        { field: "pers_email", title: "Correo electrónico", width: "160px" },
        { field: "asig_tipo_empleado", title: "TipoN", width: "80px" },

        { field: "asig_fecha_inicio", title: "Fecha inicio asignación", width: "160px", format: "{0:dd-MM-yyyy}" },
        { field: "asig_organizacion_desc", title: "Organización", width: "200px" },
        { field: "asig_trabajo_desc", title: "Trabajo", width: "100px" },
        { field: "asig_grado_desc", title: "Grado", width: "120px" },
        { field: "asig_ubicacion_desc", title: "Ubicación", width: "200px" },
        { field: "asig_puesto_desc", title: "Puesto", width: "280px" },
        { field: "asig_jefe_directo_desc", title: "Jefe directo", width: "200px" },
        { field: "asig_nomina_desc", title: "Nómina", width: "120px" },
        { field: "asig_estado_desc", title: "Estado asig", width: "120px" },
        { field: "asig_salario_base_desc", title: "Base salario", width: "120px" },
        { field: "informacion_estatutaria_desc", title: "Información estatutaria", width: "300px" },

        { field: "grup_nomina_jde", title: "Nómina JDE", width: "120px" },
        { field: "grup_compania_jde", title: "Compañia JDE", width: "150px" },
        { field: "grup_proyecto_code_jde", title: "Proyecto cod. JDE", width: "130px" },
        { field: "grup_proyecto_jde", title: "Proyecto JDE", width: "200px" },
        { field: "grup_fase_code_jde", title: "Fase cod. JDE", width: "100px" },
        { field: "grup_fase_jde", title: "Fase JDE", width: "100px" },
        { field: "grup_puesto_jde", title: "Puesto IMSS", width: "150px" },

        { field: "metodo_banco", title: "Banco", width: "100px" },
        { field: "metodo_nombre", title: "Método pago", width: "100px" },
        { field: "metodo_tipo", title: "Tipo", width: "100px" },
        { field: "metodo_prioridad", title: "Prioridad", width: "100px" },
        { field: "metodo_importe_saldo", title: "Importe saldo", width: "100px" },
        { field: "metodo_porcentaje", title: "Porcentaje", width: "100px" },
        { field: "metodo_pago", title: "Detalle adicional", width: "120px" },
        { field: "metodo_sucursal", title: "Sucursal", width: "100px" },
        { field: "metodo_cuenta", title: "Cuenta", width: "100px" },
        { field: "metodo_clabe", title: "Clabe", width: "160px" },
    ]
}
Grid.prototype.buscar = function() {
    
    this.kfuente_datos.page(1)
}
Grid.prototype.leer_Datos = function() {
    
    this.kfuente_datos_excel.read()
}