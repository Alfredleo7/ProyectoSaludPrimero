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

  app.route('/laboratorista')
  	.get(index.pagLaboratorista);

  app.route('/salir')
      .get(index.salir);
}
