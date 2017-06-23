/*-----------------------------------------------*\
               GLOBAL VARIABLES
\*-----------------------------------------------*/

var url_empleados_full_bypage = window.location.origin + "/api-ebs/viewempleadosfull_bypage/"
var url_expediente = window.location.origin  + "/expedientes/"

//OBJS
var tarjeta_filtros = null
var grid = null
var tarjeta_resultados = null


/*-----------------------------------------------*\
               LOAD
\*-----------------------------------------------*/

$(document).ready(function(){
   tarjeta_filtros = new TarjetaFiltros()
   tarjeta_resultados = new TargetaResultados()
   $('#div_busqueda').hide()

   // Asigna eventos a teclas
    $(document).keypress(function (e) {
        // Tecla Enter
        if (e.which == 13) {
            tarjeta_filtros.aplicar_Filtros()
        }
    })    
})

/*-----------------------------------------------*\
               OBJETO: TARJETA FILTROS
\*-----------------------------------------------*/


function TarjetaFiltros(){

   this.$pers_primer_nombre = $('#id_pers_primer_nombre')
   this.$pers_segundo_nombre = $('#id_pers_segundo_nombre')
   this.$pers_apellido_paterno = $('#id_pers_apellido_paterno')
   this.$pers_apellido_materno = $('#id_pers_apellido_materno')
   this.$grup_fase_jde= $('#id_grup_fase_jde')
   this.$asig_organizacion_clave= $('#id_asig_organizacion_clave')
   this.$pers_empleado_numero= $('#id_pers_empleado_numero')
   this.$pers_tipo_codigo = $('#id_pers_tipo_codigo')

   this.$boton_buscar = $('#boton_buscar')
   this.$boton_limpiar = $('#boton_limpiar')

   this.init_Components()
   this.init_Events()
}
TarjetaFiltros.prototype.init_Components = function () {
   this.$asig_organizacion_clave.select2(this.get_ConfSelect2())
   this.$pers_tipo_codigo.select2(this.get_ConfSelect2())
}
TarjetaFiltros.prototype.init_Events = function () {
   this.$boton_buscar.on("click", this, this.click_BotonBuscar)
   this.$boton_limpiar.on("click", this, this.click_BotonLimpiar)
}
TarjetaFiltros.prototype.get_ConfSelect2 = function () {
   return {
      width: '100%'
   }
}
TarjetaFiltros.prototype.aplicar_Filtros = function () {
    tarjeta_resultados.grid.buscar()
}
TarjetaFiltros.prototype.click_BotonBuscar = function (e) {
    // pers_empleado_numero = e.data.$pers_empleado_numero
    // var url_expediente_directo = url_expediente + pers_empleado_numero +'/expediente/'
    e.preventDefault()

    if(tarjeta_filtros.campos_Vacios() != 'True'){
      $('#div_busqueda').show()
      e.data.aplicar_Filtros()
    }
}
TarjetaFiltros.prototype.get_Values = function (_page) {
    return {
        page: _page,
        pers_primer_nombre: this.$pers_primer_nombre.val(),
        pers_segundo_nombre: this.$pers_segundo_nombre.val(),
        pers_apellido_paterno: this.$pers_apellido_paterno.val(),
        pers_apellido_materno: this.$pers_apellido_materno.val(),
        grup_fase_jde: this.$grup_fase_jde.val(),
        asig_organizacion_clave: this.$asig_organizacion_clave.val(),
        pers_tipo_codigo: this.$pers_tipo_codigo.val(),
        pers_empleado_numero: this.$pers_empleado_numero.val(),
   }
}
TarjetaFiltros.prototype.click_BotonLimpiar = function (e) {
    
    e.preventDefault()
    e.data.$pers_primer_nombre.val("")
    e.data.$pers_segundo_nombre.val("")
    e.data.$pers_apellido_paterno.val("")
    e.data.$pers_apellido_materno.val("")
    e.data.$grup_fase_jde.val("")
    e.data.$pers_empleado_numero.val("")
    e.data.$asig_organizacion_clave.data('select2').val(0)  
    e.data.$pers_tipo_codigo.data('select2').val(0) 
}
TarjetaFiltros.prototype.campos_Vacios = function (){
    bandera = 'False'
    if ((this.$pers_primer_nombre.val() == '') &&
        (this.$pers_segundo_nombre.val() == '') &&
        (this.$pers_apellido_paterno.val() == '') &&
        (this.$pers_apellido_materno.val() == '') &&
        (this.$grup_fase_jde.val() == '') &&
        (this.$pers_empleado_numero.val() == '') &&
        (this.$asig_organizacion_clave.data('select2').val() == 0) &&
        (this.$pers_tipo_codigo.data('select2').val() == 0)
      ){
      bandera = 'True'
    }
    return bandera
}


/*-----------------------------------------------*\
            OBJETO: Tarjeta resultados
\*-----------------------------------------------*/

function TargetaResultados(){
    this.grid = new Grid()
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
    return {

        serverPaging: true,
        pageSize: 10,
        transport: {
            read: {

                url: url_empleados_full_bypage,
                type: "GET",
                dataType: "json",
            },
            parameterMap: function (data, action) {
                if (action === "read"){
                    return tarjeta_filtros.get_Values(data.page)
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
Grid.prototype.get_Campos = function () {

    return {
        pers_primer_nombre : { type: "string" },
        pers_segundo_nombre : { type: "string" },
        pers_apellido_paterno : { type: "string"},
        pers_apellido_materno : { type: "string" },
        grup_fase_jde : { type: "string" },
        asig_organizacion_clave : { type: "string" },
        pers_tipo_codigo : { type: "number" },
        pers_empleado_numero : { type: "string" },
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
            template: "<div class='grid-empty'> No se encontraron registros </div>"
        },
        dataBound: this.set_Icons,
    }
}
Grid.prototype.get_Columnas = function () {

    return [  
        { field: "pers_empleado_numero", 
          title: "No. de empleado", 
          width:"150px" ,
          template: '<a href="#=url_expediente + pers_empleado_numero #/expediente/">#=pers_empleado_numero#</a>',
        },
        { field: "pers_primer_nombre", title: "Primer nombre", width:"170px"},
        { field: "pers_segundo_nombre", title: "Segundo Nombre", width:"150px" },
        { field: "pers_apellido_paterno", title: "Apellido paterno", width:"200px" },
        { field: "pers_apellido_materno", title: "Apellido materno", width:"200px" },
        { field: "grup_fase_jde", title: "Centro de costos", width:"170px" },
        { field: "pers_tipo_desc", title: "Tipo empleado", width:"170px" },
        { field: "asig_organizacion_desc", title: "Organizacion", width:"200px" },

    ]
}
Grid.prototype.buscar = function() {
    this.kfuente_datos.page(1)
}
