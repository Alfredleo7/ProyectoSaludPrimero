function buildTableBody(data, columns) {
    var body = [];

    body.push(columns);

    data.forEach(function(row) {
        var dataRow = [];

        columns.forEach(function(column) {
            dataRow.push(row[column].toString());
        })

        body.push(dataRow);
    });

    return body;
}

function table(data, columns) {
    return {
        style: 'table',
        table: {
            headerRows: 1,
            body: buildTableBody(data, columns)
        }
    };
}

function cargarInfoPerfil(){
    $.ajax({
        url : '/pacienteByCookie',
        type : 'post',
        async: false,
        success : function(data){
            var id = data._id;
            var nombres = data.nombres;
            var apellidos = data.apellidos;
            var cedula = data.cedula;
            var email = data.email;
            var paciente = nombres+" "+apellidos;
            $('#idpaciente').val(id);
            $('#nombrePaciente').text(nombres);
            $('#infopaciente').val(data);
        }
    });
}

function cargarExamenes(){
    var id = $("#idpaciente").val();
    var pacienteInfo = $('#infopaciente').val();

    // muestras del paciente
    $.ajax({
        url : '/muestrasByPaciente/'+id,
        type : 'get',
        async: false,
        success : function(muestras){
            var examenes = $('#examenes');
            var examenesColumn = $('<div class="col-md-12" style="padding-top:20px; color:#000; text-shadow:none;; font-size:0.8em"></div>');
            var examenesPanel = $('<div class="panel panel-default"></div>');
            var examenesHeading = $('<div class="panel-heading"></div>');
            var examenesTitle = $('<h3 class="panel-title">Muestras</h3>');
            var examenesBody = $('<div class="panel-body"></div>');
            var examenesTable = $('<table class="table table-hover"></table>');
            var examenesTableHead = $('<thead></thead>');
            var examenesTableRowHead = $('<tr></tr>');
            var examenesTipo = $('<th class="col-xs-1">Tipo</th>');
            var examenesFecha = $('<th class="col-xs-1">Fecha</th>');
            var examenesProgreso = $('<th class="col-xs-8">Progreso</th>');
            var examenesResultado = $('<th>Resultado</th>');
            var examenesTableBody = $('<tbody></tbody>');
            examenes.append(examenesColumn);
            examenesColumn.append(examenesPanel);
            examenesPanel.append(examenesHeading);
            examenesHeading.append(examenesTitle);
            examenesPanel.append(examenesBody);
            examenesBody.append(examenesTable);
            examenesTable.append(examenesTableHead);
            examenesTable.append(examenesTableBody);
            examenesTableHead.append(examenesTableRowHead);
            examenesTableRowHead.append(examenesTipo);
            examenesTableRowHead.append(examenesFecha);
            examenesTableRowHead.append(examenesProgreso);
            examenesTableRowHead.append(examenesResultado);

            for(var i = 0; i < muestras.length; i++){
                _muestra = muestras[i];
                var tipo = muestras[i].tipo;
                var fecha = muestras[i].fecha;
                var estado = muestras[i].estado;
                var examenDetalle;
                if(estado == "Ingresado"){
                    examenDetalle = $('<tr><td>'+tipo+'</td><td>'+fecha+'</td><td><div class="progress"><div data-toggle="tooltip" title="Ingresado al sistema" class="progress-bar progress-bar-danger progress-bar-striped" role="progressbar" aria-valuenow="33" aria-valuemin="0" aria-valuemax="100" style="width:33%">Ingresado</div></div></td><td><button class="btn btn-default disabled">No disponible</button></td></tr>');
                }
                else if(estado == "recibido"){
                    examenDetalle = $('<tr><td>'+tipo+'</td><td>'+fecha+'</td><td><div class="progress"><div data-toggle="tooltip" title="Muestra recibida" class="progress-bar progress-bar-warning progress-bar-striped" role="progressbar" aria-valuenow="66" aria-valuemin="0" aria-valuemax="100" style="width:66%">Recibido</div></div></td><td><button class="btn btn-default disabled">No disponible</button></td></tr>');
                }
                else if(estado == "terminado"){
                    asignarDatos(muestras);
                    examenDetalle = $('<tr><td>'+tipo+'</td><td>'+fecha+'</td><td><div class="progress"><div data-toggle="tooltip" title="Resultados disponibles" class="progress-bar progress-bar-progress progress-bar-striped" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">Listo</div></div></td><td><button id="examen'+i+'" onclick="descargarPDF('+i+')" class="btn btn-primary">Descargar</button></td></tr>');
                }
                else{
                    examenDetalle = $('<tr><td>'+tipo+'</td><td>'+fecha+'</td></tr>');
                }
                examenesTableBody.append(examenDetalle);
            }
        }
    });
}

function asignarDatos(muestra){
    muestras_ = muestra;
}

function descargarPDF(id){
    var muestra = null;
    var paciente = null;
    var centromedico = null;
    var laboratorio = null;
    var examenes_ = null;
    var parametros_ = [];
    var datosMuestra = [];
    var datosPaciente = [];
    for(var i = 0; i < muestras_.length; i++){
        if(i == id){
            muestra = muestras_[i];
        }
    }
    $.ajax({
        url : '/pacientes/'+muestra.id_paciente,
        type : 'get',
        async: false,
        success : function(paciente_){
            paciente = paciente_;
        }
    });
    $.ajax({
        url : '/centros-medicos/'+muestra.id_centro,
        type : 'get',
        async: false,
        success : function(centro_){
            centromedico = centro_;
        }
    });
    $.ajax({
        url : '/laboratorios/'+muestra.id_laboratorio,
        type : 'get',
        async: false,
        success : function(laboratorio_){
            laboratorio = laboratorio_;
        }
    });
    $.ajax({
        url : '/examenesByMuestra/'+muestra._id,
        type : 'get',
        async: false,
        success : function(examenes){
            examenes_ = examenes;
            for(var j = 0; j < examenes.length; j++){
                // parametros del examen
                $.ajax({
                    url : '/parametrosByExamen/'+examenes[j]._id,
                    type : 'get',
                    async: false,
                    success : function(parametros){
                        for(var k = 0; k < parametros.length; k++){
                            parametros_.push({'Tipo': examenes[j].tipo, 'Parámetro': parametros[k].parametro, 'Resultado': parametros[k].resultado, 'Unidades': parametros[k].unidades, 'Valores de referencia': parametros[k].valoresRef});
                        }
                    }
                }); 

            } 
        }
    });
    datosMuestra.push({'Tipo de muestra': muestra.tipo,'Centro Médico': centromedico.nombre, 'Laboratorio': laboratorio.nombre, 'Fecha toma de muestra': muestra.fecha});
    datosPaciente.push({'Nombres': paciente.nombres, 'Apellidos': paciente.apellidos, 'Cédula': paciente.cedula, 'E-mail': paciente.email});
    
    var dd = {
        pageMargins: [40, 80, 40, 40],
        header: {
            margin: 10,
            columns: [
                {
                    margin: [250, 0, 0, 0],
                    image: "data:image/png;base64,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",
                    width: 40
                },
            ]
        },
        content: [
            { text: 'Salud Primero S.A.', style: 'title' },
            { text: 'Datos del paciente', style: 'header' },
            table(datosPaciente, ['Nombres', 'Apellidos', 'Cédula', 'E-mail']),
            { text: 'Datos de la muestra', style: 'subheader' },
            table(datosMuestra, ['Tipo de muestra','Centro Médico', 'Laboratorio', 'Fecha toma de muestra']),
            { text: 'Resultados del examen', style: 'subheader' },
            table(parametros_, ['Tipo', 'Parámetro', 'Resultado', 'Unidades', 'Valores de referencia'])
        ],
        styles: {
            title: {
                fontSize: 20,
                bold: true,
                margin: [160, 0, 0, 10]
            },
            header: {
                fontSize: 18,
                bold: true,
                margin: [0, 0, 0, 10]
            },
            subheader: {
                fontSize: 16,
                bold: true,
                margin: [0, 10, 0, 5]
            },
            table: {
                margin: [0, 5, 0, 15]
            },
            tableHeader: {
                bold: true,
                fontSize: 13,
                color: 'black'
            }
        }
    }
    pdfMake.createPdf(dd).open();
}

$( document ).ready(function(){
    cargarInfoPerfil();
    cargarExamenes();
    $("#cambiarPassword").submit(function(e){
        e.preventDefault();
        url = '/paciente/password'
        var data = $(this).serialize();
        $.ajax({
            type: 'POST',
            url: url,
            data: data,
            success: function(respuesta){
                $('#textoModal').text(respuesta);
                $("#modalContrasena").modal("hide");
                $("#modal-success").modal("show");
            }
        });
    });
});