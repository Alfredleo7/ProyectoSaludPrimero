var operario = require('../controllers/operario.server.controllers');

module.exports = function(app){

  var verificarSesion = function(req, res, next){
	/* 
		Esta funcion verifica si existe el rol (es decir, si se encontro en la BDD)
		Si no existe, lo REDIRIGE A INDEZ (no render)
	*/
    if(!req.session.rol){
        res.redirect("/");
    } else {
        next();
    }
  };

  var noAuthOperario = function(req, res, next){
	/* 
		Si esta funcion va despues de verificarSesion:
		-> Si el rol es diferente de Operario, es un usuario NO AUTORIZADO (No lo redirige, solo notifica el Error)
	*/
    if(req.session.rol !== 'operario'){
        res.status(401).send("¡Oops! Parece que quieres acceder a un sitio no autorizado.  Por favor, inicia sesion como Operario para continuar");
    }
  	else{
  		next();
  	}
  }


  app.route('/operario')
    .get(verificarSesion, noAuthOperario, operario.pagOperario);

  app.route('/operario/admMuestra')
    .get(verificarSesion, noAuthOperario, operario.OperAdmMuestra);

  app.route('/operario/registroMuestra/codigo')
    .get(verificarSesion, noAuthOperario, operario.generarCodigo);

  app.route('/operario/admPaciente')
    .get(verificarSesion, noAuthOperario, operario.OperAdmPaciente);

//  enviar email con password

  app.route('/operario/estadisticas/laboratorios')
    .get(verificarSesion, noAuthOperario, operario.OperEstadisticas1);

  app.route('/operario/estadisticas/mensual')
    .get(verificarSesion, noAuthOperario, operario.OperEstadisticas2);

  app.route('/operario/logout')
    .get(verificarSesion, noAuthOperario, operario.salir);
}
