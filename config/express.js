var express = require('express');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');

module.exports = function(){
  var app = express();
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(session({
    secret : "SaludPrimeroSA",
    resave : true,
    saveUninitialized : false
  }));
  app.set('views', './app/views');
  app.set('view engine', 'ejs');

  //definir las rutas
  require('../app/routes/ficha.server.routes.js')(app);
  require('../app/routes/paciente.server.routes.js')(app);
  require('../app/routes/centro-medico.server.routes.js')(app);
  require('../app/routes/laboratorio.server.routes.js')(app);
  require('../app/routes/examen.server.routes.js')(app);
  require('../app/routes/parametro.server.routes.js')(app);
  require('../app/routes/index.server.routes.js')(app);

  return app;
};
