var centroMedico = require('../controllers/centro-medico.server.controllers');

module.exports = function(app){

  app.route('/centros-medicos')
    .post(centroMedico.crear)
    .get(centroMedico.enlistar);

  app.route('/centros-medicos/:id')
    .get(centroMedico.centroByID)
    .delete(centroMedico.eliminar);
};
