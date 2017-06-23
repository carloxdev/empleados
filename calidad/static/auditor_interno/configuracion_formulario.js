/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:api-
//var url_empleados_bypage = window.location.origin + "/api-ebs/viewempleadosfull_bypage/"

// OBJS
var fomulario = null

/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {
    
    fomulario = new Formulario()
})

/*-----------------------------------------------*\
            OBJETO: Tarjeta filtros
\*-----------------------------------------------*/

function Formulario() {

    this.$id_proceso = $("#id_proceso")
    this.$id_responsable = $('#id_responsable')
    
    this.init_Components()
    this.init_Events()
}
Formulario.prototype.init_Components = function () {

    this.$id_proceso.select2(appnova.get_ConfigSelect2())
    this.$id_responsable.multiSelect(this.get_ConfMultiselect())
}
Formulario.prototype.get_ConfMultiselect = function () {
    
    return {
        selectableHeader: "<input type='text' class='form-control search-input' autocomplete='off' placeholder='Búscar en EBS'>",
        selectionHeader: "<input type='text' class='form-control search-input' autocomplete='off' placeholder='Búscar'>",
        afterInit: function(ms){
            var that = this,
                $selectableSearch = that.$selectableUl.prev(),
                $selectionSearch = that.$selectionUl.prev(),
                selectableSearchString = '#'+that.$container.attr('id')+' .ms-elem-selectable:not(.ms-selected)',
                selectionSearchString = '#'+that.$container.attr('id')+' .ms-elem-selection.ms-selected'

            that.qs1 = $selectableSearch.quicksearch(selectableSearchString)
            .on('keydown', function(e){
                if (e.which === 40){
                    that.$selectableUl.focus()
                    return false
                }
            })

            that.qs2 = $selectionSearch.quicksearch(selectionSearchString)
            .on('keydown', function(e){
                if (e.which == 40){
                    that.$selectionUl.focus()
                    return false
                }
            })
        },
        afterSelect: function(){
            this.qs1.cache()
            this.qs2.cache()
          },
        afterDeselect: function(){
            this.qs1.cache()
            this.qs2.cache()
          }
    }
}
Formulario.prototype.init_Events = function () {

}
Formulario.prototype.click_BotonGuardar = function (e) {
    
    e.preventDefault()
}