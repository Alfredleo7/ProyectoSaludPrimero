var laboratorista = require('../controllers/laboratorista.server.controllers');

module.exports = function(app){
  app.route('/laboratoristas')
    .get(laboratorista.enlistar);
  app.route('/laboratoristaByCookie')
    .post(laboratorista.laboratoristaByCookie);
  app.route('/laboratorista')
  	.get(laboratorista.pagLaboratorista);
  app.route('/laboratorista/logout')
    .get(laboratorista.salir);

}
