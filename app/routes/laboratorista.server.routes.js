var laboratorista = require('../controllers/laboratorista.server.controllers');

module.exports = function(app){
  app.route('/laboratoristas')
    .get(laboratorista.enlistar);
}
