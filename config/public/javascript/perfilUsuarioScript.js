function cargarInfoPerfil(){
    $.getJSON("datos/usuario.json", function(data){
        var nombres = data.Nombres;
        var apellidos = data.Apellidos;
        var cedula = data.Cedula;
        var email = data.Email;
        var direccion = data.Direccion;
        var telefono = data.Telefonos;
        var paciente = nombres+" "+apellidos;
        $('#pacienteNombre').text(paciente);
        $('#nombres').val(nombres);
        $('#nombres').attr('value', nombres);
        $('#apellidos').val(apellidos);
        $('#apellidos').attr('value', apellidos);
        $('#cedula').val(cedula);
        $('#cedula').attr('value', cedula);
        $('#email').val(email);
        $('#email').attr('value', email);
        $('#direccion').val(direccion);
        $('#direccion').attr('value', direccion);
        $('#telefono1').val(telefono[0]);
        $('#telefono1').attr('value', telefono[0]);
        $('#telefono2').val(telefono[1]);
        $('#telefono2').attr('value', telefono[1]);
    });
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#fotoPerfil')
                .attr('src', e.target.result)
                .width(200)
                .height(200);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

$( document ).ready(function(){
    cargarInfoPerfil();
    $.validator.setDefaults({
        submitHandler: function() {
            alert("Datos actualizados!");
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
            direccion: "required",
            cedula: {
                required: true,
                number: true,
                minlength: 10,
                maxlength: 10
            },
            telefono1: "required"
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
            direccion: "* Ingrese una direcci&oacute;n",
            cedula: {
                required: "* Ingrese un n&uacute;mero de c&eacute;dula v&aacute;lido",
                number: "* C&eacute;dula de identidad contiene s&oacute;lo valores num&eacute;ricos",
                minlength: "* C&eacute;dula de identidad contiene 10 d&iacute;gitos",
                maxlength: "* C&eacute;dula de identidad contiene 10 d&iacute;gitos"
            },
            telefono1: "* Ingrese su n&uacute;mero telef&oacute;nico"
        }
    });
});