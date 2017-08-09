/*-----------------------------------------------*\
                             GLOBAL VARIABLES
\*-----------------------------------------------*/

var url_empleados_full_bypage = window.location.origin + "/api-ebs/viewempleadosfull_bypage/"
var url_expediente = window.location.origin  + "/expedientes/"
var url_expediente_personal_bypage = window.location.origin  + "/api-capitalhumano/archivopersonal_bypage/"
var url_expediente_capacitacion_bypage = window.location.origin  + "/api-capitalhumano/archivocapacitacion_bypage/"
var url_documento_personal_excel = window.location.origin  + "/api-capitalhumano/documentopersonal/"
var url_documento_capacitacion_excel = window.location.origin  + "/api-capitalhumano/documentocapacitacion/"

//OBJS
var tarjeta_filtro = null
var tarjeta_filtro_personal = null
var tarjeta_filtro_capacitacion = null
var tarjeta_filtro_grado = null
var grid = null
var grid_capacitacion = null
var grid_personal = null
var grid_grado = null
var toolbar = null
var tarjeta_resultados = null
var valor_opcion = null


/*-----------------------------------------                             LOAD
\*-----------------------------------------------*/

$(document).ready(function(){
     tarjeta_filtro = new TarjetaFiltroEmpleados()
     tarjeta_filtro_personal = new TarjetaFiltroPersonal()
     tarjeta_filtro_capacitacion = new TarjetaFiltroCapacitacion()
     tarjeta_filtro_grado = new TarjetaFiltroGrado()
     tarjeta_resultados = new TargetaResultados()

     // Asigna eventos a teclas
        $(document).keypress(function (e) {
                // Tecla Enter
                if (e.which == 13) {
                        // tarjeta_filtro.aplicar_Filtros()
                }
        })    
})

/*-----------------------------------------------*\
            OBJETO: TARJETA FILTRO EMPLEADOS
\*-----------------------------------------------*/


function TarjetaFiltroEmpleados(){

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
TarjetaFiltroEmpleados.prototype.init_Components = function () {

    this.$asig_organizacion_clave.select2(appnova.get_ConfigSelect2())
    this.$pers_tipo_codigo.select2(appnova.get_ConfigSelect2())
}
TarjetaFiltroEmpleados.prototype.init_Events = function () {

     this.$boton_buscar.on("click", this, this.click_BotonBuscarEmpleados)
     this.$boton_limpiar.on("click", this, this.click_BotonLimpiar)
}
TarjetaFiltroEmpleados.prototype.click_BotonBuscarEmpleados = function (e) {

        e.preventDefault()

        if(popup_empleado_.validar_Campos() != 'True'){
            $('#grid_resultados').empty()
            $('#div_busqueda').removeClass('hidden')
            grid = new Grid()
            grid.buscar()
        }
}
TarjetaFiltroEmpleados.prototype.get_Values = function (_page) {
    
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
                pers_empleado_numero__grado_academico: this.$grado_academico.val(),
     }
}
TarjetaFiltroEmpleados.prototype.validar_Campos = function (){

        bandera = 'False'
        if ((this.$pers_primer_nombre.val() == '') &&
                (this.$pers_segundo_nombre.val() == '') &&
                (this.$pers_apellido_paterno.val() == '') &&
                (this.$pers_apellido_materno.val() == '') &&
                (this.$grup_fase_jde.val() == '') &&
                (this.$pers_empleado_numero.val() == '') &&
                (this.$asig_organizacion_clave.data('select2').val() == 0) &&
                (this.$pers_tipo_codigo.data('select2').val() == 0) &&
                (this.$grado_academico.data('select2').val() == 0)
            ){
            bandera = 'True'
        }
        return bandera
}
TarjetaFiltroEmpleados.prototype.click_BotonLimpiar = function (e) {
        
        e.preventDefault()
        e.data.$pers_primer_nombre.val("")
        e.data.$pers_segundo_nombre.val("")
        e.data.$pers_apellido_paterno.val("")
        e.data.$pers_apellido_materno.val("")
        e.data.$grup_fase_jde.val("")
        e.data.$pers_empleado_numero.val("")
        e.data.$asig_organizacion_clave.data('select2').val(0)  
        e.data.$pers_tipo_codigo.data('select2').val(0)
        e.data.$grado_academico.data('select2').val(0)
}
TarjetaFiltroEmpleados.prototype.probar_Radio = function (e){
    // alert($("input[name='opcion']:checked").val())
    // limpiar radio * e.data.$opcion.prop('checked', false)
}


/*-----------------------------------------------*\
        OBJETO: TARJETA FILTRO DOC PERSONAL
\*-----------------------------------------------*/


function TarjetaFiltroPersonal(){

    this.$opcion = $("input[name='opcion']")
    this.$asig_organizacion_clave_per = $('#id_asig_organizacion_clave_per')
    this.$tipo_documento = $('#id_tipo_documento')

    this.$boton_buscar_doc = $('#boton_buscar_doc')
    this.$boton_limpiar_doc = $('#boton_limpiar_doc')

    this.init_Components()
    this.init_Events()
}
TarjetaFiltroPersonal.prototype.init_Components = function () {

    this.$asig_organizacion_clave_per.select2(appnova.get_ConfigSelect2())
    this.$tipo_documento.select2(appnova.get_ConfigSelect2())
}
TarjetaFiltroPersonal.prototype.init_Events = function () {

     this.$boton_buscar_doc.on("click", this, this.click_BotonBuscar)
     this.$boton_limpiar_doc.on("click", this, this.click_BotonLimpiar)
}
TarjetaFiltroPersonal.prototype.click_BotonBuscar = function (e) {

        e.preventDefault()
        $('#grid_resultados').empty()

        if (tarjeta_filtro_personal.validar_Campos() != 'True'){
            $('#div_busqueda').removeClass('hidden')
            grid_personal = new GridPersonal()
            grid_personal.buscar()
        }
}
TarjetaFiltroPersonal.prototype.click_BotonLimpiar = function (e) {
        
        e.preventDefault()
        e.data.$tipo_documento.data('select2').val(0)
        e.data.$asig_organizacion_clave2.data('select2').val(0)
}
TarjetaFiltroPersonal.prototype.validar_Campos = function (){

        bandera = 'False'
        if ((this.$curso.data('select2').val() == 0) &&
            (this.$tipo_documento.data('select2').val() == 0) &&
            (this.$asig_organizacion_clave.data('select2').val() == 0)
            ){
            bandera = 'True'
        }
        return bandera
}
TarjetaFiltroPersonal.prototype.get_ValuesPersonal = function (_page) {

        return {
                page: _page,
                relacion_personal__tipo_documento: this.$tipo_documento.val(),
                relacion_personal__numero_empleado_organizacion: this.$asig_organizacion_clave_per.val(),
                // opcion: $("input[name='pers_genero_clave']:checked").val(),
                // e.data.$id_pers_genero_clave.prop('checked', false)
     }
}
TarjetaFiltroPersonal.prototype.get_ValuesPersonal_Excel = function () {

        return {

                tipo_documento: this.$tipo_documento.val(),
                numero_empleado_organizacion: this.$asig_organizacion_clave_per.val(),
     }
}


/*-----------------------------------------------*\
        OBJETO: TARJETA FILTRO DOC CAPACITACION
\*-----------------------------------------------*/


function TarjetaFiltroCapacitacion(){

    this.$opcion = $("input[name='opcion']")
    this.$asig_organizacion_clave_cap = $('#id_asig_organizacion_clave_cap')
    this.$curso = $('#id_curso')

    this.$boton_buscar_doc = $('#boton_buscar_doc')
    this.$boton_limpiar_doc = $('#boton_limpiar_doc')

    this.init_Components()
    this.init_Events()
}
TarjetaFiltroCapacitacion.prototype.init_Components = function () {

    this.$asig_organizacion_clave_cap.select2(appnova.get_ConfigSelect2())
    this.$curso.select2(appnova.get_ConfigSelect2())
}
TarjetaFiltroCapacitacion.prototype.init_Events = function () {

     this.$boton_buscar_doc.on("click", this, this.click_BotonBuscar)
     this.$boton_limpiar_doc.on("click", this, this.click_BotonLimpiar)
}
TarjetaFiltroPersonal.prototype.click_BotonBuscar = function (e) {

        e.preventDefault()
        $('#grid_resultados').empty()

        if (tarjeta_filtro_capacitacion.validar_Campos() != 'True'){
            $('#div_busqueda').removeClass('hidden')
            grid_capacitacion = new GridCapacitacion()
            grid_capacitacion.buscar()
        }
}
TarjetaFiltroPersonal.prototype.click_BotonLimpiar = function (e) {
        
        e.preventDefault()
        e.data.$curso.data('select2').val(0)
        e.data.$asig_organizacion_clave_cap.data('select2').val(0)
}
TarjetaFiltroCapacitacion.prototype.get_ValuesCapacitacion = function (_page) {

        return {
                page: _page,
                relacion_capacitacion__curso: this.$curso.val(),
                relacion_capacitacion__numero_empleado_organizacion: this.$asig_organizacion_clave_cap.val(),
     }
}
TarjetaFiltroCapacitacion.prototype.get_ValuesCapacitacion_Excel = function () {

        return {
                page: _page,
                relacion_capacitacion__curso: this.$curso.val(),
                relacion_capacitacion__numero_empleado_organizacion: this.$asig_organizacion_clave_cap.val(),
     }
}
TarjetaFiltroCapacitacion.prototype.validar_Campos = function (){

        bandera = 'False'
        if ((this.$curso.data('select2').val() == 0) &&
            (this.$asig_organizacion_clave_cap.data('select2').val() == 0)
            ){
            bandera = 'True'
        }
        return bandera
}

/*-----------------------------------------------*\
        OBJETO: TARJETA FILTRO GRADO ACADEMICO
\*-----------------------------------------------*/


function TarjetaFiltroGrado(){

    this.$asig_organizacion_clave_grado = $('#id_asig_organizacion_clave_grado')
    this.$grado_academico = $('#id_grado_academico')
    this.$disciplina_academica = $('#id_disciplina_academica')

    this.$boton_buscar = $('#boton_buscar_grado')
    this.$boton_limpiar = $('#boton_limpiar_grado')

    this.init_Components()
    this.init_Events()
}
TarjetaFiltroGrado.prototype.init_Components = function () {

    this.$asig_organizacion_clave_grado.select2(appnova.get_ConfigSelect2())
    this.$grado_academico.select2(appnova.get_ConfigSelect2()) 
    this.$disciplina_academica.select2(appnova.get_ConfigSelect2())
}
TarjetaFiltroGrado.prototype.init_Events = function () {

     // this.$boton_buscar_doc.on("click", this, this.click_BotonBuscar)
     // this.$boton_limpiar_doc.on("click", this, this.click_BotonLimpiar)
}
// TarjetaFiltroGrado.prototype.click_BotonBuscar = function (e) {
//         e.preventDefault()
//         $('#grid_resultados').empty()

//         if (tarjeta_filtro_capacitacion.validar_Campos() != 'True'){
//             $('#div_busqueda').removeClass('hidden')
//             grid_capacitacion = new GridCapacitacion()
//             grid_capacitacion.buscar()
//         }
// }
// TarjetaFiltroGrado.prototype.click_BotonLimpiar = function (e) {
        
//         e.preventDefault()
//         e.data.$curso.data('select2').val(0)
//         e.data.$asig_organizacion_clave_cap.data('select2').val(0)
// }
// TarjetaFiltroGrado.prototype.get_ValuesCapacitacion = function (_page) {

//         return {
//                 page: _page,
//                 relacion_capacitacion__curso: this.$curso.val(),
//                 relacion_capacitacion__numero_empleado_organizacion: this.$asig_organizacion_clave_cap.val(),
//      }
// }
// TarjetaFiltroGrado.prototype.get_ValuesCapacitacion_Excel = function () {

//         return {
//                 page: _page,
//                 relacion_capacitacion__curso: this.$curso.val(),
//                 relacion_capacitacion__numero_empleado_organizacion: this.$asig_organizacion_clave_cap.val(),
//      }
// }
// TarjetaFiltroGrado.prototype.validar_Campos = function (){

//         bandera = 'False'
//         if ((this.$curso.data('select2').val() == 0) &&
//             (this.$asig_organizacion_clave_cap.data('select2').val() == 0)
//             ){
//             bandera = 'True'
//         }
//         return bandera
// }


/*-----------------------------------------------*\
            OBJETO: Tarjeta resultados
\*-----------------------------------------------*/

function TargetaResultados(){

    this.toolbar = new Toolbar()
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
                // grado_academico : { type:"string"}
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
                // { field: "grado_academico", title: "Grado academico", width:"200px" },

        ]
}
Grid.prototype.buscar = function() {

        this.kfuente_datos.page(1)
}


/*-----------------------------------------------*\
            OBJETO: Grid documentos
\*-----------------------------------------------*/


function GridPersonal() {

        this.$id = $("#grid_resultados")
        this.kfuente_datos = null

        this.kgrid = null
        this.init()
}
GridPersonal.prototype.init = function () {

        // Definicion del pais, formato modena, etc..
        kendo.culture("es-MX")

        // Se inicializa la fuente da datos (datasource)
        this.kfuente_datos = new kendo.data.DataSource(this.get_DataSourceConfig())
        this.kfuente_datos_excel = new kendo.data.DataSource(this.get_FuenteDatosExcel())
        
        // Se inicializa y configura el grid:
        this.kgrid = this.$id.kendoGrid(this.get_Configuracion())
}
GridPersonal.prototype.get_DataSourceConfig = function () {

        return {

                serverPaging: true,
                pageSize: 10,
                transport: {
                        read: {

                                url: url_expediente_personal_bypage,
                                type: "GET",
                                dataType: "json",
                        },
                        parameterMap: function (data, action) {
                                if (action === "read"){
                                        return tarjeta_filtro.get_ValuesPersonal(data.page)
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
GridPersonal.prototype.get_Campos = function () {

        return {
                numero_empleado : { type: "string" },
                organizacion : { type: "string"},
                nombre_completo : { type: "string"},
        }
}
GridPersonal.prototype.get_Configuracion = function () {

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
GridPersonal.prototype.get_Columnas = function () {

        return [  
                {   field: "numero_empleado", 
                    title: "No. de empleado", 
                    width:"150px" ,
                    template: '<a href="#=url_expediente + numero_empleado #/expediente/">#=numero_empleado#</a>',
                },
                { field: "nombre_completo", title: "Nombre", width:"300px"},
                { field: "organizacion", title: "Organización", width:"300px"},

        ]
}
GridPersonal.prototype.buscar = function() {
    
        this.kfuente_datos.page(1)
}
GridPersonal.prototype.leer_Datos = function() {
    
    this.kfuente_datos_excel.read()
}
GridPersonal.prototype.get_FuenteDatosExcel = function (e) {

    return {

        transport: {
            read: {

                url: url_documento_personal_excel, // NO filtra xq aqui no existen dos campos
                type: "GET",
                dataType: "json",
            },
            parameterMap: function (data, action) {
                if (action === "read") {

                    return tarjeta_filtro.get_ValuesPersonal_Excel()
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
            OBJETO: Grid documento capacitacion
\*-----------------------------------------------*/


function GridCapacitacion() {

        this.$id = $("#grid_resultados")
        this.kfuente_datos = null

        this.kgrid = null
        this.init()
}
GridCapacitacion.prototype.init = function () {

        // Definicion del pais, formato modena, etc..
        kendo.culture("es-MX")

        // Se inicializa la fuente da datos (datasource)
        this.kfuente_datos = new kendo.data.DataSource(this.get_DataSourceConfig())
        this.kfuente_datos_excel = new kendo.data.DataSource(this.get_FuenteDatosExcel())
        
        // Se inicializa y configura el grid:
        this.kgrid = this.$id.kendoGrid(this.get_Configuracion())
}
GridCapacitacion.prototype.get_DataSourceConfig = function () {

        return {

                serverPaging: true,
                pageSize: 10,
                transport: {
                        read: {

                                url: url_expediente_capacitacion_bypage,
                                type: "GET",
                                dataType: "json",
                        },
                        parameterMap: function (data, action) {
                                if (action === "read"){
                                        return tarjeta_filtro.get_ValuesCapacitacion(data.page)
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
GridCapacitacion.prototype.get_Campos = function () {

        return {
                numero_empleado : { type: "string" },
                organizacion : { type: "string"},
                nombre_completo : { type: "string"},
        }
}
GridCapacitacion.prototype.get_Configuracion = function () {

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
GridCapacitacion.prototype.get_Columnas = function () {

        return [  
                {   field: "numero_empleado", 
                    title: "No. de empleado", 
                    width:"150px" ,
                    template: '<a href="#=url_expediente + numero_empleado #/expediente/">#=numero_empleado#</a>',
                },
                { field: "nombre_completo", title: "Nombre", width:"300px"},
                { field: "organizacion", title: "Organización", width:"300px"},

        ]
}
GridCapacitacion.prototype.buscar = function() {
    
        this.kfuente_datos.page(1)
}
GridCapacitacion.prototype.leer_Datos = function() {
    
    this.kfuente_datos_excel.read()
}
GridCapacitacion.prototype.get_FuenteDatosExcel = function (e) {

    return {

        transport: {
            read: {

                url: url_documento_capacitacion_excel,
                type: "GET",
                dataType: "json",
            },
            parameterMap: function (data, action) {
                if (action === "read") {

                    return tarjeta_filtro.get_ValuesCapacitacion_Excel()
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

    this.$boton_exportar = $("#boton_excel")

    this.init_Events()
}
Toolbar.prototype.init_Events = function (e) {

    this.$boton_exportar.on("click", this, this.click_BotonExportar)
}
Toolbar.prototype.Inicializar_CeldasExcel = function (e) {

    if (grid_personal.get_Columnas != null)
    {
        if (grid_personal.get_Columnas.length != 1) {
            grid_personal.get_Columnas.length = 0;
        }
    }

    this.kRows = [{
        cells: this.get_Celdas()
    }]
}
Toolbar.prototype.click_BotonExportar = function (e) {

    grid_personal.leer_Datos()
    e.data.Inicializar_CeldasExcel()

    grid_personal.kfuente_datos_excel.fetch(function () {

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
                        title: "ListaDocumentos",
                        rows: e.data.kRows
                    }
                ]
            });
        kendo.saveAs({
            dataURI: workbook.toDataURL(),
            fileName: "ListaDocumentos.xlsx",
        });
    })
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
    
    var columnas = grid_personal.get_Columnas()
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
