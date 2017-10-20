/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

var url_curso = window.location.origin + "/api-capitalhumano/curso/"
var url_profile =  window.location.origin + "/api-seguridad/profile/"

// OBJS
var popup_cap = null
var popup_curso = null
var tarjeta_resultados = null

/*-----------------------------------------------*\
                        LOAD
\*-----------------------------------------------*/

$(document).ready(function () {
    tarjeta_resultados = new TarjetaResultados()

})

/*-----------------------------------------------*\
        OBJETO: Tarjeta Resultados
\*-----------------------------------------------*/

function TarjetaResultados(){

    this.popup_curso = new PopupCurso()
    this.popup_cap = new PopupCapacitacion()
}


/*-----------------------------------------------*\
        OBJETO: PopupCapacitacion
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
}
PopupCapacitacion.prototype.init_Components = function () {

    this.$agrupadorcap.select2(appnova.get_ConfigSelect2())
    this.$proveedor.select2(appnova.get_ConfigSelect2())
    this.$area.select2(appnova.get_ConfigSelect2())
    this.$curso.select2(appnova.get_ConfigSelect2())
    this.$modalidad.select2(appnova.get_ConfigSelect2())
    this.$moneda.select2(appnova.get_ConfigSelect2())
    this.$fecha_inicio_input.datepicker(this.get_ConfDatePicker())
    this.$fecha_fin_input.datepicker(this.get_ConfDatePicker())
}
PopupCapacitacion.prototype.get_ConfDatePicker = function () {

   return {

      format: 'dd/mm/yyyy',
      autoclose: true,
      language: 'es',
      useCurrent: false,
      showOnFocus: false,
      keyboardNavigation: false,
   }
}


/*-----------------------------------------------*\
            OBJETO: Pop up nuevo curso
\*-----------------------------------------------*/

function PopupCurso () {
    this.$modal_nuevo = $('#modal_nuevo')
    this.$permiso = $('#id_permiso')
    this.$nombre_curso = $('#id_nombre_curso')
    this.$vencimiento = $('#id_vencimiento')
    this.$created_by = $('#id_usuario')
    this.$boton_guardar = $('#id_boton_guardar')
    this.$boton_cancelar = $('#id_boton_cancelar')

    this.init_Components()
    this.init_Events()
}
PopupCurso.prototype.init_Components = function () {

    this.$vencimiento.select2(appnova.get_ConfigSelect2())
    this.limpiar_Formulario()
}
PopupCurso.prototype.init_Events = function () {

    this.$boton_guardar.on('click', this, this.click_BotonGuardar)
    this.$boton_cancelar.on('click', this, this.click_BotonCancelar)
}
PopupCurso.prototype.click_BotonCancelar = function (e){
    tarjeta_resultados.popup_curso.limpiar_Formulario()
    tarjeta_resultados.popup_curso.clear_Estilos()
}
PopupCurso.prototype.click_BotonGuardar = function (e) {
    if (e.data.$permiso.val() == 'True'){
        if (tarjeta_resultados.popup_curso.validar_Campos() != 'True'){
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
                        alertify.success('Curso agregado exitosamente')
                        tarjeta_resultados.popup_curso.actualizar_Select()
                        tarjeta_resultados.popup_curso.hidden_Modal()
                     },
                     error: function (_response) {
                            alertify.error("Ocurrio error al guardar")
                     }
                })
        }
    }else{
        alertify.error('No cuenta con los permisos para agregar nuevos cursos')
    }
}
PopupCurso.prototype.actualizar_Select = function () {

        $.ajax({
           url: url_curso,
           method: "GET",
           context: this,
           success: function (_response) {
              var data = []
              data.push({id:"", text:"--------------" })
              for (var i = 0; i < _response.length; i++) {
                data.push({id:_response[i].pk, text:_response[i].nombre_curso })
              }
              tarjeta_resultados.popup_cap.$curso.select2('destroy').empty().select2({data:data})

           },
           error: function (_response) {

              alertify.error("Ocurrio error al cargar datos")
           }
        })
}
PopupCurso.prototype.hidden_Modal = function () {

     this.$modal_nuevo.modal('hide')
     this.limpiar_Formulario()
}
PopupCurso.prototype.validar_Campos = function () {
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
PopupCurso.prototype.limpiar_Formulario = function () {
    this.$nombre_curso.val("")
    this.$vencimiento.val(1).trigger('change')
}
PopupCurso.prototype.clear_Estilos = function () {
   this.$vencimiento.data('select2').$selection.removeClass("nova-has-error")
   this.$nombre_curso.removeClass("nova-has-error")
   $('#id_error').detach()
}