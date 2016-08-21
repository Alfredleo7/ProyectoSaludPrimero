var index = require('../controllers/index.server.controllers');

module.exports = function(app){
  /*app.route('/')
    .get();*/
  app.route('/login')
    .post(index.identificar);  // Esta funcion verifica si existe el usuario y crea el rol en la session

  app.route('/crear')
    .post(index.crear);

  app.route('/')
    .get(index.pagInicial);

// Esto debe ser manejado desde la ruta de paciente
  app.route('/paciente')
  	.get(index.pagPaciente);


}
