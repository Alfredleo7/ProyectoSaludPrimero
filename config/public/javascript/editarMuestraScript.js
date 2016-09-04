$( document ).ready(function(){
    $("#example").DataTable({
        responsive: true
    });
    llenarDataTable();
    secretInputs();
    cargarComboCentros();
    cargarComboPacientes();
    cargarComboLabs();

    $(function(){
        $('#confirmDelete').click(function() {
            confirmarEliminar();
        });
    });
    
    $(function(){
        $("#linkbarcode").click(function(){
            $("#ok-barcode").attr("disabled","false");
        });
    });

});

function verCodigoBarras(){
    // Se saca el id_muestra
    var s = $("#barcodeHidden").val();
    // Para que no se pueda cerrar sin clickar el boton
    $("#modal-barcode").attr("data-backdrop","static");
    $("#modal-barcode").attr("data-keyboard","false");
    
    $.ajax({
        type: 'GET',
        url: '/operario/registroMuestra/codigo?for=' + s ,
        data: {},
        success: function (respuestapdf) {
            window.open("data:application/pdf," + escape(respuestapdf));
        }
    });
}

function cancelarRegistroPaciente() {
	window.location = "/operario";
};

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

function resetModal(id) {
    $('#'+id).find('textarea, select, input:checkbox:not("#submitNew, #reset")').val('').end();
    $("#submitNew").val("Crear");
    $("#combo-muestras").val("none");
    $("#examenes").empty();
}

function llenarDataTable (){
        $.ajax({
            type: 'GET',
            url: "/muestras",
            data: {},
            success: function(respuesta){
                
                $.each(respuesta, function(i){
                    $("#codmuestra_hidden").val(respuesta[i]._id);
                    var table = $("#example").DataTable();
                    var array = [];
                    var n = respuesta[i].nombresPaciente; array.push(n);
                    var a = respuesta[i].apellidosPaciente; array.push(a);
                    var nc = respuesta[i].nombreCentro; array.push(nc);
                    var nl = respuesta[i].nombreLaboratorio; array.push(nl);
                    var examenes = [];
                    examenes = respuesta[i].examenes;
                    var strExam = "";
                    for (var j=0 ; j<examenes.length ; j++ ){
                        strExam += examenes[j]+" ";
                    }
                    array.push(strExam);
                    var t = respuesta[i].tipo;  array.push(t);
                    var edit ="<td><input type='hidden' value='"+String(respuesta[i]._id)+"'><p class='text-center' data-placement='top' data-toggle='tooltip' title='Edit'><button id='Edit"+i+"' class='btn btn-primary btn-xs' data-title='Edit' data-toggle='modal' data-target='#new' onclick='sacarIdPaciente("+i+");'><span class='glyphicon glyphicon-pencil'></span></button></p></td>";
                    var elim ="<td><input type='hidden' value='"+String(respuesta[i]._id)+"'><p class='text-center' data-placement='top' data-toggle='tooltip' title='Delete'><button id='Delete"+i+"' class='btn btn-danger btn-xs' data-title='Delete' data-toggle='modal' data-target='#delete' onclick='sacarIdPaciente2("+i+");'><span class='glyphicon glyphicon-trash'></span></button></p></td>";
                    array.push(edit);
                    array.push(elim);

                    table.row.add(array).draw();
                    array = [];
                });
            }
        });  // Cierre ajax
}

function sacarIdPaciente(i) {
    var i = $("#Edit"+i).parent().parent().children("input").val();
    var url = '/muestras/'+i;
    $("#addHidden").val(i);

    $.ajax({
        type: 'GET',
        url: url,
        data: {},
        success: function(respuesta){
            $("#combo-pacientes").val(respuesta.id_paciente);   $("#combo-pacientes").trigger("click");
            $("#combo-centros").val(respuesta.id_centro);   $("#combo-centros").trigger("click");
            $("#combo-lab").val(respuesta.id_laboratorio);  $("#combo-lab").trigger("click");
            $("#combo-muestras").val(respuesta.tipo);   $("#combo-muestras").trigger("click"); // Se simula el click para mostrar los examenes
            $("#submitNew").val("Guardar");

            var values=respuesta.examenes;
//            $('#examenes input[type="checkbox"][value="Hemograma"]').attr('checked','checked'); //.prop('checked', true);
            for (var i=0; i<values.length; i++){
                $("#"+values[i]).prop('checked', true);
//                $('#examenes input[type=checkbox][value=Hemograma]').prop('checked', true);
                //console.log(a);
                
//                $("#examenes input[value='" + values[i] + "']").prop("checked", true);
            }
        }
    });
}

function sacarIdPaciente2(i) {
    var i = $("#Delete"+i).parent().parent().children("input").val();
    $("#hiddenSuccess").val(i);
}


function confirmarEliminar(){
    var id = $("#hiddenSuccess").val();
    var url = "/muestras/"+id
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


function secretInputs(){
    /* 
       Esta funcion mantiene actualizados los 
       secret inputs al momento de seleccionar
       un item de los combobox 
    */

    $("#combo-pacientes").click( function () {
        var id = '';
        var opSelected = $('#combo-pacientes option:selected').each(function () {
                id += $( this ).val();
        });
        var url = '/pacientes/'+ id;
        $.ajax({
            type: 'GET',
            url: url,
            data: {},
            success: function(respuesta){
                $("#nombresPaciente").val(respuesta.nombres);
                $("#apellidosPaciente").val(respuesta.apellidos);
            }
        });
    });
    // ===========================================
    $("#combo-centros").click( function () {
        var id = '';
        var opSelected = $('#combo-centros option:selected').each(function () {
                id += $( this ).val();
        });
        var url = '/centros-medicos/'+ id;
        $.ajax({
            type: 'GET',
            url: url,
            data: {},
            success: function(respuesta){
                $("#nombreCentro").val(respuesta.nombre);
            }
        });
    });
    // ===========================================
    $("#combo-lab").click( function () {
        var id = '';
        var opSelected = $('#combo-lab option:selected').each(function () {
                id += $( this ).val();
        });
        var url = '/laboratorios/'+ id;
        $.ajax({
            type: 'GET',
            url: url,
            data: {},
            success: function(respuesta){
                $("#nombreLaboratorio").val(respuesta.nombre);
            }
        });
    });
    // ===========================================
}