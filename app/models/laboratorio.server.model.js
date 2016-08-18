var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var laboratorioSchema = new Schema({
  nombre : String,
  descripcion : String,
  horarios : String,
  fichas : Object
});

mongoose.model('Laboratorio', laboratorioSchema);
