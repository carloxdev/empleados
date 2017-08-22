// Ecmascript 5

/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:
var url_perfil_puesto_bypage = window.location.origin + "/api-capitalhumano/perfilpuestosdoc_bypage/"

var url_excel = window.location.origin + "/api-sgi/incidenciadocumento/"

// OBJS
var grid = null
var filtros = null
var resultados = null
var toolbar = null

/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {
    
    filtros = new TarjetaFiltros()
    resultados = new TargetaResultados()

   // Asigna eventos a teclas
    $(document).keypress(function (e) {
        // Tecla Enter
        if (e.which == 13) {

            if (filtros.$id.hasClass('in')) {
                filtros.apply_Filters()
            }

        }
        // Tecla ESC
    })
})


/*-----------------------------------------------*\
            OBJETO: Targeta filtros
\*-----------------------------------------------*/

function TarjetaFiltros(){
    this.$puesto = $('#id_asig_puesto_clave')
    this.$departamento = $('#id_departamento')
    this.$nivel_estudios = $('#id_estudios')
    this.$experiencia = $('#id_experiencia')

     this.$boton_buscar = $('#boton_buscar')
    
    this.init_Components()
    this.init_Events()
}  

TarjetaFiltros.prototype.init_Components= function(){
    this.$puesto.select2(this.get_ConfSelect2())
    this.$departamento.select2(this.get_ConfSelect2())
    this.$nivel_estudios.select2(this.get_ConfSelect2())
    this.$experiencia.select2(this.get_ConfSelect2())
}

TarjetaFiltros.prototype.get_ConfSelect2 = function () {
   return {
      width: '100%'
    }
}

TarjetaFiltros.prototype.init_Events = function () {
    // Asosciar Eventos
    this.$boton_buscar.on("click", this, this.click_BotonBuscar)   
}

TarjetaFiltros.prototype.get_Values = function (_page) {

    return {
        page: _page,
        //id: this.$puesto.val(),
        asig_puesto_clave: this.$puesto.val(),
        //departamento: this.$departamento.val(),
        //nivel_estudios: this.$nivel_estudios.val(),
        //experiencia: this.$experiencia.val(),
      
    }

}

TarjetaFiltros.prototype.click_BotonBuscar = function (e) {

    e.preventDefault()
    resultados.grid.buscar()
   
}

/*-----------------------------------------------*\
            OBJETO: Targeta Resultados
\*-----------------------------------------------*/

function TargetaResultados () {

    this.toolbar = new Toolbar()
    this.grid = new Grid()
}

/*-----------------------------------------------*\
            OBJETO: Grid
\*-----------------------------------------------*/

function Grid() {

    this.$id = $('#grid_resultados')
    this.kfuente_datos = null
    this.kfuente_datos_excel = null
    this.kgrid = null

    this.init_Components()

}
Grid.prototype.init_Components = function () {

    // Definicion del pais, formato modena, etc..
    kendo.culture("es-MX")

    // Se inicializa la fuente da datos (datasource)
    this.kfuente_datos = new kendo.data.DataSource(this.get_DataSourceConfig())
    //this.kfuente_datos_excel = new kendo.data.DataSource(this.get_FuenteDatosExcel())
   
    // Se inicializa y configura el grid:
    this.kgrid = this.$id.kendoGrid(this.get_Configuracion()) 
}



Grid.prototype.get_DataSourceConfig = function () {

    return {

        serverPaging: true,
        pageSize: 10,
        transport: {
            read: {
                url: url_perfil_puesto_bypage,
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
        pk : { type: "number" },
        empleado_puesto_desc : { type: "string" },
        asig_puesto_clave : { type: "string" },
        reporta : { type: "string" },
        objetivo : { type: "string" },
        funciones : { type: "string" },
        responsabilidades : { type: "string" },
        reporte : { type: "string" },
        posicion: { type: "string" },
        edad_minima : { type: "string" },
        edad_maxima : { type: "string" },
        nivel_estudio : { type: "string" },
        estado_civil : { type: "string" },
        genero : { type: "number" },
        cambio_residencia : { type: "string" },
        requerimientos : { type: "string" },
        proposito : { type: "string" },
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
        { 
            field: "pk", 
            title: "Numero", 
            width:"100px",
            //template: '<a class="btn btn-default nova-url" href="#=Grid.prototype.get_EditUrl(pk)#">#=pk#</a>',
            //template: '<a class="btn btn-default nova-url" href="#=url_incidencia_editar  + pk + "/" + "editar/"  #">#=pk#</a>',
        },
        { field: "empleado_puesto_desc", title: "Puesto", width:"100px" },
 		{ field: "asig_puesto_clave", title: "asig_puesto_clave", width:"200px" },
        { field: "reporta", title: "Reporta a", width:"100px" },
        { field: "objetivo", title: "Objetivo", width:"70px" },
        { field: "funciones", title: "Funciones", width:"70px" },
        { field: "responsabilidades", title: "Responsabilidades", width:"100px" },
        { field: "reporte", title: "Reporte", width:"70px" },
        { field: "posicion", title: "Staf", width:"70px" },
        { field: "edad_minima", title: "Edad Minima", width:"70px" },
        { field: "edad_maxima", title: "Edad Maxima", width:"70px" },
        { field: "nivel_estudio", title: "Nivel Estudio", width:"90px" },
        { field: "estado_civil", title: "Estado Civil", width:"90px" },
        { field: "genero", title: "genero", width:"70px" },
        { field: "cambio_residencia", title: "cambio de Residencia", width:"100px" },
        { field: "disponibilidad_viajar", title: "Disponibilidad Viajar", width:"100px" },
        { field: "requerimientos", title: "Requerimientos", width:"100px" },
        { field: "proposito", title: "Proposito", width:"70px" },
 
        {
           command: [ 
                {
                   text: "Seguimiento",
                   //click: this.click_BotonSeguimiento,
                   className: "btn btn-space btn-primary"
                },             
            ],           
           title: " ",
           width: "120px"
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

                url: url_excel,
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

Grid.prototype.set_Icons = function (e) {

    e.sender.tbody.find(".k-button.fa.fa-pencil").each(function(idx, element){
        $(element).removeClass("fa fa-pencil").find("span").addClass("fa fa-pencil")
    })   
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

    if (resultados.grid.get_Columnas != null)
    {
        if (resultados.grid.get_Columnas.length != 1) {
            resultados.grid.get_Columnas.length = 0;
        }
    }

    this.kRows = [{
        cells: [
            { value: 'Id'},
            { value: 'Categoria' },
            { value: 'Tipo' },
            { value: 'Fecha' },
            { value: 'Clave de Empleado' },
            { value: 'Zona Empleado' },
            { value: 'Id Proyecto' },
            { value: 'Proyecto Empleado' },
            { value: 'Id Puesto'},
            { value: 'Unidad de Negocio'},
            { value: 'Organizacion Empleado'},
            { value: 'id Area'},
            { value: 'Area Descripcion'},
            { value: 'lugar'},
            { value: 'Dias Incapacidad'},
            { value: 'Centro de Atencion'},
            { value: 'status'},
        ]
    }];
}

Toolbar.prototype.click_BotonExportar = function (e) {

    resultados.grid.leer_Datos()
    e.data.Inicializar_CeldasExcel();

    resultados.grid.kfuente_datos_excel.fetch(function () {

        var data = this.data();
        for (var i = 0; i < data.length; i++) {

            e.data.kRows.push({
                cells: [
                    { value: data[i].pk },
                    { value: data[i].tipo },
                    { value: data[i].es_registrable },
                    { value: data[i].fecha },
                    { value: data[i].empleado_id },
                    { value: data[i].empleado_nombre },
                    { value: data[i].empleado_proyecto },
                    { value: data[i].empleado_proyecto_desc },
                    { value: data[i].empleado_puesto },
                    { value: data[i].empleado_puesto_desc },
                    { value: data[i].empleado_un},
                    { value: data[i].area_id},
                    { value: data[i].area_descripcion},
                    { value: data[i].lugar},
                    { value: data[i].dias_incapcidad},
                    { value: data[i].tiene_acr},
                    { value: data[i].status},
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
                    ],
                    title: "incidenciasregistradas",
                    rows: e.data.kRows
                }
            ]
        });
        kendo.saveAs({
            dataURI: workbook.toDataURL(),
            fileName: "Incidencias_registradas.xlsx",
        });
    });
}