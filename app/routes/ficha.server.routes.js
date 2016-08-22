var ficha = require('../controllers/ficha.server.controllers');

module.exports = function(app){
  app.route('/fichas')
    .post(ficha.crear)
    .get(ficha.enlistar);

  app.route('/fichas/:id')
    .get(ficha.fichaByID);

  app.route('/fichasByLab')
    .get(ficha.fichasPorLaboratorio);

  app.route('/fichasByLabAndMonth')
    .get(ficha.fichasByLabAndMonth);
}
