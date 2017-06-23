/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS
var url_eliminar = window.location.origin + "/api-sgi/incidenciaarchivo/"

// OBJS
var item = null


/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function(){
	
	item = new TargetaItem()
})



/*-----------------------------------------------*\
            OBJETO: Targeta Item
\*-----------------------------------------------*/

function TargetaItem() {

	this.init()
}
TargetaItem.prototype.init = function () {

	// aplica evento a todos los items:
	$("[data-action]").on('click', this, this.eliminar)
}
TargetaItem.prototype.eliminar = function (e) {

	var id = e.currentTarget.dataset.action

	var url = url_eliminar + id + "/"

	alert(id)
	console.log("entro")
	console.log(url)

	$.ajax({
		url: url,
		headers: { "X-CSRFToken": appnova.galletita },
		method: "DELETE",
		success: function (response) {

			e.data.remover(id)
		},
		error: function(response){
			alertify.error("Ocurrio error al eliminar")
		}                    
	})
}
TargetaItem.prototype.remover = function (_id) {

	nodo = $("#" + _id)
	nodo.remove()
}







