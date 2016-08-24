$( document ).ready(function(){
//    $("#modal-success").modal("show");
    $("#example").DataTable({
        responsive: true
    });
    llenarDataTable();
});

function sacarIdPaciente() {
	$(".btn-xs").click(function() {
        var i = $(this).parent().parent().children("input").val();
            var url = '/pacientes/'+i;
            //console.log(url);
            $.ajax({
                type: 'GET',
                url: url,
                data: {},
                success: function(respuesta){
                    $("#editHidden").val(i);
                    $("#editNombres").val(respuesta.nombres);
                    $("#editApellidos").val(respuesta.apellidos);
                    $("#editCedula").val(respuesta.cedula);
                    $("#editCorreo").val(respuesta.email);
                }
            });
	});
}

function cancelarRegistroPaciente() {
	window.location = "/operario";
};

function llenarDataTable (){
        $.ajax({
            type: 'GET',
            url: "/pacientes",
            data: {},
            success: function(respuesta){
                $.each(respuesta, function(i){
                	//console.log(respuesta[i]);
                	var table = $("#example").DataTable();
                	var array = [];
                	var n = respuesta[i].nombres;   array.push(n);
                	var a = respuesta[i].apellidos;   array.push(a);
                	var c = respuesta[i].cedula;   array.push(c);
                	var e = respuesta[i].email;   array.push(e);
                	var edit ="<td><input type='hidden' value='"+String(respuesta[i]._id)+"'><p data-placement='top' data-toggle='tooltip' title='Edit'><button class='btn btn-primary btn-xs' data-title='Edit' data-toggle='modal' data-target='#edit' onclick='sacarIdPaciente();'><span class='glyphicon glyphicon-pencil'></span></button></p></td>";
                    var elim ="<td><input type='hidden' value='"+String(respuesta[i]._id)+"'><p data-placement='top' data-toggle='tooltip' title='Delete'><button class='btn btn-danger btn-xs' data-title='Delete' data-toggle='modal' data-target='#delete' onclick='sacarIdPaciente();'><span class='glyphicon glyphicon-trash'></span></button></p></td>";
					array.push(edit);
                    array.push(elim);
					table.row.add(array).draw();
                    array = [];
                });
            }
        });  // Cierre ajax
}