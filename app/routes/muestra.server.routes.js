var muestra = require('../controllers/muestra.server.controllers');

module.exports = function(app){

  app.route('/muestras')
    .get(muestra.enlistar)
    .post(muestra.crear);

  app.route('/muestras/:id')
    .delete(muestra.eliminar)
    .get(muestra.muestraByID);

  app.route('/muestrasByLab')
    .get(muestra.muestrasPorLaboratorio);

  app.route('/muestrasByLabAndMonth')
    .get(muestra.muestrasByLabAndMonth);

  app.route('/muestrasRecibidas')
    .get(muestra.muestrasRecibidas);

}
