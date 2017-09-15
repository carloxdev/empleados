/*-----------------------------------------------*\
                        GLOBAL VARIABLES
\*-----------------------------------------------*/
var url_documento_personal = window.location.origin  + "/api-capitalhumano/documentopersonal/"
var url_documento_capacitacion = window.location.origin  + "/api-capitalhumano/documentocapacitacion/"
var url_archivo =  window.location.origin + "/api-home/archivo/"
var url_eliminar = window.location.origin + "/expedientes/"
var url_profile =  window.location.origin + "/api-seguridad/profile/"
var url_documento_personal_grid = window.location.origin + "/api-capitalhumano/personal_bypage/"
var url_documento_capacitacion_grid = window.location.origin +"/api-capitalhumano/capacitacion_bypage/"
var url_tipo_documento = window.location.origin + "/api-capitalhumano/tipo_documento/"


// OBJS
var popup = null
var popup_cap = null
var popup_informacion_personal = null
var grid_personal = null
var grid_capacitacion = null
var filtro = null
var tarjeta_resultados = null
var personalizacion = null

/*-----------------------------------------------*\
                        LOAD
\*-----------------------------------------------*/

$(document).ready(function () {
        filtro = new Filtro()
        tarjeta_resultados = new TarjetaResultados()

})

/*-----------------------------------------------*\
                        OBJETO: Tarjeta Resultados
\*-----------------------------------------------*/

function TarjetaResultados(){

        this.popup = new PopupPersonal()
        this.popup_cap = new PopupCapacitacion()
        this.personalizacion = new Personalizacion
        this.grid_personal = new GridPersonal()
        this.popup_informacion_personal = new PopupInformacionPersonal()
        this.popup_informacion_capacitacion = new PopupInformacionCapacitacion()
}

/*-----------------------------------------------*\
                        OBJETO: Componentes
\*-----------------------------------------------*/

function Filtro(){

        this.$numero_empleado = $('#numero_empleado')
}
Filtro.prototype.get_Values = function (_page) {
        return {
                page: _page,
                numero_empleado: this.$numero_empleado.val(),
     }
}
Filtro.prototype.get_ValuesCap = function (_page) {
        return {
                page: _page,
                numero_empleado: this.$numero_empleado.val(),
     }
}


/*-----------------------------------------------*\
                        OBJETO: Pop up personal
\*-----------------------------------------------*/

function PopupPersonal () {

    this.$modal_per = $('#modal_nuevo')
    this.$formulario_per = $('#formulario_per')
    this.$boton_nuevo = $('#boton_nuevo_per')
    this.$boton_guardar = $('#id_boton_guardar_personal')
    this.$boton_cancelar = $('#id_boton_cancelar_per')

    this.$numero_empleado = $('#numero_empleado')
    this.$tipo_documento = $('#id_tipo_documento')
    this.$agrupador = $('#id_agrupador')
    this.$vigencia_inicio = $('#id_vigencia_inicio')
    this.$vigencia_fin = $('#id_vigencia_fin')
    this.$vigencia_inicio_input = $('#id_vigencia_inicio_input')
    this.$vigencia_fin_input = $('#id_vigencia_fin_input')
    this.$created_by = $('#created_by')
    this.$archivo = $('#id_archivo')

    this.init_Components()
    this.init_Events()
}
PopupPersonal.prototype.init_Components = function () {

    this.$tipo_documento.select2(appnova.get_ConfigSelect2())
    this.$agrupador.select2(appnova.get_ConfigSelect2())
    this.$vigencia_inicio.mask("9999-99-99",{  placeholder:"aaaa/mm/dd"  })
    this.$vigencia_inicio_input.datetimepicker(this.get_DateTimePickerConfig())
    this.$vigencia_fin.mask("9999-99-99",{  placeholder:"aaaa/mm/dd"  })
    this.$vigencia_fin_input.datetimepicker(this.get_DateTimePickerConfig())
}
PopupPersonal.prototype.init_Events = function () {

    this.$agrupador.on("change", this, this.change_Select)
    this.$boton_guardar.on('click', this, this.click_BotonGuardar)
    this.$boton_cancelar.on('click', this, this.click_BotonCancelar)
}
PopupPersonal.prototype.get_DateTimePickerConfig = function () {
        return {
                autoclose: true,
                orientation: "bottom left",
                minViewMode: 2,
                format: "yyyy-mm-dd",
        }
}
PopupPersonal.prototype.change_Select = function (e) {

        $.ajax({
           url: url_tipo_documento,
           method: "GET",
           context: this,
           data: {

             "agrupador" : e.data.$agrupador.val()
           },
           success: function (_response) {
              var data = []
              data.push({id:"", text:"--------------" })
              for (var i = 0; i < _response.length; i++) {
                data.push({id:_response[i].pk, text:_response[i].tipo_documento })
              }

              e.data.$tipo_documento.select2('destroy').empty().select2({data:data})
           },
           error: function (_response) {

              alertify.error("Ocurrio error al cargar datos")
           }
        })
}
PopupPersonal.prototype.click_BotonCancelar = function (e){
        e.data.$agrupador.data('select2').val(0)
        e.data.$tipo_documento.val("").trigger('change')
        e.data.$vigencia_inicio.val("")
        e.data.$vigencia_fin.val("")
        e.data.$archivo.val("")
        tarjeta_resultados.popup.clear_Estilos()

}
PopupPersonal.prototype.click_BotonGuardar = function (e) {
        id_personal = ''
        extension = tarjeta_resultados.popup.validar_Archivo(e.data.$archivo.val())
        if (tarjeta_resultados.popup.validar_Campos() != 'True'){
                if (extension == ".pdf"){
                        var promesa = $.ajax({
                                 url: url_documento_personal,
                                 method: "POST",
                                 headers: { "X-CSRFToken": appnova.galletita },
                                 data: {
                                        'numero_empleado' : e.data.$numero_empleado.val(),
                                        'tipo_documento' : e.data.$tipo_documento.val(),
                                        //'agrupador' : e.data.$agrupador.val(), //(BORRAR) Si se agrega actualizacion esto se borra
                                        'vigencia_inicio' : e.data.$vigencia_inicio.val(),
                                        'vigencia_fin' : e.data.$vigencia_fin.val(),
                                        'created_by' : url_profile+e.data.$created_by.val()+"/",
                                 },
                                 success: function (_response) {
                                        id_personal = _response.pk
                                 },
                                 error: function (_response) {
                                        alertify.error("Ocurrio error al guardar")
                                 }
                            })
                        promesa.then(function(){
                                // tarjeta_resultados.popup.guardar_Archivo(id_personal)
                                tarjeta_resultados.popup.formar_Data(id_personal)
                        })
                }
                else{
                    e.data.$formulario_per.append('<div class="alert alert-danger nova-margin" id="id_error"><span class="icon mdi mdi-close-circle-o"></span><strong>Solo se permiten archivos pdf</strong></div>')
                }
        }
}
PopupPersonal.prototype.formar_Data = function (_id_personal){
    var data = new FormData()
    tarjeta_resultados.popup.$formulario_per.find(':input').each(function() {
            var elemento= this;
            if(elemento.type === 'file'){
                 if(elemento.value !== ''){
                            for(var i=0; i< $('#'+elemento.id).prop("files").length; i++){
                                data.append('archivo', $('#'+elemento.id).prop("files")[i])
                                data.append('tipo_archivo', "per")
                                data.append('content_object', url_documento_personal+_id_personal+"/")
                                data.append('created_by', url_profile+tarjeta_resultados.popup.$created_by.val()+"/")
                                tarjeta_resultados.popup.guardar_Archivo(_id_personal, data)
                         }
                    }              
             }
    })
}
PopupPersonal.prototype.guardar_Archivo = function (_id_personal, _data){

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
                        tarjeta_resultados.popup.actualizar_Grid()
                 },
                 error: function (_response) {
                        alertify.error("Ocurrio error al guardar archivo")

                        $.ajax({
                             url: url_documento_personal +_id_personal+"/",
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
PopupPersonal.prototype.hidden_Modal = function () {

     this.$modal_per.modal('hide')
     this.limpiar_Formulario()
}
PopupPersonal.prototype.actualizar_Grid = function () {
        $("#grid_resultados").empty()
        tarjeta_resultados.grid_personal.init()
}
PopupPersonal.prototype.limpiar_Formulario = function () {

        this.$tipo_documento.data('select2').val(0)
        this.$agrupador.data('select2').val(0)
        this.$vigencia_inicio.val("")
        this.$vigencia_fin.val("")
        this.$archivo.val("")
        tarjeta_resultados.popup.clear_Estilos()
}
PopupPersonal.prototype.validar_Campos = function () {
    bandera = 'False'

    $('#id_error').detach()
    if(this.$tipo_documento.data('select2').val() == ""){
        this.$tipo_documento.data('select2').$selection.addClass("nova-has-error");
        bandera = 'True'
    }
    else{
        this.$tipo_documento.data('select2').$selection.removeClass("nova-has-error");
    }
    if(this.$agrupador.data('select2').val() == ""){
        this.$agrupador.data('select2').$selection.addClass("nova-has-error");
        bandera = 'True'
    }
    else{
        this.$agrupador.data('select2').$selection.removeClass("nova-has-error");
    }
    if(this.$archivo.val() == ""){
        this.$archivo.addClass("nova-has-error");
        bandera = 'True'
    }
    else{
        this.$archivo.removeClass("nova-has-error");
    }
    if (bandera == 'True' ){
        this.$formulario_per.append('<div class="alert alert-danger nova-margin" id="id_error"><span class="icon mdi mdi-close-circle-o"></span><strong>Completa los campos correspondientes</strong></div>')
    }
    else{
        $('#id_error').detach()
    }
    return bandera
}
PopupPersonal.prototype.clear_Estilos = function () {

   this.$tipo_documento.data('select2').$selection.removeClass("nova-has-error");
   this.$agrupador.data('select2').$selection.removeClass("nova-has-error");
   this.$archivo.removeClass("nova-has-error");
   $('#id_error').detach()
}
PopupPersonal.prototype.validar_Archivo = function (_archivo) {
        extension = (_archivo.substring(_archivo.lastIndexOf("."))).toLowerCase();
        return extension
}


/*-----------------------------------------------*\
            OBJETO: Pop up informacion personal
\*-----------------------------------------------*/

function PopupInformacionPersonal(){
    this.$modal_informacion = $('#modal_ver_personal')
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
          url: url_documento_personal_grid + _id +"/",
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
                        OBJETO: POPUP CAPACITACION
\*-----------------------------------------------*/

function PopupCapacitacion () {

        this.$modal_cap = $('#modal_nuevo_cap')
        this.$formulario_cap = $('#form_capacitacion')
        this.$boton_nuevo = $('#boton_nuevo_cap')
        this.$boton_guardar = $('#id_boton_guardar_capacitacion')
        this.$boton_cancelar = $('#id_boton_cancelar_cap')

        this.$numero_empleado = $('#numero_empleado')
        this.$proveedor = $('#id_proveedor')
        this.$lugar = $('#id_lugar')
        this.$costo = $('#id_costo')
        this.$duracion = $('#id_duracion')
        this.$observaciones = $('#id_observaciones')
        this.$agrupadorcap = $('#id_agrupadorcap')
        this.$area = $('#id_area')
        this.$curso = $('#id_curso')
        this.$modalidad = $('#id_modalidad')
        this.$moneda = $('#id_moneda')
        this.$departamento = $('#id_departamento')
        this.$fecha_inicio = $('#id_fecha_inicio')
        this.$fecha_inicio_input = $('#id_fecha_inicio_input')
        this.$fecha_fin = $('#id_fecha_fin')
        this.$fecha_fin_input = $('#id_fecha_fin_input')
        this.$created_by = $('#created_by')
        this.$archivo_cap = $('#id_archivocap')

        this.init_Components()
        this.init_Events()
}
PopupCapacitacion.prototype.init_Components = function () {

        this.$agrupadorcap.select2(appnova.get_ConfigSelect2())
        this.$proveedor.select2(appnova.get_ConfigSelect2())
        this.$area.select2(appnova.get_ConfigSelect2())
        this.$curso.select2(appnova.get_ConfigSelect2())
        this.$modalidad.select2(appnova.get_ConfigSelect2())
        this.$moneda.select2(appnova.get_ConfigSelect2())
        this.$fecha_inicio.mask("9999-99-99",{  placeholder:"aaaa/mm/dd"  })
        this.$fecha_inicio_input.datetimepicker(this.get_DateTimePickerConfig())
        this.$fecha_fin.mask("9999-99-99",{  placeholder:"aaaa/mm/dd"  })
        this.$fecha_fin_input.datetimepicker(this.get_DateTimePickerConfig())
}
PopupCapacitacion.prototype.init_Events = function () {

     this.$boton_guardar.on('click', this, this.click_BotonGuardar)
     this.$boton_cancelar.on('click', this, this.click_BotonCancelar)
}
PopupCapacitacion.prototype.get_DateTimePickerConfig = function () {
        return {
                autoclose: true,
                orientation: "bottom left",
                minViewMode: 2,
                format: "yyyy-mm-dd",
        }
}
PopupCapacitacion.prototype.click_BotonCancelar = function(e){

    e.data.$proveedor.data('select2').val(0)
    e.data.$lugar.val("")
    e.data.$costo.val("")
    e.data.$duracion.val("")
    e.data.$observaciones.val("")
    e.data.$agrupadorcap.data('select2').val(0)
    e.data.$area.data('select2').val(0)
    e.data.$curso.data('select2').val(0)
    e.data.$modalidad.data('select2').val(0)
    e.data.$moneda.data('select2').val(0)
    e.data.$fecha_inicio.val("")
    e.data.$fecha_fin.val("")
    e.data.$archivo_cap.val("")
    tarjeta_resultados.popup_cap.clear_Estilos()   
}
PopupCapacitacion.prototype.click_BotonGuardar = function (e) {
    id_capacitacion = ''
    extension = tarjeta_resultados.popup_cap.validar_Archivo(e.data.$archivo_cap.val())
    if (tarjeta_resultados.popup_cap.validar_Campos() != 'True'){
            if (extension == ".pdf"){
                    var promesa = $.ajax({
                             url: url_documento_capacitacion,
                             method: "POST",
                             headers: { "X-CSRFToken": appnova.galletita },
                             data: {
                                    'numero_empleado' : e.data.$numero_empleado.val(),
                                    'curso' : e.data.$curso.val(),
                                    'proveedor' : e.data.$proveedor.val(),
                                    'modalidad' : e.data.$modalidad.val(),
                                    'lugar' : e.data.$lugar.val(),
                                    'costo' : e.data.$costo.val(),
                                    'moneda' : e.data.$moneda.val(),
                                    'departamento' : e.data.$departamento.val(),
                                    'fecha_inicio' : e.data.$fecha_inicio.val(),
                                    'fecha_fin' : e.data.$fecha_fin.val(),
                                    'duracion' : e.data.$duracion.val(),
                                    'observaciones' : e.data.$observaciones.val(),
                                    'agrupador' : e.data.$agrupadorcap.val(),
                                    'area' : e.data.$area.val(),
                                    'created_by' : url_profile+e.data.$created_by.val()+"/",
                             },
                             success: function (_response) {
                                    id_capacitacion = _response.pk
                             },
                             error: function (_response) {
                                    alertify.error("Ocurrio error al guardar")
                             }
                        })
                    promesa.then(function(){
                            // tarjeta_resultados.popup_cap.guardar_Archivo(id_capacitacion)
                            tarjeta_resultados.popup_cap.formar_Data(id_capacitacion)
                    })
            }
            else{
                e.data.$formulario_cap.append('<div class="alert alert-danger nova-margin" id="id_error"><span class="icon mdi mdi-close-circle-o"></span><strong>Solo se permiten archivos pdf</strong></div>')
            }
    }
}
PopupCapacitacion.prototype.formar_Data = function (_id_capacitacion){
    var data = new FormData()
    tarjeta_resultados.popup_cap.$formulario_cap.find(':input').each(function() {
            var elemento= this;
            if(elemento.type === 'file'){
                 if(elemento.value !== ''){
                            for(var i=0; i< $('#'+elemento.id).prop("files").length; i++){
                                data.append('archivo', $('#'+elemento.id).prop("files")[i])
                                data.append('tipo_archivo', "cap")
                                data.append('content_object', url_documento_capacitacion+_id_capacitacion+"/")
                                data.append('created_by', url_profile+tarjeta_resultados.popup_cap.$created_by.val()+"/")
                                tarjeta_resultados.popup_cap.guardar_Archivo(_id_capacitacion, data)
                         }
                    }              
             }
    })
}
PopupCapacitacion.prototype.guardar_Archivo = function (_id_capacitacion, _data){

     $.ajax({
             url: url_archivo,
             method: "POST",
             headers: { "X-CSRFToken": appnova.galletita },
             contentType: false,
             processData: false,
             data: _data,
             success: function (_response) {

                    alertify.success("Se ha guardado el archivo")
                    tarjeta_resultados.popup_cap.hidden_Modal()
                    tarjeta_resultados.popup_cap.actualizar_Grid()
             },
             error: function (_response) {

                    alertify.error("Ocurrio error al guardar archivo")
                    $.ajax({
                             url: url_documento_capacitacion +_id_capacitacion+"/",
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
PopupCapacitacion.prototype.hidden_Modal = function () {

     this.$modal_cap.modal('hide')
     this.limpiar_Formulario()
}
PopupCapacitacion.prototype.actualizar_Grid = function () {
    $("#grid_resultados").empty()
    grid_capacitacion.init()
}
PopupCapacitacion.prototype.limpiar_Formulario = function () {

    this.$proveedor.data('select2').val(0)
    this.$lugar.val("")
    this.$costo.val("")
    this.$duracion.val("")
    this.$observaciones.val("")
    this.$agrupadorcap.data('select2').val(0)
    this.$area.data('select2').val(0)
    this.$curso.data('select2').val(0)
    this.$modalidad.data('select2').val(0)
    this.$moneda.data('select2').val(0)
    this.$fecha_inicio.val("")
    this.$fecha_fin.val("")
    this.$archivo_cap.val("")
    tarjeta_resultados.popup_cap.clear_Estilos() 
}
PopupCapacitacion.prototype.clear_Estilos = function () {

    this.$proveedor.data('select2').$selection.removeClass("nova-has-error")
    this.$lugar.removeClass("nova-has-error")
    this.$costo.removeClass("nova-has-error")
    this.$duracion.removeClass("nova-has-error")
    this.$observaciones.removeClass("nova-has-error")
    this.$agrupadorcap.data('select2').$selection.removeClass("nova-has-error")
    this.$area.data('select2').$selection.removeClass("nova-has-error")
    this.$curso.data('select2').$selection.removeClass("nova-has-error")
    this.$modalidad.data('select2').$selection.removeClass("nova-has-error")
    this.$moneda.data('select2').$selection.removeClass("nova-has-error")
    this.$fecha_inicio.removeClass("nova-has-error")
    this.$fecha_fin.removeClass("nova-has-error")
    this.$archivo_cap.removeClass("nova-has-error")
   $('#id_error').detach()
}
PopupCapacitacion.prototype.validar_Campos = function () {
    bandera = 'False'

    $('#id_error').detach()
    if(this.$proveedor.data('select2').val() == ""){
        this.$proveedor.data('select2').$selection.addClass("nova-has-error");
        bandera = 'True'
    }
    else{
        this.$proveedor.data('select2').$selection.removeClass("nova-has-error");
    }
    if(this.$agrupadorcap.data('select2').val() == ""){
        this.$agrupadorcap.data('select2').$selection.addClass("nova-has-error");
        bandera = 'True'
    }
    else{
        this.$agrupadorcap.data('select2').$selection.removeClass("nova-has-error");
    }
    if(this.$area.data('select2').val() == ""){
        this.$area.data('select2').$selection.addClass("nova-has-error");
        bandera = 'True'
    }
    else{
        this.$area.data('select2').$selection.removeClass("nova-has-error");
    }
    if(this.$curso.data('select2').val() == ""){
        this.$curso.data('select2').$selection.addClass("nova-has-error");
        bandera = 'True'
    }
    else{
        this.$curso.data('select2').$selection.removeClass("nova-has-error");
    }
    if(this.$modalidad.data('select2').val() == ""){
        this.$modalidad.data('select2').$selection.addClass("nova-has-error");
        bandera = 'True'
    }
    else{
        this.$modalidad.data('select2').$selection.removeClass("nova-has-error");
    }
    if(this.$moneda.data('select2').val() == ""){
        this.$moneda.data('select2').$selection.addClass("nova-has-error");
        bandera = 'True'
    }
    else{
        this.$moneda.data('select2').$selection.removeClass("nova-has-error");
    }
    if(this.$lugar.val() == ""){
        this.$lugar.addClass("nova-has-error");
        bandera = 'True'
    }
    else{
        this.$lugar.removeClass("nova-has-error");
    }
    if(this.$costo.val() == ""){
        this.$costo.addClass("nova-has-error");
        bandera = 'True'
    }
    else{
        this.$costo.removeClass("nova-has-error");
    }
    if(this.$duracion.val() == ""){
        this.$duracion.addClass("nova-has-error");
        bandera = 'True'
    }
    else{
        this.$duracion.removeClass("nova-has-error");
    }
    if(this.$observaciones.val() == ""){
        this.$observaciones.addClass("nova-has-error");
        bandera = 'True'
    }
    else{
        this.$observaciones.removeClass("nova-has-error");
    }
    if(this.$fecha_inicio.val() == ""){
        this.$fecha_inicio.addClass("nova-has-error");
        bandera = 'True'
    }
    else{
        this.$fecha_inicio.removeClass("nova-has-error");
    }
    if(this.$fecha_fin.val() == ""){
        this.$fecha_fin.addClass("nova-has-error");
        bandera = 'True'
    }
    else{
        this.$fecha_fin.removeClass("nova-has-error");
    }
    if(this.$archivo_cap.val() == ""){
        this.$archivo_cap.addClass("nova-has-error");
        bandera = 'True'
    }
    else{
        this.$archivo_cap.removeClass("nova-has-error");
    }
    if (bandera == 'True' ){
        this.$formulario_cap.append('<div class="alert alert-danger nova-margin" id="id_error"><span class="icon mdi mdi-close-circle-o"></span><strong>Completa los campos correspondientes</strong></div>')
    }
    else{
        $('#id_error').detach()
    }
    return bandera
}
PopupCapacitacion.prototype.validar_Archivo = function (_archivo) {
        extension = (_archivo.substring(_archivo.lastIndexOf("."))).toLowerCase();
        return extension
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
          url: url_documento_capacitacion_grid + _id +"/",
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

    this.$contenido.append("<a href='"+ _url_archivo +"' target='_blank'><img src='/static/images/decoradores/PDF.jpg' width='30px' height='30px'></img> Archivo No."+_numero+" : "+_nombre_documento+" </a><br>")
}
PopupInformacionCapacitacion.prototype.hidden_Modal = function (e) {

     e.data.$modal_informacion.modal('hide')
}

/*-----------------------------------------------*\
                        OBJETO: FILTRO ARCHIVOS
\*-----------------------------------------------*/

function Personalizacion(){
    this.$personales = $('#personales')
    this.$li_personales = $('#per')
    this.$capacitaciones = $('#capacitaciones')
    this.$li_capacitaciones = $('#cap')
    this.init_Events()
}
Personalizacion.prototype.init_Components = function(){
}
Personalizacion.prototype.init_Events = function(){

    this.$personales.on("click", this , this.mostrar_Personales)
    this.$li_personales.on("click", this , this.mostrar_Personales)
    this.$capacitaciones.on("click", this , this.mostrar_Capacitaciones)
    this.$li_capacitaciones.on("click", this , this.mostrar_Capacitaciones)
}
Personalizacion.prototype.mostrar_Personales = function(e){

    e.data.$capacitaciones.removeClass('nova-active-tab')
    e.data.$li_capacitaciones.removeClass('active')
    e.data.$personales.addClass('nova-active-tab')
    e.data.$li_personales.addClass('active')
    tarjeta_resultados.popup_cap.$boton_nuevo.addClass('hidden')
    tarjeta_resultados.popup.$boton_nuevo.removeClass('hidden')
    $("#grid_resultados").empty()
    tarjeta_resultados.grid_personal.init()
}
Personalizacion.prototype.mostrar_Capacitaciones = function(e){

    e.data.$personales.removeClass('nova-active-tab')
    e.data.$li_personales.removeClass('active')
    e.data.$capacitaciones.addClass('nova-active-tab')
    e.data.$li_capacitaciones.addClass('active')
    tarjeta_resultados.popup.$boton_nuevo.addClass('hidden')
    tarjeta_resultados.popup_cap.$boton_nuevo.removeClass('hidden')
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
    this.init_Events()
}
GridPersonal.prototype.init = function () {

    // Definicion del pais, formato modena, etc..
    kendo.culture("es-MX")

    // Se inicializa la fuente da datos (datasource)
    this.kfuente_datos = new kendo.data.DataSource(this.get_DataSourceConfig())

    // Se inicializa y configura el grid:
    this.kgrid = this.$id.kendoGrid(this.get_Configuracion())
}
GridPersonal.prototype.init_Events = function () {

    this.$id.on('click', 'a', this.eliminar_Registro)
}
GridPersonal.prototype.get_DataSourceConfig = function () {

    return {
            serverPaging: true,
            pageSize: 10,
            transport: {
                    read: {
                            url:  url_documento_personal_grid, 
                            type: "GET",
                            dataType: "json",
                    },
                    parameterMap: function (data, action) {
                            if (action === "read"){
                                    return  filtro.get_Values(data.page)
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
            tipo_documento : { type: "string" },
            agrupador : { type: "string" },
            vigencia_inicio : { type: "string" },
            vigencia_fin : { type: "string" },
            fecha : { type: "date"},
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
            { field: "pk",
                title: " ",
                width: "50px",
                template: '<a class="btn nova-btn btn-default nova-btn-delete" id="#=pk#" data-event="eliminar-personal"> <i class="icon icon-left icon mdi mdi-delete nova-white"></i></a>',
            },
            { field: "relacion", 
                title: "Archivo", 
                width:"60px" ,
                template: '<a class="btn btn-default nova-url" href="\\#modal_ver_informacion" data-toggle="modal" data-event="ver-personal" id="#=pk#"><i class="icon icon-left icon mdi mdi-file icon-black"></i></a>',
            },
            { field: "tipo_documento", title: "Tipo documento", width:"200px"},
            { field: "agrupador", title: "Agrupador", width:"100px"},
            { field: "vigencia_inicio",title: "Vigencia inicio", width:"100px"},
            { field: "vigencia_fin", title: "Vigencia fin", width:"100px" },
            { field: "created_by", title: "Creado por", width:"150px" },
            { field: "created_date", title: "Fecha de creación", width:"150px", format: "{0:dd/MM/yyyy}" },

    ]
}
GridPersonal.prototype.buscar = function() {

    this.kfuente_datos.page(1)
}
GridPersonal.prototype.aplicar_Estilos = function (e) {

    e.sender.tbody.find("[data-event='eliminar-personal']").each(function(idx, element){

      $(this).on("click", function(){
         tarjeta_resultados.grid_personal.consultar_Registro(this.id)
      })
    })

    e.sender.tbody.find("[data-event='ver-personal']").each(function(idx, element){
      $(this).on("click", function(){
        tarjeta_resultados.popup_informacion_personal.$contenido.empty()
        tarjeta_resultados.popup_informacion_personal.consultar_Registro(this.id)
      })
    })

    columns = e.sender.columns
    dataItems = e.sender.dataSource.view()
    fecha_hoy = new Date()
    fecha_por_vencer = tarjeta_resultados.grid_personal.sumar_Dias(new Date(), 90)

    for (var j = 0; j < dataItems.length; j++) {
        fecha_vencimiento = dataItems[j].get("vigencia_fin")
        fecha = tarjeta_resultados.grid_personal.convertir_Fecha(fecha_vencimiento)
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
GridPersonal.prototype.consultar_Registro = function (_id_documento) {

    $.ajax({
             url: url_documento_personal_grid +_id_documento+"/",
             method: "GET",
             headers: { "X-CSRFToken": appnova.galletita },
             success: function (_response) {
                    url = _response.relacion
                    for (var i = 0; i < url.length; i++) {
                        id_archivo = url[i].split("/")[5]
                        tarjeta_resultados.grid_personal.eliminar_Archivo(id_archivo,_id_documento)
                    }
             },
             error: function (_response) {
                    alertify.error("No se ha podido realizar la consulta")
             }
    })
}
GridPersonal.prototype.eliminar_Archivo = function (_id_archivo, _id_personal) {
    alertify.confirm(
      'Eliminar Registro',
      '¿Desea Eliminar este registro?.',
      function () {
            var promesa = $.ajax({
                                     url: url_archivo +_id_archivo+"/",
                                     method: "DELETE",
                                     headers: { "X-CSRFToken": appnova.galletita },
                                     success: function (_response) {

                                     },
                                     error: function (_response) {
                                            alertify.error("No se ha podido eliminar el registro")
                                     }
                                })
            promesa.then(function(){
                    $.ajax({
                     url: url_documento_personal +_id_personal+"/",
                     method: "DELETE",
                     headers: { "X-CSRFToken": appnova.galletita },
                     success: function (_response) {
                            alertify.success('Se elimino documento personal')
                            $("#grid_resultados").empty()
                            tarjeta_resultados.grid_personal.init()

                     },
                     error: function (_response) {
                            alertify.error("No se ha podido eliminar el registro")
                     }
                })
            })
          },
      null
   )
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
                            url: url_documento_capacitacion_grid,
                            type: "GET",
                            dataType: "json",
                    },
                    parameterMap: function (data, action) {
                            if (action === "read"){
                                    return  filtro.get_ValuesCap(data.page)
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
            pk: { type: "integer" },
            relacion : { type: "string"},
            // archivo : { type: "string" },
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
            { field: "pk", 
                title: " ", 
                width:"50px" ,
                template: '<a class="btn nova-btn btn-default nova-btn-delete" id="#=pk#" data-event="eliminar-capacitacion"> <i class="icon icon-left icon mdi mdi-delete nova-white"></i></a>'
            },
            { field: "relacion", 
                title: "Archivo", 
                width:"60px" ,
                template: '<a class="btn btn-default nova-url" href="\\#modal_ver_informacion" data-toggle="modal" data-event="ver-capacitacion" id="#=pk#"><i class="icon icon-left icon mdi mdi-file icon-black"></i></a>',
            },
            { field: "curso", title: "Curso", width:"200px" },
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

    e.sender.tbody.find("[data-event='eliminar-capacitacion']").each(function(idx, element){
        $(this).on("click", function(){
            grid_capacitacion.consultar_Registro(this.id)
        })
    })

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
GridCapacitacion.prototype.consultar_Registro = function (_id_documento) {

    $.ajax({
        url: url_documento_capacitacion_grid +_id_documento+"/",
        method: "GET",
        headers: { "X-CSRFToken": appnova.galletita },
        success: function (_response) {
                url = _response.relacion
                for (var i = 0; i < url.length; i++) {
                    id_archivo = url[i].split("/")[5]
                    grid_capacitacion.eliminar_Archivo(id_archivo,_id_documento)
                }
        },
        error: function (_response) {
                alertify.error("No se ha podido realizar la consulta")
        }
    })
}
GridCapacitacion.prototype.eliminar_Archivo = function (_id_archivo, _id_capacitacion) {

    alertify.confirm(
      'Eliminar Registro',
      '¿Desea Eliminar este registro?.',
      function () {
            var promesa = $.ajax({
                                 url: url_archivo +_id_archivo+"/",
                                 method: "DELETE",
                                 headers: { "X-CSRFToken": appnova.galletita },
                                 success: function (_response) {

                                 },
                                 error: function (_response) {
                                        alertify.error("No se ha podido eliminar el registro1")
                                 }
                            })
            promesa.then(function(){
                    $.ajax({
                     url: url_documento_capacitacion +_id_capacitacion+"/",
                     method: "DELETE",
                     headers: { "X-CSRFToken": appnova.galletita },
                     success: function (_response) {
                            alertify.success('Se elimino capacitacion')
                            $("#grid_resultados").empty()
                            grid_capacitacion.init()

                     },
                     error: function (_response) {
                            alertify.error("No se ha podido eliminar el registro2")
                     }
                })
            })
        },
      null
   )
}
