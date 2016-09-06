var examen = require('../controllers/examenesdisponibles.server.controllers');

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


  app.route('/examenesdisponibles')
    .post(verificarSesion, noAuthPaciente, examen.crear)
    .get(verificarSesion, examen.enlistar);

  app.route('/examenesdisponibles/:id')
    .delete(verificarSesion, noAuthPaciente, examen.eliminar);

  app.route('/examenesdisponibles/:tipo')
  	.get(verificarSesion, examen.porTipo);

}
