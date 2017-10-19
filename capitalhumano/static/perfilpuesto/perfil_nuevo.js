/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:
var url_perfil_puestocargo_bypage = window.location.origin + "/api-capitalhumano/perfilpuestoacargo_bypage/"
var url_perfil_puestocargo = window.location.origin + "/api-capitalhumano/perfilpuestoacargo/"
var url_profile =  window.location.origin + "/api-seguridad/profile/"
var url_perfil_puesto = window.location.origin + "/api-capitalhumano/perfilpuestosdocumento/"
var url_perfil_puestodoc_bypage = window.location.origin + "/api-capitalhumano/perfilpuestosdoc_bypage/"
var url_perfil_competencia = window.location.origin + "/api-ebs/viewcompetencias/"
var url_perfil_competencia_doc = window.location.origin + "/api-capitalhumano/perfilcompetencias/"
var url_perfil_competencia_doc_bypage = window.location.origin + "/api-capitalhumano/perfilcompetencias_bypage/"
var url_perfil_indicadores= window.location.origin + "/api-capitalhumano/perfilindicadores/"
var url_perfil_indicadores_bypage = window.location.origin + "/api-capitalhumano/perfilindicadores_bypage/"


// OBJS
var formulario = null
var organigrama = null
var select_componente = null
var resultados_competencia = null
var resultados_indicadores = null
var popup = null
var popup_ind = null
var popup_com = null
var tarjeta_resultados = null
var resultados = null


/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {

    tarjeta_resultados = new TarjetaResultados()
    
    /*formulario = new Formulario()
    select_componente = new Componente()
    resultados = new TargetaResultados()
    popup = new PopupPerfil()
    resultados_competencia = new TargetaResultadosCompetencias()
    resultados_indicadores = new TargetaResultadosIndicadores()
    popup_com = new PopupPerfilCompetencia()
    popup_ind = new PopupPerfilIndicador()*/

})

/*-----------------------------------------------*\
                        OBJETO: Tarjeta Resultados
\*-----------------------------------------------*/

function TarjetaResultados(){

    this.formulario = new Formulario()
    this.select_componente = new Componente()
    this.resultados = new TargetaResultados()
    this.popup = new PopupPerfil()
    this.resultados_competencia = new TargetaResultadosCompetencias()
    this.resultados_indicadores = new TargetaResultadosIndicadores()
    this.popup_com = new PopupPerfilCompetencia()
    this.popup_ind = new PopupPerfilIndicador()
}

/*-----------------------------------------------*\
            OBJETO: Targeta filtros
\*-----------------------------------------------*/

function Componente(){
    this.$puesto = $('#id_desc_puesto')
    this.$reporta = $('#id_reporta')
    this.$objetivo = $('#id_objetivo')
    this.$funciones = $('#id_funciones')
    this.$responsabilidades = $('#id_responsabilidades')
    this.$posicion = $('#id_posicion')
    this.$numero_puesto = $('#id_numero_puesto')
    this.$id_doc_perfil = $('#id_doc_perfil')
    this.$formulario_perfil = $('#formulario_perfil')
  
    /*---------DETALLE-------*/
    this.$edad_minima = $('#id_edad_minima')
    this.$edad_maxima = $('#id_edad_maxima')
    this.$nivel_estudio = $('#id_nivel_estudio')
    this.$estado_civil = $('#id_estado_civil')
    this.$genero = $('#id_genero')
    this.$cambio_residencia = $('#cambio_residencia')
    this.$disponibilidad_viajar = $('#disponibilidad_viajar')
    this.$requerimentos = $('#id_requerimentos')
   
    this.$reportar = $('#id_reporta')
    this.$boton_guardar_perfil = $('#id_boton_guardar_perfil')
    this.$boton_guardar_perfil_detalle = $('#id_btguardar_perfil_detalle')
    this.$boton_cancelar_perfil = $('#id_boton_cancelar_perfil')

    this.init_Components()
    this.init_Events()

}  
Componente.prototype.init_Components = function(){
    this.$puesto.select2(this.get_ConfSelect2())  
    this.$nivel_estudio.select2(this.get_ConfSelect2())
    this.$estado_civil.select2(this.get_ConfSelect2())

}

Componente.prototype.get_ConfSelect2 = function () {
   return {
      width: '100%'
    }
}

Componente.prototype.get_Values = function (_page) {
    return {
        page: _page,
        id_puesto: this.$puesto.val(),
    }
}

Componente.prototype.get_Values3 = function (_page) {
    return {
        page: _page,
        cvepuesto: this.$puesto.val(),
    }
}

Componente.prototype.init_Events = function () {

   this.$boton_guardar_perfil.on('click', this, this.click_BotonGuardar)
   this.$boton_guardar_perfil_detalle.on('click', this, this.click_BotonGuardarDetalle)
   this.$boton_cancelar_perfil.on('click', this, this.click_BotonCancelarPerfil)
}

Componente.prototype.click_BotonGuardar = function (e) {

 var id_puestocargo= e.data.$puesto.val()
 var asig_puesto_clave = e.data.$puesto.val()

 if (tarjeta_resultados.select_componente.validar_Campos() != 'True'){
 var promesa = $.ajax({
         url: url_perfil_puesto,
         method: "POST",
         headers: { "X-CSRFToken": appnova.galletita },
         data: {
            'empleado_puesto_desc' : e.data.$puesto.val(),
            'asig_puesto_clave' : e.data.$puesto.val(), 
            'reporta' : e.data.$reporta.val(),
            'objetivo' :  e.data.$objetivo.val(),
            'funciones' :  e.data.$funciones.val(),
            'responsabilidades' :  e.data.$responsabilidades.val(),
            'reporte' :  e.data.$reportar.val(),
            'posicion' :  e.data.$posicion.val(),
            'puesto_acargo' :  'omitir',
            'edad_minima' :  e.data.$edad_minima.val(),
            'edad_maxima' :  e.data.$edad_maxima.val(),
            'nivel_estudio' :  e.data.$nivel_estudio.val(),
            'estado_civil' : e.data.$estado_civil.val(),
            'genero' :  e.data.$genero.val(),
            'cambio_residencia' :  e.data.$cambio_residencia.val(),
            'disponibilidad_viajar' : e.data.$disponibilidad_viajar.val(),
            'requerimentos' : '-',
            'areas_experiencia' : '-',
            'proposito' : '-',
         },
         success: function (_response) {
          id_doc_perfil = _response.pk
          var id_doc_perfil = id_doc_perfil
          $('#id_doc_perfil').val(id_doc_perfil)
          $('#numero_puesto').val(asig_puesto_clave)
          //var id_doc_perfilvar = $('#id_doc_perfil').val(id_doc_perfil)
          // alert(id_doc_perfilvar)
          // alert(id_doc_perfil)
          // console.log("primero_doc_perfil input")
           //alert(numero_puesto)
          console.log(id_doc_perfil)
          console.log(numero_puesto)

          alertify.success("Se ha guardado el Perfil general")
                  //popup.hidden_Modal()
                  //popup.actualizar_Grid()
         },
         error: function (_response) {
            alertify.error("Ocurrio error al guardar el Perfil")
         }
      })
 }
}

Componente.prototype.click_BotonGuardarDetalle = function (e) {

 var id_puestocargo= e.data.$puesto.val()
 var asig_puesto_clave = e.data.$puesto.val()
 var _pk = e.data.$id_doc_perfil.val()
 console.log(_pk)

 var promesa = $.ajax({
         url: url_perfil_puesto + _pk + "/",
         method: "PUT",
         headers: { "X-CSRFToken": appnova.galletita },
         data: {
            'empleado_puesto_desc' : e.data.$puesto.val(),
            'asig_puesto_clave' : e.data.$puesto.val(), 
            'reporta' : e.data.$reporta.val(),
            'objetivo' :  e.data.$objetivo.val(),
            'funciones' :  e.data.$funciones.val(),
            'responsabilidades' :  e.data.$responsabilidades.val(),
            'reporte' :  e.data.$reportar.val(),
            'posicion' :  e.data.$posicion.val(),
            'edad_minima' :  e.data.$edad_minima.val(),
            'edad_maxima' :  e.data.$edad_maxima.val(),
            'nivel_estudio' :  e.data.$nivel_estudio.val(),
            'estado_civil' : e.data.$estado_civil.val(),
            'genero' :  e.data.$genero.val(),
            'cambio_residencia' :  e.data.$cambio_residencia.val(),
            'disponibilidad_viajar' : e.data.$disponibilidad_viajar.val(),
            'requerimentos' : e.data.$requerimentos.val(),
            'puesto_acargo' :  'omitir',
            'areas_experiencia' : '-',
            'proposito' : '-',
         },
         success: function (_response) {
          id_doc_perfil = _response.pk

          var id_doc_perfil = id_doc_perfil
          $('#id_doc_perfil').val(id_doc_perfil)
          $('#numero_puesto').val(asig_puesto_clave)
          console.log(id_doc_perfil)
          console.log(numero_puesto)

          alertify.success("Se ha guardado el Perfil general")
                  popup.hidden_Modal()
                  popup.actualizar_Grid()
                  select_componente.limpiar_Formulario()
         },
         error: function (_response) {
            alertify.error("Ocurrio error al guardar")
         }
      })
}

Componente.prototype.limpiar_Formulario= function (e) {
    //this.$puesto.data('select2').val(0)
    //this.$reporta.data('select2').val(0)
    this.$objetivo.val("")
    this.$funciones.val("")
    this.$responsabilidades.val("")
    this.$reportar.val("")
    this.$posicion.val("")
    this.$edad_minima.val("")
    this.$edad_maxima.val("")
    this.$nivel_estudio.val("")
    this.$estado_civil.val("")
    this.$genero.val("")
    this.$cambio_residencia.val("")
    this.$disponibilidad_viajar.val("")
    this.$requerimentos.val("")
}

Componente.prototype.click_BotonCancelarPerfil= function (e) {
    e.data.$puesto.data('select2').val(0)
    e.data.$reporta.data('select2').val(0)
    e.data.$objetivo.val("")
    e.data.$funciones.val("")
    e.data.$responsabilidades.val("")
    tarjeta_resultados.select_componente.clear_Estilos()
}

Componente.prototype.validar_Campos = function () {
    bandera = 'False'

    if(this.$puesto.data('select2').val() == ""){
        this.$puesto.data('select2').$selection.addClass("nova-has-error");
        bandera = 'True'
    }
    else{
        this.$puesto.data('select2').$selection.removeClass("nova-has-error");
    }
    if(this.$reporta.data('select2').val() == ""){
        this.$reporta.data('select2').$selection.addClass("nova-has-error");
        bandera = 'True'
    }
    else{
        this.$reporta.data('select2').$selection.removeClass("nova-has-error");
    }
    if(this.$objetivo.val() == ""){
        this.$objetivo.addClass("nova-has-error");
        bandera = 'True'
    }
    else{
        this.$objetivo.removeClass("nova-has-error");
    }
    if(this.$funciones.val() == ""){
        this.$funciones.addClass("nova-has-error");
        bandera = 'True'
    }
    else{
        this.$funciones.removeClass("nova-has-error");
    }
    if (bandera == 'True' ){
        alertify.error("Completa los campos correspondientes")
    }
    else{
        $('#id_error1').detach()
    }
    return bandera
}
Componente.prototype.clear_Estilos = function () {

   this.$puesto.data('select2').$selection.removeClass("nova-has-error");
   this.$reporta.data('select2').$selection.removeClass("nova-has-error");
   this.$objetivo.removeClass("nova-has-error");
   this.$funciones.removeClass("nova-has-error");
   $('#id_error').detach()
}

/*-----------------------------------------------*\
            OBJETO: auditoria_general
\*-----------------------------------------------*/
function Formulario() {

    this.$id_objetivo = $("#id_objetivo")
    this.$funciones = $("#funciones")
    this.$id_objetivo2 = $("#id_objetivo2")
    this.$id_responsabilidades = $("#id_responsabilidades")
    this.$puesto = $('#id_desc_puesto')
    this.$reportar = $('#id_reporta')
    //this.$created_by = $('#created_by')
    this.grid = new Grid()
    this.gri2 = new Grid2()
    this.gri3 = new Grid3()
    this.init_Components()
    this.init_Events()
}

Formulario.prototype.init_Components = function () {
  
    //this.$desc_puesto.select2()
    this.$puesto.select2(this.get_ConfSelect2())
    this.$reportar.select2(this.get_ConfSelect2())
    
    //this.$id_objetivo.wysihtml5(this.get_ConfWysi())
    //this.$funciones.wysihtml5(this.get_ConfWysi())
    // this.$id_objetivo2.wysihtml5(this.get_ConfWysi())
    // this.$id_responsabilidades.wysihtml5(this.get_ConfWysi())
    // this.$id_reporte.wysihtml5(this.get_ConfWysi())
    // this.$id_asig_puesto_clave.select2(this.get_ConfSelect2())
    
}

Formulario.prototype.get_ConfSelect2 = function () {
   return {
      width: '100%'
   }
}

// Formulario.prototype.get_ConfWysi = function () {
//     return {
//         toolbar: {
//             "font-styles": true,
//             "emphasis": true,
//             "lists": true,
//             "html": false,
//             "link": false,
//             "image": false,
//             "color": false,
//             "blockquote": false,
//         }
//     }
// }

Formulario.prototype.init_Events = function () {

    this.$puesto.on("change", this, this.escoger_puestosacargo)

}

Formulario.prototype.escoger_puestosacargo = function (e) {
    console.log(tarjeta_resultados.select_componente.$puesto.val())
    // Consultar el API con el numero del empleado.
    //var id_puesto = e.data.$puesto.val()
    var id_puesto2 = tarjeta_resultados.select_componente.$puesto.val()

    //$("#numero_puesto").val() = e.data.$puesto.val()
    //select_componente.$numero_puesto.val() = e.data.$puesto.val()
    //this.$numero_empleado = e.data.$puesto.val()
    //alert(id_puesto)
    $('#numero_puesto').val(id_puesto2)
    var no_puesto = $('#numero_puesto').val(id_puesto2)

   // Consultar el API con el numero del empleado.
    var num_empleado = id_puesto2
    //var num_empleado = 8

    var url = url_perfil_puestocargo_bypage + "?id_puesto=" + num_empleado

    $.ajax({
            url: url_perfil_puestocargo_bypage,
            data: {
              id_puesto : num_empleado
            },
            dataType: "json",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            context: this,
            success: function (response) {
              cont = 0
              for (var i = 0; i < response.length; i++) {
                cont+=1
              }

              if (cont == 0 && no_puesto != ''){
                //$("#grid_resultados").empty()
                //grid = new Grid()
                tarjeta_resultados.resultados.grid.buscar()
              }
              else{
                 alertify.error("No se ha seleccionado el puesto")
              }
              
            },
            error: function (response) {
                         alertify.error("Ocurrio error al consultar")
                         //alert("Ocurrio error al consultar ")
                  }
    })

    $.ajax({
            url: url_perfil_competencia_doc_bypage,
            data: {
              id_puesto : num_empleado
            },
            dataType: "json",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            context: this,
            success: function (response) {
              cont = 0
              for (var i = 0; i < response.length; i++) {
                cont+=1
              }

              if (cont == 0 && no_puesto != ''){
                //$("#grid_resultados").empty()
                //grid = new Grid()
                tarjeta_resultados.resultados_competencia.grid2.buscar()
              }
              else{
                 alertify.error("No se ha seleccionado el puesto en general")
              }
              
            },
            error: function (response) {
                         alertify.error("Ocurrio error al consultar competencias")
                        // alert("Ocurrio error al consultar competencias")
                  }
    })

    $.ajax({
            url: url_perfil_indicadores_bypage,
            data: {
              puesto : num_empleado
            },
            dataType: "json",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            context: this,
            success: function (response) {
              cont = 0
              for (var i = 0; i < response.length; i++) {
                cont+=1
              }

              if (cont == 0 && no_puesto != ''){
                //$("#grid_resultados").empty()
                //grid = new Grid()
                tarjeta_resultados.resultados_indicadores.grid3.buscar()
              }
              else{
                 alertify.error("No se ha seleccionado el puesto en general")
              }
              
            },
            error: function (response) {
                         alertify.error("Ocurrio error al consultar competencias")
                        // alert("Ocurrio error al consultar competencias")
                  }
    })
}

/*-----------------------------------------------*\
            OBJETO: Targeta Resultados
\*-----------------------------------------------*/

function TargetaResultados () {

    this.grid = new Grid()
    //this.toolbar = new Toolbar()
}

/*-----------------------------------------------*\
            OBJETO: Grid
\*-----------------------------------------------*/

function Grid() {

    this.$id = $('#grid_resultados')
    this.kfuente_datos = null
    this.kgrid = null

    this.$id2 = $('#grid_resultados_competencias')
    this.kfuente_datos2 = null
    this.kgrid2 = null

    this.$id3 = $('#grid_resultados_indicadores')
    this.kfuente_datos3 = null
    this.kgrid3 = null

    this.init_Components()
    this.init_Components2()
    this.init_Components3()

}

Grid.prototype.init_Components = function () {
    // Se inicializa la fuente da datos (datasource)
    this.kfuente_datos = new kendo.data.DataSource(this.get_DataSourceConfig())
    // Se inicializa y configura el grid:
    this.kgrid = this.$id.kendoGrid(this.get_Configuracion())    
}
Grid.prototype.init_Components2 = function () {
    // Se inicializa la fuente da datos (datasource)
    this.kfuente_datos2 = new kendo.data.DataSource(this.get_DataSourceConfig2())
    // Se inicializa y configura el grid:
    this.kgrid2 = this.$id2.kendoGrid(this.get_Configuracion2())    
}
Grid.prototype.init_Components3 = function () {
    // Se inicializa la fuente da datos (datasource)
    this.kfuente_datos3 = new kendo.data.DataSource(this.get_DataSourceConfig3())
    // Se inicializa y configura el grid:
    this.kgrid3 = this.$id3.kendoGrid(this.get_Configuracion3())    
}

Grid.prototype.get_DataSourceConfig = function () {

console.log("paso grid 1")
    return {

        serverPaging: true,
        pageSize: 10,
        transport: {
            read: {

                url: url_perfil_puestocargo_bypage,
                type: "GET",
                dataType: "json",
            },
            parameterMap: function (data, action) {
                if (action === "read"){
                    return tarjeta_resultados.select_componente.get_Values(data.page)
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

Grid.prototype.get_DataSourceConfig2 = function () {

console.log("paso grid 122")
    return {
        serverPaging: true,
        pageSize: 10,
        transport: {
            read: {

                url: url_perfil_competencia_doc_bypage,
                type: "GET",
                dataType: "json",
            },
            parameterMap: function (data, action) {
                if (action === "read"){
                    return tarjeta_resultados.select_componente.get_Values(data.page)
                }
            }
        },
        schema: {
            data: "results",
            total: "count",
            model: {
                fields: this.get_Campos2()
            }
        },
        error: function (e) {
            alertify.error("Status: " + e.status + "; Error message: " + e.errorThrown)
        },
    } 
}

Grid.prototype.get_DataSourceConfig3 = function () {

console.log("paso grid indicadores")
    return {
        serverPaging: true,
        pageSize: 10,
        transport: {
            read: {
                url: url_perfil_indicadores_bypage,
                type: "GET",
                dataType: "json",
            },
            parameterMap: function (data, action) {
                if (action === "read"){
                    return tarjeta_resultados.select_componente.get_Values3(data.page)
                }
            }
        },
        schema: {
            data: "results",
            total: "count",
            model: {
                fields: this.get_Campos3()
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
        id_puesto : { type: "string" },
        id_puesto_cargo : { type: "string" },
        descripcion : { type: "string" },
    }
}

Grid.prototype.get_Configuracion = function () {
    return {
        autoBind: false,
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
        dataBound: this.aplicar_Estilos,
        //dataBound: this.set_Icons,
    }    
}

Grid.prototype.get_Columnas = function () {
    return [
        {  field: "pk",
           title: " ",
           width: "50px",
           template: '<a class="btn nova-btn btn-default nova-btn-delete" id="#=pk#" data-event="eliminar-puestocargo"> <i class="icon icon-left icon mdi mdi-delete nova-white"></i></a>',
        },
        { 
            field: "pk", 
            title: "Id", 
            width:"70px",
        },
        { field: "id_puesto", title: "Id Puesto", width:"70px" },
        { field: "id_puesto_cargo", title: "Puesto Cargo", width:"70px" },
        { field: "descripcion", title: "Descripcion", width:"300px" },
    ]
}

Grid.prototype.buscar = function() {
    
    this.kfuente_datos.page(1)
    this.kfuente_datos2.page(1)
    this.kfuente_datos3.page(1)
}

Grid.prototype.aplicar_Estilos = function (e) {

    e.sender.tbody.find("[data-event='eliminar-puestocargo']").each(function(idx, element){

      $(this).on("click", function(){
         tarjeta_resultados.resultados.grid.consultar_Registro(this.id)
      })
    })
}

Grid.prototype.consultar_Registro = function (_id_documento) {
  alertify.confirm(
      'Eliminar Registro',
      '¿Desea Eliminar este registro?.',
      function () {
            $.ajax({
                     url: url_perfil_puestocargo_bypage +_id_documento+"/",
                     method: "DELETE",
                     headers: { "X-CSRFToken": appnova.galletita },
                     success: function (_response) {
                            alertify.success('Se elimino el registro')
                            tarjeta_resultados.resultados.grid.buscar()
                            //$("#grid_resultados").empty()
                            //tarjeta_resultados.resultados.grid.init()
                            //tarjeta_resultados.formulario.escoger_puestosacargo()
                            
                     },
                     error: function (_response) {
                            alertify.error("No se ha podido eliminar el registro")
                     }
            })
      },
      null
   )
}

/*++++++++++++++++++++++++++++++++++++++++++++++++*/
Grid.prototype.get_Campos2 = function () {

    return {
        pk : { type: "number" },
        tipo_competencia : { type: "string" },
        id_puesto : { type: "string" },
        descripcion : { type: "string" },
        porcentaje : { type: "string" },
    }
}
Grid.prototype.get_Configuracion2 = function () {
    return {
        autoBind: false,
        dataSource: this.kfuente_datos2,
        columnMenu: true,
        groupable: false,
        sortable: false,
        editable: false,
        resizable: true,
        selectable: true,
        columns: this.get_Columnas2(),
        scrollable: true,
        pageable: true,
        noRecords: {
            template: "<div class='grid-empy'> No se encontraron registros </div>"
        },
        dataBound: this.aplicar_Estilos2,
    }    
}

Grid.prototype.get_Columnas2 = function () {

    return [
        {  field: "pk",
           title: " ",
           width: "50px",
           template: '<a class="btn nova-btn btn-default nova-btn-delete" id="#=pk#" data-event="eliminar-competencias"> <i class="icon icon-left icon mdi mdi-delete nova-white"></i></a>',
        },
        { 
            field: "pk", 
            title: "Id", 
            width:"70px",
        },
        { field: "tipo_competencia", title: "Tipo Competencia", width:"70px" },
        { field: "id_puesto", title: "Puesto", width:"80px" },
        { field: "descripcion", title: "Descripcion", width:"70px" },
        { field: "porcentaje", title: "Porcentaje", width:"300px" },

        
    ]
}

Grid.prototype.aplicar_Estilos2 = function (e) {

    e.sender.tbody.find("[data-event='eliminar-competencias']").each(function(idx, element){

      $(this).on("click", function(){
         tarjeta_resultados.resultados.grid.consultar_Registro2(this.id)
      })
    })
}

Grid.prototype.consultar_Registro2 = function (_id_documento) {
  alertify.confirm(
      'Eliminar Registro',
      '¿Desea Eliminar este registro?.',
      function () {
            $.ajax({
                     url: url_perfil_competencia_doc_bypage +_id_documento+"/",
                     method: "DELETE",
                     headers: { "X-CSRFToken": appnova.galletita },
                     success: function (_response) {
                            alertify.success('Se elimino el registro de Competencia.')
                            tarjeta_resultados.resultados.grid.buscar()
                            //$("#grid_resultados").empty()
                            //tarjeta_resultados.resultados.grid.init()
                            //tarjeta_resultados.formulario.escoger_puestosacargo()
                            
                     },
                     error: function (_response) {
                            alertify.error("No se ha podido eliminar el registro")
                     }
            })
      },
      null
   )
}



/*============================================*/

/*++++++++++++++++++++++++++++++++++++++++++++++++*/
Grid.prototype.get_Campos3 = function () {

    return {
        pk : { type: "number" },
        cvepuesto : { type: "string" },
        departamento : { type: "string" },
        puesto : { type: "string" },
        //linea : { type: "number" },
        objetivo : { type: "string" },
        unidad_medida : { type: "string" },
        descripcion_kpi : { type: "string" },
        porcentaje : { type: "number" },
        meta_minima : { type: "number" },
        meta_satisfactoria : { type: "number" },
        meta_excelente : { type: "number" },
    }
}
Grid.prototype.get_Configuracion3 = function () {
    return {
        autoBind: false,
        dataSource: this.kfuente_datos3,
        columnMenu: true,
        groupable: false,
        sortable: false,
        editable: false,
        resizable: true,
        selectable: true,
        columns: this.get_Columnas3(),
        scrollable: true,
        pageable: true,
        noRecords: {
            template: "<div class='grid-empy'> No se encontraron registros </div>"
        },
        dataBound: this.aplicar_Estilos3,
    }    
}

Grid.prototype.get_Columnas3 = function () {

    return [
        {  field: "pk",
           title: " ",
           width: "50px",
           template: '<a class="btn nova-btn btn-default nova-btn-delete" id="#=pk#" data-event="eliminar-indicador"> <i class="icon icon-left icon mdi mdi-delete nova-white"></i></a>',
        },
        { 
            field: "pk", 
            title: "Id", 
            width:"70px",
        },
        { field: "cvepuesto", title: "Clave Puesto", width:"70px" },
        { field: "departamento", title: "Departamento", width:"80px" },
        { field: "puesto", title: "Puesto", width:"70px" },
        //{ field: "linea", title: "Linea", width:"300px" },
        { field: "objetivo", title: "Objetivo", width:"70px" },
        { field: "unidad_medida", title: "Unidad Medida", width:"80px" },
        { field: "descripcion_kpi", title: "Descripcion", width:"70px" },
        { field: "porcentaje", title: "porcentaje", width:"70px" },
        { field: "meta_minima", title: "Meta Minima", width:"70px" },
        { field: "meta_satisfactoria", title: "Meta Satisfactoria", width:"70px" },
        { field: "meta_excelente", title: "Meta Excelente", width:"70px" },
        
    ]
}

Grid.prototype.aplicar_Estilos3 = function (e) {

    e.sender.tbody.find("[data-event='eliminar-indicador']").each(function(idx, element){

      $(this).on("click", function(){
         tarjeta_resultados.resultados.grid.consultar_Registro_Indicador(this.id)
      })
    })
}

Grid.prototype.consultar_Registro_Indicador = function (_id_documento) {
  alertify.confirm(
      'Eliminar Registro',
      '¿Desea Eliminar este registro?.',
      function () {
            $.ajax({
                     url: url_perfil_indicadores_bypage +_id_documento+"/",
                     method: "DELETE",
                     headers: { "X-CSRFToken": appnova.galletita },
                     success: function (_response) {
                            alertify.success('Se elimino el Indicador seleccionado')
                            tarjeta_resultados.resultados.grid.buscar()
                            //$("#grid_resultados").empty()
                            //tarjeta_resultados.resultados.grid.init()
                            //tarjeta_resultados.formulario.escoger_puestosacargo()
                            
                     },
                     error: function (_response) {
                            alertify.error("No se ha podido eliminar el registro")
                     }
            })
      },
      null
   )
}


/*============================================*/


Grid.prototype.set_Icons = function (e) {

        e.sender.tbody.find(".k-button.fa.fa-pencil").each(function(idx, element){
        $(element).removeClass("fa fa-pencil").find("span").addClass("fa fa-pencil")
    })   
}



/*-----------------------------------------------*\
            OBJETO: TOOLBAR
\*-----------------------------------------------*/

// function Toolbar() {

//     this.$boton_exportar = $("#boton_exportar")

//     this.init()
// }


/*-----------------------------------------------*\
            OBJETO: Pop up personal
\*-----------------------------------------------*/

function PopupPerfil () {

    this.$modal_per = $('#modal_nuevo')
    this.$desc_puesto2 = $('#id_desc_puesto2')
    this.$boton_guardar = $('#id_boton_guardar_acargo')
    this.$created_by = $('#created_by')
    this.$numero_puesto = $('#numero_puesto')


    this.init_Components()
    this.init_Events()
}
PopupPerfil.prototype.init_Components = function () {

    this.$desc_puesto2.select2(appnova.get_ConfigSelect2())

}

PopupPerfil.prototype.init_Events = function () {

   this.$boton_guardar.on('click', this, this.click_BotonGuardar)
}

PopupPerfil.prototype.click_BotonGuardar = function (e) {


 var id_creator= e.data.$created_by.val()
 var id_creator=e.data.$desc_puesto2.val()
 var numero_puesto = e.data.$numero_puesto.val()
 var cadena_id = e.data.$desc_puesto2.val()
    
    separador = " ", // un espacio en blanco
    limite    = 10,
    arregloDeSubCadenas = cadena_id.split(separador);
    console.log(arregloDeSubCadenas)
    //alert(arregloDeSubCadenas[0])
    //alert(arregloDeSubCadenas[2])
    
    var puesto_cargo = arregloDeSubCadenas[2]
    //alert(puesto_cargo)
    separador = ".", // un espacio en blanco
    arreglo_puesto_cargo = puesto_cargo.split(separador);
    arreglo1 = arreglo_puesto_cargo[0] + "." + arreglo_puesto_cargo[1]
    descripcion = puesto_cargo;
    
    //alert(arreglo_puesto_cargo)
    console.log(arreglo1)
    console.log(descripcion)

    var promesa = $.ajax({
         url: url_perfil_puestocargo,
         method: "POST",
         headers: { "X-CSRFToken": appnova.galletita },
         data: {
            'id_puesto' : numero_puesto,
            'id_puesto_cargo' : arregloDeSubCadenas[0], 
            'descripcion' : cadena_id,
            'created_by' :  url_profile+e.data.$created_by.val()+"/",
            'created_date' :  '2017-07-07 16:25:22.000000',

         },
         success: function (_response) {
                  alertify.success("Se ha guardado el Puesto a Cargo")
                  tarjeta_resultados.popup.hidden_Modal()
                  tarjeta_resultados.popup.actualizar_Grid()
         },
         error: function (_response) {
                   alertify.error("Ocurrio error al guardar")
                   tarjeta_resultados.popup.hidden_Modal()
                   //popup.actualizar_Grid()
         }
      })
    //promesa.then(function(){
    //    popup.buscar_UltimoRegistro()
    //})
}

PopupPerfil.prototype.hidden_Modal = function () {

     this.$modal_per.modal('hide')
     //this.limpiar_Formulario()
}

PopupPerfil.prototype.actualizar_Grid = function () {
        //$("#grid_resultados").empty()
        tarjeta_resultados.resultados.grid.init()
}

PopupPerfil.prototype.buscar_UltimoRegistro = function () {
    $.ajax({
         url: url_perfil_puestocargo,
         method: "GET",
         success: function (_response) {
            posicion = _response.length - 1
            id_personal = _response[posicion].pk
            tarjeta_resultados.popup.guardar_Archivo(id_personal)
         },
         error: function (_response) {
            alertify.error("Ocurrio error al consultar")
         }
    })
}
PopupPerfil.prototype.guardar_Archivo = function (_id_personal){

    var data = new FormData()
     popup.$formulario_per.find(':input').each(function() {
        var elemento= this;
        if(elemento.type === 'file'){
           if(elemento.value !== ''){
                for(var i=0; i< $('#'+elemento.id).prop("files").length; i++){
                  data.append('archivo', $('#'+elemento.id).prop("files")[i]);
               }
                data.append('tipo_archivo', "per")
                data.append('content_object', url_documento_personal+_id_personal+"/")
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
            popup.hidden_Modal()
            popup.actualizar_Grid()
            //alert('Se ha guardado el Puesto')
            alertify.success("Se ha guardado el Puesto")
         },
         error: function (_response) {

            alertify.error("Ocurrio error al guardar archivo")
         }
      })
}
PopupPerfil.prototype.hidden_Modal = function () {

   this.$modal_per.modal('hide')
   //this.limpiar_Formulario()
}
PopupPerfil.prototype.actualizar_Grid = function () {
    //$("#grid_resultados").empty()
    tarjeta_resultados.resultados.grid.buscar()
}
PopupPerfil.prototype.limpiar_Formulario = function () {

    this.$tipo_documento.data('select2').val(0)
    this.$agrupador.data('select2').val(0)
    this.$vigencia_inicio.val("")
    this.$vigencia_fin.val("")
    this.$archivo.val("")
}


/*-----------------------------------------------*\
            OBJETO: Targeta Resultados
\*-----------------------------------------------*/

function TargetaResultadosCompetencias () {

    this.grid2 = new Grid2()
    //this.toolbar = new Toolbar()
}

/*-----------------------------------------------*\
            OBJETO: Grid
\*-----------------------------------------------*/

function Grid2() {

    this.$id = $('#grid_resultados_competencias')
    this.kfuente_datos = null
    this.kgrid = null
    this.init_Components()

}

Grid2.prototype.init_Components = function () {
    // Definicion del pais, formato modena, etc..
    kendo.culture("es-MX")

    // Se inicializa la fuente da datos (datasource)
    this.kfuente_datos = new kendo.data.DataSource(this.get_DataSourceConfig())
    //this.kfuente_datos_excel = new kendo.data.DataSource(this.get_FuenteDatosExcel())
   
    // Se inicializa y configura el grid:
    this.kgrid = this.$id.kendoGrid(this.get_Configuracion())    
}

Grid2.prototype.get_DataSourceConfig = function () {

   console.log("paso por grid2")
}

Grid2.prototype.get_Campos = function () {

    return {
        pk : { type: "number" },
        tipo_competencia : { type: "string" },
        id_puesto : { type: "string" },
        descripcion : { type: "string" },
        porcentaje : { type: "string" },
    }
}
Grid2.prototype.get_Configuracion = function () {
    return {
        autoBind: false,
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
        dataBound: this.aplicar_Estilos,
    }    
}

Grid2.prototype.get_Columnas = function () {

    return [
        {  field: "pk",
           title: " ",
           width: "50px",
           template: '<a class="btn nova-btn btn-default nova-btn-delete" id="#=pk#" data-event="eliminar-competencias"> <i class="icon icon-left icon mdi mdi-delete nova-white"></i></a>',
        },
        { 
            field: "pk", 
            title: "Id", 
            width:"70px",
        },
        { field: "tipo_competencia", title: "Tipo Competencia", width:"70px" },
        { field: "id_puesto", title: "Puesto", width:"80px" },
        { field: "descripcion", title: "Descripcion", width:"70px" },
        { field: "porcentaje", title: "Porcentaje", width:"300px" },
        
    ]
}

Grid2.prototype.buscar = function() {
    
    this.kfuente_datos.page(1)
}


Grid2.prototype.set_Icons = function (e) {

        e.sender.tbody.find(".k-button.fa.fa-pencil").each(function(idx, element){
        $(element).removeClass("fa fa-pencil").find("span").addClass("fa fa-pencil")
    })   
}
Grid2.prototype.aplicar_Estilos = function (e) {

    e.sender.tbody.find("[data-event='eliminar-competencias']").each(function(idx, element){

      $(this).on("click", function(){
         tarjeta_resultados.resultados.grid.consultar_Registro(this.id)
      })
    })
}

Grid2.prototype.consultar_Registro = function (_id_documento) {
  alertify.confirm(
      'Eliminar Registro',
      '¿Desea Eliminar este registro?.',
      function () {
            $.ajax({
                     url: url_perfil_puestocargo_bypage +_id_documento+"/",
                     method: "DELETE",
                     headers: { "X-CSRFToken": appnova.galletita },
                     success: function (_response) {
                            alertify.success('Se elimino el registro de Competencia')
                            tarjeta_resultados.resultados_competencia.grid2.buscar()
                            //$("#grid_resultados").empty()
                            //tarjeta_resultados.resultados.grid.init()
                            //tarjeta_resultados.formulario.escoger_puestosacargo()
                            
                     },
                     error: function (_response) {
                            alertify.error("No se ha podido eliminar el registro")
                     }
            })
      },
      null
   )
}



/*-----------------------------------------------*\
            OBJETO: Pop up Competencias
\*-----------------------------------------------*/

function PopupPerfilCompetencia() {

    this.$modal_competencia = $('#modal_nuevo_competencia')
    this.$descripcion_comp = $('#id_descripcion')
    this.$boton_guardar_competencia = $('#boton_guardar_competencia')
    this.$created_by = $('#created_by')
    this.$tipo_competencia = $('#id_tipo_competencia')
    this.$porcentaje = $('#id_porcentaje')
    this.$id_puesto = $('#numero_puesto')
    this.$numero_puesto = $('#numero_puesto')
    //this.$numero_documento = $('#id_doc_perfil')
    //this.$id_doc_perfil = $(id_doc_perfil)
    //this.$numero_puesto = $('#numero_puesto')
    console.log("paso por competencias")
    this.init_Components()
    this.init_Events()
}
PopupPerfilCompetencia.prototype.init_Components = function () {

    this.$descripcion_comp.select2(appnova.get_ConfigSelect2())

}

PopupPerfilCompetencia.prototype.init_Events = function () {

   this.$boton_guardar_competencia.on('click', this, this.click_BotonGuardar)
}

PopupPerfilCompetencia.prototype.click_BotonGuardar = function (e) {

 var descripcion = e.data.$descripcion_comp.val()
 var tipo_competencia  = e.data.$tipo_competencia.val()
 var porcentaje = e.data.$porcentaje.val()
 var id_puesto = e.data.$id_puesto.val()
 

    separador = "-", // un espacio en blanco
    arreglo_descripcion = descripcion.split(separador);

    //alert(descripcion)
    
    //arreglo1 = arreglo_puesto_cargo[0] + "." + arreglo_puesto_cargo[1]
    id_descripcion = arreglo_descripcion[1];
    console.log(id_descripcion)

 console.log("paso por competencias")
 console.log(id_doc_perfil)
 //alert(id_doc_perfil)
 // alert(id_puestocargo)
 var promesa = $.ajax({
         url: url_perfil_competencia_doc_bypage,
         method: "POST",
         headers: { "X-CSRFToken": appnova.galletita },
         data: {
            'id_puesto' : id_puesto,
            'id_descripcion' : id_descripcion,
            'descripcion' : descripcion,
            'porcentaje' : porcentaje, 
            'tipo_competencia' : tipo_competencia,
            'created_by' :  url_profile + e.data.$created_by.val() + "/",
            'created_date' :  '2017-07-07 16:25:22.000000',
         },
         success: function (_response) {
          alertify.success("Se ha guardado la Competencia Administrativa")
                  tarjeta_resultados.popup_com.hidden_Modal()
                  tarjeta_resultados.popup.actualizar_Grid()
                 // popup.actualizar_Grid()
         },
         error: function (_response) {
          if (_response[id_puesto]==null){
            alertify.error("Debes seleccionar el Puesto en General")
          }
          else {
            alertify.error("Ocurrio error al guardar")
          }
         }
      })
}

PopupPerfilCompetencia.prototype.hidden_Modal = function () {

     this.$modal_competencia.modal('hide')
}

PopupPerfilCompetencia.prototype.actualizar_Grid = function () {
        //$("#grid_resultados").empty()
        resultados.grid.init()
}


/*-----------------------------------------------*\
            OBJETO: Pop up Indicadores
\*-----------------------------------------------*/

function PopupPerfilIndicador() {

    this.$modal_indicadores = $('#modal_nuevo_indicadores')
    this.$formulario_ind = $('#formulario_indicadores')
    this.$id_puesto = $('#numero_puesto')
    this.$numero_puesto = $('#numero_puesto')
    this.$boton_guardar_indicadores = $('#boton_guardar_indicadores')
    this.$plantilla = $('#id_plantilla')
    this.$departamento = $('#id_departamento')
    this.$puesto = $('#id_puesto')
    this.$objetivo = $('#id_objetivo_ind')
    this.$unidad_medida = $('#id_unidad_medida')
    this.$descripcion_kpi = $('#id_descripcion_kpi')
    this.$porcentaje = $('#id_porcentaje_ind')
    this.$meta_minima = $('#id_meta_minima')
    this.$meta_satisfactoria = $('#id_meta_satisfactoria')
    this.$meta_excelente = $('#id_meta_excelente')

    this.$created_by = $('#created_by')
    this.$boton_cancelar = $('#boton_cancelar_ind')

    console.log("paso por Indicadores")
    this.init_Components()
    this.init_Events()
}
PopupPerfilIndicador.prototype.init_Components = function () {

    this.$plantilla.select2(appnova.get_ConfigSelect2())

}

PopupPerfilIndicador.prototype.init_Events = function () {

   this.$boton_guardar_indicadores.on('click', this, this.click_BotonGuardar)
   this.$boton_cancelar.on('click', this, this.click_BotonCancelar)
}

PopupPerfilIndicador.prototype.click_BotonCancelar = function (e){
        e.data.$objetivo.val("")
        e.data.$unidad_medida.val("")
        e.data.$descripcion_kpi.val("")
        e.data.$porcentaje.val("")
        e.data.$meta_minima.val("")
        e.data.$meta_satisfactoria.val("")
        e.data.$meta_excelente.val("")
        tarjeta_resultados.popup_ind.clear_Estilos()

}

PopupPerfilIndicador.prototype.click_BotonGuardar = function (e) {

 var id_puesto = e.data.$id_puesto.val()
 var plantilla = e.data.$plantilla.val()
 // var departamento  = e.data.$departamento.val()
 // var puesto = e.data.$id_puesto.val()
 var departamento  = e.data.$id_puesto.val()
 var puesto = e.data.$id_puesto.val()
 var objetivo = e.data.$objetivo.val()
 var unidad_medida = e.data.$unidad_medida.val()
 var descripcion_kpi = e.data.$descripcion_kpi.val()
 var porcentaje = e.data.$porcentaje.val()
 var meta_minima = e.data.$meta_minima.val()
 var meta_satisfactoria = e.data.$meta_satisfactoria.val()
 var meta_excelente = e.data.$meta_excelente.val()

 console.log("paso por indicadores")
 console.log(id_puesto)

if (tarjeta_resultados.popup_ind.validar_Campos() != 'True'){
   var promesa = $.ajax({
           url: url_perfil_indicadores_bypage,
           method: "POST",
           headers: { "X-CSRFToken": appnova.galletita },
           data: {
              'plantilla_id' : plantilla,
              'cvepuesto' : id_puesto,
              //'linea' : '1',
              'departamento' : departamento,
              'puesto' : puesto, 
              'objetivo' : objetivo,
              'unidad_medida' : unidad_medida,
              'descripcion_kpi' : descripcion_kpi,
              'porcentaje' : porcentaje,
              'meta_minima' : meta_minima,
              'meta_satisfactoria' : meta_satisfactoria,
              'meta_excelente' : meta_excelente,
              'created_by' :  url_profile + e.data.$created_by.val() + "/",
              'created_by_id' :  url_profile + e.data.$created_by.val() + "/",
              'created_date' :  '2017-07-07 16:25:22.000000',
           },
           success: function (_response) {
            alertify.success("Se ha guardado el Indicador al puesto")
                    tarjeta_resultados.popup_ind.hidden_Modal()
                    tarjeta_resultados.popup.actualizar_Grid()
                   // popup.actualizar_Grid()
           },
           error: function (_response) {
            if (_response[id_puesto]==null){
              alertify.error("Debes seleccionar el Puesto en General")
            }
            else {
              alertify.error("Ocurrio error al guardar")
            }
           }
        })
     }
   

}

PopupPerfilIndicador.prototype.hidden_Modal = function () {

     this.$modal_indicadores.modal('hide')
}

PopupPerfilIndicador.prototype.actualizar_Grid = function () {
        //$("#grid_resultados").empty()
        resultados.grid.init()
}
PopupPerfilIndicador.prototype.validar_Campos = function () {
    bandera = 'False'

    if(this.$id_puesto.val() == ""){
        this.$id_puesto.addClass("nova-has-error");
        bandera = 'True'
    }
    else{
        this.$id_puesto.removeClass("nova-has-error");
    }
    if(this.$departamento.val() == ""){
        this.$departamento.addClass("nova-has-error");
        bandera = 'True'
    }
    else{
        this.$departamento.removeClass("nova-has-error");
    }
    if(this.$objetivo.val() == ""){
        this.$objetivo.addClass("nova-has-error");
        bandera = 'True'
    }
    else{
        this.$objetivo.removeClass("nova-has-error");
    }
    if(this.$unidad_medida.val() == ""){
        this.$unidad_medida.addClass("nova-has-error");
        bandera = 'True'
    }
    else{
        this.$unidad_medida.removeClass("nova-has-error");
    }
    if(this.$descripcion_kpi.val() == ""){
        this.$descripcion_kpi.addClass("nova-has-error");
        bandera = 'True'
    }
    else{
        this.$descripcion_kpi.removeClass("nova-has-error");
    }
    if(this.$porcentaje.val() == ""){
        this.$porcentaje.addClass("nova-has-error");
        bandera = 'True'
    }
    else{
        this.$porcentaje.removeClass("nova-has-error");
    }
    if(this.$meta_minima.val() == ""){
        this.$meta_minima.addClass("nova-has-error");
        bandera = 'True'
    }
    else{
        this.$meta_minima.removeClass("nova-has-error");
    }
    if(this.$meta_satisfactoria.val() == ""){
        this.$meta_satisfactoria.addClass("nova-has-error");
        bandera = 'True'
    }
    else{
        this.$meta_satisfactoria.removeClass("nova-has-error");
    }
    if(this.$meta_excelente.val() == ""){
        this.$meta_excelente.addClass("nova-has-error");
        bandera = 'True'
    }
    else{
        this.$meta_excelente.removeClass("nova-has-error");
    }
    if (bandera == 'True' ){
        this.$formulario_ind.append('<div class="alert alert-danger nova-margin" id="id_error"><span class="icon mdi mdi-close-circle-o"></span><strong>Completa los campos correspondientes</strong></div>')
    }
    else{
        $('#id_error').detach()
    }
    return bandera
}
PopupPerfilIndicador.prototype.clear_Estilos = function () {

   this.$objetivo.removeClass("nova-has-error");
   this.$unidad_medida.removeClass("nova-has-error");
   this.$descripcion_kpi.removeClass("nova-has-error");
   this.$porcentaje.removeClass("nova-has-error");
   this.$meta_minima.removeClass("nova-has-error");
   this.$meta_satisfactoria.removeClass("nova-has-error");
   this.$meta_excelente.removeClass("nova-has-error");
   $('#id_error').detach()
}

/*-----------------------------------------------*\
            OBJETO: Targeta Resultados
\*-----------------------------------------------*/

function TargetaResultadosIndicadores () {

    this.grid3 = new Grid3()
    //this.toolbar = new Toolbar()
}

/*-----------------------------------------------*\
            OBJETO: Grid
\*-----------------------------------------------*/

function Grid3() {

    this.$id3 = $('#grid_resultados_indicadores')
    this.kfuente_datos3 = null
    this.kgrid3 = null
    this.init_Components()

}

Grid3.prototype.init_Components = function () {
    // Definicion del pais, formato modena, etc..
    kendo.culture("es-MX")

    // Se inicializa la fuente da datos (datasource)
    this.kfuente_datos3 = new kendo.data.DataSource(this.get_DataSourceConfig())
    //this.kfuente_datos_excel = new kendo.data.DataSource(this.get_FuenteDatosExcel())
   
    // Se inicializa y configura el grid:
    this.kgrid3 = this.$id3.kendoGrid(this.get_Configuracion())    
}

Grid3.prototype.get_DataSourceConfig = function () {

   console.log("paso por grid33")
}

Grid3.prototype.get_Campos = function () {

    return {
        pk : { type: "number" },
        cvepuesto : { type: "string" },
        departamento : { type: "string" },
        puesto : { type: "string" },
        //linea : { type: "number" },
        objetivo : { type: "string" },
        unidad_medida : { type: "string" },
        descripcion_kpi : { type: "string" },
        porcentaje : { type: "number" },
        meta_minima : { type: "number" },
        meta_satisfactoria : { type: "number" },
        meta_excelente : { type: "number" },
    }
}
Grid3.prototype.get_Configuracion = function () {
    return {
        autoBind: false,
        dataSource: this.kfuente_datos3,
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

Grid3.prototype.get_Columnas = function () {

    return [
        {  field: "pk",
           title: " ",
           width: "50px",
           template: '<a class="btn nova-btn btn-default nova-btn-delete" id="#=pk#" data-event="eliminar-competencias"> <i class="icon icon-left icon mdi mdi-delete nova-white"></i></a>',
        },
        { 
            field: "pk", 
            title: "Id", 
            width:"70px",
        },
        { field: "cvepuesto", title: "TipoCompetencia", width:"70px" },
        { field: "departamento", title: "Puesto", width:"80px" },
        { field: "puesto", title: "Descripcion", width:"70px" },
        //{ field: "linea", title: "Porcentaje", width:"300px" },
        { field: "objetivo", title: "Tipo Competencia", width:"70px" },
        { field: "unidad_medida", title: "Puesto", width:"80px" },
        { field: "descripcion_kpi", title: "Descripcion", width:"70px" },
        { field: "porcentaje", title: "Porcentaje", width:"70px" },
        { field: "meta_minima", title: "Meta Minima", width:"70px" },
        { field: "meta_satisfactoria", title: "Meta Satisfactoria", width:"70px" },
        { field: "meta_excelente", title: "Meta Excelente", width:"70px" },
        
    ]
}

Grid3.prototype.buscar = function() {
    
    this.kfuente_datos3.page(1)
}


Grid3.prototype.set_Icons = function (e) {

        e.sender.tbody.find(".k-button.fa.fa-pencil").each(function(idx, element){
        $(element).removeClass("fa fa-pencil").find("span").addClass("fa fa-pencil")
    })   
}


Grid23.prototype.aplicar_Estilos = function (e) {

    e.sender.tbody.find("[data-event='eliminar-competencias']").each(function(idx, element){

      $(this).on("click", function(){
         tarjeta_resultados.resultados.grid.consultar_Registro_Indicador(this.id)
      })
    })
}

Grid3.prototype.consultar_Registro_Indicador = function (_id_documento) {
  alertify.confirm(
      'Eliminar Registro',
      '¿Desea Eliminar este registro?.',
      function () {
            $.ajax({
                     url: url_perfil_indicadores_bypage +_id_documento+"/",
                     method: "DELETE",
                     headers: { "X-CSRFToken": appnova.galletita },
                     success: function (_response) {
                            alertify.success('Se elimino el registro de Indicadores')
                            tarjeta_resultados.resultados_indicadores.grid3.buscar()
                            //$("#grid_resultados").empty()
                            //tarjeta_resultados.resultados.grid.init()
                            //tarjeta_resultados.formulario.escoger_puestosacargo()
                            
                     },
                     error: function (_response) {
                            alertify.error("No se ha podido eliminar el registro")
                     }
            })
      },
      null
   )
}






