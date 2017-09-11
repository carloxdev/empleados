/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/
var url_expediente_personal_bypage = window.location.origin + "/api-capitalhumano/personal_bypage/"
var url_expediente_capacitacion_bypage = window.location.origin +"/api-capitalhumano/capacitacion_bypage/"
var url_archivo =  window.location.origin + "/api-capitalhumano/archivo/"
var url_profile =  window.location.origin + "/api-seguridad/profile/"
var url_solicitud = window.location.origin + "/api-administracion/solicitud/"

// OBJS
var grid_personal = null
var grid_capacitacion = null
var filtros = null
var tarjeta_resultados = null
var personalizacion = null
var popup = null
var popup_informacion_personal = null
var popup_informacion_capacitacion = null


/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {
    filtros = new Filtros()
    tarjeta_resultados = new TarjetaResultados()

})

/*-----------------------------------------------*\
            OBJETO: Tarjeta Resultados
\*-----------------------------------------------*/

function TarjetaResultados(){
    this.personalizacion = new Personalizacion()
    this.popup = new Popup()
    this.popup_informacion_personal = new PopupInformacionPersonal()
    this.popup_informacion_capacitacion = new PopupInformacionCapacitacion()
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
        numero_empleado: this.$numero_empleado.val(),
   }
}
Filtros.prototype.get_ValuesCap = function (_page) {
    return {
        page: _page,
        numero_empleado: this.$numero_empleado.val(),
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
    extension = tarjeta_resultados.popup.validar_Archivo(e.data.$archivo.val())
    if (tarjeta_resultados.popup.validar_Campos() != 'True'){
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
                tarjeta_resultados.popup.formar_Data(id_solicitud)
            })
        }else if(extension==""){
            e.data.$formulario.append('<div class="alert alert-danger nova-margin" id="id_error"><span class="icon mdi mdi-close-circle-o"></span><strong>Debe adjuntar el archivo correspondiente.</strong></div>')
        }
        else{
            e.data.$formulario.append('<div class="alert alert-danger nova-margin" id="id_error"><span class="icon mdi mdi-close-circle-o"></span><strong>Solo se permiten archivos pdf.</strong></div>')
        }
    }
}
Popup.prototype.formar_Data = function (_id_solicitud){
    var data = new FormData()
    tarjeta_resultados.popup.$formulario.find(':input').each(function() {
            var elemento= this;
            if(elemento.type === 'file'){
                 if(elemento.value !== ''){
                            for(var i=0; i< $('#'+elemento.id).prop("files").length; i++){
                                data.append('archivo', $('#'+elemento.id).prop("files")[i])
                                data.append('tipo_archivo', "sol")
                                data.append('content_object', url_solicitud+_id_solicitud+"/")
                                data.append('created_by', url_profile+tarjeta_resultados.popup.$created_by.val()+"/")
                                tarjeta_resultados.popup.guardar_Archivo(_id_solicitud, data)
                         }
                    }              
             }
    })
}
Popup.prototype.guardar_Archivo = function (_id_solicitud, _data){

         $.ajax({
                 url: url_archivo,
                 method: "POST",
                 headers: { "X-CSRFToken": appnova.galletita },
                 contentType: false,
                 processData: false,
                 data: _data,
                 success: function (_response) {

                        alertify.success("Se ha guardado el archivo")
                        tarjeta_resultados.popup.hidden_Modal()
                        
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
    tarjeta_resultados.popup.clear_Estilos()
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
        OBJETO: Pop up informacion personal
\*-----------------------------------------------*/

function PopupInformacionPersonal(){
    this.$modal_informacion = $('#modal_ver_informacion')
    this.$boton_salir = $('#id_boton_salir')
    this.$contenido = $('#contenido')

    this.init_Components()
    this.init_Events()
}
PopupInformacionPersonal.prototype.init_Components = function (){
}
PopupInformacionPersonal.prototype.init_Events = function (){

    this.$boton_salir.on('click', this, this.hidden_Modal)
}
PopupInformacionPersonal.prototype.consultar_Registro = function (_id){

    $.ajax({
          url: url_expediente_personal_bypage + _id +"/",
          type: "GET",
          headers: { "X-CSRFToken": appnova.galletita },
          contentType: "application/json; charset=utf-8",
          success: function (_response) {
            nombre_documento = _response.tipo_documento
            url = _response.relacion
            for (var i = 0; i < url.length; i++) {
                url_archivo_personal = url[i]
                tarjeta_resultados.popup_informacion_personal.consultar_Archivo(i,url_archivo_personal, nombre_documento)
            }
          },
          error: function (_response) {
             alertify.error("Ocurrio un error al consultar")
          }
       })
}
PopupInformacionPersonal.prototype.consultar_Archivo = function (_numero, _url_archivo_personal, _nombre_documento){
    $.ajax({
          url: _url_archivo_personal,
          type: "GET",
          headers: { "X-CSRFToken": appnova.galletita },
          contentType: "application/json; charset=utf-8",
          success: function (_response) {
            
            url = _response.archivo
            tarjeta_resultados.popup_informacion_personal.cargar_Archivos(_numero+1,url,_nombre_documento)
          },
          error: function (_response) {
             alertify.error("Ocurrio un error al consultar")
          }
       })
}
PopupInformacionPersonal.prototype.cargar_Archivos = function (_numero,_url_archivo,_nombre_documento){

    this.$contenido.append("<a href='"+ _url_archivo +"' target='_blank'><img src='/static/images/decoradores/PDF.jpg' width='30px' height='30px'></img> Archivo No."+_numero+" : "+_nombre_documento+" </a><br>")

}
PopupInformacionPersonal.prototype.hidden_Modal = function (e) {

     e.data.$modal_informacion.modal('hide')
}

/*-----------------------------------------------*\
            OBJETO: Pop up informacion personal
\*-----------------------------------------------*/

function PopupInformacionCapacitacion(){

    this.$modal_informacion = $('#modal_ver_informacion')
    this.$boton_salir = $('#id_boton_salir')
    this.$contenido = $('#contenido')

    this.init_Components()
    this.init_Events()
}
PopupInformacionCapacitacion.prototype.init_Components = function (){
}
PopupInformacionCapacitacion.prototype.init_Events = function (){

    this.$boton_salir.on('click', this, this.hidden_Modal)
}
PopupInformacionCapacitacion.prototype.consultar_Registro = function (_id){

    $.ajax({
          url: url_expediente_capacitacion_bypage + _id +"/",
          type: "GET",
          headers: { "X-CSRFToken": appnova.galletita },
          contentType: "application/json; charset=utf-8",
          success: function (_response) {
            nombre_documento = _response.curso
            url = _response.relacion
            for (var i = 0; i < url.length; i++) {
                url_archivo_capacitacion = url[i]
                tarjeta_resultados.popup_informacion_capacitacion.consultar_Archivo(i, url_archivo_capacitacion, nombre_documento)
            }
          },
          error: function (_response) {
             alertify.error("Ocurrio un error al consultar")
          }
       })
}
PopupInformacionCapacitacion.prototype.consultar_Archivo = function (_numero, _url_archivo_capacitacion, _nombre_documento){
    $.ajax({
          url: _url_archivo_capacitacion,
          type: "GET",
          headers: { "X-CSRFToken": appnova.galletita },
          contentType: "application/json; charset=utf-8",
          success: function (_response) {
            
            url = _response.archivo
            tarjeta_resultados.popup_informacion_capacitacion.cargar_Archivos(_numero+1,url,_nombre_documento)
          },
          error: function (_response) {
             alertify.error("Ocurrio un error al consultar")
          }
       })
}
PopupInformacionCapacitacion.prototype.cargar_Archivos = function (_numero,_url_archivo,_nombre_documento){

    this.$contenido.append("<a href='"+ _url_archivo +"' target='_blank'> Archivo No."+_numero+" : "+_nombre_documento+" </a><br>")
}
PopupInformacionCapacitacion.prototype.hidden_Modal = function (e) {

     e.data.$modal_informacion.modal('hide')
}

/*-----------------------------------------------*\
            OBJETO: Personalizacion del tab
\*-----------------------------------------------*/

function Personalizacion(){
    this.$personales = $('#personales')
    this.$capacitaciones = $('#capacitaciones')
    this.$li_personales = $('#per')
    this.$li_capacitaciones = $('#cap')
    this.init_Events()
}
Personalizacion.prototype.init_Components = function(){
}
Personalizacion.prototype.init_Events = function(){
    
    this.$personales.on("click", this , this.mostrar_Personales)
    this.$capacitaciones.on("click", this , this.mostrar_Capacitaciones)
    this.$li_personales.on("click", this , this.mostrar_Personales)
    this.$li_capacitaciones.on("click", this , this.mostrar_Capacitaciones)
}
Personalizacion.prototype.mostrar_Personales = function(e){
     
    e.data.$capacitaciones.removeClass('nova-active-tab')
    e.data.$personales.addClass('nova-active-tab')
    e.data.$li_capacitaciones.removeClass('active')
    e.data.$li_personales.addClass('active')
    $("#grid_resultados").empty()
    grid_personal.init()
}
Personalizacion.prototype.mostrar_Capacitaciones = function(e){
    
    e.data.$personales.removeClass('nova-active-tab')
    e.data.$capacitaciones.addClass('nova-active-tab')
    e.data.$li_personales.removeClass('active')
    e.data.$li_capacitaciones.addClass('active')
    $("#grid_resultados").empty()
    grid_capacitacion = new GridCapacitacion()
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
        pk: {type: "string"},
        numero_empleado: { type: "string" },
        agrupador : { type: "string" },
        fecha : { type: "date"},
        vigencia_inicio : { type: "string" },
        vigencia_fin : { type: "string" },
        tipo_documento : { type: "string" },
        relacion : { type: "string"},
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
        dataBound: this.aplicar_Estilos,
    }
}
GridPersonal.prototype.get_Columnas = function () {

    return [  
        {   field: "relacion", 
            title: " ", 
            width:"50px" ,
            template: '<a class="btn btn-default nova-url" href="\\#modal_ver_informacion" data-toggle="modal" data-event="ver-personal" id="#=pk#"><i class="icon icon-left icon mdi mdi-file icon-black"></i></a>',
        },
        { field: "tipo_documento", title: "Tipo documento",  width:"200px"},
        { field: "agrupador", title: "Agrupador", width:"100px"},
        { field: "vigencia_inicio",title: "Vigencia inicio",width:"100px"},
        { field: "vigencia_fin", title: "Vigencia fin", width:"100px" },
        { field: "created_by", title: "Creado por", width:"150px" },
        { field: "created_date", title: "Fecha de creación", width:"120px", format: "{0:dd/MM/yyyy}" },

    ]
}
GridPersonal.prototype.aplicar_Estilos = function (e) {

    e.sender.tbody.find("[data-event='ver-personal']").each(function(idx, element){
      $(this).on("click", function(){
        tarjeta_resultados.popup_informacion_personal.$contenido.empty()
        tarjeta_resultados.popup_informacion_personal.consultar_Registro(this.id)
      })
    })

    columns = e.sender.columns
    dataItems = e.sender.dataSource.view()
    fecha_hoy = new Date()
    fecha_por_vencer = grid_personal.sumar_Dias(new Date(), 90)

    for (var j = 0; j < dataItems.length; j++) {
        fecha_vencimiento = dataItems[j].get("vigencia_fin")
        fecha = grid_personal.convertir_Fecha(fecha_vencimiento)
        row = e.sender.tbody.find("[data-uid='" + dataItems[j].uid + "']")
        row.removeClass("k-alt")
        if(fecha != null){
            vencimiento = fecha.getTime()
            if (vencimiento <= fecha_hoy.getTime()) {
                row.addClass("nova-fecha-vencida")
            }
            else if ((vencimiento > fecha_hoy.getTime()) && (vencimiento <= fecha_por_vencer)){
                row.addClass("nova-fecha-por-vencer")
            }
        }
    }
}
GridPersonal.prototype.sumar_Dias = function (fecha, dias){

  fecha.setDate(fecha.getDate() + dias);
  return fecha;
}
GridPersonal.prototype.convertir_Fecha = function (_fecha){
    año = _fecha.split("/")[2]
    mes = _fecha.split("/")[1]
    dia = _fecha.split("/")[0]
    fecha_formateada = año+"-"+mes+"-"+dia
    fecha = new Date(fecha_formateada)
    return fecha
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
        relacion : { type: "string"},
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
        {   field: "relacion", 
            title: " ", 
            width:"50px" ,
            template: '<a class="btn btn-default nova-url" href="\\#modal_ver_informacion" data-toggle="modal" data-event="ver-capacitacion" id="#=pk#"><i class="icon icon-left icon mdi mdi-file icon-black"></i></a>',
        },
        { field: "curso", title: "Curso", width:"200px"},
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
        { field: "created_date", title: "Fecha de creación", width:"120px", format: "{0:dd/MM/yyyy}" },

    ]
}
GridCapacitacion.prototype.aplicar_Estilos = function (e) {

    e.sender.tbody.find("[data-event='ver-capacitacion']").each(function(idx, element){
      $(this).on("click", function(){
        tarjeta_resultados.popup_informacion_capacitacion.$contenido.empty()
        tarjeta_resultados.popup_informacion_capacitacion.consultar_Registro(this.id)
      })
    })

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

