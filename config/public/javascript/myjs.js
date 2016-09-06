$(document).ready(function() {
    $('.carousel').carousel({interval: 7000});
});

function showPass(){
    var tipo = $("#showPassword").parent().children("input").attr("type");
    if( tipo == 'password' ){
       $("#password").attr("type",'text');
       $("#eyeIcon").removeClass("glyphicon-eye-open");
       $("#eyeIcon").addClass("glyphicon-eye-close");
    }
    else{
       $("#password").attr("type",'password');
       $("#eyeIcon").removeClass("glyphicon-eye-close");
       $("#eyeIcon").addClass("glyphicon-eye-open");
     }
}

/*
function inicio_sesion(){
  	$users=['user','laborat'];
  	$pass=['12345','54321'];
  	$var1 = $("#inputUser").val();

  	if ($var1=="user") {
  		$(".login2 .form-signin").attr("action","paciente.html");
  	}	
    else if ($var1=="laborat") {
		  $(".login2 .form-signin").attr("action","laboratorista.html");
  	} 
    else if ($var1=="oper") {
      $(".login2 .form-signin").attr("action","operario.html");
    }
    else {
      alert("¡Usuario incorrecto!");
    } 	
}
*/