var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var coordSchema = require('./coordenadas.server.model');


var CentroMedicoSchema = new Schema({
  nombre : String,
  direccion : String,
  telefono: String,
  horarios : {type: Object},
  descripcion : [String],
  coordenadas : coordSchema,
  fichas: Object
});


mongoose.model('CentroMedico', CentroMedicoSchema);
