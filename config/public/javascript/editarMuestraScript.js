$( document ).ready(function(){
    $("#example").DataTable({
        responsive: true
    });
    llenarDataTable();

    cargarComboCentros();
    cargarComboPacientes();
    cargarComboLabs();
    cargarExamenes();
    // ============================
    /*
    $.ajax({
        type: 'GET',
        url: '/muestras',
        data: {},
        success: function(respuesta){
          var $list = $("#combo-seleccionar");
          $.each(respuesta, function(i){
            $list.append('<option value="'+respuesta[i]._id+'">'+respuesta[i].tipo+' '+respuesta[i].estado+'</option>');
          });
        }
    }); */
    // ============================
});


function cancelarRegistroPaciente() {
	window.location = "/operario";
};

function llenarInputs() {
    var elem = $("#combo-seleccionar").val();
    $("#inputNombres, #inputApellidos, #inputCorreo, #inputCedula").removeAttr("disabled");
    // ============================
    $.ajax({
        type: 'GET',
        url: '/muestras/'+elem,
        data: {},
        success: function(respuesta){
        	$("#combo-pacientes").val(); // cedula/id del paciente 
        	$("#combo-centros").val();  // centro medico
    		$("#combo-lab").val(respuesta.nombreLaboratorio);
    		$("#combo-muestras").val(respuesta.tipo);

            $("#select-examenes").val(); // Nombre del examen

        	$("#btnGuardar").removeAttr("disabled");
        }
    });
    // ============================
}

function cargarComboCentros(){
    $.ajax({
        type: 'GET',
        url: '/centros-medicos',
        data: {},
        success: function(respuesta){
            var $list = $("#combo-centros");
            $.each(respuesta, function(i){
                $list.append('<option value="'+respuesta[i]._id+'">'+respuesta[i].nombre+'</option>');
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
                $list.append('<option value="'+respuesta[i]._id+'">'+respuesta[i].nombres+' '+respuesta[i].apellidos+'</option>');
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
                $list.append('<option value="'+respuesta[i]._id+'">'+respuesta[i].nombre+'</option>');
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
                    $list.append('<option value="'+respuesta[i]._id+'">'+respuesta[i].nombreExamen+'</option>');
                });
            }
        });  // Cierre ajax

    });  // Cierre de change

}


function llenarDataTable (){
        $.ajax({
            type: 'GET',
            url: "/muestras",
            data: {},
            success: function(respuesta){
                $.each(respuesta, function(i){
                    $("#cod_hidden").val(respuesta[i]._id);

                    var a = $("#codmuestra_hidden");
                    console.log(a);
                    var table = $("#example").DataTable();
                    var array = [];
                    var n = respuesta[i].nombresPaciente; array.push(n);
                    var a = respuesta[i].apellidosPaciente; array.push(a);
                    var nc = respuesta[i].nombreCentro; array.push(nc);
                    var nl = respuesta[i].nombreLaboratorio; array.push(nl);
                    var examenes = respuesta[i].examenes;
                    var strExam = "";
                    for (var i=0 ; i<examenes.length ; i++ ){
                        strExam += examenes[i]+" ";
                    }
                    array.push(strExam);
                    var t = respuesta[i].tipo;  array.push(t);
                    var edit ="<td><p data-placement='top' data-toggle='tooltip' title='Edit'><button class='btn btn-primary btn-xs' data-title='Edit' data-toggle='modal' data-target='#edit' ><span class='glyphicon glyphicon-pencil'></span></button></p></td>";
                    var elim ="<td><p data-placement='top' data-toggle='tooltip' title='Delete'><button class='btn btn-danger btn-xs' data-title='Delete' data-toggle='modal' data-target='#delete' ><span class='glyphicon glyphicon-trash'></span></button></p></td>";
                    array.push(edit);
                    array.push(elim);

                    table.row.add(array).draw();
                    array = [];
                });
            }
        });  // Cierre ajax
}