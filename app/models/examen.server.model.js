var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var examenSchema = new Schema({
  tipo : String,
  id_muestra : String
});

mongoose.model('Examen', examenSchema);
