var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var examenSchema = new Schema({
  tipo : String,
  nombreExamen: String,
  id_ficha : String,
  parametros : Object
});

mongoose.model('Examen', examenSchema);
