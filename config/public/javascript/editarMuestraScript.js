/*
$( document ).ready(function(){
    $("#example").DataTable({
        responsive: true
    });
    llenarDataTable();

    cargarComboCentros();
    cargarComboPacientes();
    cargarComboLabs();
    cargarExamenes();
});
*/

function cancelarRegistroPaciente() {
	window.location = "/operario";
};
/*
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
*/

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
                    $list.append('<option value="'+respuesta[i].nombreExamen+'">'+respuesta[i].nombreExamen+'</option>');
                });
            }
        });  // Cierre ajax

    });  // Cierre de change

}
/*

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
                    var examenes = respuesta[i].examenes;
                    var strExam = "";
                    for (var i=0 ; i<examenes.length ; i++ ){
                        strExam += examenes[i]+" ";
                    }
                    array.push(strExam);
                    var t = respuesta[i].tipo;  array.push(t);
                    var edit ="<td><input type='hidden' value='"+String(respuesta[i]._id)+"'><p data-placement='top' data-toggle='tooltip' title='Edit'><button class='btn btn-primary btn-xs' data-title='Edit' data-toggle='modal' data-target='#edit' onclick='sacarIdMuestra();'><span class='glyphicon glyphicon-pencil'></span></button></p></td>";
                    var elim ="<td><input type='hidden' value='"+String(respuesta[i]._id)+"'><p data-placement='top' data-toggle='tooltip' title='Delete'><button class='btn btn-danger btn-xs' data-title='Delete' data-toggle='modal' data-target='#delete' onclick='sacarIdMuestra();'><span class='glyphicon glyphicon-trash'></span></button></p></td>";
                    array.push(edit);
                    array.push(elim);

                    table.row.add(array).draw();
                    array = [];
                });
            }
        });  // Cierre ajax
}

function sacarIdMuestra() {
    $(".btn-xs").click(function() {
        var i = $(this).parent().parent().children("input").val();
            var url = '/muestras/'+i;
            //console.log(url);
            $.ajax({
                type: 'GET',
                url: url,
                data: {},
                success: function(respuesta){
                    $("#editHidden").val(i);
                    $("#combo-pacientes").val(respuesta.id_paciente);
                    $("#combo-centros").val(respuesta.id_centro);
                    $("#combo-lab").val(respuesta.id_laboratorio);
                    $("#combo-muestras").val(respuesta.tipo);

                    var values=respuesta.examenes;
                    for (var i=0; i<values.length; i++){
                        $("#select-examenes option[value='" + values[i] + "']").prop("selected", true);
                    }
                    $("#select-examenes").multiselect("refresh");
                }
            });
    });
}
*/


var editor;
 
$(document).ready(function() {
    $("#example").DataTable({
        responsive: true
    });
    editor = new $.fn.dataTable.Editor( {
        ajax: "/muestras",
        table: "#example",
        fields: [ {
                label: "Nombres:",
                name: "nombresPaciente"
            }, {
                label: "Apellidos:",
                name: "apellidosPaciente"
            }, {
                label: "Centro Med:",
                name: "nombreCentro"
            }, {
                label: "Laboratorio:",
                name: "nombreLaboratorio"
            }, {
                label: "Tipo:",
                name: "tipo"
            }
        ]
    } );
 
    // Activate an inline edit on click of a table cell
    $('#example').on( 'click', 'tbody td:not(:first-child)', function (e) {
        editor.inline( this );
    } );
 
    $('#example').DataTable( {
        dom: "Bfrtip",
        ajax: "/muestras",
        columns: [
            {
                data: null,
                defaultContent: '',
                className: 'select-checkbox',
                orderable: false
            },
            { data: "nombresPaciente" },
            { data: "apellidosPaciente" },
            { data: "nombreCentro" },
            { data: "nombreLaboratorio" },
            { data: "tipo" }
        ],
        select: {
            style:    'os',
            selector: 'td:first-child'
        },
        buttons: [
            { extend: "Crear", editor: editor },
            { extend: "Editar",   editor: editor },
            { extend: "Eliminar", editor: editor }
        ]
    } );
} );