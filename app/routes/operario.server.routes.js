var operario = require('../controllers/operario.server.controllers');

module.exports = function(app){

  app.route('/registroMuestra')
    .get(operario.registroMuestra);

  app.route('/registroPaciente')
    .get(operario.registroPaciente);
  
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