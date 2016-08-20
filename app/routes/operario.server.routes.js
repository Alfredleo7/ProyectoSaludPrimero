var operario = require('../controllers/operario.server.controllers');

module.exports = function(app){  

  app.route('/operario')
    .get(operario.pagOperario);

  app.route('/operario/registroMuestra')
    .get(operario.OperRegistroMuestra);

    // *****
  app.route('/operario/registroMuestra/codigo')
    .post(operario.generarCodigo);
    
  app.route('/operario/registroPaciente')
    .get(operario.OperRegistroPaciente);

  app.route('/operario/estadisticas')
    .get(operario.OperEstadisticas);
    
  /*
  app.route('/')
    .get(operario.pagInicial);


  app.route('/paciente')
  	.get(operario.pagPaciente);

  app.route('/operario')
  	.get(operario.pagOperario);
  	
  app.route('/laboratorista')
  	.get(operario.pagLaboratorista); 

  */
}