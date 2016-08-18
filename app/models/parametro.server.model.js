var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var parametroSchema = new Schema({
  descripción : String,
  unidades : String,
  resultado : String,
  valoresRef : String
});

mongoose.model('Parametro', parametroSchema);
