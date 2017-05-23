/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/


var url_incidenciazonaemp = window.location.origin + "/api-sgi/incidenciaempleadoszona/"

// OBJS
var indicador_total = null


/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {

    indicador_total = new IndicadorTotal()

});

/*-----------------------------------------------*\
            OBJETO: GRAFICA DE PERSONAL POR ZONA
\*-----------------------------------------------*/

function IndicadorTotal () {
    //this.$campo_total = $("#id_total_empleados")
    this.init_Components()
}
IndicadorTotal.prototype.init_Components = function () {
    this.buscar_Empleados()
}
IndicadorTotal.prototype.buscar_Empleados = function () {

	
    $.ajax({
            url: url_incidenciazonaemp,
            method: "GET",
            success: function (response) {

                dato = indicador_total.set_Total(response)
                //Highcharts.chart('container-totalzona',indicador_total.get_IndicadorConfig(dato))
                //indicador_total.$campo_total.val(dato)

            },
            error: function (response) {
                alert("Ocurrio error al consultar")
            }
    })  

    $.ajax({
            url: url_incidenciazonaemp,
            method: "GET",
            success: function (response) {

                dato = indicador_total.set_Total2(response)
                //Highcharts.chart('container-totalzona',indicador_total.get_IndicadorConfig(dato))
                //indicador_total.$campo_total.val(dato)

            },
            error: function (response) {
                alert("Ocurrio error al consultar")
            }
    })  
}



IndicadorTotal.prototype.set_Total= function (response) {

        var aData = response;
        var arr = []

        //alert("Entro success");


        $.map(aData, function (item, index) {
            var i = [item.zona, item.totalempleado];
            var obj = {};

            //alert(item.zona);

            if (item.totalempleado == "--") {
                item.totalempleado = "0";
            }


            obj.name = item.totalempleado + " - " + item.zona;
            obj.y = parseFloat(item.totalempleado);
            arr.push(obj);

            //alert(obj);

        });
        var myJsonString = JSON.stringify(arr);
        var jsonArray = JSON.parse(JSON.stringify(arr));
        drawPieChart(jsonArray);
        //return jsonArray

}

IndicadorTotal.prototype.set_Total2= function (response) {

        var aData = response;
        var arr = []

        //alert("Entro success");


        $.map(aData, function (item, index) {
            var i = [item.zona, item.incidencias_registrables];
            var obj = {};

            //alert(item.zona);

            if (item.incidencias_registrables == "--") {
                item.incidencias_registrables = "0";
            }


            obj.name = item.incidencias_registrables + " - " + item.zona;
            obj.y = parseFloat(item.incidencias_registrables);
            arr.push(obj);

            //alert(obj);

        });
        var myJsonString = JSON.stringify(arr);
        var jsonArray = JSON.parse(JSON.stringify(arr));
        drawPieChart2(jsonArray);
        //return jsonArray

}



function drawPieChart(seriesData) {

    
    //Highcharts.setOptions({
    //    colors: ['#FF8000', '#FF0000', '#0080FF', '#04B431', '#A9F5D0']
    //});

    $('#container-totalzona').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            colors: ['#A5DF00', '#FF0000', '#0080FF', '#04B431', '#A9F5D0']
        },
        title: {
            text: 'Personal por Zona '
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: 'Total por Zona : <b>{point.name}</b>',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            name: "Persona por Zona",
            colorByPoint: true,
            data: seriesData
        }]
    });



}

function drawPieChart2(seriesData) {

    
    //Highcharts.setOptions({
    //    colors: ['#FF8000', '#FF0000', '#0080FF', '#04B431', '#A9F5D0']
    //});

    $('#container-xpersonal').highcharts({
        chart: {
             type: 'pie',
             options3d: {
              enabled: true,
              alpha: 45
             }
        },
        title: {
            text: 'Incidentes por Zona '
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
            	 innerSize: 100,
                 depth: 45,
                //allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: 'Total por Incidentes : <b>{point.name}</b>',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            name: "Incidentes por Zona",
            colorByPoint: true,
            data: seriesData
        }]
    });



}


IndicadorTotal.prototype.get_IndicadorConfig = function (seriesData) {

	//console.log(_datos)

    return {
        chart: {
            type: 'pie',
           
        },
        title: {
            text: 'Distribución de empleados por zona'
        },
        tooltip: {
             pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
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
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
        }
    },
	   series: [{
            name: "Empleado por Zona",
            colorByPoint: true,
            data: seriesData
        }]
	   
	     // series: [{
      //       name: this.get_DataConfig(_datos),
      //       colorByPoint: true,
      //       data: this.get_DataConfig(_datos),
      //       showInLegend: true
      //   }]
        
    }
}
// IndicadorTotal.prototype.get_DataConfig = function (_datos) {

//     return [
//             {
//                 name: _zonas[1],
//                 y: totalxzona[1],
//             },
//             {
//                 name: _zonas[2],
//                 y:  totalxzona[1],
//             },
//             {
//                 name: _zonas[3],
//                 y: 60
//             },
//             ]
// }
