var index = require('../controllers/index.server.controllers');

module.exports = function(app){
  /*app.route('/')
    .get();*/
  app.route('/login')
    .post(index.identificar);
  app.route('/')
    .get(index.pagInicial);
}
