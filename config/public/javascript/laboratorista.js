$(document).ready(function() {
	llenarTablaMuestras();
	cargarInfoLaboratorista();
	anim();
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
	var idFicha = $(this).find("div").text();
	//console.log(idFicha);
	$("#info-mues h2").text("");
	//$("#info-mues h2").text("Informacion de la muestra " + (i+1));
	var $infoPaciente = $("<p></p>");
	var $infoLaboratorio = $("<p></p>");
	var $infoCentro = $("<p></p>");
	var $infoTipoMuestra = $("<p></p>");
	$("#info-mues p").text("");

	var id_paciente, id_laboratorio, id_centroMedico;

	$.ajax({
		url : '/fichas',
		type : 'get',
		data : {
			id : idFicha
		},
		success : function(ficha){
			$.each(ficha, function(i){
				id_paciente = ficha[i].id_paciente;
				id_laboratorio = ficha[i].id_laboratorio;
				id_centroMedico = ficha[i].id_centroMedico;
				$infoTipoMuestra.text("Tipo de muestra: "+ficha[i].tipoMuestra);
			})
		}
	});

	$.ajax({
		url : '/pacientes',
		type : 'get',
		data : {
			id : id_paciente
		},
		success : function(paciente){
			$.each(paciente, function(i){
				$infoPaciente.text("Paciente: "+paciente[i].nombres+" "+ paciente[i].apellidos);
			});
		}
	});

	$.ajax({
		url : '/laboratorios',
		type : 'get',
		data : {
			id : id_laboratorio
		},
		success : function(laboratorio){
			$.each(laboratorio, function(i){
				$infoLaboratorio.text("Laboratorio: "+laboratorio[i].nombre);
			});
		}
	});

	$.ajax({
		url : '/centros-medicos',
		type : 'get',
		data : {
			id : id_centroMedico
		},
		success : function(centro){
			$.each(centro, function(i){
				$infoCentro.text("Centro Médico: "+centro[i].nombre);
			});
		}
	});


	/*$.getJSON("datos/datos_muestras.json", function(data) {
		$par1.text("Paciente: "+data[i].paciente);
		$par2.text("Información: "+data[i].Info);
	});*/

	$("#info-mues").append($infoPaciente);
	$("#info-mues").append($infoLaboratorio);
	$("#info-mues").append($infoCentro);
	$("#info-mues").append($infoTipoMuestra);
}


function llenarTablaMuestras() {
	$.ajax({
		url : '/fichasRecibidas',
		type: 'post',
		success : function(fichas){
			var $tabla = $("#tablaMuestras tbody");
			$.each(fichas, function(i){
				$tabla.append('<tr><td onclick="llenar_info();">'+fichas[i].fecha+'<div style="display: none">'+fichas[i]._id+'</div></td></tr>');
			})
		}
	})

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
