/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/
var url_expediente = window.location.origin  + "/api-capitalhumano/documentopersonal/"
var url_expediente_personal_bypage = window.location.origin  + "/api-capitalhumano/documentopersonal_bypage/"
var url_expediente_capacitacion_bypage = window.location.origin  + "/api-capitalhumano/documentocapacitacion_bypage/"
var url_eliminar = window.location.origin + "/expedientes/"

// OBJS
var popup = null
var popup_cap = null
var toolbar = null
var grid_personal = null
var grid_capacitacion = null
var componentes = null
var tarjeta_resultados = null
var personalizacion = null

/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {
    componentes = new Componentes()
    tarjeta_resultados = TarjetaResultados()
    // ajaxcap = AjaxCapacitacion()

})

/*-----------------------------------------------*\
            OBJETO: Tarjeta Resultados
\*-----------------------------------------------*/

function TarjetaResultados(){
    popup = new Popup()
    popup_cap = new PopupCapacitacion()
    toolbar = new Toolbar()
    personalizacion = new Personalizacion
    grid_personal = new GridPersonal()
}

/*-----------------------------------------------*\
            OBJETO: Componentes
\*-----------------------------------------------*/

function Componentes(){
    this.$nuevo_personal = $('#boton_nuevo')
    this.$nuevo_capacitacion = $('#boton_nuevo_cap')

    this.$tipo = $('#id_tipo_documento')
    this.$agrupador = $('#id_agrupador')
    this.$vigencia_inicio = $('#id_vigencia_inicio')
    this.$vigencia_fin = $('#id_vigencia_fin')
    this.$vigencia_inicio_input = $('#id_vigencia_inicio_input')
    this.$vigencia_fin_input = $('#id_vigencia_fin_input')
    this.$numero_empleado = $('#numero_empleado')

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

    this.init_Components()
}
Componentes.prototype.init_Components = function (){
    this.$tipo.select2(this.get_ConfSelect2())
    this.$agrupador.select2(this.get_ConfSelect2())
    this.$vigencia_inicio.mask("9999-99-99",{  placeholder:"aaaa/mm/dd"  })
    this.$vigencia_inicio_input.datetimepicker(this.get_DateTimePickerConfig())
    this.$vigencia_fin.mask("9999-99-99",{  placeholder:"aaaa/mm/dd"  })
    this.$vigencia_fin_input.datetimepicker(this.get_DateTimePickerConfig())

    this.$agrupadorcap.select2(this.get_ConfSelect2())
    this.$area.select2(this.get_ConfSelect2())
    this.$curso.select2(this.get_ConfSelect2())
    this.$modalidad.select2(this.get_ConfSelect2())
    this.$moneda.select2(this.get_ConfSelect2())
    this.$departamento.select2(this.get_ConfSelect2())
    this.$fecha_inicio.mask("9999-99-99",{  placeholder:"aaaa/mm/dd"  })
    this.$fecha_inicio_input.datetimepicker(this.get_DateTimePickerConfig())
    this.$fecha_fin.mask("9999-99-99",{  placeholder:"aaaa/mm/dd"  })
    this.$fecha_fin_input.datetimepicker(this.get_DateTimePickerConfig())
}
Componentes.prototype.get_ConfSelect2 = function () {
   return {
      width: '100%'
   }
}
Componentes.prototype.get_DateTimePickerConfig = function () {
    return {
        autoclose: true,
        orientation: "bottom left",
        minViewMode: 2,
        format: "yyyy-mm-dd",
    }
}
Componentes.prototype.get_Values = function (_page) {
    return {
        page: _page,
        relacion_personal__numero_empleado: this.$numero_empleado.val(),
   }
}
Componentes.prototype.get_ValuesCap = function (_page) {
    return {
        page: _page,
        relacion_capacitacion__numero_empleado: this.$numero_empleado.val(),
   }
}


/*-----------------------------------------------*\
            OBJETO: Pop up 
\*-----------------------------------------------*/

function Popup () {

    this.$id = $('#modal_nuevo')
}

function PopupCapacitacion () {

    this.$id = $('#modal_nuevo_cap')
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
    // this.$boton_nuevo_cap.on("click", this, this.mostrar_Modal) 
}
Toolbar.prototype.mostrar_Modal = function (e){
    
    popup.$id.hasClass('in')
}
Toolbar.prototype.mostrar_ModalCap = function (e){
    
    popup_cap.$id.hasClass('in')
}


/*-----------------------------------------------*\
            OBJETO: FILTRO ARCHIVOS
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
    componentes.$nuevo_capacitacion.addClass('hidden')
    componentes.$nuevo_personal.removeClass('hidden')
    $("#grid_resultados").empty()
    grid_personal.init()
}
Personalizacion.prototype.mostrar_Capacitaciones = function(e){
    
    e.data.$personales.removeClass('nova-active-tab')
    e.data.$capacitaciones.addClass('nova-active-tab')
    componentes.$nuevo_capacitacion.removeClass('hidden')
    componentes.$nuevo_personal.addClass('hidden')
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
                    return  componentes.get_Values(data.page)
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
        agrupador : { type: "string" },
        fecha : { type: "date"},
        vigencia_inicio : { type: "string" },
        vigencia_fin : { type: "string" },
        tipo_documento : { type: "string" },
        archivo : { type: "string" },
        created_by : { type: "string" },
        created_date : { type: "date" },
        object_id: { type: "integer" },
        numero_empleado: { type: "string" },
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
        { field: "pk", 
          title: " ", 
          width:"50px" ,
          template: '<a href="#=url_eliminar + numero_empleado+ "/" + pk #/expediente/eliminar/personal/" class="btn nova-btn btn-default nova-btn-delete" id="boton_nuevo"> <i class="icon icon-left icon mdi mdi-delete nova-white"></i></a>',
        },
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
                    return  componentes.get_ValuesCap(data.page)
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
        { field: "pk", 
          title: " ", 
          width:"60px" ,
          template: '<a href="#=url_eliminar + numero_empleado+ "/" + pk #/expediente/eliminar/capacitacion/" class="btn nova-btn btn-default nova-btn-delete" id="boton_nuevo"> <i class="icon icon-left icon mdi mdi-delete nova-white"></i></a>',
        },
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

