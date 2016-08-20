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


function llenar_info(i) {
	$("#info-mues h2").text("");
	$("#info-mues h2").text("Informacion de la muestra " + (i+1));
	var $par1 = $("<p></p>");
	var $par2 = $("<p></p>");
	$("#info-mues p").text("");

	$.getJSON("datos/datos_muestras.json", function(data) {
		$par1.text("Paciente: "+data[i].paciente);
		$par2.text("Información: "+data[i].Info);
	});

	$("#info-mues").append($par1);
	$("#info-mues").append($par2);
}


function llenarTablaMuestras() {
	$.getJSON("datos/datos_muestras.json", function(data) {
		var $tabla = $("#tablaMuestras tbody");
		$.each(data,function(i) {
			$tabla.append('<tr><td onclick="llenar_info('+i+');">'+data[i].titulo+'</td></tr>');
		});
	});
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
