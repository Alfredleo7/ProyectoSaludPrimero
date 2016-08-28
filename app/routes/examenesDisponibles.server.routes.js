var examen = require('../controllers/examenesdisponibles.server.controllers');

module.exports = function(app){

  app.route('/examenesdisponibles')
    .post(examen.crear)
    .get(examen.enlistar);

  app.route('/examenesdisponibles/:id')
    .delete(examen.eliminar);

  app.route('/examenesdisponibles/:tipo')
  	.get(examen.porTipo);

}