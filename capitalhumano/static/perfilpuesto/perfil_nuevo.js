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

// OBJS
var formulario = null
var organigrama = null
var select_componente = null
var popup = null
var popup_com = null
var resultados_competencia = null


/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {
    
    formulario = new Formulario()
    select_componente = new Componente()
    resultados = new TargetaResultados()
    popup = new PopupPerfil()
    resultados_competencia = new TargetaResultadosCompetencias()
    popup_com = new PopupPerfilCompetencia()

})

/*-----------------------------------------------*\
            OBJETO: Targeta filtros
\*-----------------------------------------------*/

function Componente(){
    this.$puesto = $('#id_desc_puesto')
    this.$reporta = $('#id_reporta')
    this.$objetivo = $('#id_objetivo')
    this.$funciones = $('#id_funciones')
    this.$responsabilidades = $('#id_responsabilidades')
    this.$posicion = $('#posicion')
    this.$numero_puesto = $('#id_numero_puesto')
    this.$id_doc_perfil = $('#id_doc_perfil')
  
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

Componente.prototype.init_Events = function () {

   this.$boton_guardar_perfil.on('click', this, this.click_BotonGuardar)
   this.$boton_guardar_perfil_detalle.on('click', this, this.click_BotonGuardarDetalle)
}

Componente.prototype.click_BotonGuardar = function (e) {

 var id_puestocargo= e.data.$puesto.val()
 var asig_puesto_clave = e.data.$puesto.val()

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
          console.log(id_doc_perfil)
          console.log(numero_puesto)

          alertify.success("Se ha guardado el Perfil general")
                  popup.hidden_Modal()
                  popup.actualizar_Grid()
         },
         error: function (_response) {
            alertify.error("Ocurrio error al guardar el Perfil")
         }
      })
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
    console.log(select_componente.$puesto.val())
    // Consultar el API con el numero del empleado.
    var id_puesto = e.data.$puesto.val()
    var id_puesto2 = select_componente.$puesto.val()

    //$("#numero_puesto").val() = e.data.$puesto.val()
    //select_componente.$numero_puesto.val() = e.data.$puesto.val()
    //this.$numero_empleado = e.data.$puesto.val()
    //alert(numero_empleado)
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
                resultados.grid.buscar()
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
                resultados_competencia.grid2.buscar()
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

    this.init_Components()
    this.init_Components2()

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
                    return select_componente.get_Values(data.page)
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
                    return select_componente.get_Values(data.page)
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
        dataBound: this.set_Icons,
    }    
}

Grid.prototype.get_Columnas = function () {
    return [
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
        dataBound: this.set_Icons,
    }    
}

Grid.prototype.get_Columnas2 = function () {

    return [
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
                  popup.hidden_Modal()
                  popup.actualizar_Grid()
         },
         error: function (_response) {
                   alertify.error("Ocurrio error al guardar")
                   popup.hidden_Modal()
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
        resultados.grid.init()
}

PopupPerfil.prototype.buscar_UltimoRegistro = function () {
    $.ajax({
         url: url_perfil_puestocargo,
         method: "GET",
         success: function (_response) {
            posicion = _response.length - 1
            id_personal = _response[posicion].pk
            popup.guardar_Archivo(id_personal)
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
    resultados.grid.buscar()
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
        //autoBind: false,
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
        dataBound: this.set_Icons,
    }    
}

Grid2.prototype.get_Columnas = function () {

    return [
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

    alert(descripcion)
    
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
                  popup_com.hidden_Modal()
                  popup.actualizar_Grid()
                 // popup.actualizar_Grid()
         },
         error: function (_response) {
            alertify.error("Ocurrio error al guardar")
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





