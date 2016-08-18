function cargarComboCentros(){
	$.getJSON("../datos/centros_medicos.json", function(data){
		var $list = $("#combo-centros");
		$.each(data, function(i){
			$list.append('<option value="'+i+'">'+data[i].Nombre+'</option>');
		});
	});


	$.get("http://localhost:3000/operario/registroMuestra/muestras",{},function(data){
		console.log(data);
    });
}

$( document ).ready(function(){
    cargarComboCentros();
});

function cancelarRegistroMuestra() {
	window.location = "/operario";
};