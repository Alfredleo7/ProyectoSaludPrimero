$( document ).ready(function(){
    requerimientosByLab();
});

function insertarGraficoLab(labels, series){
	$("#areaGrap").empty();
	$("#areaGrap").append("<h2 style='text-align: center;'> Muestras mensuales por laboratorio </h2><hr></hr><br>");
	$("#areaGrap").append("<div class='col-lg-1'></div><div class='col-lg-10' id='ct'><div class='ct-chart ct-perfect-fourth' id='myChart'></div></div>");
	$("#areaGrap").append("<div class='col-lg-1'></div>");
	generarGraficoLab( labels, series );
}

function generarGraficoLab(labelsIn, seriesIn) {
	var data = {
	  labels: labelsIn,
	  series: seriesIn
	};

	var options = {
	  labelInterpolationFnc: function(value) {
	    return value[0]
	  },
	  width: '80%',
	  height: '80%'
	};

	var responsiveOptions = [
	  ['screen and (min-width: 400px)', {
	    chartPadding: 5,
	    labelOffset: 25,
	    labelPosition: 'inside',
	    labelInterpolationFnc: function(value) {
	      return value;
	    }
	  }],
	  ['screen and (min-width: 1100px)', {
	    labelOffset: 5,
	    chartPadding: 25,
	    labelPosition: 'outside'
	  }]
	];

	new Chartist.Pie('.ct-chart', data, options, responsiveOptions);
}


function requerimientosByLab(){
    $.ajax({
        type: 'GET',
        url: '/fichasByLab',
        data: {}, //+'&'+$.param({tipoaccion:"insertar"}),
        success: function(respuesta){
        	var cantidades = [];
        	var labels = [];
            $.each(respuesta, function (i) {
            	var name = respuesta[i]._id;
            	var cant = respuesta[i].count;
            	labels.push(name+' ('+cant+')');
            	cantidades.push(cant);
            });
            //console.log(labels);
            //console.log(cantidades);
            insertarGraficoLab(labels,cantidades);
        } // fin success
    });
}

function insertarGraficoMensual () {
	$("#areaGrap").empty();
	$("#areaGrap").append("<h2 style='text-align: center;'> Muestras mensuales por laboratorio </h2><hr></hr><br>");
	$("#areaGrap").append("<div class='col-lg-9' id='ct'><div class='ct-chart ct-perfect-fourth' id='myChart'></div></div>");
	$("#areaGrap").append("<div class='col-lg-3'><label>Mostrar desde: </label><select id='desde'><option value='0' selected>Enero</option><option value='1'>Febrero</option><option value='2'>Marzo</option><option value='3'>Abril</option><option value='4'>Mayo</option><option value='5'>Junio</option><option value='6'>Julio</option><option value='7'>Agosto</option><option value='8'>Septiembre</option><option value='9'>Octubre</option><option value='10'>Noviembre</option><option value='11'>Diciembre</option></select><br><label>Mostrar hasta: </label><select id='hasta'><option value='0'>Enero</option><option value='1'>Febrero</option><option value='2'>Marzo</option><option value='3'>Abril</option><option value='4'>Mayo</option><option value='5'>Junio</option><option value='6'>Julio</option><option value='7'>Agosto</option><option value='8'>Septiembre</option><option value='9'>Octubre</option><option value='10'>Noviembre</option><option value='11' selected>Diciembre</option></select></div>");

	generarGraficoMensual();
	validarRangoFechas();
}

function generarGraficoMensual () {
	var s1 = [5, 4, 3, 7, 5, 9, 3, 4, 8, 9, 6, 8];
	var s2 = [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4];
  	var s3 = [4, 3, 7, 6, 3, 8, 2, 5, 6, 9, 5, 7];
  	var s4 = [2, 4, 8, 5, 2, 7, 1, 7, 9, 7, 4, 6];
  	var names = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
		
	var data = {
	  labels: names ,
	  series: [ s1 , s2 , s3 , s4 ]
	};

	var options = {
	  // Default mobile configuration
	  seriesBarDistance: 9,
	  width: '100%',
	  height: '75%',
	  stackBars: true,
	  axisX: {
	    labelInterpolationFnc: function(value) {
	      return value.split(/\s+/).map(function(word) {
	        return word[0];
	      }).join('');
	    }
	  },
	  axisY: {
	    offset: 20
	  }
	}

	var responsiveOptions = [
		  // Options override for media > 400px
		  ['screen and (min-width: 400px)', {
		    reverseData: true,
		    horizontalBars: true,
		    axisX: {
		      labelInterpolationFnc: Chartist.noop
		    },
		    axisY: {
		      offset: 60
		    }
		  }],

		  // Options override for media > 800px
		  ['screen and (min-width: 800px)', {
		    stackBars: false,
		    seriesBarDistance: 10
		  }],

		  // Options override for media > 1000px
		  ['screen and (min-width: 1000px)', {
		    reverseData: false,
		    horizontalBars: false,
		    seriesBarDistance: 10,
		    onlyInteger: true
		  }]
	]

	new Chartist.Bar('.ct-chart', data, options, responsiveOptions);
}

function validarRangoFechas(){
	var desde = $("#desde option:selected").val();
	var hasta = $("#hasta option:selected").val();
	var inicio = parseInt(desde);
	var fin = parseInt(hasta);
	if (inicio<fin) {
		return true;
	} else {
		return false;
	}
}

