/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:api-
//var url_empleados_bypage = window.location.origin + "/api-ebs/viewempleadosfull_bypage/"

// OBJS
var popup_hallazgo = null
var popup_filtros = null
var popup_analisis = null
var popup_acciones = null
var popup_nueva_actividad = null //popup_nueva_actividad
var popup_evaluacion_plan = null //popup_evaluacion_plan
var toolbar = null
var grid = null
var tarjeta_resultados = null

  var topPosition = $('.nova-slider-menu').offset().top - 60;
  var win = $(window);
  var floatingDiv = $('.nova-slider-menu');
  var floatingDivWidth = $('.nova-slider').outerWidth();
  

  win.scroll(function() {
   var floatingDivWidth = $('.nova-slider').outerWidth();
   $("#lista-acciones").css("width",floatingDivWidth)

    if (window.matchMedia('(min-width: 992px)').matches) {
      if ((win.scrollTop() > topPosition) ) {
        floatingDiv.addClass('sticky');
        
        

      } else {
        floatingDiv.removeClass('sticky');
        // floatingDiv.removeClass('abs');
        
      }
    }
   

  })
win.resize(function() {

   var floatingDivWidth = $('.nova-slider').outerWidth();
   $("#lista-acciones").css("width",floatingDivWidth)
   
      
   if (window.matchMedia('(max-width: 992px)').matches) {
      floatingDiv.addClass('nova-slider-menu-fixed');
   }
   else{
      floatingDiv.removeClass('nova-slider-menu-fixed');

   }
   
})

/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {
    $('#id_lista>a[href*=\\#]').click(function() {
      
      var id_lista = $("#id_lista").find('.list-group-item.active')
      id_lista.removeClass('active')
      //console.log(id_lista)
      $(this).addClass('active')

    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
        &&location.hostname == this.hostname) {
            var $target = $(this.hash);
            
            $target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');
            if ($target.length) {                              
                var targetOffset = $target.offset().top;
                
                $('html,body').animate({scrollTop: targetOffset-60}, 1000);
                return false;
            }
        }
    });

    tarjeta_resultados = new TarjetaResultados()
})

/*-----------------------------------------------*\
            OBJETO: Tarjeta resultados
\*-----------------------------------------------*/

function TarjetaResultados() {

    toolbar = new ToolBar()
    grid = new Grid()
}

/*-----------------------------------------------*\
            OBJETO: Toolbar
\*-----------------------------------------------*/

function ToolBar() {

    popup_hallazgo = new PopupHallazgo()
    popup_filtros = new PopupFiltros()
    popup_nueva_actividad = new PopupNuevaActividad() //popup_nueva_actividad
    popup_evaluacion_plan = new PopupEvaluacionPlan() //popup_evaluacion_plan
}

/*-----------------------------------------------*\
            OBJETO: Grid
\*-----------------------------------------------*/

function Grid() {

    popup_analisis = new PopupAnalisis()
    popup_acciones = new PopupAcciones()
}

/*-----------------------------------------------*\
            OBJETO: popup nuevo
\*-----------------------------------------------*/

function PopupHallazgo(){

    this.$id_subproceso = $('#id_subproceso')
    this.$id_clasificacion_hallazgo = $('#id_clasificacion_hallazgo')
    this.$id_requisito_referencia = $('#id_requisito_referencia')
    this.$id_requisito_adicional = $('#id_requisito_adicional')
    this.$id_tipo_hallazgo = $('#id_tipo_hallazgo')
    this.init_Components()
}
PopupHallazgo.prototype.init_Components = function () {

    this.$id_subproceso.select2(appnova.get_ConfigSelect2())
    this.$id_clasificacion_hallazgo.select2(appnova.get_ConfigSelect2())
    this.$id_requisito_referencia.multiselect(this.get_ConfMultiSelect())
    this.$id_requisito_adicional.select2(appnova.get_ConfigSelect2())
    this.$id_tipo_hallazgo.select2(appnova.get_ConfigSelect2())
}
PopupHallazgo.prototype.get_ConfMultiSelect = function () {

    return{
        enableFiltering: true,
        buttonWidth: '100%',
        numberDisplayed: 2,
        maxHeight: 150,
        nonSelectedText: "Sin Selección",
        allSelectedText: "Todo Seleccionado",
        nSelectedText: "Seleccionados",
        filterPlaceholder: "Buscar",
    }
}

/*-----------------------------------------------*\
            OBJETO: popup filtros
\*-----------------------------------------------*/

function PopupFiltros(){

    this.$id_proceso = $('#id_proceso')
    this.$id_zona = $('#id_zona')
    this.$id_contrato = $('#id_contrato')
    this.$id_hallazgo = $('#id_hallazgo')
    this.$id_estado = $('#id_estado')
    this.$id_tipo_hallazgo_filtro = $('#id_tipo_hallazgo_filtro')
    this.$id_boton_buscar = $('#id_boton_buscar')
    this.$id_boton_limpiar = $('#d_boton_limpiar')
    this.init_Components()
    this.init_Events()
}
PopupFiltros.prototype.init_Components = function () {

    this.$id_proceso.select2(appnova.get_ConfigSelect2())
    this.$id_zona.select2(appnova.get_ConfigSelect2())
    this.$id_contrato.select2(appnova.get_ConfigSelect2())
    this.$id_estado.select2(appnova.get_ConfigSelect2())
    this.$id_tipo_hallazgo_filtro.select2(appnova.get_ConfigSelect2())
}
PopupFiltros.prototype.init_Events = function () {

    this.$id_boton_buscar.on("click", this, this.click_BotonBuscar)
    this.$id_boton_limpiar.on("click", this, this.click_BotonLimpiar)
}

/*-----------------------------------------------*\
            OBJETO: popup acciones
\*-----------------------------------------------*/

function PopupAcciones () {
 
    this.$id_tarjeta_acciones = $('#id_tarjeta_acciones')
    this.$id_boton_evaluacion_eficacia = $('#id_boton_evaluacion_eficacia')
    this.$id_boton_editar_accion = $('#id_boton_editar_accion')
    this.init_Events()
}
PopupAcciones.prototype.init_Events = function () {

    this.$id_boton_editar_accion.on("click", this, this.click_Boton_Editar )
    this.$id_boton_evaluacion_eficacia.on("click", this, this.click_BotonEvaluacion)
}
PopupAcciones.prototype.click_Boton_Editar = function (e) {

    e.preventDefault()
    e.data.$id_tarjeta_acciones.modal('hide')
}
PopupAcciones.prototype.click_BotonEvaluacion = function (e) {

    e.preventDefault()
    e.data.$id_tarjeta_acciones.modal('hide')
}

/*-----------------------------------------------*\
            OBJETO: popup analisis
\*-----------------------------------------------*/

function PopupAnalisis() {

    this.$id_metodologia = $('#id_metodologia')
    this.$id_causas = $('#id_causas')
    this.$id_imagen_analisis = $('#id_imagen_analisis')
    this.init_Components()
}
PopupAnalisis.prototype.init_Components = function () {

    this.$id_metodologia.select2(appnova.get_ConfigSelect2())
    this.$id_causas.wysihtml5(appnova.get_ConfWysi())
    this.$id_imagen_analisis.fileinput(this.get_ConfigFileInput())
}
PopupAnalisis.prototype.get_ConfigFileInput = function () {
   return {
             uploadUrl: "una/url/donde/se/subira/",
             uploadAsync: false,
             minFileCount: 2,
             maxFileCount: 5,
             overwriteInitial: false,
             language:"es",
             initialPreview: [
                 // IMAGE DATA
                 "/static/images/referenciavisual/documento.jpg",
                 "/static/images/referenciavisual/1.jpg",
                 "/static/images/referenciavisual/2.jpg",
                 "/static/images/referenciavisual/3.jpg",
             ],
             initialPreviewAsData: true, // identify if you are sending preview data only and not the raw markup
             initialPreviewFileType: 'image', // image is the default and can be overridden in config below
             initialPreviewConfig: [
               {  caption: "Documento.jpg", size: 827000, url: "/file-upload-batch/2", key: 1  },
               {  caption: "Documento.jpg", size: 827000, url: "/file-upload-batch/2", key: 2  },
               {  caption: "Documento.jpg", size: 827000, url: "/file-upload-batch/2", key: 3  },
               {  caption: "Documento.jpg", size: 827000, url: "/file-upload-batch/2", key: 4  },
             ],
             purifyHtml: true, // this by default purifies HTML data for preview
      }
         
}

/*-----------------------------------------------*\
            OBJETO: popup analisis
\*-----------------------------------------------*/

function PopupNuevaActividad() {
   this.$id_actividad = $('#id_actividad')
   this.$id_responsable = $('#id_responsable')
   this.$id_fecha_programada = $('#id_fecha_programada')
   this.$id_fecha_programada_input = $('#id_fecha_programada_input')
   this.init_Components()
}
PopupNuevaActividad.prototype.init_Components = function () {

    this.$id_actividad.wysihtml5(appnova.get_ConfWysi())
    this.$id_responsable.select2(appnova.get_ConfigSelect2())
    this.$id_fecha_programada.mask(
        "9999-99-99",
        {
            placeholder:"aaaa/mm/dd"
        }
    )
    this.$id_fecha_programada_input.datetimepicker(this.get_DateTimePickerConfig())
}
PopupNuevaActividad.prototype.get_DateTimePickerConfig = function () {
    return {
        autoclose: true,
        orientation: "bottom left",
        minViewMode: 2,
        format: "yyyy-mm-dd",
    }
}

/*-----------------------------------------------*\
            OBJETO: popup evaluacion plan
\*-----------------------------------------------*/

function PopupEvaluacionPlan () {

    this.$id_plan_resultado = $('#id_plan_resultado')
    this.$id_causas_evaluacion = $('#id_causas_evaluacion')
    this.$id_fecha_seguimiento = $('#id_fecha_seguimiento')
    this.$id_fecha_seguimiento_input = $('#id_fecha_seguimiento_input')
    this.$id_imagen = $('#id_imagen')
    this.init_Components()
}
PopupEvaluacionPlan.prototype.init_Components = function () {

    this.$id_plan_resultado.select2(appnova.get_ConfigSelect2())
    this.$id_causas_evaluacion.wysihtml5(appnova.get_ConfWysi())
    this.$id_fecha_seguimiento.mask(
        "9999-99-99",
        {
            placeholder:"aaaa/mm/dd"
        }
    )
    this.$id_fecha_seguimiento_input.datetimepicker(this.get_DateTimePickerConfig())
    this.$id_imagen.each(function(){
        var $input   = $( this ),
            $label   = $input.next( 'label' ),
            labelVal = $label.html();

        $input.on( 'change', function( e )
        {
            var fileName = '';

            if( this.files && this.files.length > 1 )
              fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
            else if( e.target.value )
              fileName = e.target.value.split( '\\' ).pop();

            if( fileName )
              $label.find( 'span' ).html( fileName );
            else
              $label.html( labelVal );
        });
        }
    )
}
PopupEvaluacionPlan.prototype.get_DateTimePickerConfig = function () {
    return {
        autoclose: true,
        orientation: "bottom left",
        minViewMode: 2,
        format: "yyyy-mm-dd",
    }
}