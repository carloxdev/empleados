/*-----------------------------------------------*\
         GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:ebs/
var url_empleados_full = window.location.origin + "/api-ebs/viewempleadosfull/"
var url_empledos_grado_academico = window.location.origin + "/api-ebs/viewempleadosgrado/"

// OBJS
var indicadores = null
var indicador_total = null
var indicador_grado = null
var indicador_estado_civil=null
var indicador_rango_edad=null
var indicador_sexo=null
var indicador_organizacion = null
var indicador_antiguedad = null

/*-----------------------------------------------*\
         LOAD
\*-----------------------------------------------*/

$(document).ready(function () {
   indicadores = new Indicadores()
   indicador_total = new IndicadorTotal()
   indicador_grado = new IndicadorGradoAcademico()
   indicador_estado_civil = new IndicadorEstadoCivil()
   indicador_rango_edad = new IndicadorRangoEdad()
   indicador_sexo = new IndicadorSexo()
   indicador_organizacion = new IndicadorOrganizacion()
   indicador_antiguedad = new IndicadorAntiguedad()
})

/*-----------------------------------------------*\
         OBJETO: INDICADORES
\*-----------------------------------------------*/

function Indicadores () {

   this.$organizaciones = $('#id_organizaciones')
   this.$spark1 = $('#spark1')
   this.$spark2 = $('#spark2')
   this.$spark3 = $('#spark3')
   this.$contenedor_graficas = $('#contenedor_graficas')

   this.buscar_Empleados()
   this.init_Components()
   this.init_Events()
}
Indicadores.prototype.init_Components = function () {

   sparks = this.get_ConfSparkLine()
   this.$spark1.sparkline([0,5,3,7,5,10,3,6,5,10],sparks[0])
   this.$spark2.sparkline([2,3,4,5,4,3,2,3,4,5,6,5,4,3,4,5,6,5,4,4,5,10,10],sparks[1])
   this.$spark3.sparkline([2,3,0,5,4,4,5,10,10,10,6,5,4,3,0,5,6,5,4,4,5],sparks[2])
   this.$organizaciones.select2(this.get_ConfSelect2())
}
Indicadores.prototype.get_ConfSelect2 = function () {
    return {
        width: '100%'
    }
}
Indicadores.prototype.get_ConfSparkLine = function (){

   var spark = []
   spark[0] = {
               width: '85',
               height: '35',
               lineColor: '#0080FF',
               highlightSpotColor: '#0080FF',
               highlightLineColor: '#0080FF',
               fillColor: false,
               spotColor: false,
               minSpotColor: false,
               maxSpotColor: false,
               lineWidth: 1.15
         }
   spark[1] = {
              type: 'discrete',
              width: '85',
              height: '35',
              lineHeight: 20,
              lineColor: '#3ADF00',
              xwidth: 18
         }
   spark[2] = {
              type: 'discrete',
              width: '85',
              height: '35',
              lineHeight: 20,
              lineColor: '#FF8000',
              xwidth: 18
         }
   return spark
}
Indicadores.prototype.init_Events = function () {

   this.$organizaciones.on("change", this, this.buscar_Empleados)
}
Indicadores.prototype.buscar_Empleados = function (e) {
   if(e){
      organizacion = e.data.$organizaciones.val()
      e.data.$contenedor_graficas.find('#panel_mensaje_sin_empleados').remove()
   }
   else{
      organizacion = this.$organizaciones.val()
      this.$contenedor_graficas.find('#panel_mensaje_sin_empleados').remove()
   }
   
   $.ajax({
         url: url_empleados_full,
         method: "GET",
         dataType: "json",
         data: {
            asig_organizacion_clave:organizacion
         },
         success: function (response) {
               //Total de empleados
               total = indicador_total.get_Total(response, organizacion)

               indicadores.mostrar_Mensaje(total)

               indicadores. ocultar_Graficas(total, organizacion)

               //Rotacion de empleados
               indicadores.indicador_Rotacion(response, organizacion)

               //Distribucion por grado de estudios
               indicador_grado.buscar_GradoAcademico(organizacion)

               //Disribucion por estado civil
               indicador_estado_civil.get_EstadoCivil(response, organizacion)

               //Disribucion por rango de edad
               indicador_rango_edad.get_RangoEdad(response, organizacion)

               //Disribucion por sexo
               indicador_sexo.get_Sexo(response, organizacion)

               //Distribución por antiguedad
               indicador_antiguedad.get_EmpleadoAntiguedad(response)

            if(organizacion == ""){
               $('#container-organizacion').show()
               //Disribucion por organizacion
               indicador_organizacion.get_EmpleadoOrganizacion(response)
            }
            else{
               $('#container-organizacion').hide()
            }

         },
         error: function (response) {
            alertify("Ocurrio error al consultar")
         }
   })
}
Indicadores.prototype.indicador_Rotacion = function (_response, _organizacion) {

   dato_rotacion = 0 //indicador_total.get_Rotacion(_response)
   $('#resultado_rotacion').text(dato_rotacion)
}
Indicadores.prototype.mostrar_Mensaje = function (_total) {

   if(_total == 0){
      this.$contenedor_graficas.append(
         '<div class="row wizard-row" id="panel_mensaje_sin_empleados">' +

            '<div class="col-sm-12">' +
               '<div class="nova-panel-mensaje nova-contenido-borde">' +
               '<h3>La organización no cuenta con empleados</h3>'+
               '</div>' +
            '</div>'+

         '</div>'
      )
   }
}
Indicadores.prototype.ocultar_Graficas = function (_total, _organizacion){

   if(total==0){
      $('#container-total').hide()
      $('#container-rotacion-total').hide()
      $('#container-rotacion-renuncia').hide()
      $('#container-grado').hide()
      $('#container-estado').hide()
      $('#container-edad').hide()
      $('#container-sexo').hide()
      $('#container-antiguedad').hide()
   }else if((total=!0) || (_organizacion == "")){
      $('#container-total').show()
      $('#container-rotacion-total').show()
      $('#container-rotacion-renuncia').show()
      $('#container-grado').show()
      $('#container-estado').show()
      $('#container-edad').show()
      $('#container-sexo').show()
      $('#container-antiguedad').show()

   }
}

/*-----------------------------------------------*\
         OBJETO: INDICADOR TOTAL DE EMPLEADOS
\*-----------------------------------------------*/

function IndicadorTotal () {}
IndicadorTotal.prototype.get_Total= function (_response, _organizacion) {
   // Empleados activos, inactivos
   var total = 0
   for (var i = 0; i < _response.length; i++) {
      //Excluye aquellos empleados que esten inactivos
      if ((_response[i].pers_tipo_codigo != '1123') &&
         (_response[i].pers_tipo_codigo != '1124') &&
         (_response[i].pers_tipo_codigo != '1125') &&
         (_response[i].pers_tipo_codigo != '1118')){
            total+=1
      }
   }
   this.animacion_Resultado(total)
   return total
}
IndicadorTotal.prototype.animacion_Resultado = function (_total){
   var numAnim = new CountUp('resultado-total-ac', 0, _total, 0, 3)
   if (!numAnim.error) {
       numAnim.start();
   } else {
       console.error(numAnim.error);
   }
}


/*-----------------------------------------------*\
         OBJETO: INDICADOR POR GRADO DE ESTUDIOS
\*-----------------------------------------------*/

function IndicadorGradoAcademico () {}
IndicadorGradoAcademico.prototype.buscar_GradoAcademico = function (_organizacion){

   $.ajax({
         url: url_empledos_grado_academico ,
         method: "GET",
         success: function (response) {

             // Empleados por grado de estudios
            empleado_grado = indicador_grado.get_EmpleadoGrado(response, _organizacion)
            // Grados de estudios existentes
            grado_estudios = indicador_grado.ordena_GradoEstudios(response)

            Highcharts.chart('container-grado',
               indicador_grado.get_IndicadorConfig(grado_estudios,empleado_grado))

         },
         error: function (response) {
            alertify("Ocurrio error al consultar")
         }
   })
}
IndicadorGradoAcademico.prototype.get_EmpleadoGrado = function (_response, _organizacion) {
   // Contiene num de empleados por grado academico
   var num = []
   //Contiene grados academicos(SIN REPETIR)
   dato = indicador_grado.ordena_GradoEstudios(_response)

   for (var i = 0; i < dato.length; i++) {
      num[i] = 0
      for(var j=0; j < _response.length; j++){
         if((_response[j].asig_organizacion_id == _organizacion) || (_organizacion == 0)){
            if(dato[i] == _response[j].qua_grado_academico){

               num [i] +=1
            }
         }
      }
   }
   return num
}
IndicadorGradoAcademico.prototype.asigna_GradoEstudios = function(_response) {
   //Coloca en un array los grados academicos (REPETIDAS)
   var grados_estudios = []
   var cont = 0

   for (var i = 0; i < _response.length; i++) {
      if(_response[i].qua_grado_academico != ""){
         grados_estudios[cont] = _response[i].qua_grado_academico
         cont+=1
      }
   }
   return grados_estudios
}
IndicadorGradoAcademico.prototype.ordena_GradoEstudios = function(_response) {
   //Coloca en un array los grados academicos existentes(SIN REPETIRSE)
   var grado = [];
   var grados_estudios = indicador_grado.asigna_GradoEstudios(_response)

   for(var i = 0; i < grados_estudios.length; i++) {
      if (grado.indexOf(grados_estudios[i]) == -1) {
         grado.push(grados_estudios[i]);
      }
   }
   return grado
}
IndicadorGradoAcademico.prototype.get_IndicadorConfig = function (_grados,_empleado_grado) {

   return {
      chart: {
         type: 'column',
         events: {
           load: function(event) {
              event.target.reflow();
            }
         },
         borderColor: '#d4d4d4',
         borderWidth: 1,
      },
      title: {
         text: 'Distribución por grado de estudios'
      },
      xAxis: {
         type: 'category',
         labels: {
         autoRotation: [-61]
      }
      },
      yAxis: {
         title: {
            text: 'Número de empleados'
         }
      },
      legend: {
         enabled: false
      },
      plotOptions: {
         series: {
            borderWidth: 0,
            dataLabels: {
               enabled: true,
               format: '{point.y}'
            }
         }
      },
      tooltip: {
         headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
         pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> <br/>'
      },

      series: [{
         name: 'Empleados',
         colorByPoint: true,
         data: this.get_DataConfig(_grados,_empleado_grado),
         showInLegend: true
      }]
   }
}
IndicadorGradoAcademico.prototype.get_DataConfig = function (_grados,_empleado_grado) {
   var datos = []
   for (var i = 0; i < _grados.length; i++) {
               datos.push(
                  {   name: _grados[i],
                     y: _empleado_grado[i],
                  }

               )
            }
   return datos
}

/*-----------------------------------------------*\
         OBJETO: INDICADOR POR ESTADO CIVIL
\*-----------------------------------------------*/

function IndicadorEstadoCivil () {}
IndicadorEstadoCivil.prototype.get_EstadoCivil = function (_response, _organizacion) {
   // Estado empleados: Casado, Soltero, Desconocido
   var estado = [0,0,0]
   for (var i = 0; i < _response.length; i++) {
      //Exluye aquellos empleados que esten inactivos
      if ((_response[i].pers_tipo_codigo != '1123') &&
         (_response[i].pers_tipo_codigo != '1124') &&
         (_response[i].pers_tipo_codigo != '1125') &&
         (_response[i].pers_tipo_codigo != '1118')){
            // Cuenta el numero de empleados separados por su estado civil
            if (_response[i].pers_estado_civil_desc == 'Casado'){
               estado[0] += 1
            } else if (_response[i].pers_estado_civil_desc == 'Soltero'){
               estado[1] += 1
            } else if (_response[i].pers_estado_civil_desc == '-'){
               estado[2] += 1
            }
      }
   }
   Highcharts.chart('container-estado',indicador_estado_civil.get_IndicadorConfig(estado))
}
IndicadorEstadoCivil.prototype.get_IndicadorConfig = function (_estado) {

   return  {
         chart: {
            type: 'pie',
            options3d: {
               enabled: true,
               alpha: 45
            },
            events: {
              load: function(event) {
                 event.target.reflow();
               }
            },
            borderColor: '#d4d4d4',
            borderWidth: 1,
         },
         title: {
            text: 'Distribución por estado civil'
         },
         subtitle: {
            text: ''
         },
         legend: {

         },
         navigation: {
            buttonOptions: {
               enabled: false
            }
         },
         plotOptions: {
            pie: {
               size: 170,
               innerSize: 50,
               depth: 30
            }
         },
         series: [{
            name: 'Empleados',
            //colorByPoint: true,
            data: this.get_DataConfig(_estado),
         }]
      }
}
IndicadorEstadoCivil.prototype.get_DataConfig = function (_estado) {

   return [
            ['Casado: <br>'+ _estado[0], _estado[0]],
            ['Soltero: <br>'+ _estado[1], _estado[1]],
            ['Desconocido: <br>'+ _estado[2], _estado[2]],
         ]
}

/*-----------------------------------------------*\
         OBJETO: INDICADOR POR RANGO DE EDAD
\*-----------------------------------------------*/


function IndicadorRangoEdad () {}
IndicadorRangoEdad.prototype.get_RangoEdad = function (_response, _organizacion) {
   // Rango de edades: (19-30),(30-40),(40-50),(50-60),(60-70),(70-80)
   var rango_edades = [0,0,0,0,0,0]
   var fecha_actual = new Date()
   var fecha_nacimiento = null

   for (var i = 0; i < _response.length; i++) {
      //Exluye aquellos empleados que esten inactivos
      if ((_response[i].pers_tipo_codigo != '1123') &&
         (_response[i].pers_tipo_codigo != '1124') &&
         (_response[i].pers_tipo_codigo != '1125') &&
         (_response[i].pers_tipo_codigo != '1118')){

         if((_response[i].asig_organizacion_clave == _organizacion) || (_organizacion == 0)){
            anio_nacimiento = (_response[i].pers_fecha_nacimiento).split("-")[0]
            mes_nacimiento = (_response[i].pers_fecha_nacimiento).split("-")[1]
            edad = fecha_actual.getFullYear() - anio_nacimiento

            //Validar si el empleado ya cumplio años o aun los cumplira
            if (fecha_actual.getMonth()<mes_nacimiento)
               edad= edad-1

            //Validar en que rango de edad se encuentra el empleado
            if((edad>=18) && (edad<30)){
               rango_edades[0] += 1
            }else if ((edad>=30) && (edad<40)){
               rango_edades[1] += 1
            }else if ((edad>=40) && (edad<50)){
               rango_edades[2] += 1
            }else if ((edad>=50) && (edad<60)){
               rango_edades[3] += 1
            }else if ((edad>=60) && (edad<70)){
               rango_edades[4] += 1
            }else if ((edad>=70) && (edad<80)){
               rango_edades[5] += 1
            }
         }
      }
   }
   // return rango_edades
   Highcharts.chart('container-edad',indicador_rango_edad.get_IndicadorConfig(rango_edades))
}
IndicadorRangoEdad.prototype.get_IndicadorConfig = function (_rango_edades) {

   return {
      chart: {
         plotBackgroundColor: null,
         plotBorderWidth: null,
         plotShadow: false,
         type: 'pie',
         events: {
           load: function(event) {
              event.target.reflow();
            }
         },
         borderColor: '#d4d4d4',
         borderWidth: 1,
      },
      title: {
         text: 'Distribución por rango de edades'
      },
      tooltip: {
         pointFormat: '{series.name}: <b>{point.y}</b>'
      },
      navigation: {
         buttonOptions: {
            enabled: false
         }
      },
      plotOptions: {
         pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
               enabled: false
            },
            showInLegend: true
         },
         series: {
            borderWidth: 1,
            dataLabels: {
               enabled: true,
               format: '{point.y}'
            }
         }
      },
      series: [{
         name: 'Empleados',
         colorByPoint: true,
         data: this.get_DataConfig(_rango_edades),
         showInLegend: true
      }]
   }
}
IndicadorRangoEdad.prototype.get_DataConfig = function (_rango_edades) {

   var datos = []
   var names = ['18 a 30', '30 a 40', '40 a 50','50 a 60','60 a 70', '70 a 80 años']
   for (var i = 0; i < names.length; i++) {
               datos.push(
                  {  name: names[i],
                     y: _rango_edades[i],
                  }

               )
            }
   return datos
}

/*-----------------------------------------------*\
         OBJETO: INDICADOR POR SEXO
\*-----------------------------------------------*/


function IndicadorSexo () {}
IndicadorSexo.prototype.get_Sexo = function (_response, _organizacion) {
   // Empleado por sexo
   var empleado_sexo = [0,0]

   for (var i = 0; i < _response.length; i++) {
      //Exluye aquellos empleados que esten inactivos
      if ((_response[i].pers_tipo_codigo != '1123') &&
         (_response[i].pers_tipo_codigo != '1124') &&
         (_response[i].pers_tipo_codigo != '1125') &&
         (_response[i].pers_tipo_codigo != '1118')){
         
         sexo = _response[i].pers_genero_clave

         if(sexo == 'M'){
            empleado_sexo[0] += 1
         } else if(sexo == 'F'){
            empleado_sexo[1] += 1
         }
      }
   }
   Highcharts.chart('container-sexo',indicador_sexo.get_IndicadorConfig(empleado_sexo))
}
IndicadorSexo.prototype.get_IndicadorConfig = function (_empleado_sexo) {

   return {
      chart: {
         type: 'column',
         events: {
           load: function(event) {
              event.target.reflow();
            }
         },
         borderColor: '#d4d4d4',
         borderWidth: 1,
      },
      title: {
         text: 'Distribución por sexo'
      },
      xAxis: {
         type: 'category'
      },
      yAxis: {
         title: {
            text: 'Número de empleados'
         }

      },
      legend: {
         enabled: false
      },
      plotOptions: {
         series: {
            borderWidth: 0,
            dataLabels: {
               enabled: true,
               format: '{point.y}'
            }
         }
      },
      tooltip: {
         headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
         pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> <br/>'
      },

      series: [{
         name: 'Empleados',
         colorByPoint: true,
         data: this.get_DataConfig(_empleado_sexo),
         showInLegend: true
      }]
   }
}
IndicadorSexo.prototype.get_DataConfig = function (_empleado_sexo) {

   return [    {
               name: 'Hombres',
               y: _empleado_sexo[0],
               drilldown: 'Hombres'},
            {
               name: 'Mujeres',
               y: _empleado_sexo[1],
               drilldown: 'Mujeres',
            }
         ]
}

/*-----------------------------------------------*\
         OBJETO: INDICADOR POR ORGANIZACIÓN
\*-----------------------------------------------*/

function IndicadorOrganizacion () {}
IndicadorOrganizacion.prototype.get_EmpleadoOrganizacion = function (_response) {
    // Contiene num de empleados por organizacion
    var num = []
    //Contiene organizaciones(SIN REPETIR)
    dato = indicador_organizacion.ordena_Organizaciones(_response)

    for (var i = 0; i < dato.length; i++) {
       num[i] = 0
        for(var j=0; j < _response.length; j++){

            if ((_response[j].pers_tipo_codigo != '1123') &&
                (_response[j].pers_tipo_codigo != '1124') &&
                (_response[j].pers_tipo_codigo != '1125') &&
                (_response[j].pers_tipo_codigo != '1118')){

                if(dato[i] == _response[j].asig_organizacion_desc){

                    num [i] +=1
                }
            }
        }
    }
   Highcharts.chart('container-organizacion',indicador_organizacion.get_IndicadorConfig(dato,num))
}
IndicadorOrganizacion.prototype.asigna_Organizaciones = function(_response) {
    //Calcula en un array las organizaciones existentes(REPETIDAS)
    var organizaciones = []
    var num = 0

    for (var i = 0; i < _response.length; i++) {
         if ((_response[i].pers_tipo_codigo != '1123') &&
                (_response[i].pers_tipo_codigo != '1124') &&
                (_response[i].pers_tipo_codigo != '1125') &&
                (_response[i].pers_tipo_codigo != '1118')){

               if(_response[i].asig_organizacion_desc != ''){
                  organizaciones[num] = _response[i].asig_organizacion_desc
                  num+=1
               }
         }
      }


    return organizaciones
}
IndicadorOrganizacion.prototype.ordena_Organizaciones = function(_response) {
    //Ordena en un array las organizaciones existentes(SIN REPETIRSE)
    var organizacion = [];
    var organizaciones = indicador_organizacion.asigna_Organizaciones(_response)

    for(var i = 0; i < organizaciones.length; i++) {
        if (organizacion.indexOf(organizaciones[i]) == -1) organizacion.push(organizaciones[i]);
    }
    return organizacion;
}
IndicadorOrganizacion.prototype.get_IndicadorConfig = function (_organizacion,_empleado_org) {

   return {
      chart: {
         height: 600,
         type: 'column',
         events: {
           load: function(event) {
              event.target.reflow();
            }
         },
         borderColor: '#d4d4d4',
         borderWidth: 1,
      },
      title: {
         text: 'Distribución por organizacion'
      },
      xAxis: {
         type: 'category',
         labels: {
         autoRotation: [-65]
      }
      },
      yAxis: {
         title: {
            text: 'Número de empleados'
         }
      },
      legend: {
         enabled: false
      },
      plotOptions: {
         series: {
            borderWidth: 0,
            dataLabels: {
               enabled: true,
               format: '{point.y}'
            }
         }
      },
      tooltip: {
         headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
         pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> <br/>'
      },

      series: [{
         name: 'Empleados',
         colorByPoint: true,
         data: this.get_DataConfig(_organizacion,_empleado_org),
         showInLegend: true
      }]
   }
}
IndicadorOrganizacion.prototype.get_DataConfig = function (_organizacion,_empleado_org) {
   var datos = []
   for (var i = 0; i < _organizacion.length; i++) {
               datos.push(
                  {  name: _organizacion[i],
                     y: _empleado_org[i],
                  }

               )
            }
   return datos
}

/*-----------------------------------------------*\
         OBJETO: INDICADOR POR ANTIGUEDAD
\*-----------------------------------------------*/

function IndicadorAntiguedad () {}
IndicadorAntiguedad.prototype.get_EmpleadoAntiguedad = function (_response) {
   rango_antiguedad = [0,0,0,0,0,0,0,0,0]
   for(var j=0; j < _response.length; j++){

      if ((_response[j].pers_tipo_codigo != '1123') &&
          (_response[j].pers_tipo_codigo != '1124') &&
          (_response[j].pers_tipo_codigo != '1125') &&
          (_response[j].pers_tipo_codigo != '1118')){

         fecha_contratacion = this.formatear_Fecha(_response[j].pers_fecha_contratacion)
         antiguedad = this.calcular_Antiguedad(fecha_contratacion)

         if((antiguedad>=0) && (antiguedad<=1)){
            rango_antiguedad[0] += 1
         }else if ((antiguedad>1) && (antiguedad<=3)){
            rango_antiguedad[1] += 1
         }else if ((antiguedad>3) && (antiguedad<=5)){
            rango_antiguedad[2] += 1
         }else if ((antiguedad>5) && (antiguedad<=10)){
            rango_antiguedad[3] += 1
         }else if ((antiguedad>10) && (antiguedad<=15)){
            rango_antiguedad[4] += 1
         }else if ((antiguedad>15) && (antiguedad<=20)){
            rango_antiguedad[5] += 1
         }else if ((antiguedad>20) && (antiguedad<=25)){
            rango_antiguedad[6] += 1
         }else if ((antiguedad>25) && (antiguedad<=30)){
            rango_antiguedad[7] += 1
         }else if ((antiguedad>30) && (antiguedad<=35)){
            rango_antiguedad[8] += 1
         }

      }
   }
   Highcharts.chart('container-antiguedad',indicador_antiguedad.get_IndicadorConfig(rango_antiguedad))
}
IndicadorAntiguedad.prototype.formatear_Fecha = function(_fecha) {
   fecha_split = _fecha.split(" ")
   fecha = new Date(fecha_split[0])
   return fecha
}
IndicadorAntiguedad.prototype.calcular_Antiguedad = function(_fecha){
   hoy = new Date()
   anios = hoy.getFullYear() - _fecha.getFullYear()
   _fecha.setFullYear(hoy.getFullYear())
   if (hoy < _fecha)
   {
      anios--
   }

   return anios
}
IndicadorAntiguedad.prototype.get_IndicadorConfig = function (_rango_antiguedad) {

   return {
      chart: {
         plotBackgroundColor: null,
         plotBorderWidth: null,
         plotShadow: false,
         type: 'pie',
         events: {
           load: function(event) {
              event.target.reflow();
            }
         },
         borderColor: '#d4d4d4',
         borderWidth: 1,
      },
      title: {
         text: 'Distribución por antigüedad'
      },
      tooltip: {
         pointFormat: '{series.name}: <b>{point.y}</b>'
      },
      navigation: {
         buttonOptions: {
            enabled: false
         }
      },
      plotOptions: {
         pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
               enabled: false
            },
            showInLegend: true
         },
         series: {
            borderWidth: 1,
            dataLabels: {
               enabled: true,
               format: '{point.y}'
            }
         }
      },
      series: [{
         name: 'Empleados',
         colorByPoint: true,
         data: this.get_DataConfig(_rango_antiguedad),
         showInLegend: true
      }]
   }
}
IndicadorAntiguedad.prototype.get_DataConfig = function (_rango_antiguedad) {
   var datos = []
   var names = ['0 a 1', '1 a 3', '3 a 5 ','5 a 10','10 a 15', '15 a 20', '20 a 25', '25 a 30', '30 a 35 años']
   for (var i = 0; i < names.length; i++) {
               datos.push(
                  {  name: names[i],
                     y: _rango_antiguedad[i],
                  }

               )
            }
   return datos
}

