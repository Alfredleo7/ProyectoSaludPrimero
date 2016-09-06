var examen = require('../controllers/examen.server.controllers');

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

  app.route('/examenes')
    .post(verificarSesion, noAuthPaciente, examen.crear)
    .get(verificarSesion, examen.enlistar);

  app.route('/examenes/:id')
    .delete(verificarSesion, noAuthPaciente, examen.eliminar);

  app.route('/examenes/:tipo')
  	.get(verificarSesion, examen.porTipo);

  app.route('/examenesByMuestra/:id')
    .get(verificarSesion, examen.examenesByMuestra);

  app.route('/examenesByMuestra')
    .delete(verificarSesion, noAuthPaciente, examen.eliminarExamenesByMuestra);
}
