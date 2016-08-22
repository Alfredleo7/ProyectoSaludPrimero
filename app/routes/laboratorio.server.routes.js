var laboratorio = require('../controllers/laboratorio.server.controllers');

module.exports = function(app){

  app.route('/laboratorios')
    .post(laboratorio.crear)
    .get(laboratorio.enlistar);

  app.route('/laboratorios/:id')
    .delete(laboratorio.eliminar)
    .get(laboratorio.getById);
};
