/*-----------------------------------------------*\
         GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:api-ebs/
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
var organizacion = 0

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

})

/*-----------------------------------------------*\
         OBJETO: INDICADORES
\*-----------------------------------------------*/

function Indicadores () {

   this.$organizaciones = $('#id_organizaciones')
   this.$spark1 = $('#spark1')
   this.$spark2 = $('#spark2')
   this.$spark3 = $('#spark3')

   this.buscar_EmpleadosGeneral(organizacion)
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

   this.$organizaciones.on("change", this, this.filtro)
}
Indicadores.prototype.filtro = function (e) {

   organizacion = e.data.$organizaciones.val()

   if (organizacion == 0){
      indicadores.buscar_EmpleadosGeneral(organizacion)
   }else if (organizacion != 0){
      indicadores.buscar_EmpleadosFiltro(organizacion)
   }
}
Indicadores.prototype.buscar_EmpleadosGeneral = function (_organizacion){
   organizacion = _organizacion

   $.ajax({
         url: url_empleados_full,
         method: "GET",
         dataType: "json",
         success: function (response) {
            
            //Total de empleados
            total = indicadores.indicador_Total(response, organizacion)

            indicadores.mostrar_Mensaje()

            indicadores. ocultar_Graficas(total, organizacion)

            //Rotacion de empleados
            indicadores.indicador_Rotacion(response, organizacion)

            //Distribucion por grado de estudios
            indicadores.indicador_GradoAcademico(organizacion)

            //Disribucion por estado civil
            indicadores.indicador_EstadoCivil(response, organizacion)

            //Disribucion por rango de edad
            indicadores.indicador_RangoEdad(response, organizacion)

            //Disribucion por sexo
            indicadores.indicador_Sexo(response, organizacion)

            $('#container-organizacion').show()

            //Disribucion por organizacion
            indicadores.indicador_Organizacion(response)

         },
         error: function (response) {
            alertify("Ocurrio error al consultar")
         }
   })  
}
Indicadores.prototype.buscar_EmpleadosFiltro = function (_organizacion) {
   
   organizacion = _organizacion

   $.ajax({
         url: url_empleados_full,
         method: "GET",
         dataType: "json",
         data: {
            asig_organizacion_clave:organizacion
         },
         success: function (response) {

            if(organizacion != 0){
               //Total de empleados
               total = indicadores.indicador_Total(response, organizacion)

               indicadores.mostrar_Mensaje()

               indicadores. ocultar_Graficas(total, organizacion)

               //Rotacion de empleados
               indicadores.indicador_Rotacion(response, organizacion)

               //Distribucion por grado de estudios
               indicadores.indicador_GradoAcademico(organizacion)

               //Disribucion por estado civil
               indicadores.indicador_EstadoCivil(response, organizacion)

               //Disribucion por rango de edad
               indicadores.indicador_RangoEdad(response, organizacion)

               //Disribucion por sexo
               indicadores.indicador_Sexo(response, organizacion)

               $('#container-organizacion').hide()
            }
            
         },
         error: function (response) {
            alertify("Ocurrio error al consultar")
         }
   })  
}
Indicadores.prototype.indicador_Total = function (_response, _organizacion) {

   dato_total = indicador_total.get_Total(_response, _organizacion)
   document.getElementById('resultado-total-ac').innerHTML=dato_total

   return dato_total
}
Indicadores.prototype.indicador_Rotacion = function (_response, _organizacion) {

   dato_rotacion = 0 //indicador_total.get_Rotacion(_response)
   document.getElementById('resultado-rotacion').innerHTML=dato_rotacion
}
Indicadores.prototype.indicador_GradoAcademico = function (_organizacion) {
   
   indicador_grado.buscar_GradoAcademico(_organizacion)
}
Indicadores.prototype.indicador_EstadoCivil = function (_response, _organizacion) {

   dato_estado = indicador_estado_civil.get_EstadoCivil(_response, _organizacion) 
   Highcharts.chart('container-estado',
               indicador_estado_civil.get_IndicadorConfig(dato_estado))
}
Indicadores.prototype.indicador_RangoEdad = function (_response, _organizacion) {
   dato_edad = indicador_rango_edad.get_RangoEdad(_response, _organizacion)
   Highcharts.chart('container-edad',
               indicador_rango_edad.get_IndicadorConfig(dato_edad))
}
Indicadores.prototype.indicador_Sexo = function (_response, _organizacion) {
   dato_sexo = indicador_sexo.get_Sexo(_response, _organizacion)
   Highcharts.chart('container-sexo',
               indicador_sexo.get_IndicadorConfig(dato_sexo))
}
Indicadores.prototype.indicador_Organizacion = function (_response) {

   //Numero de empleados por organizacion
   empleado_org = indicador_organizacion.get_EmpleadoOrganizacion(_response)
   // Organizaciones existentes
   organizaciones = indicador_organizacion.ordena_Organizaciones(_response)

   Highcharts.chart('container-organizacion',
        indicador_organizacion.get_IndicadorConfig(organizaciones,empleado_org))
}
Indicadores.prototype.mostrar_Mensaje = function (){

   if(total == 0){
      document.getElementById('container-mensaje').innerHTML='La organización no cuenta con empleados'
   }else{
      document.getElementById('container-mensaje').innerHTML=' '
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
   }else if((total=!0) || (_organizacion == 0)){
      $('#container-total').show()
      $('#container-rotacion-total').show()
      $('#container-rotacion-renuncia').show()
      $('#container-grado').show()
      $('#container-estado').show()
      $('#container-edad').show()
      $('#container-sexo').show()
   }
}

/*-----------------------------------------------*\
         OBJETO: INDICADOR TOTAL DE EMPLEADOS
\*-----------------------------------------------*/

function IndicadorTotal () {
}
IndicadorTotal.prototype.get_Total= function (_response, _organizacion) {
   // Empleados activos, inactivos
   var total = 0
   for (var i = 0; i < _response.length; i++) {
      //Excluye aquellos empleados que esten inactivos
      if ((_response[i].pers_tipo_codigo != '1123') && 
         (_response[i].pers_tipo_codigo != '1124') &&
         (_response[i].pers_tipo_codigo != '1125') &&
         (_response[i].pers_tipo_codigo != '1118')){
         if((_response[i].asig_organizacion_clave == _organizacion) || (_organizacion == 0)){
            total+=1
         }
      }
   }
   return total
}


/*-----------------------------------------------*\
         OBJETO: INDICADOR POR GRADO DE ESTUDIOS
\*-----------------------------------------------*/

function IndicadorGradoAcademico () {
}
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

function IndicadorEstadoCivil () {
}
IndicadorEstadoCivil.prototype.get_EstadoCivil = function (_response, _organizacion) {
   // Estado empleados: Casado, Soltero, Desconocido
   var estado = [0,0,0]
   for (var i = 0; i < _response.length; i++) {
      //Exluye aquellos empleados que esten inactivos
      if ((_response[i].pers_tipo_codigo != '1123') && 
         (_response[i].pers_tipo_codigo != '1124') &&
         (_response[i].pers_tipo_codigo != '1125') &&
         (_response[i].pers_tipo_codigo != '1118')){
            if((_response[i].asig_organizacion_clave == _organizacion) || (_organizacion == 0)){
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
   }
   return estado
}
IndicadorEstadoCivil.prototype.get_IndicadorConfig = function (_estado) {

   return  {
         chart: {
            type: 'pie',
            options3d: {
               enabled: true,
               alpha: 45
            }
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


function IndicadorRangoEdad () {
}
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
   return rango_edades
}
IndicadorRangoEdad.prototype.get_IndicadorConfig = function (_rango_edades) {

   return {
      chart: {
         plotBackgroundColor: null,
         plotBorderWidth: null,
         plotShadow: false,
         type: 'pie'
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

   return [
         {
            name: '18 a 30',
            y: _rango_edades[0]
         },
         {
            name: '30 a 40',
            y: _rango_edades[1]
         },
         {
            name: '40 a 50',
            y: _rango_edades[2]
         },
         {
            name: '50 a 60',
            y: _rango_edades[3]
         },
         {
            name: '60 a 70',
            y: _rango_edades[4]
         },
         {
            name: '70 a 80',
            y: _rango_edades[5]
         },
         ]
}

/*-----------------------------------------------*\
         OBJETO: INDICADOR POR SEXO
\*-----------------------------------------------*/


function IndicadorSexo () {
}
IndicadorSexo.prototype.get_Sexo = function (_response, _organizacion) {
   // Empleado por sexo
   var empleado_sexo = [0,0]

   for (var i = 0; i < _response.length; i++) {
      //Exluye aquellos empleados que esten inactivos
      if ((_response[i].pers_tipo_codigo != '1123') && 
         (_response[i].pers_tipo_codigo != '1124') &&
         (_response[i].pers_tipo_codigo != '1125') &&
         (_response[i].pers_tipo_codigo != '1118')){

         if((_response[i].asig_organizacion_clave == _organizacion) || (_organizacion == 0)){
            sexo = _response[i].pers_genero_clave

            if(sexo == 'M'){
               empleado_sexo[0] += 1
            } else if(sexo == 'F'){
               empleado_sexo[1] += 1
            }
         }
      }
   }
   return empleado_sexo
}
IndicadorSexo.prototype.get_IndicadorConfig = function (_empleado_sexo) {

   return {
      chart: {
         type: 'column'
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

function IndicadorOrganizacion () {
}
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
    return num
}
IndicadorOrganizacion.prototype.asigna_Organizaciones = function(_response) {
    //Calcula en un array las organizaciones existentes(REPETIDAS)
    var organizaciones = []
    var num = 0
    
    for (var i = 0; i < _response.length; i++) {
         if(_response[i].asig_organizacion_desc != ''){
            organizaciones[num] = _response[i].asig_organizacion_desc
            num+=1
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