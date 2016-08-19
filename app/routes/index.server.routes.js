var index = require('../controllers/index.server.controllers');

module.exports = function(app){
  /*app.route('/')
    .get();*/
  app.route('/login')
    .post(index.identificar);

  app.route('/crear')
    .post(index.crear);

  app.route('/')
    .get(index.pagInicial);

  app.route('/paciente')
  	.get(index.pagPaciente);

  app.route('/operario')
  	.get(index.pagOperario);

  app.route('/operario/registroMuestra')
  	.get(index.OperRegistroMuestra);
  	
  app.route('/operario/registroPaciente')
  	.get(index.OperRegistroPaciente);

  app.route('/operario/estadisticas')
  	.get(index.OperEstadisticas);

  app.route('/laboratorista')
  	.get(index.pagLaboratorista);
}
