

// OBJS
var caja_texto = null

/*-----------------------------------------------*\
                        LOAD
\*-----------------------------------------------*/

$(document).ready(function () {
        caja_texto = new CajaTexto()
    })

function CajaTexto (){
	$('#id_contenido').summernote({
	  disableDragAndDrop: false,
	  fontNames: ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New'],
	  toolbar: [
	    ['style', ['bold', 'italic', 'underline', 'clear','fontname']],
	    ['para', ['ul', 'ol', 'paragraph']],
	    ['table', ['table']],
	  ]
	})
}



