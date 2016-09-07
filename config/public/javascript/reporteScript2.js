$( document ).ready(function(){
    graficoDefault();
});

function prueba(){
	monthLabelsAndSeries();
}

function monthLabelsAndSeries() {
	var from = $("#desde").val();
	var to = $("#hasta").val();
    $.ajax({
        type: 'GET',
        url: '/countMuestrasByYearAndMonth',
        data: {}+'&'+$.param({from: String(from)})+'&'+$.param({to: String(to)}),
        success: function(respuesta){
        	if(respuesta.length>0){
	        	var labels = [];
	            $.each(respuesta, function (i) {
	            	var item = respuesta[i];
	            	var L = String(item._id.anio+'/'+item._id.mes);
	            	labels.push(L);
	            });
	            
	            // LABELS GENERADAS EN ESTE PUNTO

				var longArr = respuesta.length;
        		var s1 = Array.apply(null, new Array(longArr)).map(Number.prototype.valueOf,0); // Infectologia
        		var s2 = Array.apply(null, new Array(longArr)).map(Number.prototype.valueOf,0); // San Jose
    	    	var s3 = Array.apply(null, new Array(longArr)).map(Number.prototype.valueOf,0); // Clinico # 7
	        	var s4 = Array.apply(null, new Array(longArr)).map(Number.prototype.valueOf,0); // Su Salud S.A.

	            $.each(respuesta, function (j) {
		            var anio2 = respuesta[j]._id.anio;
		            var mes2 = respuesta[j]._id.mes;

		            $.ajax({
		            	type: 'GET',
		            	url: '/muestrasByLabInMonth',
		            	data: {}+'&'+$.param({anio: String(anio2)})+'&'+$.param({mes: String(mes2)}),
		            	success: function (respuesta2) {

				            $.each(respuesta2, function (k) {
				            	var nombre = respuesta2[k]._id;

								switch(nombre){
									case "Lab. San Jose":
										s2[j] = respuesta2[k].count;
										break;
									case "Lab. de Infectologia":
										s1[j] = respuesta2[k].count;
										break;
									case "Lab. clinico # 7":
										s3[j] = respuesta2[k].count;
										break;
									case "Lab. Clinico Su Salud S.A.":
										s4[j] = respuesta2[k].count;
										break;
								}

				            });

				            generarGraficoMensual(labels,[s1,s2,s3,s4]);
		            	}
		            });
	            });

	        }
	        else{
	        	labels = ['No hay muestras en este intervalo'];
	        	generarGraficoMensual(labels,[[0]]);

	        }
        } // fin success
    });
}

function graficoDefault() {
	labels = ['Por favor, seleccione un intervalo'];
	generarGraficoMensual(labels,[[0]]);
}


function generarGraficoMensual (names, seriesL) {
	var data = {
	  labels: names,
	  series: seriesL
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
	        return word[0,2];
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
		  	stackBars: false,
		    reverseData: false,
		    horizontalBars: false,
		    seriesBarDistance: 10,
		    onlyInteger: true
		  }]
	]

	new Chartist.Bar('.ct-chart', data, options, responsiveOptions);
}