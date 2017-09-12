/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/
var url_solicitud = window.location.origin + "/api-administracion/solicitud/"
var url_asunto = window.location.origin + "/api-administracion/asunto/"
var url_solicitudes_bypage = window.location.origin + "/api-administracion/archivosolicitud_bypage/"
var url_archivo_solicitud = window.location.origin + "/api-administracion/archivosolicitud/"
var url_profile =  window.location.origin + "/api-seguridad/profile/"
var url_archivo =  window.location.origin + "/api-capitalhumano/archivo/"

//OBJS
var tarjeta_filtro = null
var grid = null
var toolbar = null
var tarjeta_resultados = null
var popup_filtros = null
var popup_editar= null
var id = ''
var datos = ''
var popup_informacion = null


/*------------------------------------------------*\  
            LOAD
\*-----------------------------------------------*/

$(document).ready(function(){
    popup_filtros = new PopupFiltros()
     tarjeta_resultados = new TarjetaResultados()

     // Asigna eventos a teclas
        $(document).keypress(function (e) {
                // Tecla Enter
                if (e.which == 13) {
                    tarjeta_resultados.grid.buscar()
                    popup_filtros.hidden_Modal()
                }
        })    
})

/*-----------------------------------------------*\
            OBJETO: Tarjeta resultados
\*-----------------------------------------------*/

function TarjetaResultados(){
    this.grid = new Grid()
    this.popup_editar = new PopupEditar()
    this.toolbar = new Toolbar()
    this.popup_informacion = new PopupInformacion()
}

/*-----------------------------------------------*\
            OBJETO: Popup filtro de solicitudes
\*-----------------------------------------------*/

function PopupFiltros(){

    this.$modal = $('#modal_filtro')
    this.$numero_empleado = $('#id_numero_empleado')
    this.$asunto = $('#id_asunto')
    this.$status = $('#id_status')
    this.$folio = $('#id_folio')

    this.$boton_buscar = $('#boton_buscar')
    this.$boton_limpiar = $('#boton_limpiar')

    this.init_Components()
    this.init_Events()
}
PopupFiltros.prototype.init_Components = function () {

    this.$numero_empleado.select2(appnova.get_ConfigSelect2())
    this.$asunto.select2(appnova.get_ConfigSelect2())
    this.$status.select2(appnova.get_ConfigSelect2())
}
PopupFiltros.prototype.init_Events = function () {

     this.$boton_buscar.on("click", this, this.click_BotonBuscar)
     this.$boton_limpiar.on("click", this, this.click_BotonLimpiar)
}
PopupFiltros.prototype.click_BotonBuscar = function (e) {

        e.preventDefault()

        tarjeta_resultados.grid.buscar()
        popup_filtros.hidden_Modal()
}
PopupFiltros.prototype.get_Values = function (_page) {
    
        return {
                page: _page,
                pk: this.$folio.val(),
                numero_empleado: this.$numero_empleado.val(),
                asunto: this.$asunto.val(),
                status: this.$status.val(),
     }
}
PopupFiltros.prototype.get_Values_Excel = function () {
    
        return {
                pk: this.$folio.val(),
                numero_empleado: this.$numero_empleado.val(),
                asunto: this.$asunto.val(),
                status: this.$status.val(),
     }
}
PopupFiltros.prototype.click_BotonLimpiar = function (e) {
        
        e.preventDefault()
        e.data.$folio.val("")
        e.data.$numero_empleado.data('select2').val(0)
        e.data.$asunto.data('select2').val(0)
        e.data.$status.val("cap").trigger('change')  
}
PopupFiltros.prototype.hidden_Modal = function () {

   this.$modal.modal('hide')
}


/*-----------------------------------------------*\
            OBJETO: Pop up informacion personal
\*-----------------------------------------------*/

function PopupInformacion(){

    this.$modal_informacion = $('#modal_ver_informacion')
    this.$boton_salir = $('#id_boton_salir')
    this.$contenido = $('#contenido')

    this.init_Components()
    this.init_Events()
}
PopupInformacion.prototype.init_Components = function (){
}
PopupInformacion.prototype.init_Events = function (){

    this.$boton_salir.on('click', this, this.hidden_Modal)
}
PopupInformacion.prototype.consultar_Registro = function (_id){

    $.ajax({
          url: url_archivo_solicitud + _id +"/",
          type: "GET",
          headers: { "X-CSRFToken": appnova.galletita },
          contentType: "application/json; charset=utf-8",
          success: function (_response) {
            nombre_documento = _response.asunto
            url = _response.archivo
            for (var i = 0; i < url.length; i++) {
                url_archivo = url[i]
                tarjeta_resultados.popup_informacion.consultar_Archivo(i, url_archivo, nombre_documento)
            }
          },
          error: function (_response) {
             alertify.error("Ocurrio un error al consultar")
          }
       })
}
PopupInformacion.prototype.consultar_Archivo = function (_numero, _url_archivo, _nombre_documento){
    $.ajax({
          url: _url_archivo,
          type: "GET",
          headers: { "X-CSRFToken": appnova.galletita },
          contentType: "application/json; charset=utf-8",
          success: function (_response) {
            
            url = _response.archivo
            tarjeta_resultados.popup_informacion.cargar_Archivos(_numero+1,url,_nombre_documento)
          },
          error: function (_response) {
             alertify.error("Ocurrio un error al consultar")
          }
       })
}
PopupInformacion.prototype.cargar_Archivos = function (_numero,_url_archivo,_nombre_documento){

    this.$contenido.append("<a href='"+ _url_archivo +"' target='_blank'><img src='/static/images/decoradores/PDF.jpg' width='30px' height='30px'></img> Archivo No."+_numero+" : "+_nombre_documento+" </a><br>")
}
PopupInformacion.prototype.hidden_Modal = function (e) {

     e.data.$modal_informacion.modal('hide')
}

/*-----------------------------------------------*\
            OBJETO: Toolbar
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
                            title: "SolicitudesCH",
                            rows: e.data.kRows
                        }
                    ]
                });
            kendo.saveAs({
                dataURI: workbook.toDataURL(),
                fileName: "SolicitudesCH.xlsx",
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
            OBJETO: Popup editar
\*-----------------------------------------------*/

function PopupEditar(){
    this.$modal = $('#modal_editar')
    this.$id = ''
    this.$status = $('#id_status_editar')
    this.$observaciones = $('#id_observaciones')
    this.$updated_by = $('#id_updated_by')

    this.$asunto_informacion = $('#id_asunto_informacion')
    this.$descripcion_informacion = $('#id_descripcion_informacion')

    this.$boton_editar = $('#boton_editar')
    this.$boton_cancelar = $('#boton_cancelar')

    this.init_Components()
    this.init_Events()
}
PopupEditar.prototype.init_Components = function (){
    this.$status.select2(appnova.get_ConfigSelect2())
}
PopupEditar.prototype.init_Events = function () {
    this.$boton_editar.on("click", this, this.guardar_Cambios)
    this.$boton_cancelar.on("click", this, this.cancelar_Cambios)
}
PopupEditar.prototype.consultar_Registro = function (_id){
    id = _id
    dts = ''
    var promesa = $.ajax({
                      url: url_solicitud + _id +"/",
                      type: "GET",
                      headers: { "X-CSRFToken": appnova.galletita },
                      contentType: "application/json; charset=utf-8",

                      success: function (_response) {
                        dts = _response
                        tarjeta_resultados.popup_editar.obtener_Asunto(_response)
                      },
                      error: function (_response) {
                         alertify.error("Ocurrio un error al consultar")
                      }
                   })
    promesa.then(function(){
        datos = dts
    })
}
PopupEditar.prototype.obtener_Asunto = function (_response){
    asunto = ''
    status = _response.status
    var promesa = $.ajax({
                      url: url_asunto + _response.asunto +"/",
                      type: "GET",
                      headers: { "X-CSRFToken": appnova.galletita },
                      contentType: "application/json; charset=utf-8",

                      success: function (response) {
                        asunto = response.nombre
                      },
                      error: function (response) {
                         alertify.error("Ocurrio un error al consultar")
                      }
                   })
    promesa.then(function(){
        tarjeta_resultados.popup_editar.llenar_Informacion(status,asunto, _response.descripcion)
    })
}
PopupEditar.prototype.llenar_Informacion = function (_status,_asunto,_descripcion){
    this.$asunto_informacion.val(_asunto)
    this.$descripcion_informacion.val(_descripcion)
    this.$status.val(_status).trigger("change")
}
PopupEditar.prototype.guardar_Cambios = function (e) {

    informacion = {
        'status': e.data.$status.val(),
        'clave_departamento': datos.clave_departamento,
        'asunto': datos.asunto,
        'descripcion': datos.descripcion,
        'numero_empleado': datos.numero_empleado,
        'observaciones': e.data.$observaciones.val(),
        'created_by': datos.created_by,
        'updated_by': url_profile+e.data.$updated_by.val()+"/",
    }
   $.ajax({

      url: url_solicitud + id +"/",
      data : JSON.stringify(informacion),
      type: "PUT",
      headers: { "X-CSRFToken": appnova.galletita },
      contentType: "application/json; charset=utf-8",

      success: function (_response) {

         tarjeta_resultados.grid.init()
         tarjeta_resultados.popup_editar.hidden_Modal()
      },
      error: function (_response) {
         alertify.error("Ocurrio un error al modificar")
      }
   })
}
PopupEditar.prototype.cancelar_Cambios = function (e) {
    e.data.$observaciones.val("")
    tarjeta_resultados.popup_editar.hidden_Modal()
}
PopupEditar.prototype.hidden_Modal = function () {

   this.$modal.modal('hide')
}

/*-----------------------------------------------*\
            OBJETO: Grid
\*-----------------------------------------------*/

function Grid() {

    this.$id = $("#grid_resultados")
    this.kfuente_datos = null
    this.$updated_by = $('#id_updated_by')

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

                                url: url_solicitudes_bypage,
                                type: "GET",
                                dataType: "json",
                        },
                        parameterMap: function (data, action) {
                                if (action === "read"){ 
                                    return popup_filtros.get_Values(data.page)
                                }
                        }
                },
                schema: {
                        data: "results",
                        total: "count",
                        model: {
                                id: "pk",
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
            pk: { type:"integer" },
            status : { type: "string"},
            clave_departamento : { type: "string"},
            asunto : { type: "string"},
            descripcion : { type: "string"},
            observaciones : { type: "string"},
            archivo : { type: "string"},
            created_by : { type: "string"},
            created_date : { type: "date"},
            updated_by : { type: "string"},
            updated_date : { type: "date"},
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
                dataBound: this.onDataBound,
        }
}
Grid.prototype.onDataBound = function (e) {
    // pk del elemento
   e.sender.tbody.find("[data-event='editar']").each(function(idx, element){ 
      $(this).on("click", function(){
        tarjeta_resultados.popup_editar.consultar_Registro(this.id)
      })
   })
   e.sender.tbody.find("[data-event='eliminar']").each(function(idx, element){ 
      $(this).on("click", function(){
        tarjeta_resultados.grid.consultar_Registro(this.id)
      })
   })
    e.sender.tbody.find("[data-event='ver-informacion']").each(function(idx, element){
        $(this).on("click", function(){
            tarjeta_resultados.popup_informacion.$contenido.empty()
            tarjeta_resultados.popup_informacion.consultar_Registro(this.id)
        })
    })
   //color de la fila
    columns = e.sender.columns
    dataItems = e.sender.dataSource.view()

    for (var j = 0; j < dataItems.length; j++) {
        estatus = dataItems[j].get("status")
        row = e.sender.tbody.find("[data-uid='" + dataItems[j].uid + "']")
        row.removeClass("k-alt");
        if(estatus != null){
            if (estatus == 'En captura') {
            }
            else if (estatus == 'Actualizado'){
                row.addClass("nova-actualizado")
            }
            else if (estatus == 'Rechazado'){
                row.addClass("nova-fecha-vencida")
            }
            else if (estatus == 'Eliminado'){
                row.addClass("nova-eliminado")
                row.find('.nova-btn-accion').addClass("disabled");
            }
        }
    }
}
Grid.prototype.get_Columnas = function () {

        return [
            {   field: "pk", 
                title: " ", 
                width:"50px" ,
                template: '<a class="btn nova-btn btn-default nova-btn-delete nova-btn-accion" id="#=pk#" data-event="eliminar"> <i class="icon icon-left icon mdi mdi-delete nova-white"></i></a>',
            },
            {   title: " ", 
                width:"50px" ,
                template: '<a class="btn btn-default nova-url" href="\\#modal_ver_informacion" data-toggle="modal" data-event="ver-informacion" id="#=pk#"><i class="icon icon-left icon mdi mdi-file icon-black"></i></a>',
            }, 
            {   title: "Folio",
                width:"70px",
                template: '<a class="btn btn-default nova-url nova-btn-accion" href="\\#modal_editar" data-toggle="modal" id="#=pk#" data-event="editar">#=pk#</a>',
            }, 
            { field: "asunto", title: "Asunto", width:"200px"},
            { field: "status", title: "Estatus",width:"100px"},
            { field: "descripcion",title: "Descripción",width:"200px"},
            { field: "observaciones",title: "Observaciones",width:"200px"},
            { field: "clave_departamento", title: "Se solicito a", width:"150px"},
            { field: "created_by", title: "Creado por", width:"150px" },
            { field: "created_date", title: "Fecha de creación", width:"150px", format: "{0:dd/MM/yyyy}" },
            { field: "updated_by", title: "Actualizado por", width:"150px" },
            { field: "updated_date", title: "Fecha de actualización", width:"150px", format: "{0:dd/MM/yyyy}" },
        ]
}
Grid.prototype.consultar_Registro = function (_id_dsolicitud) {

    $.ajax({
             url: url_solicitud +_id_dsolicitud+"/",
             method: "GET",
             headers: { "X-CSRFToken": appnova.galletita },
             success: function (_response) {
                    response_solicitud = _response
                    
                    tarjeta_resultados.grid.eliminar_Archivo(response_solicitud,_id_dsolicitud)
             },
             error: function (_response) {
                    alertify.error("No se ha podido realizar la consulta")
             }
    })
}
Grid.prototype.eliminar_Archivo = function (_response_solicitud, _id_solicitud) {

    informacion = {
        'pk': _response_solicitud.pk,
        'status': "eli",
        'clave_departamento': _response_solicitud.clave_departamento,
        'asunto': _response_solicitud.asunto,
        'descripcion': _response_solicitud.descripcion,
        'numero_empleado': _response_solicitud.numero_empleado,
        'observaciones': _response_solicitud.observaciones,
        'created_by': _response_solicitud.created_by,
        'updated_by': url_profile+this.$updated_by.val()+"/",
    }
    alertify.confirm(
      'Eliminar Registro',
      '¿Desea Eliminar este registro?.',
      function () {
          
            $.ajax({
                 url: url_solicitud +_id_solicitud+"/",
                 data : JSON.stringify(informacion),
                 type: "PUT",
                 headers: { "X-CSRFToken": appnova.galletita },
                 contentType: "application/json; charset=utf-8",
                 success: function (_response) {
                        alertify.success('Se elimino solicitud')
                        $("#grid_resultados").empty()
                        tarjeta_resultados.grid.init()

                 },
                 error: function (_response) {
                        alertify.error("No se ha podido eliminar el registro")
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

                url: url_archivo_solicitud,
                type: "GET",
                dataType: "json",
            },
            parameterMap: function (data, action) {
                if (action === "read") {
                    return popup_filtros.get_Values_Excel()
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