/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

var url_expediente_bypage = window.location.origin  + "/api-capitalhumano/personaldocumento_bypage/"

// OBJS
var popup = null
var toolbar = null
var grid = null
var componentes = null

/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {

    popup = new Popup()
    toolbar = new Toolbar()
    grid = new Grid()
    componentes = new Componentes()
  
})
/*-----------------------------------------------*\
            OBJETO: Componentes
\*-----------------------------------------------*/

function Componentes(){
    this.$tipo = $('#id_tipo')
    this.$agrupador = $('#id_agrupador')

    this.init_Components()
}
Componentes.prototype.init_Components = function (){
    this.$tipo.select2(this.get_ConfSelect2())
    this.$agrupador.select2(this.get_ConfSelect2())
}
Componentes.prototype.get_ConfSelect2 = function () {
   return {
      width: '100%'
   }
}

/*-----------------------------------------------*\
            OBJETO: Pop up 
\*-----------------------------------------------*/

function Popup () {

    this.$id = $('#modal_nuevo')

    this.init_Components()
    this.init_Events()

}
Popup.prototype.init_Components = function () {
    
}
Popup.prototype.init_Events = function () {

    //this.$id.on("hidden.bs.modal", this, this.hide)
}

/*-----------------------------------------------*\
            OBJETO: TOOLBAR
\*-----------------------------------------------*/

function Toolbar() {
    
    this.$boton_nuevo = $('#boton_nuevo')
    this.init_Events()
}
Toolbar.prototype.init_Events = function () {

    this.$boton_nuevo.on("click", this, this.mostrar_Modal)
}
Toolbar.prototype.mostrar_Modal = function (e){
    
    popup.$id.hasClass('in')
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
    // alert(JSON.stringify(url_expediente))
    return {

        serverPaging: true,
        pageSize: 10,
        transport: {
            read: {
                url: url_expediente_bypage,
                type: "GET",
                dataType: "json",
            },
            // parameterMap: function (data, action) {
            //     if (action === "read"){
            //         return tarjeta_filtros.get_Values(data.page)
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
        agrupador : { type: "string" },
        fecha : { type: "date"},
        vigencia_inicio : { type: "date" },
        vigencia_fin : { type: "date" },
        tipo : { type: "string" },
        archivo : { type: "string" },
        created_by : { type: "string" },
        created_date : { type: "date" },
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
            template: "<div class='grid-empty'> No se encontraron registros </div>"
        },
        dataBound: this.set_Icons,
    }
}
Grid.prototype.get_Columnas = function () {

    return [  
        { field: "tipo", 
          title: "Archivo", 
          width:"150px" ,
          template: '<a>#=tipo#</a>',
        },
        // { field: "tipo", title: "Tipo", width:"170px" }, #=url_expediente + pers_empleado_numero #/expediente/
        { field: "agrupador", title: "Agrupador", width:"100px"},
        { field: "vigencia_inicio", title: "Vigencia inicio", width:"100px",format: "{0:dd/MM/yyyy}" },
        { field: "vigencia_fin", title: "Vigencia fin", width:"100px",format: "{0:dd/MM/yyyy}" },
        { field: "created_by", title: "Creado por", width:"150px" },
        { field: "created_date", title: "Fecha de creación", width:"150px", format: "{0:dd/MM/yyyy}" },

    ]
}
Grid.prototype.buscar = function() {
    this.kfuente_datos.page(1)
}

