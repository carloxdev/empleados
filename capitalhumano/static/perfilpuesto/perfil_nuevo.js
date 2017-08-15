/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:
var url_perfil_bypage = window.location.origin + "/api-capitalhumano/perfilpuestoacargo_bypage/"
var url_perfil_puestocargo = window.location.origin + "/api-capitalhumano/perfilpuestoacargo/"
var url_profile =  window.location.origin + "/api-seguridad/profile/"
var url_perfil_puesto = window.location.origin + "/api-capitalhumano/perfilpuestosdocumento/"
var url_perfil_puestodoc_bypage = window.location.origin + "/api-capitalhumano/perfilpuestosdoc_bypage/"

// OBJS
var formulario = null
var organigrama = null
var select_componente = null
var toolbar = null


/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {
    
    formulario = new Formulario()
    select_componente = new Componente()
    resultados = new TargetaResultados()
    popup = new PopupPerfil()

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

    this.$reportar = $('#id_reporta')
    this.$boton_guardar_perfil = $('#id_boton_guardar_perfil')
    //this.$funciones = $('#funciones')
    this.init_Components()
    this.init_Events()

}  
Componente.prototype.init_Components = function(){
    this.$puesto.select2(this.get_ConfSelect2())  
}

Componente.prototype.get_ConfSelect2 = function () {
   return {
      width: '100%'
    }
}

Componente.prototype.get_Values = function (_page) {

    return {
        page: _page,
        id: this.$puesto.val(),
    }

}

Componente.prototype.init_Events = function () {

   this.$boton_guardar_perfil.on('click', this, this.click_BotonGuardar)
}

Componente.prototype.click_BotonGuardar = function (e) {

 var id_puestocargo= e.data.$puesto.val()
 alert(id_puestocargo)

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
            'edad_minima' :  '',
            'edad_maxima' :  '',
            'nivel_estudio' :  '',
            'estado_civil' : 'ind',
            'genero' :  '',
            'cambio_residencia' :  false,
            'disponibilidad_viajar' : false,
            'requerimentos' : '-',
            'areas_experiencia' : '-',
            'competencias' : '-',
            'proposito' : '-',
         },
         success: function (_response) {
         },
         error: function (_response) {
            alertify.error("Ocurrio error al guardar")
         }
      })
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

     //var creador = $('#created_by')

//alert(creador)

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

    // Consultar el API con el numero del empleado.
    var id_puesto= e.data.$puesto.val()
    alert(id_puesto)

   // Consultar el API con el numero del empleado.
    var num_empleado = id_puesto
    var num_empleado = 8

    var url = url_perfil_puestodoc_bypage + "?pk=" + num_empleado

    $.ajax({
            url: url_perfil_puestodoc_bypage,
            data: {
              pk:num_empleado
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

              if (cont == 0){
                resultados.grid.buscar()
                alert("entro buscar")
                
              }
              else{
                 alert("Entro2")
                //organigrama.mostrar_Mensaje(cont)
                //organigrama.crear_Diagrama(url)
              }
              
            },
            error: function (response) {

                         alert("Ocurrio error al consultar ")
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

    this.init_Components()

}

Grid.prototype.init_Components = function () {


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

                url: url_perfil_bypage,
                type: "GET",
                dataType: "json",
            },
            // parameterMap: function (data, action) {
            //     if (action === "read"){
            //         return filtros.get_Values(data.page)
            //     }
            // }
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
        pk : { type: "number" },
        id_puesto : { type: "string" },
        id_puesto_cargo : { type: "string" },
        descripcion : { type: "string" },
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
}


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
    //alert(id_creator)

    var cadena_id = e.data.$desc_puesto2.val()
    alert(cadena_id)
    separador = " ", // un espacio en blanco
    limite    = 10,
    arregloDeSubCadenas = cadena_id.split(separador);
    console.log(arregloDeSubCadenas)
    alert(arregloDeSubCadenas[0])
    alert(arregloDeSubCadenas[2])
    
    var puesto_cargo = arregloDeSubCadenas[2]
    alert(puesto_cargo)
    separador = ".", // un espacio en blanco
    arreglo_puesto_cargo = puesto_cargo.split(separador);
    arreglo1 = arreglo_puesto_cargo[0] + "." + arreglo_puesto_cargo[1]
    descripcion = puesto_cargo;
    
    alert(arreglo_puesto_cargo)
    console.log(arreglo1)
    console.log(descripcion)

    alert("paso")

    var promesa = $.ajax({
         url: url_perfil_puestocargo,
         method: "POST",
         headers: { "X-CSRFToken": appnova.galletita },
         data: {
            'id_puesto' : '320',
            'id_puesto_cargo' : arregloDeSubCadenas[0], 
            'descripcion' : cadena_id,
            'created_by' :  url_profile+e.data.$created_by.val()+"/",
            'created_date' :  '2017-07-07 16:25:22.000000',

         },
         success: function (_response) {
         },
         error: function (_response) {
            alertify.error("Ocurrio error al guardar")
         }
      })
    //promesa.then(function(){
    //    popup.buscar_UltimoRegistro()
    //})
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

            alert('Se ha guardado el archivo')
            popup.hidden_Modal()
            popup.actualizar_Grid()
         },
         error: function (_response) {

            alertify.error("Ocurrio error al guardar archivo")
         }
      })
}
PopupPerfil.prototype.hidden_Modal = function () {

   this.$modal_per.modal('hide')
   this.limpiar_Formulario()
}
PopupPerfil.prototype.actualizar_Grid = function () {
    $("#grid_resultados").empty()
    grid_personal.init()
}
PopupPerfil.prototype.limpiar_Formulario = function () {

    this.$tipo_documento.data('select2').val(0)
    this.$agrupador.data('select2').val(0)
    this.$vigencia_inicio.val("")
    this.$vigencia_fin.val("")
    this.$archivo.val("")
}