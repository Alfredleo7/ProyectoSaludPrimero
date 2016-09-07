function cargarInfoPerfil(){
    $.ajax({
        url : '/pacienteByCookie',
        type : 'post',
        success : function(data){
            var id = data._id;
            var nombres = data.nombres;
            var apellidos = data.apellidos;
            var cedula = data.cedula;
            var email = data.email;
            var paciente = nombres+" "+apellidos;
            $('#idpaciente').val(id);
            $('#nombrePaciente').text(nombres);
            $('#pacienteNombre').text(paciente);
            $('#nombres').val(nombres);
            $('#nombres').attr('value', nombres);
            $('#apellidos').val(apellidos);
            $('#apellidos').attr('value', apellidos);
            $('#cedula').val(cedula);
            $('#cedula').attr('value', cedula);
            $('#email').val(email);
            $('#email').attr('value', email);
        }
    });
}

$( document ).ready(function(){
    cargarInfoPerfil();
    $("#cambiarPassword").submit(function(e){
        e.preventDefault();
        url = '/paciente/password'
        var data = $(this).serialize();
        $.ajax({
            type: 'POST',
            url: url,
            data: data, //+'&'+$.param({tipoaccion:"insertar"}),
            success: function(respuesta){
                $('#textoModal').text(respuesta);
                $("#modalContrasena").modal("hide");
                $("#modal-success").modal("show");
            }
        });
    });
    $.validator.setDefaults({
        submitHandler: function() {
            var id = $("#idpaciente").val();
            var url = "/pacientes/"+id;
            var data = $("#perfilForm").serialize();
            $.ajax({
                type: 'PUT',
                url: url,
                data: data, //+'&'+$.param({tipoaccion:"insertar"}),
                success: function(respuesta){
                    $('#textoPerfil').text("Perfil modificado con éxito");
                    $("#modal-perfil").modal("show");
                }
            });
        }
    });
    $.validator.addMethod(
        "regex",
        function(value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },
        "Formato inválido."
    );
    $("#perfilForm").validate({
        errorClass: "errorPerfil",
        rules: {
            nombres: {
                required: true,
                regex: '^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$'
            },
            apellidos: {
                required: true,
                regex: '^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$'
            },
            email: {
                required: true,
                email: true
            },
            cedula: {
                required: true,
                number: true,
                minlength: 10,
                maxlength: 10
            }
        },
        messages: {
            nombres: {
                required: "* Ingrese sus nombres",
                regex: "* Nombres s&oacute;lo deben contener letras"
            },
            apellidos: {
                required: "* Ingrese sus apellidos",
                regex: "* Apellidos s&oacute;lo deben contener letras"
            },
            email: {
                required: "* Ingrese su direcci&oacute;n de correo electr&oacute;nico",
                email: "* El formato del correo electr&oacute;nico es: email@sitio.com"
            },
            cedula: {
                required: "* Ingrese un n&uacute;mero de c&eacute;dula v&aacute;lido",
                number: "* C&eacute;dula de identidad contiene s&oacute;lo valores num&eacute;ricos",
                minlength: "* C&eacute;dula de identidad contiene 10 d&iacute;gitos",
                maxlength: "* C&eacute;dula de identidad contiene 10 d&iacute;gitos"
            }
        }
    });
});