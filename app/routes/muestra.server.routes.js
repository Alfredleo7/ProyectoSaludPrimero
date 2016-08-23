var muestra = require('../controllers/muestra.server.controllers');

module.exports = function(app){

  app.route('/muestras')
    .get(muestra.enlistar)
    .post(muestra.crear);
  app.route('/muestras/:id')
    .delete(muestra.eliminar);
}
