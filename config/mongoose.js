var mongoose = require('mongoose');

module.exports = function(){
  var db = mongoose.connect('mongodb://localhost/daw', function(err){
    if (err) {
      console.log("Error de Conexión");
    } else {
      console.log("Conexión establecida");
    }
  });

  //definir los modelos
  require('../app/models/ficha.server.model');
  require('../app/models/paciente.server.model');
  require('../app/models/centro-medico.server.model');
  require('../app/models/laboratorio.server.model');
  require('../app/models/examen.server.model');
  require('../app/models/parametro.server.model');
  return db;
};
