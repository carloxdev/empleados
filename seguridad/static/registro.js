/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:

// OBJS




/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {

    tarjeta = new TarjetaUsuario()
})



/*-----------------------------------------------*\
            OBJETO: Tarjeta filtros
\*-----------------------------------------------*/

function TarjetaUsuario() {

    $('.wizard-ux').wizard();

    $(".wizard-next").click(function(e){
      var id = $(this).data("wizard");
      $(id).wizard('next');
      e.preventDefault();
    });
    
    $(".wizard-previous").click(function(e){
      var id = $(this).data("wizard");
      $(id).wizard('previous');
      e.preventDefault();
    });


    this.init_Components()
    this.init_Events()
}
TarjetaUsuario.prototype.init_Components = function () {
    
    

}
TarjetaUsuario.prototype.init_Events = function () {

}