$( document ).ready(function(){
    requerimientosByLab();
});

function insertarGraficoLab(labels, series){
	$("#areaGrap").empty();
	$("#areaGrap").append("<h2 style='text-align: center;'> Muestras mensuales por laboratorio </h2><hr></hr><br>");
	$("#areaGrap").append("<div class='col-lg-2'></div><div class='col-lg-10' id='ct'><div class='ct-chart ct-perfect-fourth' id='myChart'></div></div>");
//	$("#areaGrap").append("<div class='col-lg-1'></div>");
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
	  width: '85%',
	  height: '85%'
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
            insertarGraficoLab(labels,cantidades);
        } // fin success
    });
}

function insertarGraficoMensual (names, s1, s2, s3, s4) {
	$("#areaGrap").empty();
	$("#areaGrap").append("<h2 style='text-align: center;'> Muestras mensuales por laboratorio </h2><hr></hr><br>");
	$("#areaGrap").append("<div class='col-lg-9' id='ct'><div class='ct-chart ct-perfect-fourth' id='myChart'></div></div>");
	$("#areaGrap").append("<div class='col-lg-3 text-center'><img src='../imagenes/graph/legend.jpg'><br><br><label>Mostrar desde: </label><select id='desde'><option value='0' selected>Enero</option><option value='1'>Febrero</option><option value='2'>Marzo</option><option value='3'>Abril</option><option value='4'>Mayo</option><option value='5'>Junio</option><option value='6'>Julio</option><option value='7'>Agosto</option><option value='8'>Septiembre</option><option value='9'>Octubre</option><option value='10'>Noviembre</option><option value='11'>Diciembre</option></select><br><label>Mostrar hasta: </label><select id='hasta'><option value='0'>Enero</option><option value='1'>Febrero</option><option value='2'>Marzo</option><option value='3'>Abril</option><option value='4'>Mayo</option><option value='5'>Junio</option><option value='6'>Julio</option><option value='7'>Agosto</option><option value='8'>Septiembre</option><option value='9'>Octubre</option><option value='10'>Noviembre</option><option value='11' selected>Diciembre</option></select><br><br><button class='btn btn-primary btn-lg' onclick='funcionBotonGenerar();'> Generar gr&aacute;fico </button></div>");
	generarGraficoMensual(names, s1, s2, s3, s4);
}

function generarGraficoMensual (names, s1, s2, s3, s4) {	
	var data = {
	  labels: names ,
	  series: [ s1 , s2 , s3 , s4 ]
	};

	var options = {
	  // Default mobile configuration
	  seriesBarDistance: 11,
	  width: '100%',
	  height: '80%',
	  stackBars: true,
	  axisX: {
	    labelInterpolationFnc: function(value) {
	      return value.split(/\s+/).map(function(word) {
	        return word[0];
	      }).join('');
	    }
	  },
	  axisY: {
	    offset: 20,
	    onlyInteger: true
	  }
	}

	var responsiveOptions = [
		  // Options override for media > 400px
		  ['screen and (min-width: 400px)', {
		    reverseData: false,
		    horizontalBars: true,
		    axisX: {
		      labelInterpolationFnc: Chartist.noop,
		      onlyInteger: true
		    },
		    axisY: {
		      offset: 60
		    }
		  }],

		  // Options override for media > 800px
		  ['screen and (min-width: 800px)', {
		    stackBars: false,
		    reverseData: false,
		    seriesBarDistance: 10,
		    axisX :{
		    	onlyInteger: true
		    }
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
	if (inicio>fin) {
		alert("Rango de fechas inválido.");
		$("#desde").val("0");
		$("#hasta").val("11");
		return [];
	} else {
		return [inicio, fin];
	}
}


function generarLabels(a,b) {
	var meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
	var labels = [];
	for (var i = a ; i <= b ; i++ ) {
		labels.push(meses[i]);
	}
	return labels;
}


function funcionBotonGenerar(){
    $.ajax({
        type: 'GET',
        url: '/fichasByLabAndMonth',
        data: {},
        success: function(respuesta){
        	// Inicializar arrays con 0
        	var s1 = Array.apply(null, new Array(12)).map(Number.prototype.valueOf,0); // Infectologia
        	var s2 = Array.apply(null, new Array(12)).map(Number.prototype.valueOf,0); // San Jose
        	var s3 = Array.apply(null, new Array(12)).map(Number.prototype.valueOf,0); // Clinico # 7
        	var s4 = Array.apply(null, new Array(12)).map(Number.prototype.valueOf,0); // Su Salud S.A.
            
            $.each(respuesta, function (i) {
            	var mes = parseInt(respuesta[i]._id.mes)-1;
            	var nombre = respuesta[i]._id.nombre;
            	var cantidadMuestras = parseInt(respuesta[i].count);
//				console.log('\nLaboratorio: '+nombre+'\nMes: '+mes+'\nCantidad de muestras: '+cantidadMuestras);
				switch(nombre){
					case "Lab. San Jose":
						s2[mes] = cantidadMuestras;
						break;
					case "Lab. de Infectologia":
						s1[mes] = cantidadMuestras;
						break;
					case "Lab. clinico # 7":
						s3[mes] = cantidadMuestras;
						break;
					case "Lab. Clinico Su Salud S.A.":
						s4[mes] = cantidadMuestras;
						break;
				}
            });
            
			var par = validarRangoFechas();
			if ( par.length>0 ) {
				var labels = generarLabels( par[0] , par[1] );
				var series1 = s1.slice( par[0] , par[1]+1 );
				var series2 = s2.slice( par[0] , par[1]+1 );
				var series3 = s3.slice( par[0] , par[1]+1 );
				var series4 = s4.slice( par[0] , par[1]+1 );
				insertarGraficoMensual( labels, series1, series2, series3, series4 );
			}

        } // fin success
    });
}