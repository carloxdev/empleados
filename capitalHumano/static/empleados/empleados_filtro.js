/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:
var url_empleados_bypage = window.location.origin + "/api/viewempleadosfull_bypage/"
var url_empleados = window.location.origin + "/api/viewempleadosfull/"

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
    this.$id_pers_genero_clave = $("#id_pers_genero_clave")
    this.$id_pers_empleado_numero = $("#id_pers_empleado_numero")
    this.$id_pers_tipo_codigo = $('#id_pers_tipo_codigo')
    this.$id_asig_puesto_clave = $("#id_asig_puesto_clave")
    this.$id_asig_organizacion_clave = $("#id_asig_organizacion_clave")
    this.$id_grup_compania_jde = $('#id_grup_compania_jde')
    this.$id_zona = $("#id_zona")
    this.$id_metodo_sucursal = $("#id_metodo_sucursal")
    this.$id_grup_nomina_jde = $("#id_grup_nomina_jde")
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
    this.$id_metodo_sucursal.select2(this.get_ConfSelect2())
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
        zona: this.$id_zona.val(),
        metodo_sucursal: this.$id_metodo_sucursal.val(),
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
        zona: this.$id_zona.val(),
        metodo_sucursal: this.$id_metodo_sucursal.val(),
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
    e.data.$id_grup_compania_jde.val(0)
    e.data.$id_zona.val("")
    e.data.$id_metodo_sucursal.data('select2').val(0)
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
        cells: [
            { value: 'pers_clave' },
            { value: 'pers_tipo_codigo' },
            { value: 'pers_tipo_desc' },
            { value: 'pers_empleado_numero' },
            { value: 'pers_titulo' },
            { value: 'pers_primer_nombre' },
            { value: 'pers_segundo_nombre' },
            { value: 'pers_apellido_paterno' },
            { value: 'pers_apellido_materno' },
            { value: 'pers_nombre_completo' },
            { value: 'pers_genero_clave' },
            { value: 'pers_genero_desc' },
            { value: 'pers_curp' },
            { value: 'pers_nacionalidad_clave' },
            { value: 'pers_rfc' },
            { value: 'pers_numero_imss' },
            { value: 'pers_ife' },
            { value: 'pers_fecha_nacimiento' },
            { value: 'pers_ciudad_nacimiento' },
            { value: 'pers_estado_nacimiento' },
            { value: 'pers_pais_nacimiento_clave' },
            { value: 'pers_fecha_efective_desde' },
            { value: 'pers_fecha_efective_hasta' },
            { value: 'pers_email' },
            { value: 'pers_estado_civil' },
            { value: 'pers_estado_civil_desc' },
            { value: 'pers_fecha_contratacion' },
            { value: 'asig_clave' },
            { value: 'asig_empleado_numero' },
            { value: 'asig_persona_clave' },
            { value: 'asig_fecha_inicio' },
            { value: 'asig_fecha_fin' },
            { value: 'asig_organizacion_clave' },
            { value: 'asig_organizacion_desc' },
            { value: 'asig_trabajo_clave' },
            { value: 'asig_trabajo_desc' },
            { value: 'asig_grado_clave' },
            { value: 'asig_grado_desc' },
            { value: 'asig_ubicacion_clave' },
            { value: 'asig_ubicacion_desc' },
            { value: 'asig_grupo_clave' },
            { value: 'asig_grupo_desc' },
            { value: 'asig_puesto_clave' },
            { value: 'asig_puesto_desc' },
            { value: 'asig_nomina_clave' },
            { value: 'asig_nomina_desc' },
            { value: 'asig_estado_clave' },
            { value: 'asig_estado_desc' },
            { value: 'asig_categoria_codigo' },
            { value: 'asig_salario_base_clave' },
            { value: 'asig_salario_base_desc' },
            { value: 'informacion_estatutaria_clave' },
            { value: 'informacion_estatutaria_desc' },
            { value: 'asig_version' },
            { value: 'asig_jefe_directo_clave' },
            { value: 'asig_jefe_directo_desc' },
            { value: 'asig_salario_in' },
            { value: 'asig_salario_out' },
            { value: 'asig_tipo_empleado' },
            { value: 'grup_clave' },
            { value: 'grup_nombre' },
            { value: 'grup_bandera_habilitado' },
            { value: 'grup_nomina_jde' },
            { value: 'grup_compania_jde' },
            { value: 'grup_proyecto_jde' },
            { value: 'grup_proyecto_code_jde' },
            { value: 'grup_fase_jde' },
            { value: 'grup_fase_code_jde' },
            { value: 'grup_puesto_jde' },
            { value: 'grup_puesto_code_jde' },
            { value: 'metodo_asignacion_id' },
            { value: 'metodo_nombre' },
            { value: 'metodo_tipo' },
            { value: 'metodo_prioridad' },
            { value: 'metodo_fecha_efec_desde' },
            { value: 'metodo_fecha_efec_hasta' },
            { value: 'metodo_importe_saldo' },
            { value: 'metodo_porcentaje' },
            { value: 'metodo_pago' },
            { value: 'metodo_sucursal' },
            { value: 'metodo_cuenta' },
            { value: 'metodo_banco' },
            { value: 'metodo_tipo_cuenta_id' },
            { value: 'metodo_clabe' },
        ]
    }];
}
ToolBar.prototype.click_BotonExportar = function (e) {
    
    tarjeta_resultados.grid.leer_Datos()
    e.data.Inicializar_CeldasExcel()

    tarjeta_resultados.grid.kfuente_datos_excel.fetch(function () {

        var data = this.data();
        for (var i = 0; i < data.length; i++) {

            e.data.kRows.push({
                cells: [
                    { value: data[i].pers_clave },
                    { value: data[i].pers_tipo_codigo },
                    { value: data[i].pers_tipo_desc },
                    { value: data[i].pers_empleado_numero },
                    { value: data[i].pers_titulo },
                    { value: data[i].pers_primer_nombre },
                    { value: data[i].pers_segundo_nombre },
                    { value: data[i].pers_apellido_paterno },
                    { value: data[i].pers_apellido_materno },
                    { value: data[i].pers_nombre_completo },
                    { value: data[i].pers_genero_clave },
                    { value: data[i].pers_genero_desc },
                    { value: data[i].pers_curp },
                    { value: data[i].pers_nacionalidad_clave },
                    { value: data[i].pers_rfc },
                    { value: data[i].pers_numero_imss },
                    { value: data[i].pers_ife },
                    { value: data[i].pers_fecha_nacimiento },
                    { value: data[i].pers_ciudad_nacimiento },
                    { value: data[i].pers_estado_nacimiento },
                    { value: data[i].pers_pais_nacimiento_clave },
                    { value: data[i].pers_fecha_efective_desde },
                    { value: data[i].pers_fecha_efective_hasta },
                    { value: data[i].pers_email },
                    { value: data[i].pers_estado_civil },
                    { value: data[i].pers_estado_civil_desc },
                    { value: data[i].pers_fecha_contratacion },
                    { value: data[i].asig_clave },
                    { value: data[i].asig_empleado_numero },
                    { value: data[i].asig_persona_clave },
                    { value: data[i].asig_fecha_inicio },
                    { value: data[i].asig_fecha_fin },
                    { value: data[i].asig_organizacion_clave },
                    { value: data[i].asig_organizacion_desc },
                    { value: data[i].asig_trabajo_clave },
                    { value: data[i].asig_trabajo_desc },
                    { value: data[i].asig_grado_clave },
                    { value: data[i].asig_grado_desc },
                    { value: data[i].asig_ubicacion_clave },
                    { value: data[i].asig_ubicacion_desc },
                    { value: data[i].asig_grupo_clave },
                    { value: data[i].asig_grupo_desc },
                    { value: data[i].asig_puesto_clave },
                    { value: data[i].asig_puesto_desc },
                    { value: data[i].asig_nomina_clave },
                    { value: data[i].asig_nomina_desc },
                    { value: data[i].asig_estado_clave },
                    { value: data[i].asig_estado_desc },
                    { value: data[i].asig_categoria_codigo },
                    { value: data[i].asig_salario_base_clave },
                    { value: data[i].asig_salario_base_desc },
                    { value: data[i].informacion_estatutaria_clave },
                    { value: data[i].informacion_estatutaria_desc },
                    { value: data[i].asig_version },
                    { value: data[i].asig_jefe_directo_clave },
                    { value: data[i].asig_jefe_directo_desc },
                    { value: data[i].asig_salario_in },
                    { value: data[i].asig_salario_out },
                    { value: data[i].asig_tipo_empleado },
                    { value: data[i].grup_clave },
                    { value: data[i].grup_nombre },
                    { value: data[i].grup_bandera_habilitado },
                    { value: data[i].grup_nomina_jde },
                    { value: data[i].grup_compania_jde },
                    { value: data[i].grup_proyecto_jde },
                    { value: data[i].grup_proyecto_code_jde },
                    { value: data[i].grup_fase_jde },
                    { value: data[i].grup_fase_code_jde },
                    { value: data[i].grup_puesto_jde },
                    { value: data[i].grup_puesto_code_jde },
                    { value: data[i].metodo_asignacion_id },
                    { value: data[i].metodo_nombre },
                    { value: data[i].metodo_tipo },
                    { value: data[i].metodo_prioridad },
                    { value: data[i].metodo_fecha_efec_desde },
                    { value: data[i].metodo_fecha_efec_hasta },
                    { value: data[i].metodo_importe_saldo },
                    { value: data[i].metodo_porcentaje },
                    { value: data[i].metodo_pago },
                    { value: data[i].metodo_sucursal },
                    { value: data[i].metodo_cuenta },
                    { value: data[i].metodo_banco },
                    { value: data[i].metodo_tipo_cuenta_id },
                    { value: data[i].metodo_clabe },
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
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
                        { autoWidth: true },
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
        pers_clave : { type: "number" },
        pers_tipo_codigo : { type: "number" },
        pers_tipo_desc : { type: "string" },
        pers_empleado_numero : { type: "string" },
        pers_titulo : { type: "string" },
        pers_primer_nombre : { type: "string" },
        pers_segundo_nombre : { type: "string" },
        pers_apellido_paterno : { type: "string" },
        pers_apellido_materno : { type: "string" },
        pers_nombre_completo : { type: "string" },
        pers_genero_clave : { type: "string" },
        pers_genero_desc : { type: "string" },
        pers_curp : { type: "string" },
        pers_nacionalidad_clave : { type: "string" },
        pers_rfc : { type: "string" },
        pers_numero_imss : { type: "string" },
        pers_ife : { type: "string" },
        pers_fecha_nacimiento : { type: "string" },
        pers_ciudad_nacimiento : { type: "string" },
        pers_estado_nacimiento : { type: "string" },
        pers_pais_nacimiento_clave : { type: "string" },
        pers_fecha_efective_desde : { type: "string" },
        pers_fecha_efective_hasta : { type: "string" },
        pers_email : { type: "string" },
        pers_estado_civil : { type: "string" },
        pers_estado_civil_desc : { type: "string" },
        pers_fecha_contratacion : { type: "string" },
        asig_clave : { type: "number" },
        asig_empleado_numero : { type: "string" },
        asig_persona_clave : { type: "number" },
        asig_fecha_inicio : { type: "date" },
        asig_fecha_fin : { type: "date" },
        asig_organizacion_clave : { type: "number" },
        asig_organizacion_desc : { type: "string" },
        asig_trabajo_clave : { type: "number" },
        asig_trabajo_desc : { type: "string" },
        asig_grado_clave : { type: "number" },
        asig_grado_desc : { type: "string" },
        asig_ubicacion_clave : { type: "number" },
        asig_ubicacion_desc : { type: "string" },
        asig_grupo_clave : { type: "number" },
        asig_grupo_desc : { type: "string" },
        asig_puesto_clave : { type: "number" },
        asig_puesto_desc : { type: "string" },
        asig_nomina_clave : { type: "number" },
        asig_nomina_desc : { type: "string" },
        asig_estado_clave : { type: "number" },
        asig_estado_desc : { type: "string" },
        asig_categoria_codigo : { type: "string" },
        asig_salario_base_clave : { type: "number" },
        asig_salario_base_desc : { type: "string" },
        informacion_estatutaria_clave : { type: "number" },
        informacion_estatutaria_desc : { type: "string" },
        asig_version : { type: "number" },
        asig_jefe_directo_clave : { type: "number" },
        asig_jefe_directo_desc : { type: "string" },
        asig_salario_in : { type: "number" },
        asig_salario_out : { type: "string" },
        asig_tipo_empleado : { type: "string" },
        grup_clave : { type: "number" },
        grup_nombre : { type: "string" },
        grup_bandera_habilitado : { type: "string" },
        grup_nomina_jde : { type: "string" },
        grup_compania_jde : { type: "string" },
        grup_proyecto_jde : { type: "string" },
        grup_proyecto_code_jde : { type: "string" },
        grup_fase_jde : { type: "string" },
        grup_fase_code_jde : { type: "string" },
        grup_puesto_jde : { type: "string" },
        grup_puesto_code_jde : { type: "string" },
        metodo_asignacion_id : { type: "number" },
        metodo_nombre : { type: "string" },
        metodo_tipo : { type: "string" },
        metodo_prioridad : { type: "number" },
        metodo_fecha_efec_desde : { type: "date" },
        metodo_fecha_efec_hasta : { type: "date" },
        metodo_importe_saldo : { type: "number" },
        metodo_porcentaje : { type: "number" },
        metodo_pago : { type: "string" },
        metodo_sucursal : { type: "string" },
        metodo_cuenta : { type: "string" },
        metodo_banco : { type: "string" },
        metodo_tipo_cuenta_id : { type: "string" },
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
        { field: "pers_clave", title: "pers_clave", width: "100px" },
        { field: "pers_tipo_codigo", title: "pers_tipo_codigo", width: "100px" },
        { field: "pers_tipo_desc", title: "pers_tipo_desc", width: "100px" },
        { field: "pers_empleado_numero", title: "pers_empleado_numero", width: "100px" },
        { field: "pers_titulo", title: "pers_titulo", width: "100px" },
        { field: "pers_primer_nombre", title: "pers_primer_nombre", width: "100px" },
        { field: "pers_segundo_nombre", title: "pers_segundo_nombre", width: "100px" },
        { field: "pers_apellido_paterno", title: "pers_apellido_paterno", width: "100px" },
        { field: "pers_apellido_materno", title: "pers_apellido_materno", width: "100px" },
        { field: "pers_nombre_completo", title: "pers_nombre_completo", width: "100px" },
        { field: "pers_genero_clave", title: "pers_genero_clave", width: "100px" },
        { field: "pers_genero_desc", title: "pers_genero_desc", width: "100px" },
        { field: "pers_curp", title: "pers_curp", width: "100px" },
        { field: "pers_nacionalidad_clave", title: "pers_nacionalidad_clave", width: "100px" },
        { field: "pers_rfc", title: "pers_rfc", width: "100px" },
        { field: "pers_numero_imss", title: "pers_numero_imss", width: "100px" },
        { field: "pers_ife", title: "pers_ife", width: "100px" },
        { field: "pers_fecha_nacimiento", title: "pers_fecha_nacimiento", width: "100px" },
        { field: "pers_ciudad_nacimiento", title: "pers_ciudad_nacimiento", width: "100px" },
        { field: "pers_estado_nacimiento", title: "pers_estado_nacimiento", width: "100px" },
        { field: "pers_pais_nacimiento_clave", title: "pers_pais_nacimiento_clave", width: "100px" },
        { field: "pers_fecha_efective_desde", title: "pers_fecha_efective_desde", width: "100px" },
        { field: "pers_fecha_efective_hasta", title: "pers_fecha_efective_hasta", width: "100px" },
        { field: "pers_email", title: "pers_email", width: "100px" },
        { field: "pers_estado_civil", title: "pers_estado_civil", width: "100px" },
        { field: "pers_estado_civil_desc", title: "pers_estado_civil_desc", width: "100px" },
        { field: "pers_fecha_contratacion", title: "pers_fecha_contratacion", width: "100px" },
        { field: "asig_clave", title: "asig_clave", width: "100px" },
        { field: "asig_empleado_numero", title: "asig_empleado_numero", width: "100px" },
        { field: "asig_persona_clave", title: "asig_persona_clave", width: "100px" },
        { field: "asig_fecha_inicio", title: "asig_fecha_inicio", width: "100px", format: "{0:dd-MM-yyyy}" },
        { field: "asig_fecha_fin", title: "asig_fecha_fin", width: "100px", format: "{0:dd-MM-yyyy}" },
        { field: "asig_organizacion_clave", title: "asig_organizacion_clave", width: "100px" },
        { field: "asig_organizacion_desc", title: "asig_organizacion_desc", width: "100px" },
        { field: "asig_trabajo_clave", title: "asig_trabajo_clave", width: "100px" },
        { field: "asig_trabajo_desc", title: "asig_trabajo_desc", width: "100px" },
        { field: "asig_grado_clave", title: "asig_grado_clave", width: "100px" },
        { field: "asig_grado_desc", title: "asig_grado_desc", width: "100px" },
        { field: "asig_ubicacion_clave", title: "asig_ubicacion_clave", width: "100px" },
        { field: "asig_ubicacion_desc", title: "asig_ubicacion_desc", width: "100px" },
        { field: "asig_grupo_clave", title: "asig_grupo_clave", width: "100px" },
        { field: "asig_grupo_desc", title: "asig_grupo_desc", width: "100px" },
        { field: "asig_puesto_clave", title: "asig_puesto_clave", width: "100px" },
        { field: "asig_puesto_desc", title: "asig_puesto_desc", width: "100px" },
        { field: "asig_nomina_clave", title: "asig_nomina_clave", width: "100px" },
        { field: "asig_nomina_desc", title: "asig_nomina_desc", width: "100px" },
        { field: "asig_estado_clave", title: "asig_estado_clave", width: "100px" },
        { field: "asig_estado_desc", title: "asig_estado_desc", width: "100px" },
        { field: "asig_categoria_codigo", title: "asig_categoria_codigo", width: "100px" },
        { field: "asig_salario_base_clave", title: "asig_salario_base_clave", width: "100px" },
        { field: "asig_salario_base_desc", title: "asig_salario_base_desc", width: "100px" },
        { field: "informacion_estatutaria_clave", title: "informacion_estatutaria_clave", width: "100px" },
        { field: "informacion_estatutaria_desc", title: "informacion_estatutaria_desc", width: "100px" },
        { field: "asig_version", title: "asig_version", width: "100px" },
        { field: "asig_jefe_directo_clave", title: "asig_jefe_directo_clave", width: "100px" },
        { field: "asig_jefe_directo_desc", title: "asig_jefe_directo_desc", width: "100px" },
        { field: "asig_salario_in", title: "asig_salario_in", width: "100px" },
        { field: "asig_salario_out", title: "asig_salario_out", width: "100px" },
        { field: "asig_tipo_empleado", title: "asig_tipo_empleado", width: "100px" },
        { field: "grup_clave", title: "grup_clave", width: "100px" },
        { field: "grup_nombre", title: "grup_nombre", width: "100px" },
        { field: "grup_bandera_habilitado", title: "grup_bandera_habilitado", width: "100px" },
        { field: "grup_nomina_jde", title: "grup_nomina_jde", width: "100px" },
        { field: "grup_compania_jde", title: "grup_compania_jde", width: "100px" },
        { field: "grup_proyecto_jde", title: "grup_proyecto_jde", width: "100px" },
        { field: "grup_proyecto_code_jde", title: "grup_proyecto_code_jde", width: "100px" },
        { field: "grup_fase_jde", title: "grup_fase_jde", width: "100px" },
        { field: "grup_fase_code_jde", title: "grup_fase_code_jde", width: "100px" },
        { field: "grup_puesto_jde", title: "grup_puesto_jde", width: "100px" },
        { field: "grup_puesto_code_jde", title: "grup_puesto_code_jde", width: "100px" },
        { field: "metodo_asignacion_id", title: "metodo_asignacion_id", width: "100px" },
        { field: "metodo_nombre", title: "metodo_nombre", width: "100px" },
        { field: "metodo_tipo", title: "metodo_tipo", width: "100px" },
        { field: "metodo_prioridad", title: "metodo_prioridad", width: "100px" },
        { field: "metodo_fecha_efec_desde", title: "metodo_fecha_efec_desde", width: "100px", format: "{0:dd-MM-yyyy}" },
        { field: "metodo_fecha_efec_hasta", title: "metodo_fecha_efec_hasta", width: "100px", format: "{0:dd-MM-yyyy}" },
        { field: "metodo_importe_saldo", title: "metodo_importe_saldo", width: "100px" },
        { field: "metodo_porcentaje", title: "metodo_porcentaje", width: "100px" },
        { field: "metodo_pago", title: "metodo_pago", width: "100px" },
        { field: "metodo_sucursal", title: "metodo_sucursal", width: "100px" },
        { field: "metodo_cuenta", title: "metodo_cuenta", width: "100px" },
        { field: "metodo_banco", title: "metodo_banco", width: "100px" },
        { field: "metodo_tipo_cuenta_id", title: "metodo_tipo_cuenta_id", width: "100px" },
        { field: "metodo_clabe", title: "metodo_clabe", width: "100px" },

    ]
}
Grid.prototype.buscar = function() {
    
    this.kfuente_datos.page(1)
}
Grid.prototype.leer_Datos = function() {
    
    this.kfuente_datos_excel.read()
}