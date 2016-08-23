var paciente = require('../controllers/paciente.server.controllers');

module.exports = function(app){
  app.route('/pacientes')
    .post(paciente.crear)
    .get(paciente.enlistar);
  app.route('/pacientes/:id')
    .delete(paciente.eliminar)
    .get(paciente.getById)
    .put(paciente.actualizarPaciente);
};
