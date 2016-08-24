var parametro = require('../controllers/parametro.server.controllers');

module.exports = function(app){
  app.route('/parametros')
    .post(parametro.crear)
    .get(parametro.enlistar);

  app.route('/parametros/:id')
    .delete(parametro.eliminar);

  app.route('/parametrosByExamen/:id')
    .get(parametro.parametrosByExamen);
}
