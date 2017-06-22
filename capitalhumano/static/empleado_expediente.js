/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

var url
// OBJS
var popup = null
var toolbar = null
var grid = null

/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {

    popup = new Popup()
    toolbar = new Toolbar()
    grid = new Grid()
  
})


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


function TargetaResultados(){
    this.grid = new Grid()
}


