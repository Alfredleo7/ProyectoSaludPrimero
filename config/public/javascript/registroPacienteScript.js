$( document ).ready(function(){
//    $("#modal-success").modal("show");
    $("#example").DataTable({
        responsive: true
    });
    llenarDataTable();


    $(function(){
        $('#confirmDelete').click(function() {
            confirmarEliminar();
        });
    });
});

function sacarIdPaciente(i) {
    var i = $("#Edit"+i).parent().parent().children("input").val();
    var url = '/pacientes/'+i;

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
}

function sacarIdPaciente2(i) {
    var i = $("#Delete"+i).parent().parent().children("input").val();
    $("#hiddenSuccess").val(i);
     var url = '/pacientes/'+i;
}

function confirmarEliminar(){
    var id = $("#hiddenSuccess").val();
    var url = "/pacientes/"+id
    console.log(id + '' + url);
            $.ajax({
                type: 'DELETE',
                url: url,
                data: {},
                success: function(respuesta){
                    $("#delete").modal("hide");
                    $("#modal-success").modal("show");
                }
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
                	var edit ="<td><input type='hidden' value='"+String(respuesta[i]._id)+"'><p class='text-center' data-placement='top' data-toggle='tooltip' title='Edit'><button id='Edit"+i+"' class='btn btn-primary btn-xs' data-title='Edit' data-toggle='modal' data-target='#edit' onclick='sacarIdPaciente("+i+");'><span class='glyphicon glyphicon-pencil'></span></button></p></td>";
                    var elim ="<td><input type='hidden' value='"+String(respuesta[i]._id)+"'><p class='text-center' data-placement='top' data-toggle='tooltip' title='Delete'><button id='Delete"+i+"' class='btn btn-danger btn-xs' data-title='Delete' data-toggle='modal' data-target='#delete' onclick='sacarIdPaciente2("+i+");'><span class='glyphicon glyphicon-trash'></span></button></p></td>";
					array.push(edit);
                    array.push(elim);
					table.row.add(array).draw();
                    array = [];
                });
            }
        });  // Cierre ajax
}