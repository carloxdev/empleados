/*-----------------------------------------------*\
         GLOBAL VARIABLES
\*-----------------------------------------------*/

// OBJS
var tarjeta_resultados = null

/*-----------------------------------------------*\
         LOAD
\*-----------------------------------------------*/

$(document).ready(function () {

   tarjeta_resultados = new TarjetaResultados()
   if (window.matchMedia) {
      var mediaQueryList = window.matchMedia('print');
      mediaQueryList.addListener(function(mql) {
           if (mql.matches) {

               console.log("before");
           } else {
               
               console.log("after");
           }
      });
   }
})

/*-----------------------------------------------*\
         OBJETO: Tarjeta resultados
\*-----------------------------------------------*/

function TarjetaResultados() {

   this.$boton = $('#boton')
   this.$doc = new jsPDF()
   $('#content').html(), 15, 15,
   this.$doc.fromHTML($('#contenido').html(), 10, 10
   )
   this.init_Events()
}
TarjetaResultados.prototype.init_Events = function () {

   this.$boton.on("click", this, this.click_BotonExportar)
}
TarjetaResultados.prototype.click_BotonExportar = function (e) {
   alert("exportado")
   e.data.$doc.save('a4.pdf')
}
