/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:
//var url_incidencia= window.location.origin + "/api/incidenciadocumento/"


// OBJS
var IncidenciaNuevo = null


/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {

    incidencianuevo = new IncidenciaNuevo()
})

/*-----------------------------------------------*\
            OBJETO: incidencia
\*-----------------------------------------------*/


function IncidenciaNuevo(){
    this.$tipo = $('#tipo')
    this.$es_registrable = $('#es_registrable')
    this.$empleado_id = $('#empleado_id')
    this.$empleado_nombre = $('#empleado_nombre')
    this.$empleado_zona = $('#empleado_zona')
    this.$empleado_proyecto = $('#empleado_proyecto')
    this.$empleado_proyecto_desc = $('#empleado_proyecto_desc')
    this.$empleado_puesto= $('#empleado_puesto')
    this.$empleado_puesto_desc= $('#empleado_puesto_desc')
    this.$empleado_un= $('#empleado_un')
    this.$empleado_organizacion= $('#empleado_organizacion')
    this.$area_id= $('#area_id')
    this.$area_descripcion= $('#area_descripcion')
    this.$lugar= $('#lugar')
    this.$dias_incapcidad= $('#dias_incapcidad')
    this.$centro_atencion= $('#centro_atencion')
    this.$acr= $('#acr')
    this.$status= $('#status')
    this.$boton_guardar = $('#id_boton_guardar')

    this.init_Events()

}

IncidenciaNuevo.prototype.init_Events = function () {

    // Asosciar Eventos
    this.$boton_buscar.on("click", this, this.click_BotonBuscar)
}
IncidenciaNuevo.prototype.click_BotonBuscar = function (e) {

    e.preventDefault()

    tipo = e.data.$tipo.val()
    es_registrable = e.data.$es_registrable.val()
    //fecha = "2017"
    empleado_id = e.data.$empleado_id.val()
    empleado_nombre = e.data.$empleado_nombre.val()
    empleado_zona = e.data.$empleado_zona.val()
    empleado_proyecto = e.data.$empleado_proyecto.val()
    empleado_proyecto_desc = e.data.$empleado_proyecto_desc.val()
    empleado_puesto= e.data.$empleado_puesto.val()
    empleado_puesto_desc= e.data.$empleado_puesto_desc.val()
    empleado_un= e.data.$empleado_un.val()
    empleado_organizacion= e.data.$empleado_organizacion.val()
    area_id= e.data.$area_id.val()
    area_descripcion= e.data.$area_descripcion.val()
    lugar= e.data.$lugar.val()
    dias_incapcidad= e.data.$dias_incapcidad.val()
    centro_atencion= e.data.$centro_atencion.val()
    acr= e.data.$acr.val()
    status= e.data.$status.val()

    var csrftoken = $("[name=csrfmiddlewaretoken]").val()

    $.ajax({
            headers: { "X-CSRFToken": csrftoken },
            url: url_incidencia,
            method: "POST",
            data: {
                "tipo": tipo,
                "empleado_nombre": empleado_nombre,
                "empleado_zona": empleado_zona,
                "empleado_proyecto_desc": empleado_proyecto_desc,
                "empleado_puesto_desc": empleado_puesto_desc,
                "empleado_un": empleado_un,
                "empleado_organizacion": empleado_organizacion,
                "area_descripcion": area_descripcion,
                "lugar": lugar,
                "dias_incapcidad": dias_incapcidad,
                "centro_atencion": centro_atencion,
                "status": status,

            },
            success: function (){
              
                alertify.success("Se ha guardado la Incidencia")
                window.location.href = url_incidencia_lista
                alert(url_incidencia_lista)
            },
            error: function(e){
                alertify.error("Error "+ e.status + " . No se guardó el registro")
            }
           
                    
        });

}


