var operario = require('../controllers/operario.server.controllers');

module.exports = function(app){  
  app.route('/operario')
    .get(operario.pagOperario);

  app.route('/operario/registroMuestra')
    .get(operario.OperRegistroMuestra);

  app.route('/operario/registroMuestra/codigo')
    .get(operario.generarCodigo);
    
  app.route('/operario/registroPaciente')
    .get(operario.OperRegistroPaciente);

//  enviar email con password

  app.route('/operario/estadisticas')
    .get(operario.OperEstadisticas);

  app.route('/operario/logout')
    .get(operario.salir);
}