function cargarCentrosMedicos(){
    $.getJSON("datos/centros_medicos.json", function(data){
        $.each(data,function(i) {
            var nombre = data[i].Nombre;
            var direccion = data[i].Direccion;
            var telefono = data[i].Telefono;
            var descripcion = data[i].Descripcion;
            var coordenadas = data[i].Coordenadas;
            var horarios = data[i].Horarios;

            // Creo todos los elementos del panel
            var centrosMedicos = $('#centrosMedicos');
            var column = $('<div class="col-md-4" id="Centro'+i+'""></div>');
            var panel = $('<div class="panel panel-default panelCentro"></div>');
            var panelHeading = $('<div class="panel-heading"></div>');
            var panelHeader = $('<h3 class="panel-title text-center">'+nombre+'</h3>');
            var panelBody = $('<div class="panel-body panelCentroBody"></div>');
            var span = $('<span style="font-weight:bold;">Servicios: </span>');
            var br = $('<br/>');
            var list1 = $('<ul></ul>');
            var list2 = $('<ul></ul>');
            for (var j = 0; j < descripcion.length ; j++){
                list1.append('<li>'+descripcion[j]+'</li>');
                list2.append('<li>'+descripcion[j]+'</li>');
            }
            var panelFooter = $('<div class="panel-footer text-center">');
            var masInfo = $('<button type="button" class="infoBtn btn btn-primary" data-toggle="modal" data-target="#centroModal'+(i+1)+'">Mas informaci&oacute;n</button>');
            
            // Ordeno los elementos del panel
            centrosMedicos.append(column);
            column.append(panel);
            panel.append(panelHeading);
            panelHeading.append(panelHeader);
            panel.append(panelBody);
            panelBody.append(span);
            panelBody.append(br);
            panelBody.append(list1);
            panel.append(panelFooter);
            panelFooter.append(masInfo);

            // Creo todos los elementos del modal
            var modal = $('<div id="centroModal'+(i+1)+'" class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true"></div>');
            var modalType = $('<div class="modal-dialog modal-lg"></div>');
            var modalContent = $('<div class="modal-content"></div>');
            var modalHeader = $('<div class="modal-header"></div>');
            var modalTitle = $('<h2 class="modal-title">'+nombre+'</h2>');
            var modalClose = $('<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
            var modalBody = $('<div class="modal-body"></div>');
            var modalFooter = $('<div class="modal-footer"><button type="button" class="btn btn-primary" data-dismiss="modal">Cerrar</button></div>');
            
            $('body').append(modal);
            modal.append(modalType);
            modalType.append(modalContent);
            modalContent.append(modalHeader);
            modalHeader.append(modalClose);
            modalHeader.append(modalTitle);
            modalContent.append(modalBody);
            modalContent.append(modalFooter);

            // Contenido del modal
            var container = $('<div class="container-fluid bd-example-row"></div>');
            var row1 = $('<div class="row"></div>'); // Aqui va el carousel e informacion
            var row2 = $('<div class="row"></div>'); // Aqui va mapa y horarios de atencion
            container.append(row1);
            container.append(row2);
            modalBody.append(container);

            // Carousel
            var carousel = $('<div id="carousel-centro'+(i+1)+'" class="carousel slide col-md-6" data-ride="carousel"></div>');
            var carouselIndicators = $('<ol class="carousel-indicators"></ol>');
            var indicator0 = $('<li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>');
            var indicator1 = $('<li data-target="#carousel-example-generic" data-slide-to="1"></li>');
            var indicator2 = $('<li data-target="#carousel-example-generic" data-slide-to="2"></li>');
            var carouselInner = $('<div class="carousel-inner" role="listbox"></div>');
            var item0 = $('<div class="item active"></div>');
            var imagen0 = $('<img src="imagenes/centros_medicos/centro1.jpg" alt="'+nombre+'">');
            var item1 = $('<div class="item"></div>');
            var imagen1 = $('<img src="imagenes/centros_medicos/centro2.jpg" alt="'+nombre+'">');
            var item2 = $('<div class="item"></div>');
            var imagen2 = $('<img src="imagenes/centros_medicos/centro3.jpg" alt="'+nombre+'">');
            var carouselLeftControl = $('<a class="left carousel-control" href="#carousel-centro'+(i+1)+'" role="button" data-slide="prev"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span><span class="sr-only">Previous</span></a>');
            var carouselRightControl = $('<a class="right carousel-control" href="#carousel-centro'+(i+1)+'" role="button" data-slide="next"><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span><span class="sr-only">Next</span></a>');
            
            // Ordeno los elementos del carousel
            carousel.append(carouselIndicators);
            carousel.append(carouselInner);
            carousel.append(carouselLeftControl);
            carousel.append(carouselRightControl);
            carouselIndicators.append(indicator0);
            carouselIndicators.append(indicator1);
            carouselIndicators.append(indicator2);
            carouselInner.append(item0);
            carouselInner.append(item1);
            carouselInner.append(item2);
            item0.append(imagen0);
            item1.append(imagen1);
            item2.append(imagen2);
            
            // Agregro el carousel a la fila 1
            row1.append(carousel);

           // Informacion
            var infoColumn = $('<div class="col-md-6"></div>');
            var infoPanel = $('<div class="panel panel-default"></div>');
            var infoHeading = $('<div class="panel-heading"></div>');
            var infoTitle = $('<h3 class="panel-title">Informaci&oacute;n</h3>');
            var infoBody = $('<div class="panel-body"></div>');
            var spanServicios = $('<span style="font-weight:bold;">Servicios: </span><br/>');
            /* list 2 */
            var spanDireccion = $('<span style="font-weight:bold;">Direcci&oacute;n: </span><span>'+direccion+'</span><br/>');
            var spanTelefono = $('<span style="font-weight:bold;">Tel&eacute;fono: </span><span>'+telefono+'</span><br/>');

            // Ordeno los elementos del panel de informacion
            infoColumn.append(infoPanel);
            infoPanel.append(infoHeading);
            infoPanel.append(infoBody);
            infoHeading.append(infoTitle);
            infoBody.append(spanServicios);
            infoBody.append(list2);
            infoBody.append(spanDireccion);
            infoBody.append(spanTelefono);

            // Agregro el panel de informacion a la fila 1
            row1.append(infoColumn); 

            // Mapa
            var mapaColumn = $('<div class="col-md-6"></div>');
            var mapaPanel = $('<div class="panel panel-default"></div>');
            var mapaHeading = $('<div class="panel-heading"></div>');
            var mapaTitle = $('<h3 class="panel-title">Mapa</h3>');
            var mapaBody = $('<div class="panel-body"></div>');
            var mapaCanvas = $('<div id="map_canvas'+(i+1)+'" class="mapCanvas"></div>');

            // Ordeno los elementos del mapa
            mapaColumn.append(mapaPanel);
            mapaPanel.append(mapaHeading);
            mapaPanel.append(mapaBody);
            mapaHeading.append(mapaTitle);
            mapaBody.append(mapaCanvas);

            // Agrego el mapa a la fila 2
            row2.append(mapaColumn);

            // Cargando el mapa
            var mapaConfiguracion = {
                zoom: 17,
                center: new google.maps.LatLng(coordenadas.Latitud, coordenadas.Longitud),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            var mapa = new google.maps.Map(document.getElementById("map_canvas"+(i+1)), mapaConfiguracion);
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(coordenadas.Latitud, coordenadas.Longitud),
                map: mapa,
                title: nombre
            });
            google.maps.event.addListenerOnce(mapa, 'idle', function() {
               google.maps.event.trigger(mapa, 'resize');
            });

            // Centrnado el mapa correctamente al mostrar el modal
            $("#centroModal"+(i+1)).on("shown.bs.modal", function () {
                google.maps.event.trigger(mapa, "resize");
                var reCenter = new google.maps.LatLng(coordenadas.Latitud, coordenadas.Longitud);
                mapa.setCenter(reCenter);
            });

            // Horarios
            var horariosColumn = $('<div class="col-md-6"></div>');
            var horariosPanel = $('<div class="panel panel-default"></div>');
            var horariosHeading = $('<div class="panel-heading"></div>');
            var horariosTitle = $('<h3 class="panel-title">Horarios de Atenci&oacute;n</h3>');
            var horariosBody = $('<div class="panel-body"></div>');
            var horariosTable = $('<table class="table table-condensed"></table>');
            var horariosTableHead = $('<thead></thead>');
            var horariosTableRowHead = $('<tr></tr>');
            var horariosDia = $('<th>D&iacute;a</th>');
            var horariosHora = $('<th>Horas</th>');
            var horariosTableBody = $('<tbody></tbody>');
            var horariosLunes = $('<tr><td>Lunes</td><td>'+horarios['Lunes']+'</td></tr>');
            var horariosMartes = $('<tr><td>Martes</td><td>'+horarios['Martes']+'</td></tr>');
            var horariosMiercoles = $('<tr><td>Miercoles</td><td>'+horarios['Miercoles']+'</td></tr>');
            var horariosJueves = $('<tr><td>Jueves</td><td>'+horarios['Jueves']+'</td></tr>');
            var horariosViernes = $('<tr><td>Viernes</td><td>'+horarios['Viernes']+'</td></tr>');
            var horariosSabado = $('<tr><td>Sabado</td><td>'+horarios['Sabado']+'</td></tr>');
            var horariosDomingo = $('<tr><td>Domingo</td><td>'+horarios['Domingo']+'</td></tr>');

            horariosColumn.append(horariosPanel);
            horariosPanel.append(horariosHeading);
            horariosHeading.append(horariosTitle);
            horariosPanel.append(horariosBody);
            horariosBody.append(horariosTable);
            horariosTable.append(horariosTableHead);
            horariosTable.append(horariosTableBody);

            horariosTableHead.append(horariosTableRowHead);
            horariosTableRowHead.append(horariosDia);
            horariosTableRowHead.append(horariosHora);

            horariosTableBody.append(horariosLunes);
            horariosTableBody.append(horariosMartes);
            horariosTableBody.append(horariosMiercoles);
            horariosTableBody.append(horariosJueves);
            horariosTableBody.append(horariosViernes);
            horariosTableBody.append(horariosSabado);
            horariosTableBody.append(horariosDomingo);

            row2.append(horariosColumn);
          
        });

        ocultarPaneles();
        //mostrar3paneles();

    });

}

// Esta funcion ya deja los 3 primeros paneles visibles
function ocultarPaneles(){
   for (var i = 20; i > 2 ; i--){
        $("#Centro"+i).addClass("hidden");
    }
}

function mostrar3paneles(){
    var a = $(".hidden")  // Cuento los Paneles hidden
    var indice = 20 - a.length; // Hallo el indice desde el ultimo visible
    console.log(a.length);
   for (var i = 0; i < 3 ; i++){
        $("#Centro"+(indice+i)).removeClass("hidden");
    }

    // Deshabilitar el boton cuando no hayan mas paneles que mostrar
    if (indice>=20) {
        $('#btn-showmore').text("No hay más centros");
        $('#btn-showmore').attr("disabled", true);
    }
    else {
        $('#btn-showmore').attr("disabled", false);
    }

}


function cargarInfoOperario(){
    $.getJSON("datos/usuario.json", function(data){
        var paciente = data.Nombres+" "+data.Apellidos;
        $('#pacienteNombre').text(paciente);
    });
}


function llenar_info(i) {
    $("#info-mues h2").text("");
    $("#info-mues h2").text("Informacion de la muestra " + (i+1));
    var $par1 = $("<p></p>");
    var $par2 = $("<p></p>");
    $("#info-mues p").text("");

    $.getJSON("datos/datos_muestras.json", function(data) {
        $par1.text("Paciente: "+data[i].paciente);  
        $par2.text("Información: "+data[i].Info);   
    });
    
    $("#info-mues").append($par1);
    $("#info-mues").append($par2);
}

function llenarTablaMuestras() {
    $.getJSON("datos/datos_muestras.json", function(data) {
        var $tabla = $("#tablaMuestras tbody");
        $.each(data,function(i) {
            $tabla.append('<tr id="M'+i+'"><td><span class="tituloMuestra" onclick="llenar_info('+i+');">'+data[i].titulo+'</span><button class="btn btn-default" onclick="">Editar</button>    <button class="btn btn-default" onclick="EliminarItem('+i+')">Eliminar</button></td></tr>');
        });
    });
}

function EliminarItem(i){
    $("#info-mues h2").remove();    
    $("#info-mues p").remove();
    var $a = $("#M"+i).remove();
}

$( document ).ready(function(){
    cargarInfoOperario();
    llenarTablaMuestras();
    // CARGAR INFORMACION DE CENTROS MEDICOS (PANELES Y MODALS)

    // CARGAR INFORMACION DEL PACIENTE
 
    // ANIMACION PARA TABS
    var hashTagActive = "";
    $(".scroll").click(function (event) {
        if(hashTagActive != this.hash) {
            event.preventDefault();
            // calcular lugar destino
            var dest = 0;
            if ($(this.hash).offset().top > $(document).height() - $(window).height()) {
                dest = $(document).height() - $(window).height();
            } else {
                dest = $(this.hash).offset().top;
            }
            // ir al destino
            $('html,body').animate({
                scrollTop: dest
            }, 750, 'swing');
            hashTagActive = this.hash;
        }
    });



});