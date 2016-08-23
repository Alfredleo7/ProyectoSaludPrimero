var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var muestraSchema = new Schema({
  id_ficha : String,
  tipo : String,
  estado : String,
  id_laboratorio : String,
  nombreLaboratorio : String
});

mongoose.model('Muestra', muestraSchema);
