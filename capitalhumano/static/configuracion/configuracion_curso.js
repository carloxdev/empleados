/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

var url_curso = window.location.origin + "/api-capitalhumano/curso/"
var url_curso_bypage = window.location.origin  + "/api-capitalhumano/curso_bypage/"
var url_profile =  window.location.origin + "/api-seguridad/profile/"

//OBJS
var grid = null
var toolbar = null
var tarjeta_resultados = null
var popup = null
var id = null


/*------------------------------------------------*\  
            LOAD
\*-----------------------------------------------*/

$(document).ready(function(){
     tarjeta_filtro = new PopupFiltros()
     tarjeta_resultados = new TarjetaResultados()

     // Asigna eventos a teclas
        // $(document).keypress(function (e) {
        //         // Tecla Enter
        //         if (e.which == 13) {
        //             tarjeta_resultados.grid.buscar()
        //             tarjeta_resultados.popup.hidden_Modal() 
        //         }
        // })    
})

/*-----------------------------------------------*\
            OBJETO: Tarjeta resultados
\*-----------------------------------------------*/

function TarjetaResultados(){
    this.grid = new Grid()
    this.toolbar = new Toolbar()
    this.popup = new Popup()
}


/*-----------------------------------------------*\
            OBJETO: TARJETA FILTRO EMPLEADOS
\*-----------------------------------------------*/


function PopupFiltros(){

    this.$modal_filtro = $('#modal_filtro')
    this.$nombre_curso = $('#id_nombre_curso_filter')
    this.$vencimiento = $('#id_vencimiento_filter')

    this.$boton_buscar = $('#boton_buscar')
    this.$boton_limpiar = $('#boton_limpiar')

    this.init_Components()
    this.init_Events()
}
PopupFiltros.prototype.init_Components = function () {

    this.$nombre_curso.select2(appnova.get_ConfigSelect2())
    this.$vencimiento.select2(appnova.get_ConfigSelect2())
}
PopupFiltros.prototype.init_Events = function () {

     this.$boton_buscar.on("click", this, this.click_BotonBuscar)
     this.$boton_limpiar.on("click", this, this.click_BotonLimpiar)
}
PopupFiltros.prototype.click_BotonBuscar = function (e) {

        e.preventDefault()
        tarjeta_resultados.grid.buscar()
        tarjeta_filtro.hidden_Modal()
}
PopupFiltros.prototype.get_Values = function (_page) {
    
        return {
            page: _page,
            pk: this.$nombre_curso.val(),
            vencimiento: this.$vencimiento.val(),
     }
}
PopupFiltros.prototype.get_Values_Excel = function () {
    
        return {
            pk: this.$nombre_curso.val(),
            vencimiento: this.$vencimiento.val(),
     }
}
PopupFiltros.prototype.click_BotonLimpiar = function (e) {
        
        e.preventDefault()
        e.data.$nombre_curso.val("").trigger('change')
        e.data.$vencimiento.val("").trigger('change')
}
PopupFiltros.prototype.hidden_Modal = function () {

    this.$modal_filtro.modal('hide')
}

/*-----------------------------------------------*\
            OBJETO: Pop up
\*-----------------------------------------------*/

function Popup () {
    this.$modal_nuevo = $('#modal_nuevo')
    this.$nombre_curso = $('#id_nombre_curso')
    this.$vencimiento = $('#id_vencimiento')
    this.$created_by = $('#id_usuario')
    this.$boton_guardar = $('#id_boton_guardar')
    this.$boton_guardar_cambios = $('#id_boton_guardar_cambios')
    this.$boton_cancelar = $('#id_boton_cancelar')

    this.init_Components()
    this.init_Events()
}
Popup.prototype.init_Components = function () {

    this.$vencimiento.select2(appnova.get_ConfigSelect2())
    $('#titulo_modal').text('Nuevo curso')
    this.$boton_guardar.removeClass('hide')
    this.$boton_guardar_cambios.addClass('hide')
    this.limpiar_Formulario()
}
Popup.prototype.init_Events = function () {

    this.$boton_guardar.on('click', this, this.click_BotonGuardar)
    this.$boton_guardar_cambios.on('click', this, this.click_BotonGuardarCambios)
    this.$boton_cancelar.on('click', this, this.click_BotonCancelar)
}
Popup.prototype.click_BotonCancelar = function (e){
    tarjeta_resultados.popup.limpiar_Formulario()
    tarjeta_resultados.popup.clear_Estilos()
}
Popup.prototype.click_BotonGuardar = function (e) {
    if (tarjeta_resultados.popup.validar_Campos() != 'True'){
        $.ajax({
                 url: url_curso,
                 method: "POST",
                 headers: { "X-CSRFToken": appnova.galletita },
                 data: {
                        'nombre_curso' : e.data.$nombre_curso.val(),
                        'vencimiento' : e.data.$vencimiento.val(),
                        'created_by' : url_profile+e.data.$created_by.val()+"/",
                 },
                 success: function (_response) {
                    tarjeta_resultados.popup.actualizar_Grid()
                    tarjeta_resultados.popup.hidden_Modal()
                 },
                 error: function (_response) {
                        alertify.error("Ocurrio error al guardar")
                 }
            })
    }
}
Popup.prototype.click_BotonGuardarCambios = function (e) {
    if (tarjeta_resultados.popup.validar_Campos() != 'True'){
        $.ajax({
                 url: url_curso +id+"/",
                 method: "PATCH",
                 headers: { "X-CSRFToken": appnova.galletita },
                 data: {
                        'nombre_curso' : e.data.$nombre_curso.val(),
                        'vencimiento' : e.data.$vencimiento.val(),
                        'updated_by' : url_profile+e.data.$created_by.val()+"/",
                 },
                 success: function (_response) {
                    tarjeta_resultados.popup.actualizar_Grid()
                    tarjeta_resultados.popup.hidden_Modal()
                 },
                 error: function (_response) {
                        alertify.error("Ocurrio error al guardar")
                 }
            })
    }
}
Popup.prototype.hidden_Modal = function () {

     this.$modal_nuevo.modal('hide')
     this.limpiar_Formulario()
}
Popup.prototype.actualizar_Grid = function () {
        $("#grid_resultados").empty()
        tarjeta_resultados.grid.init()
}
Popup.prototype.validar_Campos = function () {
    bandera = 'False'

    $('#id_error').detach()
    if(this.$nombre_curso.val() == ""){
        this.$nombre_curso.addClass("nova-has-error");
        bandera = 'True'
    }
    else{
        this.$nombre_curso.removeClass("nova-has-error");
    }
    if(this.$vencimiento.data('select2').val() == ""){
        this.$vencimiento.data('select2').$selection.addClass("nova-has-error");
        bandera = 'True'
    }
    else{
        this.$vencimiento.data('select2').$selection.removeClass("nova-has-error");
    }
    return bandera
}
Popup.prototype.limpiar_Formulario = function () {
    this.$nombre_curso.val("")
    this.$vencimiento.val(1).trigger('change')
}
Popup.prototype.clear_Estilos = function () {
   this.$vencimiento.data('select2').$selection.removeClass("nova-has-error")
   this.$nombre_curso.removeClass("nova-has-error")
   $('#id_error').detach()
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

                            url: url_curso_bypage,
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
            pk: { type: "integer" },
            nombre_curso : { type: "string" },
            vencimiento : { type: "string" },
            created_by : { type: "string"},
            created_date : { type: "date" },
            updated_by : { type: "string"},
            updated_date : { type: "date" },
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
                columns: this.get_Columnas(),
                scrollable: true,
                pageable: true,
                noRecords: {
                        template: "<div class='nova-grid-empy'> No se encontraron registros </div>"
                },
                dataBound: this.obtener_Evento,
        }
}
Grid.prototype.get_Columnas = function () {

    return [  
            {   width:"50px" ,
                template: '<a class="btn nova-btn btn-default nova-btn-delete" id="#=pk#" data-event="eliminar-curso"> <i class="icon icon-left icon mdi mdi-delete nova-white"></i></a>',
            },
            {   width:"50px" ,
                template: '<a class="btn nova-btn btn-default" id="#=pk#" href="\\#modal_nuevo" data-toggle="modal" data-event="editar-curso"><i class="fa fa-pencil" aria-hiden="true"></i></a>',
            },
            { field: "nombre_curso", title: "Curso", width:"300px"},
            { field: "vencimiento", title: "Vigencia(años)", width:"100px" },
            { field: "created_by", title: "Creado por", width:"200px" },
            { field: "created_date", title: "Fecha de creación", width:"150px", format: "{0:dd/MM/yyyy}" },
            { field: "updated_by", title: "Actualizado por", width:"200px" },
            { field: "updated_date", title: "Fecha de actualización", width:"150px", format: "{0:dd/MM/yyyy}" },
    ]
}
Grid.prototype.obtener_Evento = function (e) {

    e.sender.tbody.find("[data-event='eliminar-curso']").each(function(idx, element){
      $(this).on("click", function(){
         tarjeta_resultados.grid.eliminar_Registro(this.id)
      })
    })

    e.sender.tbody.find("[data-event='editar-curso']").each(function(idx, element){
      $(this).on("click", function(){
        $('#titulo_modal').text('Editar curso')
        tarjeta_resultados.popup.$boton_guardar.addClass('hide')
        tarjeta_resultados.popup.$boton_guardar_cambios.removeClass('hide')
        tarjeta_resultados.grid.consultar_Registro(this.id)
      })
    })
}
Grid.prototype.consultar_Registro = function (_id) {

    $.ajax({
             url: url_curso +_id+"/",
             method: "GET",
             headers: { "X-CSRFToken": appnova.galletita },
             success: function (_response) {
                tarjeta_resultados.popup.$nombre_curso.val(_response.nombre_curso)
                tarjeta_resultados.popup.$vencimiento.val(_response.vencimiento).trigger('change')
                id = _id
             },
             error: function (_response) {
                    alertify.error("No se ha podido realizar la consulta")
             }
    })
}
Grid.prototype.eliminar_Registro = function (_id) {

    alertify.confirm(
      'Eliminar Registro',
      '¿Desea Eliminar este registro?.',
      function () {
            $.ajax({
                 url: url_curso +_id+"/",
                 method: "DELETE",
                 headers: { "X-CSRFToken": appnova.galletita },
                 success: function (_response) {
                        tarjeta_resultados.popup.actualizar_Grid()
                        alertify.success("Se ha eliminado el curso")
                 },
                 error: function (_response) {
                        alertify.error("El curso tiene asignado una o mas capacitaciones")
                 }
            })
        },
      null
   )
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

                url: url_curso,
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


/*-----------------------------------------------*\
            OBJETO: TOOLBAR
\*-----------------------------------------------*/

function Toolbar() {

    this.$boton_nuevo = $('#id_nuevo_curso')
    this.$boton_filtros = $('#boton_buscar')
    this.$boton_exportar = $("#id_exportar")

    this.init_Events()
}
Toolbar.prototype.init_Events = function (e) {
    this.$boton_nuevo.on("click", this, this.click_BotonNuevo)
    this.$boton_exportar.on("click", this, this.click_BotonExportar)
}
Toolbar.prototype.click_BotonNuevo = function (e) {

    tarjeta_resultados.popup.init_Components()
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
            { value: 'Curso' },
            { value: 'vencimiento' },
        ]
    }];
}
Toolbar.prototype.click_BotonExportar = function (e) {
    alert(tarjeta_filtro.$vencimiento.val())
    tarjeta_resultados.grid.leer_Datos()
    e.data.Inicializar_CeldasExcel()

    tarjeta_resultados.grid.kfuente_datos_excel.fetch(function () {

        var data = this.data();
        for (var i = 0; i < data.length; i++) {

            e.data.kRows.push({
                cells: [
                    { value: data[i].nombre_curso },
                    { value: data[i].vencimiento },
                ]
            })
        }
        var workbook = new kendo.ooxml.Workbook({
            sheets: [
                {
                    columns: [
                        { autoWidth: true },
                        { autoWidth: true },
                    ],
                    title: "CatalogoCursos",
                    rows: e.data.kRows
                }
            ]
        });
        kendo.saveAs({
            dataURI: workbook.toDataURL(),
            fileName: "CatalogoCursos.xlsx",
        });
    });
}