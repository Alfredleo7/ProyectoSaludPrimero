function cargarComboCentros(){
	/*
	$.getJSON("datos/centros_medicos.json", function(data){
		var $list = $("#combo-centros");
		$.each(data, function(i){
			$list.append('<option value="'+i+'">'+data[i].Nombre+'</option>');
		});
	}); 
	*/
}

$( document ).ready(function(){
    cargarComboCentros();
});

function cancelarRegistroPaciente() {
	window.location = "/operario";
};

