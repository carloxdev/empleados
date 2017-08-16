/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

var url_expediente = window.location.origin  + "/expedientes/"
var url_empleados_grado_bypage = window.location.origin  + "/api-ebs/viewempleadosgrado_bypage/"
var url_empleados_grado_excel = window.location.origin  + "/api-ebs/viewempleadosgrado/"

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
    this.$pers_empleado_numero = $('#id_pers_empleado_numero')
    this.$qua_grado_academico = $('#id_qua_grado_academico')
    this.$qua_especialidad = $('#id_qua_especialidad')
    this.$asig_organizacion_id = $('#id_asig_organizacion_id')

    this.$boton_buscar = $('#boton_buscar')
    this.$boton_limpiar = $('#boton_limpiar')

    this.init_Components()
    this.init_Events()
}
TarjetaFiltros.prototype.init_Components = function () {

    this.$qua_grado_academico.select2(appnova.get_ConfigSelect2())
    this.$qua_especialidad.select2(appnova.get_ConfigSelect2())
    this.$asig_organizacion_id.select2(appnova.get_ConfigSelect2())
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
                pers_empleado_numero: this.$pers_empleado_numero.val(),
                qua_grado_academico: this.$qua_grado_academico.val(),
                qua_especialidad: this.$qua_especialidad.val(),
                asig_organizacion_id: this.$asig_organizacion_id.val(),
     }
}
TarjetaFiltros.prototype.get_Values_Excel = function () {
    
        return {
                pers_empleado_numero: this.$pers_empleado_numero.val(),
                qua_grado_academico: this.$qua_grado_academico.val(),
                qua_especialidad: this.$qua_especialidad.val(),
                asig_organizacion_id: this.$asig_organizacion_id.val(),
     }
}
TarjetaFiltros.prototype.validar_Campos = function (){

        bandera = 'False'
        if ((this.$pers_empleado_numero.val() == '') &&
                (this.$qua_grado_academico.val() == '') &&
                (this.$qua_especialidad.val() == '') &&
                (this.$asig_organizacion_id.val() == '')
            ){
            bandera = 'True'
        }
        return bandera

}
TarjetaFiltros.prototype.click_BotonLimpiar = function (e) {
        
        e.preventDefault()
        e.data.$qua_grado_academico.data('select2').val(0)
        e.data.$pers_empleado_numero.val("")
        e.data.$qua_especialidad.data('select2').val(0)  
        e.data.$asig_organizacion_id.data('select2').val(0)
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
                            title: "ListaEmpleadosGrado",
                            rows: e.data.kRows
                        }
                    ]
                });
            kendo.saveAs({
                dataURI: workbook.toDataURL(),
                fileName: "ListaEmpleadosGrado.xlsx",
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

                                url: url_empleados_grado_bypage,
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

                pers_empleado_numero : { type: "string" },
                pers_nombre_completo: { type: "string" },
                qua_grado_academico : { type: "string" },
                qua_especialidad : { type: "string" },
                asig_organizacion_desc : { type: "string" },
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
                    width:"100px" ,
                    template: '<a href="#=url_expediente + pers_empleado_numero #/expediente/">#=pers_empleado_numero#</a>',
                },
                { field: "pers_nombre_completo",
                  title: "Nombre",
                  width:"150px" 
                },
                { field: "qua_grado_academico",
                  title: "Grado academico",
                  width:"150px" 
                },
                { field: "qua_especialidad", 
                  title: "Disciplina academica", 
                  width:"200px" ,
                },
                { field: "asig_organizacion_desc",
                  title: "Organizacion",
                  width:"200px" 
                },
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

                url: url_empleados_grado_excel,
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