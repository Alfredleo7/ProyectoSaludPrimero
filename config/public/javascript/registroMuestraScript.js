$( document ).ready(function(){
    cargarComboCentros();
    cargarComboPacientes();
    cargarComboLabs();
    cargarExamenes();
});

function cargarComboCentros(){
    $.ajax({
        type: 'GET',
        url: '/centros-medicos',
        data: {},
        success: function(respuesta){
			var $list = $("#combo-centros");
			$.each(respuesta, function(i){
				$list.append('<option value="'+respuesta[i].nombre+'">'+respuesta[i].nombre+'</option>');
			});
        }
    });
}

function cargarComboPacientes(){
    $.ajax({
        type: 'GET',
        url: '/pacientes',
        data: {},
        success: function(respuesta){
			var $list = $("#combo-pacientes");
			$.each(respuesta, function(i){
				$list.append('<option value="'+respuesta[i].cedula+'">'+respuesta[i].nombres+' '+respuesta[i].apellidos+'</option>');
			});
        }
    });
}

function cargarComboLabs(){
    $.ajax({
        type: 'GET',
        url: '/laboratorios',
        data: {},
        success: function(respuesta){
			var $list = $("#combo-lab");
			$.each(respuesta, function(i){
				$list.append('<option value="'+respuesta[i].nombre+'">'+respuesta[i].nombre+'</option>');
			});
        }
    });
}

function cargarExamenes(){
	$('#combo-muestras').change( function() {
		var op = '';
		var opSelected = $('#combo-muestras option:selected').each(function () {
				op += $( this ).val();
		});

		var url = '/examenes/'+ op;

	    $.ajax({
	        type: 'GET',
	        url: url,
	        data: {},
	        success: function(respuesta){
				var $list = $("#select-examenes");
				$("#select-examenes option").remove();
				$.each(respuesta, function(i){
					$list.append('<option value="'+respuesta[i].nombreExamen+'">'+respuesta[i].nombreExamen+'</option>');
				});
	        }
	    });  // Cierre ajax

	});  // Cierre de change

}


function cancelarRegistroMuestra() {
	window.location = "/operario";
};