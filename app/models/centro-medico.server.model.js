var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CentroMedicoSchema = new Schema({
  nombre : String,
  descripcion : String,
  horarios : String,
  imagenes : String,
  coordenadas : String,
  fichas: Object
});

mongoose.model('CentroMedico', CentroMedicoSchema);
