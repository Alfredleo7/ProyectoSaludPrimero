var laboratorista = require('../controllers/laboratorista.server.controllers');

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

  app.route('/laboratoristas')
    .get(verificarSesion, laboratorista.enlistar);
  app.route('/laboratoristaByCookie')
    .post(verificarSesion, laboratorista.laboratoristaByCookie);
  app.route('/laboratorista')
  	.get(verificarSesion, laboratorista.pagLaboratorista);
  app.route('/laboratorista/logout')
    .get(verificarSesion, laboratorista.salir);

}
