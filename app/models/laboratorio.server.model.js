var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var laboratorioSchema = new Schema({
  nombre : String,
  descripcion : [String],
  horarios : {type: Object},
  fichas : Object
});

mongoose.model('Laboratorio', laboratorioSchema);
