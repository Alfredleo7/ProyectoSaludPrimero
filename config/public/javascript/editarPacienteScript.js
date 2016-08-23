$( document ).ready(function(){
    // ============================
    $.ajax({
        type: 'GET',
        url: '/pacientes',
        data: {},
        success: function(respuesta){
          var $list = $("#combo-pacientes");
          $.each(respuesta, function(i){
            $list.append('<option value="'+respuesta[i]._id+'">'+respuesta[i].nombres+' '+respuesta[i].apellidos+'</option>');
          });
        }
    });
    // ============================
});

function cancelarRegistroPaciente() {
	window.location = "/operario";
};

function llenarInputs() {
    var elem = $("#combo-pacientes").val();
    $("#inputNombres, #inputApellidos, #inputCorreo, #inputCedula").removeAttr("disabled");
    // ============================
    $.ajax({
        type: 'GET',
        url: '/pacientes/'+elem,
        data: {},
        success: function(respuesta){
        	$("#inputNombres").val(respuesta.nombres);
        	$("#inputApellidos").val(respuesta.apellidos);
    		$("#inputCorreo").val(respuesta.email);
    		$("#inputCedula").val(respuesta.cedula);
        	$("#btnGuardar").removeAttr("disabled");
        }
    });
    // ============================
}