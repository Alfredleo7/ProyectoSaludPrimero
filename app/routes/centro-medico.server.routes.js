var centroMedico = require('../controllers/centro-medico.server.controllers');

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

  app.route('/centros-medicos')
    .post(verificarSesion, noAuthPaciente, centroMedico.crear)
    .get(verificarSesion, centroMedico.enlistar);

  app.route('/centros-medicos/:id')
    .delete(verificarSesion, noAuthPaciente, centroMedico.eliminar)
    .get(verificarSesion, centroMedico.getById);
};
