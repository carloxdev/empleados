/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// URLS:api-ebs/viewempleadosfull/
var url_empleados_full = window.location.origin + "/api-ebs/viewempleadosfull/"

// OBJS
var indicadores = null
var indicador_total = null
var indicador_estado_civil=null
var indicador_rango_edad=null
var indicador_sexo=null
var indicador_organizacion = null

/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {
    indicadores = new Indicadores()
    indicador_total = new IndicadorTotal()
    indicador_estado_civil = new IndicadorEstadoCivil()
    indicador_rango_edad = new IndicadorRangoEdad()
    indicador_sexo = new IndicadorSexo()
    indicador_organizacion = new IndicadorOrganizacion()

});

/*-----------------------------------------------*\
            OBJETO: INDICADORES
\*-----------------------------------------------*/

function Indicadores () {

    this.init_Components()
}
Indicadores.prototype.init_Components = function () {

    this.buscar_Empleados()
}
Indicadores.prototype.buscar_Empleados = function () {

    $.ajax({
            url: url_empleados_full,
            method: "GET",
            success: function (response) {

                //Total de empleados
                indicadores.indicador_Total(response)

                //Disribucion por estado civil
                indicadores.indicador_EstadoCivil(response)

                //Disribucion por rango de edad
                indicadores.indicador_RangoEdad(response)

                //Disribucion por sexo
                indicadores.indicador_Sexo(response)

                //Disribucion por organizacion
                indicadores.indicador_Organizacion(response)
                
            },
            error: function (response) {
                alert("Ocurrio error al consultar")
            }
    })  
}
Indicadores.prototype.indicador_Total = function (_response) {

    dato_total = indicador_total.set_Total(_response)
    document.getElementById('container-total-ac').innerHTML=dato_total[0]
    return dato_total
}
Indicadores.prototype.indicador_EstadoCivil = function (_response) {

    dato_estado = indicador_estado_civil.set_EstadoCivil(_response) 
    Highcharts.chart('container-estado',
                    indicador_estado_civil.get_IndicadorConfig(dato_estado))
    return dato_estado
}
Indicadores.prototype.indicador_RangoEdad = function (_response) {
    dato_edad = indicador_rango_edad.set_RangoEdad(_response)
    Highcharts.chart('container-edad',
                    indicador_rango_edad.get_IndicadorConfig(dato_edad))
    return dato_edad
}
Indicadores.prototype.indicador_Sexo = function (_response) {
    dato_sexo = indicador_sexo.set_Sexo(_response)
    Highcharts.chart('container-sexo',
                    indicador_sexo.get_IndicadorConfig(dato_sexo))
    return dato_sexo
}
Indicadores.prototype.indicador_Organizacion = function (_response) {
    //Empleados por organizacion
    empleado_org = indicador_organizacion.set_EmpleadoOrganizacion(_response)
    // Organizaciones existentes
    organizaciones = indicador_organizacion.ordena_Organizaciones(_response)

    Highcharts.chart('container-organizacion',
                    indicador_organizacion.get_IndicadorConfig(organizaciones,empleado_org))
    return empleado_org
}

/*-----------------------------------------------*\
            OBJETO: INDICADOR POR ESTADO CIVIL
\*-----------------------------------------------*/

function IndicadorTotal () {
}
IndicadorTotal.prototype.set_Total= function (response) {
    // Empleados activos, inactivos
    var total = [0,0]
    for (var i = 0; i < response.length; i++) {
        //Excluye aquellos empleados que esten inactivos
        if ((response[i].pers_tipo_codigo != '1123') && 
            (response[i].pers_tipo_codigo != '1124') &&
            (response[i].pers_tipo_codigo != '1125') &&
            (response[i].pers_tipo_codigo != '1118')){
            
            total[0]+=1
        }else{
            total[1]+=1
        }
    }
    return total
}

/*-----------------------------------------------*\
            OBJETO: INDICADOR POR ESTADO CIVIL
\*-----------------------------------------------*/

function IndicadorEstadoCivil () {
}
IndicadorEstadoCivil.prototype.set_EstadoCivil = function (_response) {
    // Estado empleados: Casado, Soltero, Desconocido
    var estado = [0,0,0]
    for (var i = 0; i < _response.length; i++) {
        //Exluye aquellos empleados que esten inactivos
        if ((_response[i].pers_tipo_codigo != '1123') && 
            (_response[i].pers_tipo_codigo != '1124') &&
            (_response[i].pers_tipo_codigo != '1125') &&
            (_response[i].pers_tipo_codigo != '1118')){

            // Cuenta el numero de empleados separados por su estado civil
            if (_response[i].pers_estado_civil_desc == 'Cazad@'){
                estado[0] += 1
            } else if (_response[i].pers_estado_civil_desc == 'Solter@'){
                estado[1] += 1
            } else if (_response[i].pers_estado_civil_desc == '-'){
                estado[2] += 1
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
IndicadorRangoEdad.prototype.set_RangoEdad = function (_response) {
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
IndicadorSexo.prototype.set_Sexo = function (_response) {
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
IndicadorOrganizacion.prototype.set_EmpleadoOrganizacion = function (_response) {
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
    //Coloca en un array las organizaciones existentes(REPETIDAS)
    var organizaciones = []
    var cont = 0
    
    for (var i = 0; i < _response.length; i++) {
        if(_response[i].asig_organizacion_desc != ""){
            organizaciones[cont] = _response[i].asig_organizacion_desc
            cont+=1
        }
    }
    return organizaciones
}

IndicadorOrganizacion.prototype.ordena_Organizaciones = function(_response) {
    //Coloca en un array las organizaciones existentes(SIN REPETIRSE)
    var organizacion = []; 
    var organizaciones = indicador_organizacion.asigna_Organizaciones(_response)

    for(var i = 0; i < organizaciones.length; i++) {
        if (organizacion.indexOf(organizaciones[i]) == -1) {
            organizacion.push(organizaciones[i]);
        }
    }
    return organizacion
}
IndicadorOrganizacion.prototype.get_IndicadorConfig = function (_organizacion,_empleado_org) {

    return {
        chart: {
            type: 'column',
        },
        title: {
            text: 'Distribución por organizacion'
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
            data: this.get_DataConfig(_organizacion,_empleado_org),
            showInLegend: true
        }]
    }
}
IndicadorOrganizacion.prototype.get_DataConfig = function (_organizacion,_empleado_org) {
    var datos = []
    for (var i = 0; i < _organizacion.length; i++) {
                   datos.push( 
                        {   name: _organizacion[i],
                            y: _empleado_org[i],
                        }
                    
                    )
                }              
    return datos
}