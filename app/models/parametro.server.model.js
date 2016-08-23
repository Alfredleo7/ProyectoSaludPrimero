var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var parametroSchema = new Schema({
  id_examen : String,
  parametro : String,
  unidades : Number,
  resultado : Number,
  valoresRef : String
});

mongoose.model('Parametro', parametroSchema);
