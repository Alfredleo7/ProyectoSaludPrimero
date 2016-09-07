var muestra = require('../controllers/muestra.server.controllers');

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

  app.route('/muestras')
    .get(verificarSesion, noAuthPaciente, muestra.enlistar)
    .post(verificarSesion, noAuthPaciente, muestra.crear);

  app.route('/muestras/:id')
    .delete(verificarSesion, noAuthPaciente, muestra.eliminar)
    .get(verificarSesion, muestra.muestraByID)
    .put(verificarSesion, noAuthPaciente, muestra.actualizarMuestra);

  app.route('/muestrasByLab')
    .get(verificarSesion, muestra.muestrasPorLaboratorio);

  app.route('/countMuestrasByYearAndMonth')
    .get(muestra.muestrasByYearAndMonth);

  app.route('/muestrasByLabInMonth')
    .get(muestra.muestrasByLabInMonth);

  app.route('/muestrasRecibidas')
    .get(verificarSesion, noAuthPaciente, muestra.muestrasRecibidas);

  app.route('/muestraIngresadaByID/:id')
    .get(verificarSesion, noAuthPaciente, muestra.muestraIngresadaByID);

  app.route('/recibirMuestra')
    .post(verificarSesion, noAuthPaciente, muestra.recibirMuestra);

  app.route('/enviarResultados/:id')
    .put(verificarSesion, noAuthPaciente, muestra.enviarResultadosMuestra);

  app.route('/muestrasByPaciente/:id')
    .get(verificarSesion, muestra.muestrasByIdPaciente);

}
