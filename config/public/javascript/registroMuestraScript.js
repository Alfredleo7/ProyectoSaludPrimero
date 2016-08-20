$( document ).ready(function(){
    cargarComboCentros();
    cargarComboPacientes();
    cargarComboLabs();
});

function cargarComboCentros(){
	/*$.getJSON("/centros-medicos", function(data){
		console.log(data);
	}); */
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
				$list.append('<option value="'+respuesta[i].nombres+'">'+respuesta[i].nombres+' '+respuesta[i].apellidos+'</option>');
			});
        }
    });
}

function cargarComboLabs(){
    $.ajax({
        type: 'GET',
        url: '/pacientes',
        data: {},
        success: function(respuesta){
			var $list = $("#combo-pacientes");
			$.each(respuesta, function(i){
				$list.append('<option value="'+respuesta[i].nombres+'">'+respuesta[i].nombres+' '+respuesta[i].apellidos+'</option>');
			});
        }
    });
}



function cancelarRegistroMuestra() {
	window.location = "/operario";
};