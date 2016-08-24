var paciente = require('../controllers/paciente.server.controllers');

module.exports = function(app){
  app.route('/paciente')
    .get(paciente.pagPaciente);
  app.route('/pacienteByCookie')
    .post(paciente.pacienteByCookie);
  app.route('/pacientes')
    .post(paciente.crear)
    .get(paciente.enlistar);
  app.route('/pacientes/:id')
    .delete(paciente.eliminar)
    .get(paciente.getById)
    .put(paciente.actualizarPaciente);
  app.route('/paciente/logout')
    .get(paciente.salir);
  app.route('/paciente/password')
    .post(paciente.cambiarPassword);
  app.route('/paciente/perfil')
    .get(paciente.pagPerfil);
  app.route('/paciente/examenes')
    .get(paciente.pagExamenes);
};
