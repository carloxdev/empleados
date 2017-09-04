/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

var url_archivo_solicitud = window.location.origin + "/api-administracion/archivosolicitud/"
var url_solicitud = window.location.origin + "/api-administracion/solicitud/"
var url_solicitudes_bypage = window.location.origin + "/api-administracion/archivosolicitud_bypage/"
var url_profile =  window.location.origin + "/api-seguridad/profile/"
var url_archivo =  window.location.origin + "/api-capitalhumano/archivo/"

//OBJS
var tarjeta_filtro = null
var grid = null
var toolbar = null
var tarjeta_resultados = null
var popup = null
var popup_nuevo = null


/*------------------------------------------------*\  
            LOAD
\*-----------------------------------------------*/

$(document).ready(function(){
    tarjeta_filtro = new TarjetaFiltro()
    tarjeta_resultados = new TarjetaResultados()

    // Asigna eventos a teclas
    $(document).keypress(function (e) {
            // Tecla Enter
            if (e.which == 13) {
                tarjeta_resultados.grid.buscar()
                tarjeta_filtro.hidden_Modal()
            }
    })      
})

/*-----------------------------------------------*\
            OBJETO: Tarjeta resultados
\*-----------------------------------------------*/

function TarjetaResultados(){
    this.grid = new Grid()
    this.popup = new Popup()
    this.popup_nuevo = new PopupNuevo()
}

/*-----------------------------------------------*\
            OBJETO: TARJETA FILTRO EMPLEADO
\*-----------------------------------------------*/


function TarjetaFiltro(){

    this.$modal = $('#modal_filtro')
    this.$numero_empleado = $('#numero_empleado')
    this.$asunto = $('#id_asuntofiltro')
    this.$folio = $('#id_folio')
    this.$status = $('#id_status')

    this.$boton_buscar = $('#boton_buscar')
    this.$boton_limpiar = $('#boton_limpiar_filtro')

    this.init_Components()
    this.init_Events()
}
TarjetaFiltro.prototype.init_Components = function () {

    this.$asunto.select2(appnova.get_ConfigSelect2())
    this.$status.select2(appnova.get_ConfigSelect2())
}
TarjetaFiltro.prototype.init_Events = function () {
    
    this.$boton_buscar.on("click", this, this.click_BotonBuscar)
    this.$boton_limpiar.on("click", this, this.click_BotonLimpiar)
}
TarjetaFiltro.prototype.click_BotonBuscar = function (e) {

        e.preventDefault()
        tarjeta_resultados.grid.buscar()
        tarjeta_filtro.hidden_Modal()
}
TarjetaFiltro.prototype.click_BotonLimpiar = function (e) {
        
        e.preventDefault()
        e.data.$folio.val("")
        e.data.$asunto.data('select2').val(0)  
        e.data.$status.data('select2').val(0)
}
TarjetaFiltro.prototype.get_Values = function (_page) {
    return {
        page: _page,
        relacion_solicitud__numero_empleado: this.$numero_empleado.val(),
        relacion_solicitud__id: this.$folio.val(),
        relacion_solicitud__asunto: this.$asunto.val(),
        relacion_solicitud__status: this.$status.val(),
   }
}
TarjetaFiltro.prototype.hidden_Modal = function () {

   this.$modal.modal('hide')
}

/*-----------------------------------------------*\
            OBJETO: Popup
\*-----------------------------------------------*/

function Popup(){

    this.$folio = $('#modal_titulo')
    this.$asunto_informacion = $('#id_asunto_informacion')
    this.$descripcion_informacion = $('#id_descripcion_informacion')
    this.$estatus_informacion = $('#id_status_informacion')
    this.$observaciones_informacion = $('#id_observaciones_informacion')
}
Popup.prototype.consultar_Registro = function (_id){
    $.ajax({
          url: url_archivo_solicitud + _id +"/",
          type: "GET",
          headers: { "X-CSRFToken": appnova.galletita },
          contentType: "application/json; charset=utf-8",

          success: function (_response) {
            tarjeta_resultados.popup.llenar_Informacion(_response.object_id,_response.asunto,_response.descripcion, _response.status, _response.observaciones)
          },
          error: function (_response) {
             alertify.error("Ocurrio un error al consultar")
          }
       })
}
Popup.prototype.llenar_Informacion = function (_folio,_asunto,_descripcion,_status,_observaciones){
    this.$folio.text("Folio: #"+_folio)
    this.$asunto_informacion.val(_asunto)
    this.$descripcion_informacion.val(_descripcion)
    this.$estatus_informacion.val(_status)
    this.$observaciones_informacion.val(_observaciones)
}


/*-----------------------------------------------*\
        OBJETO: Modal nuevo
\*-----------------------------------------------*/

function PopupNuevo(){

    this.$formulario = $('#formulario')
    this.$numero_empleado = $('#numero_empleado')
    this.$asunto = $('#id_asunto')
    this.$descripcion = $('#id_descripcion')
    this.$archivo = $('#id_archivo')
    this.$created_by = $('#id_created_by')

    this.$boton_limpiar = $('#boton_limpiar_nuevo')
    this.$boton_enviar = $('#boton_enviar')
    this.$modal_nuevo = $('#modal_nuevo')

    this.init_Events()
    this.init_Components()
}
PopupNuevo.prototype.init_Components = function(){

    this.$asunto.select2(appnova.get_ConfigSelect2())
}
PopupNuevo.prototype.init_Events = function(){
    
    this.$boton_limpiar.on("click", this , this.limpiar_Campos)
    this.$boton_enviar.on("click", this, this.enviar_Solicitud)
}
PopupNuevo.prototype.enviar_Solicitud = function (e){
    id_solicitud = ''
    extension = tarjeta_resultados.popup_nuevo.validar_Archivo(e.data.$archivo.val())
    if (tarjeta_resultados.popup_nuevo.validar_Campos() != 'True'){
        if (extension == ".pdf"){
            var promesa = $.ajax({
                     url: url_solicitud,
                     method: "POST",
                     headers: { "X-CSRFToken": appnova.galletita },
                     data: {
                            'numero_empleado' : e.data.$numero_empleado.val(),
                            'clave_departamento' : 107,
                            'asunto' : e.data.$asunto.val(),
                            'descripcion' : e.data.$descripcion.val(),
                            'observaciones': '--',
                            'created_by' : url_profile+e.data.$created_by.val()+"/",
                     },
                     success: function (_response) {
                            id_solicitud = _response.pk
                     },
                     error: function (_response) {
                            alertify.error("Ocurrio error al guardar")
                     }
                })
            promesa.then(function(){
                tarjeta_resultados.popup_nuevo.guardar_Archivo(id_solicitud)
            })
        }else if(extension==""){
            e.data.$formulario.append('<div class="alert alert-danger nova-margin" id="id_error"><span class="icon mdi mdi-close-circle-o"></span><strong>Debe adjuntar el archivo correspondiente.</strong></div>')
        }
        else{
            e.data.$formulario.append('<div class="alert alert-danger nova-margin" id="id_error"><span class="icon mdi mdi-close-circle-o"></span><strong>Solo se permiten archivos pdf.</strong></div>')
        }
    }
}
PopupNuevo.prototype.guardar_Archivo = function (_id_solicitud){

        var data = new FormData()
        tarjeta_resultados.popup_nuevo.$formulario.find(':input').each(function() {
                var elemento= this;
                if(elemento.type === 'file'){
                     if(elemento.value !== ''){
                                for(var i=0; i< $('#'+elemento.id).prop("files").length; i++){
                                    data.append('archivo', $('#'+elemento.id).prop("files")[i]);
                             }
                            
                                data.append('tipo_archivo', "sol")
                                data.append('content_object', url_solicitud+_id_solicitud+"/")
                                data.append('created_by', url_profile+tarjeta_resultados.popup_nuevo.$created_by.val()+"/")
                        }              
                 }
         })

         $.ajax({
                 url: url_archivo,
                 method: "POST",
                 headers: { "X-CSRFToken": appnova.galletita },
                 contentType: false,
                 processData: false,
                 data: data,
                 success: function (_response) {

                        alertify.success("Se ha guardado el archivo")
                        tarjeta_resultados.popup_nuevo.hidden_Modal()
                        tarjeta_resultados.grid.init()
                        
                 },
                 error: function (_response) {
                        alertify.error("Ocurrio error al guardar archivo")

                        $.ajax({
                             url: url_solicitud +_id_solicitud+"/",
                             method: "DELETE",
                             headers: { "X-CSRFToken": appnova.galletita },
                             success: function (_response) {
                                
                             },
                             error: function (_response) {
                                alertify.error("No se ha podido eliminar el registro")
                             }
                        })
                 }
            })
}
PopupNuevo.prototype.hidden_Modal = function () {

    this.$modal_nuevo.modal('hide')
    this.$asunto.data('select2').val(0)
    this.$descripcion.val("")
    this.$archivo.val("")
}
PopupNuevo.prototype.limpiar_Campos = function (e){
    e.data.$asunto.data('select2').val(0)
    e.data.$descripcion.val("")
    e.data.$archivo.val("")
    tarjeta_resultados.popup_nuevo.clear_Estilos()
}
PopupNuevo.prototype.validar_Campos = function () {
    bandera = 'False'
    $('#id_error').detach()
    if(this.$asunto.data('select2').val() == ""){
        this.$asunto.data('select2').$selection.addClass("nova-has-error");
        bandera = 'True'
    }
    else{
        this.$asunto.data('select2').$selection.removeClass("nova-has-error");
    }
    if(this.$descripcion.val() == ""){
        this.$descripcion.addClass("nova-has-error")
        bandera = 'True'
    }
    else{
        this.$descripcion.removeClass("nova-has-error")
    }
    if(this.$archivo.val() == ""){
        this.$archivo.addClass("nova-has-error")
        bandera = 'True'
    }
    else{
        this.$archivo.removeClass("nova-has-error")
    }
    if (bandera == 'True' ){
        this.$formulario.append('<div class="alert alert-danger nova-margin" id="id_error"><span class="icon mdi mdi-close-circle-o"></span><strong>Completa los campos correspondientes</strong></div>')
    }
    else{
        $('#id_error').detach()
    }

    return bandera
}
PopupNuevo.prototype.clear_Estilos = function () {

   this.$asunto.data('select2').$selection.removeClass("nova-has-error");
   this.$descripcion.removeClass("nova-has-error")
   this.$formulario.get(0).reset()
   this.$archivo.removeClass("nova-has-error")
   $('#id_error').detach()
}
PopupNuevo.prototype.validar_Archivo = function (_archivo) {
        extension = (_archivo.substring(_archivo.lastIndexOf("."))).toLowerCase();
        return extension
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

                            url: url_solicitudes_bypage,
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
        object_id: { type: "integer" },
        status : { type: "string" },
        clave_departamento : { type: "string"},
        asunto : { type: "string" },
        descripcion : { type: "string" },
        observaciones: {type: "string"},
        archivo : { type: "string" },
        created_by : { type: "string" },
        created_date : { type: "date" },
        updated_by : { type: "string"},
        updated_date : { type: "date"},
    }
}
Grid.prototype.get_Configuracion = function () {

        return {
                autoBind: true,
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
                dataBound: this.onDataBound
        }
}
Grid.prototype.get_Columnas = function () {

    return [
        { field: "object_id",
          title: "Folio",
          width:"70px",
          template: '<a class="btn btn-default nova-url" href="\\#modal_informacion" data-toggle="modal" id="#=pk#" data-event="editar">#=object_id#</a>',
        },  
        { field: "asunto", 
          title: "Solicitud", 
          width:"200px" ,
          template: '<a class="btn btn-default nova-url" href="#=archivo#" target="_blank">#=asunto#</a>',
        },
        { field: "status", title: "Estatus", width:"100px"},
        { field: "clave_departamento", title: "Se solicito a", width:"150px"},
        { field: "created_by", title: "Creado por", width:"150px" },
        { field: "created_date", title: "Fecha de creación", width:"150px", format: "{0:dd/MM/yyyy}" },
        { field: "updated_by", title: "Actualizado por", width:"150px" },
        { field: "updated_date", title: "Fecha de actualización", width:"150px", format: "{0:dd/MM/yyyy}" },

    ]
}
Grid.prototype.onDataBound = function (e) {
    // pk del elemento
   e.sender.tbody.find("[data-event='editar']").each(function(idx, element){ 
        $(this).on("click", function(){
            tarjeta_resultados.popup.consultar_Registro(this.id)
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
        }
    }
}
Grid.prototype.buscar = function() {

    this.kfuente_datos.page(1)
}