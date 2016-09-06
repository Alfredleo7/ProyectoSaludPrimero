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

  app.route('/operario/registroMuestra')
    .get(verificarSesion, noAuthPaciente, operario.OperRegistroMuestra);

  app.route('/operario/admMuestra')
    .get(verificarSesion, noAuthPaciente, operario.OperAdmMuestra);

  app.route('/operario/eliminarMuestra')
    .get(verificarSesion, noAuthPaciente, operario.OperEliminarMuestra);

  app.route('/operario/registroMuestra/codigo')
    .get(verificarSesion, noAuthPaciente, operario.generarCodigo);

  app.route('/operario/registroPaciente')
    .get(verificarSesion, noAuthPaciente, operario.OperRegistroPaciente);

  app.route('/operario/editarPaciente')
    .get(verificarSesion, noAuthPaciente, operario.OperEditarPaciente);

  app.route('/operario/eliminarPaciente')
    .get(verificarSesion, noAuthPaciente, operario.OperEliminarPaciente);

//  enviar email con password

  app.route('/operario/estadisticas')
    .get(verificarSesion, noAuthPaciente, operario.OperEstadisticas);

  app.route('/operario/logout')
    .get(verificarSesion, noAuthPaciente, operario.salir);
}
