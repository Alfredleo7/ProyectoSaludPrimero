var laboratorio = require('../controllers/laboratorio.server.controllers');

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

  app.route('/laboratorios')
    .post(verificarSesion, noAuthPaciente, laboratorio.crear)
    .get(verificarSesion, laboratorio.enlistar);

  app.route('/laboratorios/:id')
    .delete(verificarSesion, noAuthPaciente, laboratorio.eliminar)
    .get(verificarSesion, laboratorio.getById);
};
