var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var muestraSchema = new Schema({
  tipo : String,
  estado : String,
  id_laboratorio : String,
  nombreLaboratorio : String,
  fecha: {type: Date, default: Date.now }
});

mongoose.model('Muestra', muestraSchema);
