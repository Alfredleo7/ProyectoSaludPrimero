$(document).ready(function() {
	llenarTablaMuestras();
	cargarInfoLaboratorista();
	anim();
	$("#alerta").hide();

});

function cargarInfoLaboratorista(){
	$.ajax({
		url : '/laboratoristaByCookie',
		type : 'post',
		success : function(laboratorista){
			var laborat = laboratorista.nombres+" "+laboratorista.apellidos;
			$('#laboratNombre').text(laborat);
		}
	});

    /*$.getJSON("datos/laboratorista.json", function(data){
        var laborat = data.Nombres+" "+data.Apellidos;
        $('#laboratNombre').text(laborat);
    });*/
}


function llenar_info() {
	console.log('click');
	$("#info-mues h2").text("");
	$("#info-mues h2").text("Informacion de la muestra ");
	var $par1 = $("<p></p>");
	var $par2 = $("<p></p>");
	$("#info-mues p").text("");

	/*$.getJSON("datos/datos_muestras.json", function(data) {
		$par1.text("Paciente: "+data[i].paciente);
		$par2.text("Información: "+data[i].Info);
	});*/

	$("#info-mues").append($par1);
	$("#info-mues").append($par2);
}


function llenarTablaMuestras() {
	$.ajax({
		type : 'get',
		url : '/muestrasRecibidas',
		success : function(muestras){
				var $tabla = $(".tablaMuestras tbody");
				$tabla.empty();
				$.each(muestras, function(i){
				$tabla.append('<tr onclick="llenar_info();">');
				$tabla.append('<td>'+(i+1)+'</td>');
				$tabla.append('<td>'+muestras[i].nombresPaciente+" "+ muestras[i].apellidosPaciente+'</td>');
				$tabla.append('<td>'+muestras[i].nombreCentro+'</td>');
				$tabla.append('<td>'+muestras[i].nombreLaboratorio+'</td>');
				$tabla.append('<td>'+muestras[i].tipo+'</td>');
				$tabla.append('<td style="text-align: center;"><button type="button" class="btn btn-primary" onclick="mostrarTablaExamenes('+i+');">ver</button></td>');
				$tabla.append('<div id="id'+i+'" style="display: none">'+muestras[i]._id+'</div>');
				$tabla.append('</tr>');
			});
		}
	});
	/*$.getJSON("datos/datos_muestras.json", function(data) {
		var $tabla = $("#tablaMuestras tbody");
		$.each(data,function(i) {
			$tabla.append('<tr><td onclick="llenar_info('+i+');">'+data[i].titulo+'</td></tr>');
		});
	});*/
}


function anim() {
    var hashTagActive = "";
    $(".scroll").click(function (event) {
        if(hashTagActive != this.hash) { //this will prevent if the user click several times the same link to freeze the scroll.
            event.preventDefault();
            //calculate destination place
            var dest = 0;
            if ($(this.hash).offset().top > $(document).height() - $(window).height()) {
                dest = $(document).height() - $(window).height();
            } else {
                dest = $(this.hash).offset().top;
            }
            //go to destination
            $('html,body').animate({
                scrollTop: dest
            }, 750, 'swing');
            hashTagActive = this.hash;
        }
    });
}

function ingresarMuestra(){
	var codigo = $('.inputMuestra').val();
	mostrarMuestraModal(codigo);
};

function mostrarMuestraModal(idMuestra){
	$.ajax({
		url : '/muestras/'+idMuestra,
		type : 'get',
		success : function(muestra){
			if(!muestra){
				$("#alerta").show();
			} else {
				$("#myModal").modal("show");
				$('#btnRecibirMuestra').removeAttr('disabled');
				$('#nombrePaciente').val(muestra.nombresPaciente+" "+ muestra.apellidosPaciente);
				$('#nombreCentro').val(muestra.nombreCentro);
				$('#nombreLaboratorio').val(muestra.nombreLaboratorio);
				$('#tipoMuestra').val(muestra.tipo);
				$('#estado').val(muestra.estado);
				if(muestra.estado != 'ingresado'){
					$('#btnRecibirMuestra').attr('disabled', 'true');
				}
			}
		},
		error : function(){
			$("#alerta").show();
		}
	});
};

function recibirMuestra(){
	var idMuestra = $('.inputMuestra').val();
	var observaciones = $('.inputObservaciones').val();
	$.ajax({
		url : '/recibirMuestra',
		type : 'post',
		data : {
			id : idMuestra,
			observaciones : observaciones
		},
		success : function(){
			llenarTablaMuestras();
			$('.inputMuestra').val("");
		}
	});
};

function crearTablaParametro(examen, i, o){
	var $tablas = $(".tablaResultados");
	$tablas.append('<h2>'+examen.tipo+'</h2');
	$tablas.append('<div id="idExamen'+i+'" style="display: none">'+examen._id+'</div>')
	$tablas.append('<div class="table-responsive"><table class="table table-bordered tablaParametros'+i+'"><thead class="thead-inverse"><tr><th>Parámetro</th><th>Unidades</th><th>Resultado</th><th>Valores de Ref.</th></tr></thead><tbody></tbody></table></div>');
	llenarTablaParametros(i, examen._id);
	$tablas.append('<input class="btn btn-primary" type="button" name="name" value="Agregar Parámetro" data-toggle="modal" data-target="#modal'+i+'">')
	$tablas.append('<!-- Modal Detalles de la muestra --><!-- Modal -->'+
	'<div class="modal fade" style="color: rgb(39, 39, 40);" id="modal'+i+'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
		'<div class="modal-dialog" role="document">'+
			'<div class="modal-content">'+
				'<div class="modal-header">'+
					'<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
						'<span aria-hidden="true">&times;</span>'+
					'</button>'+

					'<h4 class="modal-title" id="myModalLabel">'+examen.tipo+'</h4>'+
				'</div>'+
				'<div class="modal-body container">'+


					'<!-- CONTENIDO DEL MODAL-->'+

					'<form>'+
						'<div class="form-group row">'+
							'<label for="parametro'+i+'" class="col-sm-2 col-form-label">Parámetro:</label>'+
							'<div class="col-sm-10">'+
								'<input type="text" class="form-control" id="parametro'+i+'">'+
							'</div>'+
						'</div>'+
						'<div class="form-group row">'+
							'<label for="unidades'+i+'" class="col-sm-2 col-form-label">Unidades:</label>'+
							'<div class="col-sm-10">'+
								'<input type="text" class="form-control" id="unidades'+i+'">'+
							'</div>'+
						'</div>'+
						'<div class="form-group row">'+
							'<label for="resultado'+i+'" class="col-sm-2 col-form-label">Resultado:</label>'+
							'<div class="col-sm-10">'+
								'<input type="text" class="form-control" id="resultado'+i+'">'+
							'</div>'+
						'</div>'+
						'<div class="form-group row">'+
							'<label for="valores'+i+'" class="col-sm-2 col-form-label">Valores de Referencia:</label>'+
							'<div class="col-sm-10">'+
								'<input type="text" class="form-control" id="valores'+i+'">'+
							'</div>'+
						'</div>'+
					'</form>'+

					'<!-- END CONTENIDO DEL MODAL -->'+
					'</div>'+
					'<div class="modal-footer">'+
						'<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>'+
						'<button type="button" class="btn btn-primary" data-dismiss="modal" onclick="guardarParametro('+i+','+o+');">Guardar</button>'+
					'</div>'+
				'</div>'+
			'</div>'+
		'</div>');
}

function mostrarTablaExamenes(i){
	var idMuestra = $("#id"+i).text();
	$.ajax({
		url : '/examenesByMuestra/'+ idMuestra,
		type : 'get',
		success : function(examenes){
				$(".tablaResultados").empty();
				$.each(examenes, function(o){
					crearTablaParametro(examenes[o],o, i);
				})
				$('.tablaResultados').append('<hr/>');
				$('.tablaResultados').append('<button type="button" class="btn btn-success" onclick="enviarResultados('+i+')">Enviar Resultados</button>');
		}
	});
};

function guardarParametro(i, o){
	var idExamen = $('#idExamen'+i).text();
	var parametro = $('#parametro'+i).val();
	var unidades = $('#unidades'+i).val();
	var resultado = $('#resultado'+i).val();
	var valoresRef = $('#valores'+i).val();
	$.ajax({
		type : 'post',
		url : '/parametros',
		data : {
			id_examen : idExamen,
			parametro : parametro,
			unidades : unidades,
			resultado : resultado,
			valoresRef : valoresRef
		},
		success : function(){
			mostrarTablaExamenes(o);
		}
	});
};

function llenarTablaParametros(i, idExamen) {
	$.ajax({
		type : 'get',
		url : '/parametrosByExamen/'+idExamen,
		success : function(parametros){
				var $tabla = $('.tablaParametros'+i+' tbody');
				$tabla.empty();
				$.each(parametros, function(i){
				$tabla.append('<tr>');
				$tabla.append('<td>'+parametros[i].parametro+'</td>');
				$tabla.append('<td>'+parametros[i].unidades+'</td>');
				$tabla.append('<td>'+parametros[i].resultado+'</td>');
				$tabla.append('<td>'+parametros[i].valoresRef+'</td>');
				$tabla.append('</tr>');
			});
		}
	});
	/*$.getJSON("datos/datos_muestras.json", function(data) {
		var $tabla = $("#tablaMuestras tbody");
		$.each(data,function(i) {
			$tabla.append('<tr><td onclick="llenar_info('+i+');">'+data[i].titulo+'</td></tr>');
		});
	});*/
};

function enviarResultados(i){
		var idMuestra = $("#id"+i).text();
		console.log(idMuestra);
		$.ajax({
			url : '/enviarResultados',
			type : 'post',
			data : {
				estado : 'terminado',
				id : idMuestra
			},
			success : function(){
				recibirMuestra();
				$(".tablaResultados").empty();
			}
		});
};
