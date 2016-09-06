var parametro = require('../controllers/parametro.server.controllers');

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

  
  app.route('/parametros')
    .post(verificarSesion, noAuthPaciente, parametro.crear)
    .get(verificarSesion, parametro.enlistar);

  app.route('/parametros/:id')
    .delete(verificarSesion, noAuthPaciente, parametro.eliminar);

  app.route('/parametrosByExamen/:id')
    .get(verificarSesion, parametro.parametrosByExamen);
}
