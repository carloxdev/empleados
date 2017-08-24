/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/
var url_expediente_personal_bypage = window.location.origin  + "/api-capitalhumano/archivopersonal_bypage/"
var url_expediente_capacitacion_bypage = window.location.origin  + "/api-capitalhumano/archivocapacitacion_bypage/"
var url_solicitud = window.location.origin + "/api-administracion/solicitud/"
var url_solicitudes_bypage = window.location.origin + "/api-administracion/archivosolicitud_bypage/"
var url_archivo_solicitud = window.location.origin + "/api-administracion/archivosolicitud/"
var url_archivo =  window.location.origin + "/api-capitalhumano/archivo/"
var url_profile =  window.location.origin + "/api-seguridad/profile/"

// OBJS
var grid_personal = null
var grid_capacitacion = null
var grid_solicitudes = null
var filtros = null
var tarjeta_resultados = null
var personalizacion = null
var popup = null
var popup_informacion = null
var id = ''

/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {
    filtros = new Filtros()
    tarjeta_resultados = TarjetaResultados()

})

/*-----------------------------------------------*\
            OBJETO: Tarjeta Resultados
\*-----------------------------------------------*/

function TarjetaResultados(){
    this.personalizacion = new Personalizacion()
    this.popup = new Popup()
    this.popup_informacion = new PopupInformacion()
    grid_personal = new GridPersonal()
}

/*-----------------------------------------------*\
            OBJETO: Filtros
\*-----------------------------------------------*/

function Filtros(){

    this.$numero_empleado = $('#numero_empleado')
}
Filtros.prototype.get_Values = function (_page) {
    return {
        page: _page,
        relacion_personal__numero_empleado: this.$numero_empleado.val(),
   }
}
Filtros.prototype.get_ValuesCap = function (_page) {
    return {
        page: _page,
        relacion_capacitacion__numero_empleado: this.$numero_empleado.val(),
   }
}
Filtros.prototype.get_ValuesSolicitudes = function (_page){
    return {
        page: _page,
        relacion_solicitud__numero_empleado: this.$numero_empleado.val(),
   }
}

/*-----------------------------------------------*\
            OBJETO: Modal actualizacion
\*-----------------------------------------------*/

function Popup(){

    this.$formulario = $('#formulario')
    this.$numero_empleado = $('#numero_empleado')
    this.$asunto = $('#id_asunto')
    // this.$departamento = $('#id_departamento')
    this.$descripcion = $('#id_descripcion')
    this.$archivo = $('#id_archivo')
    this.$created_by = $('#id_created_by')
    this.$boton_limpiar = $('#boton_limpiar')
    this.$boton_enviar = $('#boton_enviar')
    this.$formulario = $('#formulario')
    this.$modal_actualizar = $('#modal_actualizar')

    this.init_Events()
    this.init_Components()

}
Popup.prototype.init_Components = function(){
    this.$asunto.select2(appnova.get_ConfigSelect2())
}
Popup.prototype.init_Events = function(){
    
    this.$boton_limpiar.on("click", this , this.limpiar_Campos)
    this.$boton_enviar.on("click", this, this.enviar_Solicitud)
}
Popup.prototype.enviar_Solicitud = function (e){
    id_solicitud = ''
    extension = popup.validar_Archivo(e.data.$archivo.val())
    if (popup.validar_Campos() != 'True'){
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
                popup.guardar_Archivo(id_solicitud)
            })
        }else if(extension==""){
            e.data.$formulario.append('<div class="alert alert-danger nova-margin" id="id_error"><span class="icon mdi mdi-close-circle-o"></span><strong>Debe adjuntar el archivo correspondiente.</strong></div>')
        }
        else{
            e.data.$formulario.append('<div class="alert alert-danger nova-margin" id="id_error"><span class="icon mdi mdi-close-circle-o"></span><strong>Solo se permiten archivos pdf.</strong></div>')
        }
    }
}
Popup.prototype.guardar_Archivo = function (_id_solicitud){

        var data = new FormData()
        popup.$formulario.find(':input').each(function() {
                var elemento= this;
                if(elemento.type === 'file'){
                     if(elemento.value !== ''){
                                for(var i=0; i< $('#'+elemento.id).prop("files").length; i++){
                                    data.append('archivo', $('#'+elemento.id).prop("files")[i]);
                             }
                            
                                data.append('tipo_archivo', "sol")
                                data.append('content_object', url_solicitud+_id_solicitud+"/")
                                data.append('created_by', url_profile+popup.$created_by.val()+"/")
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
                        popup.hidden_Modal()
                        personalizacion.actualizar_Grid()
                        
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
Popup.prototype.hidden_Modal = function () {

    this.$modal_actualizar.modal('hide')
    this.$asunto.data('select2').val(0)
    this.$descripcion.val("")
    this.$archivo.val("")
}
Popup.prototype.limpiar_Campos = function (e){
    e.data.$asunto.data('select2').val(0)
    e.data.$descripcion.val("")
    e.data.$archivo.val("")
    popup.clear_Estilos()
}
Popup.prototype.validar_Campos = function () {
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
Popup.prototype.clear_Estilos = function () {

   this.$asunto.data('select2').$selection.removeClass("nova-has-error");
   this.$descripcion.removeClass("nova-has-error")
   this.$formulario.get(0).reset()
   this.$archivo.removeClass("nova-has-error")
   $('#id_error').detach()
}
Popup.prototype.validar_Archivo = function (_archivo) {
        extension = (_archivo.substring(_archivo.lastIndexOf("."))).toLowerCase();
        return extension
}

/*-----------------------------------------------*\
            OBJETO: Popup informacion
\*-----------------------------------------------*/

function PopupInformacion(){

    this.$folio = $('#modal_titulo')
    this.$asunto_informacion = $('#id_asunto_informacion')
    this.$descripcion_informacion = $('#id_descripcion_informacion')
    this.$estatus_informacion = $('#id_status_informacion')
    this.$observaciones_informacion = $('#id_observaciones_informacion')

    this.init_Components()
    this.init_Events()
}
PopupInformacion.prototype.init_Components = function (){

}
PopupInformacion.prototype.init_Events = function (){

}
PopupInformacion.prototype.obtener_Id = function (_id) {
    id = _id
    this.consultar_Registro(id)
}
PopupInformacion.prototype.consultar_Registro = function (_id){
    $.ajax({
          url: url_archivo_solicitud + _id +"/",
          type: "GET",
          headers: { "X-CSRFToken": appnova.galletita },
          contentType: "application/json; charset=utf-8",

          success: function (_response) {
            popup_informacion.llenar_Informacion(_response.object_id,_response.asunto,_response.descripcion, _response.status, _response.observaciones)
          },
          error: function (_response) {
             alertify.error("Ocurrio un error al consultar")
          }
       })
}
PopupInformacion.prototype.llenar_Informacion = function (_folio,_asunto,_descripcion,_status,_observaciones){
    this.$folio.text("Folio: #"+_folio)
    this.$asunto_informacion.val(_asunto)
    this.$descripcion_informacion.val(_descripcion)
    this.$estatus_informacion.val(_status)
    this.$observaciones_informacion.val(_observaciones)
}

/*-----------------------------------------------*\
            OBJETO: Personalizacion del tab
\*-----------------------------------------------*/

function Personalizacion(){
    this.$personales = $('#personales')
    this.$capacitaciones = $('#capacitaciones')
    this.$solicitudes = $('#solicitudes')
    this.init_Events()
}
Personalizacion.prototype.init_Components = function(){
}
Personalizacion.prototype.init_Events = function(){
    
    this.$personales.on("click", this , this.mostrar_Personales)
    this.$capacitaciones.on("click", this , this.mostrar_Capacitaciones)
    this.$solicitudes.on("click", this , this.mostrar_Solicitudes)
}
Personalizacion.prototype.mostrar_Personales = function(e){
     
    e.data.$capacitaciones.removeClass('nova-active-tab')
    e.data.$personales.addClass('nova-active-tab')
    e.data.$solicitudes.removeClass('nova-active-tab')
    $("#grid_resultados").empty()
    grid_personal.init()
}
Personalizacion.prototype.mostrar_Capacitaciones = function(e){
    
    e.data.$personales.removeClass('nova-active-tab')
    e.data.$capacitaciones.addClass('nova-active-tab')
    e.data.$solicitudes.removeClass('nova-active-tab')
    $("#grid_resultados").empty()
    grid_capacitacion = new GridCapacitacion()
}
Personalizacion.prototype.mostrar_Solicitudes = function (e){
    e.data.$solicitudes.addClass('nova-active-tab')
    e.data.$personales.removeClass('nova-active-tab')
    e.data.$capacitaciones.removeClass('nova-active-tab')
    $("#grid_resultados").empty()
    grid_solicitudes = new GridSolicitudes()
}
Personalizacion.prototype.actualizar_Grid = function (){
    this.$solicitudes.addClass('nova-active-tab')
    this.$personales.removeClass('nova-active-tab')
    this.$capacitaciones.removeClass('nova-active-tab')
    $("#grid_resultados").empty()
    grid_solicitudes = new GridSolicitudes()
}

/*-----------------------------------------------*\
            OBJETO: Grid personal
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
                    return  filtros.get_Values(data.page)
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
        agrupador : { type: "string" },
        fecha : { type: "date"},
        vigencia_inicio : { type: "string" },
        vigencia_fin : { type: "string" },
        tipo_documento : { type: "string" },
        archivo : { type: "string" },
        created_by : { type: "string" },
        created_date : { type: "date" },
    }
}
GridPersonal.prototype.get_Configuracion = function () {

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
GridPersonal.prototype.get_Columnas = function () {

    return [  
        { field: "tipo_documento", 
          title: "Archivo", 
          width:"150px" ,
          template: '<a href="#=archivo#" target="_blank">#=tipo_documento#</a>',
        },
        { field: "agrupador", title: "Agrupador", width:"100px"},
        { field: "vigencia_inicio",title: "Vigencia inicio",width:"100px"},
        { field: "vigencia_fin", title: "Vigencia fin", width:"100px" },
        { field: "created_by", title: "Creado por", width:"150px" },
        { field: "created_date", title: "Fecha de creación", width:"150px", format: "{0:dd/MM/yyyy}" },

    ]
}
GridPersonal.prototype.buscar = function() {

    this.kfuente_datos.page(1)
}

/*-----------------------------------------------*\
            OBJETO: Grid capacitacion
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
                    return  filtros.get_ValuesCap(data.page)
                }
            }
        },
        schema: {
            data: "results",
            total: "count",
            model: {
                fields: this.get_CamposCap()
            }
        },
        error: function (e) {
            alertify.error("Status: " + e.status + "; Error message: " + e.errorThrown)
        },
    }    
}
GridCapacitacion.prototype.get_CamposCap = function () {
    return {
        curso : { type: "string" },
        agrupador: { type: "string" },
        area: { type: "string" },
        proveedor : { type: "string"},
        modalidad : { type: "string" },
        costo : { type: "string" },
        moneda : { type: "integer" },
        fecha_inicio : { type: "string" },
        fecha_fin : { type: "string" },
        fecha_vencimiento: { type: "date" },
        duracion : { type: "string" },
        observaciones : { type: "string" },
        created_by : { type: "string" },
        created_date : { type: "date" },
    }
}
GridCapacitacion.prototype.get_Configuracion = function () {

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
        dataBound: this.aplicar_Estilos
    }
}
GridCapacitacion.prototype.get_Columnas = function () {

    return [  
        { field: "curso", 
          title: "Curso", 
          width:"150px" ,
          template: '<a href="#=archivo#" target="_blank">#=curso#</a>',
        },
        { field: "agrupador", title: "Agrupador", width:"100px"},
        { field: "area", title: "Area", width:"100px"},
        { field: "proveedor", title: "Proveedor", width:"150px"},
        { field: "modalidad",title: "Modalidad",width:"100px"},
        { field: "costo", title: "Costo", width:"100px" },
        { field: "moneda",title: "Moneda",width:"100px"},
        { field: "fecha_inicio", title: "Fecha inicio", width:"100px" },
        { field: "fecha_fin",title: "Fecha fin",width:"100px"},
        { field: "fecha_vencimiento", title: "Fecha vencimiento", width:"100px", format: "{0:dd/MM/yyyy}" },
        { field: "duracion", title: "Duración", width:"100px",template: '#=duracion# hrs' },
        { field: "observaciones", title: "Observaciones", width:"200px" },
        { field: "created_by", title: "Creado por", width:"150px" },
        { field: "created_date", title: "Fecha de creación", width:"150px", format: "{0:dd/MM/yyyy}" },

    ]
}
GridCapacitacion.prototype.aplicar_Estilos = function (e) {

    columns = e.sender.columns
    dataItems = e.sender.dataSource.view()
    fecha_hoy = new Date()

    for (var j = 0; j < dataItems.length; j++) {
        fecha_vencimiento = dataItems[j].get("fecha_vencimiento")
        row = e.sender.tbody.find("[data-uid='" + dataItems[j].uid + "']")
        row.removeClass("k-alt");
        if(fecha_vencimiento != null){
  
            if (fecha_vencimiento.getTime() <= fecha_hoy.getTime()) {
                row.addClass("fecha-vencida")
            }
        }
    }
}
GridCapacitacion.prototype.buscar = function() {
    this.kfuente_datos.page(1)
}

/*-----------------------------------------------*\
            OBJETO: Grid solicitudes
\*-----------------------------------------------*/

function GridSolicitudes() {

    this.$id = $("#grid_resultados")
    this.kfuente_datos = null

    this.kgrid = null
    this.init()
}
GridSolicitudes.prototype.init = function () {

    // Definicion del pais, formato modena, etc..
    kendo.culture("es-MX")

    // Se inicializa la fuente da datos (datasource)
    this.kfuente_datos = new kendo.data.DataSource(this.get_DataSourceConfig())
    
    // Se inicializa y configura el grid:
    this.kgrid = this.$id.kendoGrid(this.get_Configuracion())
}
GridSolicitudes.prototype.get_DataSourceConfig = function () {
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
                    return  filtros.get_ValuesSolicitudes(data.page)
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
GridSolicitudes.prototype.get_Campos = function () {
    
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
GridSolicitudes.prototype.get_Configuracion = function () {

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
GridSolicitudes.prototype.onDataBound = function (e) {
    // pk del elemento
   e.sender.tbody.find("[data-event='editar']").each(function(idx, element){ 
      $(this).on("click", function(){
        popup_informacion.obtener_Id(this.id)
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
GridSolicitudes.prototype.get_Columnas = function () {

    return [
        { field: "object_id",
          title: "Folio",
          width:"70px",
          template: '<a href="\\#modal_informacion" data-toggle="modal" id="#=pk#" data-event="editar">#=object_id#</a>',
        },  
        { field: "status", title: "Estatus", width:"100px"},
        { field: "asunto", 
          title: "Archivo", 
          width:"150px" ,
          template: '<a href="#=archivo#" target="_blank">#=asunto#</a>',
        },
        { field: "clave_departamento", title: "Se solicito a", width:"150px"},
        { field: "created_by", title: "Creado por", width:"150px" },
        { field: "created_date", title: "Fecha de creación", width:"150px", format: "{0:dd/MM/yyyy}" },
        { field: "updated_by", title: "Actualizado por", width:"150px" },
        { field: "updated_date", title: "Fecha de actualización", width:"150px", format: "{0:dd/MM/yyyy}" },

    ]
}
GridSolicitudes.prototype.buscar = function() {

    this.kfuente_datos.page(1)
}

