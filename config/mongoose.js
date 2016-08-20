var mongoose = require('mongoose');

module.exports = function(){
  var db = mongoose.connect('mongodb://admindb:admin@ds153765.mlab.com:53765/proyecto2daw', function(err){
    if (err) {
      console.log("Error de Conexión");
    } else {
      console.log("Conexión establecida");
    }
  });

  //definir los modelos
  require('../app/models/ficha.server.model');
  require('../app/models/paciente.server.model');
  require('../app/models/laboratorista.server.model');
  require('../app/models/operario.server.model');
  require('../app/models/centro-medico.server.model');
  require('../app/models/laboratorio.server.model');
  require('../app/models/examen.server.model');
  require('../app/models/parametro.server.model');
  require('../app/models/coordenadas.server.model');
  return db;
};
