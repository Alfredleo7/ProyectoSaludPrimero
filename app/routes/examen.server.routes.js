var examen = require('../controllers/examen.server.controllers');

module.exports = function(app){

  app.route('/examenes')
    .post(examen.crear)
    .get(examen.enlistar);

  app.route('/examenes/:id')
    .delete(examen.eliminar);
}
