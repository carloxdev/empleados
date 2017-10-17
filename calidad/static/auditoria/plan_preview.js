/*-----------------------------------------------*\
         GLOBAL VARIABLES
\*-----------------------------------------------*/

// OBJS
var tarjeta_resultados = null

/*-----------------------------------------------*\
         LOAD
\*-----------------------------------------------*/

// var bottom = 0; /* Position of first page number - 0 for bottom of first page */
// var pagNum = 2; /* First sequence - Second number */

$(document).ready(function () {

   tarjeta_resultados = new TarjetaResultados()
   /* For each 10 paragraphs, this function: clones the h3 with a new page number */
	//   $("p:nth-child(10n)").each(function() {
	//     bottom -= 100;
	//     botString = bottom.toString();
	//     var $counter = $('h3.pag1').clone().removeClass('pag1');
	//     $counter.css("bottom", botString + "vh");
	//     numString = pagNum.toString();
	//     $counter.addClass("pag" + numString);
	//     ($counter).insertBefore('.insert');
	//     pagNum = parseInt(numString);
	//     pagNum++; /* Next number */
	//   });

   // for (var i = 1; i < 2; i++) {
   //    bottom -= 90;
	//     botString = bottom.toString();
	//     var $counter = $('h3.pag1').clone().removeClass('pag1');
	//     $counter.css("bottom", botString + "vh");
	//     numString = pagNum.toString();
	//     $counter.addClass("pag" + numString);
	//     ($counter).insertBefore('.insert');
	//     pagNum = parseInt(numString);
	//     pagNum++; /* Next number */
   // }
	//   var pagTotal = $('.pag').length; /* Gets the total amount of pages by total classes of paragraphs */
	//   pagTotalString = pagTotal.toString();
	//   $("h3[class^=pag]").each(function() {
	//     /* Gets the numbers of each classes and pages */
	//     var numId = this.className.match(/\d+/)[0];
	//     document.styleSheets[0].addRule('h3.pag' + numId + '::before', 'content: "Page ' + numId + ' of ' + pagTotalString + '";');
	//   });

})

/*-----------------------------------------------*\
         OBJETO: Tarjeta resultados
\*-----------------------------------------------*/

function TarjetaResultados() {

   var pt = this.get_Pixeles(34) //Definir el espacio usado como margenes o padding para top en mm
   var pb = this.get_Pixeles(30) //Definir el espacio usado como margenes o padding para bottom en mm

   console.log(pt)
   console.log(pb)
   window.print()
}
TarjetaResultados.prototype.get_Pixeles = function (mm) {

   return mm / 0.264583
}
