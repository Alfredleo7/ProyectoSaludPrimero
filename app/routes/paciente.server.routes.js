var paciente = require('../controllers/paciente.server.controllers');

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


  app.route('/paciente')
    .get(verificarSesion, paciente.pagPaciente);
  app.route('/pacienteByCookie')
    .post(verificarSesion, paciente.pacienteByCookie);
  app.route('/pacientes')
    .post(verificarSesion, paciente.crear)
    .get(verificarSesion, paciente.enlistar);
  app.route('/pacientes/:id')
    .delete(verificarSesion, noAuthPaciente, paciente.eliminar)
    .get(verificarSesion, paciente.getById)
    .put(verificarSesion, noAuthPaciente, paciente.actualizarPaciente);
  app.route('/paciente/logout')
    .get(verificarSesion, paciente.salir);
  app.route('/paciente/password')
    .post(verificarSesion, paciente.cambiarPassword);
  app.route('/paciente/perfil')
    .get(verificarSesion, paciente.pagPerfil);
  app.route('/paciente/examenes')
    .get(verificarSesion, paciente.pagExamenes);
};
