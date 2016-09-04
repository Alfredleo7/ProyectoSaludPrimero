var examen = require('../controllers/examen.server.controllers');

module.exports = function(app){

  app.route('/examenes')
    .post(examen.crear)
    .get(examen.enlistar);

  app.route('/examenes/:id')
    .delete(examen.eliminar);

  app.route('/examenes/:tipo')
  	.get(examen.porTipo);

  app.route('/examenesByMuestra/:id')
    .get(examen.examenesByMuestra);

  app.route('/examenesByMuestra')
    .delete(examen.eliminarExamenesByMuestra);
}
