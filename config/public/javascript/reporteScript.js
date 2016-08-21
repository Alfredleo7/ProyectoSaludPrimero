$( document ).ready(function(){
    insertarGraficoLab();
});

function insertarGraficoMensual () {
	$("#areaGrap").empty();
	$("#areaGrap").append("<h2 style='text-align: center;'> Muestras mensuales por laboratorio </h2><hr></hr><br>");
	$("#areaGrap").append("<div class='col-lg-9' id='ct'><div class='ct-chart ct-perfect-fourth' id='myChart'></div></div>");
	$("#areaGrap").append("<div class='col-lg-3'><label>Mostrar desde: </label><select id='desde'><option value='Enero' selected>Enero</option><option value='Febrero'>Febrero</option><option value='Marzo'>Marzo</option><option value='Abril'>Abril</option><option value='Mayo'>Mayo</option><option value='Junio'>Junio</option><option value='Julio'>Julio</option><option value='Agosto'>Agosto</option><option value='Septiembre'>Septiembre</option><option value='Octubre'>Octubre</option><option value='Noviembre'>Noviembre</option><option value='Diciembre'>Diciembre</option></select><br><label>Mostrar hasta: </label><select id='hasta'><option value='Enero'>Enero</option><option value='Febrero'>Febrero</option><option value='Marzo'>Marzo</option><option value='Abril'>Abril</option><option value='Mayo' selected>Mayo</option><option value='Junio'>Junio</option><option value='Julio'>Julio</option><option value='Agosto'>Agosto</option><option value='Septiembre'>Septiembre</option><option value='Octubre'>Octubre</option><option value='Noviembre'>Noviembre</option><option value='Diciembre'>Diciembre</option></select></div>");

	generarGraficoMensual();
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


function insertarGraficoLab(){
	$("#areaGrap").empty();
	$("#areaGrap").append("<h2 style='text-align: center;'> Muestras mensuales por laboratorio </h2><hr></hr><br>");
	$("#areaGrap").append("<div class='col-lg-2'></div><div class='col-lg-8' id='ct'><div class='ct-chart ct-perfect-fourth' id='myChart'></div></div>");
	$("#areaGrap").append("<div class='col-lg-2'></div>");

	generarGraficoLab();
}

function generarGraficoLab() {
	var data = {
	  labels: ['Laboratorio 1', 'Laboratorio 2', 'Laboratorio 3', 'Laboratorio 4'],
	  series: [20, 15, 40, 30]
	};

	var options = {
	  labelInterpolationFnc: function(value) {
	    return value[0]
	  },
	  width: '100%',
	  height: '75%'
	};

	var responsiveOptions = [
	  ['screen and (min-width: 640px)', {
	    chartPadding: 30,
	    labelOffset: 100,
	    labelDirection: 'explode',
	    labelInterpolationFnc: function(value) {
	      return value;
	    }
	  }],
	  ['screen and (min-width: 1024px)', {
	    labelOffset: 100,
	    chartPadding: 20
	  }]
	];

	new Chartist.Pie('.ct-chart', data, options, responsiveOptions);
}