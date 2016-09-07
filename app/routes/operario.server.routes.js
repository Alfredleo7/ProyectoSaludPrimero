var operario = require('../controllers/operario.server.controllers');

module.exports = function(app){

  var verificarSesion = function(req, res, next){
    if(!req.session.rol){
      res.render('index');
    } else {
      next();
    }
  };

  var noAuthPaciente = function(req, res, next){
    if(req.session.rol == 'paciente'){
      res.render('index');
    } else {
      next();
    }
  }


  app.route('/operario')
    .get(verificarSesion, noAuthPaciente, operario.pagOperario);

  app.route('/operario/admMuestra')
    .get(verificarSesion, noAuthPaciente, operario.OperAdmMuestra);

  app.route('/operario/registroMuestra/codigo')
    .get(verificarSesion, noAuthPaciente, operario.generarCodigo);

  app.route('/operario/admPaciente')
    .get(verificarSesion, noAuthPaciente, operario.OperAdmPaciente);

//  enviar email con password

  app.route('/operario/estadisticas/laboratorios')
    .get(verificarSesion, noAuthPaciente, operario.OperEstadisticas1);

  app.route('/operario/estadisticas/mensual')
    .get(verificarSesion, noAuthPaciente, operario.OperEstadisticas2);

  app.route('/operario/logout')
    .get(verificarSesion, noAuthPaciente, operario.salir);
}
