/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

var url_expediente = window.location.origin  + "/expedientes/"
var url_expediente_personal_bypage = window.location.origin + "/api-capitalhumano/personal_bypage/"
var url_archivo_personal_excel = window.location.origin + "/api-capitalhumano/personal/"
// var url_expediente_personal_bypage = window.location.origin  + "/api-capitalhumano/archivopersonal_bypage/"
// var url_archivo_personal_excel = window.location.origin  + "/api-capitalhumano/archivopersonal/"

//OBJS
var tarjeta_filtro = null
var grid = null
var toolbar = null
var tarjeta_resultados = null
var popup = null
var popup_informacion_personal = null


/*------------------------------------------------*\  
            LOAD
\*-----------------------------------------------*/

$(document).ready(function(){
     tarjeta_filtro = new TarjetaFiltros()
     tarjeta_resultados = new TarjetaResultados()

     // Asigna eventos a teclas
        $(document).keypress(function (e) {
                // Tecla Enter
                if (e.which == 13) {
                    tarjeta_resultados.grid.buscar()
                    tarjeta_resultados.popup.hidden_Modal()
                }
        })    
})

/*-----------------------------------------------*\
            OBJETO: TARJETA FILTRO EMPLEADOS
\*-----------------------------------------------*/


function TarjetaFiltros(){

    this.$asig_organizacion_clave = $('#id_asig_organizacion_clave')
    this.$tipo_documento = $('#id_tipo_documento')
    this.$agrupador = $('#id_agrupador')
    this.$numero_empleado = $('#id_numero_empleado')
    this.$estatus = $('#id_estatus')

    this.$boton_buscar = $('#boton_buscar')
    this.$boton_limpiar = $('#boton_limpiar')

    this.init_Components()
    this.init_Events()
}
TarjetaFiltros.prototype.init_Components = function () {

    this.$numero_empleado.select2(appnova.get_ConfigSelect2())
    this.$asig_organizacion_clave.select2(appnova.get_ConfigSelect2())
    this.$tipo_documento.select2(appnova.get_ConfigSelect2())
    this.$agrupador.select2(appnova.get_ConfigSelect2())
    this.$estatus.select2(appnova.get_ConfigSelect2())
}
TarjetaFiltros.prototype.init_Events = function () {

     this.$boton_buscar.on("click", this, this.click_BotonBuscar)
     this.$boton_limpiar.on("click", this, this.click_BotonLimpiar)
}
TarjetaFiltros.prototype.click_BotonBuscar = function (e) {

        e.preventDefault()

        if(tarjeta_filtro.validar_Campos() != 'True'){
            tarjeta_resultados.grid.buscar()
            tarjeta_resultados.popup.hidden_Modal()
        }
}
TarjetaFiltros.prototype.get_Values = function (_page) {
    
        return {
                page: _page,
                tipo_documento_organizacion: this.$asig_organizacion_clave.val(),
                tipo_documento: this.$tipo_documento.val(),
                agrupador: this.$agrupador.val(),
                numero_empleado: this.$numero_empleado.val(),
                tipo_documento_estatus: this.$estatus.val(),
     }
}
TarjetaFiltros.prototype.get_Values_Excel = function () {
    
        return {
                tipo_documento_organizacion: this.$asig_organizacion_clave.val(),
                tipo_documento: this.$tipo_documento.val(),
                agrupador: this.$agrupador.val(),
                numero_empleado: this.$numero_empleado.val(),
                tipo_documento_estatus: this.$estatus.val(),
     }
}
TarjetaFiltros.prototype.validar_Campos = function (){

        bandera = 'False'
        if ((this.$asig_organizacion_clave.val() == '') &&
                (this.$tipo_documento.val() == '') &&
                (this.$agrupador.val() == '') &&
                (this.$numero_empleado.val() == '') &&
                (this.$estatus.val() == 0)
            ){
            bandera = 'True'
        }
        return bandera
}
TarjetaFiltros.prototype.click_BotonLimpiar = function (e) {
        
        e.preventDefault()
        e.data.$asig_organizacion_clave.data('select2').val(0)
        e.data.$numero_empleado.data('select2').val(0)
        e.data.$tipo_documento.data('select2').val(0)  
        e.data.$agrupador.data('select2').val(0)
        e.data.$estatus.data('select2').val(0)
}

/*-----------------------------------------------*\
            OBJETO: Tarjeta resultados
\*-----------------------------------------------*/

function TarjetaResultados(){
    this.grid = new Grid()
    this.popup = new Popup()
    this.toolbar = new Toolbar()
    this.popup_informacion_personal = new PopupInformacionPersonal()
}

/*-----------------------------------------------*\
            OBJETO: Tarjeta resultados
\*-----------------------------------------------*/

function Toolbar(){

    this.$boton_exportar = $('#id_exportar')

    this.init_Events()
}
Toolbar.prototype.init_Events = function (e) {

    this.$boton_exportar.on("click", this, this.click_BotonExportar)
}
Toolbar.prototype.Inicializar_CeldasExcel = function (e) {

    if (tarjeta_resultados.grid.get_Columnas != null)
    {
        if (tarjeta_resultados.grid.get_Columnas.length != 1) {
            tarjeta_resultados.grid.get_Columnas.length = 0;
        }
    }

    this.kRows = [{
        cells: this.get_Celdas()
    }]
}
Toolbar.prototype.click_BotonExportar = function (e) {

    if( tarjeta_filtro.validar_Campos() != 'True'){
        tarjeta_resultados.grid.leer_Datos()
        e.data.Inicializar_CeldasExcel()

        tarjeta_resultados.grid.kfuente_datos_excel.fetch(function () {

            var data = this.data();
            for (var i = 0; i < data.length; i++) {

                    e.data.kRows.push({
                        cells: e.data.get_Registros_Excel(data[i])
                    })
            }
            var workbook = new kendo.ooxml.Workbook({
                    sheets: [
                        {
                            columns: e.data.get_Columnas_Excel_Ancho(),
                            title: "ListaDocumentoPersonal",
                            rows: e.data.kRows
                        }
                    ]
                });
            kendo.saveAs({
                dataURI: workbook.toDataURL(),
                fileName: "ListaDocumentoPersonal.xlsx",
            });
        })
    }
}
Toolbar.prototype.get_Columnas_Excel_Ancho = function () {
    
    var columnas_excel = []
    var columnas = this.get_Formato_Columnas()

    for (var i=0; i < columnas.length; i++) {
        columnas_excel.push({ autoWidth: true })
    }
    return columnas_excel
}
Toolbar.prototype.get_Formato_Columnas = function () {
    
    var columnas = tarjeta_resultados.grid.get_Columnas()
    var columnas_formateadas = []

    $.each(columnas, function (index) {
        $.each(this, function (name) {
            if (name === 'field'){
                columnas_formateadas.push(columnas[index])
            }
        })
    })
    return columnas_formateadas
}
Toolbar.prototype.get_Celdas = function () {
    
    var celdas = []
    var columnas = this.get_Formato_Columnas()

    for (var i=0; i < columnas.length; i++) {
        campo = columnas[i].title
        celdas.push({ value: campo })
    }
    return celdas
}
Toolbar.prototype.get_Registros_Excel = function (data) {
    
    var registros = []
    var columnas = this.get_Formato_Columnas()

    for (var i=0; i < columnas.length; i++) {
        campo = columnas[i].field
        registros.push({ value: data[campo] })
    }
    return registros
}

/*-----------------------------------------------*\
            OBJETO: Popup
\*-----------------------------------------------*/

function Popup(){
    this.$modal = $('#modal_filtro')
}
Popup.prototype.hidden_Modal = function () {

   this.$modal.modal('hide')
}

/*-----------------------------------------------*\
        OBJETO: Pop up informacion personal
\*-----------------------------------------------*/

function PopupInformacionPersonal(){
    this.$modal_informacion = $('#modal_ver_informacion')
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
          url: url_expediente_personal_bypage + _id +"/",
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

    this.$contenido.append("<a href='"+ _url_archivo +"' target='_blank'> Archivo No."+_numero+" : "+_nombre_documento+" </a><br>")

}
PopupInformacionPersonal.prototype.hidden_Modal = function (e) {

     e.data.$modal_informacion.modal('hide')
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
        this.kfuente_datos_excel = new kendo.data.DataSource(this.get_FuenteDatosExcel())
        
        // Se inicializa y configura el grid:
        this.kgrid = this.$id.kendoGrid(this.get_Configuracion())
}
Grid.prototype.get_DataSourceConfig = function () {

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
                                        return tarjeta_filtro.get_Values(data.page)
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
                pk: { type: "integer" },
                organizacion : { type: "string" },
                nombre_completo : { type: "string" },
                tipo_documento : { type: "string" },
                agrupador : { type: "string"},
                numero_empleado : { type: "string" },
                relacion : { type: "string" },
                vigencia_inicio : { type: "string" },
                vigencia_fin : { type: "string" },
                created_by : { type: "string" },
                created_date : { type: "date" },
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
                        template: "<div class='nova-grid-empy'> No se encontraron registros </div>"
                },
                dataBound: this.aplicar_Estilos,
        }
}
Grid.prototype.get_Columnas = function () {

        return [ 
                {   title: " ", 
                    width:"50px" ,
                    template: '<a class="btn btn-default nova-url" href="\\#modal_ver_informacion" data-toggle="modal" data-event="ver-personal" id="#=pk#"><i class="icon icon-left icon mdi mdi-file icon-black"></i></a>',
                }, 
                { field: "numero_empleado", 
                    title: "No. de empleado", 
                    width:"120px" ,
                    template: '<a class="btn btn-default nova-url" href="#=url_expediente + numero_empleado #/expediente/">#=numero_empleado#</a>',
                },
                { field: "nombre_completo", title: "Nombre", width:"200px" },
                { field: "tipo_documento", title: "Tipo documento", width:"150px" },
                { field: "agrupador", title: "Agrupador", width:"100px" },
                { field: "vigencia_inicio",title: "Vigencia inicio",width:"100px"},
                { field: "vigencia_fin", title: "Vigencia fin", width:"100px" },
                { field: "organizacion", title: "Organizacion", width:"200px" },
                { field: "created_by", title: "Creado por", width:"150px" },
                { field: "created_date", title: "Fecha de creación", width:"150px", format: "{0:dd/MM/yyyy}" },

        ]
}
Grid.prototype.buscar = function() {

        this.kfuente_datos.page(1)
}
Grid.prototype.aplicar_Estilos = function (e) {

    e.sender.tbody.find("[data-event='ver-personal']").each(function(idx, element){
      $(this).on("click", function(){
        tarjeta_resultados.popup_informacion_personal.$contenido.empty()
        tarjeta_resultados.popup_informacion_personal.consultar_Registro(this.id)
      })
    })

    columns = e.sender.columns
    dataItems = e.sender.dataSource.view()
    fecha_hoy = new Date()
    fecha_por_vencer = tarjeta_resultados.grid.sumar_Dias(new Date(), 90)

    for (var j = 0; j < dataItems.length; j++) {
        fecha_vencimiento = dataItems[j].get("vigencia_fin")
        fecha = tarjeta_resultados.grid.convertir_Fecha(fecha_vencimiento)
        row = e.sender.tbody.find("[data-uid='" + dataItems[j].uid + "']")
        row.removeClass("k-alt");
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
Grid.prototype.sumar_Dias = function (fecha, dias){

  fecha.setDate(fecha.getDate() + dias);
  return fecha;
}
Grid.prototype.convertir_Fecha = function (_fecha){
    año = _fecha.split("/")[2]
    mes = _fecha.split("/")[1]
    dia = _fecha.split("/")[0]
    fecha_formateada = año+"-"+mes+"-"+dia
    fecha = new Date(fecha_formateada)
    return fecha
}
Grid.prototype.leer_Datos = function() {
    
    this.kfuente_datos_excel.read()
}
Grid.prototype.get_FuenteDatosExcel = function (e) {

    return {

        transport: {
            read: {

                url: url_archivo_personal_excel,
                type: "GET",
                dataType: "json",
            },
            parameterMap: function (data, action) {
                if (action === "read") {

                    return tarjeta_filtro.get_Values_Excel()
                }
            }
        },

        schema: {
            model: {
                fields: this.get_Campos()
            }
        },
        error: function (e) {
            alertify.error("Status: " + e.status + "; Error message: " + e.errorThrown)
        },
    }
}