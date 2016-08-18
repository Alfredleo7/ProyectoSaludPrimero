var parametro = require('../controllers/parametro.server.controllers');

module.exports = function(app){
  app.route('/parametro')
    .post(parametro.crear)
    .get(parametro.enlistar);

  app.route('/parametro/:id')
    .delete(parametro.eliminar);
}
