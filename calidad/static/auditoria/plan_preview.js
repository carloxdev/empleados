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
})

/*-----------------------------------------------*\
         OBJETO: Tarjeta resultados
\*-----------------------------------------------*/

function TarjetaResultados() {

   this.$texto_dinamico = $('#texto-dinamico')
   this.$contenido = $('#contenido')
   this.$mt = this.get_Pixeles(34) //Definir el espacio usado como margen para top en mm
   this.$mb = this.get_Pixeles(30) //Definir el espacio usado como margen para bottom en mm
   console.log(this.get_TextoDinamico())
   this.set_NumeroPaginas()
   window.print()
}
TarjetaResultados.prototype.get_Pixeles = function (mm) {

   return mm / 0.264583
}
TarjetaResultados.prototype.get_TextoDinamico = function () {

   var totalHeight = 0
   var espacio_ocupado = 0
   var espacio_total = 1056   //Espacio total del pdf en pixeles
   var espacio_disponible = espacio_total - (this.$mt + this.$mb)


   this.$texto_dinamico.find('.nova-dinamic').each(function(index, element) {

      if ((espacio_ocupado + $(element).outerHeight( true )) > espacio_disponible) {
         //antes del elemento actual, inserta un salto de linea. Porque el elemento actual es el que sobresalta espacio disponible
         $(element).before('<div class="page-break"></div><div class="nova-pdf-header-fix"></div><div class="calidad-paginado"> de </div>'); // insertar un div con el alto del footer
         espacio_ocupado = 0  //Despues de un salto de pagina reestablece la altura del espacio ocupado
      }

      //Acumula altura de los elementos que ocupan espacio para impresion
      totalHeight += $(element).outerHeight( true ) //Solo esta para proposito informativo, no interviene en la funcion
      espacio_ocupado += $(element).outerHeight( true )
   })

   return totalHeight;
}
TarjetaResultados.prototype.set_NumeroPaginas = function () {

   var total_paginas = this.$contenido.find('.calidad-paginado').size()

   this.$contenido.find('.calidad-paginado').each(function(index, element) {
      var pagina = index + 1
      $(element).html( pagina + " de " + total_paginas)
   })
}
