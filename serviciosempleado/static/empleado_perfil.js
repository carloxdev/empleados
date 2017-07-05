/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/
var url_expediente_personal_bypage = window.location.origin  + "/api-capitalhumano/documentopersonal_bypage/"
var url_expediente_capacitacion_bypage = window.location.origin  + "/api-capitalhumano/documentocapacitacion_bypage/"

// OBJS
var grid_personal = null
var grid_capacitacion = null
var filtros = null
var tarjeta_resultados = null
var personalizacion = null

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
    personalizacion = new Personalizacion
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


/*-----------------------------------------------*\
            OBJETO: Personalizacion del tab
\*-----------------------------------------------*/

function Personalizacion(){
    this.$personales = $('#personales')
    this.$capacitaciones = $('#capacitaciones')
    this.init_Events()
}
Personalizacion.prototype.init_Components = function(){
}
Personalizacion.prototype.init_Events = function(){
    
    this.$personales.on("click", this , this.mostrar_Personales)
    this.$capacitaciones.on("click", this , this.mostrar_Capacitaciones)
}
Personalizacion.prototype.mostrar_Personales = function(e){
    
    e.data.$capacitaciones.removeClass('nova-active-tab')
    e.data.$personales.addClass('nova-active-tab')
    $("#grid_resultados").empty()
    grid_personal.init()
}
Personalizacion.prototype.mostrar_Capacitaciones = function(e){
    
    e.data.$personales.removeClass('nova-active-tab')
    e.data.$capacitaciones.addClass('nova-active-tab')
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
            template: "<div class='grid-empty'> No se encontraron registros </div>"
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
        departamento : { type: "string" },
        fecha_inicio : { type: "string" },
        fecha_fin : { type: "string" },
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
            template: "<div class='grid-empty'> No se encontraron registros </div>"
        },
        dataBound: this.set_Icons,
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
        { field: "departamento",title: "Departamento",width:"150px"},
        { field: "fecha_inicio", title: "Fecha inicio", width:"100px" },
        { field: "fecha_fin",title: "Fecha fin",width:"100px"},
        { field: "duracion", title: "Duración", width:"100px",template: '#=duracion# hrs' },
        { field: "observaciones", title: "Observaciones", width:"200px" },
        { field: "created_by", title: "Creado por", width:"150px" },
        { field: "created_date", title: "Fecha de creación", width:"150px", format: "{0:dd/MM/yyyy}" },

    ]
}
GridCapacitacion.prototype.buscar = function() {
    this.kfuente_datos.page(1)
}

