GridPrincipal.prototype.init = function () {

    kendo.culture("es-MX")
    this.kfuente_datos = new kendo.data.DataSource(this.get_FuenteDatosConfig())

    this.kGrid = this.$id.kendoGrid(this.get_Config())

}
GridPrincipal.prototype.ocultar_Botones = function () {

    var grid = this.kGrid.data("kendoGrid")
    grid.hideColumn(3)
}
GridPrincipal.prototype.get_Config = function () {

    return {
        dataSource: this.kfuente_datos,
        columnMenu: false,
        groupable: false,
        sortable: false,
        editable: false,
        resizable: true,
        selectable: true,
        scrollable: false,
        columns: this.get_Columnas(),
        scrollable: true,
        pageable: true,
        noRecords: {
            template: "<div class='grid-empy'> No se encontraron registros </div>"
        },  
        dataBound: this.set_Icons,      
    }
}
GridPrincipal.prototype.get_Campos = function (e) {

    return {
        articulo_clave: { type: "string" },
        cantidad: { type: "string" },
        
    }
}
GridPrincipal.prototype.get_Columnas = function (e) {

    return [
        { field: "articulo_clave" , title: "Articulo"},
        { field: "cantidad" , title: "Cantidad" },
        { field: "articulo_udm", title: "Unidad de Medida"},
        
        {
           command: [ 
                {
                   text: " Eliminar",
                   click: this.click_BotonEliminar,
                   className: "boton_eliminar fa fa-trash-o"
                },   
                             
            ],           
           title: " ",
           width: "120px"
        },
    ]
}
GridPrincipal.prototype.click_BotonEliminar = function (e) {
    
    var fila = this.dataItem($(e.currentTarget).closest('tr'))
    
    alertify.confirm(
        'Eliminar Registro',
        '¿Desea eliminar esta fila?', 

        function () {

            var url = url_grid + fila.pk + "/"

            $.ajax({
                url: url,
                method: "DELETE",
                success: function () {
                alertify.success("Se eliminó registro correctamente")

                targeta_detalles.grid.kfuente_datos.remove(fila)
                        
                },
                error: function () {
                        
                    alertify.error("Ocurrió un error al eliminar")
                }
            })
        }, 
        null
    )  
    
}
GridPrincipal.prototype.set_Icons = function (e) {

    e.sender.tbody.find(".k-button.fa.fa-trash-o").each(function(idx, element){
        $(element).removeClass("fa fa-trash-o").find("span").addClass("fa fa-trash-o")
    })
    
}
TargetaFormulario.prototype.get_Filtros = function (_page, _pageSize) {

    return {
        page: _page,
        pageSize: _pageSize,
        cabecera: 1,

    }
}
GridPrincipal.prototype.get_FuenteDatosConfig = function (e) {

    return {

        serverPaging: true,
        pageSize: 10,
        transport: {
            read: {

                url: url_grid,
                type: "GET",
                dataType: "json",

            },
            parameterMap: function (data, action) {
                if (action === "read") {

                    return targeta_formulario.get_Filtros(data.page, data.pageSize)
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
            alert("Status: " + e.status + "; Error message: " + e.errorThrown)
        },
    }
}