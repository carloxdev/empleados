// Ecmascript 5

/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:
var url_incidenciadocumento = window.location.origin + "/api-seguridadlaboral/incidenciadocumento/"
var url_incidenciadocumento_bypage = window.location.origin + "/api-seguridadlaboral/incidenciadocumento_bypage/"
var url_incidencia_editar = window.location.origin + "/seguridadlaboral/"
//var url_incidencia_editar = "/editar/"
var url_anexos = window.location.origin + "/seguridadlaboral/incidencia_id/archivos/"
var url_seguimiento = window.location.origin + "/seguridadlaboral/incidencia_id/seguimiento/"
var url_excel = window.location.origin + "/api-seguridadlaboral/incidenciadocumento/"


// OBJS
var filtros = null
var resultados = null

/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {
    // Inicializar URLS:
    //url_incidencia_editar = window.location.origin.toString() + $('#url_incidencia_editar').val()
    //alert(url_incidencia_editar)

    filtros = new TargetaFiltros()
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
            OBJETO: Targeta Filtros
\*-----------------------------------------------*/

function TargetaFiltros () {

    this.$id = $('#tarjeta_filtros')
    this.$numero = $('#id_numero')
    this.$tipo = $('#id_tipo')
    this.$fecha_creacion = $('#fecha_creacion')
    this.$id_fecha = $('#id_fecha')
    //this.$es_registrable = $('#id_es_registrable')
    //this.$es_registrable = $("input[name='id_es_registrable']")
     this.$es_registrable = $("input[name='es_registrable']:checked").val(),


    this.$empleado_zona = $('#id_zona')
    this.$fecha_mayorque = $('#id_fecha_mayorque')
    this.$fecha_menorque = $('#id_fecha_menorque')


    this.$boton_buscar = $('#boton_buscar')
    this.$boton_limpiar = $('#boton_limpiar')

    this.init_Components()
    this.init_Events()

}
TargetaFiltros.prototype.init_Components = function () {

   this.$tipo.select2(appnova.get_ConfigSelect2())
   this.$empleado_zona.select2(appnova.get_ConfigSelect2())
   this.$fecha_mayorque.datepicker(appnova.get_ConfDatePicker())
   this.$fecha_menorque.datepicker(appnova.get_ConfDatePicker())

    // Estilos, Liberias
    //this.$fecha_mayorque.datepicker()
    //this.$fecha_menorque.datepicker()
   //this.$fecha_creacion.daterangepicker(this.get_ConfDateRangePicker())

       // this.$fecha.mask(
       //      "9999-99-99",
       //      {
       //          placeholder:"aaaa/mm/dd"
       //      }
       // )

   // this.$id_fecha.datetimepicker(this.get_DateTimePickerConfig())

}
TargetaFiltros.prototype.init_Events = function () {

    this.$id.on("hidden.bs.modal", this, this.hide)
    // Asosciar Eventos
    this.$boton_buscar.on("click", this, this.click_BotonBuscar)
    this.$boton_limpiar.on("click", this, this.click_BotonLimpiar)
}
TargetaFiltros.prototype.get_FechaMayorQue = function (e) {

    fecha = this.$fecha_mayorque.datepicker("getDate")
    fecha_conformato = moment(fecha).format('YYYY-MM-DD')

    if (fecha_conformato == "Invalid date") {
        return ""
    }
    else {
        return fecha_conformato
    }
}
TargetaFiltros.prototype.get_FechaMenorQue = function (e) {

    fecha = this.$fecha_menorque.datepicker("getDate")
    fecha_conformato = moment(fecha).format('YYYY-MM-DD')

    if (fecha_conformato == "Invalid date") {
        return ""
    }
    else {
        return fecha_conformato
    }
}
TargetaFiltros.prototype.get_DateTimePickerConfig = function () {
    return {
        autoclose: true,
        orientation: "bottom left",
        minViewMode: 2,
        format: "yyyy-mm-dd",
    }
}
TargetaFiltros.prototype.hide = function (e) {
    //e.data.$fecha_creacion.data('daterangepicker').hide()
}
TargetaFiltros.prototype.click_BotonBuscar = function (e) {

    e.preventDefault()
    resultados.grid.buscar()
    e.data.$id.modal('hide')


}
TargetaFiltros.prototype.click_BotonLimpiar = function (e) {

    e.preventDefault()
    //alert("entro");
    e.data.$numero.val("")
    e.data.$tipo.val("").trigger("change")
    e.data.$empleado_zona.val("").trigger("change")
    
   // e.data.$fecha_creacion.data('daterangepicker').setStartDate('01-01-2017')
   e.data.$created_date_mayorque.datepicker("clearDates")
   e.data.$created_date_menorque.datepicker("clearDates")
   //e.data.$es_registrable.prop('checked', false)
   $("input[name='es_registrable']:checked", false).val()
   

}
TargetaFiltros.prototype.get_Values = function (_page) {

    return {
        page: _page,
        id: this.$numero.val(),
        tipo: this.$tipo.val(),
        fecha_creacion: this.$fecha_creacion.val(),
        es_registrable:  $("input[name='es_registrable']:checked").val(),
        zona: this.$empleado_zona.val(),
        fecha_mayorque: this.get_FechaMayorQue(),
        fecha_menorque: this.get_FechaMenorQue(),

    }

}
TargetaFiltros.prototype.get_FiltrosExcel = function () {

    return {
        id: this.$numero.val(),
        tipo: this.$tipo.val(),
        fecha_creacion: this.$fecha_creacion.val(),
        es_registrable: this.$es_registrable.val(),
        zona: this.$empleado_zona.val(),
    }
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
    this.kfuente_datos_excel = new kendo.data.DataSource(this.get_FuenteDatosExcel())

    // Se inicializa y configura el grid:
    this.kgrid = this.$id.kendoGrid(this.get_Configuracion())
}
Grid.prototype.click_BotonAnexos = function (e) {

    e.preventDefault()
    var fila = this.dataItem($(e.currentTarget).closest('tr'))
    window.location.href = url_anexos.replace("incidencia_id", fila.pk)
}
Grid.prototype.click_BotonSeguimiento = function (e) {

    e.preventDefault()
    var fila = this.dataItem($(e.currentTarget).closest('tr'))
    window.location.href = url_seguimiento.replace("incidencia_id", fila.pk)
}
Grid.prototype.get_DataSourceConfig = function () {

    return {

        serverPaging: true,
        pageSize: 10,
        transport: {
            read: {
                url: url_incidenciadocumento_bypage,
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
        tipo : { type: "string" },
        es_registrable : { type: "string" },
        fecha : { type: "string" },
        empleado_id : { type: "number" },
        empleado_nombre : { type: "string" },
        zona : { type: "string" },
        empleado_proyecto : { type: "string" },
        empleado_proyecto_desc : { type: "string" },
        empleado_puesto : { type: "number" },
        empleado_puesto_desc : { type: "string" },
        empleado_un : { type: "string" },
        empleado_organizacion : { type: "string" },
        area_id : { type: "number" },
        area_descripcion : { type: "string" },
        lugar : { type: "string" },
        dias_incapcidad : { type: "number" },
        centro_atencion : { type: "string" },
        tiene_acr : { type: "string" },
        status : { type: "string" },
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
            template: "<div class='nova-grid-empy'> No se encontraron registros </div>"
        },
        dataBound: this.set_Icons,
    }
}
Grid.prototype.get_Columnas = function () {

    return [
        {
            field: "pk",
            title: "TICKET",
            width:"100px",
            //template: '<a class="btn btn-default nova-url" href="#=Grid.prototype.get_EditUrl(pk)#">#=pk#</a>',
            template: '<a class="btn btn-default nova-url" href="#=url_incidencia_editar  + pk + "/" + "editar/"  #">#=pk#</a>',
        },
        {
           command: [
                {
                   text: "Anexos",
                   click: this.click_BotonAnexos,
                   className: "btn btn-space btn-primary"
                },
            ],
           title: " ",
           width: "120px"
        },
        {
           command: [
                {
                   text: "Seguimiento",
                   click: this.click_BotonSeguimiento,
                   className: "btn btn-space btn-primary"
                },
            ],
           title: " ",
           width: "120px"
        },

        { field: "tipo", title: "CATEGORIA", width:"200px" },
        { field: "es_registrable", title: "TIPO", width:"100px" },
        { field: "fecha", title: "FECHA", width:"100px", format: "{0:dd/MM/yyyy}" },
        { field: "empleado_id", title: "NO EMPLEADO", width:"70px" },
        { field: "empleado_nombre", title: "EMPLEADO", width:"220px" },
        { field: "zona", title: "ZONA EMPLEADO", width:"100px" },
        { field: "empleado_proyecto", title: "PROYECTO ID", width:"70px" },
        { field: "empleado_proyecto_desc", title: "PROYECTO EMPLEADO", width:"200px" },
        { field: "empleado_puesto", title: "PUESTO ID", width:"70px" },
        { field: "empleado_puesto_desc", title: "PUESTO", width:"200px" },
        { field: "empleado_un", title: "UN", width:"70px" },
        { field: "empleado_organizacion", title: "ORGANIZACION EMPLEADO", width:"200px" },
        { field: "area_id", title: "AREA ID", width:"90px" },
        { field: "area_descripcion", title: "AREA", width:"200px" },
        { field: "lugar", title: "LUGAR", width:"200px" },
        { field: "dias_incapcidad", title: "DIAS INCAPACIDAD", width:"80px" },
        { field: "centro_atencion", title: "CENTRO ATENCION", width:"100px" },
        { field: "tiene_acr", title: "ACR", width:"50px" },
        { field: "status", title: "STATUS", width:"80px" },

    ]
}
Grid.prototype.get_EditUrl = function(_pk) {
  return url_incidencia_editar.replace('/0/', '/' + _pk + '/')
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
